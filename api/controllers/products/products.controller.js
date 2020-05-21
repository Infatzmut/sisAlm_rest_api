'use strict'
const setupBaseController = require('../base.controller');
const setupDBServices = require('../../services');
const dbServices = setupDBServices();
let baseController = new setupBaseController();

const create = async (req, res, next) => {
    let responseCode;
    let responseData;
    try {
        const {descripcion, colorId, talla, status } = req.body;
        const newProduct = {
            descripcion,
            colorId,
            talla,
            status
        }
        let createdProduct = await dbServices.productServices.addProduct(newProduct);
        responseCode = createdProduct.responseCode;
        if(createdProduct.status.toLowerCase() === 'error') {
            responseData = baseController.getErrorResponse(createdProduct.message)
        } else {
            responseData = baseController.getSuccessResponse(createdProduct.data, createdProduct.message)
        }
    } catch(error) {
        responseCode = 500;
        responseData = baseController.getErrorResponse(error.message)
    }
    return res.status(responseCode).json(responseData);
}

const getAll = async (req, res) => {
    let responseCode;
    let responseData;
    try {
        const products = await dbServices.productServices.getAllProducts();
        responseCode = products.responseCode;
        if(products.status.toLowerCase === 'error') {
            responseData = baseController.getErrorResponse(products.message);
        } else {
            responseData = baseController.getSuccessResponse(products.data, products.message);
        }
    }catch(error) {
        responseCode = 500;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

module.exports = {
    create,
    getAll
}