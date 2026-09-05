const CloudHelper = {
    createPuffs() {
        const puffsCount = 5 + Math.floor(Math.random() * 4); 
        const puffs = [];
        const baseRadius = 105 + Math.random() * 25; 

        for (let i = 0; i < puffsCount; i++) {
            puffs.push({
                ox: (Math.random() - 0.5) * (baseRadius * 2.2), 
                oy: (Math.random() - 0.5) * (baseRadius * 0.4), 
                r: baseRadius * (0.7 + Math.random() * 0.6)     
            });
        }
        return puffs;
    }
};

// Lógica de inicialización de la nube
function cloudReset(w, h) {
    const cfg = CONFIG.efectos || {};
    this.dir = Math.random() > 0.5 ? 1 : -1;
    this.x = Math.random() * w; 
    this.y = Math.random() * (h * (cfg.nubesAlturaLimite || 0.30));
    this.speed = (this.dir === 1) ? (cfg.nubesVelocidadDerecha || 0.4) : -((cfg.nubesVelocidadIzquierda || 0.4));
    this.op = (cfg.nubesTransparencia || 0.09) + 0.06; 
    this.puffs = CloudHelper.createPuffs();
}

// Lógica de dibujado de la nube
function cloudDraw(ctx) {
    if (!this.puffs) this.puffs = CloudHelper.createPuffs();

    ctx.save();
    this.puffs.forEach(puff => {
        const cx = this.x + puff.ox;
        const cy = this.y + puff.oy;

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, puff.r);
        g.addColorStop(0, `rgba(255, 255, 255, ${this.op})`);       
        g.addColorStop(0.7, `rgba(240, 240, 245, ${this.op * 0.3})`); 
        g.addColorStop(1, "transparent");                             

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, puff.r, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.restore();

    this.x += this.speed;

    const cfg = CONFIG.efectos || {};
    if (this.dir === 1 && this.x > this.canvas.width + 300) {
        this.x = -300;
        this.y = Math.random() * (this.canvas.height * (cfg.nubesAlturaLimite || 0.3));
    } else if (this.dir === -1 && this.x < -300) {
        this.x = this.canvas.width + 300;
        this.y = Math.random() * (this.canvas.height * (cfg.nubesAlturaLimite || 0.3));
    }
}

// REGISTRO SEGURO: Nos apuntamos en el diccionario global
if (typeof ParticleRegistry !== 'undefined') {
    ParticleRegistry.resets['cloud'] = cloudReset;
    ParticleRegistry.resets['nubes'] = cloudReset;
    
    ParticleRegistry.draws['cloud'] = cloudDraw;
    ParticleRegistry.draws['nubes'] = cloudDraw;
}