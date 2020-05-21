const setupBaseController = require('../base.controller');
const setupDbServices = require('../../services');
const dbServices = setupDbServices();
let baseController = new setupBaseController();

const get = async (req, res) => {
    let responseCode;
    let responseData;
    try {
        const {id} =  req.params; 
        const product = await dbServices.productServices.getProduct(id);
        responseCode = product.responseCode;
        if(product.status.toLowerCase === 'error') {
            responseData = baseController.getErrorResponse(product.message);
        } else {
            responseData = baseController.getSuccessResponse(product.data, product.message);
        }
    } catch(error){
        responseCode = 500;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

const update = async (req, res) => {
    let responseCode;
    let responseData;
    try {
        const {id} = req.params;
        const productUpdated = await dbServices.productServices.update(id, req.params.body);
        responseCode = productUpdated.responseCode;
        responseData = baseController.getSuccessResponse(productUpdated.data, productUpdated.message);
    }catch(error){
        responseCode = 500;
        responseData = baseController.getErrorResponse(error);
    }
    return res.status(responseCode).json(responseData);
}

const deleteP = async (req, res) => {
    let responseCode;
    let responseData;
    try {
        const {id} = req.params;
        await dbServices.productServices.deleteProduct(id);
        responseCode = 200;
        responseData = baseController.getSuccessResponse({}, "Deleted")
    } catch(error){
        responseCode = 500;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

module.exports = {
    get,
    update,
    deleteP
}