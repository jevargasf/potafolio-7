const { DataTypes } = require('sequelize')
const database = require('../config/db.js')

const Administradores = database.define('administradores', {
    // estructura tabla
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    rut: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    constasena: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
})


module.exports = Administradores