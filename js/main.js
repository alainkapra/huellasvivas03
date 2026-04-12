// script.js

// ===========================
// BUSCADOR
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    const inputBusqueda = document.querySelector(".busqueda input");
    const botonBusqueda = document.querySelector(".busqueda button");

    botonBusqueda.addEventListener("click", () => {
        const termino = inputBusqueda.value.trim();
        if (termino === "") {
            alert("Por favor escribe algo para buscar en la memoria.");
        } else {
            // Aquí puedes conectar con tu motor de búsqueda o redirigir
            alert(`Buscando: "${termino}" en el archivo...`);
        }
    });
});

// ===========================
// TARJETAS DE DOCUMENTOS
// ===========================
const tarjetas = document.querySelectorAll(".tarjeta-papel");

tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener("mouseenter", () => {
        tarjeta.style.transform = "scale(1.02)";
    });
    tarjeta.addEventListener("mouseleave", () => {
        tarjeta.style.transform = "scale(1)";
    });
});

// ===========================
// ANIMACIÓN DE CIFRAS (Lo que guardamos)
// ===========================
function animarCifras() {
    const cifras = document.querySelectorAll(".cifra-numero");
    cifras.forEach(cifra => {
        const valorFinal = parseInt(cifra.textContent.replace(/\./g, ""));
        let contador = 0;
        const incremento = Math.ceil(valorFinal / 100);

        const intervalo = setInterval(() => {
            contador += incremento;
            if (contador >= valorFinal) {
                contador = valorFinal;
                clearInterval(intervalo);
            }
            cifra.textContent = contador.toLocaleString("es-ES");
        }, 30);
    });
}

// Ejecutar animación al cargar
window.addEventListener("load", animarCifras);

// ===========================
// LÍNEA DE TIEMPO INTERACTIVA
// ===========================
const hitos = document.querySelectorAll(".hito");

hitos.forEach(hito => {
    hito.addEventListener("click", () => {
        const año = hito.querySelector(".hito-ano").textContent;
        const desc = hito.querySelector(".hito-desc").textContent;
        alert(`Hito seleccionado:\n${año} - ${desc}`);
    });
});
