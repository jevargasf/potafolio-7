const { DataTypes } = require('sequelize')
const database = require('../config/db.js')

const Clientes = database.define('clientes', {
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
        allowNull: false,
        unique: true
    },
    contrasena: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    comuna: {
        type: DataTypes.STRING(50),
        allowNull: false 
    },
    region: {
        type: DataTypes.STRING(50),
        allowNull: false 
    }
}, {
    timestamps: false,
    freezeTableName: true
})



module.exports = Clientes