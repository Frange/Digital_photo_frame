class Particle {
    constructor(type, canvas) { 
        this.type = type; 
        this.canvas = canvas;
        this.reset(); 
    }

    reset() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        // Si el archivo específico (clouds.js, snow.js) tiene un reset, lo usa
        if (this.specificReset) {
            this.specificReset(w, h);
        }
    }

    draw(ctx) {
        // Si el archivo específico tiene un draw, lo usa
        if (this.specificDraw) {
            this.specificDraw(ctx);
        }
    }
}