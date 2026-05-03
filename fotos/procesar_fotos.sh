#!/bin/bash

# 1. Procesar imágenes
echo "Procesando archivos..."
for archivo in *.{jpg,jpeg,png,heic,JPG,JPEG,PNG,HEIC}; do
    [ -e "$archivo" ] || continue
    
    base=$(echo "${archivo%.*}" | sed 's/^foto_//I' | tr '[:upper:]' '[:lower:]' | tr ' ' '_' | iconv -f utf-8 -t ascii//TRANSLIT | tr -cd '[:alnum:]_')
    nuevo="foto_${base}.jpg"
    
    sips -s format jpeg -Z 1024 "$archivo" --out "${nuevo}.tmp" > /dev/null 2>&1
    
    if [ -f "${nuevo}.tmp" ]; then
        rm "$archivo"
        mv "${nuevo}.tmp" "$nuevo"
        echo "OK: $nuevo"
    fi
done

# 2. Generar galeria.js (Sin rutas extra)
echo "Generando listado para la web..."
echo "const LISTADO_GALERIA = [" > galeria.js

# Guardamos la lista de archivos en una variable
archivos=(foto_*.jpg *.mp4)

for i in "${!archivos[@]}"; do
    archivo_real="${archivos[$i]}"
    # Verificar que el archivo existe de verdad y no es el asterisco literal
    if [ -f "$archivo_real" ]; then
        # Añadimos coma a todos menos al último para que el JSON sea perfecto
        if [ $i -eq $(( ${#archivos[@]} - 1 )) ]; then
            echo "  \"$archivo_real\"" >> galeria.js
        else
            echo "  \"$archivo_real\"," >> galeria.js
        fi
    fi
done

echo "];" >> galeria.js
echo "---------------------------------------"
echo "¡Listo! galeria.js creado sin errores."