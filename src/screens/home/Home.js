import React, { useRef, useEffect, useState, useContext } from 'react';
import { View, Text, Animated, PermissionsAndroid, TouchableOpacity, Image } from 'react-native';
import { showMessage } from "react-native-flash-message";
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, { Marker } from 'react-native-maps';
import io from 'socket.io-client';

import { BASE_URL } from '../../../constants';

import MainHeader from '../../components/MainHeader';

import AuthContext from '../../contexts/auth';

import { api } from '../../services/auth';

import styles from './styles';

export default function Home(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const btm = useRef(new Animated.Value(-100)).current;
  const btm2 = useRef(new Animated.Value(-100)).current;
  const [location, setLocation] = useState({});
  const [ref, setRef] = useState(true);
  const [newDel, setNewDel] = useState(false);
  const [socket, setSocket] = useState(null);
  const [clientData, setClientData] = useState(null);

  let markerLat = useRef(-22.376422).current;
  let markerLong = useRef(-47.3722709).current;

  const { user } = useContext(AuthContext);


  useEffect(() => {
    console.log('===dados do cliente usuario aqui na tela home do moov driver=====');
    console.log(clientData)
  }, [clientData])


  const handleMarkerLat = (value) => {
    //
    Animated.timing(markerLat, {
      toValue: value,
      duration: 1000
    }).start();
  };

  const handleMarkerLong = (value) => {
    //
    Animated.timing(markerLong, {
      toValue: value,
      duration: 1000
    }).start();
  };



  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start();
  };

  const fadeIn2 = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim2, {
      toValue: 1,
      duration: 1000
    }).start();
  };

  const goUp = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(btm, {
      toValue: 20,
      duration: 1800
    }).start();
  };

  const goUp2 = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(btm2, {
      toValue: 20,
      duration: 1800
    }).start();
  };

  async function getLocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de localização',
          message: 'Necessário para funcionar',
          buttonNeutral: 'Depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            setLocation({ 'latitude': latitude, 'longitude': longitude })
            console.log(latitude, longitude)
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
        );

      } else {
        console.log('Fine Location permission denied');
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  async function watchDriverPosition() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão para acompnhar localização',
          message: 'Necessário para funcionar',
          buttonNeutral: 'Depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.watchPosition(
          ({ coords }) => {
            console.log('===========aqui assistindo position=========')
            console.log(coords)
            socket.emit('watchedPosition', { coords })

          },
          (error) => {
            console.log('===========aqui ERRO assistindo position=========')
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, distanceFilter: 0.1, interval: 700 }
        );

      } else {
        console.log('Fine Location permission denied');
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  async function updateDriverPosition(lat, long) {
    let driverData = {
      latitude: lat,
      longitude: long,
      id: user.id,
    }
    const response = await api.put('/drivers', {
      driverData
    })

  }


  useEffect(() => {
    let skt = io('http://192.168.15.11:3000/motoristas')
    setSocket(skt);

    getLocation();
    fadeIn();
    goUp();


    return function cleanup() {
      Geolocation.stopObserving();
    };

  }, [])

  useEffect(() => {
    if (socket) {

      watchDriverPosition();

      socket.on('connected', (data, name) => {
        //alert('conectou motorista aqui')

      })

      socket.on('hello', (data) => {
        console.log('data aqui')
        console.log(data)
        setNewDel(true)
        setClientData(data)
      })

      socket.on('accepted', (data) => {
        console.log('foi aceito hehe')
        console.log(data)
        setNewDel(false);
      })

      socket.on('watchedPosition', (data) => {
        console.log('nova posição capturada aqui')
        console.log(data.coords.latitude, data.coords.longitude);
        updateDriverPosition(data.coords.latitude, data.coords.longitude);

      })

    }


  }, [socket])


  function handleAcceptedRequest() {
    socket.emit('accepted', {})
  }

  useEffect(() => {
    if (newDel) {
      fadeIn2()
      goUp2()
    }

  }, [newDel])


  async function handleAccept() {
    const response = await api.put('/delivery', {
      accepted: true,
      delivered: false,
      value: clientData?.value,
      observation: clientData.observation,
      fromLatitude: clientData.fromLatitude,
      fromLongitude: clientData.fromLongitude,
      toLatitude: clientData.toLatitude,
      toLongitude: clientData.toLongitude,
      fromTown: clientData.fromTown,
      toTown: clientData.toTown,
      delivered_at: null,
      date: clientData.date,
      driver_id: user.id,
      user_id: clientData.user.id,
    })

    if (response?.data?.messageCode === '200') {
      showMessage({
        message: "Parabéns, agora basta entregar!",
        type: "success",
      });
      handleAcceptedRequest()
    } else {
      showMessage({
        message: "Entrega não mais disponível",
        type: "info",
      });
      setNewDel(false)
    }
  }


  return (
    <View style={styles.container}>
      <MainHeader navigation={props.navigation} />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude ? location.latitude : -22.376422,
          longitude: location.longitude ? location.longitude : -47.3722709,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation
        loadingEnabled
        showsMyLocationButton={false}
        showsCompass={false}
      >
        <Marker
          title='voce está aqui'
          isPreselected
          onPress={e => console.log(e.nativeEvent)}
          draggable
          coordinate={{ "latitude": markerLat, "longitude": markerLong }}

        >
        </Marker>
      </MapView>
      {ref ? <Animated.View style={[styles.cardView, {
        opacity: fadeAnim, // Bind opacity to animated value
        bottom: btm
      }]}>
        <TouchableOpacity
          onPress={() => setRef(false)}
          style={{ position: 'absolute', top: 10, left: 15 }}
        >
          <Icon name="times" size={25} color="#ddd" />
        </TouchableOpacity>
        <View>
          <Text style={styles.welcomeText}>Olá, {user.first_name}</Text>
        </View>
        <View style={styles.cardValue}>
          <Text style={styles.value}>R$10</Text>
          <Icon name="tags" size={50} color="lightgreen" />
        </View>
        <Text style={{ color: '#999' }}>Indique um amigo e ganhe R$10</Text>
        <View>
          <TouchableOpacity
            onPress={() => { }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>INDICAR</Text>
          </TouchableOpacity>
        </View>
      </Animated.View> : <View />}

      {newDel ? <Animated.View style={[styles.newDeliveryCard, {
        opacity: fadeAnim2, // Bind opacity to animated value
        bottom: btm2
      }]}>
        <TouchableOpacity
          onPress={() => handleAcceptedRequest()}
          style={{ position: 'absolute', top: 10, left: 15 }}
        >
          <Icon name="times" size={25} color="#ddd" />
        </TouchableOpacity>
        <View>
          <Text style={styles.welcomeText}>Pedido de entrega!</Text>
        </View>
        <Image source={{ uri: `${BASE_URL}/files/${clientData?.user?.avatar_path}` }} style={{ width: 70, height: 70, borderRadius: 30, borderWidth: 0.5, borderColor: 'purple' }} />
        <Text style={{ fontSize: 18, color: '#333' }}>{`${clientData?.user?.first_name + ' ' + clientData?.user?.last_name}`}</Text>
        <View style={styles.cardValue}>
          <Text style={styles.value}>R${clientData?.value}</Text>
          <Icon name="money-bill-wave" size={32} color="lightgreen" />
        </View>
        <View style={{ width: '100%', paddingLeft: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="map-pin" size={20} color="lightgreen" /><Text style={{ paddingLeft: 10, color: 'grey', fontSize: 14, marginVertical: 3 }}>De: {clientData?.fromTown}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="map-pin" size={20} color="red" /><Text style={{ paddingLeft: 10, color: 'grey', fontSize: 14, marginVertical: 3 }}>Para: {clientData?.toTown}</Text>
          </View>
        </View>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            onPress={() => handleAcceptedRequest()}
            style={styles.denyBtn}
          >
            <Text style={styles.btnText}>NEGAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAccept()}
            style={styles.acceptBtn}
          >
            <Text style={styles.btnText}>ACEITAR</Text>
          </TouchableOpacity>
        </View>
      </Animated.View> : <View />}

    </View>
  );
}

