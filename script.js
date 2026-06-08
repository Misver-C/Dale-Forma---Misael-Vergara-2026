
// APARICIÓN LOGO

window.addEventListener("load", () => {

    const logo = document.querySelector(".logo-interactivo");

    setTimeout(() => {

        logo.style.transition = "all 1s ease";
        logo.style.opacity = "1";
        logo.style.transform = "translateY(0)";

    }, 500);

});

// LOGO

const letras = document.querySelectorAll('.fila img');

letras.forEach(letra => {

    letra.addEventListener('mousemove', (e) => {

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


    });

    letra.addEventListener('mouseleave', () => {

        letra.style.transform =
            'translate(0px, 0px)';

    });

});

//LOGO EFECTO 3D

const logo = document.querySelector(".logo-interactivo");

window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    const maxScroll = 1200;

    let progress = scrollY / maxScroll;

    let phase = Math.sin(progress * Math.PI);

    letras.forEach((letra, i) => {

        const angle = (i / letras.length) * Math.PI * 2;

        const distance = 200 * phase;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        const scale = 1 + (phase * 0.3);

        letra.style.transform =
            `translate(${x}px, ${y}px) scale(${scale})`;

        letra.style.opacity = 1 - (phase * 0.2);

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