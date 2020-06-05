import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView from 'react-native-maps';
import io from 'socket.io-client';

import Header from '../../components/Header';

import styles from './styles';

export default function Home(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const btm = useRef(new Animated.Value(-100)).current;
  const [ref, setRef] = useState(true);
  const [newDel, setNewDel] = useState(false);
  const [socket, setSocket] = useState(null);
  const [clientData, setClientData] = useState(null);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
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

  useEffect(() => {
    fadeIn()
    goUp()

    let skt = io('http://192.168.15.13:3000/motoristas')
    setSocket(skt);


  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('connected', (data, name) => {
        //alert('conectou motorista aqui')

      })

      socket.on('hello', (data) => {
        console.log('data aqui')
        console.log(data)
        setNewDel(true)
        setClientData(data)
      })

    }


  }, [socket])



  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation
        loadingEnabled
        showsMyLocationButton={false}
        showsCompass={false}
      />
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
          <Text style={styles.welcomeText}>Olá, Marvin</Text>
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
        opacity: fadeAnim, // Bind opacity to animated value
        bottom: btm
      }]}>
        <TouchableOpacity
          onPress={() => setNewDel(false)}
          style={{ position: 'absolute', top: 10, left: 15 }}
        >
          <Icon name="times" size={25} color="#ddd" />
        </TouchableOpacity>
        <View>
          <Text style={styles.welcomeText}>Pedido de entrega!</Text>
        </View>
        <Image source={{ uri: `http://192.168.15.13:3000/files/${clientData?.avatar_path}` }} style={{ width: 70, height: 70, borderRadius: 30, borderWidth: 0.5, borderColor: 'purple' }} />
        <Text style={{ fontSize: 18, color: '#333'}}>{`${clientData?.first_name + ' ' + clientData?.last_name}`}</Text>
        <View style={styles.cardValue}>
          <Text style={styles.value}>R$150</Text>
          <Icon name="money-bill-wave" size={32} color="lightgreen" />
        </View>
        <View style={{ width: '100%', paddingLeft: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="map-pin" size={20} color="lightgreen" /><Text style={{ paddingLeft: 10, color: 'grey', fontSize: 18, marginVertical: 3 }}>De: Araras - São Paulo</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="map-pin" size={20} color="red" /><Text style={{ paddingLeft: 10, color: 'grey', fontSize: 18, marginVertical: 3 }}>Para: Leme - Rio de Janeiro</Text>
          </View>
        </View>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            onPress={() => { }}
            style={styles.denyBtn}
          >
            <Text style={styles.btnText}>NEGAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={styles.acceptBtn}
          >
            <Text style={styles.btnText}>ACEITAR</Text>
          </TouchableOpacity>
        </View>
      </Animated.View> : <View />}

    </View>
  );
}

