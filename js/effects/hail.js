/**
 * EFECTO DE GRANIZO PRO: Caída Vertical Pesada
 */

var originalResetHail = Particle.prototype.specificReset;
Particle.prototype.specificReset = function(w, h) {
    if (originalResetHail) originalResetHail.apply(this, arguments);
    
    if (this.type === 'granizo' || this.type === 'hail') {
        const cfg = (typeof CONFIG !== 'undefined') ? CONFIG.efectos : {};
        
        // Posicionamiento
        this.x = Math.random() * w; 
        this.y = Math.random() * -h; // Empiezan fuera de la pantalla arriba
        
        // FÍSICA DE GRANIZO: Mucho más rápido que la nieve
        // Eliminamos vx para que la caída sea 100% vertical
        this.speed = (cfg.granizoVelocidad || 18) + Math.random() * 10;
        this.vx = 0; 
        
        // Tamaño: Bolas de hielo pequeñas pero visibles
        this.r = 1.5 + Math.random() * 2.5; 
        
        // Opacidad: Más sólida que la nieve
        this.op = 0.6 + Math.random() * 0.4;
    }
};

var originalDrawHail = Particle.prototype.specificDraw;
Particle.prototype.specificDraw = function(ctx) {
    if (originalDrawHail) originalDrawHail.apply(this, arguments);
    
    if (this.type === 'granizo' || this.type === 'hail') {
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.save();
        
        // Dibujamos el granizo con un ligero estiramiento vertical (Motion Blur)
        // Esto hace que se perciba la velocidad de caída
        ctx.fillStyle = "rgba(255, 255, 255, " + this.op + ")";
        ctx.beginPath();
        
        // En lugar de un círculo perfecto (arc), usamos una elipse estirada
        // o simplemente dibujamos el círculo; la velocidad hará el resto.
        // Si quieres que rebote, aquí es donde se complicaría, 
        // pero para el iPad 2, la caída vertical pura es lo más eficiente.
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        // Movimiento: Caída pura
        this.y += this.speed;

        // Reset al tocar el suelo
        if (this.y > h) {
            this.y = Math.random() * -100;
            this.x = Math.random() * w;
            // Al resetear, podemos variar ligeramente la velocidad para que no sea monótono
            this.speed = 18 + Math.random() * 10;
        }
    }
};