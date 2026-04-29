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
        // NUBES
        nubesCantidad: 100,
        nubesTransparencia: 0.09,
        nubesVelocidadIzquierda: 0.4,
        nubesVelocidadDerecha: 0.66,
        nubesAlturaLimite: 0.30,

        // SOL
        solBrilloNucleo: 8.0,      // Multiplicador de brillo central (0.0 a 1.0)
        solBrilloHalos: 0.10,      // Brillo de los halos circulares
        solRotacionVelocidad: 0.000012, 
        solEscalaFuga: 8,          // Qué tanto se estira el destello (vapor)

        // NOCHE
        nocheOscuridad: 1.0,       // 1.0 = Negro puro arriba
        estrellasCantidad: 400,
        estrellasParpadeo: 0.001,  // Velocidad del brillo
        estrellasRotacion: 0.0003, // Velocidad de giro del firmamento
        estrellasFugacesFrecuencia: 0.0002, // Probabilidad por frame (~3-5 cada 5 min)

        // LLUVIA
        lluviaCantidad: 550,
        lluviaVelocidad: 25,

        // GRANIZO
        granizoCantidad: 150,
        granizoVelocidad: 15,

        // NIEVE
        nieveCantidad: 400,
        nieveSueloOpacidad: 0.8,  // Añadido: 0.8 es bastante opaco, bajalo a 0.5 si quieres que sea más transparente.

        // NIEBLA
        nieblaVelocidad: 3.00, 
        nieblaCantidad: 300,                // Densidad de "bocanadas" de niebla
        nieblaTransparencia: 0.10,         // Nivel de opacidad base (0.0 a 1.0). Mantener bajo para que se vea la foto.
        nieblaAlturaMinima: 0.1,           // Altura mínima en pantalla donde puede APARACER (0.6 = 60% de la pantalla hacia abajo).
        nieblaAlturaMaxima: 0.1,           // Altura máxima hasta donde puede bajar (1.0 = suelo).

        // TORMENTA
        tormentaFrecuencia: 0.982,
        tormentaRayoFrecuencia: 0.015,      // Probabilidad de rayo dibujado por frame
        tormentaRelampagoFrecuencia: 0.02,  // Probabilidad de flash de fondo por frame
        tormentaVelocidadDesvanecimiento: 0.03, // Menos de 0.05 es más lento/suave
    },

    // Orden de los efectos en la demo
    demoModos: [

        'Noche: Limpio', 
        'Noche: Nubes', 
        'Noche: Niebla', 
        'Noche: Lluvia', 
        'Noche: Tormenta', 
        'Noche: Tormenta y Lluvia', 
        'Noche: Niebla', 
        'Noche: Granizo', 
        'Noche: Nieve',

        'Día: Nieve', 
        'Día: Niebla', 
        'Día: Tormenta y Lluvia', 
        'Día: Lluvia', 
        'Día: Nubes', 
        'Día: Sol con nubes', 
        'Día: Sol', 
        'Día: Tormenta', 
        'Día: Granizo', 
        'Día: Viento fuerte',


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