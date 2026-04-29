Particle.prototype.specificReset = function(w, h) {
    if (this.type === 'cloud' || this.type === 'nubes') {
        this.dir = Math.random() > 0.5 ? 1 : -1;
        this.x = (this.dir === 1) ? -400 - (Math.random() * 1000) : w + 400 + (Math.random() * 1000);
        
        // --- CONTROL ESTRICTO DE ALTURA ---
        const limiteConfig = CONFIG.efectos.nubesAlturaLimite || 0.20;
        this.y = Math.random() * (h * limiteConfig);
        
        this.speed = (this.dir === 1) ? 
            (CONFIG.efectos.nubesVelocidadDerecha || 0.73) : 
            -((CONFIG.efectos.nubesVelocidadIzquierda || 0.9));
        
        this.op = CONFIG.efectos.nubesTransparencia || 0.06;
        this.r = 100 + Math.random() * 70;

        this.puffs = [];
        for(let i = 0; i < 6; i++) {
            this.puffs.push({
                ox: (Math.random() - 0.5) * 280, 
                oy: (Math.random() - 0.5) * 45, // Puffs más horizontales
                rFactor: 0.6 + Math.random() * 0.5 
            });
        }
    }
};

Particle.prototype.specificDraw = function(ctx) {
    if (this.type === 'cloud' || this.type === 'nubes') {
        ctx.save();
        this.puffs.forEach(p => {
            const px = this.x + p.ox;
            const py = this.y + p.oy;
            const radius = (this.r * p.rFactor) / 2;
            
            ctx.save();
            ctx.translate(px, py);
            ctx.scale(3.2, 0.7); // Nubes muy chatas
            
            const g = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            g.addColorStop(0, `rgba(255, 255, 255, ${this.op})`);
            g.addColorStop(1, "transparent");
            
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        ctx.restore();

        this.x += this.speed;
        if (Math.abs(this.x) > this.canvas.width + 1200) this.reset();
    }
};