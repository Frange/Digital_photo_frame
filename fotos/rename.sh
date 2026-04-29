#!/bin/bash

mkdir -p fotos
count_f=1
count_g=1
count_v=1

# Procesar Imágenes (JPG, JPEG, PNG) -> foto_xxxxxxx.jpg
for f in *.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    [ -e "$f" ] || continue
    new_name=$(printf "foto_%07d.jpg" "$count_f")
    cp "$f" "$new_name"
    ((count_f++))
done

# Procesar GIFs -> gif_xxxxxxx.gif
for f in *.{gif,GIF}; do
    [ -e "$f" ] || continue
    new_name=$(printf "gif_%07d.gif" "$count_g")
    cp "$f" "$new_name"
    ((count_g++))
done

# Procesar Vídeos -> video_xxxxxxx.mp4
for f in *.{mp4,mov,avi,webm,MP4,MOV,AVI}; do
    [ -e "$f" ] || continue
    new_name=$(printf "video_%07d.mp4" "$count_v")
    cp "$f" "$new_name"
    ((count_v++))
done

echo "¡Listo! Fotos: $((count_f-1)), Gifs: $((count_g-1)), Videos: $((count_v-1))"