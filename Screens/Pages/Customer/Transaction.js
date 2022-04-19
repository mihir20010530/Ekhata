import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CashTransaction from './CashTransaction';
import ProductTransaction from './ProductTransaction';
import Profile from './Profile';

const Tab = createMaterialTopTabNavigator();


export default function Transaction({route}) {
  let data=JSON.parse(route.params);
    return(

    <Tab.Navigator>
      <Tab.Screen name="Product Transaction" component={ProductTransaction} initialParams={{c_id:data.id , c_name:data.name, c_money:data.left_money}}/>
      <Tab.Screen name="Cash Transaction" component={CashTransaction} initialParams={{c_id:data.id , c_name:data.name, c_money:data.left_money}}/>
      
    </Tab.Navigator>

    

    
    );

}

