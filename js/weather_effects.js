const WeatherEffects = {
    canvas: null, ctx: null, particles: [], stars: [],
    demoIdx: 0, angle: 0, currentMode: '', isNight: false,

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        window.addEventListener('resize', () => this.resize());
        this.resize();
        this.setEffect(CONFIG.demoModos[0]);
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
        this.stars = [];
        const num = CONFIG.efectos.estrellasCantidad || 400;
        for(let i=0; i<num; i++) {
            this.stars.push({ 
                dist: Math.random() * this.canvas.width, 
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
        
        const tag = document.getElementById('status-tag');
        if(tag) tag.innerText = m.toUpperCase();

        // Lógica de creación (Detección estricta)
        if(low.includes('nubes')) {
            for(let i=0; i < CONFIG.efectos.nubesCantidad; i++) this.particles.push(new Particle('cloud', this.canvas));
        }
        if(low.includes('lluvia') || low.includes('tormenta')) {
            for(let i=0; i < CONFIG.efectos.lluviaCantidad; i++) this.particles.push(new Particle('rain', this.canvas));
        }
        if(low.includes('nieve')) {
            for(let i=0; i < CONFIG.efectos.nieveCantidad; i++) this.particles.push(new Particle('snow', this.canvas));
        }
        if(low.includes('niebla')) {
            for(let i=0; i < 60; i++) this.particles.push(new Particle('fog', this.canvas));
        }
        if(low.includes('viento')) {
            for(let i=0; i < 40; i++) this.particles.push(new Particle('wind', this.canvas));
        }
    },

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const low = this.currentMode.toLowerCase();
        
        if(this.isNight) {
            // CIELO MUCHO MÁS OSCURO (Negro puro con profundidad)
            let sky = this.ctx.createLinearGradient(0,0,0,this.canvas.height * 0.9);
            sky.addColorStop(0, 'rgba(0,0,0,1)'); // Negro absoluto
            sky.addColorStop(0.3, 'rgba(0,0,15,0.9)'); // Azul profundo sutil
            sky.addColorStop(1, 'rgba(0,0,0,0)');
            this.ctx.fillStyle = sky; 
            this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
            
            this.angle += 0.0003;
            this.stars.forEach(s => {
                const curA = s.angle + this.angle;
                const x = (this.canvas.width/2) + Math.cos(curA) * s.dist;
                const y = -100 + Math.sin(curA) * s.dist; // Solo rotan arriba
                if (y > 0 && y < this.canvas.height * 0.6) {
                    this.ctx.fillStyle = "rgba(255,255,255," + (0.2 + Math.abs(Math.sin(Date.now()*0.001 + s.o))) + ")";
                    this.ctx.beginPath(); this.ctx.arc(x, y, s.s, 0, Math.PI*2); this.ctx.fill();
                }
            });
        }

        // Dibujar Efectos Estáticos
        if(low.includes('sol')) SunEffect.draw(this.ctx, this.canvas.width, this.canvas.height);
        if(low.includes('tormenta')) StormEffect.draw(this.ctx, this.canvas.width, this.canvas.height);
        if(low.includes('nieve')) SnowmanEffect.draw(this.ctx, this.canvas.width, this.canvas.height);

        // Dibujar Partículas
        this.particles.forEach(p => p.draw(this.ctx));
        
        requestAnimationFrame(() => this.animate());
    }
};