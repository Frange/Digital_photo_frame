var originalResetCloud = Particle.prototype.specificReset;
Particle.prototype.specificReset = function(w, h) {
    if (originalResetCloud) originalResetCloud.apply(this, arguments);

    if (this.type === 'cloud') {
        this.x = Math.random() * (w + 800) - 400;
        this.y = Math.random() * (h * 0.40); 
        this.r = 50 + Math.random() * 40; // Radio base de cada "pompón"
        this.speed = 0.15 + Math.random() * 0.35; 
        this.op = 0.1 + Math.random() * 0.15; // Un poco más de opacidad para densidad
        
        // Creamos sub-puntos para dar forma algodonosa
        this.puffs = [];
        for(var i = 0; i < 5; i++) {
            this.puffs.push({
                ox: (Math.random() - 0.5) * 120, // Desplazamiento X
                oy: (Math.random() - 0.5) * 40,  // Desplazamiento Y
                or: 0.8 + Math.random() * 0.5    // Multiplicador de radio
            });
        }
    }
};

var originalDrawCloud = Particle.prototype.specificDraw;
Particle.prototype.specificDraw = function(ctx) {
    if (originalDrawCloud) originalDrawCloud.apply(this, arguments);

    if (this.type === 'cloud') {
        ctx.save();
        
        // Dibujamos varios "pompones" por cada nube para dar volumen
        for(var i = 0; i < this.puffs.length; i++) {
            var p = this.puffs[i];
            var px = this.x + p.ox;
            var py = this.y + p.oy;
            var pr = this.r * p.or;

            var g = ctx.createRadialGradient(px, py, 0, px, py, pr);
            g.addColorStop(0, "rgba(255,255,255," + this.op + ")");
            g.addColorStop(0.6, "rgba(255,255,255," + (this.op * 0.5) + ")");
            g.addColorStop(1, "transparent");

            ctx.fillStyle = g;
            ctx.beginPath();
            
            // Un poco de deformación horizontal pero menos extrema (2.0 en vez de 3.0)
            ctx.save();
            ctx.translate(px, py);
            ctx.scale(2.2, 1.0); 
            ctx.arc(0, 0, pr, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        
        ctx.restore();
        this.x += this.speed;
    }
};