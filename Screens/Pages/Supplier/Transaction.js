import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CashTransaction from './CashTransaction';
import ProductTransaction from './ProductTransaction';
import Profile from './Profile';

const Tab = createMaterialTopTabNavigator();


export default function Transaction({route}) {
 // console.warn(route);
  let data=JSON.parse(route.params);
  //console.warn(data.s_id);
  
    return(
    <Tab.Navigator>
      <Tab.Screen name="Product Transaction" component={ProductTransaction} initialParams={{s_id:data.id , s_name:data.name, s_money:data.left_money}} />
      <Tab.Screen name="Cash Transaction" component={CashTransaction} initialParams={{s_id:data.id , s_name:data.name, s_money:data.left_money}}/>
      
    </Tab.Navigator>  
    );
}

