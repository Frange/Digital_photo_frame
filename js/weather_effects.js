const WeatherEffects = {
    canvas: null, 
    ctx: null, 
    particles: [], 
    demoIdx: 0, 
    currentMode: '', 
    isNight: false,
    animationFrameId: null, // Para poder detener la animación limpiamente

    init(canvasId) {
        // --- INTERRUPTOR DE SEGURIDAD ---
        if (typeof CONFIG !== 'undefined' && CONFIG.mostrarEfectos === false) {
            console.log("WeatherEffects: Desactivados por CONFIG para ahorrar recursos.");
            return;
        }

        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return; 
        
        this.ctx = this.canvas.getContext('2d');
        window.addEventListener('resize', () => this.resize());
        this.resize();
        
        this.currentMode = "Cargando...";
        this.animate();

        if (typeof CONFIG !== 'undefined' && CONFIG.isDemo) {
            console.log("Modo DEMO activo");
            setInterval(() => {
                // Solo avanzamos si los efectos siguen activos
                if (CONFIG.mostrarEfectos !== false) {
                    this.demoIdx = (this.demoIdx + 1) % CONFIG.demoModos.length;
                    this.setEffect(CONFIG.demoModos[this.demoIdx]);
                }
            }, CONFIG.tiempos.demoEfecto);
        }
    },

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    setEffect(m) {
        // Bloqueo si los efectos están desactivados
        if (typeof CONFIG !== 'undefined' && CONFIG.mostrarEfectos === false) return;
        if (!m || this.currentMode === m) return;

        console.log("Canvas recibiendo nuevo efecto:", m);
        this.currentMode = m;
        const low = m.toLowerCase();
        this.particles = [];
        this.isNight = low.includes('noche');
        
        const cfg = CONFIG.efectos;
        
        const tag = document.getElementById('status-tag');
        if (tag) tag.innerText = m.toUpperCase();

        // 1. Estrellas
        if (this.isNight) {
            for (let i = 0; i < (cfg.estrellasCantidad || 400); i++) {
                this.particles.push(new Particle('star', this.canvas));
            }
        }

        // 2. Niebla
        if (low.includes('niebla')) {
            for (let i = 0; i < (cfg.nieblaCantidad || 50); i++) {
                this.particles.push(new Particle('fog', this.canvas));
            }
        }

        // 3. Nubes
        if (low.includes('nubes') || low.includes('tormenta') || low.includes('nublado')) {
            for (let i = 0; i < (cfg.nubesCantidad || 100); i++) {
                this.particles.push(new Particle('cloud', this.canvas));
            }
        }
        
        // 4. Lluvia / Llovizna
        if (low.includes('llovizna')) {
            const cant = (typeof LittleRain !== 'undefined') ? LittleRain.params.cantidad : 20; 
            for (let i = 0; i < cant; i++) {
                const p = new Particle('rain', this.canvas); 
                if (typeof LittleRain !== 'undefined') {
                    LittleRain.patch(p, this.canvas.width, this.canvas.height);
                }
                this.particles.push(p);
            }
        } 
        else if (low.includes('lluvia') || low.includes('chubasco')) {
            for (let i = 0; i < (cfg.lluviaCantidad || 550); i++) {
                this.particles.push(new Particle('rain', this.canvas));
            }
        }

        // 5. Granizo
        if (low.includes('granizo')) {
            for (let i = 0; i < (cfg.granizoCantidad || 150); i++) {
                this.particles.push(new Particle('hail', this.canvas));
            }
        }

        // 6. Nieve
        if (low.includes('nieve')) {
            for (let i = 0; i < (cfg.nieveCantidad || 400); i++) {
                this.particles.push(new Particle('snow', this.canvas));
            }
        }

        // 7. Viento
        if (low.includes('viento')) {
            for (let i = 0; i < 40; i++) {
                this.particles.push(new Particle('wind', this.canvas));
            }
        }
    },

    animate() {
        // Bloqueo total del bucle de animación si se desactivan los efectos
        if (typeof CONFIG !== 'undefined' && CONFIG.mostrarEfectos === false) {
            if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            cancelAnimationFrame(this.animationFrameId);
            return;
        }

        this.animationFrameId = requestAnimationFrame(() => {
            const w = this.canvas.width;
            const h = this.canvas.height;
            this.ctx.clearRect(0, 0, w, h);
            const low = this.currentMode.toLowerCase();
            const cfg = CONFIG.efectos;

            // Dibujar fondo nocturno
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

            // Efecto Sol
            if ((low.includes('sol') || low.includes('despejado')) && !this.isNight) {
                if (typeof SunEffect !== 'undefined') SunEffect.draw(this.ctx, w, h);
            }

            // Efecto Tormenta
            if (low.includes('tormenta') && typeof StormEffect !== 'undefined') {
                StormEffect.draw(this.ctx, w, h);
            }
            
            // Efecto Nieve (Muñeco u otros)
            if (low.includes('nieve') && typeof SnowmanEffect !== 'undefined') {
                SnowmanEffect.draw(this.ctx, w, h);
            }

            // Partículas
            this.particles.forEach(p => p.draw(this.ctx));
            
            // Continuar bucle
            this.animate();
        });
    }
};

window.setEffect = function(mode) {
    WeatherEffects.setEffect(mode);
};