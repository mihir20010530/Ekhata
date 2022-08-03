var dbConn = require('../db.config');

var SupplierCashTransaction =  function(supplierCashTransaction)  {
    this.s_name        =  supplierCashTransaction.s_name;
    this.amount      =  supplierCashTransaction.amount;
    this.date       =   supplierCashTransaction.date;
    this.amount_before  =  supplierCashTransaction.amount_before;
    this.amount_after  =  supplierCashTransaction.amount_after;
}


//get supplier cash Transaction by name
SupplierCashTransaction.getSupplierCashTransactionByID = (name, result) => {
    dbConn.query('SELECT * FROM Supplier_cash_transaction WHERE s_name=? ORDER BY ID DESC',name, (err, res)=> {
        if(err){
            console.log('Error while fatching supplier cash Transaction by name', err);
            result(null,err);
        }
        else{
            console.log('supplier cash transaction fatchrd Successfully by name');
            result(null,res);
        }
    })
}

//create new Supplier cash Transaction
SupplierCashTransaction.createSupplierCashTransaction = (supplierCashTransactionReqData, result) => {
    dbConn.query('INSERT INTO supplier_cash_transaction SET ?', supplierCashTransactionReqData, (err, res) => {
        if(err){
            console.log("Err while Inserting Data" + err);
            result(null, err);
        }
        else{
            console.log('supplier cash Transaction created Successfully');
            result(null, res);
        }
    })
}

module.exports = SupplierCashTransaction;