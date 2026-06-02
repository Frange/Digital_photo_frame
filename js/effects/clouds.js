const CloudCache = {
    canvases: [],
    isInitialized: false,

    // Creamos las plantillas de nubes una sola vez
    init(opacidad) {
        for (let i = 0; i < 5; i++) {
            const canvas = document.createElement('canvas');
            // Canvas interno suficientemente grande para nubes hermosas
            canvas.width = 800;  
            canvas.height = 200;
            const ictx = canvas.getContext('2d');
            
            const radius = 70 + Math.random() * 30;
            const puffsCount = 6;
            
            ictx.save();
            ictx.translate(400, 100); 
            ictx.scale(4.0, 0.8); // Estiramiento horizontal
            
            for (let j = 0; j < puffsCount; j++) {
                const ox = (Math.random() - 0.5) * 150;
                const oy = (Math.random() - 0.5) * 40;
                const rPuff = radius * (0.7 + Math.random() * 0.6);
                
                const g = ictx.createRadialGradient(ox, oy, 0, ox, oy, rPuff);
                g.addColorStop(0, `rgba(255, 255, 255, ${opacidad})`);
                g.addColorStop(1, "transparent");
                
                ictx.fillStyle = g;
                ictx.beginPath();
                ictx.arc(ox, oy, rPuff, 0, Math.PI * 2);
                ictx.fill();
            }
            ictx.restore();
            this.canvases.push(canvas);
        }
        this.isInitialized = true;
    }
};

Particle.prototype.specificReset = function(w, h) {
    if (this.type === 'cloud' || this.type === 'nubes') {
        const cfg = CONFIG.efectos;
        
        // Inicializar la caché si no existe
        if (!CloudCache.isInitialized) {
            CloudCache.init(cfg.nubesTransparencia || 0.1);
        }

        this.dir = Math.random() > 0.5 ? 1 : -1;
        
        // Aparecer bien lejos para que entren suavemente
        this.x = (this.dir === 1) ? -800 - (Math.random() * 1000) : w + 800 + (Math.random() * 1000);
        
        const limiteConfig = cfg.nubesAlturaLimite || 0.30;
        this.y = Math.random() * (h * limiteConfig);
        
        this.speed = (this.dir === 1) ? 
            (cfg.nubesVelocidadDerecha || 0.5) : 
            -((cfg.nubesVelocidadIzquierda || 0.5));
        
        // Seleccionar una de nuestras 5 nubes maestras
        this.cacheIdx = Math.floor(Math.random() * CloudCache.canvases.length);
        
        // ESCALA: Aquí es donde las hacemos grandes. 
        // 2.0 a 3.5 las hará ocupar mucho espacio.
        this.scale = 2.0 + Math.random() * 1.5; 
    }
};

Particle.prototype.specificDraw = function(ctx) {
    if (this.type === 'cloud' || this.type === 'nubes') {
        const img = CloudCache.canvases[this.cacheIdx];
        const drawW = img.width * this.scale;
        const drawH = img.height * this.scale;

        // Dibujo ultra-rápido de imagen
        ctx.drawImage(
            img, 
            this.x - drawW / 2, 
            this.y - drawH / 2, 
            drawW, 
            drawH
        );

        this.x += this.speed;
        
        // Lógica de re-entrada
        if (this.dir === 1 && this.x > this.canvas.width + 1000) {
            this.x = -1000;
            this.y = Math.random() * (this.canvas.height * (CONFIG.efectos.nubesAlturaLimite || 0.3));
        } else if (this.dir === -1 && this.x < -1000) {
            this.x = this.canvas.width + 1000;
            this.y = Math.random() * (this.canvas.height * (CONFIG.efectos.nubesAlturaLimite || 0.3));
        }
    }
};