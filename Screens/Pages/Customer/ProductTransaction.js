import React,  { useState , Component, useEffect} from 'react';
import { StyleSheet, Text, View, Modal, TextInput, Button, FlatList, Picker, TextComponent} from 'react-native';
import {apiData} from '../Api';


const apidata = "https://8425-2402-3a80-16fe-bd41-105d-ad7d-e055-940b.ngrok.io";

export default function ProductTransaction({route}) {
    let customerdata=route.params;
    const [selectedProduct, setSelectedProduct] = useState("Select Product");

    const [getProduct, setProduct] = useState("");
    const [isLoaded, setIsLoded] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [productData, addProductData] = useState("");
    const [getProductByName, setProductByName] = useState("");
    const [getProductTransaction, setProductTransaction] = useState("");
    const [addPerchase_price, setPerchase_price] = useState("");
    const [addQuantity, setQuantity] = useState("");
    const [getLeft_money, setLeft_money] = useState("");
    

   

    const getProductTransactionData = async() => {
        try {
            const response = await fetch(apidata+"/api/v1/CustomerTransaction/"+customerdata.c_name);
            const productTransactionData = await response.json();
            setProductTransaction(productTransactionData);
            setIsLoded(false);
           // console.log(productTransactionData);
        }
        catch (error){
            console.log(error);
        }
        };

        function postProductTransaction() {
          let profit = (addPerchase_price - getProductByName.rate)*addQuantity;
          var customerTransactionData = {
            "c_name":customerdata.c_name,
            "selling_price":addPerchase_price,
            "profit":profit,
            "quantity":addQuantity,
            "p_name":productData,
         }
         // console.warn(supplierTransactionData);
          fetch(apidata+'/api/v1/CustomerTransaction' ,{
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customerTransactionData)
        })
        console.warn("1");
        setModalVisible(!modalVisible)
        }

        function updateData() {
          let left_money = getLeft_money + addQuantity*addPerchase_price;
           console.warn(left_money);
          var customerUpdateData = {
            "left_money":left_money,
          }
          console.warn(customerUpdateData);
          fetch(apidata+'/api/v1/Customer/'+customerdata.c_name ,{
          method: "PUT",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customerUpdateData)
        })
        console.warn("3");        

        let quantity = parseInt(getProductByName.quantity) - parseInt(addQuantity);
        let rate = getProductByName.rate;
        console.warn(quantity,rate);
        var productUpdateData = {
          "quantity":quantity,
          "rate":rate,
        }
        
       // console.warn(productUpdateData);
          fetch(apidata+'/api/v1/Product/'+productData ,{
          method: "PUT",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productUpdateData)
        })
        
        }

        const getProductData = async() => {
          try {
              const response = await fetch(apidata+"/api/v1/Product");
              const productData = await response.json();
              console.warn(productData);
              setProduct(productData);
          }
          catch (error){
              console.log(error);
          }
          };

          const getProductDataByName = async() => {
            try {
                const response = await fetch(apidata+"/api/v1/Product/"+productData);
                const productDataByName = await response.json();
                setProductByName(productDataByName[0]);
                console.warn(productDataByName[0]);
                console.warn("2");
            }
            catch (error){
                console.log(error);
            }
            };

            const getCustomerDataByName = async() => {
              try {
                  const response = await fetch(apidata+"/api/v1/Customer/"+customerdata.c_id);
                  const customerDataByName = await response.json();
                  setLeft_money(customerDataByName[0].left_money);
                  console.warn("hii"+customerDataByName[0].left_money);
                  console.warn("2");
                  
              }
              catch (error){
                  console.log(error);
              }
              };
  

    useEffect(() => {
        getProductTransactionData();
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
          onChangeText={(productData) => addProductData(productData)}
        />
        <TextInput
          style={{height:40,borderRadius:10,width:200,marginTop:10,paddingLeft:20}}
          placeholder="Add New Product Price"
          keyboardType='numeric'
          backgroundColor="#B8D8D8"   
          placeholderTextColor="#4F6367"
          onChangeText={(addPerchase_price) =>{getCustomerDataByName();getProductDataByName(); setPerchase_price(addPerchase_price)}}
        />
        <TextInput
          style={{height:40,borderRadius:10,width:200,marginTop:10,paddingLeft:20}}
          placeholder="Add Product Quantity"
          keyboardType='numeric'
          backgroundColor="#B8D8D8"   
          placeholderTextColor="#4F6367"
          onChangeText={(addQuantity) => setQuantity(addQuantity)}
        />

        <View style={styles.addModel}>
            <View style={styles.buttonStyle}>
            <Button
              title="Add"
              onPress={() => {postProductTransaction(); 
                updateData();
              }}
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

        <Button style={styles.btn}
        title="Add Product"
        onPress={() => setModalVisible(true)}  
        />
            

    <FlatList 
        data={getProductTransaction}
        keyExtractor={(item, index) => item.id}
        renderItem = { ({item})=> {
            return (
            <View style={{margin: 20,padding: 10,height: 100, backgroundColor: 'lightblue',borderColor: 'red',borderWidth: 2,borderRadius: 10}}>
                <View style={{flexDirection: 'row',flex: 1}}>
                <Text style={{position: 'absolute'}}>{item.c_name}</Text>
                <Text style={{position: 'absolute', right: 0}}>{item.p_name}</Text>
                </View>
                <Text style={{textAlign: 'center'}}> {item.date}</Text>
                <View style={{flexDirection: 'row',flex: 1}}>
                <Text style={{position: 'absolute', bottom: 0, left: 0}}>{item.quantity}</Text>
                <Text style={{position: 'absolute', bottom: 0, right: 0}}> {item.selling_price}</Text>
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

    addModel: {
        flexDirection: 'row',
        alignContent: 'center',
        marginVertical: 10,

    },

    btn: {
    right: 10,
    left: 10,
    position: 'absolute',
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