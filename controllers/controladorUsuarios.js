const express = require('express')
const Clientes = require('../models/Clientes.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.js')


const actualizarDatos = (req, res) => {

}

const registrarUsuario = async (req, res) => {
    try {
        let dataUsuario = { nombre, rut, correo, telefono, direccion, comuna, region } = req.body
        // hashear constraseña
        dataUsuario["contrasena"] = bcrypt.hashSync(req.body.contrasena, authConfig.rounds)
        // crear instancia para escribir datos en el modelo
        const nuevoUsuario = await Clientes.create(dataUsuario)


        // guardar cambios
        await nuevoUsuario.save()

        res.status(201).json({ mensaje: "El usuario se registró correctamente." })
    } catch (err) {
        console.log('error: ', err)
        res.status(500).json(err)

    }


}

const iniciarSesion = async (req, res) => {
    try {
        // recibir data usuario
        let dataUsuario = { correo, contrasena } = req.body

        // encontrar usuario en bbdd
        const usuario = await Clientes.findOne({
            where: {
                correo: dataUsuario.correo
            }
        })

        // si usuario no existe, estado 404
        if (usuario == null) {
            res.status(404).json({ mensaje: "Correo incorrecto, usuario no encontrado." })
        // si usuario existe, comprobar contraseña
        } else {
            // comparar contraseña ingresada con contraseña bbdd
            if (bcrypt.compare(dataUsuario.contrasena, usuario.dataValues.contrasena)) {
                console.log(true)
                // crear token
                const token = await jwt.sign({ correo: usuario.correo }, authConfig.secret, {
                    expiresIn: authConfig.expires
                })
                // devolver token
                res.json({
                    usuario: usuario,
                    token: token,
                    mensaje: "Ingreso exitoso."
                })
                // si contraseña es incorrecta, estado 401*/
            } else {
                res.status(401).json({ mensaje: "Contraseña incorrecta." })
            }
        }
    } catch (err) {
        console.log('error: ', err)
        res.status(500).json(err)
    }

}

const getUsuarios = (req, res) => {
    
}

const borrarUsuarioId = (req, res) => {
    
}

module.exports = { actualizarDatos, registrarUsuario, iniciarSesion, getUsuarios, borrarUsuarioId }