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
        
        // MODIFICACIÓN: Ya no cargamos CONFIG.demoModos[0] por defecto.
        // Esperamos a que MainContent envíe el clima real.
        // Si quieres un estado inicial neutro hasta que cargue la API:
        this.currentMode = "Cargando...";

        this.animate();

        // Solo activamos el carrusel si el modo Demo está explícitamente en TRUE
        if (typeof CONFIG !== 'undefined' && CONFIG.isDemo) {
            console.log("Modo DEMO activo: Rotando efectos cada " + CONFIG.tiempos.demoEfecto + "ms");
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

    // Esta es la función que llama MainContent.js
    setEffect(m) {
        if (!m) return;
        
        // Si el efecto es el mismo que ya tenemos, no reiniciamos las partículas (evita parpadeos)
        if (this.currentMode === m) return;

        console.log("Canvas recibiendo nuevo efecto:", m);
        this.currentMode = m;
        const low = m.toLowerCase();
        this.particles = [];
        this.isNight = low.includes('noche');
        
        const cfg = CONFIG.efectos;
        
        // Actualizar etiqueta de estado si existe
        const tag = document.getElementById('status-tag');
        if (tag) tag.innerText = m.toUpperCase();

        // --- CREACIÓN DE PARTÍCULAS SEGÚN MODO REAL ---
        
        // Estrellas (Si es noche)
        if (this.isNight) {
            for (let i = 0; i < (cfg.estrellasCantidad || 400); i++) {
                this.particles.push(new Particle('star', this.canvas));
            }
        }

        // Niebla
        if (low.includes('niebla')) {
            for (let i = 0; i < (cfg.nieblaCantidad || 50); i++) {
                this.particles.push(new Particle('fog', this.canvas));
            }
        }

        // Nubes (Día o Noche)
        if (low.includes('nubes') || low.includes('tormenta') || low.includes('nublado')) {
            for (let i = 0; i < (cfg.nubesCantidad || 100); i++) {
                this.particles.push(new Particle('cloud', this.canvas));
            }
        }

        // Lluvia / Llovizna
        if (low.includes('lluvia') || low.includes('llovizna')) {
            for (let i = 0; i < (cfg.lluviaCantidad || 550); i++) {
                this.particles.push(new Particle('rain', this.canvas));
            }
        }

        // Granizo
        if (low.includes('granizo')) {
            for (let i = 0; i < (cfg.granizoCantidad || 150); i++) {
                this.particles.push(new Particle('hail', this.canvas));
            }
        }

        // Nieve
        if (low.includes('nieve')) {
            for (let i = 0; i < (cfg.nieveCantidad || 400); i++) {
                this.particles.push(new Particle('snow', this.canvas));
            }
        }

        // Viento
        if (low.includes('viento')) {
            for (let i = 0; i < 40; i++) {
                this.particles.push(new Particle('wind', this.canvas));
            }
        }
    },

    animate() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);
        const low = this.currentMode.toLowerCase();
        const cfg = CONFIG.efectos;

        // 1. FONDO DE NOCHE
        if (this.isNight) {
            const hLimite = cfg.nocheAlturaLimite || 0.65;
            const grad = this.ctx.createLinearGradient(0, 0, 0, h * hLimite);
            
            grad.addColorStop(0, `rgba(0, 2, 10, ${cfg.nocheOscuridad || 0.99})`);
            grad.addColorStop(0.5, `rgba(5, 10, 30, ${cfg.nocheTransparencia || 0.8})`);
            grad.addColorStop(1, "rgba(0, 0, 0, 0)");
            
            this.ctx.fillStyle = grad;
            this.ctx.fillRect(0, 0, w, h);

            if (typeof NightEffect !== 'undefined') {
                NightEffect.handleShootingStar(this.ctx, w, h);
            }
        }

        // 2. EFECTOS ESPECIALES DE FONDO (SOL, RAYOS, MUÑECOS)
        if ((low.includes('sol') || low.includes('despejado')) && !this.isNight) {
            if (typeof SunEffect !== 'undefined') SunEffect.draw(this.ctx, w, h);
        }

        if (low.includes('tormenta') && typeof StormEffect !== 'undefined') {
            StormEffect.draw(this.ctx, w, h);
        }
        
        if (low.includes('nieve') && typeof SnowmanEffect !== 'undefined') {
            SnowmanEffect.draw(this.ctx, w, h);
        }

        // 3. DIBUJO DE PARTÍCULAS
        this.particles.forEach(p => p.draw(this.ctx));
        
        requestAnimationFrame(() => this.animate());
    }
};

// Función global de puente (para que MainContent.js pueda llamarla fácilmente)
window.setEffect = function(mode) {
    WeatherEffects.setEffect(mode);
};