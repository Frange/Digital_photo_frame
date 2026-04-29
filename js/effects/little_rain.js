/**
 * littleRain.js 
 * Control de lluvia fina / llovizna
 */

const LittleRain = {
    // Configuramos los parámetros visuales aquí para no ensuciar el CONFIG global
    params: {
        cantidad: 40,      // Mucho menos que la lluvia normal
        velocidad: 6,       // Caída lenta
        longitud: 10,      // Gotas cortas
        opacidad: 0.6,     // Muy tenues
        grosor: 0.5        // Hilo fino
    },

    // Aplicar la física de llovizna a una partícula
    patch(particle, w, h) {
        particle.x = Math.random() * w;
        particle.y = Math.random() * -h;
        particle.speed = this.params.velocidad + Math.random() * 4;
        particle.len = this.params.longitud + Math.random() * 5;
        particle.op = this.params.opacidad + Math.random() * 0.1;
        particle.isLittleRain = true;
    },

    // El dibujo específico para este tipo de gota
    draw(p, ctx) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(174, 194, 224, ${p.op})`;
        ctx.lineWidth = this.params.grosor;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.len);
        ctx.stroke();
        
        p.y += p.speed;

        if (p.y > window.innerHeight) {
            this.patch(p, window.innerWidth, window.innerHeight);
        }
    }
};

// Inyectamos en el prototipo de Particle para que reconozca el nuevo tipo
// Esto hace que si la partícula tiene el flag 'isLittleRain', use este dibujo
const originalDraw = Particle.prototype.draw;
Particle.prototype.draw = function(ctx) {
    if (this.isLittleRain) {
        LittleRain.draw(this, ctx);
    } else {
        originalDraw.apply(this, arguments);
    }
};