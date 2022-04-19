import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Profile() {
    return(
    <View style={{margin: 20,padding: 10,height: 40, backgroundColor: 'lightblue',borderColor: 'red',borderWidth: 2,borderRadius: 10}}>
        <View style={{flexDirection: 'row',flex: 1}}>
        <Text style={{position: 'absolute'}}>Mihir</Text>
        <Text style={{position: 'absolute', right: 0}}>Amount</Text>
        </View>
        <Text style={{textAlign: 'center'}}>Date Time</Text>
        
    </View>
    )

}

