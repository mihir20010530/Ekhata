import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Transaction from "./Transaction";
import {apiData} from '../Api';
const apidata = "https://8425-2402-3a80-16fe-bd41-105d-ad7d-e055-940b.ngrok.io";

export default function HomeSupplier({ navigation }) {
        const [getSupplier, setSupplier] = useState();
        const [isLoaded, setIsLoded] = useState(true);
    
        const getSupplierData = async() => {
            try {
                const response = await fetch(apidata + "/api/v1/Supplier");
                const supplierData = await response.json();
                setSupplier(supplierData);
                setIsLoded(false);
                console.log(supplierData);
            }
            catch (error){
                console.log(error);
            }
            };
    
        useEffect(() => {
            getSupplierData();
        }, []);
    
        return (        
            <View style={{backgroundColor: '#EEF5DB', flex: 1}}>
            <Button style={styles.btn}
            title="Add Supplier"
            onPress={() => navigation.navigate('Add Supplier')}  
            />
                
            <FlatList 
            data={getSupplier}
            keyExtractor={(item, index) => item.id}
            renderItem = { ({item})=> {
                return (
                <View 
                style={{marginHorizontal: 20, marginVertical: 10, padding: 10,height: 50, backgroundColor: '#B8D8D8',borderColor: '#FE5F55',borderWidth: 2,borderRadius: 10}}
                onStartShouldSetResponder={() => navigation.push('Transaction', JSON.stringify(item))}>
                <View style={{flexDirection: 'row'}}>
                <Text style={{position: 'absolute', color: '#4F6367', justifyContent: 'center',fontSize: 20}}>{item.name}</Text>
                <Text style={{position: 'absolute', right: 0, color: '#FE5F55', justifyContent: 'center', fontSize: 20}}>{item.left_money}</Text>
                </View>
            
        </View>
                );
            }}
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