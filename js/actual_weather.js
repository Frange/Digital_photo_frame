const WeatherModule = {
    climaCabanillas: null,
    climaTorrevieja: null,

    getIcon(desc, esNoche = false) {
        desc = (desc || "").toLowerCase();
        if (desc.includes("tormenta")) return "⚡";
        if (desc.includes("llovizna")) return "🌦️";
        if (desc.includes("lluvia") || desc.includes("chubasco")) return "🌧️";
        if (desc.includes("nieve")) return "❄️";
        if (desc.includes("nube") || desc.includes("nublado")) return esNoche ? "☁️" : "⛅";
        return esNoche ? "🌙" : "☀️";
    },

    async fetchData() {
        try {
            const [rCab, rTor] = await Promise.all([
                fetch(`https://wttr.in/Cabanillas+del+Campo?format=j1&lang=es`).then(res => res.json()),
                fetch(`https://wttr.in/Torrevieja?format=j1&lang=es`).then(res => res.json())
            ]);
            this.climaCabanillas = rCab;
            this.climaTorrevieja = rTor;
            this.renderActual();
            // Avisar al módulo de forecast que hay datos nuevos
            if (window.ForecastModule) ForecastModule.render();
        } catch (e) { console.error("Error API:", e); }
    },

    renderActual() {
        const cur = this.climaCabanillas.current_condition[0];
        document.getElementById('temp-big').innerText = cur.temp_C + "ºC";
        document.getElementById('main-icon').innerText = this.getIcon(cur.lang_es[0].value);
        document.getElementById('weather-status').innerHTML = `
            <span style="color: #ffcc00;">AHORA:</span> 
            <span class="weather-text">${cur.lang_es[0].value}</span>
        `;
        
        // Lógica de efectos de fondo (lluvia, nieve...)
        if (typeof setEffect === 'function') {
            setEffect(cur.lang_es[0].value);
        }
    },

    init() {
        this.fetchData();
        setInterval(() => this.fetchData(), 300000);
    }
};