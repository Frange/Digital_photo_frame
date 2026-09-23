const GalleryImmich = {
    currentIndex: 0,
    container: null,
    photoTimer: null,
    assets: [],

    async init() {
        console.log("==> [IMMICH] Inicializando galería de Immich...");
        this.container = document.getElementById('bg-container');
        if (!this.container) {
            console.error("==> [IMMICH] No se encontró #bg-container en el DOM");
            return;
        }

        const loaded = await this.loadAssets();
        if (!loaded || this.assets.length === 0) {
            console.error("==> [IMMICH] ERROR: No se pudieron cargar elementos de Immich.");
            this.showError();
            return;
        }

        console.log(`==> [IMMICH] Iniciando carrusel con ${this.assets.length} elementos.`);
        this.updateBackground();

        // CONDICIÓN ANTI-PARPADEO: Si solo hay 1 foto, no programamos intervalos
        if (this.assets.length > 1) {
            const tiempo = (typeof CONFIG !== 'undefined' && CONFIG.tiempos) ? CONFIG.tiempos.foto : 20000;
            if (this.photoTimer) clearInterval(this.photoTimer);
            this.photoTimer = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.assets.length;
                console.log(`==> [IMMICH] Avanzando al siguiente índice: ${this.currentIndex}`);
                this.updateBackground();
            }, tiempo);
        } else {
            console.log("==> [IMMICH] Solo hay 1 elemento. Manteniendo imagen estática sin parpadeos.");
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

    showError() {
        if (!this.container) return;
        this.container.innerHTML = '';
        const errorElement = document.createElement('div');
        errorElement.style.cssText = 'position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); color:white; font-family:sans-serif; text-align:center; padding:30px; background:rgba(0,0,0,0.85); border-radius:15px;';
        errorElement.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 15px;">⚠️</div>
            <div style="font-size: 22px; margin-bottom: 10px;">Sin contenido en Immich</div>
            <div style="font-size: 14px; opacity: 0.8;">Comprueba la conexión con el servidor.</div>
        `;
        this.container.appendChild(errorElement);
    },

    updateBackground() {
        if (this.assets.length === 0) return;
        const asset = this.assets[this.currentIndex];
        if (!asset) return;

        const isVideo = asset.type === 'VIDEO';
        const mediaUrl = `/api/immich/thumbnail/${encodeURIComponent(asset.id)}?t=${Date.now()}`;

        console.log(`==> [IMMICH] RENDERIZANDO [${this.currentIndex + 1}/${this.assets.length}] ID: ${asset.id}`);

        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }

        let mediaElement;
        if (isVideo) {
            mediaElement = document.createElement('video');
            mediaElement.id = 'bg-main';
            Object.assign(mediaElement, { autoplay: true, muted: true, playsInline: true });
            mediaElement.src = mediaUrl;
            mediaElement.onended = () => { 
                if(this.assets.length > 1) {
                    this.currentIndex = (this.currentIndex + 1) % this.assets.length;
                    this.updateBackground();
                }
            };
        } else {
            mediaElement = document.createElement('img');
            mediaElement.id = 'bg-main';
            mediaElement.onerror = () => {
                console.error(`==> [IMMICH] ERROR CARGANDO THUMBNAIL: ${mediaUrl}`);
            };
            mediaElement.src = mediaUrl;
        }

        this.container.appendChild(mediaElement);

        const countEl = document.getElementById('gallery-count');
        const nameEl = document.getElementById('file-name');

        if (countEl) countEl.innerText = `${this.currentIndex + 1} / ${this.assets.length}`;
        if (nameEl) {
            let cleanName = (asset.originalFileName || "Asset").split('.')[0].replace(/_/g, ' ').replace(/-/g, ' ');
            nameEl.innerText = cleanName.trim().toUpperCase();
        }
    }
};
