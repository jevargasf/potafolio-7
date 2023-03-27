const express = require('express');
require('dotenv').config()
const database = require('./config/db.js')
const { authenticate, sync } = require('sequelize')
const db = require('./models/asociaciones.js')
const cors = require('cors')
const routerProductos = require('./routes/productosRoutes')
//const routerVentas = require('./routes/ventas')
const routerPrincipal = require('./routes/routes')
const multer = require('multer')
const path = require('path')

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

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img'), 
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

// importar relaciones entre modelos
db.defineAssociations()

// middlewares
app.use(cors())
app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/img'),
    limits: { fileSize: 2000000 } 
}).single('imagen'))

app.use(express.json());
app.use(express.urlencoded());


// Definir rutas de las páginas de la aplicación
app.use('/', routerPrincipal)

// Rutas productos y ventas
app.use('/productos', routerProductos)
//app.use('/ventas', routerVentas)

// servir archivos estáticos desde public
app.use(express.static("public"));



// escucha de puerto
app.listen(PORT, () => {
    console.log(`Servidor escucuando en el puerto ${PORT}`)
});
