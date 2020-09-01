import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext({ signed: false, user: {} });


import { api } from '../services/auth';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      } else if (!storageUser && !storageToken) {
        setLoading(false);
      }

    }

    loadStorageData();
  }, [])

  async function signIn(email, password) {

    return api.post("/driverlogin", { email, password })
      .then(async response => {
        try {
          await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data[0]));
          await AsyncStorage.setItem('@RNAuth:token', response.data[0].push_id);
        } catch (error) {
          console.log(error);
          return { message: 'failed' }
        }
        setUser(response.data[0]);
        return { message: 'logged' }
      })
      .catch((error) => {
        console.log(error);

        return { message: 'failed' }
      });
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    })
  }

  function sayHi() {
    alert('ola')
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading, sayHi }} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;