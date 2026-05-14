// -----------------------
// CONFIGURACIÓN CONTADORES (igual que antes)
// -----------------------
const timeDuration = 3; 
const timeDuration2 = 60; 
const timeDuration3 = 120;

let startNumber = 1;
const endNumber = 1378;

let startNumber2 = 1;
const endNumber2 = 60;

let startNumber3 = 1;
const endNumber3 = 4;

let intervalId, interval2Id, interval3Id;

// -----------------------
// CONFIGURACIÓN DE SECCIONES
// -----------------------
// Agrega aquí las secciones que quieres vigilar.
// Cada objeto:
//  - id: id del elemento que representa la sección (strip/container/box)
//  - imageId: id de la imagen a la que aplicar/quitar filtro
//  - contadorId: id del contenedor de contadores si quieres que al entrar arranque (opcional)
const sectionsConfig = [
  { id: "#sectionA", imageId: "#image13", contadorId: "#Contador" },
  { id: "#sectionB", imageId: "#image13" },
  { id: "#sectionC", imageId: "#image13" }
];

// -----------------------
// UTIL: detectar si un color es blanco (tolerancia)
// -----------------------
function isWhiteColor(colorString, tolerance = 10) {
    if (!colorString) return false;
    const s = colorString.replace(/\s/g, "").toLowerCase();

    // HEX (#fff or #ffffff)
    if (s[0] === "#") {
        let hex = s.slice(1);
        if (hex.length === 3) hex = hex.split("").map(h => h + h).join("");
        if (hex.length !== 6) return false;
        const r = parseInt(hex.substring(0,2), 16);
        const g = parseInt(hex.substring(2,4), 16);
        const b = parseInt(hex.substring(4,6), 16);
        return (255 - r <= tolerance) && (255 - g <= tolerance) && (255 - b <= tolerance);
    }

    // rgb(...) or rgba(...)
    const rgbMatch = s.match(/rgba?\((\d+),(\d+),(\d+)(?:,([\d.]+))?\)/);
    if (rgbMatch) {
        const r = Number(rgbMatch[1]), g = Number(rgbMatch[2]), b = Number(rgbMatch[3]);
        return (255 - r <= tolerance) && (255 - g <= tolerance) && (255 - b <= tolerance);
    }

    // nombres de color (poco probable), aceptamos 'white'
    if (s === "white") return true;

    return false;
}

// -----------------------
// APLICAR / QUITAR FILTRO A IMAGEN
// -----------------------
function applyDarker(imageId) {
    if (!imageId) return;
    try {
        $w(imageId).filters = [{ filterName: "Darker" }];
    } catch (e) {
        console.warn("No se pudo aplicar filtro a", imageId, e);
    }
}
function removeFilters(imageId) {
    if (!imageId) return;
    try {
        $w(imageId).filters = [];
    } catch (e) {
        console.warn("No se pudo quitar filtro de", imageId, e);
    }
}

// -----------------------
// INICIAR CONTADORES (solo si la sección lo requiere)
// -----------------------
function startCountersOnce() {
    // Contador 1
    if (!intervalId) { 
        intervalId = setInterval(() => {
            if (startNumber <= endNumber) {
                $w("#number1").text = startNumber.toLocaleString();
                startNumber += 1;
            } else {
                clearInterval(intervalId);
                intervalId = null;
            }
        }, timeDuration);
    }

    // Contador 2
    if (!interval2Id) { 
        interval2Id = setInterval(() => {
            if (startNumber2 <= endNumber2) {
                $w("#number2").text = startNumber2.toLocaleString();
                startNumber2 += 1;
            } else {
                clearInterval(interval2Id);
                interval2Id = null;
            }
        }, timeDuration2);
    }

    // Contador 3
    if (!interval3Id) { 
        interval3Id = setInterval(() => {
            if (startNumber3 <= endNumber3) {
                $w("#number3").text = startNumber3.toLocaleString();
                startNumber3 += 1;
            } else {
                clearInterval(interval3Id);
                interval3Id = null;
            }
        }, timeDuration3);
    }
}

// -----------------------
// LÓGICA PRINCIPAL: asociar onViewportEnter a cada sección
// -----------------------
$w.onReady(() => {
    // Opcional: si quieres un efecto de opacidad global por scroll para image13 (mantenido)
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const maxScroll = 300;
            let opacity = 1 - (scrollY / maxScroll) * 0.4;
            if (opacity < 0.6) opacity = 0.6;
            if (opacity > 1) opacity = 1;
            // si la imagen existe
            try { $w("#image13").style.opacity = opacity; } catch(e){}
        });
    }

    // Registrar eventos por sección
    sectionsConfig.forEach(cfg => {
        try {
            $w(cfg.id).onViewportEnter(() => {
                // obtener color de background desde .style si está disponible
                let bg = $w(cfg.id).style.backgroundColor;

                // Si no se recuperó, intentar fallback con computedStyle sobre el elemento DOM
                if (!bg || bg === "") {
                    try {
                        const domEl = document.getElementById(cfg.id.replace("#",""));
                        if (domEl) {
                            bg = window.getComputedStyle(domEl).backgroundColor;
                        }
                    } catch(e){}
                }

                // Si el fondo es blanco -> aplicar filtro, sino quitarlo
                if (isWhiteColor(bg, 12)) { // tolerancia 12 para capturar blancos cercanos
                    applyDarker(cfg.imageId);
                } else {
                    removeFilters(cfg.imageId);
                }

                // Si la sección tiene contadores asignados, iniciarlos (solo una vez)
                if (cfg.contadorId) {
                    startCountersOnce();
                }
            });

            // Opcionalmente puedes manejar cuando sale de la sección
            $w(cfg.id).onViewportLeave(() => {
                // aquí puedes decidir quitar el filtro al salir o mantenerlo según el siguiente fondo
                // por simplicidad no quitamos nada aquí (porque al entrar a la siguiente sección su handler se encargará)
                // pero dejamos un ejemplo de restauración:
                // removeFilters(cfg.imageId);
            });

        } catch (err) {
            console.warn("Error al registrar sección", cfg.id, err);
        }
    });
});
