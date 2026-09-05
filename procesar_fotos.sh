#!/bin/bash

# Procesar todos los archivos de imagen comunes
for archivo in *.{jpg,jpeg,png,heic,JPG,JPEG,PNG,HEIC}; do
    # Verificar si el archivo existe para evitar errores si la carpeta está vacía
    [ -e "$archivo" ] || continue

    # 1. Definir el nuevo nombre (minúsculas, sin espacios, sin acentos)
    # Ejemplo: "Mi Foto 2024.HEIC" -> "mi_foto_2024.jpg"
    nombre_limpio=$(echo "${archivo%.*}" | tr '[:upper:]' '[:lower:]' | tr ' ' '_' | iconv -f utf-8 -t ascii//TRANSLIT | tr -cd '[:alnum:]_')
    nuevo_archivo="${nombre_limpio}.jpg"

    echo "Procesando: $archivo -> $nuevo_archivo"

    # 2. Convertir, redimensionar (max 1024px) y guardar en la misma carpeta
    # Usamos un nombre temporal para no entrar en conflicto si el original ya se llamaba igual
    sips -s format jpeg -Z 1024 "$archivo" --out "${nuevo_archivo}.tmp" > /dev/null 2>&1

    # 3. Borrar el original (solo si el nuevo se creó correctamente) y renombrar el temporal
    if [ -f "${nuevo_archivo}.tmp" ]; then
        rm "$archivo"
        mv "${nuevo_archivo}.tmp" "$nuevo_archivo"
    fi
done

echo "---------------------------------------"
echo "¡Listo! Todas las fotos procesadas en esta carpeta."