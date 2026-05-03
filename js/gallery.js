const Gallery = {
    currentIndex: 0,
    container: null,
    photoTimer: null,

    async init() {
        console.log("Gallery: Inicializando OSD y Fondo...");
        this.container = document.getElementById('bg-container');
        if (!this.container) return;

        // 1. Cargar lista de archivos
        if (typeof LISTADO_GALERIA !== 'undefined' && LISTADO_GALERIA.length > 0) {
            CONFIG.files = LISTADO_GALERIA.filter(f => f.includes('.') && !f.includes('*'));
            CONFIG.files.sort(() => Math.random() - 0.5); // Mezcla aleatoria
        } else {
            console.error("Gallery: LISTADO_GALERIA no encontrada.");
            return;
        }

        // 2. Iniciar procesos
        this.updateIP();
        this.updateBackground();
    },

    async updateIP() {
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const data = await res.json();
            const ipEl = document.getElementById('ip-address');
            if (ipEl) ipEl.innerText = data.ip;
        } catch (e) {
            console.log("Error obteniendo IP, modo local activo.");
        }
    },

    updateBackground() {
        if (this.photoTimer) clearTimeout(this.photoTimer);
        if (!CONFIG.files || !CONFIG.files.length) return;

        const currentFile = CONFIG.files[this.currentIndex];
        const path = (CONFIG.rutaFotos || "./fotos/") + currentFile;
        const isVideo = currentFile.toLowerCase().endsWith('.mp4');
        
        // Limpiar y crear elemento
        this.container.innerHTML = ''; 
        let mediaElement = isVideo ? document.createElement('video') : document.createElement('img');
        
        mediaElement.id = 'bg-main'; // Aplicamos tu ID de CSS
        mediaElement.src = path;

        if (isVideo) {
            Object.assign(mediaElement, { autoplay: true, muted: true, playsInline: true });
            mediaElement.onended = () => this.advanceIndexAndLoad();
        } else {
            mediaElement.onload = () => {
                const tiempo = (typeof CONFIG !== 'undefined' && CONFIG.tiempos) ? CONFIG.tiempos.foto : 15000;
                this.photoTimer = setTimeout(() => this.advanceIndexAndLoad(), tiempo);
            };
        }
        
        this.container.appendChild(mediaElement);

        // ACTUALIZAR RECUADRO DE INFO (OSD)
        const countEl = document.getElementById('gallery-count');
        const nameEl = document.getElementById('file-name');

        if (countEl) {
            countEl.innerText = `${this.currentIndex + 1} / ${CONFIG.files.length}`;
        }
        if (nameEl) {
            // Limpiamos el nombre: quitamos extensión, guiones y "foto"
            let cleanName = currentFile.split('.')[0]
                                      .replace(/_/g, ' ')
                                      .replace(/-/g, ' ')
                                      .replace('foto', '');
            nameEl.innerText = cleanName.trim().toUpperCase();
        }
    },

    advanceIndexAndLoad() {
        this.currentIndex = (this.currentIndex + 1) % CONFIG.files.length;
        this.updateBackground();
    }
};