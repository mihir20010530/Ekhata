const express = require('express');
const router = express.Router();

const supplierCashTransactionController = require('../controllers/SupplierCashTransaction');

//get supplier cash transaction by id
router.get('/:name',supplierCashTransactionController.getSupplierCashTransactionByID);

// create new supplier cash transaction
router.post('/', supplierCashTransactionController.createNewSupplierCashTransaction);


module.exports = router;