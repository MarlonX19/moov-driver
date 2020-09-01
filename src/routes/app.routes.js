import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../screens/dashboard';
import Profile from '../screens/profile';
import Home from '../screens/home/Home'
import Update from '../screens/update';

import DrawerContent from '../components/DrawerContent';
import CustomDrawerContent from '../components/CustomDrawerContent';

const AppStack = createStackNavigator();

function ProfileRoot() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile} />
      <AppStack.Screen
        options={{ headerShown: false }}
        name="Update"
        component={Update} />
    </AppStack.Navigator>
  );
}



const AppDrawer = createDrawerNavigator();

const AppRoutes = () => (
  <AppDrawer.Navigator
    //drawerContent={DrawerContent}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    initialRouteName="Home"
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
    <AppDrawer.Screen name="Home" component={Home} />
    <AppDrawer.Screen name="Profile" component={ProfileRoot} />
  </AppDrawer.Navigator>
)

export default AppRoutes;

