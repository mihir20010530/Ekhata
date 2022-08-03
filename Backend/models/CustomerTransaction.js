var dbConn = require('../db.config');

var CustomerTransaction =  function(customerTransaction)  {
    this.c_name        =  customerTransaction.c_name;
    this.selling_price      =  customerTransaction.selling_price;
    //this.profit          =  customerTransaction.profit;
    this.quantity          =  customerTransaction.quantity;
    this.p_name          =  customerTransaction.p_name;
    this.date           =   customerTransaction.date;
    this.amount_before      =   customerTransaction.amount_before;
    this.amount_after      =   customerTransaction.amount_after;
}


//get customer Transaction by name
CustomerTransaction.getCustomerTransactionByID = (name, result) => {
    dbConn.query('SELECT * FROM Customer_transaction WHERE c_name=? ORDER BY ID DESC',name, (err, res)=> {
        if(err){
            console.log('Error while fatching customer Transaction by name', err);
            result(null,err);
        }
        else{
            console.log('customer transaction fatchrd Successfully by name');
            result(null,res);
        }
    })
}

//create new Customer Transaction
CustomerTransaction.createCustomerTransaction = (customerTransactionReqData, result) => {
    dbConn.query('INSERT INTO customer_transaction SET ?', customerTransactionReqData, (err, res) => {
        if(err){
            console.log("Err while Inserting Data");
            result(null, err);
        }
        else{
            console.log('Customer Transaction created Successfully');
            result(null, res);
        }
    })
}

module.exports = CustomerTransaction;