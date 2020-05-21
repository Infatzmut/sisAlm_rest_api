const setupBaseService = require('./base.service');
module.exports = function setupProductService(dbInstance) {
    let baseService = new setupBaseService();

    async function addProduct(product) {
        try {
            const newProduct =  await dbInstance.query('INSERT INTO productos set ?', [product])
            baseService.getServiceResponse('OK', 201, 'Product added', `Id : ${newProduct.insertId}`)
        }catch (error) {
            baseService.getServiceResponse('Error', 400, error.message, {});
        }
        return baseService.returnData;
    }

    async function getProduct(id) {
        try{
            const product = await dbInstance.query('SELECT * FROM productos where prod_id = ?', [id]);
            baseService.getServiceResponse('Ok', 200, 'Fetching  product data', product)
        }catch(error){
            baseService.getServiceResponse('Error', 400, error.message, {});
        }
        return baseService.returnData;
    }

    async function getAllProducts(active = 1) {
        try{
            const allProducts = await dbInstance.query('SELECT * FROM productos where comp_sus = ?', active);
            baseService.getServiceResponse('Ok', 200, "Fetching products", allProducts)
        }catch(error) {
            baseService.getServiceResponse('Error', 400, error.message, {})
        }
        return baseService.returnData;
    }

    async function getAllRegisteredProducts(){
        try{
            const registeredProducts = await dbInstance.query(`select * from productos`);
        }catch(error) {
            baseService.getServiceResponse('Error', 400, error.message, {})
        }
    }
    async function update(id, newProduct) {
        try {
            const productUpdated = await dbInstance.query(`UPDATE productos set ? where id = ?`, [newProduct, id]);
            baseService.getServiceResponse('Ok',200, "Product updated", productUpdated )
        }catch(error){
            baseService.getServiceResponse('Error', 400, error.message, {})
        }
        return baseService.returnData;
    }

    async function deleteProduct(id) {
        try {
            const productDeleted = await dbInstance.query(`update productos set compra_susp = 0 where id= ?` , [id]);
            baseService.getServiceResponse('Ok', 204, "Product removed", {});
        }catch(error) {
            baseService.getServiceResponse('Error', 400, error.message, {});
        }
        return baseService.returnData;
    }

    return {
        addProduct,
        getProduct,
        getAllProducts,
        update,
        deleteProduct
    }
}