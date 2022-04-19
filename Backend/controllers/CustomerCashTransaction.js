const CustomerCashTransactionModel = require('../models/CustomerCashTransaction'); 


//get customer cash transaction by name
exports.getCustomerCashTransactionByID = (req,res) => {
    console.log('get customer cash transaction by name');
    CustomerCashTransactionModel.getCustomerCashTransactionByID(req.params.name, (err, customerCashTransaction)=> {
        if(err) res.send(err);
        else{
            console.log('CustomerCashTransaction', customerCashTransaction);
            res.send(customerCashTransaction)
        }
    })
}

//create new customer cash Transaction
exports.createNewCustomerCashTransaction = (req, res) => {
    console.log('req data', req.body);
    const customerCashTransactionReqData = new CustomerCashTransactionModel(req.body)

    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all field'});
    }
    else{
        console.log('valid data');
        CustomerCashTransactionModel.createCustomerCashTransaction((customerCashTransactionReqData), (err, customerCashTransaction)=> {
            if(err){
                res.send(err);}
            else{
                res.json({status: true, message: 'Submited', data: customerCashTransaction})
            }
        })
}
}
