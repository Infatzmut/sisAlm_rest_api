const setupBaseService = require('./base.service');
module.exports = function setupProductService(dbInstance) {
    let baseService = new setupBaseService();

    async function addProduct(product) {
        try {
            const newProduct = await dbInstance.query('INSERT INTO productos set ?', [product])
            baseService.getServiceResponse('OK', 201, 'Product added', `Id: ${newProduct.prod_id}`  );
            
        }catch (error) {
            baseService.getServiceResponse('Error', 400, error.message, {});
        }
        return baseService.returnData;
    }

    return {
        addProduct
    }
}