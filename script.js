// APARICIÓN LOGO

window.addEventListener("load", () => {

    const logo = document.querySelector(".logo-interactivo");

    setTimeout(() => {

        logo.style.transition = "all 1s ease";
        logo.style.opacity = "1";
        logo.style.transform = "translateY(0)";

    }, 500);

});

// LOGO - EFECTO DE MOVIMIENTO DEL MOUSE

const letras = document.querySelectorAll('.fila img');

letras.forEach(letra => {

    letra.addEventListener('mousemove', (e) => {

        // Solo permitir movimiento de mouse si no están explotadas por scroll
        if (window.scrollY < 50) { // Un pequeño umbral de scroll

            const rect = letra.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centroX = rect.width / 2;
            const centroY = rect.height / 2;

            const moverX = (x - centroX) * 0.15;
            const moverY = (y - centroY) * 0.15;

            letra.style.transform =
                `translate(${moverX}px, ${moverY}px)
                scale(1.2) rotate(${moverX * 0.5}deg)`;
        }

    });

    letra.addEventListener('mouseleave', () => {

        // Solo restablecer si no están explotadas por scroll
        if (window.scrollY < 50) {
            letra.style.transform =
                'translate(0px, 0px)';
        }

    });

});

//LOGO EFECTO 3D EXPLOSIVO AL SCROLL

const logo = document.querySelector(".logo-interactivo");
const letrasScroll = document.querySelectorAll('.fila img'); 

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    const maxScroll = 400; 
    let progress = Math.max(0, scrollY / maxScroll); 

    const maxDistancia = 1500; 
    const maxEscala = 8; 
    const maxDesvanecimiento = 1.0; 

    letrasScroll.forEach((letra, i) => {
        const angle = (i / letrasScroll.length) * Math.PI * 2;

        const currentDistance = progress * maxDistancia;
        const currentScale = 1 + (progress * maxEscala);
        const currentOpacity = 1 - (progress * maxDesvanecimiento);

        letra.style.transform = `translate(${Math.cos(angle) * currentDistance}px, ${Math.sin(angle) * currentDistance}px) scale(${currentScale})`;
        letra.style.opacity = Math.max(0, currentOpacity); 

        // NUEVO: Apagar la interacción del mouse si el usuario ya empezó a hacer scroll
        if (progress > 0.05) {
            letra.style.pointerEvents = "none"; // El mouse atraviesa las letras invisibles
        } else {
            letra.style.pointerEvents = "auto"; // Vuelven a ser interactivas al estar arriba
        }
    });
});

// SUBTÍTULO INTERACTIVO

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

// FORMAS ANIMADAS

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

        forma.style.transform =
            `translate(${moverX}px, ${moverY}px)
            scale(1.2) rotate(${moverX * 0.5}deg)`;


    });

    forma.addEventListener('mouseleave', () => {

        forma.style.transform =
            'translate(0px, 0px)';

    });

});

// PARALLAX

const parallax = document.querySelector(".parallax");

window.addEventListener("scroll", () => {

    let desplazamiento = window.pageYOffset;

    parallax.style.backgroundPositionY =
        desplazamiento * 0.5 + "px";

});


// GALERÍA 

const imagenes = document.querySelectorAll(".grid img");
const lightbox = document.getElementById("lightbox");

const imagenAmpliada =
    document.getElementById("imagen-ampliada");

const cerrar =
    document.querySelector(".cerrar");


imagenes.forEach(imagen => {

    imagen.addEventListener("click", () => {

        lightbox.style.display = "flex";
        imagenAmpliada.src = imagen.src;

    });

});


cerrar.addEventListener("click", () => {

    lightbox.style.display = "none";

});


lightbox.addEventListener("click", (e) => {

    if(e.target === lightbox){

        lightbox.style.display = "none";

    }

});