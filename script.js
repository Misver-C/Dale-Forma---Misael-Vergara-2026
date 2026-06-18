// ===================================================
// ORQUESTRACIÓN: LÍNEA DE TIEMPO DE INTRO Y HERO
// ===================================================

window.addEventListener("load", () => {
    const intro = document.getElementById("pantalla-intro");
    const logo = document.querySelector(".logo-interactivo");
    const enlacesSubt = document.querySelectorAll('.subt');
    
    // Función encargada de revelar el contenido del Hero de forma coordinada
    function activarEntrada() {
        if (logo) {
            logo.style.transition = "all 1s cubic-bezier(0.25, 1, 0.5, 1)";
            logo.style.opacity = "1";
            logo.style.transform = "translateY(0)";
        }
        
        if (enlacesSubt.length > 0) {
            enlacesSubt.forEach((enlace, index) => {
                setTimeout(() => {
                    enlace.classList.add('aparecer');
                }, 300 + (index * 250)); // Entrada escalonada para cada palabra del subtítulo
            });
        }
    }

    if (intro) {
        // 1. Bloqueamos el scroll mientras dure la presentación de las piezas fijas
        document.body.classList.add("bloquear-scroll");

        // 2. Disparamos el efecto de apertura radial (encogimiento de la máscara)
        setTimeout(() => {
            intro.classList.add("transicion-activa");
            
            // Iniciamos la animación del Hero en paralelo a la apertura del círculo
            activarEntrada();
        }, 700); // 1800ms permite que termine la última imagen (0.7s + 0.6s) y se estabilice

        // 3. Limpieza del DOM y habilitación de la interfaz
        setTimeout(() => {
            document.body.classList.remove("bloquear-scroll");
            intro.remove(); // Remueve el nodo para evitar bloqueos en eventos del puntero
        }, 1900); // Sincronizado con el fin de la transición del clip-path (1800ms + 1200ms)
        
    } else {
        // Mecanismo de contingencia si el elemento no existe en el HTML
        activarEntrada();
    }
});

// ANIMACIÖN LOGO Y SUBTÍTULO

window.addEventListener("load", () => {
    const intro = document.getElementById("intro");
    const logo = document.querySelector(".logo-interactivo");
    const enlacesSubt = document.querySelectorAll('.subt');
    
    function activarEntrada() {
        if (logo) {
            logo.style.transition = "all 1s ease";
            logo.style.opacity = "1";
            logo.style.transform = "translateY(0)";
        }
        
        if (enlacesSubt.length > 0) {
            enlacesSubt.forEach((enlace, index) => {
                setTimeout(() => {
                    enlace.classList.add('aparecer');
                }, 300 + (index * 250));
            });
        }
    }

    if (intro) {
        document.body.classList.add("bloquear-scroll");

        setTimeout(() => {
            intro.classList.add("oculto");
            document.body.classList.remove("bloquear-scroll");

            setTimeout(() => {
                activarEntrada();
            }, 1000);

        }, 3000);
    } else {
        activarEntrada();
    }
});

// LOGO - EFECTO DE MOVIMIENTO DEL MOUSE

const letras = document.querySelectorAll('.fila img');

letras.forEach(letra => {
    letra.addEventListener('mousemove', (e) => {
        if (window.scrollY < 50) {
            const rect = letra.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centroX = rect.width / 2;
            const centroY = rect.height / 2;

            const moverX = (x - centroX) * 0.15;
            const moverY = (y - centroY) * 0.15;

            letra.style.transform = `translate(${moverX}px, ${moverY}px) scale(1.2) rotate(${moverX * 0.5}deg)`;
        }
    });

    letra.addEventListener('mouseleave', () => {
        if (window.scrollY < 50) {
            letra.style.transform = 'translate(0px, 0px)';
        }
    });
});

// ===================================================
// LOGO - EFECTO 3D EXPLOSIVO AL SCROLL (OPTIMIZADO)
// ===================================================

const letrasScroll = document.querySelectorAll('.fila img'); 

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = 300; // Reducimos de 400 a 300 para que la animación termine antes en el recorrido
    let progress = Math.max(0, scrollY / maxScroll); 

    const maxDistancia = 800; // Reducimos de 1500px a 800px para contener el radio de la explosión
    const maxEscala = 6;      // Reducimos ligeramente la escala máxima (de 8 a 6) para evitar jank visual
    const maxDesvanecimiento = 1.2; // Incrementamos a 1.2 para acelerar la desaparición (Fade Out)

    letrasScroll.forEach((letra, i) => {
        const angle = (i / letrasScroll.length) * Math.PI * 2;
        const currentDistance = progress * maxDistancia;
        const currentScale = 1 + (progress * maxEscala);
        
        // El desvanecimiento ocurre más rápido gracias al multiplicador maxDesvanecimiento
        const currentOpacity = 1 - (progress * maxDesvanecimiento);

        letra.style.transform = `translate(${Math.cos(angle) * currentDistance}px, ${Math.sin(angle) * currentDistance}px) scale(${currentScale})`;
        letra.style.opacity = Math.max(0, currentOpacity); 

        // Gestión de la interactividad del puntero
        if (progress > 0.05) {
            letra.style.pointerEvents = "none";
        } else {
            letra.style.pointerEvents = "auto";
        }
    });
});

// SUBTÍTULO INTERACTIVO (SMOOTH SCROLL)

const links = document.querySelectorAll(".subt");

links.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// FORMAS ANIMADAS (INTERACCIÓN INDIVIDUAL)

const formas = document.querySelectorAll('.forma');

formas.forEach(forma => {
    forma.addEventListener('mousemove', (e) => {
        const rect = forma.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centroX = rect.width / 2;
        const centroY = rect.height / 2;

        const moverX = (x - centroX) * 0.15;
        const moverY = (y - centroY) * 0.15;

        forma.style.transform = `translate(${moverX}px, ${moverY}px) scale(1.2) rotate(${moverX * 0.5}deg)`;
    });

    forma.addEventListener('mouseleave', () => {
        forma.style.transform = 'translate(0px, 0px)';
    });
});
