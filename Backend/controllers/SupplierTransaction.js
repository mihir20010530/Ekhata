const SupplierTransactionModel = require('../models/SupplierTransaction'); 


//get supplier by name
exports.getSupplierTransactionByID = (req,res) => {
    console.log('get supplier transaction by name');
    SupplierTransactionModel.getSupplierTransactionByID(req.params.name, (err, supplierTransaction)=> {
        if(err) res.send(err);
        else{
            console.log('SupplierTransaction', supplierTransaction);
            res.send(supplierTransaction)
        }
    })
}

//create new supplier Transaction
exports.createNewSupplierTransaction = (req, res) => {
    console.log('req data', req.body);
    const supplierTransactionReqData = new SupplierTransactionModel(req.body)

    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all field'});
    }
    else{
        console.log('valid data');
        SupplierTransactionModel.createSupplierTransaction((supplierTransactionReqData), (err, supplierTransaction)=> {
            if(err){
                res.send(err);}
            else{
                res.json({status: true, message: 'Submited', data: supplierTransaction})
            }
        })
}
}
