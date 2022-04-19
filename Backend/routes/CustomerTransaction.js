const express = require('express');
const router = express.Router();

const customerTransactionController = require('../controllers/CustomerTransaction');

//get customer transaction by id
router.get('/:name',customerTransactionController.getCustomerTransactionByID);

// create new customer transaction
router.post('/', customerTransactionController.createNewCustomerTransaction);


module.exports = router;