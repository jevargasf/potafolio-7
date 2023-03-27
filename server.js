const express = require('express');
require('dotenv').config()
const database = require('./config/db.js')
const { authenticate, sync } = require('sequelize')
//const cors = require('cors')
//const routerProductos = require('./routes/productosRoutes')
//const routerVentas = require('./routes/ventas')
//const routerPrincipal = require('./routes/routes')

// declara el puerto, lo busca como variable de entorno o asigna el puerto
const PORT = process.env.PORT || 8000
const app = express();

// Conexión a la BD y sincronización de modelos con BD
conexion = async () => {
    try {
        await database.authenticate()
        console.log('Conexión establecida correctamente a la BBDD '+process.env.BD_NAME)
        await database.sync({ alter: true })
        console.log('Modelos sincronizados con éxito con la base de datos.')
    } catch (err) {
        console.log('Error al establecer la conexión', err)
    }
}
conexion()


// uso de cors
//app.use(cors())

// middlewares
//app.use(express.json());
//app.use(express.urlencoded());


// Definir rutas de las páginas de la aplicación
//app.use('/', routerPrincipal)

// Llamada a rutas CRUD productos y ventas
//app.use('/productos', routerProductos)
//app.use('/ventas', routerVentas)

// servir archivos estáticos desde public
//app.use(express.static("public"));



// escucha de puerto
app.listen(PORT, () => {
    console.log(`Servidor escucuando en el puerto ${PORT}`)
});
