const Gallery = {
    currentIndex: 0,

    init() {
        this.container = document.getElementById('bg-container');
        this.updateBackground();
        
        // Rotación según tu configuración
        setInterval(() => this.updateBackground(), CONFIG.tiempos.foto);
    },

    updateBackground() {
        if (!CONFIG.files || !CONFIG.files.length) return;
        
        const randomFile = CONFIG.files[this.currentIndex];
        const extension = randomFile.split('.').pop().toLowerCase();
        const path = CONFIG.rutaFotos + randomFile;
        
        this.container.innerHTML = '';

        let el = (extension === 'mp4') ? document.createElement('video') : document.createElement('img');
        
        if (extension === 'mp4') {
            el.autoplay = true; el.muted = true; el.loop = true; el.playsInline = true;
        }
        
        el.src = path;
        el.id = 'bg-main';
        this.container.appendChild(el);

        // --- ACTUALIZAR CAJA GALERÍA (ABAJO DERECHA) ---
        const countEl = document.getElementById('gallery-count');
        const nameEl = document.getElementById('file-name');
        
        if(countEl) countEl.innerText = `${this.currentIndex + 1} / ${CONFIG.files.length}`;
        if(nameEl) nameEl.innerText = randomFile;

        // Avanzar índice para la próxima vez
        this.currentIndex = (this.currentIndex + 1) % CONFIG.files.length;
    }
};