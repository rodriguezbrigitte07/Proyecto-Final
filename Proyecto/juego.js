
const desafios = [
    {
        mision: "MISIÓN 01",
        titulo: "Acceso a la sala de servidores",
        icono: "▦",
        pregunta: "Para entrar a la sala de servidores, sabemos que mide 8 metros de ancho por 15 metros de largo. ¿Cuál es el área total de la sala?",
        respuesta: 120,
        pista: "Analiza las medidas de la sala para descubrir cuánto espacio hay en su interior"
    },
    {
        mision: "MISIÓN 02",
        titulo: "Perímetro de seguridad",
        icono: "⬡",
        pregunta: "Para conectar de nuevo los equipos se necesita pasar un cable por todo el borde de la sala. Teniendo en cuenta que mide 15 metros de largo y 8 metros de ancho, ¿Cuántos metros de cable se necesitan en total?",
        respuesta: 46,
        pista: "Recuerda que debes considerar la medida de cada lado para encontrar la distancia total."
    },
    {
        mision: "MISIÓN 03",
        titulo: "Reactivar los servidores",
        icono: "▤",
        pregunta: "Para reactivar el sistema, la empresa tiene un costo fijo de soporte de $120.000 y encender cada servidor suma $18.000 adicionales. ¿Cuál es el costo total de activar 10 servidores?",
        respuesta: 300000,
        pista: "Identifica cómo se relacionan los gastos fijos con la cantidad de servidores que se van a activar."
    },
    {
        mision: "MISIÓN 04",
        titulo: "Recuperar almacenamiento",
        icono: "▥",
        pregunta: "El servidor de respaldo va restaurando datos según la fórmula f(x) = 2x² + 10x + 100, donde x es el tiempo en meses. ¿Cuántos miles de registros se recuperan en 3 meses?",
        respuesta: 148,
        pista: "Reemplaza la cantidad de meses en la función y realiza las operaciones en orden."
    }
];

let desafioActual = 0;
let puntos = 0;
let bloqueado = false;

function mostrarPantalla(id) {
    document.querySelectorAll(".pantalla").forEach(pantalla => {
        pantalla.classList.remove("activa");
    });

    document.getElementById(id).classList.add("activa");
}

function mostrarHistoria() {
    mostrarPantalla("historia");
}

function iniciarJuego() {
    desafioActual = 0;
    puntos = 0;
    actualizarPuntos();
    cargarDesafio();
    mostrarPantalla("juego");
}

function cargarDesafio() {
    const desafio = desafios[desafioActual];

    document.getElementById("nombreMision").textContent = desafio.mision;
    document.getElementById("tituloDesafio").textContent = desafio.titulo;
    document.getElementById("iconoDesafio").textContent = desafio.icono;
    document.getElementById("pregunta").textContent = desafio.pregunta;
    document.getElementById("formula").textContent = desafio.formula || "";

    document.getElementById("contador").textContent =
        `DESAFÍO ${desafioActual + 1} DE ${desafios.length}`;

    document.getElementById("progreso").style.width =
        `${(desafioActual / desafios.length) * 100}%`;

    document.getElementById("respuesta").value = "";
    document.getElementById("respuesta").disabled = false;
    document.getElementById("mensaje").textContent = "";
    document.getElementById("mensaje").className = "mensaje";
    document.getElementById("pista").textContent = "";

    bloqueado = false;
}

function comprobarRespuesta() {
    if (bloqueado) return;

    const campo = document.getElementById("respuesta");
    const valor = campo.value.trim();
    const mensaje = document.getElementById("mensaje");

    if (valor === "") {
        mensaje.textContent = "Ingresa una respuesta para continuar.";
        mensaje.className = "mensaje incorrecto";
        return;
    }

    const respuesta = Number(valor);
    const correcta = desafios[desafioActual].respuesta;

    if (respuesta === correcta) {
        bloqueado = true;
        puntos += 100;
        actualizarPuntos();

        mensaje.textContent = "¡RESPUESTA CORRECTA! +100 PUNTOS";
        mensaje.className = "mensaje correcto";

        campo.disabled = true;

        document.getElementById("progreso").style.width =
            `${((desafioActual + 1) / desafios.length) * 100}%`;

        if (desafioActual === desafios.length - 1) {
            setTimeout(mostrarFinal, 1800);
        } else {
            setTimeout(() => {
                desafioActual++;
                cargarDesafio();
            }, 1800);
        }

    } else {
        mensaje.textContent = "RESPUESTA INCORRECTA. ¡INTÉNTALO DE NUEVO!";
        mensaje.className = "mensaje incorrecto";
    }
}

function mostrarPista() {
    const pista = desafios[desafioActual].pista;
    document.getElementById("pista").textContent = "PISTA: " + pista;
}

function actualizarPuntos() {
    document.getElementById("puntos").textContent = puntos;
}

function mostrarFinal() {
    document.getElementById("resultadoFinal").textContent = puntos;
    mostrarPantalla("final");
}

function reiniciarJuego() {
    desafioActual = 0;
    puntos = 0;
    bloqueado = false;

    actualizarPuntos();
    mostrarPantalla("inicio");
}

// Permite responder también presionando ENTER.
document.getElementById("respuesta").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        comprobarRespuesta();
    }
});