/**
 * EFECTO NOCHE PRO: Bóveda Celeste Realista y Estrella Fugaz con Estela de Partículas
 */

window.NightEffect = {
    shootingStar: null,
    starTrails: [], // Nuevo saco para las partículas de la estela

    /**
     * Gestión principal de la estrella fugaz y sus partículas
     */
    handleShootingStar: function(ctx, w, h) {
        var cfg = (typeof CONFIG !== 'undefined') ? CONFIG.efectos : {};
        
        // 1. INTENTAR GENERAR UNA NUEVA ESTRELLA FUGAZ
        if (!this.shootingStar && Math.random() < (cfg.estrellasFugacesFrecuencia || 0.0002)) {
            // Lógica de nacimiento: trayectorias más variadas
            var startFromLeft = Math.random() > 0.5;
            this.shootingStar = {
                x: startFromLeft ? -100 : w + 100,
                y: Math.random() * (h * 0.4), // Solo en el tercio superior
                vx: startFromLeft ? (20 + Math.random() * 15) : -(20 + Math.random() * 15),
                vy: 5 + Math.random() * 10,
                size: 2 + Math.random() * 2,
                life: 1.0,
                decay: 0.015 + Math.random() * 0.01,
                color: Math.random() > 0.2 ? "255, 255, 255" : "255, 230, 200" // Blanco o ligeramente dorado
            };
        }

        // 2. ACTUALIZAR Y DIBUJAR LA ESTRELLA ACTUALE (NÚCLEO)
        if (this.shootingStar) {
            var s = this.shootingStar;
            
            // Dibujar núcleo con Glow (resplandor)
            ctx.save();
            ctx.shadowBlur = s.size * 3;
            ctx.shadowColor = "rgba(" + s.color + ", " + s.life + ")";
            ctx.fillStyle = "rgba(" + s.color + ", " + s.life + ")";
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // GENERAR PARTÍCULAS DE ESTELA (Trails)
            // Creamos 2 partículas nuevas por frame para una estela densa
            for(var i=0; i<2; i++) {
                this.starTrails.push({
                    x: s.x,
                    y: s.y,
                    vx: s.vx * 0.1 * (Math.random() - 0.5), // Pequeña dispersión lateral
                    vy: s.vy * 0.1 * (Math.random() - 0.5),
                    size: s.size * (0.6 + Math.random() * 0.4),
                    life: 0.8 * s.life, // Empiezan un poco más tenues que el núcleo
                    decay: 0.03 + Math.random() * 0.03, // Se desvanecen rápido
                    color: s.color
                });
            }

            // Mover núcleo
            s.x += s.vx;
            s.y += s.vy;
            s.life -= s.decay;

            // Muerte del núcleo
            if (s.life <= 0 || s.y > h || s.x > w + 100 || s.x < -100) {
                this.shootingStar = null;
            }
        }

        // 3. ACTUALIZAR Y DIBUJAR LA ESTELA (Trails)
        for (var j = this.starTrails.length - 1; j >= 0; j--) {
            var t = this.starTrails[j];
            
            // Dibujar partícula de estela (simple, sin glow para rendimiento)
            ctx.fillStyle = "rgba(" + t.color + ", " + t.life + ")";
            ctx.beginPath();
            ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
            ctx.fill();

            // Mover y desvanecer partícula
            t.x += t.vx;
            t.y += t.vy;
            t.life -= t.decay;
            t.size *= 0.97; // Encogen un poco con el tiempo

            // Limpieza de partículas muertas
            if (t.life <= 0 || t.size < 0.1) {
                this.starTrails.splice(j, 1);
            }
        }
    }
};

// --- EXTENSIÓN DE LA CLASE PARTICLE (ESTRELLAS FIJAS) ---
// (Mantenemos la lógica de la bóveda celeste igual, que funcionaba bien)

if (typeof Particle !== 'undefined') {
    var originalResetNight = Particle.prototype.specificReset;
    Particle.prototype.specificReset = function(w, h) {
        if (originalResetNight) originalResetNight.apply(this, arguments);
        if (this.type === 'star') {
            var cfg = (typeof CONFIG !== 'undefined') ? CONFIG.efectos : {};
            var hLim = cfg.nocheAlturaLimite || 0.65;
            var startX = Math.random() * w;
            var startY = Math.random() * (h * hLim); 
            this.r = 0.4 + Math.random() * 1.1;
            this.op = 0.2 + Math.random() * 0.8;
            this.centerX = w * 0.5; 
            this.centerY = h * 2.2; 
            var dx = startX - this.centerX;
            var dy = startY - this.centerY;
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
            var hLim = cfg.nocheAlturaLimite || 0.65;
            this.angle += (cfg.estrellasRotacion || 0.00015);
            this.x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
            this.y = this.centerY + Math.sin(this.angle) * this.orbitRadius;

            if (this.y < h * hLim && this.y > -50 && this.x > 0 && this.x < w) {
                var edgeFade = (this.y > h * (hLim - 0.15)) ? 1 - ((this.y - h*(hLim-0.15)) / (h*0.15)) : 1;
                var twinkle = 0.5 + Math.abs(Math.sin(Date.now() * 0.001 + (this.x * 0.1)));
                ctx.fillStyle = "rgba(255, 255, 255, " + (this.op * twinkle * edgeFade) + ")";
                ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill();
            } else {
                this.specificReset(w, h);
            }
        }
    };
}