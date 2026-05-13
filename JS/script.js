const botonTema = document.getElementById("botonTema");
const contenedorEstudios = document.getElementById("contenedorEstudios");
const formularioEstudio = document.getElementById("formularioEstudio");

const estudiosIniciales = [
    {
        nombre: "Desarrollo de Aplicaciones Multiplataforma",
        centro: "IES GREGORIO PRIETO",
        descripcion: "Programación, bases de datos y desarrollo web."
    }
];

function cargarTema() {

    if (localStorage.getItem("tema") === "oscuro") {

        document.body.classList.add("oscuro");

        if (botonTema !== null) {
            botonTema.textContent = "Modo claro";
        }

    }

}

function cambiarTema() {

    document.body.classList.toggle("oscuro");

    if (document.body.classList.contains("oscuro")) {

        localStorage.setItem("tema", "oscuro");
        botonTema.textContent = "Modo claro";

    } else {

        localStorage.setItem("tema", "claro");
        botonTema.textContent = "Modo oscuro";

    }

}

function obtenerEstudios() {

    const estudiosGuardados = JSON.parse(localStorage.getItem("estudios"));

    if (estudiosGuardados === null) {

        localStorage.setItem("estudios", JSON.stringify(estudiosIniciales));

        return estudiosIniciales;

    }

    return estudiosGuardados;

}

function guardarEstudios(estudios) {

    localStorage.setItem("estudios", JSON.stringify(estudios));

}

function crearObjetoEstudio() {

    const nombre = document.getElementById("nombre");
    const centro = document.getElementById("centro");
    const descripcion = document.getElementById("descripcion");

    const estudio = {
        nombre: nombre.value,
        centro: centro.value,
        descripcion: descripcion.value
    };

    return estudio;

}

function guardarEstudio(estudio) {

    const estudios = obtenerEstudios();

    estudios.push(estudio);

    guardarEstudios(estudios);

}

function eliminarEstudio(posicion) {

    const estudios = obtenerEstudios();

    estudios.splice(posicion, 1);

    guardarEstudios(estudios);

    mostrarEstudios();

}

function crearEstudio(estudio, posicion) {

    const article = document.createElement("article");
    article.classList.add("estudio");

    const botonEliminar = document.createElement("span");
    botonEliminar.textContent = "✖";
    botonEliminar.classList.add("boton-eliminar");

    botonEliminar.addEventListener("click", function () {
        eliminarEstudio(posicion);
    });

    const titulo = document.createElement("h3");
    titulo.textContent = estudio.nombre;

    const centro = document.createElement("p");
    centro.textContent = "Centro: " + estudio.centro;

    const descripcion = document.createElement("p");
    descripcion.textContent = estudio.descripcion;

    article.appendChild(botonEliminar);
    article.appendChild(titulo);
    article.appendChild(centro);
    article.appendChild(descripcion);

    return article;

}

function mostrarEstudios() {

    const estudios = obtenerEstudios();

    contenedorEstudios.innerHTML = "";

    estudios.forEach(function (estudio, posicion) {

        const article = crearEstudio(estudio, posicion);

        contenedorEstudios.appendChild(article);

    });

}

cargarTema();

if (botonTema !== null) {
    botonTema.addEventListener("click", cambiarTema);
}

if (contenedorEstudios !== null) {
    mostrarEstudios();
}

if (formularioEstudio !== null) {

    formularioEstudio.addEventListener("submit", function (event) {

        event.preventDefault();

        const nuevoEstudio = crearObjetoEstudio();

        guardarEstudio(nuevoEstudio);

        formularioEstudio.reset();

        alert("Estudio guardado correctamente");

    });

}