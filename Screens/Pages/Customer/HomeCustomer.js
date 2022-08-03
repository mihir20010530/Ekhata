import React, { useState , useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Transaction from "./Transaction";
const apidata = "https://129e-2402-3a80-16f0-fd08-31bb-5151-45ba-d690.ngrok.io";

export default function HomeCustomer({ navigation }) {
    const [getCustomer, setCustomer] = useState();
    const [isLoaded, setIsLoded] = useState(true);
    const [loading,setLoading] = useState(true);


    const getCustomerData = async() => {
        try {
            const response = await fetch(apidata+"/api/v1/Customer");
            const customerData = await response.json();
            setCustomer(customerData);
            setIsLoded(false);
            setLoading(false);
            //console.log(customerData);
        }
        catch (error){
            console.log(error);
        }
        };

    useEffect(() => {
        getCustomerData();
    }, []);

    return (        
        <View style={{backgroundColor: '#EEF5DB', flex: 1}}>
        <Button style={styles.btn}
        title="Add Customer"
        onPress={() => navigation.navigate('Add Customer')}  
        />

            <View style={{marginHorizontal: 20,padding: 10,height: 50,}}>
            <View style={{flexDirection: 'row'}}>
            <Text style={{position: 'absolute', color: '#4F6367', justifyContent: 'center',fontSize: 20}}>Customer Name</Text>
            <Text style={{position: 'absolute', right: 0, color: '#FE5F55', justifyContent: 'center', fontSize: 20}}>Remaining Money</Text>
            </View>   
            </View> 
            
        <FlatList 
        data={getCustomer}
        keyExtractor={(item, index) => item.id}
        renderItem = { ({item})=> {
            return (
            <View 
            style={{marginHorizontal: 20, marginVertical: 10, padding: 10,height: 50, backgroundColor: '#B8D8D8',borderColor: '#FE5F55',borderWidth: 2,borderRadius: 10}}
            onStartShouldSetResponder={() => navigation.push('Transaction', JSON.stringify(item))}>
            <View style={{flexDirection: 'row'}}>
            <Text style={{position: 'absolute', color: '#4F6367', justifyContent: 'center',fontSize: 20}}>{item.name}</Text>
            <Text style={{position: 'absolute', right: 0, color: '#FE5F55', justifyContent: 'center', fontSize: 20}}>{item.left_money}{item.description}</Text>
            </View>
        
    </View>
            );
        }}
        onRefresh={() =>getCustomerData()}
        refreshing={loading}
    />

    
    
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 5,
        height: 50, 
        backgroundColor: 'lightblue',
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 10,
    },

    btn: {
    right: 10,
    left: 10,
    position: 'absolute',
    bottom: 80,
    },

    text: {
        height: 50,
    },
});