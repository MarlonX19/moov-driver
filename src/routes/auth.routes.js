import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Screens from '../screens';
const { Login, Register, ForgotPass } = Screens;

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Register" component={Register} />
    <AuthStack.Screen name="ForgotPass" component={ForgotPass} />
  </AuthStack.Navigator>
)

export default AuthRoutes;