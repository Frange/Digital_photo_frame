const GalleryLocal = {
    currentIndex: 0,
    container: null,
    photoTimer: null,

    logToServer(text) {
        console.log(text);
        try {
            fetch('/?JS_LOG=' + encodeURIComponent(text)).catch(() => {});
        } catch (e) {}
    },

    async init() {
        this.logToServer("==> [DEBUGLOCAL] >>> INICIANDO GALLERY_LOCAL.JS (VERSIÓN BLINDADA) <<<");
        this.container = document.getElementById('bg-container');
        if (!this.container) {
            this.logToServer("==> [DEBUGLOCAL] FATAL: No existe #bg-container");
            return;
        }

        if (typeof LISTADO_GALERIA !== 'undefined' && Array.isArray(LISTADO_GALERIA)) {
            CONFIG.files = LISTADO_GALERIA.filter(f => f && typeof f === 'string' && f.includes('.') && !f.includes('*'));
            this.logToServer(`==> [DEBUGLOCAL] Archivos válidos cargados: ${CONFIG.files.length}`);

            // Mezcla aleatoria (Fisher-Yates)
            for (let i = CONFIG.files.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [CONFIG.files[i], CONFIG.files[j]] = [CONFIG.files[j], CONFIG.files[i]];
            }
        } else {
            this.logToServer("==> [DEBUGLOCAL] AVISO: LISTADO_GALERIA no disponible, usando respaldo.");
            CONFIG.files = ["foto1.jpg", "foto2.jpg", "foto3.jpg"];
        }

        if (!CONFIG.rutaFotos) {
            window.CONFIG = window.CONFIG || {};
            window.CONFIG.rutaFotos = "./fotos/";
        }

        this.updateIP();
        this.updateBackground();
    },

    async updateIP() {
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const data = await res.json();
            const ipEl = document.getElementById('ip-address');
            if (ipEl) ipEl.innerText = data.ip;
        } catch (e) {}
    },

    updateBackground() {
        if (this.photoTimer) clearTimeout(this.photoTimer);
        if (!CONFIG.files || !CONFIG.files.length) return;

        const currentFile = CONFIG.files[this.currentIndex];
        const ruta = CONFIG.rutaFotos || "./fotos/";
        const path = ruta + currentFile;
        const isVideo = currentFile.toLowerCase().endsWith('.mp4');
        
        this.logToServer(`==> [DEBUGLOCAL] 📊 RENDERIZANDO [${this.currentIndex + 1} / ${CONFIG.files.length}] -> "${currentFile}"`);

        const scheduleNext = () => {
            if (this._firedNext) return;
            this._firedNext = true;
            const tiempo = (CONFIG && CONFIG.tiempos && CONFIG.tiempos.foto) ? CONFIG.tiempos.foto : 20000;
            this.logToServer(`==> [DEBUGLOCAL] Temporizador programado: cambio de foto en ${tiempo / 1000}s`);
            this.photoTimer = setTimeout(() => this.advanceIndexAndLoad(), tiempo);
        };

        this._firedNext = false;

        // Delegamos el pintado seguro al renderizador unificado
        GalleryRenderer.render(this.container, path, isVideo, {
            onLoad: () => {
                this.logToServer(`==> [DEBUGLOCAL] [OK] Imagen cargada: ${currentFile}`);
                scheduleNext();
            },
            onEnded: () => this.advanceIndexAndLoad(),
            onError: () => {
                this.logToServer(`==> [DEBUGLOCAL] [ERROR] Falló al cargar: ${path}`);
                this.advanceIndexAndLoad();
            }
        });

        // Verificación de respaldo por caché instantánea
        const mediaEl = document.getElementById('bg-main');
        if (!isVideo && mediaEl && mediaEl.complete) {
            this.logToServer(`==> [DEBUGLOCAL] [CACHÉ] Imagen completada al instante: ${currentFile}`);
            scheduleNext();
        }

        const countEl = document.getElementById('gallery-count');
        const nameEl = document.getElementById('file-name');

        if (countEl) countEl.innerText = `${this.currentIndex + 1} / ${CONFIG.files.length}`;
        if (nameEl) {
            let cleanName = currentFile.split('.')[0].replace(/_/g, ' ').replace(/-/g, ' ').replace('foto', '');
            nameEl.innerText = cleanName.trim().toUpperCase();
        }
    },

    advanceIndexAndLoad() {
        this.currentIndex = (this.currentIndex + 1) % CONFIG.files.length;
        this.updateBackground();
    }
};