const router = require('express-promise-router')();
const productController = require('../controllers/product.controller');

// ==> Definindo as rotas do CRUD - 'Product':

// ==> Rota responsável por listar todos os 'Products': (GET): localhost:3000/api/products
router.get('/products', productController.listAllProducts);

module.exports = router;