#!/bin/bash

# Forzar limpieza visual de la terminal por si hay caracteres corruptos
reset > /dev/null 2>&1

echo "==> Deteniendo servicios..."

# 1. Matar el servidor Python por nombre de archivo (evita usar fuser en puertos)
sudo pkill -9 -f "server.py" 2>/dev/null

# 2. Matar el navegador de forma limpia por nombre de proceso
sudo pkill -9 -f "cog" 2>/dev/null
sudo pkill -9 -f "WPE" 2>/dev/null

# Pausa breve para liberar recursos de red
sleep 1

reset > /dev/null 2>&1

echo "==> Arrancando servidor..."
python3 server.py
