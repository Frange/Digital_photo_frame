// 1. DEFINICIÓN DEL LOGGER CON PERSISTENCIA LOCAL STORAGE Y SALIDA A TERMINAL
const ErrorLogger = {
    logs: JSON.parse(localStorage.getItem('dashboard_errors')) || [],
    
    add(type, message, details = "") {
        const now = new Date();
        const timestamp = now.toLocaleString('es-ES');
        const logEntry = `[${timestamp}] [${type.toUpperCase()}] ${message} ${details}`;
        
        this.logs.push(logEntry);
        if (this.logs.length > 100) this.logs.shift();
        
        localStorage.setItem('dashboard_errors', JSON.stringify(this.logs));
        
        // ESTO REBOTARÁ DIRECTAMENTE AL ARCHIVO /home/pi/dashboard_navegador.log GRACIAS AL NUEVO BASH
        console.error(`DASHBOARD_ERROR_TRAP -> ${logEntry}`);
    },

    downloadLog() {
        if (this.logs.length === 0) {
            alert("No hay errores registrados en el LocalStorage.");
            return;
        }
        const now = new Date();
        const filename = `error_${now.toISOString().slice(0,10)}_${now.getHours()}-${now.getMinutes()}.txt`;
        const blob = new Blob([this.logs.join('\n')], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    },
    
    clear() {
        this.logs = [];
        localStorage.removeItem('dashboard_errors');
        console.log("Historial de errores limpio.");
    }
};

// --- CAPTURADORES DE ERRORES GLOBALES ---
window.onerror = function(message, source, lineno, colno, error) {
    ErrorLogger.add("JS_CRITICAL_ERROR", message, `en ${source}:${lineno}:${colno}`);
    return false;
};

window.addEventListener('unhandledrejection', function(event) {
    ErrorLogger.add("PROMISE_REJECTED", event.reason ? (event.reason.message || event.reason) : "Error de red/asíncrono indeterminado");
});

// 2. CONTENIDO PRINCIPAL
const MainContent = {
    currentIdx: 0,
    datosCabanillas: null,
    nextFunnyTime: 0,
    nextCharacterTime: 0,
    activeTimeout: null,
    funnyQueue: [],
    
    // Lista por defecto (se sobreescribe automáticamente con galeria.js si existe)
    fotos: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
    
    // Almacén para el sistema de reparto equitativo
    sacoFotos: [],

    init() {
        console.log("%c MainContent: Iniciando de forma segura... ", "background: #222; color: #bada55; font-weight: bold;");
        
        // Si galeria.js ha cargado LISTADO_GALERIA, lo usamos en lugar del array estático
        if (typeof LISTADO_GALERIA !== 'undefined' && Array.isArray(LISTADO_GALERIA) && LISTADO_GALERIA.length > 0) {
            this.fotos = LISTADO_GALERIA;
            console.log(`| GALERÍA | Cargado LISTADO_GALERIA automático con ${this.fotos.length} fotos.`);
        }

        // Inicializamos el saco de fotos mezclado al arrancar
        this.llenarYBarajarSaco();

        try {
            if (typeof WeatherEffects !== 'undefined') {
                WeatherEffects.init('weather-canvas');
            }
        } catch (e) {
            ErrorLogger.add("CRITICAL_CANVAS", "Fallo al iniciar efectos visuales", e.message);
        }

        try {
            if (typeof Gallery !== 'undefined') Gallery.init();
        } catch(e) {
            ErrorLogger.add("GALLERY_ERROR", "Fallo en Gallery", e.message);
        }

        // Ejecuciones iniciales seguras
        this.safeExecute(() => this.updateBackground(), "Fondo inicial");
        this.safeExecute(() => this.updateClock(), "Reloj inicial");
        this.safeExecute(() => this.updateAllData(), "Clima inicial");

        // Intervalos de tiempo protegidos
        // setInterval(() => this.safeExecute(() => this.updateBackground(), "Bucle fondo"), (typeof CONFIG !== 'undefined' && CONFIG.tiempos && CONFIG.tiempos.foto) || 20000);
        setInterval(() => this.safeExecute(() => this.updateClock(), "Bucle reloj"), 1000);
        setInterval(() => this.safeExecute(() => this.updateAllData(), "Bucle clima"), (typeof CONFIG !== 'undefined' && CONFIG.tiempos && CONFIG.tiempos.climaAPI) || 900000);
        
        this.scheduleNextFunny();
        this.scheduleNextCharacter(); 
    },

    // Garantiza que todas las fotos se muestren una vez antes de repetir cualquier otra
    llenarYBarajarSaco() {
        if (this.fotos.length === 0) return;
        
        this.sacoFotos = [...this.fotos];
        
        // Algoritmo Fisher-Yates
        for (let i = this.sacoFotos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.sacoFotos[i], this.sacoFotos[j]] = [this.sacoFotos[j], this.sacoFotos[i]];
        }
        console.log(`| SISTEMA EQUITATIVO | Saco generado y barajado con ${this.sacoFotos.length} fotos.`);
    },

    safeExecute(fn, contextName) {
        try {
            fn();
        } catch (e) {
            ErrorLogger.add("EXECUTION_BLOCK", `Fallo en: ${contextName}`, e.message);
        }
    },

    updateBackground() {
        /*
        const bgData = document.getElementById('bg-main') || document.getElementById('bg-data');
        if (!bgData) {
            ErrorLogger.add("DOM_ERROR", "No se encontró el elemento contenedor del fondo.");
            return;
        }
        if (this.fotos.length === 0) return;

        if (this.sacoFotos.length === 0) {
            this.llenarYBarajarSaco();
        }

        const foto = this.sacoFotos.pop();
        const rutaBase = (typeof CONFIG !== 'undefined' && CONFIG.rutaFotos) ? CONFIG.rutaFotos : './fotos/';
        const imgUrl = `${rutaBase}${foto}`;

        const imgPreload = new Image();
        imgPreload.src = imgUrl;
        imgPreload.onload = () => {
            bgData.style.opacity = '0';
            setTimeout(() => {
                if (bgData.tagName.toLowerCase() === 'img') {
                    bgData.src = imgUrl;
                } else {
                    bgData.style.backgroundImage = `url('${imgUrl}')`;
                }
                bgData.style.opacity = '1';
            }, 500);
        };
        imgPreload.onerror = () => {
            ErrorLogger.add("FILE_NOT_FOUND", `No se pudo precargar la foto: ${imgUrl}`);
        };
        */
       return ;
    },
    
    updateClock() {
        const d = new Date();
        const H = d.getHours();
        const M = d.getMinutes();
        const S = d.getSeconds();
        const HM = H * 100 + M;

        const timeEl = document.getElementById('time');
        const dateEl = document.getElementById('date');
        
        if (timeEl) timeEl.innerText = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        if (dateEl) dateEl.innerText = d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

        if (typeof CONFIG === 'undefined' || !CONFIG.announcerSettings || !CONFIG.announcerSettings.active) return;

        if (CONFIG.announcerSettings.demoMode) {
            if (S % 15 === 0) {
                console.log("| ANNOUNCER | Salto Modo Demo");
                this.show('characters');
            }
            return; 
        }

        if (M === 59 && S === 50) {
            const pHora = (H + 1) % 24;
            this.show('characters', `Van a ser las ${pHora}:00`);
        }

        const foodInt = CONFIG.announcerSettings.frecuencias.foodInterval || 10;
        if (((HM >= 1330 && HM <= 1430) || (HM >= 2020 && HM <= 2120)) && M % foodInt === 0 && S === 0 && M !== 0) {
            if (typeof FRASES_ANNOUNCER !== 'undefined' && FRASES_ANNOUNCER.comida) {
                const fraseC = FRASES_ANNOUNCER.comida[Math.floor(Math.random() * FRASES_ANNOUNCER.comida.length)];
                this.show('characters', fraseC);
            }
        }

        const nightInt = CONFIG.announcerSettings.frecuencias.nightInterval || 30;
        if (HM >= 2200 && HM <= 2300 && M % nightInt === 0 && S === 0 && M !== 0) {
            if (typeof FRASES_ANNOUNCER !== 'undefined' && FRASES_ANNOUNCER.noche) {
                const fraseN = FRASES_ANNOUNCER.noche[Math.floor(Math.random() * FRASES_ANNOUNCER.noche.length)];
                this.show('characters', fraseN);
            }
        }

        if (Date.now() >= this.nextCharacterTime && this.nextCharacterTime !== 0) {
            if (!(M === 59 && S >= 50) && !(M === 0 && S <= 10)) {
                this.show('characters');
                this.scheduleNextCharacter();
            }
        }
    },

    show(type, manualMessage = "") {
        try {
            if (typeof FRASES_ANNOUNCER === 'undefined') {
                throw new Error("FRASES_ANNOUNCER no está cargado.");
            }
            console.log(`| ANNOUNCER | Mostrando: ${type}`);
            const filtros = CONFIG.announcerSettings.filtros;
            let seriesDisponibles = [];
            
            if (filtros.isAll) {
                seriesDisponibles = Object.keys(FRASES_ANNOUNCER).filter(s => 
                    !['personajes', 'clima', 'horarios', 'comida', 'noche'].includes(s)
                );
            } else {
                if (filtros.isSimpsons) seriesDisponibles.push('simpsons');
                if (filtros.isFuturama) seriesDisponibles.push('futurama');
                if (filtros.isSouthPark) seriesDisponibles.push('southpark');
                if (filtros.isDisney) seriesDisponibles.push('disney');
                if (filtros.isWally) seriesDisponibles.push('wally');
                if (filtros.isMrBean) seriesDisponibles.push('mrbean');
                if (filtros.isOtros) seriesDisponibles.push('otros');
            }

            if (seriesDisponibles.length === 0) return;
            const serieElegida = seriesDisponibles[Math.floor(Math.random() * seriesDisponibles.length)];

            const categorias = Object.keys(FRASES_ANNOUNCER[serieElegida]).filter(c => 
                !['fotos', 'clima', 'horarios', 'genericos'].includes(c)
            );
            const personajeAleatorio = categorias.length > 0 
                ? categorias[Math.floor(Math.random() * categorias.length)] 
                : 'genericos';

            let mensajeFinal = manualMessage;
            if (!mensajeFinal) {
                const bolsaFrases = [
                    ...(FRASES_ANNOUNCER[serieElegida][personajeAleatorio] || []),
                    ...(FRASES_ANNOUNCER[serieElegida].genericos || [])
                ];
                if (this.datosCabanillas) {
                    bolsaFrases.push(...(FRASES_ANNOUNCER[serieElegida].clima || []));
                }
                mensajeFinal = bolsaFrases[Math.floor(Math.random() * bolsaFrases.length)] || "...";
            }

            let prefijo;
            if (personajeAleatorio === 'genericos') {
                const mapaPrefijos = {
                    simpsons: 's', futurama: 'f', southpark: 's',
                    wally: 'w', mrbean: 'b', otros: 'o', disney: 'bugs' 
                };
                prefijo = mapaPrefijos[serieElegida] || 's';
            } else {
                prefijo = personajeAleatorio;
            }

            const mapaFotos = FRASES_ANNOUNCER[serieElegida].fotos || { default: 1 };
            const max = mapaFotos[prefijo] || mapaFotos.default || 1;
            const numFoto = Math.floor(Math.random() * max) + 1;
            const rutaImagen = `./announcers/characters/${serieElegida}/${prefijo}${numFoto}.png`;

            const img = document.getElementById('announcer-img');
            const txt = document.getElementById('announcer-text');
            const el = document.getElementById('hourly-announcer');
            const bubble = el ? el.querySelector('.bubble') : null;

            if (!img || !txt || !el) return;

            txt.innerText = mensajeFinal;
            img.src = rutaImagen;

            img.onload = () => {
                if(bubble) bubble.style.display = 'block';
                el.classList.add('announcer-visible');
            };

            img.onerror = () => {
                ErrorLogger.add("FILE_NOT_FOUND", `Imagen ausente: ${rutaImagen}`);
                const rutaBackup = `./announcers/characters/${serieElegida}/${prefijo}1.png`;
                if (img.src !== rutaBackup) {
                    img.src = rutaBackup;
                } else {
                    ErrorLogger.add("CRITICAL_IMAGE", `Tampoco se localiza la imagen backup: ${rutaBackup}`);
                    MainContent.hide();
                }
            };

            const duracion = (CONFIG.announcerSettings.durations[type] || 10) * 1000;
            if (this.activeTimeout) clearTimeout(this.activeTimeout);
            this.activeTimeout = setTimeout(() => this.hide(), duracion);
        } catch(err) {
            ErrorLogger.add("RENDER_SHOW_ERROR", "Fallo crítico en función show", err.message);
        }
    },

    hide() {
        const el = document.getElementById('hourly-announcer');
        if (el) el.classList.remove('announcer-visible');
        
        // Vaciamos la imagen para liberar espacio en memoria RAM
        const img = document.getElementById('announcer-img');
        if (img) img.src = "";
        
        this.activeTimeout = null;
    },

    scheduleNextFunny() {
        if (typeof CONFIG === 'undefined' || !CONFIG.announcerSettings) return;
        const freq = CONFIG.announcerSettings.frecuencias;
        const min = (freq.funnyMin || 5) * 60 * 1000;
        const max = (freq.funnyMax || 15) * 60 * 1000;
        this.nextFunnyTime = Date.now() + (Math.floor(Math.random() * (max - min + 1)) + min);
    },

    scheduleNextCharacter() {
        if (typeof CONFIG === 'undefined' || !CONFIG.announcerSettings) return;
        const freq = CONFIG.announcerSettings.frecuencias;
        const min = (freq.charactersMin || 1) * 60 * 1000;
        const max = (freq.charactersMax || 10) * 60 * 1000;
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        this.nextCharacterTime = Date.now() + delay;
        console.log(`| ANNOUNCER | Próximo personaje en ${Math.round(delay/60000)} min.`);
    },

    async updateAllData() {
        if (typeof WeatherService === 'undefined') {
            ErrorLogger.add("SERVICE_MISSING", "Falta el script weather.js");
            return;
        }
        const data = await WeatherService.getWeatherData();
        if (data) { 
            this.datosCabanillas = data; 
            this.renderAll(); 
        }
    },

    renderAll() {
        const data = this.datosCabanillas;
        if (!data) return;
        
        const tempEl = document.getElementById('temp-big');
        const statusEl = document.getElementById('weather-status');
        const iconEl = document.getElementById('main-icon');
        const container = document.getElementById('hourly-container');

        if (tempEl && data.current && data.current.temp !== undefined) tempEl.innerText = data.current.temp + "ºC";
        if (statusEl && data.current && data.current.status) statusEl.innerText = data.current.status.toUpperCase();
        
        if (iconEl && data.current && data.current.icon) {
            iconEl.innerHTML = (data.current.code === 1000) ? `<span style="color: #ffcc00;">${data.current.icon}</span>` : data.current.icon;
        }
        
        if (container && data.hourly) {
            container.innerHTML = data.hourly.map(h => {
                const hora = h.time || "--:--";
                const temperatura = h.temp !== undefined ? h.temp : "--";
                const icono = h.icon || "";
                return `
                <div class="h-item">
                    <div class="h-text-group">
                        <span class="h-time">${hora}</span>
                        <span class="h-temp">${temperatura}º</span>
                    </div>
                    <span class="h-icon">${icono}</span>
                </div>`;
            }).join('');
        }
    },

    updateTextBubble(txt) {
        const el = document.getElementById('announcer-text');
        if (el) el.innerText = txt;
    }
};

// 3. DISPARADOR UNIFICADO
document.addEventListener('DOMContentLoaded', () => {
    MainContent.init();
});