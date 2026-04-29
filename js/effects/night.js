/**
 * EFECTO NOCHE: Bóveda Celeste y Estrellas Fugaces
 */

window.NightEffect = {
    shootingStar: null,
    handleShootingStar: function(ctx, w, h) {
        var cfg = (typeof CONFIG !== 'undefined') ? CONFIG.efectos : {};
        var frec = cfg.estrellasFugacesFrecuencia || 0.0002;

        if (!this.shootingStar && Math.random() < frec) {
            this.shootingStar = {
                x: Math.random() * w,
                y: Math.random() * (h * 0.3),
                len: 50 + Math.random() * 100,
                speed: 15 + Math.random() * 10,
                op: 1.0
            };
        }

        if (this.shootingStar) {
            var s = this.shootingStar;
            ctx.strokeStyle = "rgba(255, 255, 255, " + s.op + ")";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s.x - s.len, s.y + (s.len * 0.2)); 
            ctx.stroke();

            s.x += s.speed;
            s.y += s.speed * 0.2;
            s.op -= 0.03;

            if (s.op <= 0) this.shootingStar = null;
        }
    }
};

// Protección para evitar bloqueos si Particle carga tarde
if (typeof Particle !== 'undefined') {
    var originalResetNight = Particle.prototype.specificReset;
    Particle.prototype.specificReset = function(w, h) {
        if (originalResetNight) originalResetNight.apply(this, arguments);

        if (this.type === 'star') {
            this.x = Math.random() * w;
            this.y = Math.random() * (h * 0.5); 
            this.r = 0.5 + Math.random() * 1.5;
            this.op = Math.random();
            this.twinkle = 0.005 + Math.random() * 0.01;

            this.centerX = w / 2;
            this.centerY = h * -0.2; 
            var dx = this.x - this.centerX;
            var dy = this.y - this.centerY;
            this.orbitRadius = Math.sqrt(dx * dx + dy * dy);
            this.angle = Math.atan2(dy, dx);
        }
    };

    var originalDrawNight = Particle.prototype.specificDraw;
    Particle.prototype.specificDraw = function(ctx) {
        if (originalDrawNight) originalDrawNight.apply(this, arguments);

        if (this.type === 'star') {
            var h = this.canvas.height;
            var w = this.canvas.width;
            var cfg = (typeof CONFIG !== 'undefined') ? CONFIG.efectos : {};
            var rotacion = cfg.estrellasRotacion || 0.0003;

            this.angle += rotacion;
            this.x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
            this.y = this.centerY + Math.sin(this.angle) * this.orbitRadius;

            if (this.y < h * 0.55) {
                var parpadeo = 0.3 + Math.abs(Math.sin(Date.now() * 0.001 + this.op * 10));
                ctx.fillStyle = "rgba(255, 255, 255, " + parpadeo + ")";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fill();
            } else {
                this.specificReset(w, h);
            }
        }
    };
} else {
    console.error("ERROR: Particle no cargó antes que night.js");
}