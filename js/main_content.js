const MainContent = {
    ciudades: ["Cabanillas del Campo", "Torrevieja"],
    idx: 0,

    init() {
        this.updateClock();
        this.updateWeather();
        setInterval(() => this.updateClock(), 1000);
        setInterval(() => {
            this.idx = (this.idx + 1) % this.ciudades.length;
            this.updateWeather();
        }, 30000);
        
        if (typeof Gallery !== 'undefined') Gallery.init();
    },

    updateClock() {
        const d = new Date();
        const timeEl = document.getElementById('time');
        const dateEl = document.getElementById('date');
        if(timeEl) timeEl.innerText = d.toLocaleTimeString('es-ES', {hour:'2-digit', minute:'2-digit'});
        if(dateEl) dateEl.innerText = d.toLocaleDateString('es-ES', {weekday:'long', day:'numeric', month:'long'});
    },

    async updateWeather() {
    const ciudad = this.ciudades[this.idx];
    try {
        const res = await fetch(`https://wttr.in/${encodeURIComponent(ciudad)}?format=j1&lang=es`);
        const data = await res.json();
        const cur = data.current_condition[0];
        
        // Función interna para actualizar texto solo si el ID existe (evita el error de 'null')
        const safeSetText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.innerText = text;
        };

        // Actualizamos los datos principales
        safeSetText('temp-big', `${cur.temp_C}ºC`);
        safeSetText('weather-status', cur.lang_es[0].value.toUpperCase());
        safeSetText('city-label', ciudad.toUpperCase());
        
        // Icono principal
        const iconEl = document.getElementById('main-icon');
        if (iconEl) {
            iconEl.innerText = (typeof ForecastLogic !== 'undefined') 
                ? ForecastLogic.getIcon(cur.lang_es[0].value) 
                : "☀️";
        }

        // --- RENDER PREVISIONES ---
        const container = document.getElementById('forecast-box');
        if (container) {
            // Usamos la lógica de ForecastLogic si existe, si no, un fallback directo
            if (typeof ForecastLogic !== 'undefined') {
                container.innerHTML = ForecastLogic.buildWidget(data.weather.slice(0, 3));
            } else {
                container.innerHTML = data.weather.slice(0, 3).map((day, i) => `
                    <div class="f-day">
                        <span class="f-name">${i === 0 ? "HOY" : new Date(day.date).toLocaleDateString('es-ES', {weekday: 'long'}).toUpperCase()}</span>
                        <b class="f-temp">${day.maxtempC}º/${day.mintempC}º</b>
                        <span class="f-icon">☀️</span>
                    </div>
                `).join('');
            }
        }

    } catch(e) { 
        console.error("Error en Clima:", e); 
    }
}
};

MainContent.init();