class Particle {
    constructor(type, canvas) { 
        this.type = type; 
        this.canvas = canvas;
        this.reset(); 
    }

    reset() {
        var w = this.canvas.width;
        var h = this.canvas.height;
        // Posición inicial común
        this.x = Math.random() * (w + 600) - 300;
        
        // Llamamos al reset específico del tipo
        if (typeof this.specificReset === 'function') {
            this.specificReset(w, h);
        }
    }

    draw(ctx) {
        // Llamamos al dibujo específico del tipo
        if (typeof this.specificDraw === 'function') {
            this.specificDraw(ctx);
        }

        // Lógica de salida de pantalla (limpieza)
        if (this.y > this.canvas.height + 150 || this.x > this.canvas.width + 650) {
            this.reset();
        }
    }
}