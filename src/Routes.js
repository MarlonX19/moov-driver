import React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


import Login from './screens/login/Login';
import Home from './screens/home/Home';

import DrawerContent from './components/DrawerContent';
const Drawer = createDrawerNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
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
                <Drawer.Screen name="Login" component={Login} />
                <Drawer.Screen name="Home" component={Home} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
