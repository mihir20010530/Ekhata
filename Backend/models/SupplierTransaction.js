var dbConn = require('../db.config');

var SupplierTransaction =  function(supplierTransaction)  {
    this.s_name        =  supplierTransaction.s_name;
    this.perchase_price      =  supplierTransaction.perchase_price;
    this.quantity          =  supplierTransaction.quantity;
    this.date           =   supplierTransaction.date;
    this.p_name          =  supplierTransaction.p_name;
    this.amount_before      =   supplierTransaction.amount_before;
    this.amount_after      =   supplierTransaction.amount_after;
}


//get Supplier Transaction by id
SupplierTransaction.getSupplierTransactionByID = (name, result) => {
    dbConn.query('SELECT * FROM Supplier_transaction WHERE s_name=? ORDER BY ID DESC',name, (err, res)=> {
        if(err){
            console.log('Error while fatching Supplier Transaction by name', err);
            result(null,err);
        }
        else{
            console.log('Supplier transaction fatchrd Successfully by name');
            result(null,res);
        }
    })
}

//create new Supplier Transaction
SupplierTransaction.createSupplierTransaction = (supplierTransactionReqData, result) => {
    dbConn.query('INSERT INTO Supplier_transaction SET ?', supplierTransactionReqData, (err, res) => {
        if(err){
            console.log("Err while Inserting Data");
            result(null, err);
        }
        else{
            console.log('Supplier Transaction created Successfully');
            result(null, res);
        }
    })
}

module.exports = SupplierTransaction;