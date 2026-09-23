#!/bin/bash

# Configuración de límites estrictos de memoria para ImageMagick en la Pi Zero 2 W
export MAGICK_MEMORY_LIMIT=128MiB
export MAGICK_MAP_LIMIT=256MiB
export MAGICK_AREA_LIMIT=32MiB

CARPETA_FOTOS="/home/pi/web/fotos"
MARCA_TIEMPO="$CARPETA_FOTOS/.ultima_optimizacion"
LOG_FILE="$CARPETA_FOTOS/optimizaciones.log"

PESO_MINIMO_MB=2

if [ ! -d "$CARPETA_FOTOS" ]; then
    echo "Error: No se encuentra la carpeta $CARPETA_FOTOS"
    exit 1
fi

cd "$CARPETA_FOTOS" || exit 1

if [ ! -f "$MARCA_TIEMPO" ]; then
    touch -t 197001010000 "$MARCA_TIEMPO"
fi

echo "Buscando fotos pesadas (> ${PESO_MINIMO_MB}MB)..."

mapfile -t FOTOS_PESADAS < <(find . -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -size +${PESO_MINIMO_MB}M -newer "$MARCA_TIEMPO")

TOTAL=${#FOTOS_PESADAS[@]}

if [ "$TOTAL" -gt 0 ]; then
    echo "--------------------------------------------------"
    echo "Se han encontrado $TOTAL fotos pesadas. Optimizando seguro..."
    echo "--------------------------------------------------"
    
    FECHA_ACTUAL=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$FECHA_ACTUAL] Inicio de optimización para $TOTAL imágenes" >> "$LOG_FILE"

    CONTADOR=1
    for FOTO in "${FOTOS_PESADAS[@]}"; do
        NOMBRE_LIMPIDO="${FOTO#./}"
        TAM_ORIGINAL=$(ls -lh "$FOTO" | awk '{print $5}')
        
        echo "[$CONTADOR/$TOTAL] Reduciendo: $NOMBRE_LIMPIDO ($TAM_ORIGINAL)..."
        
        # Uso de convert en archivo temporal para evitar cierres 'Killed'
        convert -limit memory 128MiB -limit map 256MiB "$FOTO" -resize 1920x1080\> -quality 85 "temp_$NOMBRE_LIMPIDO"
        
        # Si convert terminó bien (código 0), reemplazamos el original
        if [ $? -eq 0 ] && [ -f "temp_$NOMBRE_LIMPIDO" ]; then
            mv "temp_$NOMBRE_LIMPIDO" "$FOTO"
            TAM_NUEVO=$(ls -lh "$FOTO" | awk '{print $5}')
            echo "  -> Éxito: $NOMBRE_LIMPIDO ($TAM_ORIGINAL -> $TAM_NUEVO)" >> "$LOG_FILE"
        else
            echo "  -> Error/Omitida: $NOMBRE_LIMPIDO" >> "$LOG_FILE"
            rm -f "temp_$NOMBRE_LIMPIDO"
        fi
        
        CONTADOR=$((CONTADOR + 1))
    done
    
    echo "--------------------------------------------------"
    echo "¡Proceso terminado con éxito!"
    echo "--------------------------------------------------"
else
    echo "No hay fotos pesadas pendientes."
fi

touch "$MARCA_TIEMPO"
