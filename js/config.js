const CONFIG = {
    isDemo: true,           // Si es true, permite forzar efectos
    rutaFotos: "./fotos/",
    tiempos: {
        foto: 10000,        // Rotación de fondo (10 seg)
        ciudad: 15000,      // Rotación de ciudad (si aplica)
        climaAPI: 300000    // Actualización API (5 min)
    },
    ciudades: [
        { nombre: "Cabanillas del Campo", query: "Cabanillas+del+Campo" },
        { nombre: "Torrevieja", query: "Torrevieja" }
    ],
    // Listado de archivos locales
    files: [
        'foto_0000001.jpg',
    ],
    debugMode: true
};