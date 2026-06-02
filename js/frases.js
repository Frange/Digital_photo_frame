const FRASES_ANNOUNCER = {
    personajes:{
        genericas: [
            "¿Me ves? ¡Qué guapo salgo!", "¡Hola! ¿Hay alguien ahí?", "Dato: no parpadeo nunca.",
            "¿Me vas a saludar o qué?", "¡Qué bien se vive aquí dentro!",
            "Esperando a que pase algo emocionante.", "¿Alguien me ha llamado?", 
            "¡Soy el rey de la pantalla!",
            "¿Qué tal todo por fuera?", "¡Vaya fotos más feas!", "¿Quién eligió estas fotos?",
            "Esa foto de fondo... en fin.", "¡Vaya cuadros!", "Oye, ¡qué foto más rara!",
            "¡Vaya día de fotos raras!", 
            "Hola Diegooooo",
            "Hola César",
            "Hola Samuel"
        ]
    },


    // --- SECCIÓN CLIMA Y HORARIOS (Lógica original) ---

    clima: {
        frio: [
            "Parece Finlandia, qué frío",
            "¡Me estoy quedando tieso!", "¡Qué rasca hace!", "Mmmm me me me con congelo",
            "Saca la manta, que tirito.", "Operación pingüino activada.", "¡Qué frío, por Dios!",
            "¿Alguien tiene un calefactor?", "Se me va a congelar la sonrisa.", "¡Qué hielecito más rico! (Es broma).",
            "Tengo los pies como témpanos.", "A este paso me hago un cubito.", "¡Necesito un chocolate caliente!",
            "¿Quién ha dejado la nevera abierta?", "Vaya frío siberiano.", "¡Me castañean los dientes!",
            "No siento la nariz.", "¡Parezco un dibujo de Frozen!", "¡Qué tiritera tengo!",
            "Saca la bufanda de cuadros.", "Tengo el ánimo por los suelos (y helado).",
            "¡Qué frío más seco!", "¡A este paso nieva en el salón!", "Me falta el brasero de la abuela.",
            "¡Qué ganas de solazo!", "¡Me estoy helando por momentos!", "¡Vaya tela con el termómetro!",
            "¡Cerrad la puerta, que entra el frío!"
        ],
        calor: [
            "¡Me estoy derritiendo!", "¡Qué solazo!", "Humedad nivel sauna.", 
            "Necesito un ventilador ya.", "¡Qué calor hace!", "¡Me voy a quedar pegado!",
            "¿Quién ha puesto el horno a tope?", "Vaya bochorno...", "¡Ni un soplo de aire!",
            "¡Traedme un gazpacho helado!", "Estoy sudando gotas de tinta.", "¡Qué fuego hace fuera!",
            "Parece que estamos en el desierto.", "¡Saca el abanico, por favor!", "Me falta el aire.",
            "¿Es un espejismo o eres tú?", "¡Qué ganas de una piscina!", "Ojo, que quema el suelo.",
            "¡Estoy a punto de evaporarme!", "Vaya sol de justicia.", "¡Menudo horno es esto!",
            "No me toques, que quemo.", "¡Me voy a poner moreno de golpe!", "Dame un poco de hielo.",
            "Me falta el bañador.", "¡Esto es una barbacoa y yo soy el filete!", "¡Qué bochornazo!",
            "No se puede estar en la calle.", "¡A este paso me hago un zumo!", "¡Qué calorina!",
            "Siento que voy a echar humo.", "¡Me voy a la Antártida!", "¡Ni una nube para un respiro!",
            "¡Qué sofocón!", "Esto no es normal, de verdad.", "¡Me va a dar algo!",
            "¿Quién ha subido el termostato?",
            "Tengo la cabeza como un bombo.", "¡Poned el aire a tope!", "¡Me falta un helado de tres bolas!",
            "Vaya sol de castigo.", "¡Qué bochorno más pegajoso!", "Estoy para que me echen sal.",
            "¡Me estoy asando vivo!", "¡Qué ganas de que refresque!", "¡Menudo fuego!",
            "Ni un ventilador me salva hoy.", "¡Qué tarde más larga!", "¡Me estoy disolviendo!",
            "Busco una cueva fresca.", "¡Qué chufa de calor!", "¡Vaya solazo de agosto!",
            "Esto es un suplicio.", "¡Qué aire más pesado!", "Me falta la toalla y la playa.",
            "¡Menuda solana cae!", "¡Me va a dar un parraque!", "¡Qué calor más seco!",
             "¡Vaya horno Cabanillas!", "¡Socorro, calor!"
        ],
        templado: [
            "¡Qué día más bueno hace!", "Se está de lujo aquí.", "Ni frío ni calor, perfecto.", "Día ideal para dar un paseo.",
            "¡Qué maravilla de temperatura!", "Se está agustito hoy, ¿eh?", "Clima ideal para estar alegre.", "¡Qué gozada de tarde!",
            "Hoy el tiempo nos regala paz.", "Se está de cine ahora mismo.", "¡Qué alegría de día!", "Temperatura suave, como a mí me gusta.",
            "Hoy no hace falta ni chaqueta.", "Se está fetén por aquí.", "¡Qué suerte tenemos con este tiempo!", "Día redondo para disfrutar.",
            "Ni un pero le pongo hoy.", "¡Qué brisa más agradable!", "El punto justo para ser feliz.", "Se está genial en esta pantalla.",
            "Día para pasear y disfrutar.", "¡Qué relax de temperatura!", "Ni sudar ni tiritar hoy.", "Está de cine el día.",
        ],        
        lluvia: [
                "Parece que va a llover mucho.", "¡A sacar el paraguas rápido!", "Vaya día gris se ha quedado.", "¡Me voy a mojar entero!",
                "¿Alguien tiene un chubasquero?", "Agua va, ¡cuidado con eso!", "Día de peli y manta.", "¡Qué manera de llover ahora!",
                "Cuidado con los charcos grandes.", "Huele a tierra mojada, ¡qué rico!", "¡Vaya tormenta se avecina hoy!", "Hoy toca mojarse los pies.",
                "El cielo se está cayendo.", "¡Qué día más feo hace!", "Me gusta el ruido del agua.", "No salgas sin paraguas, ¿eh?",
                "¡Vaya chaparrón está cayendo ahora!", "Hoy el sol se ha jubilado.", "Lluvia y café, plan perfecto.", "¡Qué nubarrones más negros veo!",
                "Parece que no va a parar.", "El campo lo agradece mucho.", "¡Menuda tromba de agua hoy!"
        ],  
        nieve: [
            "¡Ohhh! ¡Está nevando fuera ahora!", "¡Guerra de bolas de nieve!", "Qué bonito está todo blanco.", "¡A hacer un muñeco hoy!",
            "¡Vaya nevada está cayendo hoy!", "Saca el trineo del trastero.", "¡Qué frío pero qué bonito!", "Parece una postal de Navidad.",
            "Cuidado, que el suelo resbala.", "¡Copos de nieve por doquier!", "Todo está cubierto de azúcar.", "¡Qué blanco está el barrio!",
            "Hoy toca abrigarse el doble.", "¡Menuda helada y qué nieve!", "Me encanta ver los copos.", "¡Cabanillas parece el Polo Norte!",
            "Cuidado con las placas de hielo.", "¡Nieve, nieve y más nieve!", "Hoy el paisaje es mágico.", "Saca los esquís de paseo.",
            "¡Qué silencio trae la nieve!", "Parece que vivimos en Alaska.", "¡Menudo espesor hay ya hoy!", "Hoy el coche no sale.",
            "¡Qué frío más blanco hace!", "Me pido ser el muñeco.", "Cuidado con los carámbanos largos.", "¡Vaya manto de nieve hoy!",
            "La nieve me pone alegre.", "Hoy el café sabe mejor.", "¡Qué maravilla de copos hoy!", "Todo está en silencio ahora.",
            "¡Menuda Filomena se avecina hoy!", "Cuidado al pisar lo blanco.", "¡Qué aventura salir hoy fuera!", "Mejor me quedo mirando aquí.",
        ],
        nubes: [
                "Vaya nubes más feas hay.", "El sol se está escondiendo.", "Día gris, ¡qué poca alegría!", "Parece que el cielo avisa.",
                "¡Qué nubarrones más negros veo!", "Hoy el sol no trabaja.", "Está el cielo muy tapado.", "Vaya manta de nubes hoy.",
                "No se ve ni un claro.", "Día para quedarse en casa.", "¡Qué tarde más grisácea hoy!", "El sol está de vacaciones.",
                "¡Menuda capa de algodón gris!", "Hoy el día está triste.", "Falta un poco de luz.",
                "Vaya nubes más bajas hoy.", "El cielo está muy encapotado.", "Qué ganas de ver sol.",
            ],
            soleado: [
                "¡Vaya solazo ha salido hoy, Didi!", "¡Qué luz más buena tenemos!", "Día ideal para lucir gafas.", 
                "¡Qué alegría ver este solete!",
                "El sol nos regala mucha energía.", 
                "¡Qué día más brillante y limpio!", "Día de terraza y buen humor.", 
                "¡Qué ganas de salir fuera!",
                "Hoy el sol es el protagonista.", "¡Qué luz más clara y radiante!", 
                "Día para disfrutar del buen tiempo.", "¡Qué suerte tener este sol!",
            ]
        },

    horarios: {
            manana: [
                "Buenos días, Diego", "Buenos días, César", "Buenos días, Samuel",
                "¿Quién ha inventado madrugar?", "Cinco minutitos más, por favor.", "Parezco un león despeinado hoy.", 
                "¡Necesito café en vena ya!",
                "¿Ya es de día? ¡Qué horror!", "Aún no soy persona, aviso.", "Tengo más sueño que un lirón.", 
                "¡Venga, que hoy salimos guapos!"
            ],
            tarde: [
                "Buenos tardes, Diego", "Buenos tardes, César", "Buenos tardes, Samuel",
                "¿Qué merendamos? Tengo un hambre...", "La tarde se me hace bola.",
            ],
            noche: [
                "Buenos noches, Diego", "Buenos noches, César", "Buenos noches, Samuel",
                "¿Has visto esa estrella fugaz?", "¡Qué oscuridad! Me da miedo.", 
                "¿Hay alguien debajo de mi cama?", "¡Mira cuántas estrellas hay hoy!",
                "A soñar con mil estrellas fugaces."
            ],
            hambre: [
                "¡Tengo hambre!", "Me comería un jabalí.", "¿Es eso una croqueta?", "¡Hora de comer!",
                "¡Ñam ñam!", "CROQUETAAAAAAAS", "¡Me ruge la tripa!",
                "¿Huele a tortilla?", "Dame un bocado.", 
                "¿Hay postre?", "Me comería un buey.", 
                "¡Tengo un hambre que no veas!", "¿Hay patatas?", "¡Me comería un kilo de pan!",
                "¡Quiero chocolate!", "¡Me falta el postre!",
                "¡Tengo un hambre de susto!", "¡Quiero un bocata!", "¡Me comería un camión!", "¡A por la cena!",
                "¡Tengo un hambre que truena!", "¿Hay fruta?",
                "¡Me comería una vaca!",
            ],
        },


simpsons: {
        fotos: {
            homer: 7,
            bart: 9,
            lisa: 4,
            maggie: 3,
            abe: 1,
            ralph: 2,
            pica: 1,     
            marge: 1,     
            burns: 2,  
            krusty: 2,   
            srtopo: 1,
            flanders: 2,
            genericos: 13,
            default: 1    // Siempre déjalo como última opción
        },
        // Para archivos s1.png, s2.png... (Frases genéricas)
        genericos: [
            "¡Hola!", 
            "¿Qué tal todo por Cabanillas?", "¡Mola Cabanillas!",
            "¿Me das un donut?", "A la de tres...",
            "Hola Diego",
            "Hola César",
            "Hola Samu",
        ],
        // Personajes con nombre específico
        homer: [
            "Cama arri-ba, cama aba-jo","¡Mmm... birraaaaa", "¡Mmm... cervezaaaa", "Mmm... chocolate...", "¡Me aburro!", 
            "¡Sálvame, Superman!", "Trabajar es para tontos.", "Qué listo soy yo, LSTO, \ndigo LISTO",
            "La televisión da mucho y pide poco", "Maldito cacharro",
            "¿Dónde está el mando?", "La tele me enseña mucho.", "¡Cerveza gratis! ¿Dónde?",
            "¡Cállate, Flanders!", "Estúpido, Flanders! ", "Mosquis",
            "Hoy no pienso levantarme.", "¡Qué día más largo!", "Mmm... cerveza Duff...",
            "¡No me comas!", "¡Yuju! ¡Soy rico!", "Mi cerebro me odia hoy.", "¿Eso se come?",
            "¡Soy el rey del sofá!", "Mmm... pizza fría...", "¡No he sido yo!", "¡Ouch!",
            "¡Me quiero ir!", "¡Todo es culpa de Flanders!", "¡Soy un genio!", "Mmm... rosquillas...",
            "Tengo hambre, ¿hay donuts?", "¡A por el mando!", "¡Soy un hombre de mundo!",
            "¡Qué bien me sienta esto!", "Mañana lo hago, seguro.", "¿Alguien ha visto mi dignidad?",
            "¡Vaya cuadro de foto!", "¡Qué hambre tengo!"
        ],
        bart: [
            "Diego, ¿ Qué pasa BRO ?",
            "César, ¿ Qué pasa BRO ?",
            "Samuel, ¿ Qué pasa BRO ?",
            "¡Multiplícate por cero!", "¡Yo no he sido!", "¡Ay, caramba!", "¡Soy el amo!",
            "¡Diego, molas mazo!", 
            "¡César, molas mazo!", 
            "¡Samuel, molas mazo!", 
            "¡Soy un peligro!", "¿Hacemos una gamberrada, Samuel?", "¡Toma ya!",
            "¡A dormir a los peces!", "¡Qué aburrimiento de clase!", "¡Libertad para los niños!",
            "¡Soy Bartman!", "¡Cuidado con mi skate, Diego!", "¡Qué pasa, viejo!", "¡Soy un rebelde!",
            "¿Llamamos a Moe?", "¡Qué asco de deberes!", "¡Soy un crack!", "¡No me rayes!",
            "¡A por todas!", "¡Vaya tela, colega!", "¡No me busques las cosquillas!",
            "¡Nadie me comprende!", "¡Oye, tú, mírame!", "¡Soy una leyenda!", "¡Sálvese quien pueda!",
            "¡Vaya par de narices!", "¡Esto es la monda!", "¡Al abordaje!", "¡Qué risa, tía Felisa!"
        ],
        lisa: [
            "Me encanta Diego, \nle encante leer como a mí",
            "César me parece muy guapo", "Samuel es guapísimo", "Diego es un bruto",
            "¡Soy una superdotada!", "¡El mundo necesita jazz!", "¡No comáis carne!", "¡Leed más!",
            "¡Soy muy lista!", "¡Qué falta de cultura!", "¡Necesito estudiar!",
            "¡El saber no ocupa lugar!",
            "¡Soy la mejor!", 
        ],
        burns: [
            "¡Excelente!", "¡Suelten a los perros!", "¿ Quién eres tu ?, ahh Diego",
            "¡Denme mi té!", "¡Soy el jefe!", "¡Qué asco de pobres!", "¡Páguenme ahora!",
            "¡Soy una leyenda viva!", "¡Inicien el plan!", "¡Dominen el mundo!", "¡Qué alegría ser yo!",
            "¡Excelente noticia!",
            "¡Denme más poder!", "¡Soy invencible!",
            "¡El dinero lo compra todo!"
        ],
        marge: [
            "Diego, pórtate bien", "Samuel, no pegues a tus hermanos", "César, deja la tablet ¡ YA !",
            "¡Hummmmm!", "¡Niiiiiños, portaos bien!", "¡Homer, por favor!", "¡Sed buenos!",
            "¡Un poco de limpieza!",
            "¡Homer, deja eso!", "¡A comer!",
            "¡Qué paciencia tengo!", "¡Cuidado con la ropa!",
            "¡Homer, no hagas eso!", "¡Qué casa más sucia!", "¡A dormir, niños!", "¡Qué maravilla!",
            "¡Qué jaleo!"
        ],
        maggie: [
            "¡Gugu tata!", "¡Dada!", "Sam Sam", "Diiiiego", "Cézaar"
        ],
        flanders: [ 
            "¡Hola, holita, Samuelito!", 
            "¡Perfectirijillo!", "¡Qué alegría verte!", "¡Bendiciones!",
            "¡Qué maravilla de día!", "¡Todo va de fábula!", "¡Qué bien!",
            "¡Sed muy buenos!", "¡Ay, qué susto!", "¡Estupendillo!",
            "¡Qué suerte tenemos!", "¡Arriba ese ánimo!", "¡Qué familia!",
            "¡Qué ilusión!", "¡Arriba, pecadores!",
            "¡Qué sol tan rico!",
            "¡Vecinito, saluda!", "Hola, holita"
        ],
        ralph: [
            "¡Mi gato se llama guantes!", "¡El aliento de mi gato \nhuele a comida de gato!", "¡Soy especial!", "1 + 1 son 4", "Hasta yo sé eso...",
            "¡Gané, gané!", "Señorita Hoover, \nel gusano saltó a mi boca \ny me lo tragué, \n¿puede darme otro?", "Pato, pato, pato, \npato, pato, pato",
            "Eres chu chu chuuuuli",
            "Yo me llamo Ralph", "César es mi mejor amigo", "¡Y mira esa roca! \nAhí es donde vi al Gnomo. \nMe dijo que quemara cosas...",
            "¿Yo suspender lengua? \nEso no posible es", "Corre plátano", "¡Soy un plátano!", "¡El ratoncito Pérez \nme ha dejado un diente!",
            "¡Me he hecho pipí!", "¡Soy una estrella!", "¡Quiero un pony!", "¡Mi nariz tiene un tesoro!"
        ],
        abe: [
            "¡En mis tiempos...!", "¡Nubes fuera!", "¡Me he dormido!", "¡Qué viejo soy!",
            "¡Escuchad mi historia!", "¡Ay, mis riñones!", "¡Ya no hay respeto!", "¡Contaré una batalla!",
            "¡Donde yo vivía...!", "¡Qué sueño tengo!", "¡Oídme bien!", "Eso no pasaba en mi época",
            "¡Qué poca vergüenza!", "¡Escuchad mi vida!", "Cuando era joven..."
        ],
        srtopo: [
            "¿ Quién ? ¿ Dieeegooo ?",
            "¡Nadie quiere al Sr. Topo!", "¡No me golpeen!", "¡Soy un topo!", "¡Ay, mi vista!",
            "¡Hace mucho Sol!", "¡Qué mala suerte!", "¡No me pisen!", "¿Qué?", "¿ Qué pone ahí ?",
            "¡Caray, qué Sol!", "¿ Quéeeee ?", "No veo un pimiento", "He perdido mis gafas", "¿ Dónde estoy ?"
        ],
        krusty: [
            "Hola, holaaaaaa ¿ Qué tal César ?",
            "Jejejejejee je jee", "¿ Qué diandres es eso ?"
        ],
        pica: [
            "Hola Diego",
            "Malditos gatos", "¡Toma dinamita!", "¡Zasca!", "¡Soy el más listo!",
            "¡Rasca es tonto!", "¡Toma mazo!", "¡Qué risa!"
        ]
    },

    // --- SECCIÓN FUTURAMA (Para ampliar) ---
    futurama: {
        fotos: {
            bender: 5,     // bender1 a bender5
            fry: 7,        // fry1, fry2, fry4, fry5, fry6, fry7 (ojo: falta el 3, el backup lo arreglará)
            profe: 3,      // profe1 a profe3
            zoig: 4,       // zoig1 a zoig4
            genericos: 10, // f1 a f10
            default: 1
        },
        // Estas frases se usarán con las fotos f1.png a f10.png
        genericos: [
            "¡Bienvenidos al mundo del mañana!", 
            "¿Nadie más siente un ligero olor a universo?", 
            "¡Por las barbas de la nebulosa de Orión!",
            "¡A Cabanillas y más allá!", "¡Hola Diego!", "Hola Zshar", "Samu, pórtate bien"
        ],
        bender: [
            "Diego, qué pasa, muchacho",
            "Soy muy generoso, \nuna vez hasta doné sangre\n no era mía, por supuesto",
            "Yo ingiero gran cantidad de sano y nutritivo alcohol",
            "¡Muerde mi brillante trasero metálico!", 
            "Voy a construir mi propio parque de atracciones...",
            "¡Soy el mejor!", "¡Cerveza gratis!",
            "01100110 01110010",
            "¿Queréis matar a todos los humanos? He tenido un sueño precioso.",
            "¡Soy una unidad de doblaje, no un robot de cocina!", "¡A por el botín!",
            "Bender es el rey, Bender es el amo.", "No sé si es gusano o es babosa\n pero envidio a esa cosa"
        ],
        fry: [
            "Samuel, chavalote, saludos",
            "¿Sabes que es lo peor de ser esclavo?\n Te hacen trabajar, pero no te pagan",
            "¡Stephen Hawking! \n¿No fue usted el que inventó la gravedad?","¡Toma mi dinero!", 
            "No sé si es una buena idea o si tengo hambre.",
            "¡Estoy volando!", "¿Qué ha pasado?", "¡Soy mi propio abuelo!",
            "¿Desde cuándo los robots tienen sentimientos?", "¡Hola, mundo!", "¡Mola!"
        ],
        profe: [
            "¡Buenas noticias!", "Good news, everyone", "I don't want to live in this planet anymore", 
            "He inventado un dispositivo... \nque no sirve para nada.",
            "¡A la cámara del juicio!", "¡Por la gloria de la ciencia!",
            "Si mis cálculos no fallan...",
            "¡Oh, por todos los cielos!", "¡La ciencia es asombrosa!"
        ],
        zoig: [
            "¿Necesitáis un médico? \nYo soy médico", "¡Wub wub wub wub wub!",
            "¡Mira qué pinzas!",
            "¿Y por qué no Zoidberg?", "¡Soy un experto en humanos!", "¡Ñam ñam ñam!"
        ]
    },

    // --- SECCIÓN SOUTHPARK (Para ampliar) ---
    southpark: {
        fotos: {
            cart: 4,      // cart1 a cart4
            chef: 1,      // chef1
            ike: 1,       // ike1
            jimmy: 1,     // jimmy1
            kenny: 2,     // kenny1 a kenny2
            kyle: 2,      // kyle1 a kyle2
            mkay: 1,      // mkay1
            stan: 2,      // stan1 a stan2
            genericos: 10, // s1 a s10
            default: 1
        },
        cart: [
            "¡Respetad mi autoridad!", "¡Me voy a mi casa!", 
            "Diegooooooooooooooooooo",
            "¡No estoy gordo, soy de huesos anchos!", "¡Quiero mi tarta!"
        ],
        kenny: [
            "¡Mmmph mmmph! Samuel mmmm", "¡Mmmph mmmph mmmph!", 
            "¡Mmmph!", "¡Mmmph mmph!", "¡Mmmph mmmph... mmmph!",
            "¡Mmph mmmph mmph!", "¡Mmph!"
        ],
        kyle: [
            "¡Hola Cesitar!",
            "¡He aprendido algo hoy!"
        ],
        stan: [
            "Hola familia", 
            "¡Tío, qué fuerte!", "¡Eh, tíos, mirad esto!"
        ],
        chef: [
            "¡Hola, niños!", "¡Sed buenos!", "¡A cocinar!",
            "¡Hay que darle sabor!", "¡Os voy a cantar una canción!",
            "Hola familia", "¡A comer!", "¿ Qué tal estáis ?"
        ],
        mkay: [
            "Las drogas son malas, \n¿ entiendeees ?", "¡M'kay!", 
            "No digas palabrotas\n ¿ entiendeeees ?", "¡M'kay, niños!",
            "Hay que portarse bien ¿ entiendeeees ?",
        ],
        ike: [
            "¡Gugu!",
            "¡Bebé graaaaaaande!"
        ],
        jimmy: [
            "¡Qué gran p-p-p-público!", "¡Hola a t-t-todos!",
            "¿Habéis o-o-oído la última?", "¡T-t-toma ya!"
        ]
    },

    wally: {
        fotos: { genericos: 3, default: 1 }, // Archivos: w1.png, w2.png...
        genericos: [
            "¡Me encontraste!", "¿Dónde estoy ahora?", 
            "¡Hola Diego, soy Wally!", 
            "¡ Hola Samu !", 
            "¡ Hola Cesitar, soy Wally!", 
            "Cucú", "¿A que no me ves?", "Ups"
        ],
        clima: ["¡Qué buen tiempo para esconderse!", "Aquí entre la multitud no se nota el frío."],
        horarios: ["¡Es la hora de buscar!", "¡Casi me voy a otro sitio!"]
    },

    mrbean: {
        fotos: { genericos: 6, default: 1 }, // Archivos: b1.png, b2.png...
        genericos: [
            "¡Bean!", "¡Teddy!", "¡Holaa!", "¡Brilliant!",
             "Diiiiiiegooo!",
            "Hooooola César, soy Mr. Bean", 
            "zzzzzzSAAAMMMM", 
        ]
    },

    disney: {
        fotos: {
            bugs: 2,
            coyote: 3,
            lucas: 2,
            andale: 1,
            silvestre: 2,
            genericos: 2, // Usará las de bugs por defecto
            default: 1
        },
        bugs: ["¡¿Qué hay de nuevo, viejo?!", "¡¿Qué hay de nuevo, Diego?!"],
        coyote: ["¡SOCORRO!", "¡OUCH!", "Propiedad de ACME", "Esta vez no se me escapa..."],
        lucas: ["¡Eres despreciable!", "¡Es la temporada del pato!", "¡Yo soy el que manda aquí!", "¡Dime que soy fantástico!"],
        andale: ["¡Ándale! ¡Ándale César!", "¡Arriba! ¡Arriba!", "La cucaracha..."],
        silvestre: ["¡Me pareció ver un lindo Samuelito!", "¡Sufro mazo!", "¡Ese canario me las pagará!", "¡Zas, en toda la boca!"],
        genericos: ["¡Eso es todo amigos!", "¡Cabanillas mola!", "¡Bip, bip!"]
    },

    otros: {
        // Esta carpeta NO tiene personajes específicos, solo fotos popurrí (o1.png, o2.png...)
        fotos: { 
            genericos: 21, default: 21 
        }, 
        genericos: [
            "Qué pasa Dieeegooo",
            "¡Qué pasa, peña!", "¿Cómo va eso?", "¡Vaya cuadro!", 
            "¡Cabanillas al poder!", 
            "¡Hola Diego!", "¿ Qué tal te va, Diego ?", "Pasa buen día, Didi",
            "¡Hola César!", "¿ Qué tal te va, César ?", "Pasa buen día, Zshar",
            "¡Hola Samuel!", "¿ Qué tal Samu ?", "Pasa buen día, Sam-Sam",
            "¿Qué se cuenta por aquí?", "¡Menuda foto!"
        ],
        clima: [
            "¡Menudo tiempo se ha quedado!", "¡Vaya rasca, Sam!", 
            "¡Qué calorcito más rico!", "¡Huele a lluvia!"
        ],
        horarios: [
            "¡Vaya horas!", "¡Ya es casi la hora!", 
            "¡Cómo pasa el tiempo!", "¡A darle caña al reloj!"
        ]
    },

    // Asegúrate de que la estructura sea esta:
    // personajes: { genericas: [...], cotilleo: [...], ego: [...], atrapado: [...] }

    obtenerFrase(temp, hora, weatherCode = "01d") {
        // 1. Empezamos con las genéricas (ahora dentro de personajes)
        let bolsa = [...this.personajes.genericas]; 

        // 2. Lógica de Temperatura
        if (temp < 10) bolsa.push(...this.clima.frio);
        else if (temp > 28) bolsa.push(...this.clima.calor);
        else bolsa.push(...this.clima.templado);

        // 3. Lógica de Hora
        bolsa.push(`Son las ${hora.toString().padStart(2, '0')}:00 aprox.`);
        if (hora >= 6 && hora < 12) bolsa.push(...this.horarios.manana);
        else if (hora >= 12 && hora < 20) {
            bolsa.push(...this.horarios.tarde);
            if (hora >= 13 && hora <= 15) bolsa.push(...this.horarios.hambre);
        } else {
            bolsa.push(...this.horarios.noche);
            if (hora >= 21 && hora <= 23) bolsa.push(...this.horarios.hambre);
        }

        // 4. Lógica por icono de clima (Añadido Soleado)
        if (["01d", "01n"].includes(weatherCode)) {
            // Si no tienes una categoría 'soleado', puedes usar 'templado' o crearla
            if (this.clima.soleado) bolsa.push(...this.clima.soleado);
        }
        if (["09d", "09n", "10d", "10n"].includes(weatherCode)) bolsa.push(...this.clima.lluvia);
        if (["13d", "13n"].includes(weatherCode)) bolsa.push(...this.clima.nieve);
        if (["03d", "03n", "04d", "04n"].includes(weatherCode)) bolsa.push(...this.clima.nubes);

        const randomIndex = Math.floor(Math.random() * bolsa.length);
        return bolsa[randomIndex];
    }
};