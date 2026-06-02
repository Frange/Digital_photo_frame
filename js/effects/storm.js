const StormEffect = {
    lightning: null,
    flash: 0,

    draw(ctx, w, h) {
        const cfg = CONFIG.efectos;
        
        // 1. RELÁMPAGO (Resplandor)
        if (Math.random() < (cfg.tormentaRelampagoFrecuencia || 0.02)) {
            this.flash = 0.6 + Math.random() * 0.4;
        }

        if (this.flash > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.flash * 0.3})`;
            ctx.fillRect(0, 0, w, h);
            this.flash -= (cfg.tormentaVelocidadDesvanecimiento || 0.03);
        }

        // 2. RAYO (Dibujo)
        if (!this.lightning && Math.random() < (cfg.tormentaRayoFrecuencia || 0.005)) {
            this.lightning = this.generateRay(w, h);
            this.flash = 1.0; // El rayo siempre genera flash máximo
        }

        if (this.lightning) {
            ctx.save();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
            ctx.lineWidth = 3;
            ctx.shadowBlur = 25;
            ctx.shadowColor = "#FFF";
            ctx.beginPath();
            this.lightning.forEach(s => {
                ctx.moveTo(s.x1, s.y1);
                ctx.lineTo(s.x2, s.y2);
            });
            ctx.stroke();
            ctx.restore();

            if (Math.random() > 0.6) this.lightning = null;
        }
    },

    generateRay(w, h) {
        let segments = [];
        let cx = Math.random() * w, cy = 0;
        for (let i = 0; i < 15; i++) {
            let nx = cx + (Math.random() - 0.5) * 100;
            let ny = cy + (h / 15);
            segments.push({ x1: cx, y1: cy, x2: nx, y2: ny });
            cx = nx; cy = ny;
        }
        return segments;
    }
};