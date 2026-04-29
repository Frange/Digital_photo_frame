/**
 * GESTIÓN DEL BANNER DE NOTICIAS (Top Banner)
 * Versión con protección total contra errores 422/500 y mezcla aleatoria.
 */

const TopBanner = {
    sources: [
        // --- ACTUALIDAD Y DEPORTES ---
        'https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml',
        'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada',
        'https://e00-marca.uecdn.es/rss/portada.xml',
        
        // --- ECONOMÍA ---
        'https://e00-expansion.uecdn.es/rss/portada.xml',
        'https://cincodias.elpais.com/seccion/rss/fortunas/',
        
        // --- CIENCIA Y TECNOLOGÍA ---
        'https://www.rtve.es/api/noticias/tecnologia/rss.xml',
        'https://www.agenciasinc.es/rss',
        'https://www.nationalgeographic.com.es/feeds/ciencia.xml',
        'https://naukas.com/feed/', // Divulgación científica
        
        // --- CULTURA Y SOCIEDAD ---
        'https://www.abc.es/rss/2.0/cultura/',
        'https://elpais.com/rss/elpais/inenglish.xml', // Aunque diga English, el feed RSS2JSON suele traer la versión traducida o filtrada si se fuerza, pero mejor lo vigilamos con el isSpanish.
        
        // --- EUROPA Y MUNDO ---
        'https://www.europapress.es/rss/rss.aspx?ch=00066',
    ],
    sourceMap: {
        'elmundo': 'EL MUNDO',
        'elpais': 'EL PAÍS',
        'marca': 'MARCA',
        'expansion': 'EXPANSIÓN',
        'cincodias': 'CINCO DÍAS',
        'rtve': 'RTVE TECNO',
        'agenciasinc': 'CIENCIA SINC',
        'nationalgeographic': 'NAT GEO',
        'naukas': 'NAUKAS CIENCIA',
        'abc.es': 'ABC CULTURA',
        'europapress': 'EUROPA PRESS',
    },
    allNews: [],
    currentIndex: 0,
    isLoading: false,

    init() {
        const slot = document.getElementById('slot-top');
        if (slot) {
            slot.innerHTML = `
                <div id="demo-label">ESTADO: <span id="demo-state">SINCRO</span></div>
                <div class="news-banner">
                    <div class="news-source" id="source-name">NOTICIAS</div>
                    <div id="news-text">Sincronizando fuentes globales...</div>
                </div>
            `;
        }
        
        this.loadNewsFromAllSources();
        setInterval(() => this.rotate(), 10000);
        setInterval(() => this.loadNewsFromAllSources(), 1200000);
    },

    async loadNewsFromAllSources() {
        if (this.isLoading) return;
        this.isLoading = true;
        this.updateState("SINCRO...");
        
        let temporaryNewsStorage = [];

        // Ejecutamos las peticiones. Si una falla, no afecta a las demás.
        const fetchPromises = this.sources.map(async (url) => {
            try {
                // Añadimos un parámetro random para evitar cacheos que causen 422
                const cacheBuster = `&_t=${Date.now()}`;
                const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}${cacheBuster}`);
                
                if (!res.ok) {
                    console.warn(`TopBanner: Fuente saltada (${res.status}) -> ${url}`);
                    return [];
                }
                
                const data = await res.json();
                
                if (data && data.status === 'ok' && data.items) {
                    return data.items.map(item => ({
                        title: item.title,
                        customSourceName: this.identifySource(url)
                    }));
                }
                return [];
            } catch (e) {
                return [];
            }
        });

        const results = await Promise.all(fetchPromises);
        
        // Filtramos resultados nulos y aplanamos el array
        this.allNews = results.flat().filter(item => item && item.title);

        if (this.allNews.length > 0) {
            this.shuffleNews();
            this.currentIndex = 0;
            this.updateState("OK");
            this.render();
        } else {
            this.updateState("REINTENTO");
            // Si todo falla, al menos dejamos un mensaje que no sea "Cargando..."
            document.getElementById('news-text').innerText = "ACTUALIZANDO TITULARES...";
        }
        
        this.isLoading = false;
    },

    identifySource(url) {
        for (let key in this.sourceMap) {
            if (url.includes(key)) return this.sourceMap[key];
        }
        return "NOTICIAS";
    },

    shuffleNews() {
        for (let i = this.allNews.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.allNews[i], this.allNews[j]] = [this.allNews[j], this.allNews[i]];
        }
    },

    rotate() {
        if (this.allNews.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.allNews.length;
        if (this.currentIndex === 0) this.shuffleNews(); // Re-mezclar al dar la vuelta
        this.render();
    },

    render() {
        const textEl = document.getElementById('news-text');
        const sourceEl = document.getElementById('source-name');
        const item = this.allNews[this.currentIndex];

        if (!textEl || !sourceEl || !item) return;

        textEl.style.opacity = 0;
        sourceEl.style.opacity = 0;

        setTimeout(() => {
            sourceEl.innerText = item.customSourceName;
            textEl.innerText = item.title.toUpperCase();
            textEl.style.opacity = 1;
            sourceEl.style.opacity = 1;
        }, 300);
    },

    updateState(msg) {
        const el = document.getElementById('demo-state');
        if (el) el.innerText = msg.toUpperCase();
    }
};

document.addEventListener('DOMContentLoaded', () => TopBanner.init());