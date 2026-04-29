const Gallery = {
    init() {
        this.container = document.getElementById('bg-container');
        this.renderRandomBackground();
        
        // Rotación automática cada 10s (según CONFIG)
        setInterval(() => this.renderRandomBackground(), CONFIG.tiempos.foto);
    },

    renderRandomBackground() {
        if (!CONFIG.files.length) return;
        
        const randomFile = CONFIG.files[Math.floor(Math.random() * CONFIG.files.length)];
        const extension = randomFile.split('.').pop().toLowerCase();
        const path = CONFIG.rutaFotos + randomFile;
        
        this.container.innerHTML = '';

        let el;
        if (extension === 'mp4') {
            el = document.createElement('video');
            el.src = path;
            el.autoplay = true;
            el.muted = true;
            el.loop = true;
            el.playsInline = true;
        } else {
            el = document.createElement('img');
            el.src = path;
        }

        el.id = 'bg-main';
        // Forzamos el estilo para asegurar el aspect ratio
        el.style.width = "auto";
        el.style.height = "auto";
        el.style.maxWidth = "100%";
        el.style.maxHeight = "100%";
        el.style.objectFit = "contain"; 
        
        this.container.appendChild(el);
    }
};