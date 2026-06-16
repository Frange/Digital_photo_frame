function fogReset(w, h) {
    const cfg = (typeof CONFIG !== 'undefined') ? CONFIG.efectos : {};
    this.x = Math.random() * (w + 600) - 300;
    
    // Altura respetando CONFIG
    const minY = h * (cfg.nieblaAlturaMaxima || 0.2); 
    const maxY = h * (cfg.nieblaAlturaMinima || 0.6); 
    this.y = minY + Math.random() * (maxY - minY);

    this.r = 300 + Math.random() * 200;
    this.vx = (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * (cfg.nieblaVelocidad || 0.5));
    this.op = cfg.nieblaTransparencia || 0.08;
}

function windReset(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.len = 100 + Math.random() * 200;
    this.speed = 2 + Math.random() * 5; 
    this.curve = (Math.random() - 0.5) * 50; 
    this.op = 0.05 + Math.random() * 0.1;
}

function fogDraw(ctx) {
    this.x += this.vx;
    if (this.x > this.canvas.width + 300) this.x = -300;
    if (this.x < -300) this.x = this.canvas.width + 300;

    ctx.beginPath();
    var g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    g.addColorStop(0, `rgba(255, 255, 255, ${this.op * 1.8})`); 
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g; 
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); 
    ctx.fill();
}

function windDraw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255," + this.op + ")";
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 5;
    ctx.shadowColor = "white";
    
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(
        this.x + this.len/2, this.y + this.curve, 
        this.x + this.len/2, this.y - this.curve, 
        this.x + this.len, this.y
    );
    ctx.stroke();
    ctx.restore();

    this.x += this.speed;
    if (this.x > this.canvas.width) {
        this.x = -this.len;
        this.y = Math.random() * this.canvas.height;
    }
}

// Registro global en el Core
if (typeof ParticleRegistry !== 'undefined') {
    ParticleRegistry.resets['fog'] = fogReset;
    ParticleRegistry.resets['niebla'] = fogReset;
    ParticleRegistry.draws['fog'] = fogDraw;
    ParticleRegistry.draws['niebla'] = fogDraw;

    ParticleRegistry.resets['wind'] = windReset;
    ParticleRegistry.resets['wind-cloud'] = windReset;
    ParticleRegistry.draws['wind'] = windDraw;
    ParticleRegistry.draws['wind-cloud'] = windDraw;
}