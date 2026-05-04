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

            const cur = rCab.current_condition[0];
            document.getElementById('temp-big').innerText = cur.temp_C + "ºC";
            
            // Usamos la lógica de iconos del Main o del Forecast indistintamente
            const desc = cur.lang_es[0].value.toLowerCase();
            document.getElementById('main-icon').innerText = this.getIcon(desc);
            
            const statusEl = document.getElementById('weather-status');
            if (statusEl) {
                statusEl.innerHTML = `<span style="color: #ffcc00;">AHORA:</span> ${cur.lang_es[0].value.toUpperCase()}`;
            }

            if (typeof setEffect === 'function') setEffect(cur.lang_es[0].value);

            this.renderForecastArea();
        } catch (e) { console.error("Error API clima"); }
    },

    getIcon(desc) {
        if (desc.includes("tormenta")) return "⚡";
        if (desc.includes("lluvia") || desc.includes("chubasco")) return "🌧️";
        if (desc.includes("nube") || desc.includes("nublado")) return "⛅";
        return "☀️";
    },

    renderForecastArea() {
        if (!this.climaCabanillas || !this.climaTorrevieja) return;
        const esCabanillas = (this.currentIdx === 0);
        const data = esCabanillas ? this.climaCabanillas : this.climaTorrevieja;
        
        const label = document.querySelector('.loc-label');
        if (label) label.innerText = esCabanillas ? "CABANILLAS" : "TORREVIEJA";

        const box = document.getElementById('forecast-box');
        if (box && typeof ForecastLogic !== 'undefined') {
            box.innerHTML = ForecastLogic.buildWidget(data.weather.slice(0, 3));
        }
    }
};