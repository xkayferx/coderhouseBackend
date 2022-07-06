const { Router } = require('express') 
const router = Router()
const { getProductos, getProductoId, postProducto, putProducto, deleteProducto, productosLista } = require('../controllers/productos')

router.get('/', getProductos)
router.get('/productos/:id', getProductoId)
router.post('/', postProducto)
router.put('/productos/:id', putProducto)
router.delete('/:id', deleteProducto)
router.get('/productos', productosLista)

module.exports = router