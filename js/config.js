const CONFIG = {
    isDemo: false,
    mostrarEfectos: false,           
    rutaFotos: "./fotos/",
    showTopBanner: false,    
    showBottomBanner: false,  

    // --- SECCIÓN DE ANUNCIANTES ---
    announcerSettings: {
        active: false,            
        demoMode: false,         
        
        filtros: {
            isAll: true,       
            isSimpsons: false,
            isFuturama: false,
            isSouthPark: false,
            isDisney: false,    
            isWally: false,    
            isMrBean: false,    
            isOtros: false     
         },

        durations: {
            food: 20,
            night: 20,
            characters: 20
        },

        frecuencias: {
            charactersMin: 1,  
            charactersMax: 10,  
            foodInterval: 10,
            nightInterval: 30
        }
    },

    weather: {
        key_tomorrow_1: "X9GtLJ9n6melFsmRTJpFIgXsQQ3feyLG",
        key_tomorrow_2: "lQ0oBNc6sce82Xe3YoSQ4zELbs8DHO7O",
        key_tomorrow_3: "EZBw5ialt6n8tMMioU1g5ptV9ZlOoGJw",
        city1: "Cabanillas",
        units: "metric",
        lang: "es"
    },
    tiempos: {
        foto: 20000,        
        ciudad: 3000,      
        climaAPI: 15 * 60 * 1000, // CORREGIDO: Unificado a 15 min (900000ms) para proteger tus llamadas
        noticias: 20000,
        demoEfecto: 20000   
    },

    efectos: {
        solBrilloNucleo: 8.0,      
        solBrilloHalos: 0.010,      
        solRotacionVelocidad: 0.0000012, 
        solEscalaFuga: 8,          
        nubesCantidad: 30,
        nubesTransparencia: 0.09,
        nubesVelocidadIzquierda: 0.99,
        nubesVelocidadDerecha: 0.99,
        nubesAlturaLimite: 0.30,
        lluviaCantidad: 250,
        lluviaVelocidad: 25,
        nocheOscuridad: 1.0,       
        estrellasCantidad: 400,
        estrellasParpadeo: 0.1,  
        estrellasRotacion: 0.00001, 
        estrellasFugacesFrecuencia: 0.0002, 
        nocheTransparencia: 0.9,    
        nocheAlturaLimite: 0.40,    
        granizoCantidad: 30,
        granizoVelocidad: 20,
        nieveCantidad: 400,
        nieveSueloOpacidad: 0.8,  
        nieblaVelocidad: 2.00, 
        nieblaCantidad: 50,                
        nieblaTransparencia: 0.12,         
        nieblaAlturaMinima: 0.1,           
        nieblaAlturaMaxima: 0.0,           
        tormentaFrecuencia: 0.982,
        tormentaRayoFrecuencia: 0.025,      
        tormentaRelampagoFrecuencia: 0.03,  
        tormentaVelocidadDesvanecimiento: 0.02, 
    },

    demoModos: [
        'Día: Sol', 'Día: Sol con nubes', 'Día: Lluvia', 'Día: Llovizna', 'Día: Nubes', 
        'Noche: Granizo', 'Día: Niebla', 'Día: Nieve', 'Día: Niebla', 'Día: Tormenta y Lluvia', 
        'Día: Tormenta', 'Día: Granizo', 'Día: Viento fuerte', 'Noche: Limpio', 'Noche: Nubes', 
        'Noche: Lluvia', 'Noche: Llovizna', 'Noche: Tormenta', 'Noche: Tormenta y Lluvia', 
        'Noche: Niebla', 'Noche: Nieve', 'Noche: Niebla'
    ],
    ciudades: [
        { nombre: "Cabanillas del Campo", query: "Cabanillas+del+Campo" },
        { nombre: "Torrevieja", query: "Torrevieja" }
    ],
    debugMode: true
};