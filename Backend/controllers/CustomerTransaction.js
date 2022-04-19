const CustomerTransactionModel = require('../models/CustomerTransaction'); 


//get customer by name
exports.getCustomerTransactionByID = (req,res) => {
    console.log('get customer transaction by name');
    CustomerTransactionModel.getCustomerTransactionByID(req.params.name, (err, customerTransaction)=> {
        if(err) res.send(err);
        else{
            console.log('CustomerTransaction', customerTransaction);
            res.send(customerTransaction)
        }
    })
}

//create new customer Transaction
exports.createNewCustomerTransaction = (req, res) => {
    console.log('req data', req.body);
    const customerTransactionReqData = new CustomerTransactionModel(req.body)

    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all field'});
    }
    else{
        console.log('valid data');
        CustomerTransactionModel.createCustomerTransaction((customerTransactionReqData), (err, customerTransaction)=> {
            if(err){
                res.send(err);}
            else{
                res.json({status: true, message: 'Submited', data: customerTransaction})
            }
        })
}
}
