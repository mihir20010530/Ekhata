const ProductModel = require('../models/Product'); 

//get all product list
exports.getProductList = (req,res) => {
    console.log("All Product");
    ProductModel.getAllProduct((err,products) => {
        console.log('here');
        if(err) res.send(err);
        else{
            console.log('Products', products);
            res.send(products)
        }
    })
}

//get product by name
exports.getProductByID = (req,res) => {
    console.log('get product by name');
    ProductModel.getProductByID(req.params.name, (err, product)=> {
        if(err) res.send(err);
        else{
            console.log('product', product);
            res.send(product)
        }
    })
}

//create new product
exports.createNewProduct = (req, res) => {
    console.log('req data', req.body);
    const productReqData = new ProductModel(req.body)

    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all field'});
    }
    else{
        console.log('valid data');
        ProductModel.createProduct((productReqData), (err, product)=> {
            if(err){
                res.send(err);}
            else{
                res.json({status: true, message: 'Submited', data: product})
            }
        })
}
}

//update product
exports.updateProduct = (req, res) => {
    console.log('req data update', req.body);
    const productReqData = new ProductModel(req.body)
    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all field'});
    }
    else{
        console.log('valid data');
        ProductModel.updateProduct(req.params.name, productReqData, (err, product)=> {
            if(err){
                res.send(err);}
            else{
                res.json({status: true, message: 'updated', data: product})
            }
        })
}
}
