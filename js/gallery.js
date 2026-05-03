const Gallery = {
    currentIndex: 0,
    container: null,
    photoTimer: null,

    async init() {
        this.container = document.getElementById('bg-container');
        if (!this.container) return;

        if (typeof LISTADO_GALERIA !== 'undefined' && LISTADO_GALERIA.length > 0) {
            CONFIG.files = LISTADO_GALERIA.filter(f => f.includes('.') && !f.includes('*'));
            CONFIG.files.sort(() => Math.random() - 0.5);
            console.log("Gallery: Listado cargado.");
        } else {
            console.error("Gallery: LISTADO_GALERIA no encontrada.");
            return;
        }

        this.updateBackground();
    },

    updateBackground() {
        if (this.photoTimer) clearTimeout(this.photoTimer);
        if (!CONFIG.files || !CONFIG.files.length) return;

        const currentFile = CONFIG.files[this.currentIndex];
        const path = (CONFIG.rutaFotos || "./fotos/") + currentFile;
        const isVideo = currentFile.toLowerCase().endsWith('.mp4');
        
        this.container.innerHTML = ''; 

        let mediaElement = isVideo ? document.createElement('video') : document.createElement('img');
        mediaElement.src = path;
        mediaElement.id = 'bg-main';

        // --- ESTILOS BASE ---
        Object.assign(mediaElement.style, {
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: "black",
            opacity: "0", // Empezamos invisibles para el fade-in
            transition: "opacity 1s ease-in-out"
        });

        // --- LÓGICA DE AJUSTE SEGÚN ORIENTACIÓN ---
        if (isVideo) {
            mediaElement.style.objectFit = "contain"; // Los vídeos mejor enteros
            Object.assign(mediaElement, { autoplay: true, muted: true, playsInline: true });
            mediaElement.onended = () => this.advanceIndexAndLoad();
        } else {
            // Cuando la imagen carga, decidimos cómo ajustarla
            mediaElement.onload = () => {
                const esVertical = mediaElement.naturalHeight > mediaElement.naturalWidth;
                
                if (esVertical) {
                    mediaElement.style.objectFit = "contain"; // Vertical: Ver entera
                } else {
                    mediaElement.style.objectFit = "cover";   // Horizontal: Llenar pantalla
                }
                mediaElement.style.opacity = "1"; // Mostrar cuando esté lista
            };

            // RE-ACTIVAR TEMPORIZADOR (Esto faltaba)
            const tiempo = CONFIG.tiempos?.foto || 15000;
            this.photoTimer = setTimeout(() => this.advanceIndexAndLoad(), tiempo);
        }
        
        this.container.appendChild(mediaElement);

        // OSD
        const countEl = document.getElementById('gallery-count');
        const nameEl = document.getElementById('file-name');
        if (countEl) countEl.innerText = `${this.currentIndex + 1} / ${CONFIG.files.length}`;
        if (nameEl) {
            nameEl.innerText = currentFile.split('.')[0].replace(/_/g, ' ').replace('foto ', '').toUpperCase();
        }
    },

    advanceIndexAndLoad() {
        this.currentIndex = (this.currentIndex + 1) % CONFIG.files.length;
        this.updateBackground();
    }
};