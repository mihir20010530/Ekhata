const express = require('express');
const router = express.Router();

const supplierTransactionController = require('../controllers/SupplierTransaction');

//get supplier transaction by id
router.get('/:name',supplierTransactionController.getSupplierTransactionByID);

// create new supplier transaction
router.post('/', supplierTransactionController.createNewSupplierTransaction);


module.exports = router;