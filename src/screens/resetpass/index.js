import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { showMessage } from "react-native-flash-message";

import LinearBackground from '../../components/linearBackground';

import { api } from '../../services/auth';

import styles from './styles';

function Index(props) {
  const { email } = props.route.params;

  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const type = 'drivers';

  async function handleResetPass() {
    const response = await api.post('/reset', { email, token: code, password, type })
    console.log(response.data);

    if (response?.data?.messageCode == '400') {
      showMessage({
        message: "Token expirado ou inválido",
        type: "warning",
      });

      return;
    }

    if (response?.data?.messageCode == '500') {
      showMessage({
        message: "Erro interno ao alterar senha",
        type: "warning",
      });

      return;
    }

    if (response?.data?.messageCode == '201') {
      showMessage({
        message: "Senha alterada",
        type: "success",
      });

      props.navigation.navigate('Login');
    }


  }

  return (
    <LinearBackground>
      <View style={styles.topView}>
        <Text style={styles.topText}>Recupere sua conta!</Text>
        <Text style={[styles.topText, { fontSize: 14 }]}>Verifique seu e-mail, enviamos um código lá</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder='Código'
          placeholderTextColor='#7B6F6F'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={text => setCode(text)}
          value={code}
          style={styles.input}
        />
        <TextInput
          placeholder='Nova senha'
          placeholderTextColor='#7B6F6F'
          autoCorrect={false}
          autoCapitalize='none'
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
          style={styles.input}
        />
        <TextInput
          placeholder='Confirme a senha'
          placeholderTextColor='#7B6F6F'
          autoCorrect={false}
          autoCapitalize='none'
          secureTextEntry
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          style={styles.input}
        />
        {
          password !== confirmPassword ?
            <Text style={styles.checkPass}>Senhas diferentes</Text> :
            <View />
        }
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

