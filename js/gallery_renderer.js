const GalleryRenderer = {
    render(container, mediaUrl, isVideo, options = {}) {
        if (!container) return null;

        // Limpiamos el contenedor anterior
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        let mediaElement;
        if (isVideo) {
            mediaElement = document.createElement('video');
            mediaElement.id = 'bg-main';
            Object.assign(mediaElement, { autoplay: true, muted: true, playsInline: true });
            if (options.onEnded) mediaElement.onended = options.onEnded;
            if (options.onError) mediaElement.onError = options.onError;
            mediaElement.src = mediaUrl;
        } else {
            mediaElement = document.createElement('img');
            mediaElement.id = 'bg-main';
            if (options.onLoad) mediaElement.onload = options.onLoad;
            if (options.onError) mediaElement.onerror = options.onError;
            mediaElement.src = mediaUrl;
        }

        // Estilos estrictos unificados para que encajen perfectamente en el marco sin recortes
        mediaElement.style.width = '100%';
        mediaElement.style.height = '100%';
        mediaElement.style.objectFit = 'contain';
        mediaElement.style.position = 'absolute';
        mediaElement.style.top = '0';
        mediaElement.style.left = '0';

        // PRIMERO SE INSERTA EN EL DOM, LUEGO SE CARGA (Vital para WPE WebKit en Raspberry Pi)
        container.appendChild(mediaElement);
        return mediaElement;
    }
};