#!/bin/bash

echo "Liberando hardware de vídeo y matando procesos..."

# 1. Forzar el cierre de cualquier proceso que use la GPU (DRM)
# Esto es lo que te funcionó manualmente.
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

echo "Iniciando Weather Web..."
cog "file:///home/pi/web/index.html"

