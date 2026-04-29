var originalResetFog = Particle.prototype.specificReset;
Particle.prototype.specificReset = function(w, h) {
    if (originalResetFog) originalResetFog.apply(this, arguments);
    
    if (this.type === 'fog' || this.type === 'niebla') {
        const cfg = CONFIG.efectos;
        this.x = Math.random() * (w + 600) - 300;
        
        // --- LÓGICA DE ALTURA RESPETANDO CONFIG ---
        // Usamos los límites: de 0.2 (arriba) a 0.6 (máximo hasta donde baja)
        const minY = h * cfg.nieblaAlturaMaxima; // Ejemplo: h * 0.2
        const maxY = h * cfg.nieblaAlturaMinima; // Ejemplo: h * 0.6
        this.y = minY + Math.random() * (maxY - minY);

        this.r = 300 + Math.random() * 200;
        this.vx = (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * cfg.nieblaVelocidad);
        this.op = cfg.nieblaTransparencia || 0.08;
    }
    else if (this.type === 'wind' || this.type === 'wind-cloud') {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.len = 100 + Math.random() * 200;
        this.speed = 2 + Math.random() * 5; // Más sutil, no tan "a lo bestia"
        this.curve = (Math.random() - 0.5) * 50; // Para el efecto curvo
        this.op = 0.05 + Math.random() * 0.1;
    }
};

var originalDrawFog = Particle.prototype.specificDraw;
Particle.prototype.specificDraw = function(ctx) {
    if (originalDrawFog) originalDrawFog.apply(this, arguments);
    
    if (this.type === 'fog') {
        this.x += this.vx;
        if (this.x > this.canvas.width + 300) this.x = -300;
        if (this.x < -300) this.x = this.canvas.width + 300;

        ctx.beginPath();
        var g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        g.addColorStop(0, "rgba(255,255,255,0.15)"); 
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g; 
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); 
        ctx.fill();
    } 
    else if (this.type === 'wind' || this.type === 'wind-cloud') {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255," + this.op + ")";
        ctx.lineWidth = 1.5;
        // Efecto Blur sutil (cuidado con el rendimiento en iPad 2, lo hacemos nativo con transparencia)
        ctx.shadowBlur = 5;
        ctx.shadowColor = "white";
        
        // Dibujamos una línea curva (Ráfaga de viento)
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
};