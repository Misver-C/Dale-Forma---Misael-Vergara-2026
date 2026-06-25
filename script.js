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
// LOGO - EFECTO DE OCULTAMIENTO AL SCROLL
// ===================================================

const letrasScroll = document.querySelectorAll('.fila img'); 
const filasScroll = document.querySelectorAll('.fila');

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = 300; 
    let progress = Math.max(0, scrollY / maxScroll); 

    const boundedProgress = Math.min(progress, 1);

    // Activamos la máscara (overflow hidden) solo al bajar para no cortar el hover inicial
    if (scrollY > 10) {
        filasScroll.forEach(fila => fila.style.overflow = 'hidden');
    } else {
        filasScroll.forEach(fila => fila.style.overflow = 'visible');
    }

    letrasScroll.forEach((letra) => {
        // Se trasladan hacia abajo (110% asegura que salgan completamente)
        letra.style.transform = `translateY(${boundedProgress * 110}%)`;
        
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

// ===================================================
// APARICIÓN SUAVE EN SCROLL
// ===================================================

const contenedoresAparicion = document.querySelectorAll('.contenedor-aparicion-suave');

const observadorAparicion = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        // Observamos el contenedor. Si el contenedor entra 100% en pantalla, animamos a su hijo.
        if (entrada.isIntersecting) {
            const hijo = entrada.target.querySelector('.aparicion-suave');
            if (hijo) {
                hijo.classList.add('activa');
            }
        }
    });
}, {
    threshold: 1.0 
});

contenedoresAparicion.forEach(el => observadorAparicion.observe(el));

// ===================================================
// PIEZAS FLOTANTES EN EL HERO
// ===================================================

