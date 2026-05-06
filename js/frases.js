const FRASES_ANNOUNCER = {
    personajes:{
        genericas: [
            "¿Me ves? ¡Qué guapo salgo!", "¡Hola! ¿Hay alguien ahí?", "Dato: no parpadeo nunca.",
            "¿Me vas a saludar o qué?", "¡Qué bien se vive aquí dentro!", "No me mires así, me corto.",
            "Esperando a que pase algo emocionante.", "¿Alguien me ha llamado?", "¡Soy el rey de la pantalla!",
            "¿Qué tal todo por fuera?", "¡Vaya fotos más feas!", "¿Quién eligió estas fotos?",
            "Esa foto de fondo... en fin.", "¡Vaya cuadros!", "Oye, ¡qué foto más rara!",
            "¿Habéis visto mis zapatos nuevos?", "Soy un modelo de pies a cabeza.", "¡No me ignores!",
            "¿Hay alguien ahí fuera?", "He visto mejores fondos de pantalla.", "Mi vida por un helado.",
            "¿Te gusta mi estilo?", "Soy el alma de la fiesta.", "¡Cuidado con manchar el cristal!",
            "Si me muevo, no te asustes.", "¿Me das un poco de conversación?", "¡Vaya luz tienes hoy!",
            "Mi color favorito es el #FFCC00.", "Estoy a dieta de tonterías.", "No me juzgues, soy así.",
            "¿Sabías que no tengo rodillas?", "¡Esa foto es prehistórica!", "¡Qué selfie más extraño!",
            "Menudo encuadre tiene esa foto...", "Yo saldría mejor ahí detrás.", "¡Mis ojos! ¡Quita esa foto!",
            "¿Eso es una foto o un borrón?", "¡Menudo estilo llevas hoy!", "Soy un artista incomprendido.",
            "¡Alerta de personaje guapo!", "Mira qué curvas tengo.", "¿Qué hay de nuevo, vecino?",
            "¡Vaya caretos salen ahí atrás!", "Podría estar en el cine ahora.", "¡Menuda planta tengo!",
            "¿Alguien sabe dónde se cena?", "Mi contrato no incluía estas fotos.", "Soy más listo de lo que parezco.",
            "¡Choca esos cinco! Ah, no llego.", "¿Te cuento un secreto? Me aburro.", "¡Vaya par de narices!",
            "¿Me estás mirando a mí?", "¡Saca al perro de una vez!", "¡Vaya resaca de imágenes tengo!",
            "¡Ponme un espejo delante!", "Soy un clásico, no un viejo.", "¡Vaya tela con los paisajes!",
            "¿Eso de ahí es una mancha?", "¡No me pises lo fregao!", "Estoy atrapado, ¡sácame a bailar!",
            "¡Ayuda! ¡He visto una araña!", "Soy un dibujo con mucha clase.", "¿Me ves bien desde ahí?",
            "¡Cero patatero para esa foto!", "¡Menudo despeinado llevas!", "Soy el más simpático de aquí.",
            "¿Te acuerdas de no usar pantallas?", "¡Qué tiempos aquellos!", "Oye, ¿me traes algo de picar?",
            "Si no respondo, estoy pensando.", "¡Vaya lío de gente!", "¿Me invitas a un café?",
            "Soy el primo guapo del grupo.", "¡No acepto críticas!", "¿Qué tal se está ahí fuera?",
            "¡Vaya fondo más hortera!", "Esa foto está toda movida.", "¡Limpia el objetivo de la cámara!",
            "¿Soy yo o aquí hace eco?", "¡Mírame a los ojos!", "¡Tengo mucha energía!",
            "No me toques la nariz.", "¡Vaya cara de lunes!", "¡Espero que no me borres!",
            "Soy tu mejor amigo plano.", "¡Vaya lío de trastos!", "¿Has visto mi sombra?",
            "¡Tengo mucha chispa!", "¡Vaya día llevamos!", "¡Dame un aplauso!", "Soy famoso en todo el barrio.",
            "¡Qué alegría verte!", "¿Eso es una cámara o qué?", "¡Sonríe un poco, hombre!",
            "¡Vaya pose más ridícula!", "¡Me pica la nariz!", "¡Soy el más rápido!",
            "¡No me dejes solo!", "¡Vaya viaje de fotos!", "Tengo un hambre de locos.",
            "¿Me queda bien este color?", "¡Esa foto es un poema!", "A ver cuándo cenamos.",
            "A esa foto le falta filtro.", "¿Hacemos algo divertido?", "Menudo aburrimiento de paisaje.",
            "¡Saca una foto de las buenas!", "Hoy estoy de un humor excelente.",
            "¿Me estás haciendo un vídeo?", "¡Qué planta tengo hoy!", "Oye, ¿has visto mis llaves?",
            "Esa foto me da escalofríos.", "Soy el dibujo más humilde.", "¡Vaya peinado llevas tú!",
            "¿Te gusta mi peinado nuevo?", "¡Parezco una estrella de Hollywood!", "Me aburro más que una ostra.",
            "¿Qué se cuece por la cocina?", "¡Vaya foto más mal hecha!", "A ver si nos movemos un poco.",
            "¡Qué bien salgo en todas!", "Me pica la espalda, ¿me rascas?", "No me mires de reojo.",
            "¡Soy un dibujo de alto copete!", "Vaya caras de sueño veo.", "¿Eso es un bostezo?",
            "¡Tengo un hambre que doy calambres!", "No me ignores, que soy sensible.", "¿Qué tal el cotilleo de hoy?",
            "Esa foto es para quemarla.", "¡Vaya fondo más soso!", "Oye, ¿te cuento un chiste?",
            "Soy el alma de este trasto.", "¡Qué bien me sienta el amarillo!", "No me hagas burla.",
            "¿Me ves bien o me acerco?", "¡Vaya día de fotos raras!", "Saca el dedo del objetivo.",
            "¡Qué elegancia la de Francia!", "Soy un tipo con muchos principios.", "¿Me das un poco de agua?",
            "¡Vaya percha tengo hoy!", "Esa foto está del revés.", "No me saques de mis casillas.",
            "¡Qué vida más perra!", "Soy el rey de este mambo.", "¿Quién ha puesto ese fondo?",
            "¡Vaya cuadro de comedor!", "Hoy me siento muy importante.", "No me toques los botones.",
            "¿Te cuento mi vida? Es plana.", "¡Vaya colección de selfies!", "A ver si limpias el cristal.",
            "¡Qué alegría darte los buenos días!", "Soy un dibujo con mucho carácter.", "¿Me haces un hueco ahí?",
            "¡Vaya colección de fotos malas!", "Oye, ¡qué planta tengo!", "Soy más salado que las pipas.",
            "¿Me das un beso? Es broma.", "¡Qué bien me sienta este marco!", "No me mires con esa cara.",
            "¡Vaya día de no parar!", "Soy el capitán de esta pantalla.", "¿Dónde vas tan arreglado?", 
            "Oye, ¿me sacas a pasear?", "Soy el dibujo más listo.","¡Esa foto es de cuando se inventó la rueda!",
            "¡Vaya reliquia de imagen tienes ahí!", "¡Esa foto es del siglo pasado!", "Esa foto es tan vieja que tiene polvo",
            "¡Vaya colección de muecas!", "Hoy estoy que me salgo.", "¿Me traes un bocadillo?",
            "¡Qué guapo soy, por favor!", "No me hagas scroll, que mareas.", "Soy el jefe de la casa.",
            "¡Vaya cara de sorpresa!", "¿Me estás vigilando tú a mí?", "Soy un dibujo de categoría.",
            "¡Vaya fondo de pantalla más feo!", "Oye, ¡que estoy aquí!", "Soy el más chulo del barrio.",
            "¡Qué bien me queda el tupé!", "No me hables de dietas hoy.", "¿Qué tal el mundo de ahí?",
            "¡Vaya fotos más movidas!", "Soy un dibujo muy independiente.", "¡Qué planta tengo, madre mía!",
            "¿Me dejas un hueco ahí?", "¡Vaya día de fotos aburridas!", "Soy el más crack de todos.",
            "¡Qué bien me sienta la fama!", "No me quites la mirada.", "Soy el dibujo más feliz.",
            "¡Vaya cara de velocidad!", "¿Me invitas a una caña?", "¡Qué guapo salgo siempre!",
            "No me hagas cosquillas.", "Soy el dueño de tus ojos.", "¡Vaya fondo más deprimente!",
            "Oye, ¡que te estoy viendo!", "Soy el dibujo más fiestero.", "¡Qué bien me sienta el sol!",
            "No me digas que no molo.", "¿Qué tal llevas el día?", "¡Vaya fotos más antiguas!",
            "Soy un dibujo de ley.", "¡Qué planta tengo hoy, colega!", "¡A por el día con todo!"
        ],
        atrapado: [
            "¡Sácame de aquí, hace frío!", "Si golpeo el cristal, ¿me oyes?", "¿Hay wifi en el mundo real?", "¡Ayuda! ¡Me he quedado pegado!",
            "¿Cómo se siente tener rodillas?", "Aquí dentro no hay gravedad.", "Daría lo que fuera por un helado.", "¡Oye! No me pises el cristal.",
            "¿Me pasas un poco de pizza?", "Aquí dentro el tiempo no pasa.", "Echo de menos el aire libre.", "¡Sácame a bailar un rato!",
            "¿Puedo salir a dar una vuelta?", "Aquí nunca llueve, es aburrido.", "Ojalá pudiera oler las flores.", "¡Qué estrecho es este sitio!",
            "¿Me dejas tus gafas un momento?", "Aquí dentro todo es muy plano.", "Dile a alguien que me rescate.", "¡Oye! ¿Qué tal se respira ahí?",
            "Si me sacas, te invito a algo.", "Aquí nunca tengo que limpiar.", "Me gustaría probar la comida de verdad.", "¡Qué suerte tienes de ser real!",
            "¿Puedo irme a dormir a tu cama?", "Aquí dentro no hay almohadas.", "Ojalá pudiera tocar la guitarra.", "¡Sácame de esta caja de cristal!",
            "¿Me compras un billete de avión?", "Aquí siempre visto la misma ropa.", "Echo de menos el sol de verdad.", "¡Oye! ¿Me oyes si grito?",
            "Si salgo, me muero de miedo.", "Aquí dentro se está muy seguro.", "Daría mi reino por un abrazo.", "¡Qué mundo tan raro tienes ahí!",
            "¿Me dejas usar tus manos?", "Aquí dentro no puedo correr.", "Ojalá pudiera saltar por ahí.", "¡Sácame de aquí, quiero fiesta!",
            "¿Cómo se siente el viento?", "Aquí nunca hace viento, qué paz.", "Me gustaría probar un chicle.", "¡Oye! ¿Me ves bien desde ahí?",
            "Si salgo, ¿me das de comer?", "Aquí dentro no hay espejos.", "Daría lo que fuera por moverme.", "¡Qué vida más plana tengo!",
            "¿Me dejas ser humano un rato?", "Aquí me quedo, vigilando tu mundo."
        ],
    },
    









    // --- SECCIÓN CLIMA Y HORARIOS (Lógica original) ---

    clima: {
        frio: [
            "¡Me estoy quedando tieso!", "¡Qué rasca hace!", "Mmmm me me me con congelo",
            "Saca la manta, que tirito.", "Operación pingüino activada.", "¡Qué frío, por Dios!",
            "¿Alguien tiene un calefactor?", "Se me va a congelar la sonrisa.", "¡Qué hielecito más rico! (Es broma).",
            "Tengo los pies como témpanos.", "A este paso me hago un cubito.", "¡Necesito un chocolate caliente!",
            "¿Quién ha dejado la nevera abierta?", "Vaya frío siberiano.", "¡Me castañean los dientes!",
            "No siento la nariz.", "Esto no es frío, es odio.", "¡Saca el edredón de plumas!",
            "Me voy a quedar pegado al cristal.", "Abrígate, que vas con lo puesto.", "¡Menuda pelona!",
            "Parezco un polo de limón.", "¡Qué aire más cortante!", "Se me han helado las ideas.",
            "¿Seguro que no estamos en el Polo Norte?", "¡Congelación en 3, 2, 1...!", "Me falta el abrigo de lana.",
            "¡Vaya escarcha hay fuera!", "Si me quedo quieto, me congelo.", "Amo el invierno, pero de lejos.",
            "¡Qué frío hace en este cuadro!", "Tengo el cuerpo de hielo.", "Me mudo a las Canarias mañana.",
            "¿Es un copo de nieve lo que veo?", "¡Parezco un helado de dos bolas!", "¡Qué fresquito! Dijo nadie nunca.",
            "Sopla un viento que te tumba.", "¡Me voy a poner la bufanda!", "No salgas, que te quedas tieso.",
            "¡Huy, qué frío!", "Me he quedado petrificado.", "¡A las mantas todo el mundo!",
            "¿Dónde está el sol cuando se le necesita?", "Vaya día para estar en la cama.", "¡Tiritando estoy!",
            "Mis orejas son cubitos de hielo.", "¡Menudo frío hace en Cabanillas!", "Necesito una estufa portátil.",
            "¿Me prestas tus guantes?", "¡Esto es el Ártico!", "Qué ganas de que llegue agosto.",
            "¡Me estoy convirtiendo en escarcha!", "Ni los pingüinos aguantan esto.", "¡Qué helada ha caído!",
            "Tengo el aliento congelado.", "¡Vaya día de perros y nieve!", "Me voy a hibernar un rato.",
            "¿Dónde está mi gorro de lana?", "¡Hace un frío que pela!", "¡Poned la calefacción!",
            "Mi reino por una manta eléctrica.", "¡Qué rasca más tonta!", "Me he quedado azul del frío.",
            "¡Vaya brisa más criminal!", "Cuidado, no resbales con el hielo.", "¡Qué gélido está todo!",
            "¡Tengo los dedos entumecidos!", "A este paso me sale barba de nieve.", "¡Qué invierno más largo!",
            "Me falta un caldo bien caliente.", "¡Menuda tiritona me ha entrado!", "¡Qué helor!",
            "Parece que vivo en un congelador.", "¡Sacadme de este iglú!", "¡Qué frío más traicionero!",
            "Mañana me compro un abrigo de piel.", "¡Estoy temblando como un flan!", "Esto es una broma de mal gusto.",
            "¡Me falta la chimenea!", "Vaya tiempo de narices heladas.", "¡Qué aire más puro! (Demasiado puro).",
            "¿Estamos a bajo cero ya?", "¡Me he quedado sin palabras del frío!", "¡Vaya helada, madre mía!",
            "Tengo la sangre granizada.", "¡Qué día más crudo!", "¡Abrígate hasta las cejas!",
            "No me mires, que suelto aire frío.", "¡Parezco un dibujo de Frozen!", "¡Qué tiritera tengo!",
            "Saca la bufanda de cuadros.", "¡Menuda ventisca!", "Tengo el ánimo por los suelos (y helado).",
            "¡Qué frío más seco!", "¡A este paso nieva en el salón!", "Me falta el brasero de la abuela.",
            "¡Qué ganas de solazo!", "¡Me estoy helando por momentos!", "¡Vaya tela con el termómetro!",
            "¡Cerrad la puerta, que entra el frío!"
        ],
        calor: [
            "¡Me estoy derritiendo!", "¡Qué solazo!", "Humedad nivel sauna.", 
            "Necesito un ventilador ya.", "¡Qué calor hace!", "¡Me voy a quedar pegado!",
            "¿Quién ha puesto el horno a tope?", "Vaya bochorno...", "¡Ni un soplo de aire!",
            "A este paso me convierto en vapor.", "¡Qué calufo!", "Busco sombra desesperadamente.",
            "¡Traedme un gazpacho helado!", "Estoy sudando gotas de tinta.", "¡Qué fuego hace fuera!",
            "Parece que estamos en el desierto.", "¡Saca el abanico, por favor!", "Me falta el aire.",
            "¿Es un espejismo o eres tú?", "¡Qué ganas de una piscina!", "Ojo, que quema el suelo.",
            "¡Estoy a punto de evaporarme!", "Vaya sol de justicia.", "¡Menudo horno es esto!",
            "No me toques, que quemo.", "¡Me voy a poner moreno de golpe!", "Dame un poco de hielo.",
            "¡Qué calina más mala!", "Hasta las moscas tienen calor.", "¡Sufro por mis píxeles!",
            "¡Qué día más pesado!", "Necesito un aire acondicionado portátil.", "¡Vaya sudada!",
            "Me falta el bañador.", "¡Esto es una barbacoa y yo soy el filete!", "¡Qué bochornazo!",
            "No se puede estar en la calle.", "¡A este paso me hago un zumo!", "Busca el fresquito.",
            "¡Madre mía, qué temperatura!", "¡Me arde la coronilla!", "¡Qué sol más traicionero!",
            "Parece que el sol me persigue.", "¡Necesito una sombra de tres metros!", "Vaya tela con el lorenzo.",
            "¡Estoy asado!", "Ni los lagartos salen hoy.", "¡Traedme un polo de limón!",
            "¿Alguien ha visto mi sombrilla?", "¡Qué calor tan pegajoso!", "Esto es inhumano.",
            "¡Me estoy achicharrando!", "Vaya racha de calor llevamos.", "¡Quiero vivir en la nevera!",
            "¡Qué bochorno más tonto!", "No siento las piernas del calor.", "¡Vaya aire más caliente!",
            "Parezco un dibujo al baño maría.", "¡Esto es el infierno!", "¡Qué ganas de invierno!",
            "Se me va a derretir la cara.", "¡Dadme un manguerazo!", "¡Qué sol más picón!",
            "Me estoy quedando seco como una uva pasa.", "¡Vaya día de chicharreras!", "¡Qué calorina!",
            "Siento que voy a echar humo.", "¡Me voy a la Antártida!", "¡Ni una nube para un respiro!",
            "¡Qué sofocón!", "Esto no es normal, de verdad.", "¡Me va a dar algo!",
            "¿Quién ha subido el termostato?", "¡Vaya siesta me echaba a la sombra!", "¡Qué agobio de tiempo!",
            "Tengo la cabeza como un bombo.", "¡Poned el aire a tope!", "¡Me falta un helado de tres bolas!",
            "Vaya sol de castigo.", "¡Qué bochorno más pegajoso!", "Estoy para que me echen sal.",
            "¡Me estoy asando vivo!", "¡Qué ganas de que refresque!", "¡Menudo fuego!",
            "Ni un ventilador me salva hoy.", "¡Qué tarde más larga!", "¡Me estoy disolviendo!",
            "Busco una cueva fresca.", "¡Qué chufa de calor!", "¡Vaya solazo de agosto!",
            "Esto es un suplicio.", "¡Qué aire más pesado!", "Me falta la toalla y la playa.",
            "¡Menuda solana cae!", "¡Me va a dar un parraque!", "¡Qué calor más seco!",
            "Estoy más caliente que el palo de un churrero.", "¡Vaya horno Cabanillas!", "¡Socorro, calor!"
        ],
        templado: [
            "¡Qué día más bueno hace!", "Se está de lujo aquí.", "Ni frío ni calor, perfecto.", "Día ideal para dar un paseo.",
            "¡Qué maravilla de temperatura!", "Se está agustito hoy, ¿eh?", "Clima ideal para estar alegre.", "¡Qué gozada de tarde!",
            "Hoy el tiempo nos regala paz.", "Se está de cine ahora mismo.", "¡Qué alegría de día!", "Temperatura suave, como a mí me gusta.",
            "Hoy no hace falta ni chaqueta.", "Se está fetén por aquí.", "¡Qué suerte tenemos con este tiempo!", "Día redondo para disfrutar.",
            "Ni un pero le pongo hoy.", "¡Qué brisa más agradable!", "El punto justo para ser feliz.", "Se está genial en esta pantalla.",
            "Día para pasear y disfrutar.", "¡Qué relax de temperatura!", "Ni sudar ni tiritar hoy.", "Está de cine el día.",
            "¡Qué templadito se está!", "Día de gloria bendita.", "Se está de muerte hoy.", "¡Qué luz más bonita!",
            "Tiempo de sobra para ser feliz.", "¡Qué suavidad de aire!", "Día para disfrutar a tope.", "¡Qué buen rollo de día!",
            "Se está de vicio hoy.", "Todo bajo control con este clima.", "¡Qué calma de temperatura!", "Día de postal, de verdad.",
            "Se está de dulce ahora.", "¡Qué equilibrio de tiempo!", "Ni tan mal se está aquí.", "Todo en su punto justo.",
            "¡Qué acierto de día!", "Día para lucirse un poco.", "Se está de fábula aquí.", "¡Qué caricia de aire!",
            "Día de suerte para todos.", "Todo fluye con este solete.", "¡Qué descanso de termómetro!", "Día de paseo por el barrio.",
            "Se está de categoría hoy.", "¡Qué templanza de día!", "Ni un soplo de aire malo.", "Día de lujo total.",
            "Se está de perlas hoy.", "¡Qué encanto de temperatura!", "Día de aplauso para el sol.", "Se está de escándalo aquí.",
            "¡Qué delicia de brisa!", "Ni una nube molesta hoy.", "Día de oro puro.", "Se está de maravilla ahora.",
            "¡Qué alivio de tiempo!", "Día de fiesta nacional.", "Se está de rechupete hoy.", "¡Qué armonía de clima!",
            "Ni un agobio hoy, ¡qué bien!", "Día de recreo y risas.", "Se está de cine hoy.", "¡Qué frescor más rico!",
            "Día de premio gordo.", "Se está de órdago aquí.", "¡Qué bienestar de tarde!", "Ni un frío me entra.",
            "Día de campo y mantel.", "Se está de miedo hoy.", "¡Qué atmósfera más limpia!", "Todo invita a salir.",
            "Día de sol suave y rico.", "Se está de pleno hoy.", "¡Qué placidez de día!", "Ni un calor que agobie.",
            "Día de risas y amigos.", "Se está de bandera hoy.", "¡Qué gustazo de temperatura!", "Día de calma total.",
            "Se está de sobresaliente.", "¡Qué templado está el ambiente!", "Ni una mota en el cielo.", "Día de relax absoluto.",
            "Se está de película hoy.", "¡Qué temple tiene el día!", "Día de paseo y charla.", "Se está de traca hoy.",
            "¡Qué bien se está así!", "Día para enmarcar, de verdad.", "Se está de diez.", "¡Qué suavidad de brisa!",
            "Día para no hacer nada.", "Se está de maravilla hoy.", "¡Qué suerte de clima!", "El día está impecable."
        ],        
        lluvia: [
                "Parece que va a llover mucho.", "¡A sacar el paraguas rápido!", "Vaya día gris se ha quedado.", "¡Me voy a mojar entero!",
                "¿Alguien tiene un chubasquero?", "Agua va, ¡cuidado con eso!", "Día de peli y manta.", "¡Qué manera de llover ahora!",
                "Cuidado con los charcos grandes.", "Huele a tierra mojada, ¡qué rico!", "¡Vaya tormenta se avecina hoy!", "Hoy toca mojarse los pies.",
                "El cielo se está cayendo.", "¡Qué día más feo hace!", "Me gusta el ruido del agua.", "No salgas sin paraguas, ¿eh?",
                "¡Vaya chaparrón está cayendo ahora!", "Hoy el sol se ha jubilado.", "Lluvia y café, plan perfecto.", "¡Qué nubarrones más negros veo!",
                "Parece que no va a parar.", "El campo lo agradece mucho.", "¡Menuda tromba de agua hoy!", "No me gusta mojarme nada.",
                "Día de botas de agua amarillas.", "¡Vaya relámpago ha sonado ahora!", "El cielo está llorando hoy.", "¡Saca el perro con chubasquero!",
                "Hoy toca quedarse en casa.", "¡Qué humedad hay en Cabanillas!", "Se avecina una buena tormenta.", "¡Cuidado, que el suelo resbala!",
                "Me quedo aquí bajo techo.", "La lluvia tiene su encanto.", "¡Vaya tarde de rayos!", "¡Qué manera de jarrear hoy!",
                "Busca un refugio seco pronto.", "Hoy no hay quien salga.", "¡Qué ganas de ver sol!", "El cristal está empañado ahora.",
                "Lluvia, lluvia, vete de aquí.", "¡Menudo nubarrón encima tengo!", "Hoy el patio está mojado.", "Mejor aquí que allí fuera.",
                "¡Qué día más triste hace!", "La lluvia me da sueño.", "¡Cuidado con el granizo ahora!", "¡Menuda caladura de agua hoy!",
                "Hoy el paraguas es obligatorio.", "¡Qué viento y qué lluvia!", "Parece Londres esto hoy mismo.", "El arcoíris saldrá muy pronto.",
                "¡Qué tempestad más tonta hoy!", "Hoy no me peino nada.", "¡Vaya día de chuzos rojos!", "El cielo está muy bajo.",
                "¡Qué fresquito trae el agua!", "Mejor verla desde aquí dentro.", "¡Qué chaparrón más rico hoy!", "No hay quien me mueva.",
                "Lluvia fina pero muy molesta.", "¡Qué tarde de tormenta negra!", "El agua lo limpia todo.", "¡Vaya nubes de algodón gris!",
                "Hoy toca paraguas y paciencia.", "¡Qué bárbaro cómo cae hoy!", "Parece que el cielo avisa.", "Un café y que llueva.",
                "¡Menuda mojadura te espera hoy!", "Hoy la calle es un río.", "¡Qué gris está el barrio!", "Me pido el paraguas grande.",
                "¡Vaya truenos más fuertes suenan!", "El agua me pone tierno.", "Día de barro y charcos.", "¡Menudo diluvio universal hoy!",
                "Hoy el sol no trabaja.", "¡Qué mala cara tiene el cielo!", "Busca el resguardo muy rápido.", "Lluvia de la buena hoy.",
                "¡Vaya remojón vas a darte!", "No te olvides las botas.", "El cielo está muy enfadado.", "¡Qué tarde más encapotada hoy!",
                "Me quedo mirando las gotas.", "¡Qué bien huele el campo!", "Hoy toca ser un dibujo seco.", "¡Menudo orballo está cayendo ahora!",
                "El cielo no da tregua.", "¡Qué manera de lloviznar hoy!", "Hoy no se ve nada.", "Cuidado con la conducción hoy.",
                "¡Qué ganas de solazo tengo!", "Lluvia de verano, ¡qué alivio!", "El agua es vida, dicen.", "¡Vaya día más perruno hoy!",
                "¡A cubierto todo el mundo hoy!", "Hoy la lluvia manda aquí."
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
            "¡Nieve de la buena hoy!", "Parece un mundo de fantasía.", "¡Qué bonito es el invierno!", "Saca los guantes de nieve.",
            "¡Vaya helor pero qué vista!", "Hoy la calle es blanca.", "¡Qué alegría, por fin nieva!", "No te caigas al suelo.",
            "La nieve es mi debilidad.", "¡Vaya mañana de nieve hoy!", "Hoy el tejado está blanco.", "Cuidado con el frío blanco.",
            "¡Qué divertido es esto hoy!", "Parezco un dibujo congelado hoy.", "¡Menuda estampa más linda hoy!", "Hoy el cielo regala nieve.",
            "Busca las botas de montaña.", "¡Qué blanco está el monte!", "Parece que el tiempo paró.", "¡Vaya copos como puños hoy!",
            "Hoy todo es más lento.", "¡Qué paz da la nieve!", "Saca la bufanda más gorda.", "¡Menudo paraíso de hielo hoy!",
            "Cuidado con el resbalón hoy.", "¡Qué suerte ver nieve hoy!", "Hoy el sol no calienta.", "¡Vaya día de ventisca hoy!",
            "La nieve es arte puro.", "¡Qué frío más luminoso hoy!", "Hoy toca hacer iglús fuera.", "¡Menuda capa de nieve hoy!",
            "Me quedo aquí bien calentito.", "¡Qué invierno más movido hoy!", "Cuidado con los pies fríos.", "¡Nieve fresca, qué bien hoy!",
            "Parece que el cielo descansa.", "¡Qué blanca es la vida!", "Hoy el barrio brilla mucho.", "¡Vaya nevada más histórica hoy!",
            "Saca la cámara de fotos.", "¡Qué espectáculo más grande hoy!", "La nieve me deja mudo.", "¡Cuidado con la nieve dura!",
            "Hoy todo es diferente ahora.", "¡Qué elegancia de paisaje blanco!", "Me encanta pisar nieve virgen.", "¡Vaya día de invierno hoy!",
            "Hoy la nieve es protagonista.", "Cuidado con el viento blanco.", "¡Qué sensación más rara hoy!", "La nieve lo tapa todo.",
            "¡Qué blanco está el camino!", "Hoy toca disfrutar del frío.", "¡Vaya regalo de la naturaleza!", "Cuidado con el hielo oculto.",
            "¡Nieve para todos hoy mismo!", "¡Qué tarde más blanca hoy!", "Me pido tirar la primera.", "¡Menudo cuadro más bonito hoy!",
            "Hoy el mundo es blanco.", "¡Qué frío más divertido hoy!", "La nieve es pura magia.", "¡Vaya final de día nevado!"
        ],
        nubes: [
                "Vaya nubes más feas hay.", "El sol se está escondiendo.", "Día gris, ¡qué poca alegría!", "Parece que el cielo avisa.",
                "¡Qué nubarrones más negros veo!", "Hoy el sol no trabaja.", "Está el cielo muy tapado.", "Vaya manta de nubes hoy.",
                "No se ve ni un claro.", "Día para quedarse en casa.", "¡Qué tarde más grisácea hoy!", "El sol está de vacaciones.",
                "Parece que quiere pero no.", "¡Menuda capa de algodón gris!", "Hoy el día está triste.", "Falta un poco de luz.",
                "Vaya nubes más bajas hoy.", "El cielo está muy encapotado.", "Hoy no brilla nada fuera.", "Qué ganas de ver sol.",
                "El día está muy apagado.", "Vaya nubes de panza burra.", "No asoma ni un rayito.", "¡Qué techo de nubes hoy!",
                "El sol está jugando al escondite.", "Hoy el día no promete.", "Vaya nubes más pesadas hoy.", "Parece que va a oscurecer.",
                "Qué gris está todo hoy.", "El cielo está muy cargado.", "Hoy la luz es escasa.", "Vaya nubes más raras veo.",
                "No busques el sol hoy.", "El día está de bajón.", "Vaya nubes más gordas hoy.", "Parece que el cielo pesa.",
                "Qué tarde más nublada hoy.", "El sol se ha perdido.", "Vaya nubes de tormenta hoy.", "Hoy no hay sombra, claro.",
                "Qué falta de color hoy.", "El día está muy nuboso.", "Vaya nubes más oscuras hoy.", "Parece que se va a.",
                "Qué triste está el cielo.", "El sol no tiene ganas.", "Vaya nubes más espesas hoy.", "Hoy el día es gris.",
                "Qué poca luz tiene hoy.", "El cielo está muy tapado.", "Vaya nubes más feas veo.", "Parece que no aclara nada.",
                "Qué tarde más sosa hoy.", "El sol está muy tímido.", "Vaya nubes más altas hoy.", "Hoy el día está nublado.",
                "Qué falta de brillo hoy.", "El cielo está muy cerrado.", "Vaya nubes más tristes hoy.", "Parece que va a llover.",
                "Qué gris está el barrio.", "El sol se ha marchado.", "Vaya nubes más densas hoy.", "Hoy el día está tapado.",
                "Qué poca alegría de cielo.", "El cielo está muy plomizo.", "Vaya nubes más grandes hoy.", "Parece que va a caer.",
                "Qué tarde más aburrida hoy.", "El sol no asoma nada.", "Vaya nubes más grises hoy.", "Hoy el día es soso.",
                "Qué falta de energía hoy.", "El cielo está muy serio.", "Vaya nubes más borrascosas hoy.", "Parece que el sol duerme.",
                "Qué triste se ha quedado.", "El sol está muy perezoso.", "Vaya nubes más sucias hoy.", "Hoy el día está feo.",
                "Qué poca chicha de día.", "El cielo está muy triste.", "Vaya nubes más rebeldes hoy.", "Parece que no sale hoy.",
                "Qué tarde más poco lucida.", "El sol está muy lejos.", "Vaya nubes más feas hoy.", "Hoy el día está oscuro.",
                "Qué falta de sol hace.", "El cielo está muy tapado.", "Vaya nubes más sosas hoy.", "Parece que el día acaba.",
                "Qué gris se ve todo.", "El sol no quiere nada.", "Vaya nubes más malas hoy.", "Hoy el día está cubierto.",
                "Qué poca luz nos queda.", "El cielo está muy gris.", "Vaya nubes más negras hoy.", "Hoy el sol se esconde."
            ],
            soleado: [
                "¡Vaya solazo ha salido hoy!", "¡Qué luz más buena tenemos!", "Día ideal para lucir gafas.", "¡Qué alegría ver este solete!",
                "El sol nos regala mucha energía.", "¡Qué día más brillante y limpio!", "Día de terraza y buen humor.", "¡Qué ganas de salir fuera!",
                "Hoy el sol es el protagonista.", "¡Qué luz más clara y radiante!", "Día para disfrutar del buen tiempo.", "¡Qué suerte tener este sol!",
                "El cielo está azul como nunca.", "¡Qué día más despejado y rico!", "Hoy el sol me da vida.", "¡Qué luz más espectacular hace!",
                "Día de sol y mucha alegría.", "¡Qué ganas de pasear un rato!", "Hoy el sol brilla para todos.", "¡Qué luz más cálida y buena!",
                "Día para ponerse muy moreno.", "¡Qué solete más agradable hace!", "Hoy el día es de oro.", "¡Qué luz más brillante tenemos!",
                "Día de gafas de sol, claro.", "¡Qué alegría ver este cielo azul!", "Hoy el sol nos mima mucho.", "¡Qué luz más pura y limpia!",
                "Día para estar de buen humor.", "¡Qué solete más majo ha salido!", "Hoy el día brilla con fuerza.", "¡Qué luz más bonita hay fuera!",
                "Día de sol y sonrisas nuevas.", "¡Qué ganas de ir al campo!", "Hoy el sol lo ilumina todo.", "¡Qué luz más acogedora hace!",
                "Día para lucir mis mejores colores.", "¡Qué solete más rico tenemos hoy!", "Hoy el día es una fiesta.", "¡Qué luz más clara hace hoy!",
                "Día de sol y mucha energía.", "¡Qué alegría de tiempo tenemos!", "Hoy el sol nos da calorcito.", "¡Qué luz más radiante hay hoy!",
                "Día para no parar de reír.", "¡Qué solete más bueno hace fuera!", "Hoy el día está impecable.", "¡Qué luz más nítida tiene hoy!",
                "Día de sol y cielo abierto.", "¡Qué ganas de ver el sol!", "Hoy el sol brilla con ganas.", "¡Qué luz más fantástica hace hoy!",
                "Día para aprovechar cada minuto solo.", "¡Qué solete más espectacular tenemos!", "Hoy el día es de postal.", "¡Qué luz más increíble hay hoy!",
                "Día de sol y mucha luz.", "¡Qué alegría de cielo despejado!", "Hoy el sol nos hace felices.", "¡Qué luz más especial tiene hoy!",
                "Día para disfrutar de la vida.", "¡Qué solete más divino hace!", "Hoy el día es puro brillo.", "¡Qué luz más estupenda hay hoy!",
                "Día de sol y mucha fuerza.", "¡Qué alegría de mañana soleada!", "Hoy el sol nos acompaña siempre.", "¡Qué luz más maravillosa hace hoy!",
                "Día para estar muy activos.", "¡Qué solete más fantástico tenemos!", "Hoy el día es un regalo.", "¡Qué luz más perfecta tiene hoy!",
                "Día de sol y mucha magia.", "¡Qué alegría de tarde soleada!", "Hoy el sol lo cura todo.", "¡Qué luz más divina hace hoy!",
                "Día para brillar con el sol.", "¡Qué solete más potente tenemos!", "Hoy el día es una maravilla.", "¡Qué luz más vibrante tiene hoy!",
                "Día de sol y mucha paz.", "¡Qué alegría de mediodía soleado!", "Hoy el sol nos ilumina el alma.", "¡Qué luz más serena hace hoy!",
                "Día para salir y disfrutar.", "¡Qué solete más sabroso tenemos!", "Hoy el día es inmejorable.", "¡Qué luz más potente tiene hoy!",
                "Día de sol y mucha vida.", "¡Qué alegría de sol tenemos!", "Hoy el sol manda en Cabanillas.", "¡Qué luz más intensa hace hoy!",
                "Día para aprovechar este buen tiempo.", "¡Qué solete más generoso tenemos!", "Hoy el día es de lujo.", "¡Qué luz más auténtica tiene hoy!",
                "Día de sol y mucha claridad.", "¡Qué alegría de cielo radiante!", "Hoy el sol es pura magia.", "¡Qué luz más alegre hace hoy!"
            ]
        },

    horarios: {
            manana: [
                "¿Quién ha inventado madrugar?", "Cinco minutitos más, por favor.", "Parezco un león despeinado hoy.", "¡Necesito café en vena ya!",
                "¿Ya es de día? ¡Qué horror!", "Aún no soy persona, aviso.", "Tengo más sueño que un lirón.", "¡Buenos días, si es que existen!",
                "¿Dónde he dejado las llaves?", "Hoy me he caído de la cama.", "Mi despertador es un maleducado.", "¡A por el café, valientes!",
                "¿Qué día es hoy? Estoy perdido.", "Busco motivación, ¿alguien tiene?", "Hoy el espejo me ha asustado.", "¡Arriba, aunque nos duela!",
                "¿Quién me trae un croasán?", "Tengo ojeras nivel experto hoy.", "Hoy no me reconoce ni mi madre.", "¡Venga, que el desayuno vuela!",
                "¿Es obligatorio levantarse hoy?", "Mi cama me tiene secuestrado.", "Hoy tengo la neurona dormida.", "¡Buenos días, estrellas de la casa!",
                "¿Dónde está el botón de pausa?", "Amanecer es de valientes, créeme.", "Hoy voy en modo automático.", "¡Qué hambre mañanera tengo!",
                "¿Quién ha apagado el sol?", "Hoy mi almohada me odia.", "¡Despierta, que el café se enfría!", "Menudo madrugón para nada.",
                "¿Me prestas un poco de energía?", "Hoy tengo el guapo subido.", "¡Ánimo, que ya queda menos!", "He soñado con una tortilla.",
                "¿Por qué sale el sol tan pronto?", "Hoy tengo los ojos pegados.", "¡Buenos días, vecinos de Cabanillas!", "Buscando mi calcetín perdido.",
                "¿Hoy es fiesta? Decidme que sí.", "Menuda cara de lunes tengo.", "¡Venga, un esfuerzo, que tú puedes!", "Hoy me bebo el mar.",
                "¿Dónde está mi dosis de cafeína?", "Me he levantado con el pie izquierdo.", "¡Buenos días, alegría de vivir!", "Tengo el cerebro en huelga.",
                "¿Quién ha robado mis ganas?", "Hoy me como el mundo entero.", "¡Despierta ya, pedazo de vago!", "Menuda pereza me da todo.",
                "¿Me das un abrazo mañanero?", "Hoy brillo más que el sol.", "¡A tope con este día!", "He soñado que era rico.",
                "¿Por qué suena tanto el móvil?", "Hoy no doy pie con bola.", "¡Buenos días, gente maravillosa!", "Tengo la cara como un cuadro.",
                "¿Alguien ha visto mi ganas?", "Hoy prometo ser muy bueno.", "¡Arriba, que el día promete!", "Menudo sueño arrastro hoy.",
                "¿Me pones un café doble?", "Hoy el mundo es mío.", "¡Venga, que llegamos tarde!", "He dormido fatal, la verdad.",
                "¿Dónde está el ánimo hoy?", "Hoy estoy para pocas fiestas.", "¡Buenos días, rayito de luz!", "Tengo el pelo como un loco.",
                "¿Quién ha puesto la alarma?", "Hoy voy a triunfar seguro.", "¡Despierta, que la vida corre!", "Menuda luz tiene esta mañana.",
                "¿Me traes unas tostadas ricas?", "Hoy me siento muy inspirado.", "¡Ánimo, valientes de la mañana!", "He visto un pajarito hoy.",
                "¿Por qué hace tanto ruido?", "Hoy tengo chispa en los ojos.", "¡Buenos días, corazones inquietos!", "Tengo el cuerpo de jota.",
                "¿Alguien sabe qué hora es?", "Hoy me voy a portar bien.", "¡Arriba, que no es poco!", "Menudo día nos espera hoy.",
                "¿Me das un poco de paz?", "5 minutitos más...", "¡Buenos días, mundo entero!", "Tengo ganas de comer dulce.",
                "¿Quién se ha llevado mi sueño?", "Hoy soy puro nervio.", "¡Despierta, que el sol invita!", "Menuda energía tengo guardada.",
                "¿Me pones una canción alegre?", "Hoy el día es para mí.", "¡Ánimo, que la mañana vuela!", "¡Venga, que hoy salimos guapos!"
            ],
            tarde: [
                "¿Qué merendamos? Tengo un hambre...", "La tarde se me hace bola.", "¿Alguien sabe un cotilleo nuevo?", "¡Qué ganas de soltar el pelo!",
                "Menudo bajón me ha dado.", "Buscando una excusa para descansar.", "¿Falta mucho para el pijama?", "Tengo ganas de una merienda.",
                "¡Vaya tarde de no hacer nada!", "¿Quién se viene de paseo?", "Me comería un donut ahora.", "¡Ánimo, que el sofá espera!",
                "¿Has visto qué tarde más tonta?", "Hoy la tarde está muy aburrida.", "Tengo la mente en otra parte.", "¡Venga, que ya casi estamos!",
                "¿Alguien me cuenta algo divertido?", "La tarde pide un buen café.", "Hoy estoy en modo pausa.", "¡Qué ganas de terminar ya!",
                "¿Me traes un poco de chocolate?", "La tarde se está poniendo rara.", "Tengo el cuerpo de merienda.", "¡Ánimo, vecinos, que ya queda!",
                "¿Quién ha visto mi motivación?", "La tarde me está mirando mal.", "Hoy no tengo ganas de nada.", "¡Qué tarde de cotilleo rico!",
                "¿Me cuentas un secreto, vecino?", "La tarde vuela, ¡aprovéchala!", "Tengo ganas de ver a alguien.", "¡Venga, un empujón más!",
                "¿Alguien tiene un plan mejor?", "La tarde se me hace eterna.", "Hoy estoy muy hablador.", "¡Qué ganas de una cervecita!",
                "¿Has visto qué luz hay?", "La tarde pide un descanso largo.", "Tengo el ánimo por las nubes.", "¡Ánimo, que la cena llega!",
                "¿Quién quiere jugar a algo?", "La tarde está para dormir siesta.", "Hoy estoy muy reflexivo.", "¡Qué tarde más bien aprovechada!",
                "¿Me traes un vaso de agua?", "La tarde se nos escapa ya.", "Tengo un hambre de jabalí.", "¡Venga, que ya vemos luz!",
                "¿Alguien sabe dónde está el gato?", "La tarde tiene mucha guasa.", "Hoy estoy un poco cansado.", "¡Qué ganas de desconectar!",
                "¿Me cuentas cómo te va?", "La tarde pide mucha calma.", "Tengo la sonrisa puesta.", "¡Ánimo, que el día acaba!",
                "¿Quién se ha llevado mi té?", "La tarde está muy tranquila.", "Hoy estoy hecho un lío.", "¡Qué tarde de pensar mucho!",
                "¿Me das una palmadita, vecino?", "La tarde es para los valientes.", "Tengo ganas de reír un poco.", "¡Venga, que el sol baja!",
                "¿Alguien tiene un dulce ahí?", "La tarde se pone interesante.", "Hoy estoy muy creativo.", "¡Qué ganas de ver la luna!",
                "¿Has visto qué nubes hay?", "La tarde pide un abrazo fuerte.", "Tengo el corazón contento.", "¡Ánimo, que ya es casi!",
                "¿Quién se apunta a merendar?", "La tarde está de cine.", "Hoy estoy muy místico.", "¡Qué tarde de buena vibra!",
                "¿Me enseñas una foto tuya?", "La tarde se va por ahí.", "Tengo ganas de fiesta.", "¡Venga, que la noche llama!",
                "¿Alguien sabe qué cenaremos?", "La tarde está para descansar.", "Hoy estoy de un relajado...", "¡Qué tarde de gloria bendita!",
                "¿Me cuentas un chiste corto?", "La tarde vuela si te ríes.", "Tengo la energía a medias.", "¡Ánimo, que ya no queda!",
                "¿Quién ha visto mi merienda?", "La tarde pide mucha marcha.", "Hoy estoy de muy buen humor.", "¡Qué tarde más maravillosa!",
                "¿Me das un poco de charla?", "La tarde está muy loca.", "Tengo ganas de ver peli.", "¡Venga, que ya casi cenamos!",
                "¿Alguien tiene un poco de pan?", "La tarde se acaba, ¡disfruta!", "Hoy estoy muy satisfecho.", "¡Qué tarde de alegría!"
            ],
            noche: [
                "¿Has visto esa estrella fugaz?", "¡Qué oscuridad! Me da miedo.", "¿Hay alguien debajo de mi cama?", "¡Mira cuántas estrellas hay hoy!",
                "La noche esconde muchos secretos.", "¡Socorro! He visto una sombra.", "¿Quién anda ahí? ¡Que hable!", "Qué silencio más raro hay hoy.",
                "Me ha parecido ver un fantasma.", "¡Pide un deseo a esa estrella!", "La luna hoy parece un queso.", "Tengo miedo de la oscuridad, ¿vale?",
                "¿Oyes ese ruido? ¡Qué susto!", "Me comería un helado a oscuras.", "La noche me pone muy místico.", "¡Qué brillo tiene la luna hoy!",
                "No me dejes solo a oscuras.", "Buscando la Osa Mayor, ¿la ves?", "¡Cuidado con el hombre del saco!", "Mañana será un día de miedo.",
                "¿Quién me ha tocado el hombro?", "Me encanta mirar las estrellas contigo.", "¡Qué noche de misterio llevamos!", "Tengo los pelos como escarpias.",
                "¿Será un ovni eso de allí?", "La oscuridad me da mucha sed.", "¡Qué calma pero qué susto!", "A dormir con la luz encendida.",
                "¿Has oído ese crujido, vecino?", "La luna nos está vigilando hoy.", "¡Qué ganas de pillar el sofá!", "No mires hacia el pasillo oscuro.",
                "¿Es un búho lo que suena?", "¡Mira! ¡Una estrella ha caído!", "La noche me da mucha hambre.", "Mejor me tapo hasta las cejas.",
                "¿Y si vienen los extraterrestres ahora?", "¡Qué noche de película de terror!", "A ver si veo un murciélago.", "La luna está preciosa esta noche.",
                "¿Quién ha apagado la luz?", "Me da miedo quedarme sin batería.", "¡Qué frío da este silencio!", "Mañana hablaremos de mis miedos.",
                "¿Habrá monstruos en el armario?", "Me encanta el brillo de fuera.", "¡Qué noche más poco clara!", "Siento que me miran, de verdad.",
                "¿Esa sombra se ha movido?", "La noche es larga y misteriosa.", "¡Qué ganas de que amanezca ya!", "Tengo un hambre nocturna que flipas.",
                "¿Será un gato lo que suena?", "Me pido la estrella más brillante.", "¡Qué miedito me da este rincón!", "No salgas al jardín ahora mismo.",
                "¿Has visto el brillo de la luna?", "La noche me confunde la vista.", "¡Qué sueño y qué miedo tengo!", "A soñar con vampiros buenos.",
                "¿Quién ha dejado esa puerta abierta?", "Me comería una pizza a oscuras.", "¡Qué oscuridad más espesa hay!", "La luna es mi única guía.",
                "¿Y si el coco existe realmente?", "Me he quedado helado del susto.", "¡Qué noche de brujas parece hoy!", "No puedo parar de mirar fuera.",
                "¿Alguien ha dicho 'fantasma'?", "Me da miedo hasta mi sombra.", "¡Qué estrellas más bien puestas!", "La noche me pone el corazón...",
                "¿Es un avión o un ovni?", "Mejor cierro los ojos muy fuerte.", "¡Qué noche más negra tenemos!", "Siento un escalofrío por aquí.",
                "¿Has visto qué luna más grande?", "Me da pavor este silencio total.", "¡Qué ganas de que salga el sol!", "A soñar con naves espaciales.",
                "¿Quién anda por ahí fuera?", "Me comería un jabalí nocturno.", "¡Qué oscuridad más poco amigable!", "La luna está de mi parte.",
                "¿Y si me quedo solo aquí?", "Me he pegado un susto tonto.", "¡Qué noche de sustos y risas!", "No dejes la puerta mal cerrada.",
                "¿Alguien me da una linterna?", "Me da miedo lo que no veo.", "¡Qué estrellas más brillantes hoy!", "La noche me sienta muy raro.",
                "¿Es un espíritu o un gato?", "Mejor me escondo bajo la manta.", "¡Qué noche de locos es esta!", "Siento pasos en el pasillo...",
                "¿Has visto ese reflejo tan raro?", "Me da miedo este cuadro oscuro.", "¡Qué ganas de ver la luz!", "A soñar con mil estrellas fugaces."
            ],
            hambre: [
                "¡Tengo hambre!", "Me comería un jabalí.", "¿Es eso una croqueta?", "¡Hora de comer!",
                "¡Ñam ñam!", "Tengo el estómago vacío.", "¿Qué hay de menú?", "¡Me ruge la tripa!",
                "¿Huele a tortilla?", "Dame un bocado.", "¡Tengo un hambre canina!", "¡Qué hambre, por favor!",
                "¿Hay postre?", "Me comería un buey.", "¡A comer se ha dicho!", "¡Tengo un vacío aquí dentro!",
                "¿Alguien tiene un pincho?", "¡Menuda gazuza tengo!", "¡Quiero una hamburguesa!", "¡Me desmayo de hambre!",
                "¡Pásame el pan!", "Tengo un hambre negra.", "¡Qué ganas de hincar el diente!", "¿Falta mucho para cenar?",
                "¡Me comería hasta las piedras!", "¡Dame algo de picar!", "¡Tengo un hambre atroz!", "¿Es hora de la merienda?",
                "¡A mesa puesta!", "¡Menudo hambre!", "¡Quiero chuletas!", "¡Tengo el gusanillo!",
                "¿Hay jamón?", "¡Me comería un elefante!", "¡Hora del aperitivo!", "¡Tengo un hambre de mil demonios!",
                "¡Menudo banquete me daría!", "¡Quiero pizza!", "¡Me pica el hambre!", "¿Qué se cuece hoy?",
                "¡Tengo un hambre de locos!", "¡Dame una tapa!", "¡Me comería un queso entero!", "¿Hay sobras?",
                "¡Tengo un hambre voraz!", "¡Quiero postre!", "¡Me rugen las tripas!", "¡A por el rancho!",
                "¡Tengo un hambre que no veas!", "¿Hay patatas?", "¡Me comería un kilo de pan!", "¡Tengo un hambre de oso!",
                "¡Quiero chocolate!", "¡Me falta el postre!", "¡Menuda hambre traigo!", "¿Dónde está el chef?",
                "¡Tengo un hambre de susto!", "¡Quiero un bocata!", "¡Me comería un camión!", "¡A por la cena!",
                "¡Tengo un hambre que truena!", "¿Hay fruta?", "¡Me comería un restaurante!", "¡Tengo un hambre feroz!",
                "¡Quiero ensalada! (Mentira).", "¡Me falta el café!", "¡Menuda hambre de muerte!", "¿Cuándo comemos?",
                "¡Tengo un hambre que rabio!", "¡Quiero carne!", "¡Me comería un menú largo!", "¡A por las sobras!",
                "¡Tengo un hambre de espanto!", "¿Hay dulces?", "¡Me comería un jabalí asado!", "¡Tengo un hambre de miedo!",
                "¡Quiero helado!", "¡Me falta la merienda!", "¡Menuda hambre de león!", "¿Qué hay de rico?",
                "¡Tengo un hambre que cruje!", "¡Quiero arroz!", "¡Me comería un festín!", "¡A por el postre!",
                "¡Tengo un hambre que asusta!", "¿Hay algo en la nevera?", "¡Me comería un cordero!", "¡Tengo un hambre fatal!",
                "¡Quiero pasta!", "¡Me falta la sal!", "¡Menuda hambre de lobo!", "¿A qué sabe eso?",
                "¡Tengo un hambre de infarto!", "¡Quiero tarta!", "¡Me comería un buffet!", "¡A por la merienda!",
                "¡Tengo un hambre que muerde!", "¿Hay tortilla?", "¡Me comería una vaca!", "¡Tengo mucha hambre!"
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
            "¿Me das un donut?", "A la de tres..."
        ],
        // Personajes con nombre específico
        homer: [
            "¡Mmm... birraaaaa", "¡Mmm... cervezaaaa", "Mmm... chocolate...", "¡Me aburro!", 
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
            "¡Multiplícate por cero!", "¡Yo no he sido!", "¡Ay, caramba!", "¡Soy el amo!",
            "¡Mola mazo!", "¡Soy un peligro!", "¿Hacemos una gamberrada?", "¡Toma ya!",
            "¡A dormir a los peces!", "¡Qué aburrimiento de clase!", "¡Libertad para los niños!",
            "¡Soy Bartman!", "¡Cuidado con mi skate!", "¡Qué pasa, viejo!", "¡Soy un rebelde!",
            "¿Llamamos a Moe?", "¡Qué asco de deberes!", "¡Soy un crack!", "¡No me rayes!",
            "¡A por todas!", "¡Vaya tela, colega!", "¡No me busques las cosquillas!",
            "¡Nadie me comprende!", "¡Oye, tú, mírame!", "¡Soy una leyenda!", "¡Sálvese quien pueda!",
            "¡Vaya par de narices!", "¡Esto es la monda!", "¡Al abordaje!", "¡Qué risa, tía Felisa!"
        ],
        lisa: [
            "¡Soy una superdotada!", "¡El mundo necesita jazz!", "¡No comáis carne!", "¡Leed más!",
            "¡Paz y amor!", "¡Soy una incomprendida!", "¡El saxo es mi vida!", "¿Nadie piensa en el futuro?",
            "¡Dadme un reto!", "¡Soy muy lista!", "¡Qué falta de cultura!", "¡Necesito estudiar!",
            "¡Soy una artista!", "¡Qué día más gris!", "¡Hagamos algo útil!", "¡El saber no ocupa lugar!",
            "¡Soy la mejor!", "¡Qué poco nivel!", "¡Oíd mi saxofón!", "¡Un poco de orden!",
            "¡Soy una visionaria!", "¡Qué mal va todo!", "¡Buscad la sabiduría!", "¡Soy una activista!",
            "¡Qué poco respeto!", "¡A por el éxito!", "¡Dadme una oportunidad!", "¡Soy una líder!",
            "¡Qué mundo más raro!", "¡Aprende algo nuevo!"
        ],
        burns: [
            "¡Excelente!", "¡Suelten a los perros!", "¿Quién es ese empleado?", "¡Soy rico!",
            "¡Traigan mi dinero!", "¡Fuera de mi vista!", "¡Soy eterno!",
            "¡Denme mi té!", "¡Soy el jefe!", "¡Qué asco de pobres!", "¡Páguenme ahora!",
            "¡Soy una leyenda viva!", "¡Inicien el plan!", "¡Dominen el mundo!", "¡Qué alegría ser yo!",
            "¡Soy el dueño!", "¡ Smithers !", "¡Excelente noticia!",
            "¡Denme más poder!", "¡Soy invencible!",
            "¡El dinero lo compra todo!"
        ],
        marge: [
            "¡Hummmmm!", "¡Niiiiiños, portaos bien!", "¡Homer, por favor!", "¡Sed buenos!",
            "¡Un poco de limpieza!",
            "¡Homer, deja eso!", "¡A comer!",
            "¡Qué paciencia tengo!", "¡Cuidado con la ropa!",
            "¡Homer, no hagas eso!", "¡Qué casa más sucia!", "¡A dormir, niños!", "¡Qué maravilla!",
            "¡Qué jaleo!"
        ],
        maggie: [
            "*Chupete*... *Chupete*", "*Ruido de chupete*", "¡Gugu tata!", "¡Dada!",
            "¿Mami?", "¡Mama!", "*Mira fijamente*", "*Saluda con la mano*", "*Se cae*",
            "*Se levanta*", "*Chupa el chupete fuerte*", "*Guiña un ojo*", "*Sonríe*",
            "*Se ríe*", "*Busca a Marge*", "*Busca su juguete*", "*Señal de ok*",
            "*Sorprendida*", "*Cara de traviesa*", "*Hace un ruidito*", "*Muerde el chupete*",
            "*Se duerme*", "*Te mira mucho*", "*Saluda*", "*Juega*", "*Se asusta*",
            "*Chupa fuerte*", "*Gesticula*", "*Se ríe mucho*", "*Mira la foto*"
        ],
        flanders: [
            "¡Hola, holita, vecinito!", "¡Perfectirijillo!", "¡Qué alegría verte!", "¡Bendiciones!",
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
            "Yo me llamo Ralph", "Bart es mi mejor amigo", "¡Y mira esa roca! \nAhí es donde vi al Gnomo. \nMe dijo que quemara cosas...",
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
            "¡Nadie quiere al Sr. Topo!", "¡No me golpeen!", "¡Soy un topo!", "¡Ay, mi vista!",
            "¡Hace mucho Sol!", "¡Qué mala suerte!", "¡No me pisen!", "¿Qué?", "¿ Qué pone ahí ?",
            "¡Caray, qué Sol!", "¿ Quéeeee ?", "No veo un pimiento", "He perdido mis gafas", "¿ Dónde estoy ?"
        ],
        krusty: [
            "Jejejejejee je jee", "¿ Qué diandres es eso ?"
        ],
        pica: [
            "Malditos gatos", "¡Toma dinamita!", "¡Zasca!", "¡Soy el más listo!",
            "¡Rasca es tonto!", "¡Toma mazo!", "¡Qué risa!"
        ]
    },

    // --- SECCIÓN FUTURAMA (Para ampliar) ---
    futurama: {
        fotos: {
            bender: 5,
            fry: 3,
            leela: 2,
            genericos: 4,
            default: 1
        },
        genericos: ["¡Dobl dobl dobl!", "¡A morder mi brillante trasero!"],
        fry: [],
        bender: [],
        leela: []
    },

    // --- SECCIÓN SOUTHPARK (Para ampliar) ---
    southpark: {
        fotos: {
            cartman: 4,
            kenny: 1,
            genericos: 2,
            default: 1
        },
        genericos: ["¡Han matado a Kenny!"],
        cartman: [],
        stan: [],
        kyle: []
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