function hailReset(w, h) {
    const cfg = (typeof CONFIG !== 'undefined') ? CONFIG.efectos : {};
    this.x = Math.random() * w; 
    this.y = Math.random() * -h; 
    this.speed = (cfg.granizoVelocidad || 18) + Math.random() * 10;
    this.vx = 0; 
    this.r = 1.5 + Math.random() * 2.5; 
    this.op = 0.6 + Math.random() * 0.4;
}

function hailDraw(ctx) {
    ctx.save();
    ctx.fillStyle = `rgba(255, 255, 255, ${this.op})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    this.y += this.speed;

    if (this.y > this.canvas.height) {
        this.y = Math.random() * -100;
        this.x = Math.random() * this.canvas.width;
        this.speed = 18 + Math.random() * 10;
    }
}

if (typeof ParticleRegistry !== 'undefined') {
    ParticleRegistry.resets['granizo'] = hailReset;
    ParticleRegistry.resets['hail'] = hailReset;
    ParticleRegistry.draws['granizo'] = hailDraw;
    ParticleRegistry.draws['hail'] = hailDraw;
}