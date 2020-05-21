const express = require('express');

const productController = require('./product.controller');
const productsController = require('./products.controller')
const router = express.Router()

router.post('/addProduct', productsController.create);
router.get('/getAllProducts', productsController.getAll);
router.get('/get/:id', productController.get);
router.put('/edit/:id', productController.update);
router.delete('/delete/:id', productController.deleteP);
module.exports = router;