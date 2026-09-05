function snowReset(w, h) {
    this.x = Math.random() * w; 
    this.y = Math.random() * -h; 
    this.speed = 1.2 + Math.random() * 1.5;
    this.vx = Math.random() - 0.5; 
    this.r = 1.5 + Math.random() * 2.5; 
    this.op = 0.5 + Math.random() * 0.4;
    this.initialized = true; // Forzamos bandera arriba
}

function snowDraw(ctx) {
    // Si por culpa de la carga asíncrona la partícula nació sin propiedades físicas, se las inyectamos al vuelo
    if (!this.speed) {
        snowReset.call(this, this.canvas.width || window.innerWidth, this.canvas.height || window.innerHeight);
    }

    ctx.save();
    ctx.fillStyle = `rgba(255, 255, 255, ${this.op})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Caída física
    this.y += this.speed;
    this.x += this.vx;

    // Reinicio directo de límites (Igual que tu granizo)
    if (this.y > this.canvas.height) {
        this.y = Math.random() * -100;
        this.x = Math.random() * this.canvas.width;
        this.speed = 1.2 + Math.random() * 1.5;
        this.vx = Math.random() - 0.5;
    }

    // Límite horizontal
    if (this.x > this.canvas.width + 20) this.x = -20;
    if (this.x < -20) this.x = this.canvas.width + 20;
}

if (typeof ParticleRegistry !== 'undefined') {
    ParticleRegistry.resets['snow'] = snowReset;
    ParticleRegistry.resets['nieve'] = snowReset;
    ParticleRegistry.draws['snow'] = snowDraw;
    ParticleRegistry.draws['nieve'] = snowDraw;
}

// Objeto estático para el Suelo y el Muñeco de Nieve (Intacto)
window.SnowmanEffect = {
    draw(ctx, w, h) {
        ctx.save();
        const ySuelo = h - 100; 
        
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(0, ySuelo);
        ctx.quadraticCurveTo(w * 0.25, ySuelo - 30, w * 0.5, ySuelo);
        ctx.quadraticCurveTo(w * 0.75, ySuelo + 30, w, ySuelo - 10);
        ctx.lineTo(w, h);
        ctx.fill();

        var x = w / 2;
        var y = h - 105;

        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.beginPath(); ctx.ellipse(x, y + 5, 50, 15, 0, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = "white";
        this.circle(ctx, x, y, 45);      
        this.circle(ctx, x, y - 55, 32); 
        this.circle(ctx, x, y - 95, 22); 

        ctx.fillStyle = "#333";
        this.circle(ctx, x, y - 65, 3); this.circle(ctx, x, y - 55, 3); this.circle(ctx, x, y - 45, 3);
        this.circle(ctx, x - 7, y - 100, 2.5); this.circle(ctx, x + 7, y - 100, 2.5);
        
        ctx.fillStyle = "#b30000"; 
        ctx.fillRect(x - 25, y - 80, 50, 10); 

        ctx.fillStyle = "orange";
        ctx.beginPath(); 
        ctx.moveTo(x, y - 96); ctx.lineTo(x + 25, y - 92); ctx.lineTo(x, y - 88); 
        ctx.fill();

        ctx.restore();
    },
    circle(ctx, x, y, r) {
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
};