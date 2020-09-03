import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage } from "react-native-flash-message";


import AuthContext from '../../contexts/auth'

import styles from './styles';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { loading, signIn } = useContext(AuthContext);

  async function handleLogin() {
    const res = await signIn(email, pass);

    if (res.message === 'failed') {
      showMessage({
        message: "Falha ao tentar logar!",
        type: "danger",
      });
    }
  }


  function handleCreateAccount() {
    props.navigation.navigate('Register')
  }


  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#A8F9BA', '#FA9EAF']}
      style={styles.container}
    >
      <StatusBar barStyle='light-content' backgroundColor='#A8F9BA' />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Moov</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          placeholder='EMAIL'
          placeholderTextColor='#7B6F6F'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder='SENHA'
          placeholderTextColor='#7B6F6F'
          autoCorrect={false}
          autoCapitalize='none'
          secureTextEntry
          onChangeText={text => setPass(text)}
          value={pass}
          style={styles.input}
        />
        {
          loading ?
            <ActivityIndicator color='black' size='large' /> :
            <TouchableOpacity
              onPress={() => handleLogin()}
              style={styles.btn}
            >
              <Text style={styles.btnText}>ENTRAR</Text>
            </TouchableOpacity>
        }
        <TouchableOpacity
          onPress={() => false}
        >
          <Text style={styles.forgotPass}>ESQUECEU SENHA</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => handleCreateAccount()}
          style={styles.bottomBtn}
        >
          <Text style={styles.bottomText1}>NÃO TEM CONTA? <Text style={styles.bottomText2}>CRIE UMA</Text></Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
