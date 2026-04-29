const WeatherEffects = {
    canvas: null, 
    ctx: null, 
    particles: [], 
    demoIdx: 0, 
    currentMode: '', 
    isNight: false,

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return; 
        
        this.ctx = this.canvas.getContext('2d');
        window.addEventListener('resize', () => this.resize());
        this.resize();
        
        if (CONFIG.demoModos && CONFIG.demoModos.length > 0) {
            this.setEffect(CONFIG.demoModos[0]);
        }

        this.animate();

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
    },

    setEffect(m) {
        this.currentMode = m;
        const low = m.toLowerCase();
        this.particles = [];
        this.isNight = low.includes('noche');
        
        const cfg = typeof CONFIG !== 'undefined' ? CONFIG.efectos : {};
        const tag = document.getElementById('status-tag');
        if (tag) tag.innerText = m.toUpperCase();

        // 1. CREACIÓN DE ESTRELLAS
        if (this.isNight) {
            const cant = cfg.estrellasCantidad || 200;
            for (let i = 0; i < cant; i++) {
                this.particles.push(new Particle('star', this.canvas));
            }
        }

        // 2. OTROS EFECTOS
        if(low.includes('nubes') || low.includes('tormenta')) {
            for(let i=0; i<(cfg.nubesCantidad||0); i++) this.particles.push(new Particle('cloud', this.canvas));
        }
        if(low.includes('lluvia')) {
            for(let i=0; i<(cfg.lluviaCantidad||0); i++) this.particles.push(new Particle('rain', this.canvas));
        }
        if(low.includes('granizo')) {
            for(let i=0; i<(cfg.granizoCantidad||0); i++) this.particles.push(new Particle('hail', this.canvas));
        }
        if(low.includes('nieve')) {
            for(let i=0; i<(cfg.nieveCantidad||0); i++) this.particles.push(new Particle('snow', this.canvas));
        }
        if(low.includes('niebla')) {
            for(let i=0; i<(cfg.nieblaCantidad||0); i++) this.particles.push(new Particle('fog', this.canvas));
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

        // 1. AMBIENTE NOCTURNO (Directo, a prueba de fallos)
        if (this.isNight) {
            // Fondo oscuro asegurado
            const grad = this.ctx.createLinearGradient(0, 0, 0, h * 0.75);
            grad.addColorStop(0, "rgba(0, 5, 25, 0.95)"); // Cielo profundo
            grad.addColorStop(0.5, "rgba(10, 20, 45, 0.6)"); // Transición
            grad.addColorStop(1, "rgba(0, 0, 0, 0)");     // Suelo transparente
            this.ctx.fillStyle = grad;
            this.ctx.fillRect(0, 0, w, h);

            // Llamada a estrellas fugaces
            if (typeof NightEffect !== 'undefined' && NightEffect.handleShootingStar) {
                NightEffect.handleShootingStar(this.ctx, w, h);
            }
        }

        // 2. EFECTOS DE FONDO EXTRA
        if(low.includes('sol') && typeof SunEffect !== 'undefined') SunEffect.draw(this.ctx, w, h);
        if(low.includes('tormenta') && typeof StormEffect !== 'undefined') StormEffect.draw(this.ctx, w, h);
        
        // 3. MUÑECO DE NIEVE
        if(low.includes('nieve') && typeof SnowmanEffect !== 'undefined') {
            SnowmanEffect.draw(this.ctx, w, h);
        }

        // 4. PARTÍCULAS (Estrellas, nieve, etc)
        this.particles.forEach(p => p.draw(this.ctx));
        
        requestAnimationFrame(() => this.animate());
    }
};