window.addEventListener("load", () => {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (!hero || !heroContent) return;

    // Crear contenedor
    const container = document.createElement('div');
    container.className = 'piezas-flotantes-container';
    hero.appendChild(container);

    const numPiezas = 8; // Exactamente 4 de cada lado
    const numLeft = 4;
    const piezasDisponibles = [
        'amar1.png', 'amar2.png', 'azul1.png', 'azul2.png', 
        'rojo1.png', 'rojo2.png', 'verde1.png', 'verde2.png'
    ];
    // Mezclar aleatoriamente el arreglo para que no se repitan las formas
    piezasDisponibles.sort(() => Math.random() - 0.5);

    const logo = document.querySelector('.logo-interactivo');
    const titulo = document.querySelector('.titulo-interactivo');
    
    if (!logo || !titulo) return;

    const padding = 5 * 16; // 5em en px
    const heroRect = hero.getBoundingClientRect();
    const logoRect = logo.getBoundingClientRect();
    const tituloRect = titulo.getBoundingClientRect();

    const piezasGeneradas = [];
    const cajasColision = []; // Para evitar que se sobrepongan entre ellas

    for (let i = 0; i < numPiezas; i++) {
        let x, y;
        let valid = false;
        let attempts = 0;
        
        // Tamaño aleatorio entre 7 y 8.5em
        const sizeEm = 7 + Math.random() * 1.5; 
        const sizePx = sizeEm * 16;
        const isLeft = i < numLeft;

        while (!valid && attempts < 200) {
            // Relajar restricciones progresivamente si no hay espacio
            let currentPadEdge = attempts > 50 ? 16 : padding;
            let currentPadCenter = attempts > 100 ? 16 : padding;
            let currentPadPiece = attempts > 150 ? 0 : 32; // Distancia entre piezas

            // Area restringida dinámica del logo y título
            const rLeft = Math.min(logoRect.left, tituloRect.left) - heroRect.left - currentPadCenter;
            const rRight = Math.max(logoRect.right, tituloRect.right) - heroRect.left + currentPadCenter;
            const rTop = Math.min(logoRect.top, tituloRect.top) - heroRect.top - currentPadCenter;
            const rBottom = Math.max(logoRect.bottom, tituloRect.bottom) - heroRect.top + currentPadCenter;

            // Distribuir a los lados
            let minX, maxX;
            if (isLeft) {
                minX = currentPadEdge;
                maxX = rLeft - sizePx;
                if (maxX < minX) maxX = heroRect.width - currentPadEdge - sizePx; // Fallback
            } else {
                minX = rRight;
                maxX = heroRect.width - currentPadEdge - sizePx;
                if (maxX < minX) minX = currentPadEdge; // Fallback
            }

            if (maxX < minX) x = minX;
            else x = minX + Math.random() * (maxX - minX);
            
            y = currentPadEdge + Math.random() * (heroRect.height - currentPadEdge * 2 - sizePx);

            // Validar si choca con el centro (logo/titulo)
            const overlapCenter = (x + sizePx > rLeft) && (x < rRight) && (y + sizePx > rTop) && (y < rBottom);

            // Validar colisiones con otras piezas ya generadas
            let overlapPiece = false;
            for (let box of cajasColision) {
                const intersectX = (x < box.x + box.size + currentPadPiece) && (x + sizePx + currentPadPiece > box.x);
                const intersectY = (y < box.y + box.size + currentPadPiece) && (y + sizePx + currentPadPiece > box.y);
                if (intersectX && intersectY) {
                    overlapPiece = true;
                    break;
                }
            }

            if (!overlapCenter && !overlapPiece) {
                valid = true;
            }
            attempts++;
        }

        if (valid) {
            cajasColision.push({x, y, size: sizePx});
            // Selecciona la pieza usando el índice para evitar repeticiones (hay 8 piezas y 8 iteraciones)
            const imgSrc = 'assets/piezas/' + piezasDisponibles[i];
            
            // Calculamos vector direccional desde el centro para animar al hacer scroll
            const cx = heroRect.width / 2;
            const cy = heroRect.height / 2;
            const dx = (x + sizePx/2) - cx;
            const dy = (y + sizePx/2) - cy;
            const dist = Math.sqrt(dx*dx + dy*dy) || 1;
            const dirX = dx / dist;
            const dirY = dy / dist;

            const scrollWrapper = document.createElement('div');
            scrollWrapper.className = 'pieza-scroll-wrapper';
            scrollWrapper.style.left = `${x}px`;
            scrollWrapper.style.top = `${y}px`;
            scrollWrapper.dataset.dirX = dirX;
            scrollWrapper.dataset.dirY = dirY;

            const floatWrapper = document.createElement('div');
            floatWrapper.className = 'pieza-float-wrapper';
            // Configurar animación flotante aleatoria individualizada (más lento y menos rango)
            floatWrapper.style.setProperty('--float-dur', `${6 + Math.random() * 6}s`);
            floatWrapper.style.setProperty('--fx1', `${(Math.random()-0.5)*15}px`);
            floatWrapper.style.setProperty('--fy1', `${(Math.random()-0.5)*15}px`);
            floatWrapper.style.setProperty('--fx2', `${(Math.random()-0.5)*15}px`);
            floatWrapper.style.setProperty('--fy2', `${(Math.random()-0.5)*15}px`);

            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = 'pieza-flotante';
            img.style.width = `${sizeEm}em`;
            
            // Rotación inicial aleatoria
            img.style.rotate = `${Math.random() * 360}deg`;

            // Hover interactions: Mismo efecto que el logo interactivo
            img.addEventListener('mousemove', (e) => {
                const rect = img.getBoundingClientRect();
                const cx = e.clientX - rect.left;
                const cy = e.clientY - rect.top;

                const centroX = rect.width / 2;
                const centroY = rect.height / 2;

                const moverX = (cx - centroX) * 0.15;
                const moverY = (cy - centroY) * 0.15;

                img.style.transform = `translate(${moverX}px, ${moverY}px) scale(1.2) rotate(${moverX * 0.5}deg)`;
            });

            img.addEventListener('mouseleave', () => {
                img.style.transform = 'translate(0px, 0px) scale(1) rotate(0deg)';
            });

            floatWrapper.appendChild(img);
            scrollWrapper.appendChild(floatWrapper);
            container.appendChild(scrollWrapper);
            piezasGeneradas.push(scrollWrapper);
        }
    }

    // ===================================================
    // PIEZAS FLOTANTES DE FONDO GLOBAL
    // ===================================================
    const bgPiezasContainer = document.getElementById('bg-piezas-flotantes');
    if (bgPiezasContainer) {
        // Barajar formas otra vez
        const bgFormas = [...piezasDisponibles];
        bgFormas.sort(() => Math.random() - 0.5);

        for (let i = 0; i < 15; i++) {
            const fallWrapper = document.createElement('div');
            fallWrapper.className = 'pieza-bg-fall';
            fallWrapper.style.left = `${Math.random() * 95}vw`;
            fallWrapper.style.setProperty('--fall-dur', `${30 + Math.random() * 40}s`);
            fallWrapper.style.setProperty('--fall-delay', `-${Math.random() * 50}s`);

            const img = document.createElement('img');
            img.src = 'assets/piezas/' + bgFormas[i % bgFormas.length];
            img.className = 'pieza-bg-float';
            
            const size = 3 + Math.random() * 4;
            img.style.width = `${size}em`;
            
            img.style.setProperty('--float-dur', `${4 + Math.random() * 5}s`);
            img.style.setProperty('--fx', `${(Math.random() - 0.5) * 40}px`);
            img.style.setProperty('--fy', `${(Math.random() - 0.5) * 40}px`);
            
            const rotEnd = Math.random() > 0.5 ? '360deg' : '-360deg';
            img.style.setProperty('--rot-dur', `${20 + Math.random() * 20}s`);
            img.style.setProperty('--rot-end', rotEnd);

            fallWrapper.appendChild(img);
            bgPiezasContainer.appendChild(fallWrapper);
        }
    }

    const bgBlur = document.getElementById('bg-blur');
    const introBgGif = document.querySelector('.intro-bg-gif');
    const introSection = document.getElementById('intro');
    const construyeSection = document.getElementById('construye');

    // DOM Morphing Navbar
    const navWrapper = document.getElementById('nav-wrapper');
    const navMorfosis = document.getElementById('nav-morfosis');
    const navBtns = document.querySelectorAll('.nav-btn');

    // Variable para controlar los frames de animación y evitar lag en scroll
    let isTicking = false;

    // Scroll listener optimizado para mover las piezas, blur y navbar dinámica
    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const moveAmount = scrollY * 1.5; // Multiplicador de velocidad de expansión
                
                piezasGeneradas.forEach(wrapper => {
                    const dirX = parseFloat(wrapper.dataset.dirX);
                    const dirY = parseFloat(wrapper.dataset.dirY);
                    wrapper.style.setProperty('--scroll-dx', `${dirX * moveAmount}px`);
                    wrapper.style.setProperty('--scroll-dy', `${dirY * moveAmount}px`);
                    // Desaparecer suavemente
                    wrapper.style.opacity = Math.max(0, 1 - (scrollY / 300));
                });

                // Efecto Blur sobre el background general y fade del hero-content
                if (hero) {
                    const heroHeight = hero.offsetHeight;
                    // Opacidad de blur y fade adaptado a la nueva altura reducida (140vh)
                    let scrollProgress = scrollY / (heroHeight * 0.4);
                    scrollProgress = Math.min(Math.max(scrollProgress, 0), 1);
                    
                    if (bgBlur) {
                        bgBlur.style.opacity = scrollProgress;
                    }

                    if (heroContent) {
                        heroContent.style.opacity = 1 - scrollProgress;
                    }
                }

                // Efecto Fade del GIF de la intro según cercanía
                if (introSection && introBgGif) {
                    const rect = introSection.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const introCenter = rect.top + rect.height / 2;
                    const screenCenter = windowHeight / 2;
                    const dist = Math.abs(introCenter - screenCenter);
                    
                    // Aparecer progresivamente (máx 0.5 de opacidad como estaba en CSS)
                    let gifOpacity = 1 - (dist / windowHeight);
                    gifOpacity = Math.max(0, Math.min(gifOpacity, 1)) * 0.5; 
                    introBgGif.style.opacity = gifOpacity;
                }

                // Aparecer fondo global de piezas a partir de la siguiente sección
                if (bgPiezasContainer && construyeSection) {
                    const constRect = construyeSection.getBoundingClientRect();
                    // A medida que 'construye' entra en pantalla, el fondo global de piezas aparece
                    if (constRect.top < window.innerHeight) {
                        let progress = (window.innerHeight - constRect.top) / 400;
                        bgPiezasContainer.style.opacity = Math.min(Math.max(progress, 0), 1);
                    } else {
                        bgPiezasContainer.style.opacity = 0;
                    }
                }

                // ==========================================
                // LÓGICA MORPHING NAVBAR & SCROLL SPY
                // ==========================================
                if (navWrapper && navMorfosis) {
                    const wrapperRect = navWrapper.getBoundingClientRect();
                    
                    // Transformar a barra fija cuando el wrapper ancla toca el techo
                    if (wrapperRect.top <= 20) {
                        navMorfosis.classList.add('is-fixed');
                    } else {
                        navMorfosis.classList.remove('is-fixed');
                    }

                    // Scroll Spy (determinar qué sección está en pantalla)
                    const seccionesSpy = ['intro', 'construye', 'junta', 'seccion-amarilla']; 
                    let seccionActivaId = 'intro'; // Por defecto la primera

                    seccionesSpy.forEach(id => {
                        const sec = document.getElementById(id);
                        if (sec) {
                            const rect = sec.getBoundingClientRect();
                            // Si el centro de la pantalla está dentro de los límites de la sección
                            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                                seccionActivaId = id;
                            }
                        }
                    });

                    // Aplicar clase 'activo' al botón correspondiente
                    navBtns.forEach(btn => {
                        if (btn.dataset.target === seccionActivaId) {
                            btn.classList.add('activo');
                        } else {
                            btn.classList.remove('activo');
                        }
                    });
                }
                
                // Permitir el próximo cálculo
                isTicking = false;
            });
            isTicking = true;
        }
    });
});
