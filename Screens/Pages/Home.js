import * as React from 'react';
import {  Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddSupplier from './Supplier/AddSupplier';
import AddCoustomer from './Customer/AddCoustomer';
import CustomerTransaction from './Customer/Transaction';
import SupplierTransaction from './Supplier/Transaction'
import HomeCustomer from './Customer/HomeCustomer';
import HomeSupplier from './Supplier/HomeSupplier';
import HomeProduct from './Product/HomeProduct';

var apiData = "https://a3e6-2402-3a80-16f7-7006-29d9-1f53-b52a-4d54.ngrok.io";
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Products" component={HomeProduct} options={{headerTitleAlign:'center', headerTintColor:'red'}}/>
    </HomeStack.Navigator>
  );
}

const SupplierStack = createNativeStackNavigator();

function SupplierStackScreen() {
  return (
    <SupplierStack.Navigator>
      <SupplierStack.Screen name="Suppliers" component={HomeSupplier}  options={{headerTitleAlign:'center', headerTintColor:'red'}}/>
      <SupplierStack.Screen name="Transaction" component={SupplierTransaction}  options={{headerTitleAlign:'center', headerTintColor:'red'}}/>
      <SupplierStack.Screen name="Add Supplier" component={AddSupplier}  options={{headerTitleAlign:'center', headerTintColor:'red'}}/>
    </SupplierStack.Navigator>
  );
}

const CustomerStack = createNativeStackNavigator();

function CustomerStackScreen() {
  return (
    <CustomerStack.Navigator>
      <CustomerStack.Screen name="Customers" component={HomeCustomer}  options={{headerTitleAlign:'center', headerTintColor:'red'}}/>
      <CustomerStack.Screen name="Transaction" component={CustomerTransaction}  options={{headerTitleAlign:'center', headerTintColor:'red'}}/>
      <CustomerStack.Screen name="Add Customer" component={AddCoustomer}  options={{headerTitleAlign:'center', headerTintColor:'red'}}/>
    </CustomerStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        {/*<Tab.Screen name="Product" component={HomeStackScreen} 
         options={{
          tabBarActiveBackgroundColor: '#B8D8D8',
          tabBarLabelStyle: {color:'red'},
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                require('./Product/Pp.png')
              }
              style={{
                width: 15,
                height: 30,
                borderRadius: 2,
              }}
            />
          )
        }} />*/}
        <Tab.Screen name="Supplier" component={SupplierStackScreen}
        options={{
          tabBarActiveBackgroundColor: '#B8D8D8',
          tabBarLabelStyle: {color:'red'},
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                require('./Product/Sp.png')
              }
              style={{
                width: 15,
                height: 30,
                borderRadius: 2,
              }}
            />
          )
        }}  />
        <Tab.Screen name="Customer" component={CustomerStackScreen}
        options={{
          headerShown: false,
          tabBarActiveBackgroundColor: '#B8D8D8',
          tabBarLabelStyle: {color:'red'},
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                require('./Product/Cp.png')
              }
              style={{
                width: 15,
                height: 30,
                borderRadius: 2,
              }}
            />
          )
        }}  />
      </Tab.Navigator>
    </NavigationContainer>
  );
}