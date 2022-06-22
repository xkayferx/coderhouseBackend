const { Router } = require('express') 

const router = Router()

const controller = require('../controllers/index')

router.get('/api/productos', controller.getProductos)
router.get('/api/productos/:id', controller.getProductoId)
router.post('/api/productos', controller.postProducto)
router.put('/api/productos/:id', controller.putProducto)
router.delete('/api/productos/:id', controller.deleteProducto)

module.exports = router