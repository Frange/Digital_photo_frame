// 1. EL RESET: Define dónde nace y hacia dónde va usando CONFIG
Particle.prototype.specificReset = function(w, h) {
    if (this.type === 'cloud') {
        // Dirección: 50% hacia la derecha (1), 50% hacia la izquierda (-1)
        this.dir = Math.random() > 0.5 ? 1 : -1;
        
        // ENTRADA PROGRESIVA: Nacen muy por fuera de la pantalla de forma aleatoria
        // para que no entren todas a la vez como un muro, sino como un goteo continuo.
        if (this.dir === 1) {
            this.x = -200 - (Math.random() * 1200); 
        } else {
            this.x = w + 200 + (Math.random() * 1200); 
        }
        
        // Altura límite leída del config
        var limiteY = CONFIG.efectos.nubesAlturaLimite || 0.45;
        this.y = Math.random() * (h * limiteY);
        
        // Velocidad según su dirección, leída del config (+ un pelín aleatorio para dar variedad)
        if (this.dir === 1) {
            this.speed = (CONFIG.efectos.nubesVelocidadDerecha || 0.15) + (Math.random() * 0.1);
        } else {
            // Hacia la izquierda el dir es -1, por lo que multiplicamos para restar en la x
            this.speed = -((CONFIG.efectos.nubesVelocidadIzquierda || 0.25) + (Math.random() * 0.1));
        }
        
        // Opacidad leída del config (+ pequeño margen)
        var opBase = CONFIG.efectos.nubesTransparencia || 0.08;
        this.op = opBase + (Math.random() * 0.05);
        
        this.r = 100 + Math.random() * 80;

        // Estructura
        this.puffs = [];
        for(var i = 0; i < 7; i++) {
            this.puffs.push({
                ox: (Math.random() - 0.5) * 250, 
                oy: (Math.random() - 0.5) * 80,  
                rFactor: 0.6 + Math.random() * 0.6 
            });
        }
    }
};

// 2. EL DRAW: El truco del gradiente sigue aquí para que no desaparezcan
Particle.prototype.specificDraw = function(ctx) {
    if (this.type === 'cloud') {
        
        ctx.save();
        for(var i = 0; i < this.puffs.length; i++) {
            var p = this.puffs[i];
            var px = this.x + p.ox;
            var py = this.y + p.oy;
            var pr = this.r * p.rFactor;
            var radius = pr / 2.5; 
            
            ctx.save();
            ctx.translate(px, py); // Posicionamos el canvas en el pompón
            ctx.scale(2.8, 1.2); 
            
            // Gradiente vinculado al 0,0 local (soluciona el bug del desvanecimiento)
            var g = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            g.addColorStop(0, "rgba(255,255,255," + this.op + ")");
            g.addColorStop(0.5, "rgba(255,255,255," + (this.op * 0.5) + ")");
            g.addColorStop(1, "transparent");
            
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        ctx.restore();

        // Movimiento real usando la variable speed (que ya incluye su signo)
        this.x += this.speed;

        // Limpieza y regeneración
        var w = this.canvas.width;
        if (this.dir === 1 && this.x > w + 600) {
            this.specificReset(w, this.canvas.height);
        } 
        else if (this.dir === -1 && this.x < -600) {
            this.specificReset(w, this.canvas.height);
        }
    }
};