import { SunEffect } from './effects/sun.js';
import { StormEffect } from './effects/storm.js';
import { SnowmanEffect } from './effects/snow.js';
import { Particle } from './effects/particles.js';

const WeatherManager = {
    canvas: null, ctx: null, particles: [], stars: [],
    demoIdx: 0, angle: 0, currentMode: '',

    modes: [
        'Día: Sol', 'Día: Sol con nubes', 'Día: Lluvia', 'Día: Tormenta y Lluvia', 
        'Día: Niebla', 'Día: Nieve', 'Día: Viento fuerte', 'Noche: Limpio', 
        'Noche: Nubes', 'Noche: Lluvia', 'Noche: Lluvia y Tormenta', 
        'Noche: Niebla', 'Noche: Nieve', 'Noche: Viento fuerte'
    ],

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        window.addEventListener('resize', () => this.resize());
        this.resize();
        this.setEffect(this.modes[0]);
        this.animate();
        
        setInterval(() => {
            this.demoIdx = (this.demoIdx + 1) % this.modes.length;
            this.setEffect(this.modes[this.demoIdx]);
        }, 20000);
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.stars = [];
        for(let i=0; i<200; i++) {
            this.stars.push({
                dist: Math.random() * this.canvas.width + 200,
                angle: Math.random() * Math.PI * 2,
                s: Math.random() * 1.5,
                o: Math.random()
            });
        }
    },

    setEffect(m) {
        this.currentMode = m;
        this.particles = [];
        this.isNight = m.includes('Noche');
        const tag = document.getElementById('status-tag');
        if(tag) tag.innerText = m.toUpperCase();

        if(m.includes('nubes')) for(let i=0; i<80; i++) this.particles.push(new Particle('cloud', this.canvas));
        if(m.includes('Lluvia') || m.includes('Tormenta')) for(let i=0; i<300; i++) this.particles.push(new Particle('rain', this.canvas));
        if(m.includes('Nieve')) for(let i=0; i<200; i++) this.particles.push(new Particle('snow', this.canvas));
        if(m.includes('Niebla')) for(let i=0; i<60; i++) this.particles.push(new Particle('fog', this.canvas));
        if(m.includes('Viento')) for(let i=0; i<40; i++) this.particles.push(new Particle('wind-cloud', this.canvas));
    },

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if(this.isNight) {
            // Cielo nocturno y estrellas...
            let sky = this.ctx.createLinearGradient(0,0,0,this.canvas.height * 0.5);
            sky.addColorStop(0, 'rgba(0,0,30,0.8)'); sky.addColorStop(1, 'rgba(0,0,0,0)');
            this.ctx.fillStyle = sky; this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
            this.angle += 0.0005;
            this.stars.forEach(s => {
                const curA = s.angle + this.angle;
                const x = (this.canvas.width/2) + Math.cos(curA) * s.dist;
                const y = (this.canvas.height) + Math.sin(curA) * s.dist;
                this.ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.abs(Math.sin(Date.now()*0.001 + s.o))})`;
                this.ctx.beginPath(); this.ctx.arc(x, y, s.s, 0, Math.PI*2); this.ctx.fill();
            });
        }

        if(this.currentMode.includes('Sol')) SunEffect.draw(this.ctx, this.canvas.width, this.canvas.height);
        if(this.currentMode.includes('Tormenta')) StormEffect.draw(this.ctx, this.canvas.width, this.canvas.height);
        if(this.currentMode.includes('Nieve')) SnowmanEffect.draw(this.ctx, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => p.draw(this.ctx, this.isNight));
        requestAnimationFrame(() => this.animate());
    }
};

WeatherManager.init('weather-canvas');