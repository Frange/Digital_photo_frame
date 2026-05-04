const CONFIG = {
    isDemo: false,
    mostrarEfectos: false,           
    rutaFotos: "./fotos/",
    showTopBanner: false,    // Cambia a false para ocultar noticias
    showBottomBanner: false,  // Cambia a false para ocultar avisos
    tiempos: {
        foto: 20000,        
        ciudad: 30000,      
        climaAPI: 300000,
        noticias: 20000,
        demoEfecto: 20000   // Cada efecto durará 12 segundos
    },

    // PARÁMETROS DE EFECTOS
   efectos: {
        // SOL
        solBrilloNucleo: 8.0,      // Multiplicador de brillo central (0.0 a 1.0)
        solBrilloHalos: 0.010,      // Brillo de los halos circulares
        solRotacionVelocidad: 0.0000012, 
        solEscalaFuga: 8,          // Qué tanto se estira el destello (vapor)

        // NUBES
        nubesCantidad: 30,
        nubesTransparencia: 0.09,
        nubesVelocidadIzquierda: 0.99,
        nubesVelocidadDerecha: 0.99,
        nubesAlturaLimite: 0.30,

        // LLUVIA
        lluviaCantidad: 250,
        lluviaVelocidad: 25,


        // NOCHE
        nocheOscuridad: 1.0,       // 1.0 = Negro puro arriba
        estrellasCantidad: 400,
        estrellasParpadeo: 0.1,  // Velocidad del brillo
        estrellasRotacion: 0.00001, // Velocidad de giro del firmamento
        estrellasFugacesFrecuencia: 0.0002, // Probabilidad por frame (~3-5 cada 5 min)
        nocheTransparencia: 0.9,    // Opacidad de la transición media (0.0 a 1.0)
        nocheAlturaLimite: 0.40,    // Hasta dónde bajan las estrellas (0.65 = 65% de la pantalla)

        // GRANIZO
        granizoCantidad: 30,
        granizoVelocidad: 20,

        // NIEVE
        nieveCantidad: 400,
        nieveSueloOpacidad: 0.8,  // Añadido: 0.8 es bastante opaco, bajalo a 0.5 si quieres que sea más transparente.

        // NIEBLA
        nieblaVelocidad: 2.00, 
        nieblaCantidad: 50,                // Densidad de "bocanadas" de niebla
        nieblaTransparencia: 0.12,         // Nivel de opacidad base (0.0 a 1.0). Mantener bajo para que se vea la foto.
        nieblaAlturaMinima: 0.1,           // Altura mínima en pantalla donde puede APARACER (0.6 = 60% de la pantalla hacia abajo).
        nieblaAlturaMaxima: 0.0,           // Altura máxima hasta donde puede bajar (1.0 = suelo).

        // TORMENTA
        tormentaFrecuencia: 0.982,
        tormentaRayoFrecuencia: 0.025,      // Probabilidad de rayo dibujado por frame
        tormentaRelampagoFrecuencia: 0.03,  // Probabilidad de flash de fondo por frame
        tormentaVelocidadDesvanecimiento: 0.02, // Menos de 0.05 es más lento/suave
    },

    // Orden de los efectos en la demo
    demoModos: [

        'Día: Sol', 
        'Día: Sol con nubes', 
        'Día: Lluvia', 
        'Día: Llovizna', 
        'Día: Nubes', 

        'Noche: Granizo', 
        'Día: Niebla', 
        'Día: Nieve', 
        'Día: Niebla', 
        'Día: Tormenta y Lluvia', 
        
        'Día: Tormenta', 
        'Día: Granizo', 
        'Día: Viento fuerte',

'Noche: Limpio', 
        'Noche: Nubes', 
        'Noche: Lluvia', 
        'Noche: Llovizna', 
        'Noche: Tormenta', 
        'Noche: Tormenta y Lluvia', 
        'Noche: Niebla', 
        'Noche: Nieve',
        'Noche: Niebla', 

    ],
    ciudades: [
        { nombre: "Cabanillas del Campo", query: "Cabanillas+del+Campo" },
        { nombre: "Torrevieja", query: "Torrevieja" }
    ],
    debugMode: true
};