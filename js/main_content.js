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
            if (typeof CONFIG !== 'undefined') {
                this.currentIdx = (this.currentIdx + 1) % CONFIG.ciudades.length;
                // CRÍTICO: Al rotar, debemos redibujar TODO para que las horas coincidan con la ciudad
                this.renderTopWeather(); 
                this.renderForecastArea();
            }
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

            // Renderizamos el estado actual y las horas
            this.renderTopWeather();
            this.renderForecastArea();

        } catch (e) { console.error("Error cargando datos:", e); }
    },

    // Nueva función para centralizar el renderizado de la parte superior (Temp, Icono y HORAS)
    renderTopWeather() {
        const data = (this.currentIdx === 0) ? this.climaCabanillas : this.climaTorrevieja;
        if (!data) return;

        const cur = data.current_condition[0];
        
        // 1. Temp e Icono Grande
        document.getElementById('temp-big').innerText = cur.temp_C + "ºC";
        document.getElementById('main-icon').innerText = this.getIcon(cur.lang_es[0].value.toLowerCase());
        
        // 2. Estado y Alertas
        const statusEl = document.getElementById('weather-status');
        if (statusEl) {
            let alertaHTML = "";
            const descFull = cur.lang_es[0].value.toUpperCase();
            if (parseInt(cur.uvIndex) > 8 || descFull.includes("AVISO") || descFull.includes("ALERTA")) {
                alertaHTML = `<span class="alert-badge">⚠️ ALERTA</span>`;
            }
            statusEl.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 10px;">
                    ${alertaHTML}
                    <div><span style="color: #ffcc00;">AHORA:</span> ${descFull}</div>
                </div>`;
        }

        if (typeof setEffect === 'function') setEffect(cur.lang_es[0].value);
        
        // 3. Pintar las horas de la ciudad seleccionada
        this.renderHourlyForecast(data);
    },

    renderHourlyForecast(data) {
        // 1. Intentamos buscar el contenedor
        let container = document.getElementById('hourly-container');
        
        // 2. Si NO existe, lo creamos por código para que no falle nunca
        if (!container) {
            console.warn("⚠️ 'hourly-container' no estaba en el HTML. Creándolo dinámicamente...");
            container = document.createElement('div');
            container.id = 'hourly-container';
            // Lo metemos dentro de weather-now
            const parent = document.querySelector('.weather-now');
            if (parent) parent.appendChild(container);
        }

        // 3. Forzamos estilos mínimos para asegurar visibilidad (independiente del CSS)
        container.style.display = 'flex';
        container.style.justifyContent = 'space-between';
        container.style.marginTop = '15px';
        container.style.width = '100%';
        container.style.minHeight = '50px';

        try {
            const hourlyData = data.weather[0].hourly;
            
            // 4. Limpiamos y pintamos
            container.innerHTML = hourlyData.map(h => {
                const horaRaw = parseInt(h.time);
                const horaData = horaRaw / 100;
                const hourText = horaData < 10 ? `0${horaData}:00` : `${horaData}:00`;

                return `
                    <div class="h-item" style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                        <span class="h-time" style="font-size: 0.7rem; color: rgba(255,255,255,0.6);">${hourText}</span>
                        <span class="h-icon" style="font-size: 1.4rem; margin: 2px 0;">${this.getIcon(h.lang_es[0].value.toLowerCase())}</span>
                        <span class="h-temp" style="font-size: 0.9rem; font-weight: bold; color: white;">${h.tempC}º</span>
                    </div>
                `;
            }).join('');
            
            console.log("🚀 Horas renderizadas con éxito");

        } catch (e) {
            console.error("❌ Error en renderHourlyForecast:", e);
        }
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