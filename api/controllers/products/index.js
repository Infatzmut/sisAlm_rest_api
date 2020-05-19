const express = require('express');

const productController = require('./product.controller');
const router = express.Router()

router.post('/addProduct', productController.create)

module.exports = router;