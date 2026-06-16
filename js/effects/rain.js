function rainReset(w, h) {
    const cfg = (typeof CONFIG !== 'undefined') ? CONFIG.efectos : {};
    this.x = Math.random() * w; 
    this.y = Math.random() * -h; 
    this.speed = (cfg.lluviaVelocidad || 22) + Math.random() * 10;
    this.len = 25 + Math.random() * 15;
    this.op = 0.2 + Math.random() * 0.3;
}

function rainDraw(ctx) {
    ctx.fillStyle = `rgba(174, 194, 224, ${this.op})`;
    ctx.fillRect(this.x, this.y, 1, this.len); 
    
    this.y += this.speed;

    if (this.y > this.canvas.height) {
        this.y = -this.len;
        this.x = Math.random() * this.canvas.width;
    }
}

if (typeof ParticleRegistry !== 'undefined') {
    ParticleRegistry.resets['rain'] = rainReset;
    ParticleRegistry.resets['lluvia'] = rainReset;
    ParticleRegistry.draws['rain'] = rainDraw;
    ParticleRegistry.draws['lluvia'] = rainDraw;
}