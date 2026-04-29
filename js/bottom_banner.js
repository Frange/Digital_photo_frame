/**
 * BottomBanner - Monitor de alertas horarias para Cabanillas 
 * y estado actual de Torrevieja con estilo unificado.
 */
const BottomBanner = {
    urlCabanillas: 'https://wttr.in/Cabanillas+del+Campo?format=j1&lang=es',
    urlTorrevieja: 'https://wttr.in/Torrevieja?format=j1&lang=es',

    init() {
        const footer = document.querySelector('.footer-bar');
        if (footer) {
            footer.innerHTML = `
                <div id="rain-info"><span style="color: #ffcc00">CABANILLAS:</span> ANALIZANDO PREVISIÓN...</div>
                <div id="temp-torrevieja"><span style="color: #ffcc00">TORREVIEJA:</span> --ºC | CARGANDO</div>
            `;
        }
        this.updateWeather();
        setInterval(() => this.updateWeather(), 300000); // 5 min
    },

    async updateWeather() {
        try {
            const [resCab, resTor] = await Promise.all([
                fetch(this.urlCabanillas).then(r => r.json()),
                fetch(this.urlTorrevieja).then(r => r.json())
            ]);

            // --- LÓGICA DE ALERTAS PARA CABANILLAS ---
            if (resCab && resCab.weather) {
                const proximasHoras = resCab.weather[0].hourly;
                const ahora = new Date().getHours();
                
                let mensajeInfo = "CIELOS ESTABLES PARA LAS PRÓXIMAS HORAS";
                let icono = "✨";

                for (let i = 0; i < proximasHoras.length; i++) {
                    const horaData = parseInt(proximasHoras[i].time) / 100;
                    
                    if (horaData > ahora && horaData < ahora + 8) {
                        const desc = proximasHoras[i].lang_es[0].value.toLowerCase();
                        const viento = parseInt(proximasHoras[i].windspeedKmph);
                        const chanceRain = parseInt(proximasHoras[i].chanceofrain);

                        if (chanceRain > 40 || desc.includes("lluvia")) {
                            mensajeInfo = `ALERTA DE LLUVIA SOBRE LAS ${horaData}:00 ( ${chanceRain}% )`;
                            icono = "🌧️";
                            break; 
                        } else if (desc.includes("nieve") || desc.includes("granizo")) {
                            mensajeInfo = `AVISO DE NIEVE/GRANIZO SOBRE LAS ${horaData}:00`;
                            icono = "❄️";
                            break;
                        } else if (viento > 35) {
                            mensajeInfo = `VIENTOS FUERTES PREVISTOS: ${viento} KM/H`;
                            icono = "💨";
                            break;
                        } else if (desc.includes("tormenta")) {
                            mensajeInfo = `AVISO DE TORMENTA ELÉCTRICA PRÓXIMA`;
                            icono = "⚡";
                            break;
                        } else if (desc.includes("niebla")) {
                            mensajeInfo = `PREVISIÓN DE NIEBLA PARA LAS PRÓXIMAS HORAS`;
                            icono = "🌫️";
                            break;
                        }
                    }
                }
                
                const rainInfoEl = document.getElementById('rain-info');
                if (rainInfoEl) {
                    // Aplicamos el color amarillo al nombre de la ciudad
                    rainInfoEl.innerHTML = `<span style="margin-right:8px">${icono}</span><span style="color: #ffcc00">CABANILLAS:</span> ${mensajeInfo.toUpperCase()}`;
                }
            }

            // --- INFO SECUNDARIA TORREVIEJA ---
            if (resTor && resTor.current_condition) {
                const curTor = resTor.current_condition[0];
                const tempTorEl = document.getElementById('temp-torrevieja');
                if (tempTorEl) {
                    // Aplicamos el color amarillo al nombre de la ciudad
                    tempTorEl.innerHTML = `<span style="color: #ffcc00">TORREVIEJA:</span> ${curTor.temp_C}ºC | ${curTor.lang_es[0].value.toUpperCase()}`;
                }
            }

            if (window.TopBanner && typeof window.TopBanner.updateState === 'function') {
                window.TopBanner.updateState('Sincro OK');
            }

        } catch (e) {
            console.error("Error en BottomBanner:", e);
            const el = document.getElementById('rain-info');
            if(el) el.innerHTML = `<span style="color: #ffcc00">CABANILLAS:</span> ERROR DE CONEXIÓN`;
        }
    }
};