export const SnowmanEffect = {
    draw(ctx, w, h) {
        const x = w / 2, y = h - 80;
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        // Bolas
        ctx.beginPath(); ctx.arc(x, y, 45, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x, y - 65, 35, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x, y - 115, 25, 0, Math.PI * 2); ctx.fill();
        // Detalles
        ctx.fillStyle = "#222";
        ctx.beginPath(); ctx.arc(x - 8, y - 122, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x + 8, y - 122, 3, 0, Math.PI * 2); ctx.fill();
        // Nariz
        ctx.fillStyle = "orange";
        ctx.beginPath(); ctx.moveTo(x, y - 115); ctx.lineTo(x + 20, y - 112); ctx.lineTo(x, y - 109); ctx.fill();
        // Bufanda
        ctx.strokeStyle = "red"; ctx.lineWidth = 10;
        ctx.beginPath(); ctx.moveTo(x - 25, y - 90); ctx.lineTo(x + 25, y - 90); ctx.stroke();
    }
};