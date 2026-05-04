const MainContent = {
    currentIdx: 0,
    climaCabanillas: null,
    climaTorrevieja: null,

    init() {
        if (window.mainContentStarted) return;
        window.mainContentStarted = true;

        this.updateClock();
        setInterval(() => this.updateClock(), 1000);

        this.updateAllData();
        const intervalAPI = (typeof CONFIG !== 'undefined' && CONFIG.tiempos) ? CONFIG.tiempos.climaAPI : 300000;
        setInterval(() => this.updateAllData(), intervalAPI);

        const intervalRotacion = (typeof CONFIG !== 'undefined' && CONFIG.tiempos) ? CONFIG.tiempos.ciudad : 20000;
        setInterval(() => {
            this.currentIdx = (this.currentIdx + 1) % 2; // Alterna entre 0 y 1
            this.renderTopWeather(); 
            this.renderForecastArea();
        }, intervalRotacion);
    },

    updateClock() {
        const d = new Date();
        const t = document.getElementById('time');
        const date = document.getElementById('date');
        if (t) t.innerText = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        if (date) date.innerText = d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    },

    async updateAllData() {
        try {
            const [rCab, rTor] = await Promise.all([
                fetch(`https://wttr.in/Cabanillas+del+Campo?format=j1&lang=es`).then(res => res.json()),
                fetch(`https://wttr.in/Torrevieja?format=j1&lang=es`).then(res => res.json())
            ]);
            this.climaCabanillas = rCab;
            this.climaTorrevieja = rTor;

            this.renderTopWeather();
            this.renderForecastArea();
        } catch (e) { console.error("Error cargando datos:", e); }
    },

    renderTopWeather() {
        const data = this.climaCabanillas; 
        if (!data) return;

        const cur = data.current_condition[0];
        document.getElementById('temp-big').innerText = cur.temp_C + "ºC";
        document.getElementById('main-icon').innerText = this.getIcon(cur.lang_es[0].value.toLowerCase());
        
        const statusEl = document.getElementById('weather-status');
        if (statusEl) {
            statusEl.innerText = cur.lang_es[0].value.toUpperCase();
        }

        if (typeof setEffect === 'function') setEffect(cur.lang_es[0].value);
        
        // Renderiza las horas en el recuadro de abajo a la derecha
        this.renderHourlyForecast(data);
    },

    renderHourlyForecast(data) {
        const container = document.getElementById('hourly-container');
        if (!container) return;

        try {
            const now = new Date();
            const currentHour = now.getHours();
            let hourlyData = data.weather[0].hourly;

            // Filtramos las próximas horas
            let futureHours = hourlyData.filter(h => (parseInt(h.time) / 100) > currentHour);

            if (futureHours.length < 4) {
                futureHours = futureHours.concat(data.weather[1].hourly).slice(0, 4);
            } else {
                futureHours = futureHours.slice(0, 4);
            }

            container.innerHTML = futureHours.map(h => {
                const horaData = parseInt(h.time) / 100;
                const hourText = horaData < 10 ? `0${horaData}:00` : `${horaData}:00`;

                return `
                    <div class="h-item">
                        <span class="h-time">${hourText}</span>
                        <span class="h-icon">${this.getIcon(h.lang_es[0].value.toLowerCase())}</span>
                        <span class="h-temp">${h.tempC}º</span>
                    </div>
                `;
            }).join('');

        } catch (e) { console.error("Error en renderHourlyForecast:", e); }
    },

    getIcon(desc) {
        if (desc.includes("tormenta")) return "⚡";
        if (desc.includes("lluvia") || desc.includes("chubasco")) return "🌧️";
        if (desc.includes("nieve") || desc.includes("granizo")) return "❄️";
        if (desc.includes("nube") || desc.includes("nublado")) return "⛅";
        return "☀️";
    },

    renderForecastArea() {
        if (!this.climaCabanillas || !this.climaTorrevieja) return;
        const esCabanillas = (this.currentIdx === 0);
        const data = esCabanillas ? this.climaCabanillas : this.climaTorrevieja;
        
        const label = document.querySelector('.loc-label');
        if (label) label.innerText = esCabanillas ? "CABANILLAS DEL CAMPO" : "TORREVIEJA";

        const box = document.getElementById('forecast-box');
        if (box && typeof ForecastLogic !== 'undefined') {
            box.innerHTML = ForecastLogic.buildWidget(data.weather.slice(0, 3));
        }
    }
};