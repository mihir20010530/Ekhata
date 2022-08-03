import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Screens/Pages/Login';
import Home from './Screens/Pages/Home';

var apiData = "https://a3e6-2402-3a80-16f7-7006-29d9-1f53-b52a-4d54.ngrok.io";

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
