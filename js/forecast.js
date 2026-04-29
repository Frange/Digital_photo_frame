const ForecastLogic = {
    getIcon: function(desc) {
        desc = desc.toLowerCase();
        if(desc.includes("lluvia") || desc.includes("llovizna")) return "🌧️";
        if(desc.includes("tormenta")) return "⚡";
        if(desc.includes("nieve")) return "❄️";
        if(desc.includes("nube") || desc.includes("nublado")) return "⛅";
        return "☀️";
    },
    
    buildWidget: function(days) {
        return days.map(day => `
            <div class="f-day">
                <span class="f-name">${new Date(day.date).toLocaleDateString('es-ES', {weekday: 'short'}).toUpperCase()}</span>
                <span class="f-icon">${this.getIcon(day.hourly[4].lang_es[0].value)}</span>
                <b class="f-temp">${day.maxtempC}º/${day.mintempC}º</b>
            </div>
        `).join('');
    }
};