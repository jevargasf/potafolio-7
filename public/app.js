// Inicialización elementos DOM
const listarRegistros = document.getElementById("listarRegistros")
const agregarRegistro = document.getElementById("agregarRegistro")
const borrarRegistro = document.getElementById("borrarRegistro")

// AJAX con Axios
    // listar todas

    const pintarRegistros = async (e) => {
        try {
            const page = listarRegistros.value
            const pageSize = 5
            const res = await axios(`http://localhost:8000/paises?page=${page}&pageSize=${pageSize}`)
            const cantidadPaginas = parseInt(res.data.count/pageSize)+1

            contenedorData.innerHTML=`
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">País</th>
                        <th scope="col">Continente</th>
                        <th scope="col">Población</th>
                        <th scope="col">PIB 2019</th>
                        <th scope="col">PIB 2020</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTabla">
                </tbody>
                <tfoot class="col-1 d-flex" id="paginador">
                </tfoot>
                </table>
            `
            const paginador = await document.getElementById("paginador")
            for (i=1; i <= cantidadPaginas; i++) {
                const numeral = document.createElement("button")
                numeral.setAttribute("id", i)
                numeral.setAttribute("class", "btn btn-link")
                numeral.setAttribute('onclick', `btnPagina(${i})`)
                numeral.innerHTML = i
                paginador.appendChild(numeral)
            }
            const cuerpoTabla = await document.getElementById("cuerpoTabla")
            res.data.data.forEach(data => {
                const fila = document.createElement("tr")
                fila.innerHTML += `
                    <td>${data.nombre}</td>
                    <td>${data.continente}</td>
                    <td>${data.poblacion}</td>
                    <td>${data.paises_pib.pib_2019}</td>
                    <td>${data.paises_pib.pib_2020}</td>
                `
                cuerpoTabla.appendChild(fila)
            });
        } catch (err) {
            console.log('Error: ', err)
        }
    }

const btnPagina = async (p) => {
try {

    const page = p
    const pageSize = 5
    const res = await axios(`http://localhost:8000/paises?page=${page}&pageSize=${pageSize}`)

    const cuerpoTabla = document.getElementById("cuerpoTabla")
    cuerpoTabla.innerHTML = ``

            res.data.data.forEach(data => {
                const fila = document.createElement("tr")
                fila.innerHTML += `
                    <td>${data.nombre}</td>
                    <td>${data.continente}</td>
                    <td>${data.poblacion}</td>
                    <td>${data.paises_pib.pib_2019}</td>
                    <td>${data.paises_pib.pib_2020}</td>
                `
                cuerpoTabla.appendChild(fila)
            });
        } catch (err) {
            console.log('Error: ', err)
        }
}
    // postear registro
const pintarFormularioPost = async () => {
    
    // pintar formulario para enviar data
    contenedorData.innerHTML = `
    <div class="container col-9 mt-3 mb-5">
        <form class="" id="formularioPost">
            <div class="form-group">
                <label for="nombre">Nombre país</label>
                <input type="text" class="form-control" id="nombre" name="nombre" aria-describedby="nombre" required>
            </div>
            <div class="form-group">
                <label for="continente">Continente</label>
                <input type="text" class="form-control" id="continente" name="continente" aria-describedby="continente" required>
            </div>
            <div class="form-group">
                <label for="poblacion">Población</label>
                <input type="text" class="form-control" id="poblacion" name="poblacion" aria-describedby="poblacion" required>
            </div>
            <div class="form-group">
                <label for="pib2019">PIB 2019</label>
                <input type="text" class="form-control" id="pib2019" name="pib_2019" aria-describedby="pib2019" required>
            </div>
            <div class="form-group">
                <label for="pib2020">PIB 2020</label>
                <input type="text" class="form-control" id="pib2020" name="pib_2020" aria-describedby="pib2020" required>
            </div>
            <button type="submit" class="btn btn-primary" id="botonEnviar">Enviar</button>
        </form>
    </div>
    `

}

const btnPost = async (e) => {
    try {
        e.preventDefault()
        const inputNombre = document.getElementById("nombre")
        const inputContinente = document.getElementById("continente")
        const inputPoblacion = document.getElementById("poblacion")
        const inputPib2019 = document.getElementById("pib2019")
        const inputPib2020 = document.getElementById("pib2020")

        // envía data, backend comprueba si existe o no
        const res = await axios({
            method: 'post',
            url: `http://localhost:8000/`,
            data: {
                nombre: inputNombre.value,
                continente: inputContinente.value,
                poblacion: inputPoblacion.value,
                pib_2019: inputPib2019.value,
                pib_2020: inputPib2020.value
            }
        })
        alert(res.data.mensaje)
    } catch (err) {
        console.log('Error:', err)
    }
}

    // borrar mascota por nombre
const pintarFormularioBorrar = async () => {
    // pintar formulario para enviar data
    contenedorData.innerHTML = `
    <h6 class="text-center my-3 py-3">Ingresa el nombre del país que desea eliminar de la base de datos.</h6>
    <div class="container col-6">
        <form class="" id="formularioBorrar">
            <div class="form-group d-flex">
                <input type="text" class="form-control col-7 mx-3" id="nombre" name="nombre" aria-describedby="nombre" required>
                <button type="submit" class="btn btn-primary">Borrar Registro</button>
            </div>
            <div class="container text-center">
            </div>
        </form>
    </div>
    `
}

const btnBorrar = async (e) => {
    try {
    e.preventDefault()
    // envía nombre país, backend comprueba si el rut existe o no
    const inputNombre = document.getElementById("nombre")
    const res = await axios({
        method: 'delete',
        url: `http://localhost:8000/${inputNombre.value}`,
    })
    alert(res.data.mensaje)
    } catch (err) {
        console.log('Error:', err)
    }
}

// eventos botones
listarRegistros.addEventListener('click', pintarRegistros)
agregarRegistro.addEventListener('click', () => {
    pintarFormularioPost();
    document.getElementById("formularioPost").addEventListener('submit', e => btnPost(e))
})
borrarRegistro.addEventListener('click', (e) => {
    pintarFormularioBorrar();
    document.getElementById("formularioBorrar").addEventListener('submit', e => btnBorrar(e))
})
