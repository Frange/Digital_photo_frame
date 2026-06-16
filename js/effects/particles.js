const ParticleRegistry = {
    resets: {},
    draws: {}
};

class Particle {
    constructor(type, canvas) { 
        this.type = type; 
        this.canvas = canvas;
        this.isLittleRain = false;
        this.initialized = false; 
        this.reset(); 
    }

    reset() {
        if (!this.canvas) return;
        const w = this.canvas.width;
        const h = this.canvas.height;

        // 1. Intentar delegación absoluta al registro modular externo
        if (ParticleRegistry.resets[this.type]) {
            ParticleRegistry.resets[this.type].call(this, w, h);
            this.initialized = true;
        }
        // 2. CASO BASE NATIVO DE RESPALDO: Si el tipo es nieve o snow y falló el registro temporalmente
        else if (this.type === 'snow' || this.type === 'nieve') {
            this.x = Math.random() * w; 
            this.y = Math.random() * -h; 
            this.speed = 1.2 + Math.random() * 1.5;
            this.vx = Math.random() - 0.5; 
            this.r = 1.5 + Math.random() * 2.5; 
            this.op = 0.5 + Math.random() * 0.4;
            this.initialized = true; // Forzamos inicialización completada
        }
    }

    draw(ctx) {
        if (!this.canvas) return;

        // Auto-reparación en caliente por si el script tardó milisegundos en cargar
        if (!this.initialized) {
            this.reset();
            if (!this.initialized) return; 
        }

        if (this.isLittleRain && typeof LittleRain !== 'undefined') {
            LittleRain.draw(this, ctx);
            return;
        }

        // Dibujado absoluto desde el registro modular
        if (ParticleRegistry.draws[this.type]) {
            ParticleRegistry.draws[this.type].call(this, ctx);
        }
    }
}