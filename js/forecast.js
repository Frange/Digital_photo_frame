const ForecastLogic = {
    getIcon: function(desc) {
        desc = desc.toLowerCase();
        if(desc.includes("lluvia") || desc.includes("llovizna") || desc.includes("chubascos")) return "🌧️";
        if(desc.includes("tormenta")) return "⚡";
        if(desc.includes("nieve")) return "❄️";
        if(desc.includes("nub") || desc.includes("bruma") || desc.includes("niebla")) return "⛅";
        return "☀️";
    },
    
    buildWidget: function(days) {
        return days.map((day, index) => {
            // Nombre del día: "HOY" para el primero, largo para el resto
            let nombreDia = (index === 0) 
                ? "HOY" 
                : new Date(day.date).toLocaleDateString('es-ES', {weekday: 'long'}).toUpperCase();

            const icono = this.getIcon(day.hourly[4].lang_es[0].value);

            return `
                <div class="f-day">
                    <span class="f-name">${nombreDia}</span>
                    <b class="f-temp">${day.maxtempC}º / ${day.mintempC}º</b>
                    <span class="f-icon">${icono}</span>
                </div>
            `;
        }).join('');
    }
};