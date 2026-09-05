window.StormEffect = {
    lightning: null,
    flash: 0,

    generateRay(w, h) {
        let segments = [];
        let cx = Math.random() * w, cy = 0;
        for (let i = 0; i < 12; i++) {
            let nx = cx + (Math.random() - 0.5) * 120;
            let ny = cy + (h / 12);
            segments.push({ x1: cx, y1: cy, x2: nx, y2: ny });
            cx = nx; cy = ny;
        }
        return segments;
    }
};

function stormReset(w, h) {
    this.x = 0;
    this.y = 0;
}

function stormDraw(ctx) {
    const canvasReal = this.canvas || ctx.canvas;
    const w = (canvasReal) ? canvasReal.width : window.innerWidth;
    const h = (canvasReal) ? canvasReal.height : window.innerHeight;
    const cfg = (typeof CONFIG !== 'undefined') ? CONFIG.efectos : {};
    
    // 1. Relámpago ambiental
    if (Math.random() < (cfg.tormentaRelampagoFrecuencia || 0.05)) {
        window.StormEffect.flash = 0.5 + Math.random() * 0.5;
    }

    if (window.StormEffect.flash > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${window.StormEffect.flash * 0.3})`;
        ctx.fillRect(0, 0, w, h);
        window.StormEffect.flash -= (cfg.tormentaVelocidadDesvanecimiento || 0.04);
    }

    // 2. Dibujo del rayo lineal
    if (!window.StormEffect.lightning && Math.random() < (cfg.tormentaRayoFrecuencia || 0.02)) {
        window.StormEffect.lightning = window.StormEffect.generateRay(w, h);
        window.StormEffect.flash = 1.0; 
    }

    if (window.StormEffect.lightning) {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        ctx.lineWidth = 4;
        ctx.shadowBlur = 30;
        ctx.shadowColor = "#FFF";
        ctx.beginPath();
        window.StormEffect.lightning.forEach(s => {
            ctx.moveTo(s.x1, s.y1);
            ctx.lineTo(s.x2, s.y2);
        });
        ctx.stroke();
        ctx.restore();

        if (Math.random() > 0.4) {
            window.StormEffect.lightning = null;
        }
    }
}

if (typeof ParticleRegistry !== 'undefined') {
    ParticleRegistry.resets['storm'] = stormReset;
    ParticleRegistry.resets['tormenta'] = stormReset;
    ParticleRegistry.draws['storm'] = stormDraw;
    ParticleRegistry.draws['tormenta'] = stormDraw;
}