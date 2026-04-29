const TopBanner = {
    // Usamos las URLs que sabemos que no dan guerra
    sources: [
        'https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml',
        'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada',
        'https://e00-marca.uecdn.es/rss/portada.xml',
        'https://as.com/rss/tags/ultimas_noticias.xml'
    ],
    news: [],
    sourceNames: ["EL MUNDO", "EL PAÍS", "MARCA", "AS"],
    currentSourceIdx: 0,
    currentNewsIdx: 0,

    init() {
        // Inyectamos el HTML idéntico al que te funcionaba
        document.getElementById('slot-top').innerHTML = `
            <div id="demo-label">ESTADO: <span id="demo-state">OK</span></div>
            <div class="news-banner">
                <div class="news-source" id="source-name">NOTICIAS</div>
                <div id="news-text">Cargando titulares...</div>
            </div>
        `;
        
        this.loadAllNews();
        
        // Rotación de titulares cada 10 segundos (como en tu v36)
        setInterval(() => this.rotate(), 10000);
        
        // Recargar todo el sistema cada 15 minutos para pillar noticias nuevas
        setInterval(() => this.loadAllNews(), 900000);
    },

    async loadAllNews() {
        try {
            // Intentamos cargar la fuente actual
            const url = this.sources[this.currentSourceIdx];
            const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
            const data = await res.json();
            
            if(data.items && data.items.length > 0) {
                this.news = data.items;
                this.currentNewsIdx = 0;
                // Actualizamos el nombre de la fuente en el banner
                document.getElementById('source-name').innerText = this.sourceNames[this.currentSourceIdx];
                this.rotate(); // Forzamos la primera noticia
            }
        } catch(e) {
            console.log("Error cargando fuente, probando siguiente...");
            this.nextSource();
        }
    },

    rotate() {
        if (this.news.length > 0) {
            const textEl = document.getElementById('news-text');
            if(textEl) {
                // Aplicamos el titular
                textEl.innerText = this.news[this.currentNewsIdx].title.toUpperCase();
                
                this.currentNewsIdx++;
                
                // Si terminamos las noticias de esta fuente, pasamos a la siguiente fuente de periódicos
                if(this.currentNewsIdx >= this.news.length) {
                    this.nextSource();
                }
            }
        }
    },

    nextSource() {
        this.currentSourceIdx = (this.currentSourceIdx + 1) % this.sources.length;
        this.loadAllNews();
    },

    updateState(msg) {
        const el = document.getElementById('demo-state');
        if(el) el.innerText = msg.toUpperCase();
    }
};