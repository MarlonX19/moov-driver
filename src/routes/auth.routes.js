import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from '../screens/login/Login';


import DrawerContent from '../components/DrawerContent';


//const AuthStack = createStackNavigator();
const AuthStack = createDrawerNavigator();

const AuthRoutes = () => (
       <AuthStack.Navigator
        drawerContent={DrawerContent}
        initialRouteName="Login"
        overlayColor='rgba(0,0,0,0.6)'
        drawerStyle={{
          backgroundColor: '#fff',
          width: 280,
        }}
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 10 },
        }}
      >
        <AuthStack.Screen name="Login" component={Login} />
      </AuthStack.Navigator>
)

export default AuthRoutes;