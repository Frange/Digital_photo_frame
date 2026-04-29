var originalResetSnow = Particle.prototype.specificReset;
Particle.prototype.specificReset = function(w, h) {
    if (originalResetSnow) originalResetSnow.apply(this, arguments);
    if (this.type === 'snow') {
        this.y = Math.random() * -h;
        this.speed = 1.2 + Math.random() * 1.5;
        this.r = 2 + Math.random() * 2;
        this.vx = Math.random() - 0.5;
    }
};

var originalDrawSnow = Particle.prototype.specificDraw;
Particle.prototype.specificDraw = function(ctx) {
    if (originalDrawSnow) originalDrawSnow.apply(this, arguments);
    if (this.type === 'snow') {
        ctx.beginPath();
        ctx.fillStyle = "white"; 
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); 
        ctx.fill();
        this.y += this.speed; 
        this.x += this.vx;
    }
};

const SnowmanEffect = {
    draw(ctx, w, h) {
        ctx.save();
        var x = w / 2;
        var y = h - 90; 

        // Sombra en el suelo
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.beginPath();
        ctx.ellipse(x, y + 5, 50, 15, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255,255,255,0.4)";

        // Bolas de nieve
        this.circle(ctx, x, y, 45);      // Base
        this.circle(ctx, x, y - 55, 32); // Medio
        this.circle(ctx, x, y - 95, 22); // Cabeza

        // BOTONES (Carbón)
        ctx.fillStyle = "#333";
        ctx.shadowBlur = 0;
        this.circle(ctx, x, y - 65, 3);
        this.circle(ctx, x, y - 55, 3);
        this.circle(ctx, x, y - 45, 3);

        // BUFANDA (Roja)
        ctx.fillStyle = "#b30000";
        // Nudo
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x - 25, y - 80, 50, 10, 5) : ctx.rect(x - 25, y - 80, 50, 10);
        ctx.fill();
        // Extremo colgando
        ctx.beginPath();
        ctx.moveTo(x + 10, y - 75);
        ctx.lineTo(x + 25, y - 40);
        ctx.lineTo(x + 15, y - 38);
        ctx.lineTo(x + 5, y - 75);
        ctx.fill();

        // OJOS
        ctx.fillStyle = "#222";
        this.circle(ctx, x - 7, y - 100, 2.5);
        this.circle(ctx, x + 7, y - 100, 2.5);
        
        // NARIZ (Zanahoria grande)
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(x, y - 96);
        ctx.lineTo(x + 25, y - 92); // Más larga
        ctx.lineTo(x, y - 88);
        ctx.fill();

        ctx.restore();
    },
    circle(ctx, x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }
};