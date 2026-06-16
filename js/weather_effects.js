const WeatherEffects = {
    canvas: null, 
    ctx: null, 
    particles: [], 
    demoIdx: 0, 
    currentMode: '', 
    isNight: false,
    animationFrameId: null,
    lastTime: 0,
    demoIntervalId: null, // Evita duplicar hilos de demo en memoria

    init(canvasId) {
        if (typeof CONFIG !== 'undefined' && CONFIG.mostrarEfectos === false) {
            console.log("WeatherEffects: Desactivados por CONFIG para ahorrar recursos.");
            return;
        }

        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return; 
        
        this.ctx = this.canvas.getContext('2d');
        window.removeEventListener('resize', () => this.resize());
        window.addEventListener('resize', () => this.resize());
        this.resize();
        
        this.lastTime = performance.now();
        this.animate(this.lastTime);

        if (this.demoIntervalId) clearInterval(this.demoIntervalId);

        if (typeof CONFIG !== 'undefined' && CONFIG.isDemo) {
            console.log("Modo DEMO activo");
            
            // CORREGIDO: Forzamos la carga del primer efecto (index 0) inmediatamente al arrancar
            this.demoIdx = 0;
            this.setEffect(CONFIG.demoModos[this.demoIdx]);

            this.demoIntervalId = setInterval(() => {
                if (CONFIG.mostrarEfectos !== false) {
                    // Avanza al siguiente índice de forma correcta
                    this.demoIdx = (this.demoIdx + 1) % CONFIG.demoModos.length;
                    this.setEffect(CONFIG.demoModos[this.demoIdx]);
                }
            }, CONFIG.tiempos.demoEfecto || 20000);
        }
    },

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    setEffect(m) {
        if (typeof CONFIG !== 'undefined' && CONFIG.mostrarEfectos === false) return;
        if (!m || this.currentMode === m) return;

        console.log("Canvas recibiendo nuevo efecto:", m);
        this.currentMode = m;
        const low = m.toLowerCase();
        this.particles = [];
        this.isNight = low.includes('noche');
        
        const cfg = CONFIG.efectos || {};
        
        const tag = document.getElementById('status-tag');
        if (tag) tag.innerText = m.toUpperCase();

        if (typeof Particle === 'undefined') {
            console.error("Falta la clase Particle en el entorno global.");
            return;
        }

        // 1. Estrellas (Noche)
        if (this.isNight) {
            for (let i = 0; i < (cfg.estrellasCantidad || 400); i++) {
                this.particles.push(new Particle('star', this.canvas));
            }
        }

        // 2. Niebla / Neblina
        if (low.includes('niebla') || low.includes('neblina')) {
            for (let i = 0; i < (cfg.nieblaCantidad || 50); i++) {
                this.particles.push(new Particle('fog', this.canvas));
            }
        }

        // 3. Nubes / Nublado / Tormenta (Todas llevan nubes de fondo)
        if (low.includes('nubes') || low.includes('tormenta') || low.includes('nublado')) {
            for (let i = 0; i < (cfg.nubesCantidad || 30); i++) {
                this.particles.push(new Particle('cloud', this.canvas));
            }
        }
        
        // 4. Lluvia / Llovizna / Tormenta (La tormenta también genera lluvia pesada)
        if (low.includes('llovizna')) {
            const cant = (typeof LittleRain !== 'undefined') ? LittleRain.params.cantidad : 40; 
            for (let i = 0; i < cant; i++) {
                const p = new Particle('rain', this.canvas); 
                if (typeof LittleRain !== 'undefined') {
                    LittleRain.patch(p, this.canvas.width, this.canvas.height);
                }
                this.particles.push(p);
            }
        } 
        // Modificado: Si incluye 'lluvia', 'chubasco' O 'tormenta', se generan las gotas
        else if (low.includes('lluvia') || low.includes('chubasco') || low.includes('tormenta')) {
            for (let i = 0; i < (cfg.lluviaCantidad || 250); i++) {
                this.particles.push(new Particle('rain', this.canvas));
            }
        }

        // 5. Granizo (Piedras de hielo verticales)
        if (low.includes('granizo')) {
            for (let i = 0; i < (cfg.granizoCantidad || 40); i++) {
                this.particles.push(new Particle('granizo', this.canvas));
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

        // 8. Tormenta Eléctrica (Inyectamos la partícula controladora de rayos)
        if (low.includes('tormenta')) {
            this.particles.push(new Particle('storm', this.canvas));
        }
    },

    animate(currentTime) {
        if (typeof CONFIG !== 'undefined' && CONFIG.mostrarEfectos === false) {
            if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            cancelAnimationFrame(this.animationFrameId);
            return;
        }

        this.animationFrameId = requestAnimationFrame((time) => this.animate(time));

        // --- LIMITADOR A 30 FPS PROTEGIDO ---
        const delta = currentTime - this.lastTime;
        if (!delta || delta < 32) return; 
        this.lastTime = currentTime;

        const w = this.canvas.width;
        const h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);
        
        const low = this.currentMode.toLowerCase();
        const cfg = CONFIG.efectos || {};

        // Filtro nocturno ambiental
        if (this.isNight) {
            const hLimite = cfg.nocheAlturaLimite || 0.40;
            const grad = this.ctx.createLinearGradient(0, 0, 0, h * hLimite);
            const osc = cfg.nocheOscuridad || 0.4;
            
            grad.addColorStop(0, `rgba(5, 10, 30, ${osc})`);
            grad.addColorStop(1, 'rgba(5, 10, 30, 0)'); 
            
            this.ctx.fillStyle = grad;
            this.ctx.fillRect(0, 0, w, h * hLimite); 
        }

        // Efecto del Sol (Solo de día si está despejado o con nubes sueltas, no en tormentas)
        if ((low.includes('sol') || low.includes('despejado') || low.includes('nubes')) && !this.isNight && !low.includes('tormenta')) {
            if (typeof SunEffect !== 'undefined') SunEffect.draw(this.ctx, w, h);
        }
        
        // Efecto acumulativo del suelo de nieve si aplica
        if (low.includes('nieve') && typeof SnowmanEffect !== 'undefined') {
            SnowmanEffect.draw(this.ctx, w, h);
        }

        // EL CORE CENTRAL RENDEREA TODO: Nubes, Lluvia, Granizo, Rayos y Niebla ordenadamente
        this.particles.forEach(p => {
            if (p && typeof p.draw === 'function') {
                p.draw(this.ctx);
            }
        });
    }
};

window.setEffect = function(mode) {
    WeatherEffects.setEffect(mode);
};