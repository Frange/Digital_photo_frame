const MainContent = {
    currentIdx: 0,
    datosCabanillas: null,
    nextFunnyTime: 0,
    nextCharacterTime: 0,
    activeTimeout: null,
    funnyQueue: [],
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
        
        this.updateBackground();
        setInterval(() => this.updateBackground(), CONFIG.tiempos.foto);

        this.updateClock(); 
        setInterval(() => this.updateClock(), 1000);
        
        this.updateAllData();
        setInterval(() => this.updateAllData(), CONFIG.tiempos.climaAPI);
        
        this.scheduleNextFunny();
        this.scheduleNextCharacter(); // <--- Inicializa el primer salto
    },

    updateBackground() {
        const bgData = document.getElementById('bg-data');
        if (!bgData) return;
        bgData.style.opacity = '0';
        setTimeout(() => {
            const foto = this.fotos[this.currentIdx];
            bgData.style.backgroundImage = `url('${CONFIG.rutaFotos}${foto}')`;
            bgData.style.opacity = '1';
            this.currentIdx = (this.currentIdx + 1) % this.fotos.length;
        }, 1000);
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

        // MODO DEMO
        if (CONFIG.announcerSettings.demoMode) {
            if (S % 15 === 0) {
                const tipos = ['funny', 'food', 'night', 'characters'];
                this.show(tipos[Math.floor(Math.random() * tipos.length)]);
            }
            return; 
        }

        // CAMBIO DE HORA
        if (M === 59 && S === 50) {
            const pHora = (H + 1) % 24;
            this.show('characters', `Van a ser las ${pHora}:00`);
        }
        if (M === 0 && S === 0) {
            this.updateTextBubble(`¡Ya son las ${H}:00!`);
        }

        // COMIDA
        const foodInt = CONFIG.announcerSettings.frecuencias.foodInterval;
        if (((HM >= 1330 && HM <= 1430) || (HM >= 2020 && HM <= 2120)) && M % foodInt === 0 && S === 0 && M !== 0) {
            const fraseC = FRASES_ANNOUNCER.comida[Math.floor(Math.random() * FRASES_ANNOUNCER.comida.length)];
            this.show('food', fraseC);
        }

        // NOCHE
        const nightInt = CONFIG.announcerSettings.frecuencias.nightInterval;
        if (HM >= 2200 && HM <= 2300 && M % nightInt === 0 && S === 0 && M !== 0) {
            const fraseN = FRASES_ANNOUNCER.noche[Math.floor(Math.random() * FRASES_ANNOUNCER.noche.length)];
            this.show('night', fraseN);
        }

        // CHARACTERS (TIEMPO ALEATORIO)
        if (Date.now() >= this.nextCharacterTime && this.nextCharacterTime !== 0) {
            // Evitamos que pise el cambio de hora (minuto 59 y minuto 0)
            if (!(M === 59 && S >= 50) && !(M === 0 && S <= 10)) {
                this.show('characters');
                this.scheduleNextCharacter();
            }
        }
    },

show(type, manualMessage = "") {
    const filtros = CONFIG.announcerSettings.filtros;
    
    // 1. Selección de serie
    let seriesDisponibles = [];
    if (filtros.isAll) {
        seriesDisponibles = Object.keys(FRASES_ANNOUNCER).filter(s => 
            !['personajes', 'obtenerFrase', 'clima', 'horarios'].includes(s)
        );
    } else {
        if (filtros.isSimpsons) seriesDisponibles.push('simpsons');
        if (filtros.isFuturama) seriesDisponibles.push('futurama');
        if (filtros.isSouthPark) seriesDisponibles.push('southpark');
    }

    if (seriesDisponibles.length === 0) return;
    const serieElegida = seriesDisponibles[Math.floor(Math.random() * seriesDisponibles.length)];

    // 2. Selección de Personaje Visual
    const categorias = Object.keys(FRASES_ANNOUNCER[serieElegida]).filter(c => 
        !['fotos', 'clima', 'horarios', 'genericos'].includes(c)
    );
    const personajeAleatorio = categorias[Math.floor(Math.random() * categorias.length)];

    // 3. Lógica de Mensaje (Mezcla de frases)
    let mensajeFinal = manualMessage;
    
    if (!mensajeFinal) {
        // Creamos una bolsa con todas las frases de la serie
        const bolsaFrases = [
            ...(FRASES_ANNOUNCER[serieElegida][personajeAleatorio] || []), // Propias
            ...(FRASES_ANNOUNCER[serieElegida].genericos || []),           // Genéricas
            ...(FRASES_ANNOUNCER[serieElegida].clima || []),              // Clima
            ...(FRASES_ANNOUNCER[serieElegida].horarios || [])            // Horarios
        ];
        
        mensajeFinal = bolsaFrases[Math.floor(Math.random() * bolsaFrases.length)];
    }

    // 4. Lógica de Imagen (Basada en fotos.js)
    const mapaFotos = FRASES_ANNOUNCER[serieElegida].fotos || { default: 1 };
    const max = mapaFotos[personajeAleatorio] || mapaFotos.default || 1;
    const numFoto = Math.floor(Math.random() * max) + 1;
    const prefijo = (personajeAleatorio === 'genericos') ? 's' : personajeAleatorio;
    const rutaImagen = `./announcers/characters/${serieElegida}/${prefijo}${numFoto}.png`;

    // 5. Ejecución Visual
    const img = document.getElementById('announcer-img');
    const txt = document.getElementById('announcer-text');
    const el = document.getElementById('hourly-announcer');
    const bubble = el.querySelector('.bubble');

    txt.innerText = mensajeFinal;
    img.src = rutaImagen;

    img.onload = () => {
        bubble.style.display = 'block';
        el.classList.add('announcer-visible');
    };

    img.onerror = () => {
        const rutaBackup = `./announcers/characters/${serieElegida}/${prefijo}1.png`;
        if (img.src !== rutaBackup) img.src = rutaBackup;
    };

    const duracion = (CONFIG.announcerSettings.durations[type] || 10) * 1000;
    if (this.activeTimeout) clearTimeout(this.activeTimeout);
    this.activeTimeout = setTimeout(() => this.hide(), duracion);
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
scheduleNextCharacter() {
        const freq = CONFIG.announcerSettings.frecuencias;
        // Si no existen en config, usamos 15 y 45 por defecto
        const min = (freq.charactersMin || 15) * 60 * 1000;
        const max = (freq.charactersMax || 45) * 60 * 1000;
        
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        this.nextCharacterTime = Date.now() + delay;
        
        console.log(`| ANNOUNCER | Próximo personaje en ${Math.round(delay/60000)} min.`);
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