const express = require('express');
const router = express.Router();

const productController = require('../controllers/Product');

// get all product
router.get('/', productController.getProductList);

//get product by name
router.get('/:name',productController.getProductByID);

// create new product
router.post('/', productController.createNewProduct);

// update product
router.put('/:name', productController.updateProduct);

module.exports = router;