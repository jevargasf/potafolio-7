const { DataTypes } = require('sequelize')
const database = require('../config/db.js')

const Facturas = database.define('facturas', {
    // estructura tabla
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
}, {
    timestamps: true,
    freezeTableName: true
})

// Relaciones con otras tablas
// idCliente
// idAdmin

module.exports = Facturas