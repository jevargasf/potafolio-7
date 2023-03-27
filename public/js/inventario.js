// Inicializción elementos DOM
    // contenedores
const contenedorBotones = document.getElementById("contenedorBotones")
const contenedorFormularios = document.getElementById("contenedorFormularios")
const contenedorVentas = document.getElementById("contenedorVentas")

    // botones
const btnConseguirProductos = document.getElementById("conseguirProductos")
const btnPintarFormularioPost = document.getElementById("btnPintarFormularioPost")
const btnActualizarProducto = document.getElementById("actualizarProducto")
const btnBorrarProducto = document.getElementById("borrarProducto")
const btnConseguirVentas = document.getElementById("conseguirVentas")
const btnConseguirVentasId = document.getElementById("conseguirVentasId")

    // calcular total venta

// Pintar elementos DOM

    // formulario post
const formularioPost = function () {
        contenedorFormularios.innerHTML =`
        <form id="formularioPost" name="formularioPost" enctype="multipart/form-data">

        <!-- Fila -->
        <div class="row">

            <!-- Columna -->
            <div class="col-md-6">
                <div class="md-form mb-0">
                    <input type="text" id="nombre" name="nombre" class="form-control" required>
                    <label for="nombre" class="">Nombre producto</label>
                </div>
            </div>
            <!-- Columna -->

            <!-- Columna -->
            <div class="col-md-6">
                <div class="md-form mb-0">
                    <input type="text" id="precio" name="precio" class="form-control" required>
                    <label for="precio" class="">Precio</label>
                </div>
            </div>
            <!-- Columna -->

        </div>
        <!-- Fila -->

        <!-- Fila -->
        <!-- Columna -->
        <div class="row">
            <div class="col-md-6">
                <div class="md-form mb-0">
                    <input type="text" id="stock" name="stock" class="form-control" required>
                    <label for="stock" class="">Stock</label>
                </div>
            </div>
        <!-- Columna -->
        <div class="col-md-6">
                <div class="md-form mb-0">
                    <input class="form-control" type="file" name="imagen" id="imagen" required>
                    <label for="imagen" class="form-label">Selecciona una foto para el producto</label>
                </div>
            </div>
        </div>
        <!-- Fila -->

        <!-- Fila -->
        <div class="row">

            <!--Columna -->
            <div class="col-md-12">

                <div class="md-form">
                    <textarea type="text" id="descripcion" name="descripcion" rows="2" class="form-control md-textarea" required></textarea>
                    <label for="descripcion">Descripción</label>
                </div>

            </div>
        </div>
        <!-- Fila -->
        <div class="row text-center">
            <div class="m-3">
                <button type="submit" class="btn btn-primary" id="postearProducto">Enviar</button>
            </div>
        </div>
    </form>
        `
    
}
    // formulario put (primero conseguir ID, luego actualizar campos)
let idActualizar = null
const formularioActualizar = async (e) => {
    try {

        contenedorFormularios.innerHTML = `
            <form id="formularioActualizar" name="formularioActualizar">

            <!-- Fila -->
            <div class="row">

                <!-- Columna -->
                <div class="col-md-6">
                    <div class="md-form mb-0">
                        <input type="text" id="nombre" name="nombre" class="form-control">
                        <label for="nombre" class="">Nombre producto</label>
                    </div>
                </div>
                <!-- Columna -->

                <!-- Columna -->
                <div class="col-md-6">
                    <div class="md-form mb-0">
                        <input type="text" id="precio" name="precio" class="form-control">
                        <label for="precio" class="">Precio</label>
                    </div>
                </div>
                <!-- Columna -->

            </div>
            <!-- Fila -->

            <!-- Fila -->
            <!-- Columna -->
            <div class="row">
                <div class="col-md-6">
                    <div class="md-form mb-0">
                        <input type="text" id="stock" name="stock" class="form-control">
                        <label for="stock" class="">Stock</label>
                    </div>
                </div>
            <!-- Columna -->
            <div class="col-md-6">
                    <div class="md-form mb-0">
                        <input class="form-control" type="file" name="imagen" id="imagen">
                        <label for="imagen" class="form-label">Selecciona una foto para el producto</label>
                    </div>
                </div>
            </div>
            <!-- Fila -->

            <!-- Fila -->
            <div class="row">

                <!--Columna -->
                <div class="col-md-12">

                    <div class="md-form">
                        <textarea type="text" id="descripcion" name="descripcion" rows="2" class="form-control md-textarea"></textarea>
                        <label for="descripcion">Descripción</label>
                    </div>

                </div>
            </div>
            <!-- Fila -->
            <div class="row text-center">
                <div class="m-3">
                    <button type="submit" class="btn btn-primary" id="actualizarProducto">Enviar</button>
                </div>
            </div>
        </form>
        `
        idActualizar = parseInt(prompt("Ingrese el Id del producto que desea actualizar los datos: "))
        const rutaGetId = `http://localhost:8000/productos/${idActualizar}`
        const res = await axios(rutaGetId)
        const nombre = document.getElementById("nombre")
        const precio = document.getElementById("precio")
        const stock = document.getElementById("stock")
        const descripcion = document.getElementById("descripcion")
        nombre.value = res.data.nombre
        precio.value = res.data.precio
        stock.value = res.data.stock
        descripcion.value = res.data.descripcion
    } catch (err) {
        console.log('Error: ', err)
    }
}
    // formulario delete (borrar con id)
