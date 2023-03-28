const { DataTypes } = require('sequelize')
const database = require('../config/db.js')

const Productos = database.define('productos', {
    // estructura de la tabla
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING(4000),
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    imagen: {
        type: DataTypes.STRING(200),
        allowNull: true
    } 
}, {
    timestamps: false,
    freezeTableName: true
})


module.exports = Productos