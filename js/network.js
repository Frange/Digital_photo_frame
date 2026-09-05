const NetworkInfo = {
    async getLocalIP() {
        return new Promise((resolve) => {
            const pc = new RTCPeerConnection({
                iceServers: [] // No necesitamos servidores externos
            });
            
            pc.createDataChannel(""); 
            pc.createOffer().then(offer => pc.setLocalDescription(offer));
            
            pc.onicecandidate = (ice) => {
                if (!ice || !ice.candidate || !ice.candidate.candidate) {
                    // Si termina el proceso y no encontró nada, usa la IP de emergencia
                    resolve(window.CONFIG?.ipLocal || "127.0.0.1");
                    return;
                }
                
                // Buscamos el patrón de IP v4
                const ipMatch = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(ice.candidate.candidate);
                if (ipMatch) {
                    const ip = ipMatch[1];
                    // Evitamos que nos devuelva 127.0.0.1 si hay otra disponible
                    if (ip !== "127.0.0.1") {
                        pc.onicecandidate = null;
                        pc.close();
                        resolve(ip);
                    }
                }
            };

            // Esperamos un máximo de 2 segundos antes de tirar la toalla
            setTimeout(() => resolve(window.CONFIG?.ipLocal || "127.0.0.1"), 2000);
        });
    }
};