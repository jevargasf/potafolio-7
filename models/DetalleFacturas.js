const { DataTypes } = require('sequelize')
const database = require('../config/db.js')

const DetalleFacturas = database.define('detalleFacturas', {
    // estructura de la tabla
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cantidadProducto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
})

// Relaciones con el resto de modelos
// idProducto
// idFactura

module.exports = DetalleFacturas