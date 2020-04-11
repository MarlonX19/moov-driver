import React from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

import styles from './styles';

export default function Home() {

  return (
    <View style={styles.container}>
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
    </View>
  );
}
