import React, { useState , Component, useEffect} from "react";

import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

const apidata = "https://c3ac-2402-3a80-16eb-3f31-f4e0-e30-49fb-4a56.ngrok.io";

export default function HomeProduct() {
    const [getProduct, setProduct] = useState();
    const [isLoaded, setIsLoded] = useState(true);
    const [loading,setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [addProduct, addData] = useState("");
    var data = {
      "p_name":addProduct,
      "quantity":0,
      "rate":0,
   }

    const getProductData = async() => {
        try {
          //console.warn(apidata.apidata);
            const response = await fetch(apidata+"/api/v1/Product");
            const productData = await response.json();
            setProduct(productData);
            setIsLoded(false);
            setLoading(false);
           // console.log(response);
        }
        catch (error){
            console.log(error);
        }
        };

        function postProduct() {
          setModalVisible(!modalVisible)
          fetch(apidata+'/api/v1/Product' ,{
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        }

    useEffect(() => {
        getProductData();
    }, []);

    return (        
    <View style={{backgroundColor: '#EEF5DB', flex: 1}}>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
          style={{height:40,borderRadius:10,width:200,marginTop:10,paddingLeft:20}}
          placeholder="Add New Product"
          backgroundColor="#B8D8D8"   
          placeholderTextColor="#4F6367"
          onChangeText={(addProduct) => addData(addProduct)}
        />

        <View style={styles.addModel}>
            <View style={styles.buttonStyle}>
            <Button
              title="Add"
              onPress={() => postProduct()}
              />
            </View>
            <View style={styles.buttonStyle}>
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
        </View>
              
          </View>
        </View>
    </Modal>

        <Button
        title="Add Product"
        onPress={() => setModalVisible(true)}  
        />

            <View style={{marginHorizontal: 20,padding: 10,height: 50,}}>
            <View style={{flexDirection: 'row'}}>
            <Text style={{position: 'absolute', color: '#4F6367', justifyContent: 'center',fontSize: 20}}>Product Name</Text>
            <Text style={{position: 'absolute', right: 0, color: '#FE5F55', justifyContent: 'center', fontSize: 20}}>Quantity</Text>
            </View>   
            </View>         

    <FlatList 
        data={getProduct}
        keyExtractor={(item, index) => item.p_id}
        renderItem = { ({item})=> {
            return (
            <View style={{marginHorizontal: 20, marginVertical: 10,padding: 10,height: 50, backgroundColor: '#B8D8D8',borderColor: '#FE5F55',borderWidth: 2,borderRadius: 10}}>
            <View style={{flexDirection: 'row'}}>
            <Text style={{position: 'absolute', color: '#4F6367', justifyContent: 'center',fontSize: 20}}>{item.p_name}</Text>
            <Text style={{position: 'absolute', right: 0, color: '#FE5F55', justifyContent: 'center', fontSize: 20}}>{item.quantity}</Text>
            </View>
        
    </View>
            );
        }}
        onRefresh={() =>getProductData()}
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

    addModel: {
        flexDirection: 'row',
        alignContent: 'center',
        marginVertical: 10,

    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
      },
      modalView: {
        margin: 20,
        backgroundColor: '#4F6367',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
      },
      buttonStyle: {
        borderRadius: 30,
        height: 80,
        justifyContent: 'center',
        padding: 10,
        width: 100,
      },
    
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 20,
        textAlign: 'center',
      },
});