let idBorrar = null
const formularioDelete = async (e) => {
    try {    
         // pintar tabla
        contenedorFormularios.innerHTML = `
        <form id="formularioBorrar" name="formularioBorrar">

        <table class="table bg-dark text-white rounded">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Imagen</th>
                </tr>
            </thead>
            <tbody id="contenedorTabla">
            </tbody>
            <tfoot id="footTabla">
                
            </tfoot>
         </table>
         </form>

         `

        const contenedorTabla = document.getElementById("contenedorTabla")
        const footTabla = document.getElementById("footTabla")
        footTabla.innerHTML = `
                <div class="row">
                    <td colspan="5" class="m-3 text-center">
                        <button type="submit" class="btn btn-primary col-2" id="confirmaBorrar">Borrar</button>
                    </td>
                </div>
        `
             // petición datos
             idBorrar = prompt("Ingrese el Id del producto que desea eliminar de la base de datos: ")
             const rutaGetId = `http://localhost:8000/productos/${idBorrar}`
             const res = await axios(rutaGetId)
             const nuevaFila = document.createElement("tr")
             nuevaFila.innerHTML = `
                 <td>${res.data.id}</td>
                 <td>${res.data.nombre}</td>
                 <td>${res.data.precio}</td>
                 <td>${res.data.stock}</td>
                 <td><img class="img-fluid" width="100" src="../${res.data.imagen}" alt="imagen-producto"></td>
                 `
             contenedorTabla.appendChild(nuevaFila)

    } catch (err) {
        console.log('Error:', err)
    }
}
// AJAX
    // Get productos
const listarProductos = async() => {
    try {    
        // pintar tabla
        contenedorFormularios.innerHTML = `
            <table class="table bg-dark text-white rounded">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Imagen</th>
                    </tr>
                </thead>
                <tbody id="contenedorTabla">
                </tbody>
            </table>
            `

        const contenedorTabla = document.getElementById("contenedorTabla")
        // petición datos
            const rutaGet = 'http://localhost:8000/'
            const res = await axios(rutaGet)
            res.data.forEach(item => {
            const nuevaFila = document.createElement("tr")
            nuevaFila.innerHTML = `
        
                <td>${item.id}</td>
                <td>${item.nombre}</td>
                <td>${item.precio}</td>
                <td>${item.stock}</td>
                <td><img class="img-fluid" width="100" src="../${item.imagen}" alt="imagen-producto"></td>
                `
            contenedorTabla.appendChild(nuevaFila)
            });
    } catch (err) {
        console.log('Error: ', err)
    }
    
}
    // Post nuevo producto
const postearProducto = async(e) => {
    try{
        // recuperar data del DOM
        e.preventDefault()

        const form = new FormData(e.target)

        // petición post
        const rutaPost = 'http://localhost:8000/productos/post'
        const res = await axios({
                method: 'post',
                url: rutaPost,
                data: form
            })
        alert(res.data.mensaje)
    } catch (err) {
        console.log('Error: ', err)
    }
}

    // actualizar producto
const actualizarProducto = async(e) => {
    try {
        e.preventDefault()
        const form = new FormData(e.target)
        console.log(...form)
        // petición put      
        const rutaPut = `http://localhost:8000/productos/actualizar/${idActualizar}`
        const res = await axios({
            method: 'put',
            url: rutaPut,
            data: form
        })
        alert(res.data.mensaje)
    } catch (err) {
        console.log('Error: ', err)
    }
}

    // borrar producto
const borrarProducto = async(e) => {
    try {
        e.preventDefault()
        const rutaDelete = `http://localhost:8000/productos/borrar/${idBorrar}`
        const res = await axios({
        method: 'delete',
        url: rutaDelete
        })
        alert(res.data.mensaje)
    } catch (err) {
        console.log('Error: ', err)
    }
}

    // get ventas
