import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from 'react-native';
import Dashboard from './Dashboard';
import SettingScreen from './SettingScreen';


const Drawer = createDrawerNavigator();


const ScreenWithSideOption = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Language Settings" component={SettingScreen} />
    </Drawer.Navigator>

  );
}

export  default ScreenWithSideOption;
