import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Screens from '../screens';
const { Login, Register, ForgotPass, ResetPass } = Screens;

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen options={{
      headerShown: true
    }} name="Register" component={Register} />
    <AuthStack.Screen options={{
      title: 'Esqueci senha',
      headerShown: true,
      headerStyle: {
        backgroundColor: '#A8F9BA',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
    }} name="ForgotPass" component={ForgotPass} />
    <AuthStack.Screen options={{
      title: 'Redefinir senha',
      headerShown: true,
      headerStyle: {
        backgroundColor: '#A8F9BA',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
    }} name="ResetPass" component={ResetPass} />
  </AuthStack.Navigator>
)

export default AuthRoutes;