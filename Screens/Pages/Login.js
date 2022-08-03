import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Home from "./Home";

var logo=require('./logo.png'); 
export default function Login({navigation}) {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <View style={styles.container}>
      <Image source={logo}
               style={{height:200, width:200}}></Image>
 
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
          placeholder="Password."
          placeholderTextColor="#EEF5DB"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}></Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn}
      onPress={() =>{
        if (email == "Mihirsangani2001@gmail.com" && password == "Mihir@123"){
          alert("Successfully Login");
          navigation.navigate('Product')
        }
        else{
          alert("Invalid email or password");
        }
      }}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
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
  },
 
  TextInput: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
 
  forgot_button: {
    height: 1,
    marginBottom: 0,
    marginTop: 1,
    color: "#FE5F55",
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FE5F55",
  },
});