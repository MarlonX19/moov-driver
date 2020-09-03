import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { showMessage } from "react-native-flash-message";

import LinearBackground from '../../components/linearBackground';

import { api } from '../../services/auth';

import styles from './styles';

function Index(props) {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const type = 'drivers';

  async function handleResetPass() {


  }

  return (
    <LinearBackground>
      <View style={styles.topView}>
        <Text style={styles.topText}>Recupere sua conta!</Text>
        <Text style={[styles.topText, { fontSize: 14 }]}>Enviaremos um código no seu email</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder='Código'
          placeholderTextColor='#7B6F6F'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={text => setEmail(text)}
          value={code}
          style={styles.input}
        />
        <TextInput
          placeholder='Senha'
          placeholderTextColor='#7B6F6F'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={text => setEmail(text)}
          value={password}
          style={styles.input}
        />
        <TextInput
          placeholder='Confirme a senha'
          placeholderTextColor='#7B6F6F'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={text => setEmail(text)}
          value={confirmPassword}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => handleResetPass()}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Redefinir senha</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomView}>

      </View>

    </LinearBackground>
  )
}


export default Index;

