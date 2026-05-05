const MainContent = {
    currentIdx: 0,
    datosCabanillas: null,
    datosTorrevieja: null,

    init() {
        if (window.mainContentStarted) return;
        window.mainContentStarted = true;

        this.updateClock();
        setInterval(() => this.updateClock(), 1000);

        this.updateAllData();
        setInterval(() => this.updateAllData(), CONFIG.tiempos.climaAPI);

        setInterval(() => {
            this.currentIdx = (this.currentIdx + 1) % 2;
            this.renderAll();
        }, CONFIG.tiempos.ciudad);
    },

    updateClock() {
        const d = new Date();
        document.getElementById('time').innerText = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('date').innerText = d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    },

    async fetchWeather(city) {
        const key = CONFIG.weather.key;
        // Pedimos el clima actual y el pronóstico de 5 días (que incluye las horas)
        const [curr, fore] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${key}`).then(r => r.json()),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=es&appid=${key}`).then(r => r.json())
        ]);
        return { current: curr, forecast: fore };
    },

    async updateAllData() {
        try {
            this.datosCabanillas = await this.fetchWeather(CONFIG.weather.city1);
            this.datosTorrevieja = await this.fetchWeather(CONFIG.weather.city2);
            this.renderAll();
        } catch (e) { console.error("Error en OpenWeather:", e); }
    },

    renderAll() {
        const data = (this.currentIdx === 0) ? this.datosCabanillas : this.datosTorrevieja;
        if (!data) return;

        // 1. Ciudad Actual
        //const label = document.querySelector('.loc-label');
        //if (label) label.innerText = (this.currentIdx === 0) ? "CABANILLAS DEL CAMPO" : "TORREVIEJA";

        // 2. Clima Superior
        document.getElementById('temp-big').innerText = Math.round(data.current.main.temp) + "ºC";
        document.getElementById('weather-status').innerText = data.current.weather[0].description.toUpperCase();
        document.getElementById('main-icon').innerText = this.getIcon(data.current.weather[0].icon);

        // 3. Horas (Abajo Derecha)
        this.renderHourly(data.forecast.list);

        // 4. Días (Abajo Izquierda)
        //this.renderWeekly(data.forecast.list);
    },

   renderHourly(list) {
    const container = document.getElementById('hourly-container');
    if (!container) return;

    // Cogemos los próximos 4 registros (OpenWeather los da cada 3 horas)
    const nextHours = list.slice(0, 4);
    
    container.innerHTML = nextHours.map(h => {
        // CORRECCIÓN AQUÍ: Usamos '2-digit' para que JavaScript no de error
        const time = new Date(h.dt * 1000).toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        return `
            <div class="h-item">
                <span class="h-time">${time}</span>
                <span class="h-icon">${this.getIcon(h.weather[0].icon)}</span>
                <span class="h-temp">${Math.round(h.main.temp)}º</span>
            </div>`;
    }).join('');
},

    renderWeekly(list) {
        const box = document.getElementById('forecast-box');
        if (!box) return;

        // OpenWeather da datos cada 3 horas. Filtramos para sacar uno por día (el del mediodía)
        const daily = list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 3);
        
        box.innerHTML = daily.map(d => {
            const dayName = new Date(d.dt * 1000).toLocaleDateString('es-ES', { weekday: 'short' });
            return `
                <div class="f-day">
                    <span class="f-name">${dayName.toUpperCase()}</span>
                    <span class="f-icon">${this.getIcon(d.weather[0].icon)}</span>
                    <span class="f-temp">${Math.round(d.main.temp)}ºC</span>
                </div>`;
        }).join('');
    },

    // Mapeo de iconos de OpenWeather a tus Emojis
    getIcon(code) {
        const icons = {
            "01d": "☀️", "01n": "🌙",
            "02d": "⛅", "02n": "☁️",
            "03d": "☁️", "03n": "☁️",
            "04d": "☁️", "04n": "☁️",
            "09d": "🌧️", "09n": "🌧️",
            "10d": "🌦️", "10n": "🌧️",
            "11d": "⚡", "11n": "⚡",
            "13d": "❄️", "13n": "❄️",
            "50d": "🌫️", "50n": "🌫️"
        };
        return icons[code] || "☀️";
    }
};