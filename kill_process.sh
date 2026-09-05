sudo fuser -k -9 /dev/dri/card0 > /dev/null 2>&1

# 2. Por seguridad, un barrido extra de procesos WPE
sudo pkill -9 -f cog
sudo pkill -9 -f WPE
