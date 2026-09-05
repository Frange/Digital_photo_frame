const WeatherService = {
    location: "40.63, -3.23",
    lastFetch: 0,
    cachedData: null,
    // Array de llaves desde tu CONFIG
    getKeys() {
        return [
            CONFIG.weather.key_tomorrow_1,
            CONFIG.weather.key_tomorrow_2,
            CONFIG.weather.key_tomorrow_3
        ];
    },
    currentKeyIdx: 0,

    async getWeatherData() {
        const now = Date.now();
        const diezMinutos = 10 * 60 * 1000;

        // 1. Protección de caché para no gastar llaves innecesariamente
        if (this.cachedData && (now - this.lastFetch < diezMinutos)) {
            console.log("WeatherService: Usando caché (ahorrando API)");
            return this.cachedData;
        }

        const keys = this.getKeys();
        
        // 2. Intentar con las llaves disponibles empezando por la última que funcionó
        for (let i = 0; i < keys.length; i++) {
            const indexParaProbar = (this.currentKeyIdx + i) % keys.length;
            const activeKey = keys[indexParaProbar];

            try {
                console.log(`WeatherService: Intentando con Llave #${indexParaProbar + 1}`);
                const url = `https://api.tomorrow.io/v4/weather/forecast?location=${this.location}&apikey=${activeKey}&units=metric`;
                
                const response = await fetch(url);

                if (response.status === 429) {
                    console.warn(`WeatherService: Llave #${indexParaProbar + 1} agotada (429). Probando siguiente...`);
                    continue; // Salta al siguiente ciclo del 'for' (probará la siguiente llave)
                }

                if (!response.ok) throw new Error(`Error API: ${response.status}`);

                const data = await response.json();
                const transformed = this.transformData(data);

                // Si llegamos aquí, la llave funcionó
                this.currentKeyIdx = indexParaProbar; 
                this.cachedData = transformed;
                this.lastFetch = now;
                return transformed;

            } catch (e) {
                ErrorLogger.add("API_WEATHER", `Fallo con llave ${indexParaProbar + 1}`, e.message);
                // Si es un error de red, paramos. Si es 429, el loop sigue.
                if (e.message.includes("429")) continue;
            }
        }

        // 3. Si llegamos aquí, todas las llaves han fallado
        ErrorLogger.add("CRITICAL", "Todas las llaves de Tomorrow.io están agotadas o fallan.");
        return this.cachedData; // Devolvemos lo último que tengamos aunque sea viejo
    },

    transformData(raw) {
        if (!raw || !raw.timelines) return null;
        const current = raw.timelines.minutely[0].values;
        return {
            current: {
                temp: Math.round(current.temperature),
                code: current.weatherCode,
                status: this.getWeatherName(current.weatherCode),
                icon: this.getEmoji(current.weatherCode)
            },
            hourly: raw.timelines.hourly.slice(1, 5).map(h => ({
                time: new Date(h.time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                temp: Math.round(h.values.temperature),
                icon: this.getEmoji(h.values.weatherCode)
            }))
        };
    },

    getWeatherName(code) {
        const codes = {
            1000: "Despejado", 1100: "Casi Despejado", 1101: "Parcialmente Nublado",
            1102: "Mayormente Nublado", 1001: "Nublado", 2000: "Niebla", 
            4000: "Llovizna", 4001: "Lluvia", 4200: "Lluvia Ligera", 4201: "Lluvia Fuerte",
            5000: "Nieve", 8000: "Tormenta"
        };
        return codes[code] || "Despejado";
    },

    getEmoji(code) {
        const icons = {
            1000: "☀️", 1100: "🌤️", 1101: "⛅", 1102: "🌥️", 1001: "☁️",
            2000: "🌫️", 4000: "🌧️", 4001: "🌧️", 4200: "🌧️", 4201: "⛈️",
            5000: "❄️", 8000: "⚡"
        };
        return icons[code] || "☀️";
    }
};