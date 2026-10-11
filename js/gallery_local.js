const GalleryLocal = {
    currentIndex: 0,
    container: null,
    photoTimer: null,
    assets: [],

    init() {
        console.log("==> [MODO_LOCAL] >>> INICIALIZANDO GALLERY LOCAL (SD) V2 <<<");
        this.container = document.getElementById('bg-container');
        if (!this.container) {
            console.error("==> [MODO_LOCAL] FATAL: No se encontró #bg-container en el DOM");
            return;
        }

        let ruta = (typeof CONFIG !== 'undefined' && CONFIG.rutaFotos) ? CONFIG.rutaFotos : "./fotos/";
        if (!ruta.endsWith('/')) {
            ruta += '/';
        }

        // Extracción limpia y directa del listado global
        let files = [];
        if (typeof LISTADO_GALERIA !== 'undefined' && Array.isArray(LISTADO_GALERIA)) {
            files = LISTADO_GALERIA;
            console.log(`==> [MODO_LOCAL] ¡LISTADO DETECTADO! Total de fotos reales: ${files.length}`);
        } else {
            console.error("==> [MODO_LOCAL] ERROR CRÍTICO: LISTADO_GALERIA no está definido en global. Comprueba index.html.");
            files = ["foto1.jpg", "foto2.jpg", "foto3.jpg"];
        }

        this.assets = files.map((file) => {
            const cleanFile = String(file).replace(/^\.\/fotos\//, '').replace(/^fotos\//, '').trim();
            return {
                id: cleanFile,
                type: 'IMAGE',
                originalFileName: cleanFile,
                url: `${ruta}${cleanFile}`
            };
        });

        console.log(`==> [MODO_LOCAL] Assets listos para reproducir: ${this.assets.length}`);

        if (this.assets.length > 0) {
            this.updateBackground();

            if (this.assets.length > 1) {
                const tiempo = (typeof CONFIG !== 'undefined' && CONFIG.tiempos && CONFIG.tiempos.foto) ? CONFIG.tiempos.foto : 20000;
                if (this.photoTimer) clearInterval(this.photoTimer);
                this.photoTimer = setInterval(() => {
                    this.currentIndex = (this.currentIndex + 1) % this.assets.length;
                    console.log(`==> [MODO_LOCAL] Avanzando al índice: ${this.currentIndex + 1}/${this.assets.length}`);
                    this.updateBackground();
                }, tiempo);
            }
        } else {
            console.error("==> [MODO_LOCAL] ERROR: La lista de assets locales está vacía.");
        }
    },

    updateBackground() {
        if (this.assets.length === 0) return;
        const asset = this.assets[this.currentIndex];
        const mediaUrl = asset.url;

        console.log(`==> [MODO_LOCAL] RENDERIZANDO [${this.currentIndex + 1}/${this.assets.length}] -> ${mediaUrl}`);

        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }

        const mediaElement = document.createElement('img');
        mediaElement.id = 'bg-main';
        mediaElement.style.width = '100%';
        mediaElement.style.height = '100%';
        mediaElement.style.objectFit = 'cover';
        mediaElement.style.position = 'absolute';
        mediaElement.style.top = '0';
        mediaElement.style.left = '0';

        mediaElement.onerror = () => {
            console.error(`==> [MODO_LOCAL] ERROR 404 / NO ENCONTRADA: ${mediaUrl}`);
        };
        
        mediaElement.src = mediaUrl;
        this.container.appendChild(mediaElement);

        const countEl = document.getElementById('gallery-count');
        const nameEl = document.getElementById('file-name');

        if (countEl) countEl.innerText = `${this.currentIndex + 1} / ${this.assets.length}`;
        if (nameEl) {
            let cleanName = asset.originalFileName.split('.')[0].replace(/_/g, ' ').replace(/-/g, ' ');
            nameEl.innerText = cleanName.trim().toUpperCase();
        }
    }
};