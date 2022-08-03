var dbConn = require('../db.config');

var Product =  function(product) {
    this.p_name        =  product.p_name;
    this.quantity      =  product.quantity;
    this.rate          =  product.rate;
}

//get all product
Product.getAllProduct = (result) => {
    dbConn.query('SELECT * FROM PRODUCT ORDER BY P_ID DESC', (err, res) => {
        if(err){
            console.log('Error while fatching error', err);
            result(null,err);
        }
        else{
            console.log('Product fatchrd Successfully');
            result(null,res);
        }
    })
}

//create new Product
Product.createProduct = (productReqData, result) => {
    dbConn.query('INSERT INTO product SET ?', productReqData, (err, res) => {
        if(err){
            console.log("Err while Inserting Data",err);
            result(null, err);
        }
        else{
            console.log('Product created Successfully');
            result(null, res);
        }
    })
}

//get product by name
Product.getProductByID = (name, result) => {
    dbConn.query('SELECT * FROM product WHERE p_name=?',name, (err, res)=> {
        if(err){
            console.log('Error while fatching product by name', err);
            result(null,err);
        }
        else{
            console.log('product fatchrd Successfully by name');
            result(null,res);
        }
    })
}

//update product
Product.updateProduct = (name, productReqData, result) => {
    dbConn.query('UPDATE product SET quantity = ?, rate = ? WHERE p_name = ?', [productReqData.quantity, productReqData.rate, name], (err, res) => {
        if(err){
            console.log("Err while updating Data");
            result(null, err);
        }
        else{
            console.log('Product updated Successfully');
            result(null, res);
        }  
    });
}

module.exports = Product;