const UI = {
    actualizarReloj() {
        const d = new Date();
        document.getElementById('time').innerText = d.toLocaleTimeString('es-ES', {hour:'2-digit', minute:'2-digit'});
        document.getElementById('date').innerText = d.toLocaleDateString('es-ES', {weekday:'long', day:'numeric', month:'long'});
    },

    setNoticias(texto) {
        document.getElementById('news-text').innerText = texto;
    },

    actualizarMeteoUI(data, ciudadNombre) {
        const cur = data.current_condition[0];
        document.getElementById('city-label').innerText = ciudadNombre.toUpperCase();
        document.getElementById('temp-big').innerText = cur.temp_C + "º";
        document.getElementById('weather-status').innerText = cur.lang_es[0].value.toUpperCase();
        document.getElementById('main-icon').innerText = this.getIcon(cur.lang_es[0].value);
        
        // Footer Técnico
        document.getElementById('rain-info').innerText = `${ciudadNombre}: HUM ${cur.humidity}% | VIENTO ${cur.windspeedKmph}km/h`;
        
        // Pronóstico
        document.getElementById('forecast-box').innerHTML = data.weather.slice(0, 3).map(day => `
            <div class="f-day">
                <span class="f-name">${new Date(day.date).toLocaleDateString('es-ES', {weekday: 'short'}).toUpperCase()}</span>
                <span class="f-icon">${this.getIcon(day.hourly[4].lang_es[0].value)}</span>
                <span class="f-temp">${day.maxtempC}º/${day.mintempC}º</span>
            </div>
        `).join('');
    },

    getIcon(desc) {
        desc = desc.toLowerCase();
        if(desc.includes("lluvia")) return "🌧️";
        if(desc.includes("tormenta")) return "⚡";
        if(desc.includes("nieve")) return "❄️";
        if(desc.includes("nube")) return "⛅";
        return "☀️";
    }
};