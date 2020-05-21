const setupBaseService = require('./base.service');

module.exports = function setupBranchServices(dbInstance) {
    let baseService = new setupBaseService();

    async function create(branch) {
        try {
            const newBranch =  await dbInstance.query('INSERT INTO sucursales set ?', [branch])
            baseService.getServiceResponse('OK', 201, 'branch office added', `Id : ${newBranch.insertId}`)
        }catch (error) {
            baseService.getServiceResponse('Error', 400, error.message, {});
        }
        return baseService.returnData;
    }

    async function getBranch(id) {
        try{
            const branch = await dbInstance.query('SELECT * FROM sucursales where id_suc = ?', [id]);
            baseService.getServiceResponse('Ok', 200, 'Fetching  branch office data', branch)
        }catch(error){
            baseService.getServiceResponse('Error', 400, error.message, {});
        }
        return baseService.returnData;
    }

    async function getAllbranches() {
        try{
            const allBranches = await dbInstance.query('SELECT * FROM sucursales ');
            baseService.getServiceResponse('Ok', 200, "Fetching branche offices", allBranches)
        }catch(error) {
            baseService.getServiceResponse('Error', 400, error.message, {})
        }
        return baseService.returnData;
    }

    async function updateBranch(id, newBranch) {
        try {
            const branchUpdated = await dbInstance.query(`UPDATE sucursales set ? where id = ?`, [newBranch, id]);
            baseService.getServiceResponse('Ok',200, "branch office updated", branchUpdated )
        }catch(error){
            baseService.getServiceResponse('Error', 400, error.message, {})
        }
        return baseService.returnData;
    }

    async function deleteBranch(id) {
        try {
            const branchDeleted = await dbInstance.query(`update productos set status = 0 where id= ?` , [id]);
            baseService.getServiceResponse('Ok', 204, "branch office removed", {});
        }catch(error) {
            baseService.getServiceResponse('Error', 400, error.message, {});
        }
        return baseService.returnData;
    }

    return {
        create,
        getBranch,
        getAllbranches,
        updateBranch,
        deleteBranch
    }
}