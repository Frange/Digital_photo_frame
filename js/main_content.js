const MainContent = {
    currentIdx: 0,
    datosCabanillas: null,
    nextFunnyTime: 0,
    activeTimeout: null,
    funnyQueue: [],
    // Añadimos array para las fotos de fondo
    fotos: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"],

    getAnnouncerConfig() {
        const inv = typeof ANNOUNCER_INVENTORY !== 'undefined' ? ANNOUNCER_INVENTORY : { funny: { count: 0, prefix: 'f' }, food: { count: 0, prefix: 'c' }, night: { count: 0, prefix: 'n' }, characters: { count: 0, prefix: 'p' } };
        const cfg = CONFIG.announcerSettings.durations;
        return {
            funny: { path: `announcers/funny/${inv.funny.prefix}`, count: inv.funny.count, duration: cfg.funny * 1000 },
            food: { path: `announcers/food/${inv.food.prefix}`, count: inv.food.count, duration: cfg.food * 1000 },
            night: { path: `announcers/night/${inv.night.prefix}`, count: inv.night.count, duration: cfg.night * 1000 },
            characters: { path: `announcers/characters/${inv.characters.prefix}`, count: inv.characters.count, duration: cfg.characters * 1000 }
        };
    },

    init() {
        console.log("MainContent: Iniciando...");
        this.announcers = this.getAnnouncerConfig();
        
        // 1. Iniciar el carrusel de fondo inmediatamente
        this.updateBackground();
        setInterval(() => this.updateBackground(), CONFIG.tiempos.foto);

        // 2. Reloj
        this.updateClock(); 
        setInterval(() => this.updateClock(), 1000);
        
        // 3. Datos y clima
        this.updateAllData();
        setInterval(() => this.updateAllData(), CONFIG.tiempos.climaAPI);
        this.scheduleNextFunny();
    },

    // FUNCIÓN RECUPERADA: Gestiona el cambio de imagen de fondo
    updateBackground() {
        const bgData = document.getElementById('bg-data');
        if (!bgData) return;

        // Efecto de desvanecimiento suave
        bgData.style.opacity = '0';
        
        setTimeout(() => {
            const foto = this.fotos[this.currentIdx];
            bgData.style.backgroundImage = `url('${CONFIG.rutaFotos}${foto}')`;
            bgData.style.opacity = '1';
            
            this.currentIdx = (this.currentIdx + 1) % this.fotos.length;
        }, 1000); // Espera a que la opacidad baje para cambiar la imagen
    },

    updateClock() {
        const d = new Date();
        const H = d.getHours();
        const M = d.getMinutes();
        const S = d.getSeconds();
        const HM = H * 100 + M;

        const timeEl = document.getElementById('time');
        const dateEl = document.getElementById('date');
        
        if (timeEl) timeEl.innerText = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        if (dateEl) dateEl.innerText = d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

        if (!CONFIG.announcerSettings.active) return;

        if (CONFIG.announcerSettings.demoMode) {
            if (S % 15 === 0) {
                const tipos = ['funny', 'food', 'night', 'characters'];
                this.show(tipos[Math.floor(Math.random() * tipos.length)]);
            }
            return; 
        }

        if (M === 59 && S === 50) {
            const pHora = (H + 1) % 24;
            this.show('characters', `Van a ser las ${pHora}:00`);
        }
        if (M === 0 && S === 0) {
            this.updateTextBubble(`¡Ya son las ${H}:00!`);
        }

        const foodInt = CONFIG.announcerSettings.frecuencias.foodInterval;
        if (((HM >= 1330 && HM <= 1430) || (HM >= 2020 && HM <= 2120)) && M % foodInt === 0 && S === 0 && M !== 0) {
            this.show('food', FRASES_ANNOUNCER.comida[Math.floor(Math.random() * FRASES_ANNOUNCER.comida.length)]);
        }

        const nightInt = CONFIG.announcerSettings.frecuencias.nightInterval;
        if (HM >= 2200 && HM <= 2300 && M % nightInt === 0 && S === 0 && M !== 0) {
            this.show('night', FRASES_ANNOUNCER.noche[Math.floor(Math.random() * FRASES_ANNOUNCER.noche.length)]);
        }

        if (Date.now() >= this.nextFunnyTime && this.nextFunnyTime !== 0) {
            if (!(M === 59 && S >= 50) && !(M === 0 && S <= 10)) {
                this.show('funny');
                this.scheduleNextFunny();
            }
        }
    },

    show(type, manualMessage = "") {
        const config = this.announcers[type];
        if (!config || config.count === 0) return;

        if (this.activeTimeout) {
            clearTimeout(this.activeTimeout);
            this.hide();
        }

        const el = document.getElementById('hourly-announcer');
        const img = document.getElementById('announcer-img');
        const bubble = el.querySelector('.bubble');
        const txt = document.getElementById('announcer-text');

        let idx = (type === 'funny' && this.funnyQueue.length > 0) ? this.funnyQueue.pop() : Math.floor(Math.random() * config.count) + 1;
        if (type === 'funny' && this.funnyQueue.length === 0) {
            this.funnyQueue = Array.from({length: config.count}, (_, i) => i + 1).sort(() => Math.random() - 0.5);
        }

        img.src = `./${config.path}${idx}.png`;
        
        const tempActual = this.datosCabanillas ? this.datosCabanillas.current.main.temp : 20;
        const horaActual = new Date().getHours();
        
        let mensajeFinal = manualMessage || FRASES_ANNOUNCER.obtenerFrase(tempActual, horaActual);
        
        txt.innerText = mensajeFinal;
        bubble.style.display = 'block';

        el.classList.add('announcer-visible');
        this.activeTimeout = setTimeout(() => this.hide(), config.duration);
    },

    hide() {
        const el = document.getElementById('hourly-announcer');
        if (el) el.classList.remove('announcer-visible');
        this.activeTimeout = null;
    },

    scheduleNextFunny() {
        const freq = CONFIG.announcerSettings.frecuencias;
        const min = freq.funnyMin * 60 * 1000;
        const max = freq.funnyMax * 60 * 1000;
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        this.nextFunnyTime = Date.now() + delay;
    },

    updateTextBubble(txt) {
        const el = document.getElementById('announcer-text');
        if (el) el.innerText = txt;
    },

    async fetchWeather(city) {
        const key = CONFIG.weather.key;
        try {
            const [curr, fore] = await Promise.all([
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${key}`).then(r => r.json()),
                fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=es&appid=${key}`).then(r => r.json())
            ]);
            return { current: curr, forecast: fore };
        } catch (e) { return null; }
    },

    async updateAllData() {
        const data = await this.fetchWeather(CONFIG.weather.city1);
        if (data) { this.datosCabanillas = data; this.renderAll(); }
    },

    renderAll() {
        const data = this.datosCabanillas;
        if (!data || !data.current) return;
        document.getElementById('temp-big').innerText = Math.round(data.current.main.temp) + "ºC";
        document.getElementById('weather-status').innerText = data.current.weather[0].description.toUpperCase();
        document.getElementById('main-icon').innerHTML = this.getIcon(data.current.weather[0].icon);
        this.renderHourly(data.forecast.list);
    },

    renderHourly(list) {
        const container = document.getElementById('hourly-container');
        if (!container) return;
        const nextHours = list.slice(0, 4);
        container.innerHTML = nextHours.map(h => {
            const time = new Date(h.dt * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            return `<div class="h-item"><div class="h-text-group"><span class="h-time">${time}</span><span class="h-temp">${Math.round(h.main.temp)}º</span></div><span class="h-icon">${this.getIcon(h.weather[0].icon)}</span></div>`;
        }).join('');
    },

    getIcon(code) {
        const icons = { "01d": "☀️", "01n": "🌙", "02d": "⛅", "02n": "☁️", "03d": "🌥️", "03n": "☁️", "04d": "☁️", "04n": "☁️", "09d": "🌧️", "09n": "🌧️", "10d": "🌧️", "10n": "🌧️", "11d": "⚡", "11n": "⚡", "13d": "❄️", "13n": "🌨️", "50d": "🌫️", "50n": "🌫️" };
        let emoji = icons[code] || "☀️";
        return ["01d", "01n", "11d", "11n"].includes(code) ? `<span style="color: #ffcc00;">${emoji}</span>` : emoji;
    }
};