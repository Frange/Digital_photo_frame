const Gallery = {
    init() {
        console.log("==> [DISPATCHER] Analizando configuración de galería...");
        
        // Comprobamos si CONFIG existe y si immich está activo
        const useImmich = (typeof CONFIG !== 'undefined' && CONFIG.immich && CONFIG.immich.active === true);

        if (useImmich) {
            console.log("==> [DISPATCHER] Configuración detectada: MODO IMMICH. Lanzando GalleryImmich.");
            if (typeof GalleryImmich !== 'undefined') {
                GalleryImmich.init();
            } else {
                console.error("==> [DISPATCHER] Error: GalleryImmich no está definido.");
            }
        } else {
            console.log("==> [DISPATCHER] Configuración detectada: MODO LOCAL. Lanzando GalleryLocal.");
            if (typeof GalleryLocal !== 'undefined') {
                GalleryLocal.init();
            } else {
                console.error("==> [DISPATCHER] Error: GalleryLocal no está definido.");
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    Gallery.init();
});