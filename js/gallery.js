(function() {
    function sendLogToServer(type, args) {
        const msg = Array.from(args).map(arg => {
            if (arg instanceof Error) return `${arg.message}\n${arg.stack}`;
            if (typeof arg === 'object') {
                try { return JSON.stringify(arg); } catch (e) { return String(arg); }
            }
            return String(arg);
        }).join(' ');
        const formatted = `[JS_${type.toUpperCase()}] ${msg}`;
        fetch(`/?JS_LOG=${encodeURIComponent(formatted)}`).catch(() => {});
    }

    const origLog = console.log;
    const origWarn = console.warn;
    const origErr = console.error;

    console.log = function(...args) {
        origLog.apply(console, args);
        sendLogToServer('LOG', args);
    };

    console.warn = function(...args) {
        origWarn.apply(console, args);
        sendLogToServer('WARN', args);
    };

    console.error = function(...args) {
        origErr.apply(console, args);
        sendLogToServer('ERR', args);
    };
})();

window.addEventListener('DOMContentLoaded', () => {
    console.log("==> [DISPATCHER] Analizando configuración de galería...");
    
    // IP externa opcional
    try {
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                const ipEl = document.getElementById('ip-address');
                if (ipEl) ipEl.innerText = data.ip;
            }).catch(() => {});
    } catch(e) {}

    const useImmich = (typeof CONFIG !== 'undefined' && CONFIG.immich && CONFIG.immich.active);

    if (useImmich) {
        console.log("==> [DISPATCHER] Configuración detectada: MODO IMMICH. Lanzando GalleryImmich.");
        if (typeof GalleryImmich !== 'undefined') {
            GalleryImmich.init();
        } else {
            console.error("==> [CRítico] GalleryImmich no está definido. ¿Se ha cargado gallery_immich.js en el HTML?");
        }
    } else {
        console.log("==> [DISPATCHER] Configuración detectada: MODO LOCAL. Lanzando GalleryLocal.");
        if (typeof GalleryLocal !== 'undefined') {
            GalleryLocal.init();
        } else {
            console.error("==> [CRÍTICO] GalleryLocal no está definido. ¿Se ha cargado gallery_local.js en el HTML?");
        }
    }
});
