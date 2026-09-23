const GalleryImmich = {
    currentIndex: 0,
    container: null,
    photoTimer: null,
    assets: [],
    mediaElement: null,
    preloadElement: null, // Elemento invisible para precargar la siguiente foto
    retryCount: 0,
    maxRetries: 5,

    async init() {
        console.log("==> [IMMICH] Inicializando galería de Immich...");
        this.container = document.getElementById('bg-container');
        if (!this.container) {
            console.error("==> [IMMICH] No se encontró #bg-container en el DOM");
            return;
        }

        // Crear contenedor de precarga invisible si no existe
        if (!this.preloadElement) {
            this.preloadElement = document.createElement('img');
            this.preloadElement.style.display = 'none';
            document.body.appendChild(this.preloadElement);
        }

        const loaded = await this.loadAssets();
        if (!loaded || this.assets.length === 0) {
            console.error("==> [IMMICH] ERROR: No se pudieron cargar elementos de Immich. Reintentando en 10s...");
            this.showError();
            this.scheduleRetry();
            return;
        }

        this.retryCount = 0; // Resetear contador si tuvo éxito
        console.log(`==> [IMMICH] Iniciando carrusel con ${this.assets.length} elementos.`);
        this.updateBackground();

        if (this.assets.length > 1) {
            const tiempo = (typeof CONFIG !== 'undefined' && CONFIG.tiempos) ? CONFIG.tiempos.foto : 20000;
            if (this.photoTimer) clearInterval(this.photoTimer);
            this.photoTimer = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.assets.length;
                console.log(`==> [IMMICH] Avanzando al siguiente índice: ${this.currentIndex}`);
                this.updateBackground();
                this.preloadNext(); // Precargar la siguiente en segundo plano
            }, tiempo);
        }
    },

    async loadAssets() {
        console.log("==> [IMMICH] Solicitando catálogo a /api/immich/photos ...");
        try {
            const response = await fetch(`/api/immich/photos?_=${Date.now()}`, { method: "GET", cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);

            const data = await response.json();
            let rawAssets = Array.isArray(data) ? data : (data && Array.isArray(data.assets) ? data.assets : []);

            this.assets = rawAssets.filter(asset => asset && (asset.type === 'IMAGE' || asset.type === 'VIDEO') && asset.id);
            return this.assets.length > 0;
        } catch (error) {
            console.error("==> [IMMICH] EXCEPCIÓN: " + error.message);
            return false;
        }
    },

    scheduleRetry() {
        if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            console.log(`==> [IMMICH] Reintentando conexión (Intento ${this.retryCount}/${this.maxRetries}) en 10 segundos...`);
            setTimeout(() => {
                this.init();
            }, 10000);
        } else {
            console.error("==> [IMMICH] Máximo de reintentos alcanzados. Esperando ciclo largo...");
            setTimeout(() => {
                this.retryCount = 0;
                this.init();
            }, 60000); // Reintentar cada minuto si persiste el fallo total
        }
    },

    showError() {
        if (!this.container) return;
        this.container.innerHTML = '';
        const errorElement = document.createElement('div');
        errorElement.style.cssText = 'position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); color:white; font-family:sans-serif; text-align:center; padding:30px; background:rgba(0,0,0,0.85); border-radius:15px; z-index:10;';
        errorElement.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 15px;">⚠️</div>
            <div style="font-size: 22px; margin-bottom: 10px;">Reconectando con Immich...</div>
            <div style="font-size: 14px; opacity: 0.8;">Reintentando automáticamente en unos segundos.</div>
        `;
        this.container.appendChild(errorElement);
    },

    preloadNext() {
        if (this.assets.length <= 1) return;
        const nextIndex = (this.currentIndex + 1) % this.assets.length;
        const nextAsset = this.assets[nextIndex];
        if (nextAsset && nextAsset.type === 'IMAGE') {
            this.preloadElement.src = `/api/immich/thumbnail/${encodeURIComponent(nextAsset.id)}`;
        }
    },

    updateBackground() {
        if (this.assets.length === 0) return;
        const asset = this.assets[this.currentIndex];
        if (!asset) return;

        const isVideo = asset.type === 'VIDEO';
        const mediaUrl = `/api/immich/thumbnail/${encodeURIComponent(asset.id)}`;

        console.log(`==> [IMMICH] RENDERIZANDO [${this.currentIndex + 1}/${this.assets.length}] ID: ${asset.id}`);

        if (!this.mediaElement || (isVideo && this.mediaElement.tagName !== 'VIDEO') || (!isVideo && this.mediaElement.tagName !== 'IMG')) {
            while (this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }

            if (isVideo) {
                this.mediaElement = document.createElement('video');
                Object.assign(this.mediaElement, { autoplay: true, muted: true, playsInline: true });
                this.mediaElement.onended = () => { 
                    if(this.assets.length > 1) {
                        this.currentIndex = (this.currentIndex + 1) % this.assets.length;
                        this.updateBackground();
                        this.preloadNext();
                    }
                };
            } else {
                this.mediaElement = document.createElement('img');
                this.mediaElement.onerror = () => {
                    console.error(`==> [IMMICH] ERROR CARGANDO THUMBNAIL: ${mediaUrl}`);
                };
            }
            this.mediaElement.id = 'bg-main';
            this.container.appendChild(this.mediaElement);
        }

        // Asignación directa: Como la imagen ya se precargó en segundo plano con preloadNext(), el navegador la sirve instantáneamente de su caché local sin parpadeo negro.
        this.mediaElement.src = mediaUrl;
        if (isVideo) {
            this.mediaElement.load();
        }

        const countEl = document.getElementById('gallery-count');
        const nameEl = document.getElementById('file-name');

        if (countEl) countEl.innerText = `${this.currentIndex + 1} / ${this.assets.length}`;
        if (nameEl) {
            let cleanName = (asset.originalFileName || "Asset").split('.')[0].replace(/_/g, ' ').replace(/-/g, ' ');
            nameEl.innerText = cleanName.trim().toUpperCase();
        }
    }
};