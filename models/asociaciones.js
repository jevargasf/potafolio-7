const Productos = require('./Productos.js')
const Clientes = require('./Clientes.js')
const Administradores = require('./Administradores.js')
const Facturas = require('./Facturas.js')
const DetalleFacturas = require('./DetalleFacturas.js')

const defineAssociations = () => {
    // relaciones detalle facturas productos
    DetalleFacturas.belongsTo(Productos, { foreignKey: 'idProducto' })
    Productos.hasMany(DetalleFacturas, { foreignKey: 'idProducto' })

    // relaciones detalle facturas - facturas
    DetalleFacturas.belongsTo(Facturas, { foreignKey: 'idFactura' })
    Facturas.hasMany(DetalleFacturas, { foreignKey: 'idFactura' })

    // relaciones factura cliente
    Facturas.belongsTo(Clientes, { foreignKey: 'idCliente' })
    Clientes.hasMany(Facturas, { foreignKey: 'idCliente' })

    // relaciones factura administradores
    Facturas.belongsTo(Administradores, { foreignKey: 'idAdministrador' })
    Administradores.hasMany(Facturas, { foreignKey: 'idAdministrador' })

}

module.exports = { Productos, Clientes, Administradores, Facturas, DetalleFacturas, defineAssociations }