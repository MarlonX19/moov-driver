import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Screens from '../screens';
const { Dashboard, Profile, Home,
  Update, Help, History, Request } = Screens;


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


function HistoryRoot() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        options={{ headerShown: false }}
        name="History"
        component={History} />
      <AppStack.Screen
        options={{ headerShown: false }}
        name="Detalhes"
        component={Request} />
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
      activeTintColor: '#95ed9e',
      itemStyle: { marginVertical: 10 },
    }}
  >
    <AppDrawer.Screen name="Home" component={Home} />
    <AppDrawer.Screen name="Profile" component={ProfileRoot} />
    <AppDrawer.Screen name="History" component={HistoryRoot} />
    <AppDrawer.Screen name="Ajuda" component={Help} />
  </AppDrawer.Navigator>
)

export default AppRoutes;

