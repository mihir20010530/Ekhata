var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//import product routes
const productRoutes = require('./routes/Product');

//create product routes
app.use('/api/v1/Product', productRoutes)

//import Supplier routes
const supplierRoutes = require('./routes/Supplier');

//create Supplier routes
app.use('/api/v1/Supplier', supplierRoutes)

//import Customer routes
const customerRoutes = require('./routes/Customer');

//create Customer routes
app.use('/api/v1/Customer', customerRoutes)


//import Supplier Transaction routes
const supplierTransactionRoutes = require('./routes/SupplierTransaction');

//create Supplier Transaction routes
app.use('/api/v1/SupplierTransaction', supplierTransactionRoutes)

//import Supplier Cash Transaction routes
const supplierCashTransactionRoutes = require('./routes/SupplierCashTransaction');

//create Supplier Cash Transaction routes
app.use('/api/v1/SupplierCashTransaction', supplierCashTransactionRoutes)


//import Customer Transaction routes
const customerTransactionRoutes = require('./routes/CustomerTransaction');

//create Customer Transaction routes
app.use('/api/v1/CustomerTransaction', customerTransactionRoutes)

//import Customer Cash Transaction routes
const customerCashTransactionRoutes = require('./routes/CustomerCashTransaction');

//create Customer Cash Transaction routes
app.use('/api/v1/CustomerCashTransaction', customerCashTransactionRoutes)



var server =app.listen(1235, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Start");
});