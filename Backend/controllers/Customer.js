const CustomerModel = require('../models/Customer'); 

//get all Customer list
exports.getCustomerList = (req,res) => {
    console.log("All Customers");
    CustomerModel.getAllCustomer((err,customers) => {
        console.log('here');
        if(err) res.send(err);
        else{
            console.log('Customers', customers);
            res.send(customers)
        }
    })
}

//get customer by id
exports.getCustomerByID = (req,res) => {
    console.log('get customer by id');
    CustomerModel.getCustomerByID(req.params.id, (err, customer)=> {
        if(err) res.send(err);
        else{
            console.log('Customers', customer);
            res.send(customer)
        }
    })
}

//create new customer
exports.createNewCustomer = (req, res) => {
    console.log('req data', req.body);
    const customerReqData = new CustomerModel(req.body)

    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all field'});
    }
    else{
        console.log('valid data');
        CustomerModel.createCustomer((customerReqData), (err, customer)=> {
            if(err){
                res.send(err);}
            else{
                res.json({status: true, message: 'Submited', data: customer})
            }
        })
}
}

//update Customer
exports.updateCustomer = (req, res) => {
    console.log('req data update', req.body);
    const customerReqData = new CustomerModel(req.body)
    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all field'});
    }
    else{
        console.log('valid data');
        CustomerModel.updateCustomer(req.params.name, customerReqData, (err, customer)=> {
            if(err){
                res.send(err);}
            else{
                res.json({status: true, message: 'updated', data: customer})
            }
        })
}
}

