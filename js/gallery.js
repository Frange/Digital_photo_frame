const Gallery = {
    currentIndex: 0,
    container: null,
    photoTimer: null, // Temporizador para imágenes y GIFs

    init() {
        this.container = document.getElementById('bg-container');
        if (!this.container) return;
        this.updateBackground();
    },

    updateBackground() {
        // Validación de seguridad
        if (typeof CONFIG === 'undefined' || !CONFIG.files || !CONFIG.files.length) {
            console.warn("Gallery: No hay archivos definidos en CONFIG.files");
            return;
        }
        
        // Limpiamos temporizadores anteriores (importante para que no se pisen)
        clearTimeout(this.photoTimer);

        const currentFile = CONFIG.files[this.currentIndex];
        const extension = currentFile.split('.').pop().toLowerCase();
        const path = (CONFIG.rutaFotos || "./fotos/") + currentFile;
        
        console.log("Gallery -> Cargando:", currentFile);

        // Detectamos tipos de archivo
        const isVideo = (extension === 'mp4');
        const isAnimated = (extension === 'gif' || isVideo);
        
        this.container.innerHTML = ''; // Limpiar anterior

        // --- LÓGICA DE OPACIDAD DÍA/NOCHE ---
        // Sincronizado con WeatherEffects.isNight
        this.container.style.transition = "opacity 2s ease-in-out";
        if (typeof WeatherEffects !== 'undefined' && WeatherEffects.isNight) {
            // Modo Noche: Oscuro (35% de opacidad)
            this.container.style.opacity = (CONFIG.efectos && CONFIG.efectos.nocheTransparenciaFoto) || "0.35";
        } else {
            // Modo Día: Normal (70% de opacidad)
            this.container.style.opacity = "0.7";
        }

        let mediaElement;

        // --- CREACIÓN DEL ELEMENTO (VIDEO o IMAGEN) ---
        if (isVideo) {
            mediaElement = document.createElement('video');
            mediaElement.src = path;
            mediaElement.autoplay = true;
            mediaElement.muted = true; // Necesario para autoplay
            mediaElement.loop = false; // No loopear, queremos que acabe para pasar al siguiente
            mediaElement.playsInline = true; // Para iOS
            
            // ESCUCHADOR CLAVE: Cuando el vídeo acaba, llama a avanzar
            mediaElement.onended = () => {
                console.log("Gallery -> Vídeo finalizado");
                this.advanceIndexAndLoad();
            };
            
        } else {
            // Es Imagen o GIF
            mediaElement = document.createElement('img');
            mediaElement.src = path;
            
            // Programamos el cambio automático para imágenes/gifs (tiempo desde config)
            const tiempoExposicion = (CONFIG.tiempos && CONFIG.tiempos.foto) || 15000;
            this.photoTimer = setTimeout(() => {
                this.advanceIndexAndLoad();
            }, tiempoExposicion);
        }
        
        // Estilos comunes (para que ocupe todo el fondo sin deformarse)
        mediaElement.id = 'bg-main';
        mediaElement.style.width = "100%";
        mediaElement.style.height = "100%";
        mediaElement.style.objectFit = "cover";
        mediaElement.style.position = "absolute";
        mediaElement.style.top = "0";
        mediaElement.style.left = "0";
        
        this.container.appendChild(mediaElement);

        // --- ACTUALIZAR UI (CONTADOR Y NOMBRE) ---
        const countEl = document.getElementById('gallery-count');
        const nameEl = document.getElementById('file-name');
        
        if(countEl) countEl.innerText = `${this.currentIndex + 1} / ${CONFIG.files.length}`;
        if(nameEl) nameEl.innerText = currentFile.toUpperCase();
    },

    advanceIndexAndLoad() {
        // Avanzar índice circularmente
        this.currentIndex = (this.currentIndex + 1) % CONFIG.files.length;
        this.updateBackground();
    }
};