// archivo.js - Comportamientos exclusivos para ARCHIVO_DOCUMENTAL.html

// Anular la barra de navegación fija (que no cambie de fondo al hacer scroll)
const navbar = document.querySelector('.navbar-principal');

// Opción A: Cambiar su posición a relativa (ya no queda fija)
if (navbar) {
    navbar.style.position = 'relative';
    navbar.style.background = '#0a0a1a'; // Color fijo para esta página
}

// Opción B: Si solo quieres que no cambie de fondo pero siga fija, usa esto:
/*
if (navbar) {
    navbar.classList.remove('scrolled');
    // Evitar que el scroll le agregue la clase
    window.removeEventListener('scroll', function() {});
}
*/

console.log('archivo.js cargado - Navbar personalizada para Archivo Documental');