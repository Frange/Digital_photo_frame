Particle.prototype.specificReset = function(w, h) {
    if (this.type === 'rain' || this.type === 'lluvia') {
        const cfg = CONFIG.efectos;
        this.x = Math.random() * w; 
        this.y = Math.random() * -h; // Empezar fuera de pantalla
        
        this.speed = (cfg.lluviaVelocidad || 22) + Math.random() * 10;
        this.len = 25 + Math.random() * 15;
        this.op = 0.2 + Math.random() * 0.3; // Un poco más sutil para que no parezcan palos
    }
};

Particle.prototype.specificDraw = function(ctx) {
    if (this.type === 'rain' || this.type === 'lluvia') {
        // FILL RECT es mucho más rápido que STROKE
        ctx.fillStyle = `rgba(174, 194, 224, ${this.op})`;
        ctx.fillRect(this.x, this.y, 1, this.len); 
        
        this.y += this.speed;

        // Reset si sale por abajo
        if (this.y > this.canvas.height) {
            this.y = -this.len;
            this.x = Math.random() * this.canvas.width;
        }
    }
};