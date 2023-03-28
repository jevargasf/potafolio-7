const express = require('express')
const Productos = require('../models/Productos')
const Clientes = require('../models/Clientes.js')
const Administradores = require('../models/Administradores.js')
const Facturas = require('../models/Facturas.js')
const DetalleFacturas = require('../models/DetalleFacturas.js')
const database = require('../config/db.js')
const { Op } = require('sequelize')


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
        arrStock = []
        arrStockSolo = []
        arrId = []
        req.body.productos.forEach(item => {
            const nuevoDetalle = {
                idFactura: nuevaFactura.id,
                idProducto: item.idProducto,
                cantidadProducto: item.cantidad,
                subtotal: item.subtotal
            }
            arrDetalles.push(nuevoDetalle)
            arrStock.push({id: item.idProducto, stock: item.nuevoStock})
            arrStockSolo.push(item.nuevoStock)
            arrId.push(item.idProducto)
        });
        await nuevaFactura.save()

        const detallesFactura = await DetalleFacturas.bulkCreate(arrDetalles, { transaction: t })

        // actualizar stock productos

    //   const nuevosStock = await Productos.bulkCreate(arrStock, {
    //    updateOnDuplicate: ['stock']
     //  }, { transaction: t })
        console.log(arrStockSolo, arrId)
      //  await Productos.update({ stock: arrStockSolo }, {
       //     where: { id: arrId }
       // }, { transaction: t })

        await t.commit()

        res.status(201).json({ mensaje: "Tu venta ha sido exitosa." })
    } catch (err) {
        await t.rollback()
        console.log('Error: ', err)
    }
}


module.exports = { getVentas, getVentaId, postVenta }