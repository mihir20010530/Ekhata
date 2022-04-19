import * as React from 'react';
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

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Products" component={HomeProduct}/>
    </HomeStack.Navigator>
  );
}

const SupplierStack = createNativeStackNavigator();

function SupplierStackScreen() {
  return (
    <SupplierStack.Navigator>
      <SupplierStack.Screen name="Suppliers" component={HomeSupplier} />
      <SupplierStack.Screen name="Transaction" component={SupplierTransaction} />
      <SupplierStack.Screen name="Add Supplier" component={AddSupplier} />
    </SupplierStack.Navigator>
  );
}

const CustomerStack = createNativeStackNavigator();

function CustomerStackScreen() {
  return (
    <CustomerStack.Navigator>
      <CustomerStack.Screen name="Customers" component={HomeCustomer} />
      <CustomerStack.Screen name="Transaction" component={CustomerTransaction} />
      <CustomerStack.Screen name="Add Customer" component={AddCoustomer} />
    </CustomerStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Product" component={HomeStackScreen} options={{headerShown: false}} />
        <Tab.Screen name="Supplier" component={SupplierStackScreen} options={{headerShown: false}} />
        <Tab.Screen name="Coustomer" component={CustomerStackScreen} options={{headerShown: false}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}