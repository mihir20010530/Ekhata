var dbConn = require('../db.config');

var Customer =  function(customer)  {
    this.name        =  customer.name;
    this.phone_no      =  customer.phone_no;
    this.email          =  customer.email;
    this.left_money          =  customer.left_money;
    this.address          =  customer.address;
    this.city          =  customer.city;
    this.state          =  customer.state;
    this.country          =  customer.country;
    this.description        =   customer.description;
}

//get all product
Customer.getAllCustomer = (result) => {
    dbConn.query('SELECT * FROM CUSTOMER ORDER BY NAME', (err, res) => {
        if(err){
            console.log('Error while fatching error', err);
            result(null,err);
        }
        else{
            console.log('Customer fatchrd Successfully');
            result(null,res);
        }
    })
}

//get customer by id
Customer.getCustomerByID = (id, result) => {
    dbConn.query('SELECT * FROM Customer WHERE id=?',id, (err, res)=> {
        if(err){
            console.log('Error while fatching customer by id', err);
            result(null,err);
        }
        else{
            console.log('customer fatchrd Successfully by id');
            result(null,res);
        }
    })
}

//create new Customer
Customer.createCustomer = (customerReqData, result) => {
    dbConn.query('INSERT INTO customer SET ?', customerReqData, (err, res) => {
        if(err){
            console.log("Err while Inserting Data");
            result(null, err);
        }
        else{
            console.log('Customer created Successfully');
            result(null, res);
        }
    })
}

//update customer
Customer.updateCustomer = (name, customerReqData, result) => {
    dbConn.query('UPDATE customer SET left_money = ? WHERE name = ?', [customerReqData.left_money, name], (err, res) => {
        if(err){
            console.log("Err while updating Data");
            result(null, err);
        }
        else{
            console.log('Customer updated Successfully');
            result(null, res);
        }  
    });
}

module.exports = Customer;