const express = require('express');
const router = express.Router();

const supplierController = require('../controllers/Supplier');

// get all Supplier
router.get('/', supplierController.getSupplierList);

//get supplier by id
router.get('/:id',supplierController.getSupplierByID);

// create new supplier
router.post('/', supplierController.createNewSupplier);

// update supplier
router.put('/:name', supplierController.updateSupplier);


module.exports = router;