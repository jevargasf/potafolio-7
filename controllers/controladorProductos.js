const express = require('express')
const { access, constants, readFile, readFileSync, writeFile } = require('node:fs');

// ruta json data
const file = './public/data/productos.json'

// comprueba que el archivo existe en el directorio
access(file, constants.F_OK, (err) => {
    console.log(`${file} ${err ? 'no existe' : 'existe'}`)
})

access(file, constants.R_OK, (err) => {
    console.log(`${file} ${err ? 'no se puede leer' : 'sí se puede leer'}`)
})

access(file, constants.W_OK, (err) => {
    console.log(`${file} ${err ? 'no se puede escribir' : 'sí se puede escribir'}`)
})

// json de productos
const dataJson = readFileSync(file, 'utf8', (err, data) => {
    if (err) throw err
    data
    })

let dataObjeto = JSON.parse(dataJson)

function conseguirProductos (req, res) {
    res.send('ruta get de productos')
}

const conseguirProductoId = (req, res) => {
   try {
    conseguirId = req.params
    let producto = null
    dataObjeto.forEach(item => {
        if (item.id == req.params.id) {
            producto = item
        }
    });
    res.json(producto)
    } catch (err) {
        console.log('Error: ', err)
    }
}

function postearProductos (req, res) {
    try {
        let nuevoProducto = { nombre, precio, stock, descripcion } = req.body
        nuevoProducto = Object.assign( {id: 16}, nuevoProducto)
        dataObjeto.push(nuevoProducto)
        console.log(dataObjeto)

        writeFile(file, JSON.stringify(dataObjeto, 0, 4), (err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
              console.log("The written has the following contents:");
              console.log(readFileSync(file, "utf8"));
              res.json(dataObjeto)
            }
          });
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.json({ mensaje: "El envío de los datos se procesó correctamente"})
    } catch (err) {
        console.log('error: ', err)
    }

}


function actualizarProductos (req, res) {
    try {
        dataObjeto.forEach(item => {
            if (item.id === parseInt(req.params.id)) {
                item.nombre = req.body.nombre
                item.precio = req.body.precio
                item.stock = req.body.stock
                item.descripcion = req.body.descripcion
            }
        })
        
       writeFile(file, JSON.stringify(dataObjeto, 0, 4), (err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
              console.log("The written has the following contents:");
              console.log(readFileSync(file, "utf8"));
              res.json({ mensaje: "Registro actualizado exitosamente." })
            }
          });
       } catch (err) {
           console.log('Error: ', err)
       }
}


function borrarProductos (req, res) {
    try {
        const idBorrar = parseInt(req.params.id)
        
        // borrar producto del objeto de productos 
        let arrNuevo = dataObjeto.filter(item =>
            item.id != idBorrar
        )
        writeFile(file, JSON.stringify(arrNuevo, 0, 4), (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                console.log(readFileSync(file, "utf8"));
                res.json({ mensaje: "El registro se borró correctamente."})
            }
        });

    } catch (err) {
        console.log('Error: ', err)
    }
}


module.exports = { postearProductos, actualizarProductos, borrarProductos, conseguirProductoId, conseguirProductos, dataJson }