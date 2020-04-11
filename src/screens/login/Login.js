import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#A8F9BA', '#FA9EAF']}
      style={styles.container}
    >
      <StatusBar barStyle='light-content' backgroundColor='#A8F9BA' />
      <View style={{ flex: 1, justifyContent: 'center' , alignItems: 'center'}}>
        <Text style={styles.title}>Moov</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' , alignItems: 'center'}}>
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
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Home')}
        style={styles.btn}
      >
        <Text style={styles.btnText}>ENTRAR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => false}
      >
        <Text style={styles.forgotPass}>ESQUECEU SENHA</Text>
      </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'center' , alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => false}
        style={styles.bottomBtn}
      >
        <Text style={styles.bottomText1}>NÃO TEM CONTA? <Text style={styles.bottomText2}>CRIE UMA</Text></Text>
      </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
