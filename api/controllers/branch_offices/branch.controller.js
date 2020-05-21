const setupBaseController = require('../base.controller');
const setupDbServices = require('../../services');
const dbServices = setupDbServices();
let baseController = new setupBaseController();

const get_branch = async (req, res) => {
    let responseCode;
    let responseData;
    try{
        const {id} = req.params;
        const branch = await dbServices.branchServices.get(id);
        if(branch.status.toLowerCase === 'error') {
           responseData = baseController.getErrorResponse(branch.message); 
        } else {
           responseData =  baseController.getSuccessResponse(branch.data, branch.message);
        }
    }catch(error) {
        responseCode = 500;
        baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

const update_branch = async (req, res) => {
    let responseCode;
    let responseData;
    try{
        const {id} = req.params;
        const branch = await dbServices.branchServices.update(id);
        if(branch.status.toLowerCase === 'error') {
           responseData = baseController.getErrorResponse(branch.message); 
        } else {
           responseData =  baseController.getSuccessResponse(branch.data, branch.message);
        }
    }catch(error) {
        responseCode = 500;
        baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

const del_branch = async (req, res) => {
    let responseCode;
    let responseData;
    try{
        const {id} = req.params;
        const branch = await dbServices.branchServices.deleteBranch(id);
        if(branch.status.toLowerCase === 'error') {
           responseData = baseController.getErrorResponse(branch.message); 
        } else {
           responseData =  baseController.getSuccessResponse(branch.data, branch.message);
        }
    }catch(error) {
        responseCode = 500;
        baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

module.exports = {
    get_branch,
    update_branch,
    del_branch
}
