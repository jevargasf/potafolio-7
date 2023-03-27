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
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(4000),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(200),
        allowNull: true
    } 
}, {
    timestamps: false,
    freezeTableName: true
})

// Relaciones con el resto de modelos
/*(async () => {
    const maxId = await Productos.max('id');
    Productos.sequelize.query(`ALTER SEQUENCE "public.productos_id_seq" RESTART WITH ${maxId + 1}`);
  })();*/

module.exports = Productos