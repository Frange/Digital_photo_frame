const Gallery = {
    currentIndex: 0,
    container: null,
    photoTimer: null,
    immichAssets: [],

    async init() {
        console.log("Gallery 2.0: Inicializando...");
        this.container = document.getElementById('bg-container');
        if (!this.container) return;

        // Comprobamos la propiedad active dentro de CONFIG.immich
        const isImmichActive = (typeof CONFIG !== 'undefined' && CONFIG.immich && CONFIG.immich.active);

        if (isImmichActive) {
            console.log("| GALERÍA | Modo Immich Activado.");
            await this.loadImmichAssets();
        } else {
            console.log("| GALERÍA | Modo Local (SD) Activado.");
            this.loadLocalAssets();
        }

        this.updateIP();
        this.updateBackground();
    },

    loadLocalAssets() {
        if (typeof LISTADO_GALERIA !== 'undefined' && LISTADO_GALERIA.length > 0) {
            CONFIG.files = LISTADO_GALERIA.filter(f => f.includes('.') && !f.includes('*'));
            // Mezcla aleatoria local (Fisher-Yates)
            for (let i = CONFIG.files.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [CONFIG.files[i], CONFIG.files[j]] = [CONFIG.files[j], CONFIG.files[i]];
            }
        }
    },

    async loadImmichAssets() {
        try {
            console.log("| IMMICH | Conectando con el servidor...");
            
            const endpoint = CONFIG.immich.albumId 
                ? `${CONFIG.immich.baseUrl}/api/albums/${CONFIG.immich.albumId}`
                : `${CONFIG.immich.baseUrl}/api/assets`;

            const res = await fetch(endpoint, {
                headers: {
                    'x-api-key': CONFIG.immich.apiKey,
                    'Accept': 'application/json'
                }
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            const rawAssets = CONFIG.immich.albumId ? data.assets : data;

            // Filtramos únicamente imágenes y vídeos
            this.immichAssets = rawAssets.filter(item => item.type === 'IMAGE' || item.type === 'VIDEO');

            // Mezcla aleatoria (Fisher-Yates)
            for (let i = this.immichAssets.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.immichAssets[i], this.immichAssets[j]] = [this.immichAssets[j], this.immichAssets[i]];
            }

            console.log(`| IMMICH | Cargadas ${this.immichAssets.length} fotos/vídeos con éxito.`);
        } catch (e) {
            console.error("| IMMICH | Error al conectar. Volviendo al modo local de emergencia:", e);
            this.loadLocalAssets();
        }
    },

    async updateIP() {
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const data = await res.json();
            const ipEl = document.getElementById('ip-address');
            if (ipEl) ipEl.innerText = data.ip;
        } catch (e) {
            console.log("Error obteniendo IP, modo offline.");
        }
    },

    updateBackground() {
        if (this.photoTimer) clearTimeout(this.photoTimer);

        let mediaUrl = "";
        let isVideo = false;
        let displayName = "";
        let totalTotal = 0;

        const useImmich = (CONFIG && CONFIG.immich && CONFIG.immich.active && this.immichAssets.length > 0);

        // 1. Modo Immich
        if (useImmich) {
            const asset = this.immichAssets[this.currentIndex];
            isVideo = asset.type === 'VIDEO';
            totalTotal = this.immichAssets.length;

            if (isVideo) {
                mediaUrl = `${CONFIG.immich.baseUrl}/api/assets/${asset.id}/video/playback?x-api-key=${CONFIG.immich.apiKey}`;
            } else {
                mediaUrl = `${CONFIG.immich.baseUrl}/api/assets/${asset.id}/thumbnail?size=PREVIEW&x-api-key=${CONFIG.immich.apiKey}`;
            }
            displayName = asset.originalFileName || "Immich";
        } 
        // 2. Modo Local (SD)
        else if (CONFIG.files && CONFIG.files.length > 0) {
            const currentFile = CONFIG.files[this.currentIndex];
            mediaUrl = (CONFIG.rutaFotos || "./fotos/") + currentFile;
            isVideo = currentFile.toLowerCase().endsWith('.mp4');
            displayName = currentFile;
            totalTotal = CONFIG.files.length;
        } else {
            return;
        }

        // Limpiar y renderizar
        this.container.innerHTML = ''; 
        let mediaElement = isVideo ? document.createElement('video') : document.createElement('img');
        mediaElement.id = 'bg-main';
        
        if (isVideo) {
            Object.assign(mediaElement, { autoplay: true, muted: true, playsInline: true });
            mediaElement.src = mediaUrl;
            mediaElement.onended = () => this.advanceIndexAndLoad();
            mediaElement.onerror = () => {
                console.error(`Error cargando vídeo: ${mediaUrl}`);
                this.advanceIndexAndLoad();
            };
        } else {
            mediaElement.onload = () => {
                const tiempo = (typeof CONFIG !== 'undefined' && CONFIG.tiempos) ? CONFIG.tiempos.foto : 20000;
                this.photoTimer = setTimeout(() => this.advanceIndexAndLoad(), tiempo);
            };
            mediaElement.onerror = () => {
                console.error(`Error cargando imagen: ${mediaUrl}`);
                this.advanceIndexAndLoad();
            };
            mediaElement.src = mediaUrl;
        }
        
        this.container.appendChild(mediaElement);

        // Actualizar datos de pantalla
        const countEl = document.getElementById('gallery-count');
        const nameEl = document.getElementById('file-name');

        if (countEl) countEl.innerText = `${this.currentIndex + 1} / ${totalTotal}`;
        if (nameEl) {
            let cleanName = displayName.split('.')[0]
                                       .replace(/_/g, ' ')
                                       .replace(/-/g, ' ')
                                       .replace('foto', '');
            nameEl.innerText = cleanName.trim().toUpperCase();
        }
    },

    advanceIndexAndLoad() {
        const useImmich = (CONFIG && CONFIG.immich && CONFIG.immich.active && this.immichAssets.length > 0);
        const total = useImmich ? this.immichAssets.length : (CONFIG.files ? CONFIG.files.length : 0);

        if (total > 0) {
            this.currentIndex = (this.currentIndex + 1) % total;
            
            // Al completar una vuelta completa a la galería en Immich, re-pide la lista por si se han subido fotos nuevas
            if (this.currentIndex === 0 && useImmich) {
                this.loadImmichAssets().then(() => this.updateBackground());
                return;
            }
        }
        this.updateBackground();
    }
};