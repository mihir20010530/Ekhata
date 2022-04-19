const SupplierCashTransactionModel = require('../models/SupplierCashTransaction'); 


//get supplier cash transaction by name
exports.getSupplierCashTransactionByID = (req,res) => {
    console.log('get supplier cash transaction by name');
    SupplierCashTransactionModel.getSupplierCashTransactionByID(req.params.name, (err, supplierCashTransaction)=> {
        if(err) res.send(err);
        else{
            console.log('SupplierCashTransaction', supplierCashTransaction);
            res.send(supplierCashTransaction)
        }
    })
}

//create new supplier cash Transaction
exports.createNewSupplierCashTransaction = (req, res) => {
    console.log('req data', req.body);
    const supplierCashTransactionReqData = new SupplierCashTransactionModel(req.body)

    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all field'});
    }
    else{
        console.log('valid data');
        SupplierCashTransactionModel.createSupplierCashTransaction((supplierCashTransactionReqData), (err, supplierCashTransaction)=> {
            if(err){
                res.send(err);}
            else{
                res.json({status: true, message: 'Submited', data: supplierCashTransaction})
            }
        })
}
}
