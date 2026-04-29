const MainContent = {
    currentIdx: 0,
    climaCabanillas: null,
    climaTorrevieja: null,

    init() {
        if (window.mainContentStarted) return;
        window.mainContentStarted = true;

        console.log("--- MOTOR PRO V57: SINCRONIZACIÓN REAL ESTRICTA ---");
        
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

        setTimeout(() => {
            if (typeof TopBanner !== 'undefined') {
                console.log("Iniciando noticias...");
                TopBanner.init();
            }
        }, 5000);
    },

    updateClock() {
        const d = new Date();
        const t = document.getElementById('time');
        const date = document.getElementById('date');
        if (t) t.innerText = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        if (date) date.innerText = d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    },

    getIcon(desc, esNoche = false) {
        desc = (desc || "").toLowerCase();
        if (desc.includes("tormenta")) return "⚡";
        if (desc.includes("llovizna")) return "🌦️"; // Icono específico
        if (desc.includes("lluvia") || desc.includes("chubasco")) return "🌧️";
        if (desc.includes("nieve") || desc.includes("granizo")) return "❄️";
        if (desc.includes("nube") || desc.includes("nublado") || desc.includes("niebla") || desc.includes("bruma")) {
             return esNoche ? "☁️" : "⛅";
        }
        return esNoche ? "🌙" : "☀️";
    },

    async updateAllData() {
        try {
            const rCab = await fetch(`https://wttr.in/Cabanillas+del+Campo?format=j1&lang=es`).then(res => res.json());
            this.climaCabanillas = rCab;

            const rTor = await fetch(`https://wttr.in/Torrevieja?format=j1&lang=es`).then(res => res.json());
            this.climaTorrevieja = rTor;

            const cur = rCab.current_condition[0];
            const desc = cur.lang_es[0].value.toLowerCase();
            
            const ahora = new Date();
            const sunriseStr = rCab.weather[0].astronomy[0].sunrise;
            const sunsetStr = rCab.weather[0].astronomy[0].sunset;
            
            const parseTime = (timeStr) => {
                const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
                if (!match) return new Date();
                let [_, hours, minutes, modifier] = match;
                hours = parseInt(hours, 10);
                if (modifier.toUpperCase() === 'PM' && hours !== 12) hours += 12;
                if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;
                const d = new Date();
                d.setHours(hours, parseInt(minutes, 10), 0, 0);
                return d;
            };

            const sunriseDate = parseTime(sunriseStr);
            const sunsetDate = parseTime(sunsetStr);
            
            const esNoche = ahora < sunriseDate || ahora > sunsetDate;
            const prefijo = esNoche ? "Noche: " : "Día: ";

            // --- DETECCIÓN DE EFECTO CORREGIDA ---
            let estadoEfecto = "Sol"; 
            
            if (desc.includes("tormenta")) {
                estadoEfecto = "Tormenta";
            } else if (desc.includes("llovizna")) { 
                // Prioridad a Llovizna: Si la API dice "Llovizna", mandamos Llovizna
                estadoEfecto = "Llovizna";
            } else if (desc.includes("lluvia") || desc.includes("chubasco")) {
                estadoEfecto = "Lluvia";
            } else if (desc.includes("granizo")) {
                estadoEfecto = "Granizo";
            } else if (desc.includes("nieve")) {
                estadoEfecto = "Nieve";
            } else if (desc.includes("niebla") || desc.includes("bruma")) {
                estadoEfecto = "Niebla";
            } else if (desc.includes("nube") || desc.includes("nublado")) {
                estadoEfecto = esNoche ? "Nubes" : "Sol con nubes";
            } else {
                estadoEfecto = esNoche ? "Limpio" : "Sol";
            }

            const efectoFinal = prefijo + estadoEfecto;

            document.getElementById('temp-big').innerText = cur.temp_C + "ºC";
            document.getElementById('weather-status').innerText = cur.lang_es[0].value.toUpperCase();
            document.getElementById('main-icon').innerText = this.getIcon(desc, esNoche);

            const demoState = document.getElementById('demo-state');
            if (demoState) demoState.innerText = efectoFinal.toUpperCase();

            if (typeof setEffect === 'function') {
                setEffect(efectoFinal);
            }

            document.getElementById('rain-info').innerText = `CABANILLAS: ${cur.lang_es[0].value.toUpperCase()} | HUMEDAD: ${cur.humidity}%`;
            document.getElementById('temp-torrevieja').innerText = `TORREVIEJA: ${this.climaTorrevieja.current_condition[0].temp_C}ºC | ${this.climaTorrevieja.current_condition[0].lang_es[0].value.toUpperCase()}`;

            this.renderForecastArea();

        } catch (e) {
            console.error("Error crítico en updateAllData:", e);
        }
    },

    renderForecastArea() {
        if (!this.climaCabanillas || !this.climaTorrevieja) return;
        const esCabanillas = (this.currentIdx === 0);
        const dataMostrada = esCabanillas ? this.climaCabanillas : this.climaTorrevieja;
        const label = document.querySelector('.loc-label');
        if (label) label.innerText = esCabanillas ? "CABANILLAS DEL CAMPO" : "TORREVIEJA";

        const box = document.getElementById('forecast-box');
        if (box) {
            box.innerHTML = dataMostrada.weather.slice(0, 3).map(day => {
                const d = new Date(day.date);
                const hoy = new Date();
                let nombreDia = d.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase();
                if (d.getDate() === hoy.getDate() && d.getMonth() === hoy.getMonth()) {
                    nombreDia = "HOY";
                }
                return `
                <div class="f-day">
                    <span class="f-name">${nombreDia}</span>
                    <span class="f-icon">${this.getIcon(day.hourly[4].lang_es[0].value)}</span>
                    <b class="f-temp">${day.maxtempC}º/${day.mintempC}º</b>
                </div>`;
            }).join('');
        }
    }
};

MainContent.init();