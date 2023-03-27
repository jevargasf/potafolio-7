const express = require('express')
const { access, constants, readFile, readFileSync, writeFile } = require('node:fs');
const { dataJson } = require('./controladorProductos.js')

// ruta json data
const file = './public/data/ventas.json'
const fileProductos = './public/data/productos.json'

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
const ventasJson = readFileSync(file, 'utf8', (err, data) => {
    if (err) throw err
    data
    })

let dataObjeto = JSON.parse(ventasJson)
const productosObjeto = JSON.parse(dataJson)



const getVentas = (req, res) => {
    let dataVentas = []

    productosObjeto.forEach(prod => {
        dataObjeto.forEach(venta => {

            venta.productos.forEach(item => {
                if (prod.id == item.idProducto) {
                    dataVentas.push({
                        ["id"]: venta.id,
                        ["fecha"]: venta.fecha,
                        ["hora"]: venta.hora,
                        ["productoId"]: prod.id,
                        ["nombre"]: prod.nombre,
                        ["precio"]: prod.precio,
                        ["cantidad"]: item.cantidad
                    })
                }
            })


        })
    })
    dataVentas.sort((x, y) => x.id - y.id)
    res.json(dataVentas)

}

const getVentaId = (req, res) => {
try {
    let dataVentas = []
    
    productosObjeto.forEach(prod => {
        dataObjeto.forEach(venta => {
            if (venta.id == req.params.id) {
                venta.productos.forEach(item => {
                    if (prod.id == item.idProducto) {
                        dataVentas.push({
                            ["id"]: venta.id,
                            ["fecha"]: venta.fecha,
                            ["hora"]: venta.hora,
                            ["productoId"]: prod.id,
                            ["nombre"]: prod.nombre,
                            ["precio"]: prod.precio,
                            ["cantidad"]: item.cantidad
                        })
                    }
                })
            }



        })
    })

    res.json(dataVentas)

} catch (err) {
    console.log('Error: ', err)
}
}

const postVenta = (req, res) => {
    let nuevaVenta = req.body
    let idsVentas = []

    id = { id: null }
    if (dataObjeto.length === 0){
        id.id = 1
    } else {
        dataObjeto.forEach(venta => {
            idsVentas.push(venta.id)
        })
        id.id = ++idsVentas[idsVentas.length-1]
    }
    nuevaVenta = Object.assign( id, nuevaVenta)
    dataObjeto.push(nuevaVenta)

    

    // restar cantidad del stock
    productosObjeto.forEach(prod => {
        nuevaVenta.productos.forEach(item => {
            if (prod.id == item.idProducto) {
                prod.stock = prod.stock - item.cantidad
            }
        })
      })
    // actualizar stock productos
    writeFile(fileProductos, JSON.stringify(productosObjeto, 0, 4), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(readFileSync(fileProductos, "utf8"));
        }
    });

    // escribir json ventas
    writeFile(file, JSON.stringify(dataObjeto, 0, 4), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(readFileSync(file, "utf8"));
            res.json({ mensaje: "Tu compra ha sido procesada con éxito." })
        }
    });

}


module.exports = { getVentas, getVentaId, postVenta }