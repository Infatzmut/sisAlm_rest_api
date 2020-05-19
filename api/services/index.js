
const setupProductService = require('./productService');
const pool = require('../../services-config/database')
module.exports = function (){
    const productServices = setupProductService(pool);
    return {
        productServices
    }
}