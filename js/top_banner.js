const TopBanner = {
    sources: [
        'https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml',
        'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada',
        'https://www.abc.es/rss/2.0/espana/',
        'https://e00-marca.uecdn.es/rss/portada.xml',
        'https://e00-expansion.uecdn.es/rss/portada.xml',
        'https://www.eldiario.es/rss/',
        'https://rss.elconfidencial.com/espana/'
    ],

    sourceMap: {
        'elmundo': 'EL MUNDO',
        'elpais': 'EL PAÍS',
        'abc': 'ABC',
        'marca': 'MARCA',
        'expansion': 'EXPANSIÓN',
        'eldiario': 'EL DIARIO',
        'elconfidencial': 'EL CONFIDENCIAL'
    },

    allNews: [],
    currentIndex: 0,
    timer: null, // Para controlar el intervalo

    init() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        const slot = document.getElementById('slot-top');
        if (slot) {
            slot.innerHTML = `
                <div id="demo-label">ESTADO: <span id="demo-state">SINCRO</span></div>
                <div class="news-banner">
                    <div class="news-source" id="source-name">SISTEMA</div>
                    <div id="news-text">Cargando titulares...</div>
                </div>
            `;
        }
        this.loadNews();
        
        // Usamos el tiempo de CONFIG, si no existe usa 20 seg por defecto
        const tiempoRotacion = (typeof CONFIG !== 'undefined' && CONFIG.tiempos.noticias) 
                                ? CONFIG.tiempos.noticias 
                                : 20000;

        this.timer = setInterval(() => this.rotate(), tiempoRotacion);
    },

    async loadNews() {
        this.updateState("SINCRO...");
        let results = [];

        for (const url of this.sources) {
            try {
                // Cache busting con timestamp para evitar bloqueos
                const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}&t=${Date.now()}`;
                const response = await fetch(proxyUrl);
                const data = await response.json();
                
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data.contents, "text/xml");
                const items = xmlDoc.querySelectorAll("item");
                const sourceName = this.identifySource(url);

                items.forEach((item, index) => {
                    if (index < 10) { // Reducimos a 10 por fuente para no saturar memoria
                        const title = item.querySelector("title").textContent;
                        results.push({
                            title: title.replace(/<!\[CDATA\[|\]\]>/g, '').trim().toUpperCase(),
                            source: sourceName
                        });
                    }
                });
            } catch (e) {
                console.error("Error en fuente:", url);
            }
        }

        if (results.length > 0) {
            this.allNews = results;
            this.shuffle();
            this.updateState("OK");
            this.render(); // Renderiza la primera noticia inmediatamente
        } else {
            this.updateState("ERROR");
        }
    },

    identifySource(url) {
        for (let key in this.sourceMap) {
            if (url.includes(key)) return this.sourceMap[key];
        }
        return "NOTICIAS";
    },

    shuffle() {
        this.allNews.sort(() => Math.random() - 0.5);
    },

    rotate() {
        if (this.allNews.length > 0) {
            this.currentIndex = (this.currentIndex + 1) % this.allNews.length;
            this.render();
        }
    },

    render() {
        const textEl = document.getElementById('news-text');
        const sourceEl = document.getElementById('source-name');
        const current = this.allNews[this.currentIndex];

        if (textEl && sourceEl && current) {
            // Animación suave de salida
            textEl.style.opacity = 0;
            setTimeout(() => {
                sourceEl.innerText = current.source;
                textEl.innerText = current.title;
                // Animación suave de entrada
                textEl.style.opacity = 1;
            }, 500);
        }
    },

    updateState(msg) {
        const el = document.getElementById('demo-state');
        if (el) el.innerText = msg;
    }
};

document.addEventListener('DOMContentLoaded', () => TopBanner.init());