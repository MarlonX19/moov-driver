import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import moment from 'moment';


import { api } from '../../services/auth';

import Header from '../../components/Header';

import NoRide from '../../assets/no-rides.png';

import styles from './styles';

import AuthContext from '../../contexts/auth';

function index (props) {

  const { user } = useContext(AuthContext);

  const [deliveries, setDeliveries] = useState([]);
  const [user_id, setUserId] = useState(user.id);
  const [loading, setLoading] = useState(true);


  async function fetchDeliveries() {
    setLoading(true);
    let type = 'drivers';
    const response = await api.post('/user/deliveries', { user_id, type })

    console.log(response)

    if (response.data.messageCode == '200') {
      response.data.response.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
      setDeliveries(response.data.response);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }


  useEffect(() => {
    props.navigation.addListener('focus', () => {
      fetchDeliveries();
    });

  }, [props.navigation]);


  if (loading) {
    return (
      <View style={styles.ActivityIndicatorView}>
        <ActivityIndicator size='large' color='orange' />
      </View>
    )
  }


  function handleSeeDetails(ride) {
    props.navigation.navigate('Detalhes', { ride });
  }


  function generateStatus(item){
    if(item.canceled){
      return 'cancelado';
    }

    if(item.delivered){
      return 'concluído';
    }

    if(item.accepted && !item.delivered){
      return 'em andamento';
    }

    if(!item.accepted && !item.delivered){
      return 'aguardando';
    }
  }



  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleSeeDetails(item)}
      >
        <View style={styles.cardBody}>
          <View style={styles.cardHead}>
            <Text style={[styles.headText,
            {
              color: item.delivered ?
                'green' :
                'orange'
            }]}>{generateStatus(item)}</Text>
            <Text style={styles.headText}>R${parseFloat(item.value).toFixed(2)}</Text>
          </View>
          <View style={styles.mainInfo}>
            <Text style={styles.mainText}>Solicitado em: </Text>
            <Text style={styles.mainText}>{moment(item.date).format("DD/MM/YYYY")}</Text>
          </View>
          <View style={styles.bottomCard}>
            <View style={styles.fromTown}>
              <View style={[styles.markerView, { backgroundColor: 'red' }]}></View>
              <Text style={styles.fromLocationText}>{item.fromTown}</Text>
            </View>
            <View style={styles.toTown}>
              <View style={[styles.markerView, { backgroundColor: 'green' }]}></View>
              <Text style={styles.fromLocationText}>{item.toTown}</Text>
            </View>
          </View>
        </View >
      </TouchableOpacity>
    )
  }



  return(
    <View style={styles.container}>
      <Header head='Histórico' navigation={props.navigation} />
      {
        deliveries.length < 1 ?
          <View style={styles.NoRides}>
            <Image source={NoRide} style={{ width: 150, height: 150 }} />
            <Text style={styles.NoRidesText}>Nada para mostrar</Text>
          </View> :
          <FlatList
            data={deliveries}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
      }

    </View>
  )
}

export default index;
