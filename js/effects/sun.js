export const SunEffect = {
    draw(ctx, w, h) {
        const x = w * 0.8, y = 150;
        let g = ctx.createRadialGradient(x, y, 0, x, y, 600);
        g.addColorStop(0, "rgba(255,255,180,0.35)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        
        ctx.fillStyle = "rgba(255,255,220,0.15)";
        ctx.beginPath(); ctx.arc(x, y, 60, 0, Math.PI * 2); ctx.fill();
    }
};