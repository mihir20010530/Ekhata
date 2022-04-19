import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";

const apidata = "https://4993-2402-8100-398d-5f11-d038-2a00-4bd5-e9cb.ngrok.io";

var logo=require('./logo.png');
 
export default function AddSupplier() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [leftmoney, setLeftmoney] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  var data = {
    "name": name,
    "phone_no": phone,
    "email": email,
    "left_money": leftmoney,
    "address": address,
    "city": city,
    "state": state,
    "country": country,
 }

 function postSupplier() {
  fetch(apidata +'/api/v1/Supplier' ,{
  method: "POST",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
}
 
  return (
    <ScrollView>
    <View style={styles.container}>
      <Image source={logo}
               style={{height:150, width:150}}></Image>
 
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Supplier Name."
          placeholderTextColor="#EEF5DB"
          onChangeText={(name) => setName(name)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Phone No."
          keyboardType='numeric'
          placeholderTextColor="#EEF5DB"
          onChangeText={(phone) => setPhone(phone)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#EEF5DB"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Remaining Money to Pay."
          keyboardType='numeric'
          placeholderTextColor="#EEF5DB"
          onChangeText={(leftmoney) => setLeftmoney(leftmoney)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Address."
          placeholderTextColor="#EEF5DB"
          onChangeText={(address) => setAddress(address)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="City."
          placeholderTextColor="#EEF5DB"
          onChangeText={(city) => setCity(city)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="State."
          placeholderTextColor="#EEF5DB"
          onChangeText={(state) => setState(state)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Country."
          placeholderTextColor="#EEF5DB"
          onChangeText={(country) => setCountry(country)}
        />
      </View>

      <TouchableOpacity style={styles.registerBtn}
      onPress={postSupplier}>
        <Text style={styles.registerBtnText}>Register Supplier</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
  
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8D8D8',
    alignItems: "center",
    justifyContent: "center",
  },
 
  inputView: {
    backgroundColor: "#4F6367",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
 
  TextInput: {
    height: 40,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    color: "#EEF5DB",
  },

  registerBtnText: {
    color: "#EEF5DB",
  },
 
  registerBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    marginBottom:30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FE5F55",
  },
});