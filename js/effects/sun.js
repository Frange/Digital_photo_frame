const SunEffect = {
    progress: -1, 
    direction: 1,
    vaporRotation: 0,

    draw(ctx, w, h) {
        const cfg = CONFIG.efectos;
        this.progress += 0.0001 * this.direction;
        this.vaporRotation += cfg.solRotacionVelocidad; 
        
        const x = (w / 2) + (this.progress * (w * 0.45));
        const y = 50 + (Math.pow(this.progress, 2) * 80); 

        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        // 1. HALOS (Parametrizados)
        this.drawSoftHalo(ctx, x, y, 450, `rgba(255, 220, 150, ${cfg.solBrilloHalos})`);
        this.drawSoftHalo(ctx, x, y, 250, `rgba(255, 240, 200, ${cfg.solBrilloHalos * 1.5})`);

        // 2. FUGAS DINÁMICAS
        this.drawLightVapor(ctx, x, y, w * 1.0, this.vaporRotation, 0.05, cfg.solEscalaFuga);

        // 3. NÚCLEO
        ctx.globalCompositeOperation = 'lighter';
        const coreRadius = 260;
        let coreGrad = ctx.createRadialGradient(x, y, 0, x, y, coreRadius);
        const b = cfg.solBrilloNucleo;
        
        coreGrad.addColorStop(0, `rgba(255, 255, 255, ${b})`);
        coreGrad.addColorStop(0.15, `rgba(255, 255, 220, ${b * 0.8})`);
        coreGrad.addColorStop(0.4, `rgba(255, 200, 50, ${b * 0.2})`);
        coreGrad.addColorStop(0.8, "transparent");
        
        ctx.fillStyle = coreGrad;
        ctx.beginPath(); ctx.arc(x, y, coreRadius, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        if (this.progress >= 1) this.direction = -1;
        else if (this.progress <= -1) this.direction = 1;
    },

    drawSoftHalo(ctx, x, y, r, color) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        let g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r);
        g.addColorStop(0, "transparent");
        g.addColorStop(0.5, color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    },

    drawLightVapor(ctx, x, y, size, rotation, alpha, stretch) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        let g = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        g.addColorStop(0, `rgba(255, 255, 240, ${alpha})`);
        g.addColorStop(0.6, "transparent");
        ctx.fillStyle = g;
        ctx.scale(stretch, 0.15); // Estiramos para crear el destello de lente
        ctx.beginPath(); 
        ctx.arc(0, 0, size, 0, Math.PI * 2); 
        ctx.fill();
        ctx.restore();
    }
};