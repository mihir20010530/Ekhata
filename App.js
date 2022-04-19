import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Screens/Pages/Login';
import Home from './Screens/Pages/Home';

const Appscreen = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Appscreen.Navigator>
      <Appscreen.Screen name="Login" component={Login}  options={{headerShown: false}}/>
      <Appscreen.Screen name="Product" component={Home}  options={{headerShown: false}}/>
    </Appscreen.Navigator>
    </NavigationContainer>
  );
}
