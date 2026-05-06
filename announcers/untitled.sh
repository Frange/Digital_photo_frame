#!/bin/bash

# Función para renombrar archivos en una carpeta
# Uso: rename_folder "ruta/carpeta" "prefijo"
rename_folder() {
    local folder=$1
    local prefix=$2
    
    if [ -d "$folder" ]; then
        echo "Procesando $folder..."
        cd "$folder" || return
        
        # Contador para el nombre
        count=1
        
        # Solo procesa archivos png, jpg y jpeg
        for file in *.{png,jpg,jpeg}; do
            # Verificar si existen archivos con esa extensión
            [ -e "$file" ] || continue
            
            extension="${file##*.}"
            new_name="${prefix}${count}.${extension}"
            
            # Solo renombrar si el nombre es diferente
            if [ "$file" != "$new_name" ]; then
                mv "$file" "$new_name"
            fi
            ((count++))
        done
        cd ../..
    else
        echo "Carpeta $folder no encontrada."
    fi
}

# Ejecutar para tus 4 carpetas
rename_folder "announcers/funny" "f"
rename_folder "announcers/food" "c"
rename_folder "announcers/night" "n"
rename_folder "announcers/characters" "p"

echo "¡Renombrado completado!"