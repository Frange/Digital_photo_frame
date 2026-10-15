const Gallery = {
    sseConnection: null,

    async init() {
        console.log("==> [DISPATCHER] Consultando estado del hardware al servidor...");
        
        let targetIsImmich = false;
        try {
            const response = await fetch('/api/hardware/status');
            const data = await response.json();
            targetIsImmich = (data.mode === 'IMMICH');
        } catch (e) {
            console.warn("==> [DISPATCHER] No se pudo consultar el estado del hardware, usando Modo Local por defecto.");
        }

        if (targetIsImmich) {
            console.log("==> [DISPATCHER] Modo activo: IMMICH. Lanzando GalleryImmich.");
            if (typeof GalleryImmich !== 'undefined') {
                GalleryImmich.init();
            } else {
                console.error("==> [DISPATCHER] Error: GalleryImmich no está definido.");
            }
        } else {
            console.log("==> [DISPATCHER] Modo activo: LOCAL. Lanzando GalleryLocal.");
            if (typeof GalleryLocal !== 'undefined') {
                GalleryLocal.init();
            } else {
                console.error("==> [DISPATCHER] Error: GalleryLocal no está definido.");
            }
        }

        // Iniciamos el canal de escucha en tiempo real (SSE) para cambios en caliente
        this.initHardwareEvents();
        
        // Iniciamos el temporizador de Modo Noche
        this.initNightMode();
    },

    initNightMode() {
        if (typeof CONFIG === 'undefined' || !CONFIG.nightMode || !CONFIG.nightMode.enabled) return;

        const checkNight = () => {
            const now = new Date();
            const currentTime = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
            const { horaInicio, horaFin } = CONFIG.nightMode;

            let isNight = false;
            if (horaInicio > horaFin) {
                isNight = (currentTime >= horaInicio || currentTime < horaFin);
            } else {
                isNight = (currentTime >= horaInicio && currentTime < horaFin);
            }

            let overlay = document.getElementById('night-mode-overlay');
            if (isNight) {
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.id = 'night-mode-overlay';
                    overlay.style.position = 'fixed';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.width = '100vw';
                    overlay.style.height = '100vh';
                    overlay.style.background = 'black';
                    overlay.style.zIndex = '999999';
                    overlay.style.cursor = 'pointer';
                    overlay.title = 'Modo Noche Activo (Pulsa para despertar temporalmente)';
                    
                    overlay.onclick = () => {
                        overlay.style.display = 'none';
                        setTimeout(() => { overlay.style.display = 'block'; }, 5 * 60 * 1000); // Se reactiva a los 5 mins
                    };
                    document.body.appendChild(overlay);
                } else {
                    overlay.style.display = 'block';
                }
            } else {
                if (overlay) overlay.style.display = 'none';
            }
        };

        checkNight();
        setInterval(checkNight, 60000); // Comprueba cada minuto
    },

    initHardwareEvents() {
        if (this.sseConnection) return;

        console.log("==> [HARDWARE] Conectando al canal de eventos físicos (/api/events)...");
        this.sseConnection = new EventSource('/api/events');

        this.sseConnection.addEventListener('btn_prev', (e) => {
            console.log("==> [HARDWARE] Evento físico recibido: ANTERIOR");
            this.handlePrevious();
        });

        this.sseConnection.addEventListener('btn_next', (e) => {
            console.log("==> [HARDWARE] Evento físico recibido: SIGUIENTE");
            this.handleNext();
        });

        this.sseConnection.addEventListener('mode_change', (e) => {
            const nuevoModo = e.data; 
            console.log(`==> [HARDWARE] Cambio de interruptor físico detectado -> ${nuevoModo}`);
            setTimeout(() => window.location.reload(), 300);
        });

        this.sseConnection.onerror = (err) => {
            console.warn("==> [HARDWARE] Conexión SSE interrumpida. Reintentando en breve...", err);
        };
    },

    handlePrevious() {
        console.log("==> [HARDWARE] Evento físico recibido: ANTERIOR");
        if (typeof GalleryImmich !== 'undefined' && GalleryImmich.assets && GalleryImmich.assets.length > 0) {
            GalleryImmich.prevPhoto();
        } else if (typeof GalleryLocal !== 'undefined' && typeof GalleryLocal.prevPhoto === 'function') {
            GalleryLocal.prevPhoto();
        }
    },

    handleNext() {
        console.log("==> [HARDWARE] Evento físico recibido: SIGUIENTE");
        if (typeof GalleryImmich !== 'undefined' && GalleryImmich.assets && GalleryImmich.assets.length > 0) {
            GalleryImmich.nextPhoto();
        } else if (typeof GalleryLocal !== 'undefined' && typeof GalleryLocal.nextPhoto === 'function') {
            GalleryLocal.nextPhoto();
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    Gallery.init();
});