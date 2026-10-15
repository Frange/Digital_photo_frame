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
    },

    initHardwareEvents() {
        if (this.sseConnection) return;

        console.log("==> [HARDWARE] Conectando al canal de eventos físicos (/api/events)...");
        this.sseConnection = new EventSource('/api/events');

        // Escuchar evento de botón Anterior
        this.sseConnection.addEventListener('btn_prev', (e) => {
            console.log("==> [HARDWARE] Evento físico recibido: ANTERIOR");
            this.handlePrevious();
        });

        // Escuchar evento de botón Siguiente
        this.sseConnection.addEventListener('btn_next', (e) => {
            console.log("==> [HARDWARE] Evento físico recibido: SIGUIENTE");
            this.handleNext();
        });

        // Escuchar cambio de modo físico (IMMICH / LOCAL)
        this.sseConnection.addEventListener('mode_change', (e) => {
            const nuevoModo = e.data; // "LOCAL" o "IMMICH"
            console.log(`==> [HARDWARE] Cambio de interruptor físico detectado -> ${nuevoModo}`);
            
            const currentlyImmich = (typeof CONFIG !== 'undefined' && CONFIG.immich && CONFIG.immich.active === true);
            const targetIsImmich = (nuevoModo === 'IMMICH');

            // Si la posición física del interruptor no coincide con el estado actual, recargamos la web en el modo correcto
            if (currentlyImmich !== targetIsImmich) {
                console.log("==> [HARDWARE] Actualizando configuración y recargando para aplicar el nuevo modo...");
                window.CONFIG = window.CONFIG || {};
                window.CONFIG.immich = window.CONFIG.immich || {};
                window.CONFIG.immich.active = targetIsImmich;
                setTimeout(() => window.location.reload(), 300);
            }
        });

        this.sseConnection.onerror = (err) => {
            console.warn("==> [HARDWARE] Conexión SSE interrumpida. Reintentando en breve...", err);
        };
    },

    handlePrevious() {
        console.log("==> [HARDWARE] Evento físico recibido: ANTERIOR");
        // Si GalleryImmich está definido y activo (o comprobando el DOM/estado), mandamos la orden ahí
        if (typeof GalleryImmich !== 'undefined' && document.getElementById('bg-container')?.dataset.mode === 'immich') {
            GalleryImmich.prevPhoto();
        } else if (typeof GalleryImmich !== 'undefined' && window.location.href.includes('immich') || (typeof GalleryImmich !== 'undefined' && GalleryImmich.assets && GalleryImmich.assets.length > 0)) {
            // Comprobación directa si Immich tiene assets cargados
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