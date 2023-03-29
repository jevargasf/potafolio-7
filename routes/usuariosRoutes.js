const express = require('express')
const router = express.Router()
const { actualizarDatos, registrarUsuario, iniciarSesion, getUsuarios, borrarUsuarioId } = require('../controllers/controladorUsuarios.js')

    // rutas usuario

// actualizar datos usuario
router.put('/datosUsuario/:id', actualizarDatos)

// registrar usuario
router.post('/registro', registrarUsuario)

// inicio de sesión
router.post('/iniciarSesion', iniciarSesion)


    // rutas administrador

// get usuarios para plataforma de administrador
router.get('/', getUsuarios)

// borrar usuario por id para plataforma de administrador
router.delete('/borrarUsuario/:id', borrarUsuarioId)

module.exports = router