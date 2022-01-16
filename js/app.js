//VARIABLES

//carrito completo
const carrito = document.querySelector('#carrito');
//lista que contiene todos los cursos
const listaCursos = document.querySelector('#lista-cursos');
//lista donde se van agregando los cursos
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
//btn vaciar carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
//este va a ser el array que contiene los items que se van agregando
let articulosCarrito = [];


//EVENTLISTENERS
cargarEventListeners();

function cargarEventListeners() {
    //cuando agregas un curso presionando en el boton "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos todo
        limpiarHTML(); //eliminamos todo el HTMl
    });
}





//resumen de lo que va pasando: cuando se agrega un curso, primero nos aseguramos que el usuario haya clickeado en agregar al carrito y accedemos al div que tiene el contenido del curos. Leemos esos datos y creamos un objeto con esa info que vamos a agregar al carrito de compras y despues imprimimos el html. Como hay duplicados, limpiamos primero y despues generamos de nuevo el HTMl.
//FUNCIONES
function agregarCurso(e) {
    e.preventDefault();

    //1 primero vamos a ver que clase contiene el boton que queremos que ejecute la funcion, despues, con un If vamos a decirle que si el usuario presiona sobre el boton que contiene esa clase, ejecute la funcion. 
    if(e.target.classList.contains('agregar-carrito')) {
        //3 aca creamos una nueva variable que contiene el abuelo del boton, para llegar al card que contiene todos los datos del curso, se lo pasamos a la funcion leerDatosCursos
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCursos(cursoSeleccionado);
    }
}

//12 funcion para elimiar cursos con la cruz
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {

        const cursoId = e.target.getAttribute('data-id');

        //eliminar curso del articulosCarrito por el data id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId); // este filter trae todos menos el que tenga el mismo id
        
        carritoHTML(); // iterar sobre el carrito y mostrar el HTML correspondiente

    }
}

//2 ahora vamos a leer los datos del curso a partir del boton de agregar al carrito que se haya apretado
function leerDatosCursos(curso) {
    //4 crear objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //10 antes de agregar al carrito un elemento vamos a ver si ya esta en el carrito, para solo modificar la cantidad
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    
    if(existe) {
        //actualizamos solo la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];

    } else {
        //agregamos el curso completo

        //5 agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];

    }

    

    //7 agregamos la funcion de cargar el HTML despues de cargar las cosas al array
    carritoHTML()

}

//6 una vez creado el array de carrito y llenado, lo vamos a mostrar en el HTML
function carritoHTML() {

    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src='${imagen}' width='100'></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href='#' class='borrar-curso' data-id='${id}'>X</a></td>
        `;

        //8 Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//9 elimina los cursos del tbody para que no se repitan si agregas dos veces el mismo
function limpiarHTML() {

    //forma lenta de limpiar
    // contenedorCarrito.innerHTML = '';

    //forma rapida: mientras haya un hijo, la condicion se cumple y elimina un hijo
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)     
    }
}

