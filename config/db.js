const { Sequelize } = require('sequelize')
require('dotenv').config()

const database = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD, {
    host: process.env.BD_HOST, 
    port: process.env.BD_PORT, 
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})



module.exports = database