import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { GOOGLE_PLACES_API_KEY } from '@env';
import { GOOGLE_PLACES_API_KEY, BASE_URL } from '../../../constants';
import moment from 'moment';


import finishMarker from '../../assets/finish.png';
import startMarker from '../../assets/start.png';


import Header from '../../components/Header';

import { api } from '../../services/auth';

import styles from './styles';

function Request(props) {
  const { ride } = props.route.params;
  const [userData, setUserData] = useState({});

  console.log('====ride aqui=====');
  console.log(ride)


  async function loadClientInfo() {
    const response = await api.post('/user', { user_id: ride.user_id })
    if (response?.data?.messageCode === '200') {
      console.log('===============response.data.response==============')
      console.log(response.data.response)
      setUserData(response.data.response[0])
    }
  }


  useEffect(() => {
    loadClientInfo()
  }, [])

  function handleSeeUserProfile() {
    props.navigation.navigate('UserProfile', { userData });

  }


  return (
    <View style={styles.container}>
      <Header head='Detalhes da entrega' navigation={props.navigation} />
      <View style={styles.mapView}>
        <MapView
          style={{ flex: 1 }}
          // initialRegion={{
          //   latitude: location.lat ? location.lat : -22.376422,
          //   longitude: location.long ? location.long : -47.3722709,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
          showsUserLocation
          loadingEnabled
          showsMyLocationButton={false}
          showsCompass={false}
          ref={el => map = el}

        >
          <>
            <MapViewDirections
              origin={{ "latitude": parseFloat(ride.fromLatitude), "longitude": parseFloat(ride.fromLongitude) }}
              destination={{ "latitude": parseFloat(ride.toLatitude), "longitude": parseFloat(ride.toLongitude) }}
              apikey={GOOGLE_PLACES_API_KEY}
              strokeWidth={3}
              strokeColor='purple'
              mode='DRIVING'
              onReady={(result) =>
                map.fitToCoordinates(result.coordinates)}
            />
            <Marker
              title='Ponto de coleta'
              isPreselected
              onPress={e => console.log(e.nativeEvent)}
              draggable
              coordinate={{ "latitude": parseFloat(ride.fromLatitude), "longitude": parseFloat(ride.fromLongitude) }}
              image={startMarker}
            >
            </Marker>
            <Marker
              title='ponto de entrega'
              isPreselected={true}
              coordinate={{ "latitude": parseFloat(ride.toLatitude), "longitude": parseFloat(ride.toLongitude) }}
              image={finishMarker}
            >
            </Marker>
          </>
        </MapView>
      </View>
      <View style={styles.detailsView}>
        <View style={styles.topViewDetails}>
          <Text style={styles.topTextDetails}>{moment(ride.date).format("DD/MM/YYYY hh:mm")}</Text>
          <Text style={styles.topTextDetails}>R${parseFloat(ride.value).toFixed(2)}</Text>
        </View>
        {
            ride.delivered_at ?
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.topTextDelivered}>Entrega concluída em: </Text>
                <Text style={styles.topTextDelivered}>{moment(ride.delivered_at).format("DD/MM/YYYY hh:mm")}</Text>
              </View> :
              <View />
          }
        <View style={styles.bottomCard}>
          <View style={styles.fromTown}>
            <View style={[styles.markerView, { backgroundColor: 'red' }]}></View>
            <Text style={styles.fromLocationText}>{ride.fromTown}</Text>
          </View>
          <View style={styles.toTown}>
            <View style={[styles.markerView, { backgroundColor: 'green' }]}></View>
            <Text style={styles.fromLocationText}>{ride.toTown}</Text>
          </View>
        </View>
        <View style={styles.driverView}>
          <View style={styles.driverInnerView}>
            <Image source={{ uri: `${BASE_URL}/files/${userData.avatar_path}` }} style={{ width: 85, height: 85, borderRadius: 50 }} />
            <Text style={[styles.driverText, { fontSize: 18 }]}>{`${userData.first_name} ${userData.last_name}`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleSeeUserProfile()}
          >
            <View style={styles.driverInnerView}>
              <Text style={[styles.driverText, { color: '#FA960F' }]}>Ver perfil</Text>
              <Icon name="arrow-right" size={22} color="#FA960F" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Request;
