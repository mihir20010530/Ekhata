const express = require('express');
const router = express.Router();

const customerCashTransactionController = require('../controllers/CustomerCashTransaction');

//get customer cash transaction by id
router.get('/:name',customerCashTransactionController.getCustomerCashTransactionByID);

// create new customer cash transaction
router.post('/', customerCashTransactionController.createNewCustomerCashTransaction);


module.exports = router;