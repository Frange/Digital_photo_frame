export class Particle {
    constructor(type, canvas) {
        this.type = type;
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * (this.canvas.width + 600) - 300;
        if (this.type === 'cloud') {
            this.y = (this.canvas.height * 0.5) + (Math.random() * (this.canvas.height * 0.4));
            this.r = 70 + Math.random() * 120;
            this.speed = 0.2 + Math.random() * 0.4;
            this.op = 0.1 + Math.random() * 0.2;
        } else if (this.type === 'wind-cloud') {
            this.y = Math.random() * this.canvas.height;
            this.r = 150 + Math.random() * 200;
            this.speed = 15 + Math.random() * 10;
            this.op = 0.05 + Math.random() * 0.1;
        } else if (this.type === 'rain') {
            this.y = Math.random() * -this.canvas.height;
            this.speed = 30; this.len = 35;
        } else if (this.type === 'snow') {
            this.y = Math.random() * -this.canvas.height;
            this.speed = 1.5 + Math.random() * 2;
            this.r = 2 + Math.random() * 3;
            this.vx = Math.random() - 0.5;
        } else if (this.type === 'fog') {
            this.x = Math.random() * this.canvas.width;
            this.y = this.canvas.height - (Math.random() * 400);
            this.r = 300 + Math.random() * 300;
        }
    }

    draw(ctx, isNight) {
        ctx.beginPath();
        if (this.type === 'cloud' || this.type === 'wind-cloud') {
            let g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
            let color = isNight ? `rgba(80,80,120,${this.op})` : `rgba(255,255,255,${this.op})`;
            g.addColorStop(0, color); g.addColorStop(1, "transparent");
            ctx.fillStyle = g;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(this.type === 'cloud' ? 2.5 : 4, 0.8);
            ctx.arc(0, 0, this.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            this.x += this.speed;
        } else if (this.type === 'rain') {
            ctx.strokeStyle = isNight ? "rgba(100,100,200,0.4)" : "rgba(174,194,224,0.6)";
            ctx.moveTo(this.x, this.y); ctx.lineTo(this.x, this.y + this.len); ctx.stroke();
            this.y += this.speed;
        } else if (this.type === 'snow') {
            ctx.fillStyle = "white"; ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill();
            this.y += this.speed; this.x += this.vx;
        } else if (this.type === 'fog') {
            let g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
            g.addColorStop(0, isNight ? "rgba(40,40,60,0.2)" : "rgba(255,255,255,0.15)");
            g.addColorStop(1, "transparent");
            ctx.fillStyle = g; ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill();
        }
        if (this.y > this.canvas.height + 200 || this.x > this.canvas.width + 600) this.reset();
    }
}