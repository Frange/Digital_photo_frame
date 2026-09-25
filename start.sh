#!/bin/bash

# COMENTADO TEMPORALMENTE: Ejecución directa en terminal para ver logs en vivo
# if [ -t 0 ]; then
#     nohup "$0" "$@" >> "$LOG_FILE" 2>&1 &
#     echo "Servidor iniciado en segundo plano."
#     exit 0
# fi

PIDFILE="/tmp/start_marco.pid"
LOG_FILE="/home/pi/dashboard_navegador.log"
WEB_DIR="/home/pi/web"
SERVER_SCRIPT="/home/pi/server.py"
PORT=8080

# Limpiar el log anterior por completo al iniciar
> "$LOG_FILE"

if [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
    echo "El marco ya está ejecutándose."
    exit 1
fi

echo $$ > "$PIDFILE"
exec > >(tee -a "$LOG_FILE") 2>&1

echo
echo "============================================================"
echo " Inicio del servicio de Marco de Fotos"
echo "$(date)"
echo "============================================================"
echo

cleanup() {
    echo
    echo "[$(date)] Deteniendo Marco de Fotos..."
    sudo pkill -9 -f "cog" 2>/dev/null
    sudo pkill -9 -f "WPE" 2>/dev/null
    if [ ! -z "$SERVER_PID" ]; then
        kill -9 "$SERVER_PID" 2>/dev/null
    fi
    sudo pkill -9 -f "server.py" 2>/dev/null
    sudo fuser -k 8080/tcp 2>/dev/null
    if [ -f "$PIDFILE" ]; then
        rm -f "$PIDFILE"
    fi
}

trap cleanup EXIT INT TERM

export XDG_RUNTIME_DIR="/run/user/$(id -u)"
if [ ! -d "$XDG_RUNTIME_DIR" ]; then
    export XDG_RUNTIME_DIR="/tmp/runtime-pi"
    mkdir -p "$XDG_RUNTIME_DIR"
    chmod 0700 "$XDG_RUNTIME_DIR"
fi

export WPE_COG_PLATFORM=drm
export COG_VIEWPORT_WIDTH=1024
export COG_VIEWPORT_HEIGHT=768

echo "[$(date)] Limpiando procesos anteriores..."
sudo pkill -9 -f "cog" 2>/dev/null
sudo pkill -9 -f "WPE" 2>/dev/null
sudo pkill -9 -f "server.py" 2>/dev/null
sudo fuser -k 8080/tcp 2>/dev/null
sleep 1

if [ ! -d "$WEB_DIR" ]; then
    echo "ERROR: No existe $WEB_DIR"
    exit 1
fi

if [ ! -f "$SERVER_SCRIPT" ]; then
    echo "ERROR: No existe $SERVER_SCRIPT"
    exit 1
fi

echo "[$(date)] Iniciando servidor Dashboard + Immich..."
cd "$WEB_DIR" || exit 1

python3 "$SERVER_SCRIPT" &
SERVER_PID=$!

echo "[$(date)] server.py iniciado."
echo "[$(date)] PID servidor: $SERVER_PID"
echo "[$(date)] Esperando al servidor HTTP..."

SERVER_READY=0
for i in $(seq 1 20); do
    if curl --silent --max-time 1 "http://127.0.0.1:${PORT}/api/immich/status" >/dev/null 2>&1; then
        SERVER_READY=1
        break
    fi
    sleep 1
done

if [ "$SERVER_READY" -ne 1 ]; then
    echo
    echo "ERROR: El servidor Python no responde."
    echo "Comprueba:"
    echo
    echo "    tail -100 $LOG_FILE"
    echo
    exit 1
fi

echo "[$(date)] Servidor HTTP funcionando."
echo "[$(date)] Comprobando Immich..."

IMMICH_STATUS=$(curl --silent --max-time 10 "http://127.0.0.1:${PORT}/api/immich/status")

echo "[$(date)] Estado Immich:"
echo "$IMMICH_STATUS"

echo
echo "============================================================"
echo " Iniciando navegador Cog"
echo "============================================================"
echo

while true; do
    echo "[$(date)] Iniciando Cog..."
    cog "http://localhost:${PORT}/index.html"
    EXIT_CODE=$?
    echo
    echo "[$(date)] Cog finalizó."
    echo "[$(date)] Código: ${EXIT_CODE}"
    echo "[$(date)] Reiniciando en 5 segundos..."
    echo
    sleep 5
done
