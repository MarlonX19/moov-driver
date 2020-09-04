import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { showMessage } from "react-native-flash-message";

import LinearBackground from '../../components/linearBackground';

import { api } from '../../services/auth';

import styles from './styles';

function Index(props) {
  const [email, setEmail] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);

  const type = 'drivers';

  async function handleCheckEmail() {
    const res = await api.post('/checkEmail', { email, type })
    const { messageCode } = res.data;

    if (messageCode == '404') {
      showMessage({
        message: "Email não encontrado",
        type: "info",
      });
      setEmailChecked(false);
      return;
    }
    setEmailChecked(true);

  }


  async function handleSendToken() {
    const res = await api.post('/forgot', { email, type })

    console.log(res.data);
    if (res?.data?.messageCode == '201') {
      props.navigation.navigate('ResetPass')
    } else {
      showMessage({
        message: "Erro ao enviar código ao e-mail",
        type: "warning",
      });
    }

  }

  return (
    <LinearBackground>
      <View style={styles.topView}>
        <Text style={styles.topText}>Esqueceu a senha? Não tem problema, a gente ajuda</Text>
        <Text style={[styles.topText, { fontSize: 14 }]}>Enviaremos um código no seu email</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder='EMAIL'
          placeholderTextColor='#7B6F6F'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.input}
          onBlur={() => handleCheckEmail()}
        />
        <TouchableOpacity
          onPress={() => handleSendToken()}
          style={[styles.btn, { backgroundColor: emailChecked ? '#000000' : '#999' }]}
          disabled={email.length < 1}
        >
          <Text style={styles.btnText}>Enviar código</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomView}>

      </View>

    </LinearBackground>
  )
}


export default Index;

