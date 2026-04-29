var originalResetHail = Particle.prototype.specificReset;
Particle.prototype.specificReset = function(w, h) {
    if (originalResetHail) originalResetHail.apply(this, arguments);
    
    if (this.type === 'granizo' || this.type === 'hail') {
        const cfg = CONFIG.efectos;
        this.x = Math.random() * w; 
        this.y = Math.random() * -h;
        this.speed = (cfg.granizoVelocidad || 12) + Math.random() * 6;
        this.r = 2 + Math.random() * 2; 
        this.vx = (Math.random() - 0.5) * 2;
    }
};

var originalDrawHail = Particle.prototype.specificDraw;
Particle.prototype.specificDraw = function(ctx) {
    if (originalDrawHail) originalDrawHail.apply(this, arguments);
    
    if (this.type === 'granizo' || this.type === 'hail') {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        
        this.y += this.speed;
        this.x += this.vx;

        if (this.y > this.canvas.height) {
            this.specificReset(this.canvas.width, this.canvas.height);
        }
    }
};