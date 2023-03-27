const express = require('express')
const router = express.Router()
const { conseguirProductos, conseguirProductoId, postearProductos, actualizarProductos, borrarProductos } = require('../controllers/controladorProductos')



// define la ruta principal y CRUD
router.get('/', conseguirProductos)
router.get('/:id', conseguirProductoId)
router.post('/post', postearProductos)
router.put('/actualizar/:id', actualizarProductos)
router.delete('/borrar/:id', borrarProductos)


module.exports = router




