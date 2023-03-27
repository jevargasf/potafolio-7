const express = require('express');
const port = 8000
//const cors = require('cors')
//const routerProductos = require('./routes/productosRoutes')
//const routerVentas = require('./routes/ventas')
//const routerPrincipal = require('./routes/routes')

const app = express();
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
app.listen(port, () => {
    console.log('Escuchando en el puerto 8000')
});
