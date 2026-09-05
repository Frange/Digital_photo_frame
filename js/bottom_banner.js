/**
 * BottomBanner - Controlador del footer
 * Diferencia claramente entre el estado actual y la tendencia de las próximas 8 horas.
 */
const BottomBanner = {
    urlCabanillas: 'https://wttr.in/Cabanillas+del+Campo?format=j1&lang=es',
    urlTorrevieja: 'https://wttr.in/Torrevieja?format=j1&lang=es',

    init() {
        const footer = document.querySelector('.footer-bar');
        if (footer) {
            footer.innerHTML = `
                <div id="rain-info"><span style="color: #ffcc00">CABANILLAS:</span> ANALIZANDO PRÓXIMAS HORAS...</div>
                <div id="temp-torrevieja"><span style="color: #ffcc00">TORREVIEJA:</span> --ºC | CARGANDO</div>
            `;
        }
        this.updateWeather();
        // Sincronizado cada 5 minutos
        setInterval(() => this.updateWeather(), 300000);
    },

    async updateWeather() {
        try {
            const [resCab, resTor] = await Promise.all([
                fetch(this.urlCabanillas).then(r => r.json()),
                fetch(this.urlTorrevieja).then(r => r.json())
            ]);

            // --- LÓGICA DE ALERTAS / TENDENCIA CABANILLAS ---
            if (resCab && resCab.weather) {
                const proximasHoras = resCab.weather[0].hourly;
                const ahora = new Date().getHours();
                
                // Mensaje por defecto más claro: indica que analizamos las próximas 8h
                let mensajeInfo = "SIN CAMBIOS PREVISTOS (PRÓX. 8H)"; 
                let icono = "✨";

                for (let i = 0; i < proximasHoras.length; i++) {
                    const horaData = parseInt(proximasHoras[i].time) / 100;
                    
                    // Solo analizamos el futuro cercano (de aquí a 8 horas)
                    if (horaData > ahora && horaData < ahora + 8) {
                        const desc = proximasHoras[i].lang_es[0].value.toLowerCase();
                        const chanceRain = parseInt(proximasHoras[i].chanceofrain);
                        const viento = parseInt(proximasHoras[i].windspeedKmph);

                        if (chanceRain > 40 || desc.includes("lluvia")) {
                            mensajeInfo = `ALERTA DE LLUVIA A LAS ${horaData}:00 (${chanceRain}%)`;
                            icono = "🌧️"; 
                            break; 
                        } else if (desc.includes("nieve") || desc.includes("granizo")) {
                            mensajeInfo = `AVISO DE NIEVE/GRANIZO A LAS ${horaData}:00`;
                            icono = "❄️"; 
                            break;
                        } else if (viento > 35) {
                            mensajeInfo = `VIENTOS FUERTES PREVISTOS (${viento} KM/H)`;
                            icono = "💨"; 
                            break;
                        } else if (desc.includes("tormenta")) {
                            mensajeInfo = `TORMENTA ELÉCTRICA EN CAMINO`;
                            icono = "⚡"; 
                            break;
                        } else if (desc.includes("niebla")) {
                            mensajeInfo = `SE ESPERA NIEBLA EN LAS PRÓXIMAS HORAS`;
                            icono = "🌫️"; 
                            break;
                        }
                    }
                }
                
                const rainInfoEl = document.getElementById('rain-info');
                if (rainInfoEl) {
                    rainInfoEl.innerHTML = `
                        <span style="margin-right:8px">${icono}</span>
                        <span style="color: #ffcc00">CABANILLAS:</span> 
                        <span style="margin-left:10px">${mensajeInfo.toUpperCase()}</span>
                    `;
                }
            }

            // --- INFO SECUNDARIA TORREVIEJA ---
            if (resTor && resTor.current_condition) {
                const curTor = resTor.current_condition[0];
                const tempTorEl = document.getElementById('temp-torrevieja');
                if (tempTorEl) {
                    tempTorEl.innerHTML = `
                        <span style="color: #ffcc00">TORREVIEJA:</span> 
                        <span style="margin-left:10px">${curTor.temp_C}ºC | ${curTor.lang_es[0].value.toUpperCase()}</span>
                    `;
                }
            }

        } catch (e) {
            console.error("Error en BottomBanner:", e);
            const el = document.getElementById('rain-info');
            if(el) el.innerHTML = `<span style="color: #ffcc00">CABANILLAS:</span> SERVICIO DE ALERTAS NO DISPONIBLE`;
        }
    }
};