#!/bin/bash

# --- CONFIGURACIÓN ---
INVENTORY_FILE="js/announcer_inventory.js"
BASE_DIR="announcers"

# Crear carpeta js si no existe
mkdir -p js

# Iniciar el archivo JS
echo "const ANNOUNCER_INVENTORY = {" > "$INVENTORY_FILE"

# Función para procesar carpetas
# Uso: procesar "nombre_carpeta" "prefijo"
procesar() {
    local folder="$BASE_DIR/$1"
    local prefix="$2"
    local count=0

    if [ -d "$folder" ]; then
        echo "Procesando $1..."
        
        # 1. Renombrar archivos temporalmente para evitar colisiones
        # (por si un archivo ya se llama f1.png pero debería ser f2.png)
        local i=1
        for file in "$folder"/*.{png,jpg,jpeg}; do
            [ -e "$file" ] || continue
            mv "$file" "$folder/temp_$i.tmp"
            ((i++))
        done

        # 2. Renombrar al formato final y contar
        local j=1
        for file in "$folder"/*.tmp; do
            [ -e "$file" ] || continue
            # Mantenemos la extensión original
            # mv "$file" "$folder/$prefix$j.png" 
            # Si quieres forzar png, usa la línea de arriba. 
            # Si quieres mantener la extensión:
            mv "$file" "$folder/$prefix$j.png"
            ((j++))
        done
        
        count=$((j - 1))
        # 3. Escribir en el archivo de inventario
        echo "    $1: { count: $count, prefix: '$prefix' }," >> "$INVENTORY_FILE"
        echo "   -> Encontradas $count imágenes con prefijo '$prefix'"
    else
        echo "    $1: { count: 0, prefix: '$prefix' }," >> "$INVENTORY_FILE"
        echo "   !! Carpeta $1 no encontrada."
    fi
}

# Ejecutar para tus categorías
procesar "funny" "f"
procesar "food" "c"
procesar "night" "n"
procesar "characters" "p"

# Cerrar el archivo JS
echo "};" >> "$INVENTORY_FILE"

echo "---------------------------------------"
echo "¡Listo! Inventario generado en $INVENTORY_FILE"