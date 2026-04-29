const CONFIG = {
    isDemo: true,           
    rutaFotos: "./fotos/",
    tiempos: {
        foto: 10000,        
        ciudad: 15000,      
        climaAPI: 300000,
        // TIEMPO DE CADA EFECTO EN LA DEMO (ms)
        demoEfecto: 20000   // Cada efecto durará 12 segundos
    },

    // PARÁMETROS DE EFECTOS
    efectos: {
        lluviaCantidad: 350,
        nieveCantidad: 200,
        
        // --- NUEVOS PARÁMETROS PARA NUBES ---
        nubesCantidad: 60,                // Densidad (cantidad de nubes a la vez)
        nubesTransparencia: 0.08,         // Nivel de transparencia base (0.0 a 1.0)
        nubesVelocidadIzquierda: 0.9,    // Velocidad base de las que van hacia la izquierda
        nubesVelocidadDerecha: 0.73,      // Velocidad base de las que van hacia la derecha
        nubesAlturaLimite: 0.30,          // Altura límite que pueden bajar (0.45 = 45% de la pantalla)
        
        estrellasCantidad: 400, 
        tormentaFrecuencia: 0.98,
        nieblaVelocidad: 0.8 
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