var dbConn = require('../db.config');

var Supplier =  function(supplier) {
    this.name        =  supplier.name;
    this.phone_no      =  supplier.phone_no;
    this.email          =  supplier.email;
    this.left_money          =  supplier.left_money;
    this.address          =  supplier.address;
    this.city          =  supplier.city;
    this.state          =  supplier.state;
    this.country          =  supplier.country;
}

//get all product
Supplier.getAllSupplier = (result) => {
    dbConn.query('SELECT * FROM Supplier', (err, res) => {
        if(err){
            console.log('Error while fatching supplier', err);
            result(null,err);
        }
        else{
            console.log('Supplier fatchrd Successfully');
            result(null,res);
        }
    })
}

//get employee by id
Supplier.getSupplierByID = (id, result) => {
    dbConn.query('SELECT * FROM Supplier WHERE id=?',id, (err, res)=> {
        if(err){
            console.log('Error while fatching supplier by id', err);
            result(null,err);
        }
        else{
            console.log('Supplier fatchrd Successfully by id');
            result(null,res);
        }
    })
}

//create new Suppliet
Supplier.createSupplier = (supplierReqData, result) => {
    dbConn.query('INSERT INTO supplier SET ?', supplierReqData, (err, res) => {
        if(err){
            console.log("Err while Inserting Data");
            result(null, err);
        }
        else{
            console.log('Supplier created Successfully');
            result(null, res);
        }
    })
}

//update supplier
Supplier.updateSupplier = (name, supplierReqData, result) => {
    dbConn.query('UPDATE supplier SET left_money = ? WHERE name = ?', [supplierReqData.left_money, name], (err, res) => {
        if(err){
            console.log("Err while updating Data");
            result(null, err);
        }
        else{
            console.log('Supplier updated Successfully');
            result(null, res);
        }  
    });
}

module.exports = Supplier;