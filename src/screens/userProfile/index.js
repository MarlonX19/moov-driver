import React, { useState, useEffect } from 'react';
import { View, Text, Image, Linking, TouchableOpacity, Modal, Alert, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import { showMessage } from "react-native-flash-message";

import Header from '../../components/Header';

import { api } from '../../services/auth';

import styles from './styles';

function UserProfile(props) {
  let { userData } = props.route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [number_starts, setNumberStarts] = useState(1);


  async function handleRateUser() {
    userData = { ...userData, number_starts }
    const response = await api.put('/users', { userData })

    if (response.data.messageCode === '200') {
      showMessage({
        message: "Avaliação dada com sucesso!",
        type: "success",
      });
    }
    setModalVisible(false);
  }


  return (
    <View style={styles.container}>
      <Header head='Perfil do usuário' navigation={props.navigation} />
      <View style={styles.topView}>
        <View style={{ width: '100%', height: 200 }}>
          <Image source={{ uri: `http://192.168.15.13:3000/files/${userData.avatar_path}` }} style={{ width: '100%', height: '100%' }} />
        </View>
        <View style={styles.avatarView}>
          <Image source={{ uri: `http://192.168.15.13:3000/files/${userData.avatar_path}` }} style={styles.profilePic} />
          <Text style={styles.avatarText}>{`${userData.first_name} ${userData.last_name}`}</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={userData.number_starts}
            starSize={18}
            fullStarColor={'#FA960F'}
            selectedStar={(rating) => { }}
          />
        </View>
        <View style={styles.contactView}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${userData.phone}`)}
            style={styles.callButton}
          >
            <>
              <Icon name="phone" size={35} color="#FA960F" />
              <Text style={styles.buttonText}>Ligar</Text>
            </>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:${userData.email}?subject=Contato através do aplicativo Moov&`)}
            style={styles.callButton}
          >
            <>
              <Icon name="envelope-square" size={35} color="#FA960F" />
              <Text style={styles.buttonText}>E-mail</Text>
            </>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.callButton}
          >
            <>
              <Icon name="star-half" size={35} color="#FA960F" />
              <Text style={styles.buttonText}>Avaliar</Text>
            </>
          </TouchableOpacity>
        </View>
      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{ backgroundColor: 'red', flex: 1 }}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.rateView}>
              <Text style={styles.modalText}>Avalie o seu cliente</Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={number_starts}
                starSize={40}
                fullStarColor={'#FA960F'}
                selectedStar={(rating) => setNumberStarts(rating)}
              />
            </View>
            <TouchableHighlight
              style={{ ...styles.openButton }}
              onPress={() => {
                handleRateUser();
              }}
            >
              <Text style={styles.textStyle}>Avaliar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

    </View>
  )
}

export default UserProfile;
