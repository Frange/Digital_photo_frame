var originalResetRain = Particle.prototype.specificReset;
Particle.prototype.specificReset = function(w, h) {
    if (originalResetRain) originalResetRain.apply(this, arguments);
    
    if (this.type === 'rain' || this.type === 'lluvia') {
        const cfg = CONFIG.efectos;
        this.x = Math.random() * w; 
        this.y = Math.random() * -h;
        // Parametrizado:
        this.speed = (cfg.lluviaVelocidad || 22) + Math.random() * 10;
        this.len = 25 + Math.random() * 15;
        this.op = 0.3 + Math.random() * 0.4;
    }
};

var originalDrawRain = Particle.prototype.specificDraw;
Particle.prototype.specificDraw = function(ctx) {
    if (originalDrawRain) originalDrawRain.apply(this, arguments);
    
    if (this.type === 'rain' || this.type === 'lluvia') {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(174,194,224," + this.op + ")"; 
        ctx.lineWidth = 1;
        ctx.moveTo(this.x, this.y); 
        ctx.lineTo(this.x, this.y + this.len); 
        ctx.stroke();
        
        this.y += this.speed;

        if (this.y > this.canvas.height) {
            this.specificReset(this.canvas.width, this.canvas.height);
        }
    }
};