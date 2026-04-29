const CONFIG = {
    isDemo: true,           
    rutaFotos: "./fotos/",
    tiempos: {
        foto: 10000,        
        ciudad: 15000,      
        climaAPI: 300000,
        // TIEMPO DE CADA EFECTO EN LA DEMO (ms)
        demoEfecto: 12000   // Cada efecto durará 12 segundos
    },

    // PARÁMETROS DE EFECTOS
    efectos: {
        lluviaCantidad: 350,
        nieveCantidad: 200,
        nubesCantidad: 120, // Aumentado para que se vean sí o sí
        estrellasCantidad: 400, // Nuevo parámetro
        tormentaFrecuencia: 0.98,
        nieblaVelocidad: 0.8 // Un poco más rápido para que se note
    },

    // Orden de los efectos en la demo
    demoModos: [
        'Día: Sol con nubes', 
        'Día: Nubes', 
        'Día: Sol', 
        'Día: Granizo', 
        'Día: Lluvia', 
        'Día: Tormenta y Lluvia', 
        'Día: Niebla', 
        'Día: Nieve', 
        'Día: Viento fuerte',
        'Noche: Limpio', 
        'Noche: Nubes', 
        'Noche: Lluvia', 
        'Noche: Tormenta y Lluvia', 
        'Noche: Niebla', 
        'Noche: Granizo', 
        'Noche: Nieve'
    ],
    ciudades: [
        { nombre: "Cabanillas del Campo", query: "Cabanillas+del+Campo" },
        { nombre: "Torrevieja", query: "Torrevieja" }
    ],
    files: [
        'foto_0000001.jpg',
    ],
    debugMode: true
};