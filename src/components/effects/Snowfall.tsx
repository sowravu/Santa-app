import React, { useEffect, useRef } from 'react';

const Snowfall: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = window.innerWidth;
        let h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;

        const snowflakes: { x: number; y: number; r: number; d: number; }[] = [];
        const maxSnowflakes = 100;

        for (let i = 0; i < maxSnowflakes; i++) {
            snowflakes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 3 + 1, // radius 1-4px
                d: Math.random() + 0.5, // density/speed
            });
        }

        let animationFrameId: number;

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath();
            for (let i = 0; i < maxSnowflakes; i++) {
                const f = snowflakes[i];
                ctx.moveTo(f.x, f.y);
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
            }
            ctx.fill();
            move();
            animationFrameId = requestAnimationFrame(draw);
        };

        const move = () => {
            for (let i = 0; i < maxSnowflakes; i++) {
                const f = snowflakes[i];
                f.y += Math.pow(f.d, 2) * 0.5; // fall speed
                f.x += Math.sin(f.y * 0.05) * 0.5; // Sway

                // Reset if out of view
                if (f.y > h) {
                    snowflakes[i] = { x: Math.random() * w, y: 0, r: f.r, d: f.d };
                }
            }
        };

        draw();

        const handleResize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-50"
        />
    );
};

export default Snowfall;
