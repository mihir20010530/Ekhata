var dbConn = require('../db.config');

var CustomerCashTransaction =  function(customerCashTransaction)  {
    this.c_name        =  customerCashTransaction.c_name;
    this.amount      =  customerCashTransaction.amount;
}


//get customer cash Transaction by name
CustomerCashTransaction.getCustomerCashTransactionByID = (name, result) => {
    dbConn.query('SELECT * FROM Customer_cash_transaction WHERE c_name=?',name, (err, res)=> {
        if(err){
            console.log('Error while fatching customer cash Transaction by name', err);
            result(null,err);
        }
        else{
            console.log('customer cash transaction fatchrd Successfully by name');
            result(null,res);
        }
    })
}

//create new Customer cash Transaction
CustomerCashTransaction.createCustomerCashTransaction = (customerCashTransactionReqData, result) => {
    dbConn.query('INSERT INTO customer_cash_transaction SET ?', customerCashTransactionReqData, (err, res) => {
        if(err){
            console.log("Err while Inserting Data");
            result(null, err);
        }
        else{
            console.log('Customer cash Transaction created Successfully');
            result(null, res);
        }
    })
}

module.exports = CustomerCashTransaction;