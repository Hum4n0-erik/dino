/**
 * ============================================
 *           JUEGO DEL DINOSAURIO
 * ============================================
 * Versión corregida - Fondo amarillo fijo
 * Problema resuelto: Fondo blanco al inicio
 */

// ===== CONFIGURACIÓN INICIAL ===== //
const imagen = document.getElementById("Dino");
let posX = 500;
let posY = 500;
let mirandoDerecha = true;

// Configuración inicial del dinosaurio
if (!imagen) {
    console.error("ERROR: No se encontró el elemento con ID 'Dino'");
} else {
    imagen.style.position = "absolute";
    imagen.style.left = posX + "px";
    imagen.style.top = posY + "px";
    imagen.style.width = "75px";
    imagen.src = "./img/dino.png"; // Ruta corregida
    
    imagen.onerror = function() {
        console.error("Fallo al cargar:", this.src);
    };
}

// ===== CRONÓMETRO Y FONDOS ===== //
let startTime;
let cronometroInterval;
let tiempoTranscurrido = 0;

// Crear cronómetro
const tiempoDisplay = document.createElement("div");
tiempoDisplay.id = "tiempoDisplay";
tiempoDisplay.style.position = "absolute";
tiempoDisplay.style.top = "20px";
tiempoDisplay.style.left = "20px";
tiempoDisplay.style.fontFamily = "Arial";
tiempoDisplay.style.fontSize = "24px";
tiempoDisplay.style.color = "#333";
tiempoDisplay.style.textShadow = "1px 1px 2px rgba(255,255,255,0.7)";
document.body.appendChild(tiempoDisplay);

// ===== SOLUCIÓN DEFINITIVA AL FONDO BLANCO ===== //
document.body.style.backgroundColor = "#FFD700"; // Amarillo dorado
document.body.style.transition = "background-color 1s ease"; // Solo afecta al fondo

// ===== SISTEMA DE MISILES ===== //
const misiles = [];
let intervaloGeneracionMisiles;
let intervaloMovimientoMisiles;
let velocidadMisilBase = 3;
let velocidadMisilActual = velocidadMisilBase;
const radioAtaque = 300;
const alturaDesaparicion = 550;

// ===== FUNCIONES DEL JUEGO ===== //
function imagen2(urlImg) {
    imagen.src = urlImg;
    console.log('PUTA');
}

let imgMisil = './img/objetos/MP.png';

let tmpImg = './img/objetos/martillo.png';
function milImg(urlNueva) {
    tmpImg.src = urlNueva;
    console.log('PUTO');
}
function actualizarJuego() {
    imgMisil.src = tmpImg;

    if (tiempoTranscurrido < 120) {
        // Cambio a modo noche a los 20 segundos
        if (tiempoTranscurrido % 10 < 0.1) {
            document.body.style.backgroundColor = "#1A1A2E"; // Azul oscuro
            tiempoDisplay.style.color = "#FFF";
        }
        if (tiempoTranscurrido % 20 < 0.1) {
            document.body.style.backgroundColor = "#FFD700"; // Amarillo claro
            tiempoDisplay.style.color = "#000000";
        }
        if (tiempoTranscurrido >= 100 && tiempoTranscurrido < 100.1) {
            misil.style.backgroundColor = '#46c108';
        }
    }
    // Mantener modo día
    else if (tiempoTranscurrido < 10) {
        imagen.src = "./img/dino.png";
    }

    // Aumentar dificultad
    if (tiempoTranscurrido % 15 < 0.1) {
        velocidadMisilActual += 1;
    }

}
function crearMisil() {
    const misil = document.createElement('img');
    misil.style.position = 'absolute';
    misil.style.width = '40px';
    misil.style.height = '40px';
    misil.src = imgMisil;
    misil.style.borderRadius = '15px 15px 0 0';

    const offsetX = (Math.random() * radioAtaque * 2) - radioAtaque;
    let posXMisil = posX + offsetX;
    posXMisil = Math.max(30, Math.min(posXMisil, window.innerWidth - 30));

    misil.style.left = posXMisil + 'px';
    misil.style.top = '-50px';
    document.body.appendChild(misil);

    misiles.push({
        element: misil,
        x: posXMisil,
        y: -50,
        speed: velocidadMisilActual * (0.8 + Math.random() * 0.4)
    });
}

function moverMisiles() {
    for (let i = misiles.length - 1; i >= 0; i--) {
        const misil = misiles[i];
        misil.y += misil.speed;
        misil.element.style.top = misil.y + 'px';

        if (misil.y >= alturaDesaparicion) {
            misil.element.remove();
            misiles.splice(i, 1);
            continue;
        }

        if (detectarColision(misil)) {
            finDelJuego();
            return;
        }
    }
}

// ===== CONTROL DEL JUEGO ===== //
let numMisil = Math.floor(Math.random() * 5) + 1;
function iniciarJuego() {
    if (!startTime) {
        startTime = performance.now();
        cronometroInterval = setInterval(() => {
            tiempoTranscurrido = (performance.now() - startTime) / 1000;
            tiempoDisplay.textContent = `Tiempo: ${tiempoTranscurrido.toFixed(2)}s`;
            actualizarJuego();
        }, 10);
        for(let i = 0; i < numMisil; i++) {
            intervaloGeneracionMisiles = setInterval(crearMisil, 1500);
        }
        intervaloMovimientoMisiles = setInterval(moverMisiles, 16);
    }
}

function finDelJuego() {
    clearInterval(intervaloGeneracionMisiles);
    clearInterval(intervaloMovimientoMisiles);
    clearInterval(cronometroInterval);
    alert(`💥 ¡Game Over! 💥\nTiempo: ${tiempoTranscurrido.toFixed(2)}s`);
    location.reload();
}

// ===== EVENTOS ===== //
document.addEventListener('keydown', (event) => {
    const velocidad = 10;
    if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && !startTime) {
        iniciarJuego();
    }
    
    if (event.key === 'ArrowLeft' && posX > 30) {
        posX -= velocidad;
        if (mirandoDerecha) {
            imagen.style.transform = 'scaleX(-1)';
            mirandoDerecha = false;
        }
    }
    else if (event.key === 'ArrowRight' && posX < window.innerWidth - 80) {
        posX += velocidad;
        if (!mirandoDerecha) {
            imagen.style.transform = 'scaleX(1)';
            mirandoDerecha = true;
        }
    }

    imagen.style.left = posX + 'px';
});

// ===== COLISIONES ===== //

function detectarColision(misil) {
    const dinoRect = {
        left: posX,
        right: posX + imagen.offsetWidth,
        top: posY,
        bottom: posY + imagen.offsetHeight
    };

    const misilRect = {
        left: misil.x,
        right: misil.x + 30,
        top: misil.y,
        bottom: misil.y + 50
    };

    return !(
        misilRect.right < dinoRect.left ||
        misilRect.left > dinoRect.right ||
        misilRect.bottom < dinoRect.top ||
        misilRect.top > dinoRect.bottom
    );
}