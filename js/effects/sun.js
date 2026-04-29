const SunEffect = {
    progress: -1, 
    direction: 1,
    vaporRotation: 0,

    draw(ctx, w, h) {
        this.progress += 0.0001 * this.direction;
        this.vaporRotation += 0.000008; 
        
        const centerX = w / 2;
        const widthRange = w * 0.45;
        const x = centerX + (this.progress * widthRange);
        // Parábola suave para el arco de izquierda a derecha
        const y = 50 + (Math.pow(this.progress, 2) * 80); 

        ctx.save();
        
        // 1. GRAN NEBULOSA ATMOSFÉRICA (El resplandor que baña la foto)
        ctx.globalCompositeOperation = 'screen';
        let atmos = ctx.createRadialGradient(x, y, 0, x, y, w * 1.3);
        atmos.addColorStop(0, "rgba(255, 180, 50, 0.12)");
        atmos.addColorStop(0.5, "rgba(255, 100, 20, 0.02)");
        atmos.addColorStop(1, "transparent");
        ctx.fillStyle = atmos;
        ctx.fillRect(0, 0, w, h);

        // 2. HALOS DE LENTE (Recuperamos los halos con blur que pediste)
        // Usamos varios para dar profundidad y que no parezca un círculo plano
        this.drawSoftHalo(ctx, x, y, 450, "rgba(255, 220, 150, 0.03)");
        this.drawSoftHalo(ctx, x, y, 250, "rgba(255, 240, 200, 0.05)");

        // 3. LA FUGA DINÁMICA (Lens Flare rotativo)
        // Esto es lo que rompe el "mazacote" y le da realismo al girar
        this.drawLightVapor(ctx, x, y, w * 1.0, this.vaporRotation, 0.05, 5);
        this.drawLightVapor(ctx, x, y, w * 0.7, -this.vaporRotation * 0.5, 0.03, 3);

        // 4. EL NÚCLEO POTENTE (El que tenías antes, grande y brillante)
        ctx.globalCompositeOperation = 'lighter'; // Suma lumínica para que brille
        const coreRadius = 260; // Radio grande como el de las fotos
        let coreGrad = ctx.createRadialGradient(x, y, 0, x, y, coreRadius);
        
        coreGrad.addColorStop(0, "#FFFFFF"); // Blanco puro central
        coreGrad.addColorStop(0.05, "#FFFFFF"); // Mantenemos el blanco un poco
        coreGrad.addColorStop(0.15, "rgba(255, 255, 220, 0.8)"); // Transición a crema
        coreGrad.addColorStop(0.4, "rgba(255, 200, 50, 0.2)"); // Halo ámbar
        coreGrad.addColorStop(0.8, "rgba(0, 0, 0, 0)"); // Fundido total antes del borde
        
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Rebote de izquierda a derecha
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