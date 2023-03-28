const express = require('express')
const Productos = require('../models/Productos')
const Clientes = require('../models/Clientes.js')
const Administradores = require('../models/Administradores.js')
const Facturas = require('../models/Facturas.js')
const DetalleFacturas = require('../models/DetalleFacturas.js')
const database = require('../config/db.js')


const getVentas = async (req, res) => {
    try{
        const rows = await Facturas.findAll({
            attributes: ['id', 'createdAt'],
            include: [{
                model: DetalleFacturas,
                attributes: ['cantidadProducto', 'subtotal'],
                include: [{
                    model: Productos,
                    attributes: ['nombre']
                }]
            }],
            order: [
            ['id', 'ASC']
        ]
        })
        res.status(201).json(rows)
    } catch (err) {
        console.log('Error: ', err)
    }
}

const getVentaId = async (req, res) => {
try {
    const rows = await Facturas.findAll({
        where: { id: req.params.id
        },
        attributes: ['id', 'createdAt'],
        include: [{
            model: DetalleFacturas,
            attributes: ['cantidadProducto', 'subtotal'],
            include: [{
                model: Productos,
                attributes: ['nombre']
            }]
        }],
        order: [
        ['id', 'ASC']
      ]
    })
    res.status(201).json(rows)
} catch (err) {
    console.log('Error: ', err)
}
}

const postVenta = async (req, res) => {
        // instanciar transacción
    const t = await database.transaction()
    try {
        // post nueva factura
        const dataFactura = {
                    idCliente: 3,
                    idAdministrador: 2
                }
       const nuevaFactura = await Facturas.create(dataFactura, { transaction: t })

       // crear arreglo con detalles de productos y idFactura
        arrDetalles = []
        req.body.productos.forEach(item => {
            const nuevoDetalle = {
                idFactura: nuevaFactura.id,
                idProducto: item.idProducto,
                cantidadProducto: item.cantidad,
                subtotal: item.subtotal
            }
            arrDetalles.push(nuevoDetalle)
        });
        const detallesFactura = await DetalleFacturas.bulkCreate(arrDetalles, { transaction: t })
    // recibir data body y formatear para ingresar
        /*const dataCliente = {
            rut: '11111111-1',
            nombre: 'Evaristo Pruebas',
            correo: 'prueba@tiendita.cl',
            contrasena: 'pruebaprueba',
            telefono: '+56933333333',
            direccion: 'Villa Prueba #0000',
            comuna: 'Santa Prueba',
            region: 'Región de la Prueba'
        }

        const dataAdministrador = {
            rut: '22222222-2',
            nombre: 'Admin Administrador',
            correo: 'admin@tiendita.cl',
            contrasena: 'adminadmin'
        }*/
 //       
        
       
        // crear instancia para recibir los datos en los modelos
        //const nuevoCliente = await Clientes.create(dataCliente, { transaction: t })
        //const nuevoAdmin = await Administradores.create(dataAdministrador, { transaction: t })
       
      
        // guardar cambios en modelos
        //await nuevoCliente.save()
        //await nuevoAdmin.save()
        await nuevaFactura.save()

        await t.commit()

        res.status(201).json({ mensaje: "Tu venta ha sido exitosa." })
    } catch (err) {
        await t.rollback()
        console.log('Error: ', err)
    }
}


module.exports = { getVentas, getVentaId, postVenta }