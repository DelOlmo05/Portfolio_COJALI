import { useEffect, useState } from "react";
import "./App.css";

const estudiosIniciales = [
    {
        nombre: "Desarrollo de Aplicaciones Multiplataforma",
        centro: "IES GREGORIO PRIETO",
        descripcion: "Programación, bases de datos y desarrollo web."
    }
];

function App() {

    const [temaOscuro, setTemaOscuro] = useState(function () {

        return localStorage.getItem("tema") === "oscuro";

    });

    const [estudios, setEstudios] = useState(function () {

        const estudiosGuardados = JSON.parse(localStorage.getItem("estudios"));

        if (estudiosGuardados !== null) {

            return estudiosGuardados;

        }

        return estudiosIniciales;

    });

    const [repositorios, setRepositorios] = useState([]);

    const [nuevoEstudio, setNuevoEstudio] = useState({
        nombre: "",
        centro: "",
        descripcion: ""
    });

    useEffect(function () {

        fetch("https://api.github.com/users/DelOlmo05/repos")

            .then(function (respuesta) {

                return respuesta.json();

            })

            .then(function (datos) {

                setRepositorios(datos);

            });

    }, []);

    useEffect(function () {

        localStorage.setItem(
            "estudios",
            JSON.stringify(estudios)
        );

    }, [estudios]);

    useEffect(function () {

        if (temaOscuro) {

            localStorage.setItem("tema", "oscuro");

        } else {

            localStorage.setItem("tema", "claro");

        }

    }, [temaOscuro]);

    function cambiarTema() {

        setTemaOscuro(!temaOscuro);

    }

    function controlarCambio(event) {

        const { name, value } = event.target;

        setNuevoEstudio({
            ...nuevoEstudio,
            [name]: value
        });

    }

    function agregarEstudio(event) {

        event.preventDefault();

        setEstudios([
            ...estudios,
            nuevoEstudio
        ]);

        setNuevoEstudio({
            nombre: "",
            centro: "",
            descripcion: ""
        });

    }

    function eliminarEstudio(posicion) {

        const copiaEstudios = [...estudios];

        copiaEstudios.splice(posicion, 1);

        setEstudios(copiaEstudios);

    }

    return (

        <div className={temaOscuro ? "oscuro" : ""}>

            <header>

                <button
                    id="botonTema"
                    onClick={cambiarTema}
                >

                    {temaOscuro ? "Modo claro" : "Modo oscuro"}

                </button>

                <h1>Mi Portfolio</h1>

                <nav>

                    <ul>
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#sobreMi">Sobre mí</a></li>
                        <li><a href="#habilidades">Habilidades</a></li>
                        <li><a href="#proyectos">Proyectos</a></li>
                        <li><a href="#github">GitHub</a></li>
                        <li><a href="#estudios">Estudios</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                    </ul>

                </nav>

            </header>

            <div className="contenedor-principal">

                <main>

                    <section id="inicio">

                        <h2>Inicio</h2>

                        <img
                            id="foto"
                            src="/MiFoto.jpeg"
                            alt="Foto personal"
                        />

                        <h3>Alberto Del Olmo Lara</h3>

                        <p>
                            Estudiante de Desarrollo de Aplicaciones
                            Multiplataforma (DAM).
                        </p>

                        <p>
                            Me interesa la programación,
                            el desarrollo web y las bases de datos.
                        </p>

                    </section>

                    <section id="sobreMi">

                        <h2>Sobre mí</h2>

                        <p>
                            Actualmente estoy aprendiendo Java,
                            HTML, CSS y bases de datos.
                        </p>

                        <p>
                            Mi objetivo es seguir mejorando mis
                            conocimientos y desarrollar nuevas
                            habilidades relacionadas con la informática.
                        </p>

                    </section>

                    <section id="habilidades">

                        <h2>Habilidades</h2>

                        <ul>
                            <li>Programación en Java</li>
                            <li>HTML y CSS</li>
                            <li>Bases de datos con MySQL</li>
                            <li>Diseño básico de páginas web</li>
                            <li>Creación de consultas SQL</li>
                        </ul>

                    </section>

                    <section id="proyectos">

                        <h2>Proyectos</h2>

                        <p>
                            Algunos proyectos relacionados con bases de datos:
                        </p>

                        <div className="proyectos">

                            <article className="proyecto">

                                <h3>Sistema de gestión empresarial</h3>

                                <p>
                                    Aplicación orientada al control
                                    de clientes, empleados, pedidos
                                    y facturación mediante MySQL.
                                </p>

                            </article>

                            <article className="proyecto">

                                <h3>Plataforma de análisis de datos</h3>

                                <p>
                                    Proyecto enfocado al almacenamiento
                                    y consulta de información para
                                    generar estadísticas e informes.
                                </p>

                            </article>

                            <article className="proyecto">

                                <h3>Gestión de gimnasio</h3>

                                <p>
                                    Sistema para administrar usuarios,
                                    rutinas, entrenamientos y seguimiento
                                    del progreso físico.
                                </p>

                            </article>

                        </div>

                    </section>

                    <section id="github">

                        <h2>Repositorios de GitHub</h2>

                        <p>
                            Algunos repositorios reales de mi perfil:
                        </p>

                        <div className="proyectos">

                            {repositorios.map(function (repositorio) {

                                return (

                                    <article
                                        className="proyecto"
                                        key={repositorio.id}
                                    >

                                        <h3>{repositorio.name}</h3>

                                        <p>

                                            {repositorio.description === null
                                                ? "Repositorio sin descripción."
                                                : repositorio.description}

                                        </p>

                                        <a
                                            href={repositorio.html_url}
                                            target="_blank"
                                        >

                                            Ver repositorio

                                        </a>

                                    </article>

                                );

                            })}

                        </div>

                    </section>

                    <section id="estudios">

                        <h2>Estudios</h2>

                        <div className="estudios">

                            {estudios.map(function (estudio, posicion) {

                                return (

                                    <article
                                        className="estudio"
                                        key={posicion}
                                    >

                                        <span
                                            className="boton-eliminar"
                                            onClick={function () {

                                                eliminarEstudio(posicion);

                                            }}
                                        >

                                            ✖

                                        </span>

                                        <h3>{estudio.nombre}</h3>

                                        <p>
                                            Centro: {estudio.centro}
                                        </p>

                                        <p>{estudio.descripcion}</p>

                                    </article>

                                );

                            })}

                        </div>

                        <form onSubmit={agregarEstudio}>

                            <fieldset>

                                <legend>Añadir estudio</legend>

                                <label htmlFor="nombre">
                                    Nombre del estudio:
                                </label>

                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={nuevoEstudio.nombre}
                                    onChange={controlarCambio}
                                    required
                                />

                                <br /><br />

                                <label htmlFor="centro">
                                    Centro:
                                </label>

                                <input
                                    type="text"
                                    id="centro"
                                    name="centro"
                                    value={nuevoEstudio.centro}
                                    onChange={controlarCambio}
                                    required
                                />

                                <br /><br />

                                <label htmlFor="descripcion">
                                    Descripción:
                                </label>

                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    rows="4"
                                    value={nuevoEstudio.descripcion}
                                    onChange={controlarCambio}
                                    required
                                ></textarea>

                                <br /><br />

                                <button type="submit">
                                    Guardar estudio
                                </button>

                            </fieldset>

                        </form>

                    </section>

                </main>

                <aside id="contacto">

                    <h2>Información adicional</h2>

                    <p>
                        Este portfolio muestra mi aprendizaje
                        en el ciclo de Desarrollo de Aplicaciones
                        Multiplataforma.
                    </p>

                    <h3>Áreas de interés</h3>

                    <ul>
                        <li>Programación</li>
                        <li>Diseño web</li>
                        <li>Bases de datos</li>
                        <li>Desarrollo de aplicaciones</li>
                    </ul>

                    <h3>Contacto</h3>

                    <form>

                        <fieldset>

                            <legend>Formulario</legend>

                            <label htmlFor="nombreContacto">
                                Nombre:
                            </label>

                            <input
                                type="text"
                                id="nombreContacto"
                                required
                            />

                            <br /><br />

                            <label htmlFor="emailContacto">
                                Email:
                            </label>

                            <input
                                type="email"
                                id="emailContacto"
                                required
                            />

                            <br /><br />

                            <label htmlFor="mensajeContacto">
                                Mensaje:
                            </label>

                            <textarea
                                id="mensajeContacto"
                                rows="4"
                                required
                            ></textarea>

                            <br /><br />

                            <button type="submit">

                                Enviar

                            </button>

                        </fieldset>

                    </form>

                </aside>

            </div>

            <footer>

                <p>© 2026 - Mi Portfolio Personal</p>

                <div className="redes-sociales">

                    <a
                        href="https://github.com/DelOlmo05"
                        target="_blank"
                    >

                        GitHub

                    </a>

                    <a href="mailto:delolmolaraa@gmail.com">

                        Email

                    </a>

                    <a href="#">

                        LinkedIn

                    </a>

                </div>

            </footer>

        </div>

    );

}

export default App;