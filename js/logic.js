const App = {
    idxCiudad: 0,
    idxFoto: 1,
    maxFotos: 0,

    init() {
        this.updateClock();
        this.updateWeather();
        this.updateImage();
        
        setInterval(() => this.updateClock(), 1000);
        setInterval(() => this.rotateCity(), CONFIG.tiempos.ciudad);
        setInterval(() => this.nextImage(), CONFIG.tiempos.foto);
        setInterval(() => this.updateWeather(), CONFIG.tiempos.climaAPI);
    },

    updateClock() {
        const d = new Date();
        document.getElementById('time').innerText = d.toLocaleTimeString('es-ES', {hour:'2-digit', minute:'2-digit'});
        // Formato: Miércoles, 29 De Abril (como en tu v52)
        const opciones = { weekday: 'long', day: 'numeric', month: 'long' };
        let fechaStr = d.toLocaleDateString('es-ES', opciones);
        document.getElementById('date').innerText = fechaStr.charAt(0).toUpperCase() + fechaStr.slice(1);
    },

    async updateWeather() {
        const c = CONFIG.ciudades[this.idxCiudad];
        try {
            const r = await fetch(`https://wttr.in/${c.query}?format=j1&lang=es`).then(res => res.json());
            const cur = r.current_condition[0];
            const desc = cur.lang_es[0].value.toUpperCase();
            
            document.getElementById('city-label').innerText = c.nombre.toUpperCase();
            document.getElementById('temp-big').innerText = cur.temp_C + "ºC";
            document.getElementById('weather-status').innerText = desc;
            document.getElementById('current-effect-name').innerText = "ESTADO: " + desc;
            
            // Footer y News
            document.getElementById('rain-info').innerText = `${c.nombre.toUpperCase()}: ${desc} | HUMEDAD: ${cur.humidity}% | VIENTO: ${cur.windspeedKmph} KM/H`;
            
            // Iconos dinámicos
            document.getElementById('main-icon').innerText = this.getIcon(desc);

            // Predicción (3 días)
            document.getElementById('forecast-box').innerHTML = r.weather.slice(0,3).map(day => `
                <div class="f-day">
                    <span class="f-name">${new Date(day.date).toLocaleDateString('es-ES', {weekday:'short'}).toUpperCase()}</span>
                    <span class="f-icon">${this.getIcon(day.hourly[4].lang_es[0].value)}</span>
                    <span class="f-temp">${day.maxtempC}º / ${day.mintempC}º</span>
                </div>
            `).join('');
        } catch(e) { 
            console.error("Error cargando clima de wttr.in");
        }
    },

    getIcon(desc) {
        desc = desc.toLowerCase();
        if(desc.includes("lluvia") || desc.includes("llovizna")) return "🌧️";
        if(desc.includes("tormenta")) return "⚡";
        if(desc.includes("nieve")) return "❄️";
        if(desc.includes("nube") || desc.includes("nublado")) return "⛅";
        return "☀️";
    },

    rotateCity() {
        this.idxCiudad = (this.idxCiudad + 1) % CONFIG.ciudades.length;
        this.updateWeather();
    },

    nextImage() {
        this.idxFoto++;
        this.updateImage();
    },

    updateImage() {
        const img = document.getElementById('bg-main');
        const nombre = `fondo_v52_${this.idxFoto}.jpg`;
        const path = CONFIG.rutaFotos + nombre;
        
        // Precarga para evitar parpadeos
        const tempImg = new Image();
        tempImg.src = path;
        tempImg.onload = () => {
            img.src = path;
            document.getElementById('img-filename').innerText = nombre;
            document.getElementById('img-current').innerText = this.idxFoto;
        };
        tempImg.onerror = () => {
            if(this.idxFoto > 1) this.maxFotos = this.idxFoto - 1;
            this.idxFoto = 1;
            this.updateImage();
            if(this.maxFotos > 0) document.getElementById('img-total').innerText = this.maxFotos;
        };
    }
};