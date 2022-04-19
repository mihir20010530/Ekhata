const express = require('express');
const router = express.Router();

const customerController = require('../controllers/Customer');

// get all customer
router.get('/', customerController.getCustomerList);

//get customer by id
router.get('/:id',customerController.getCustomerByID);

// create new customer
router.post('/', customerController.createNewCustomer);

// update customer
router.put('/:name', customerController.updateCustomer);


module.exports = router;