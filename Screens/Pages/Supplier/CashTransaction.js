import React,  { useState , Component, useEffect} from 'react';
import { StyleSheet, Text, View, Modal, TextInput, Button, FlatList} from 'react-native';

const apidata = "https://8425-2402-3a80-16fe-bd41-105d-ad7d-e055-940b.ngrok.io";

export default function CashTransaction({route}) {
    let supplierdata=route.params;
    console.warn(supplierdata.s_money);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoaded, setIsLoded] = useState(true);
    const [getCashTransaction, setCashTransaction] = useState("");
    const [addMoney, setMoney] = useState("");
    const [getLeft_money, setLeft_money] = useState("");
    let left_money = parseInt(getLeft_money) - addMoney;
    
    var data = {
        "s_name":supplierdata.s_name,
        "amount":addMoney,
     }

     const getCashTransactionData = async() => {
        try {
            const response = await fetch(apidata+"/api/v1/SupplierCashTransaction/"+supplierdata.s_name);
            const cashTransactionData = await response.json();
            setCashTransaction(cashTransactionData);
            setIsLoded(false);
            console.log(cashTransactionData);
        }
        catch (error){
            console.log(error);
        }
        };

        const getSupplierDataByName = async() => {
          try {
              const response = await fetch(apidata+"/api/v1/Supplier/"+supplierdata.s_id);
              const customerDataByName = await response.json();
              setLeft_money(customerDataByName[0].left_money);
              console.warn("hii"+customerDataByName[0].left_money);
              console.warn("2");
          }
          catch (error){
              console.log(error);
          }
          };

        function postCashTransaction() {
            console.warn(data);
            fetch(apidata+'/api/v1/SupplierCashTransaction' ,{
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })

          console.warn(left_money);
          var supplierUpdateData = {
            "left_money":left_money,
          }
          console.warn(supplierUpdateData);
          fetch(apidata+'/api/v1/Supplier/'+supplierdata.s_name ,{
          method: "PUT",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(supplierUpdateData)
        })
        
          setModalVisible(!modalVisible)
          }

          useEffect(() => {
            getCashTransactionData();
        }, []);

    return(
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
          placeholder="Add Payment"
          keyboardType='numeric'
          backgroundColor="#B8D8D8"   
          placeholderTextColor="#4F6367"
          onChangeText={(addMoney) => {getSupplierDataByName(); setMoney(addMoney)}}
        />

        <View style={styles.addModel}>
            <View style={styles.buttonStyle}>
            <Button
              title="Add"
              onPress={() => postCashTransaction()}
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
        title="Add Payment"
        onPress={() => setModalVisible(true)}  
        />

<FlatList 
        data={getCashTransaction}
        keyExtractor={(item, index) => item.id}
        renderItem = { ({item})=> {
            return (
                <View style={{marginHorizontal: 20, marginVertical: 10,padding: 10,height: 50, backgroundColor: '#B8D8D8',borderColor: '#FE5F55',borderWidth: 2,borderRadius: 10}}>
                <View style={{flexDirection: 'row'}}>
                <Text style={{position: 'absolute', color: '#4F6367', justifyContent: 'center',fontSize: 20}}>{item.s_name}</Text>
                <Text style={{position: 'absolute', right: 0, color: '#FE5F55', justifyContent: 'center', fontSize: 20}}>{item.amount}</Text>
                </View>
                <Text style={{textAlign: 'center', color: '#4F6367',fontSize: 15}}>{item.date}</Text>
            
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

