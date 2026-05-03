const SunEffect = {
    progress: -1, 
    direction: 1,
    vaporRotation: 0,
    offscreenCanvas: null,
    isInitialized: false,

    // Creamos el sol una sola vez en memoria
    init(cfg) {
        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCanvas.width = 1000; // Espacio suficiente para los halos
        this.offscreenCanvas.height = 1000;
        const ictx = this.offscreenCanvas.getContext('2d');
        const center = 500;

        // Dibujar el sol estático en el canvas oculto
        ictx.globalCompositeOperation = 'screen';
        
        // Halos
        this.renderStaticHalo(ictx, center, center, 450, `rgba(255, 220, 150, ${cfg.solBrilloHalos})`);
        this.renderStaticHalo(ictx, center, center, 250, `rgba(255, 240, 200, ${cfg.solBrilloHalos * 1.5})`);

        // Núcleo
        ictx.globalCompositeOperation = 'lighter';
        const coreRadius = 260;
        let coreGrad = ictx.createRadialGradient(center, center, 0, center, center, coreRadius);
        const b = cfg.solBrilloNucleo;
        coreGrad.addColorStop(0, `rgba(255, 255, 255, ${b})`);
        coreGrad.addColorStop(0.15, `rgba(255, 255, 220, ${b * 0.8})`);
        coreGrad.addColorStop(0.4, `rgba(255, 200, 50, ${b * 0.2})`);
        coreGrad.addColorStop(0.8, "transparent");
        ictx.fillStyle = coreGrad;
        ictx.beginPath(); ictx.arc(center, center, coreRadius, 0, Math.PI * 2); ictx.fill();
        
        this.isInitialized = true;
    },

    renderStaticHalo(ctx, x, y, r, color) {
        let g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r);
        g.addColorStop(0, "transparent");
        g.addColorStop(0.5, color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    },

    draw(ctx, w, h) {
        const cfg = CONFIG.efectos;
        if (!this.isInitialized) this.init(cfg);

        // Aceleramos el progreso para que se note en la Pi
        this.progress += 0.0015 * this.direction; 
        this.vaporRotation += cfg.solRotacionVelocidad; 
        
        const x = (w / 2) + (this.progress * (w * 0.45));
        const y = 50 + (Math.pow(this.progress, 2) * 80); 

        ctx.save();
        // Dibujamos la imagen cacheada (operación ultra rápida)
        ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(this.offscreenCanvas, x - 500, y - 500);

        // El vapor es lo único que rotamos (pero sin gradientes complejos si es posible)
        this.drawLightVapor(ctx, x, y, w * 0.8, this.vaporRotation, 0.05, cfg.solEscalaFuga);
        
        ctx.restore();

        if (this.progress >= 1) this.direction = -1;
        else if (this.progress <= -1) this.direction = 1;
    },

    drawLightVapor(ctx, x, y, size, rotation, alpha, stretch) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.scale(stretch, 0.12);
        // Usamos una forma simple blanca con transparencia en lugar de gradiente radial
        ctx.fillStyle = `rgba(255, 255, 240, ${alpha})`;
        ctx.beginPath(); ctx.arc(0, 0, size / 2, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    }
};