const express = require('express')
const Productos = require('../models/Productos.js')




// envío de dataJson


const conseguirProductos = async (req, res) => {
    const rows = await Productos.findAll({order: [
        ['id', 'ASC']
      ]
    })
    res.status(201).json(rows)
}

const conseguirProductoId = async (req, res) => {
   try {
    const producto = await Productos.findByPk(req.params.id);
        if (producto === null) {
            res.json('Producto no encontrado. Por favor, intente nuevamente');
        } else {
            res.json(producto)
        }
    } catch (err) {
        console.log('Error: ', err)
    }
}

const postearProductos = async (req, res) => {
    try {
        let dataProducto = { nombre, precio, stock, descripcion } = req.body
        dataProducto["imagen"] = 'img/'+req.file.originalname
        console.log(dataProducto)
        // crear instancia para escribir datos en el modelo
        const nuevoProducto = await Productos.create(dataProducto)

        // guardar cambios
        await nuevoProducto.save()

        res.status(201).json({ mensaje: "El envío de los datos se procesó correctamente"})
    } catch (err) {
        console.log('error: ', err)
    }

}


const actualizarProductos = async (req, res) => {
    try {
        const id = req.params.id
        let producto = { nombre, precio, stock, descripcion } = req.body
        producto["imagen"] = 'img/'+req.file.originalname

        const actualizarProducto = await Productos.update(producto, {
            where: { id }
        })
        res.status(200).json({ mensaje: 'Producto actualizado correctamente.' });

    } catch (err) {
           console.log('Error: ', err)
    }
}


const borrarProductos = async (req, res) => {
    try {        
        await Productos.destroy({
            where: {
              id: req.params.id
            }
          });
          res.status(200).json({ mensaje: "Producto eliminado exitosamente." })
    } catch (err) {
        console.log('Error: ', err)
    }
}

module.exports = { postearProductos, actualizarProductos, borrarProductos, conseguirProductoId, conseguirProductos }