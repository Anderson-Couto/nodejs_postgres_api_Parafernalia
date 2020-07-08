const router = require('express-promise-router')();
const productController = require('../controllers/product.controller');

// ==> Rota responsável por selecionar 'Product' pelo 'Id': (GET): localhost:3000/api/products/:id
router.get('/discounts/:idP/:idU', productController.findProductById);


module.exports = router;