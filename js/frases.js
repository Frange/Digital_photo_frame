const FRASES_ANNOUNCER = {
    // Frases genéricas graciosas para cualquier momento
    genericas: [
        "¿Me ves? ¡Qué bien salgo en las fotos!",
        "Pasaba por aquí y digo: ¡voy a saludar!",
        "¿Alguien ha dicho comida? Ah, no, que soy un dibujo.",
        "Si me tocas la pantalla, no pasa nada, pero me hace cosquillas.",
        "Dato curioso: No parpadeo nunca.",
        "¿Has visto qué píxeles más bien puestos tengo?",
        "No me mires así, que me pongo colorado.",
        "Aquí, esperando a que alguien me saque a pasear."
    ],
    
    // Frases sobre el clima (se activarán según la temperatura)
    clima: {
        frio: ["¡Me estoy quedando congelado!", "Saca la manta que mis bits tiritan.", "¡Qué rasca hace fuera!", "Operación pingüino activada."],
        calor: ["¡Me estoy derritiendo!", "Ni un ventilador me salva hoy.", "A este paso me convierto en un JPG quemado.", "¡Humedad nivel: Saunita!"],
        templado: ["Ni frío ni calor, el tiempo ideal para ser un dibujo.", "Qué día más majo se ha quedado."]
    },

    // Frases de tiempo
    comida: ["¡Hora de hincar el diente!", "¿Es eso una croqueta? Dame una.", "Mi estómago virtual ruge.", "Ñam ñam..."],
    noche: ["¡A las mantas!", "Buscando el modo oscuro...", "Zzz... ¿quién me despierta?", "Hora de soñar con ovejas eléctricas."],

    // Función para obtener una frase aleatoria inteligente
    obtenerFrase(temp, hora) {
        let bolsa = [...this.genericas];
        
        if (temp < 10) bolsa.push(...this.clima.frio);
        else if (temp > 28) bolsa.push(...this.clima.calor);
        else bolsa.push(...this.clima.templado);

        const randomIndex = Math.floor(Math.random() * bolsa.length);
        return bolsa[randomIndex];
    }
};