var originalResetRain = Particle.prototype.specificReset;
Particle.prototype.specificReset = function(w, h) {
    if (originalResetRain) originalResetRain.apply(this, arguments);
    
    if (this.type === 'rain') {
        this.y = Math.random() * -h;
        this.speed = 20 + Math.random() * 10;
        this.len = 25 + Math.random() * 10;
    } 
    else if (this.type === 'granizo') {
        this.y = Math.random() * -h;
        this.speed = 12 + Math.random() * 6;
        this.r = 2 + Math.random() * 3; // Bolitas de hielo
        this.vx = (Math.random() - 0.5) * 2; // Caen un poco en diagonal
    }
};

var originalDrawRain = Particle.prototype.specificDraw;
Particle.prototype.specificDraw = function(ctx) {
    if (originalDrawRain) originalDrawRain.apply(this, arguments);
    
    if (this.type === 'rain') {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(174,194,224,0.6)"; 
        ctx.lineWidth = 1;
        ctx.moveTo(this.x, this.y); 
        ctx.lineTo(this.x, this.y + this.len); 
        ctx.stroke();
        this.y += this.speed;

    } else if (this.type === 'granizo') {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        this.y += this.speed;
        this.x += this.vx;
    }
};