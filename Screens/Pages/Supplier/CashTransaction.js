import React,  { useState , Component, useEffect} from 'react';
import { StyleSheet, Text, View, Modal, TextInput, Button, FlatList} from 'react-native';

const apidata = "https://d6cd-2402-3a80-16fd-5112-2ca7-fa44-daa0-4bce.ngrok.io";

export default function CashTransaction({route}) {
    let supplierdata=route.params;
    //console.warn(supplierdata.s_money);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoaded, setIsLoded] = useState(true);
    const [getCashTransaction, setCashTransaction] = useState("");
    const [addMoney, setMoney] = useState("");
    const [getLeft_money, setLeft_money] = useState("");
    const [getAmountBefore, setAmountBefore] = useState("");
    const [loading,setLoading] = useState(true);
    var currDate = new Date().toLocaleDateString();

    let left_money = parseInt(getLeft_money) - addMoney;
    let amount_after = left_money;
    
    var data = {
        "s_name":supplierdata.s_name,
        "amount":addMoney,
        "date":currDate,
        "amount_before":getAmountBefore,
        "amount_after":amount_after,
     }

     const getCashTransactionData = async() => {
        try {
            const response = await fetch(apidata+"/api/v1/SupplierCashTransaction/"+supplierdata.s_name);
            const cashTransactionData = await response.json();
            setCashTransaction(cashTransactionData);
            setIsLoded(false);
            setLoading(false);
            //console.log(cashTransactionData);
        }
        catch (error){
            console.log(error);
        }
        };

        const getSupplierDataByName = async() => {
          try {
              const response = await fetch(apidata+"/api/v1/Supplier/"+supplierdata.s_id);
              const supplierDataByName = await response.json();
              setLeft_money(supplierDataByName[0].left_money);
              setAmountBefore(supplierDataByName[0].left_money);
              //console.warn("hii"+customerDataByName[0].left_money);
              //console.warn("2");
          }
          catch (error){
              console.log(error);
          }
          };

        function postCashTransaction() {
            //console.warn(data);
            fetch(apidata+'/api/v1/SupplierCashTransaction' ,{
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })

          //console.warn(left_money);
          var supplierUpdateData = {
            "left_money":left_money,
          }
          
          
          //console.warn(supplierUpdateData);
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

      <View style={{margin: 20,padding: 10,height: 100,borderWidth: 2,borderRadius: 10}}>
        <View style={{flexDirection: 'row',flex: 1}}>
                <Text style={{position: 'absolute'}}>Supplier Name</Text>
                <Text style={{position: 'absolute', right: 0}}>Amount</Text>
                </View>
                <Text style={{textAlign: 'center'}}> Date MM/DD/YY</Text>
                <View style={{flexDirection: 'row',flex: 1}}>
                <Text style={{position: 'absolute', bottom: 0, left: 0}}>Amount Before</Text>
                <Text style={{position: 'absolute', bottom: 0, right: 0}}>Amount After</Text>
        </View>
      </View>

<FlatList 
        data={getCashTransaction}
        keyExtractor={(item, index) => item.id}
        renderItem = { ({item})=> {
            return (
              <View style={{margin: 20,padding: 10,height: 100, backgroundColor: 'lightblue',borderColor: 'red',borderWidth: 2,borderRadius: 10}}>
              <View style={{flexDirection: 'row',flex: 1}}>
              <Text style={{position: 'absolute'}}>{item.s_name}</Text>
              <Text style={{position: 'absolute', right: 0}}>{item.amount}</Text>
              </View>
              <Text style={{textAlign: 'center'}}> {item.date}</Text>
              <View style={{flexDirection: 'row',flex: 1}}>
              <Text style={{position: 'absolute', bottom: 0, left: 0}}>{item.amount_before}</Text>
              <Text style={{position: 'absolute', bottom: 0, right: 0}}> {item.amount_after}</Text>
              </View>
          </View>
            );
        }}
        onRefresh={() =>getCashTransactionData()}
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

