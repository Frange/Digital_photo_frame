const MainContent = {
    init() {
        this.updateClock();
        this.updateWeather();
        setInterval(() => this.updateClock(), 1000);
        setInterval(() => this.updateWeather(), 900000);
        
        // Restaurar mensaje fijo solicitado
        const tag = document.getElementById('status-tag');
        if(tag) tag.innerText = "ESTADO: OK";
    },

    updateClock() {
        const d = new Date();
        document.getElementById('time').innerText = d.toLocaleTimeString('es-ES', {hour:'2-digit', minute:'2-digit'});
        document.getElementById('date').innerText = d.toLocaleDateString('es-ES', {weekday:'long', day:'numeric', month:'long'});
    },

    async updateWeather() {
        try {
            const res = await fetch(`https://wttr.in/Cabanillas+del+Campo?format=j1&lang=es`);
            const data = await res.json();
            const cur = data.current_condition[0];
            
            document.getElementById('temp-big').innerText = `${cur.temp_C}ºC`;
            document.getElementById('weather-status').innerText = cur.lang_es[0].value;
            
            // Render forecast simplified
            const container = document.getElementById('forecast-box');
            container.innerHTML = data.weather.slice(0, 5).map(day => `
                <div class="f-day">
                    <span class="f-name">${new Date(day.date).toLocaleDateString('es-ES', {weekday: 'short'}).toUpperCase()}</span>
                    <span class="f-icon">☀️</span>
                    <b class="f-temp">${day.maxtempC}º/${day.mintempC}º</b>
                </div>
            `).join('');

        } catch(e) { console.error(e); }
    }
};