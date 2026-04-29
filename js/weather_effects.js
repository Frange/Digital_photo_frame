const WeatherEffects = {
    canvas: null, 
    ctx: null, 
    particles: [], 
    stars: [],
    demoIdx: 0, // Añadido para el control de la demo
    angle: 0, 
    currentMode: '', 
    isNight: false,

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return; // Si no hay canvas, no hace nada
        
        this.ctx = this.canvas.getContext('2d');
        window.addEventListener('resize', () => this.resize());
        this.resize();
        
        // Iniciar el primer efecto
        if (CONFIG.demoModos && CONFIG.demoModos.length > 0) {
            this.setEffect(CONFIG.demoModos[0]);
        }

        this.animate();

        // RE-ACTIVAR MODO DEMO: Cambia el clima cada X tiempo
        if (CONFIG.isDemo) {
            setInterval(() => {
                this.demoIdx = (this.demoIdx + 1) % CONFIG.demoModos.length;
                this.setEffect(CONFIG.demoModos[this.demoIdx]);
            }, CONFIG.tiempos.demoEfecto);
        }
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.stars = [];
        for(let i=0; i<400; i++) {
            this.stars.push({ 
                dist: Math.random() * this.canvas.width * 1.5, 
                angle: Math.random() * Math.PI * 2, 
                s: Math.random() * 1.5, 
                o: Math.random() 
            });
        }
    },

    setEffect(m) {
        this.currentMode = m;
        const low = m.toLowerCase();
        this.particles = [];
        this.isNight = low.includes('noche');
        
        // --- ARREGLO DE ETIQUETAS (Texto en pantalla) ---
        const tag = document.getElementById('status-tag');
        if (tag) {
            tag.innerText = m.toUpperCase();
        }

        const cfg = CONFIG.efectos;
        if(low.includes('nubes') || low.includes('tormenta')) {
            for(let i=0; i<cfg.nubesCantidad; i++) this.particles.push(new Particle('cloud', this.canvas));
        }
        if(low.includes('lluvia')) {
            for(let i=0; i<cfg.lluviaCantidad; i++) this.particles.push(new Particle('rain', this.canvas));
        }
        if(low.includes('granizo')) {
            for(let i=0; i<cfg.granizoCantidad; i++) this.particles.push(new Particle('hail', this.canvas));
        }
        if(low.includes('nieve')) {
            for(let i=0; i<cfg.nieveCantidad; i++) this.particles.push(new Particle('snow', this.canvas));
        }
        if(low.includes('niebla')) {
            for(let i=0; i<60; i++) this.particles.push(new Particle('fog', this.canvas));
        }
        if(low.includes('viento')) {
            for(let i=0; i<40; i++) this.particles.push(new Particle('wind', this.canvas));
        }
    },

    animate() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);
        const low = this.currentMode.toLowerCase();
        const cfg = CONFIG.efectos;

        // 1. FONDO NOCTURNO (Estrellas Cóncavas)
        if(this.isNight) {
            this.angle += cfg.estrellasRotacion;
            this.stars.forEach(s => {
                const curA = s.angle + this.angle;
                const x = (w / 2) + Math.cos(curA) * s.dist;
                const y = (h * -0.4) + Math.sin(curA) * s.dist; 

                if (y > 0 && y < h * 0.7) {
                    const blink = 0.2 + Math.abs(Math.sin(Date.now() * cfg.estrellasParpadeo + s.o * 10));
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${blink})`;
                    this.ctx.beginPath(); this.ctx.arc(x, y, s.s, 0, Math.PI*2); this.ctx.fill();
                }
            });
        }

        // 2. EFECTOS DE FONDO (Sol y Tormenta con protección)
        if(low.includes('sol') && typeof SunEffect !== 'undefined') SunEffect.draw(this.ctx, w, h);
        if(low.includes('tormenta') && typeof StormEffect !== 'undefined') StormEffect.draw(this.ctx, w, h);
        
        // 3. MUÑECO DE NIEVE
        if(low.includes('nieve') && typeof SnowmanEffect !== 'undefined') {
            SnowmanEffect.draw(this.ctx, w, h);
        }

        // 4. PARTÍCULAS (Encima de todo)
        this.particles.forEach(p => p.draw(this.ctx));
        
        requestAnimationFrame(() => this.animate());
    }
};