#!/bin/bash

# Ruta donde se guardará el archivo de log real
LOG_FILE="/home/pi/dashboard_navegador.log"

echo "=== Inicio del servicio de Marco de Fotos: $(date) ===" >> "$LOG_FILE"

# Bucle infinito para que si se cae, se reinicie solo
while true; do

    echo "Liberando hardware de vídeo y matando procesos..."
    # 1. Forzar el cierre de cualquier proceso que use la GPU (DRM)
    sudo fuser -k -9 /dev/dri/card0 > /dev/null 2>&1

    # 2. Por seguridad, un barrido extra de procesos WPE
    sudo pkill -9 -f cog
    sudo pkill -9 -f WPE

    # 3. Limpiar la memoria visual (Framebuffer)
    if [ -e /dev/fb0 ]; then
        sudo dd if=/dev/zero of=/dev/fb0 bs=1024 count=10000 2>/dev/null
    fi

    # 4. Resetear la consola
    clear
    setterm -cursor off

    # --- Configuración y Lanzamiento ---
    export WPE_COG_PLATFORM=drm
    export COG_VIEWPORT_WIDTH=1024
    export COG_VIEWPORT_HEIGHT=768

    echo "[$(date)] Iniciando Weather Web..." >> "$LOG_FILE"
    
    # Lanzamos cog redirigiendo toda su salida (estándar y errores) al archivo log
    cog "file:///home/pi/web/index.html" >> "$LOG_FILE" 2>&1

    # Si llega aquí es porque cog ha muerto. Registramos la caída.
    echo "[$(date)] ¡ALERTA! El navegador Cog se ha cerrado o ha dado un error. Reiniciando en 5 segundos..." >> "$LOG_FILE"
    
    sleep 5
done