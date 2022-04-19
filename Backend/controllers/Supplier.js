const SupplierModel = require('../models/Supplier'); 

//get all Supplier list
exports.getSupplierList = (req,res) => {
    console.log("All Supplier");
    SupplierModel.getAllSupplier((err,suppliers) => {
        console.log('here');
        if(err) res.send(err);
        else{
            console.log('Suppliers', suppliers);
            res.send(suppliers)
        }
    })
}

//get supplier by id
exports.getSupplierByID = (req,res) => {
    console.log('get supplier by id');
    SupplierModel.getSupplierByID(req.params.id, (err, supplier)=> {
        if(err) res.send(err);
        else{
            console.log('Suppliers', supplier);
            res.send(supplier)
        }
    })
}

//create new supplier
exports.createNewSupplier = (req, res) => {
    console.log('req data', req.body);
    const supplierReqData = new SupplierModel(req.body)
    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all field'});
    }
    else{
        console.log('valid data');
        SupplierModel.createSupplier((supplierReqData), (err, supplier)=> {
            if(err){
                res.send(err);}
            else{
                res.json({status: true, message: 'Submited', data: supplier})
            }
        })
}
}

//update Supplier
exports.updateSupplier = (req, res) => {
    console.log('req data update', req.body);
    const supplierReqData = new SupplierModel(req.body)
    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all field'});
    }
    else{
        console.log('valid data');
        SupplierModel.updateSupplier(req.params.name, supplierReqData, (err, supplier)=> {
            if(err){
                res.send(err);}
            else{
                res.json({status: true, message: 'updated', data: supplier})
            }
        })
}
}

