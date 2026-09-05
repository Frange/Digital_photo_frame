// Sistema de Registro de Errores para el Marco de Fotos
const Log = {
    info(mensaje) {
        console.log(`[INFO] [${new Date().toLocaleString()}] ${mensaje}`);
    },
    error(tipo, mensaje) {
        console.error(`[ERROR] [${tipo}] [${new Date().toLocaleString()}] ${mensaje}`);
    }
};

// 1. Capturar errores críticos de JavaScript (variables rotas, sintaxis...)
window.addEventListener('error', function(event) {
    if (event.filename) {
        Log.error('JS_CRITICAL', `${event.message} en ${event.filename}:${event.lineno}`);
    }
});

// 2. Capturar errores de archivos que no existen (Fotos rotas o vídeos corruptos)
window.addEventListener('error', function(event) {
    if (event.target && (event.target.tagName === 'IMG' || event.target.tagName === 'VIDEO')) {
        const rutaRelativa = event.target.src.replace(window.location.origin, '');
        Log.error('RESOURCE_LOAD', `No se pudo cargar el archivo: ${rutaRelativa}`);
    }
}, true); // El 'true' es vital para activar la escucha profunda de elementos HTML