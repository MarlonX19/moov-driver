import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Screens from '../screens';
const { Login, Register } = Screens;


import DrawerContent from '../components/DrawerContent';


const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Register" component={Register} />
  </AuthStack.Navigator>
)

export default AuthRoutes;