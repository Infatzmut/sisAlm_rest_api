const setupBaseController = require('../base.controller');
const setupDbServices = require('../../services');
const dbServices = setupDbServices();
let baseController = new setupBaseController();

const create = async (req, res, next) => {
    let responseCode;
    let responseData;
    try {
        const {prod_id, descripcion, colorId, talla, status, compra_susp} = req.body;
        const newProduct = {
            prod_id,
            descripcion,
            colorId,
            talla,
            status,
            compra_susp
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

module.exports = {
    create
}