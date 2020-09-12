import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext({ signed: false, user: {} });


import { api } from '../services/auth';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


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
    setLoading(true);

    return api.post("/driverlogin", { email, password })
      .then(async response => {
        console.log(response.data)
        try {
          await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data.response[0]));
          await AsyncStorage.setItem('@RNAuth:token', response.data.response[0].push_id);
        } catch (error) {
          console.log(error);
          setLoading(false);
          return { message: 'failed' }
        }
        setLoading(false);
        setUser(response.data.response[0]);
        return { message: 'logged' }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        return { message: 'failed' }
      });
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    })
  }

  async function updateUser(userData) {
    return api.put("/drivers", { userData })
      .then(async response => {
        console.log('========response da atualização aqui=======')
        console.log(response.data.response[0])
        try {
          await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data.response[0]));
          await AsyncStorage.setItem('@RNAuth:token', response.data.response[0].push_id);
        } catch (error) {
          console.log(error);
        }
        setUser(response.data.response[0]);
        return { message: 'updated' }
      })
      .catch((error) => {
        console.log(error);
        return { message: 'error' }
      });
  }

  function sayHi() {
    alert('ola')
  }

  return (
    <AuthContext.Provider value={{
      signed: !!user,
      user,
      signIn,
      signOut,
      loading,
      sayHi,
      updateUser
    }} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;