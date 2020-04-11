import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView from 'react-native-maps';

import Header from '../../components/Header';

import styles from './styles';

export default function Home(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const btm = useRef(new Animated.Value(-100)).current;

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
  }, [])

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
      <Animated.View style={[styles.cardView, {
        opacity: fadeAnim, // Bind opacity to animated value
        bottom: btm
      }]}>
        <View>
          <Text style={styles.welcomeText}>Olá, Marvin</Text>
        </View>
        <View style={styles.cardValue}>
          <Text style={styles.value}>R$10</Text>
          <Icon name="tags" size={50} color="lightgreen" />
        </View>
        <Text style={{ color: '#999'}}>Indique um amigo e ganhe R$10</Text>
        <View>
          <TouchableOpacity
            onPress={() => { }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>INDICAR</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

