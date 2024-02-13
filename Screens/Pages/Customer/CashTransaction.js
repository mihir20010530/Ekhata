import React,  { useState , Component, useEffect} from 'react';
import { StyleSheet, Text, View, Modal, TextInput, Button, FlatList} from 'react-native';

const apidata = "http://192.168.246.40:1235";

export default function CashTransaction({route}) {
    let customerdata=route.params;
    //console.warn(customerdata.c_money);
    //console.warn(customerdata.c_name);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoaded, setIsLoded] = useState(true);
    const [loading,setLoading] = useState(true);
    const [getCashTransaction, setCashTransaction] = useState("");
    const [addMoney, setMoney] = useState("");
    const [getLeft_money, setLeft_money] = useState("");
    const [getAmountBefore, setAmountBefore] = useState("");
    var currDate = new Date().toLocaleDateString();

    let left_money = parseInt(getLeft_money) - addMoney;
    let amount_after = left_money;
    
    var data = {
        "c_name":customerdata.c_name,
        "amount":addMoney,
        "date":currDate,
        "amount_before":getAmountBefore,
        "amount_after":amount_after,
     }
     

     const getCashTransactionData = async() => {
        try {
            const response = await fetch(apidata+"/api/v1/CustomerCashTransaction/"+customerdata.c_name);
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

        const getCustomerDataByName = async() => {
          try {
              const response = await fetch(apidata+"/api/v1/Customer/"+customerdata.c_id);
              const customerDataByName = await response.json();
              setLeft_money(customerDataByName[0].left_money);
              setAmountBefore(customerDataByName[0].left_money);
              //console.warn("hii"+customerDataByName[0].left_money);
              //console.warn("2");
          }
          catch (error){
              console.log(error);
          }
          };

        function postCashTransaction() {
            //console.warn(data);
            fetch(apidata+'/api/v1/CustomerCashTransaction' ,{
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })

          //console.warn(left_money);
          var customerUpdateData = {
            "left_money":left_money,
          }
          //console.warn(customerUpdateData);
          fetch(apidata+'/api/v1/Customer/'+customerdata.c_name ,{
          method: "PUT",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customerUpdateData)
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
          onChangeText={(addMoney) => {getCustomerDataByName(); setMoney(addMoney)}}
        />

        <View style={styles.addModel}>
            <View style={styles.buttonStyle}>
            <Button
              title="Add"
              onPress={() => {postCashTransaction();}}
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
                <Text style={{position: 'absolute'}}>Customer Name</Text>
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
              <Text style={{position: 'absolute'}}>{item.c_name}</Text>
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