const conseguirVentas = async () => {
    try {
        // pintar tabla
        contenedorVentas.innerHTML = `
            <table class="table bg-dark text-white rounded text-center">
                <thead>
                    <tr>
                        <th scope="col" rowspan="2">Id Factura</th>
                        <th scope="col" rowspan="2">Fecha</th>
                        <th scope="col" rowspan="2">Hora</th>
                        <th scope="col" rowspan="2">Total Venta</th>
                        <th class="text-center" scope="col" colspan="2">
                            Productos
                            <tr>
                                <td>Nombre</td>
                                <td>Cantidad</td>
                            </tr>
                        </th>
                        
                    </tr>
                </thead>
                <tbody id="tablaVentas">
                </tbody>
            </table>
            `

        const tablaVentas = document.getElementById("tablaVentas")
        // petición datos
            const rutaGet = 'http://localhost:8000/ventas'
            const res = await axios(rutaGet)
            //console.log(res.data)
        // calcular totales para cada factura
        function sumarTotal(){
            prodsVenta = []
            idVentasRep = []
            res.data.forEach(venta => idVentasRep.push(venta.id))
            idVentas = [...new Set(idVentasRep)]
            totalesFacturas = []
            idVentas.forEach(id => {
                arrVenta = res.data.filter(element => element.id == id)
                montosSumar = []
                arrVenta.forEach(item => {montosSumar.push(item.precio*item.cantidad)})
                sumaFactura = montosSumar.reduce((a, b) => a+b, 0)
                totalesFacturas.push({ ["idFactura"]: id, ["total"]: sumaFactura })
            })
            totalesFacturas.forEach(factura => {
                res.data.forEach(venta => {
                    if (factura.idFactura == venta.id) {
                        venta["totalVenta"] = factura.total
                    }
                })
                
            })
        }        
        sumarTotal()

            res.data.forEach(venta => {
            const nuevaFila = document.createElement("tr")
            nuevaFila.innerHTML += `
        
                <td>${venta.id}</td>
                <td>${venta.fecha}</td>
                <td>${venta.hora}</td>
                <td>${venta.totalVenta}</td>
                <td>${venta.nombre}</td>
                <td>${venta.cantidad}</td>

                `
            tablaVentas.appendChild(nuevaFila)


            });
    } catch (err) {
        console.log('Error: ', err)
    }
}

const conseguirVentasId = async () => {
    try {
        // pintar tabla
        contenedorVentas.setAttribute("class", "col-12")
        contenedorVentas.innerHTML = `
            <table class="table bg-dark text-white rounded text-center">
                <thead>
                    <tr>
                        <th scope="col" rowspan="2">Id Factura</th>
                        <th scope="col" rowspan="2">Fecha</th>
                        <th scope="col" rowspan="2">Hora</th>
                        <th scope="col" rowspan="2">Total Venta</th>
                        <th class="text-center" scope="col" colspan="2">
                            Productos
                            <tr>
                                <td>Nombre</td>
                                <td>Cantidad</td>
                            </tr>
                        </th>
                        
                    </tr>
                </thead>
                <tbody id="tablaVentas">
                </tbody>
            </table>
            `

        const tablaVentas = document.getElementById("tablaVentas")
        // petición datos
            const idVenta = prompt("Ingrese el Id de la factura que desea consultar: ")
            const rutaGetId = `http://localhost:8000/ventas/${idVenta}`
            const res = await axios(rutaGetId)
        // validación id factura
        while (res.data.length === 0) {
            contenedorVentas.setAttribute("class", "col-5 container p-3 m-auto text-center")
            contenedorVentas.innerHTML=`
                <h5 class="text-center">Consulta no realizada. Puede revisar la lista de boletas registradas con el botón "Listar todas las ventas"</h5>
            `            
            break
        }
        
        // calcular totales para cada factura
        function sumarTotal(){
            montosSumar = []
            res.data.forEach(item => {montosSumar.push(item.precio*item.cantidad)})
            sumaFactura = montosSumar.reduce((a, b) => a+b, 0)
            res.data.forEach(prod => {
                prod["totalVenta"] = sumaFactura
            })
                
        }        
        sumarTotal()

            res.data.forEach(venta => {
            const nuevaFila = document.createElement("tr")
            nuevaFila.innerHTML += `
        
                <td>${venta.id}</td>
                <td>${venta.fecha}</td>
                <td>${venta.hora}</td>
                <td>${venta.totalVenta}</td>
                <td>${venta.nombre}</td>
                <td>${venta.cantidad}</td>

                `
            tablaVentas.appendChild(nuevaFila)


            });


    } catch (err) {
        console.log('Error: ', err)
    }
}
// manejo de eventos
btnConseguirProductos.addEventListener('click', listarProductos)
btnPintarFormularioPost.addEventListener('click', () => {
    formularioPost()
    document.getElementById("formularioPost").addEventListener('submit', e => postearProducto(e));
})
btnActualizarProducto.addEventListener('click', (e) => {
    formularioActualizar()
    document.getElementById("formularioActualizar").addEventListener('submit', e => actualizarProducto(e));
})
btnBorrarProducto.addEventListener('click', (e) => {
    formularioDelete()
    document.getElementById("formularioBorrar").addEventListener('submit', e => borrarProducto(e));
})
btnConseguirVentas.addEventListener('click', conseguirVentas)
btnConseguirVentasId.addEventListener('click', conseguirVentasId)

    
    





    





