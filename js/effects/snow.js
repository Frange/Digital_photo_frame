var originalResetSnow = Particle.prototype.specificReset;
Particle.prototype.specificReset = function(w, h) {
    if (originalResetSnow) originalResetSnow.apply(this, arguments);
    if (this.type === 'snow' || this.type === 'nieve') {
        this.x = Math.random() * w; 
        this.y = Math.random() * -h;
        this.speed = 1.2 + Math.random() * 1.5;
        this.r = 1.5 + Math.random() * 2.5; 
        this.vx = Math.random() - 0.5;      
        this.op = 0.5 + Math.random() * 0.4;
    }
};

var originalDrawSnow = Particle.prototype.specificDraw;
Particle.prototype.specificDraw = function(ctx) {
    if (originalDrawSnow) originalDrawSnow.apply(this, arguments);
    const h = this.canvas.height;
    const w = this.canvas.width;

    if (this.type === 'snow' || this.type === 'nieve') {
        // Dibujamos el copo
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.op})`; 
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); 
        ctx.fill();
        
        this.y += this.speed; 
        this.x += this.vx;

        if (this.y > h) this.specificReset(w, h);
        if (this.x > w + 20) this.x = -20;
        if (this.x < -20) this.x = w + 20;
    }
};

const SnowmanEffect = {
    draw(ctx, w, h) {
        ctx.save();
        
        // 1. DIBUJAR EL SUELO PRIMERO (Para que el muñeco esté encima)
        // Lo subimos bastante para que se vea por encima de la barra negra
        const ySuelo = h - 100; 
        
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(0, ySuelo);
        // Hacemos un relieve simple pero efectivo
        ctx.quadraticCurveTo(w * 0.25, ySuelo - 30, w * 0.5, ySuelo);
        ctx.quadraticCurveTo(w * 0.75, ySuelo + 30, w, ySuelo - 10);
        ctx.lineTo(w, h);
        ctx.fill();

        // 2. DIBUJAR EL MUÑECO
        var x = w / 2;
        var y = h - 105; // Ajustado para que asiente en el suelo blanco

        // Sombra suave sobre la nieve
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.beginPath(); ctx.ellipse(x, y + 5, 50, 15, 0, 0, Math.PI * 2); ctx.fill();

        // Bolas del cuerpo
        ctx.fillStyle = "white";
        this.circle(ctx, x, y, 45);      // Base
        this.circle(ctx, x, y - 55, 32); // Cuerpo
        this.circle(ctx, x, y - 95, 22); // Cabeza

        // Detalles (Ojos, Botones, Bufanda, Nariz)
        ctx.fillStyle = "#333";
        this.circle(ctx, x, y - 65, 3); this.circle(ctx, x, y - 55, 3); this.circle(ctx, x, y - 45, 3);
        this.circle(ctx, x - 7, y - 100, 2.5); this.circle(ctx, x + 7, y - 100, 2.5);
        
        ctx.fillStyle = "#b30000"; 
        ctx.fillRect(x - 25, y - 80, 50, 10); // Bufanda simple para iPad 2

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