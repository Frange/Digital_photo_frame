const GalleryImmich = {
    currentIndex: 0,
    container: null,
    photoTimer: null,
    assets: [],

    async init() {
        console.log(`\n==> [IMMICH] Inicializando galería de Immich...`);
        this.container = document.getElementById('bg-container');
        if (!this.container) return;

        let loaded = false;
        let attempts = 0;
        
        while (!loaded && attempts < 30) {
            attempts++;
            loaded = await this.loadAssets();
            if (!loaded) {
                this.showLoadingMessage(`Sincronizando álbum de Immich... (${attempts}/30)`);
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        }

        if (!loaded || this.assets.length === 0) {
            this.showError();
            return;
        }

        this.updateBackground();
        this.startTimer();
    },

    startTimer() {
        if (this.assets.length > 1) {
            const tiempo = (typeof CONFIG !== 'undefined' && CONFIG.tiempos) ? CONFIG.tiempos.foto : 20000;
            if (this.photoTimer) clearInterval(this.photoTimer);
            this.photoTimer = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.assets.length;
                console.log(`\n==> [IMMICH] Avanzando al siguiente índice: ${this.currentIndex}`);
                this.updateBackground();
            }, tiempo);
        }
    },

    async loadAssets() {
        try {
            const response = await fetch(`/api/immich/photos?_=${Date.now()}`, { method: "GET", cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
            const data = await response.json();
            let rawAssets = Array.isArray(data) ? data : (data && Array.isArray(data.assets) ? data.assets : []);
            this.assets = rawAssets.filter(asset => asset && (asset.type === 'IMAGE' || asset.type === 'VIDEO') && asset.id);
            return this.assets.length > 0;
        } catch (error) {
            return false;
        }
    },

    showLoadingMessage(text) {
        if (!this.container) return;
        this.container.innerHTML = '';
        this.container.innerHTML = `<div style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); color:white; font-family:sans-serif; text-align:center; padding:30px; background:rgba(0,0,0,0.85); border-radius:15px;"><div style="font-size: 32px; margin-bottom: 15px;">⏳</div><div style="font-size: 22px; margin-bottom: 10px;">Cargando Marco</div><div style="font-size: 14px; opacity: 0.8;">${text}</div></div>`;
    },

    showError() {
        if (!this.container) return;
        this.container.innerHTML = '';
        this.container.innerHTML = `<div style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); color:white; font-family:sans-serif; text-align:center; padding:30px; background:rgba(0,0,0,0.85); border-radius:15px;"><div style="font-size: 32px; margin-bottom: 15px;">⚠️</div><div style="font-size: 22px; margin-bottom: 10px;">Sin contenido en Immich</div></div>`;
    },

    updateBackground() {
        if (this.assets.length === 0) return;
        const asset = this.assets[this.currentIndex];
        if (!asset) return;

        const isVideo = asset.type === 'VIDEO';
        const mediaUrl = `/api/immich/thumbnail/${encodeURIComponent(asset.id)}?t=${Date.now()}`;

        GalleryRenderer.render(this.container, mediaUrl, isVideo, {
            onEnded: () => {
                if(this.assets.length > 1) {
                    this.currentIndex = (this.currentIndex + 1) % this.assets.length;
                    this.updateBackground();
                }
            },
            onError: () => {
                console.error(`\n==> [IMMICH] ERROR CARGANDO RECURSO: ${mediaUrl}`);
            }
        });

        const countEl = document.getElementById('gallery-count');
        const nameEl = document.getElementById('file-name');

        if (countEl) countEl.innerText = `${this.currentIndex + 1} / ${this.assets.length}`;
        if (nameEl) {
            let cleanName = (asset.originalFileName || "Asset").split('.')[0].replace(/_/g, ' ').replace(/-/g, ' ');
            nameEl.innerText = cleanName.trim().toUpperCase();
        }
    },

    nextPhoto() {
        console.log("\n==> [IMMICH] Botón físico Siguiente pulsado.\n");
        if (this.photoTimer) clearInterval(this.photoTimer);
        this.currentIndex = (this.currentIndex + 1) % this.assets.length;
        this.updateBackground();
        this.startTimer();
    },

    prevPhoto() {
        console.log("\n==> [IMMICH] Botón físico Anterior pulsado.\n");
        if (this.photoTimer) clearInterval(this.photoTimer);
        this.currentIndex = (this.currentIndex - 1 + this.assets.length) % this.assets.length;
        this.updateBackground();
        this.startTimer();
    }
};