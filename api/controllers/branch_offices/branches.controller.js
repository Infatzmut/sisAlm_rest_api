const setupBaseController = require('../base.controller');
const setupDbServices = require('../../services');
const dbServices = setupDbServices();
let baseController = new setupBaseController();

const create_branch = async (req, res, next) => {
    let responseCode;
    let responseData;
    try {
        const branches = await dbServices.branchServices.create();
        responseCode = branches.responseCode;
        if(branches.status.toLowerCase === 'error') {
            responseData = baseController.getErrorResponse(branches.message);
        } else {
            responseData = baseController.getSuccessResponse(branches.data, branches.message);
        }
    } catch (error) {
        responseCode = 500;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

const get_branches = async (req,res) => {
    let responseCode;
    let responseData;
    try {
        const branches = await dbServices.branchServices.getAll();
        responseCode = branches.responseCode;
        if(branches.status.toLowerCase === 'error') {
            responseData = baseController.getErrorResponse(branches.message);
        } else {
            responseData = baseController.getSuccessResponse(branches.data, branches.message);
        }
    } catch (error) {
        responseCode = 500;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}


module.exports = {
    get_branches,
    create_branch
}