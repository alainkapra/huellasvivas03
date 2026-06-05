// === NAVBAR TOGGLE (HAMBURGUESA) ===
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');

if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.navbar-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Dropdown en móvil
const dropdowns = document.querySelectorAll('.nav-dropdown');
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    if (link) {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
});

// Scroll suave al hacer click en scrolldown
const scrollDown = document.querySelector('.scrolldown');
if (scrollDown) {
    scrollDown.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// === NAVBAR CON FONDO AL HACER SCROLL (EXCEPTO EN ARCHIVO DOCUMENTAL) ===
const navbar = document.querySelector('.navbar-principal');
const isArchivoPage = window.location.pathname.includes('ARCHIVO_DOCUMENTAL');

function handleNavbarScroll() {
    if (!isArchivoPage) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

if (!isArchivoPage) {
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();
} else {
    // En Archivo Documental, la barra será relativa (no fija)
    if (navbar) {
        navbar.style.position = 'relative';
        navbar.style.background = '#0a0a1a';
        navbar.classList.remove('scrolled');
    }
}

// === CAMBIO DE COLORES POR SECCIÓN ===
const sections = document.querySelectorAll('.vertical-section');

function applySectionColors() {
    sections.forEach(section => {
        const bg = section.getAttribute('data-bg');
        const fg = section.getAttribute('data-fg');
        
        if (bg) {
            section.style.backgroundColor = bg;
        } else {
            section.style.backgroundColor = '#f5f5f5';
        }
        
        if (fg) {
            section.style.color = fg;
        } else {
            section.style.color = '#1a1a1a';
        }
    });
}

function updateNavbarColor() {
    let currentSection = null;
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const offsetTop = section.offsetTop;
        const offsetBottom = offsetTop + section.offsetHeight;
        if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            currentSection = section;
        }
    });
    
    if (currentSection && !navbar.classList.contains('scrolled') && !isArchivoPage) {
        const fg = currentSection.getAttribute('data-fg');
        if (fg) {
            navbar.style.color = fg;
            const links = document.querySelectorAll('.navbar-menu a');
            links.forEach(link => {
                link.style.color = fg;
            });
            const toggleSpans = document.querySelectorAll('.navbar-toggle span');
            toggleSpans.forEach(span => {
                span.style.background = fg;
            });
        }
    } else if (window.scrollY < window.innerHeight && !isArchivoPage) {
        navbar.style.color = 'white';
        const links = document.querySelectorAll('.navbar-menu a');
        links.forEach(link => {
            link.style.color = 'white';
        });
        const toggleSpans = document.querySelectorAll('.navbar-toggle span');
        toggleSpans.forEach(span => {
            span.style.background = 'white';
        });
    }
}

// === FONDO UNIFORME DURANTE SCROLL, COLOR ORIGINAL AL DETENERSE ===

// Agregar transición suave a las secciones
const styleTransition = document.createElement('style');
styleTransition.textContent = `
    .vertical-section {
        transition: background-color 0.3s ease, color 0.3s ease !important;
    }
`;
document.head.appendChild(styleTransition);

const defaultBgColor = '#0a0a0a'; // Color uniforme mientras se hace scroll
let originalBgColors = [];
let scrollTimeout;

// Guardar los colores originales de cada sección
sections.forEach(section => {
    const originalBg = section.getAttribute('data-bg');
    originalBgColors.push({
        section: section,
        originalBg: originalBg || '#f5f5f5',
        originalFg: section.getAttribute('data-fg') || '#1a1a1a'
    });
});

// Función para aplicar color uniforme a TODAS las secciones
function applyUniformBg() {
    sections.forEach(section => {
        section.style.backgroundColor = defaultBgColor;
        section.style.color = '#e0e0e0';
    });
}

// Función para restaurar el color original de la sección visible
function restoreVisibleSectionColor() {
    // Encontrar qué sección está más visible en el viewport
    let maxVisibleSection = null;
    let maxVisibility = 0;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calcular qué parte de la sección es visible
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(windowHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibilityRatio = visibleHeight / section.offsetHeight;
        
        if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            maxVisibleSection = section;
        }
    });
    
    // Restaurar color original de la sección más visible
    sections.forEach(section => {
        const original = originalBgColors.find(item => item.section === section);
        if (section === maxVisibleSection && original && original.originalBg) {
            section.style.backgroundColor = original.originalBg;
            section.style.color = original.originalFg;
        } else {
            section.style.backgroundColor = defaultBgColor;
            section.style.color = '#e0e0e0';
        }
    });
}

// Detectar inicio y fin del scroll (solo para index, no para archivo)
if (!isArchivoPage) {
    window.addEventListener('scroll', () => {
        // Durante el scroll: aplicar color uniforme
        applyUniformBg();
        
        // Limpiar timeout anterior
        clearTimeout(scrollTimeout);
        
        // Cuando el scroll se detiene (después de 150ms sin scroll)
        scrollTimeout = setTimeout(() => {
            restoreVisibleSectionColor();
        }, 150);
    });
    
    // También restaurar cuando el mouse entra a una sección
    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            clearTimeout(scrollTimeout);
            restoreVisibleSectionColor();
        });
    });
}

// Inicializar: mostrar colores originales al cargar
window.addEventListener('load', () => {
    if (!isArchivoPage) {
        restoreVisibleSectionColor();
    }
});

// Aplicar colores iniciales y navbar
applySectionColors();
window.addEventListener('scroll', updateNavbarColor);
updateNavbarColor();

// === LAS SECCIONES YA SON VISIBLES (SIN ANIMACIÓN) ===
sections.forEach(section => {
    section.classList.add('visible');
});

// === MODAL PARA FOOTER ===
const modal = document.getElementById('footer-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

function openModal(title, content) {
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = content;
    if (modal) modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

const footerLinks = {
    'footer-que-es': {
        title: 'Nuestra historia',
        content: '<p>Huellas Vivas nace en 2024 como un archivo digital de memoria histórica y derechos humanos en Colombia. Recopilamos documentos, testimonios y fotografías para que ninguna víctima sea olvidada.</p>'
    },
    'footer-equipo': {
        title: 'Nuestro equipo',
        content: '<p>Somos un equipo interdisciplinario de historiadores, comunicadores, diseñadores y activistas comprometidos con la memoria y la verdad.</p>'
    },
    'footer-colaborar': {
        title: 'Cómo colaborar',
        content: '<p>Puedes colaborar donando documentos, testimonios o recursos económicos. Escríbenos a contacto@huellasvivas.org para más información.</p>'
    },
    'footer-contacto': {
        title: 'Contacto',
        content: '<p>Email: contacto@huellasvivas.org<br>Bogotá, Colombia<br>Tel: +57 1 234 5678</p>'
    }
};

for (const [id, data] of Object.entries(footerLinks)) {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(data.title, data.content);
        });
    }
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        applySectionColors();
        updateNavbarColor();
        if (!isArchivoPage) {
            restoreVisibleSectionColor();
        }
    }, 100);
});