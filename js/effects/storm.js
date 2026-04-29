const StormEffect = {
    lightning: null,
    flash: 0,
    draw(ctx, w, h) {
        // Usamos la frecuencia de CONFIG (ej: 0.99 para pocos rayos)
        var freq = (CONFIG.efectos && CONFIG.efectos.tormentaFrecuencia) ? CONFIG.efectos.tormentaFrecuencia : 0.97;

        if (Math.random() > freq) {
            this.flash = 1.0;
            this.lightning = this.generateRay(w, h);
        }

        if (this.flash > 0) {
            ctx.fillStyle = "rgba(255, 255, 255, " + (this.flash * 0.25) + ")";
            ctx.fillRect(0, 0, w, h);
            this.flash -= 0.05;
        }

        if (this.lightning) {
            ctx.save();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
            ctx.lineWidth = 3; 
            ctx.shadowBlur = 20; 
            ctx.shadowColor = "#FFF";
            ctx.beginPath();
            this.lightning.forEach(function(s) { 
                ctx.moveTo(s.x1, s.y1); 
                ctx.lineTo(s.x2, s.y2); 
            });
            ctx.stroke();
            ctx.restore();
            
            // Probabilidad de que el rayo desaparezca (parpadeo)
            if (Math.random() > 0.7) this.lightning = null;
        }
    },
    generateRay(w, h) {
        let segments = [];
        let cx = Math.random() * w, cy = 0;
        for (let i = 0; i < 15; i++) {
            let nx = cx + (Math.random() - 0.5) * 150;
            let ny = cy + (h / 15);
            segments.push({ x1: cx, y1: cy, x2: nx, y2: ny });
            cx = nx; cy = ny;
        }
        return segments;
    }
};