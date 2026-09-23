const GalleryLocal = {
    currentIndex: 0,
    container: null,
    photoTimer: null,
    assets: [],

    init() {
        console.log("==> [LOCAL] Inicializando galería local de la SD...");
        this.container = document.getElementById('bg-container');
        if (!this.container) {
            console.error("==> [LOCAL] No se encontró #bg-container en el DOM");
            return;
        }

        const ruta = (typeof CONFIG !== 'undefined' && CONFIG.rutaFotos) ? CONFIG.rutaFotos : "./fotos/";
        const localFiles = ["foto1.jpg", "foto2.jpg", "foto3.jpg"];
        
        this.assets = localFiles.map((file) => ({
            id: file,
            type: 'IMAGE',
            originalFileName: file,
            url: `${ruta}${file}`
        }));

        console.log(`==> [LOCAL] Carrusel local cargado con ${this.assets.length} elementos.`);
        this.updateBackground();

        if (this.assets.length > 1) {
            const tiempo = (typeof CONFIG !== 'undefined' && CONFIG.tiempos) ? CONFIG.tiempos.foto : 20000;
            if (this.photoTimer) clearInterval(this.photoTimer);
            this.photoTimer = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.assets.length;
                console.log(`==> [LOCAL] Avanzando al siguiente índice local: ${this.currentIndex}`);
                this.updateBackground();
            }, tiempo);
        }
    },

    updateBackground() {
        if (this.assets.length === 0) return;
        const asset = this.assets[this.currentIndex];
        const mediaUrl = asset.url;

        console.log(`==> [LOCAL] RENDERIZANDO [${this.currentIndex + 1}/${this.assets.length}] Archivo: ${asset.id}`);

        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }

        const mediaElement = document.createElement('img');
        mediaElement.id = 'bg-main';
        mediaElement.onerror = () => {
            console.error(`==> [LOCAL] ERROR CARGANDO RECURSO LOCAL: ${mediaUrl}`);
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
