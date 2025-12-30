import React, { useEffect, useState, useRef } from 'react';
import { Star } from 'lucide-react';

interface Point {
    x: number;
    y: number;
    id: number;
    color: string;
    rotation: number;
}

const COLORS = ['#FFD700', '#FF4500', '#D42426', '#FFFFFF']; // Gold, Orange, Red, White

const MagicCursor: React.FC = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const lastPos = useRef<{ x: number; y: number } | null>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Update custom cursor position directly
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }

            // "Gap" logic: Only add point if moved significant distance
            if (lastPos.current) {
                const dx = e.clientX - lastPos.current.x;
                const dy = e.clientY - lastPos.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 10) return; // 10px gap - ultra fast
            }

            lastPos.current = { x: e.clientX, y: e.clientY };

            const newPoint = {
                x: e.clientX,
                y: e.clientY,
                id: Date.now(),
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                rotation: Math.random() * 360,
            };

            setPoints(prev => [...prev.slice(-15), newPoint]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPoints(prev => prev.filter(p => Date.now() - p.id < 400));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]">
            {points.map((p, i) => (
                <div
                    key={p.id}
                    className="absolute opacity-40"
                    style={{
                        left: p.x,
                        top: p.y,
                        transform: `translate(-50%, -50%) scale(${1 - i / points.length}) rotate(${p.rotation}deg)`,
                        transition: 'opacity 0.8s ease-out',
                    }}
                >
                    <Star size={16} fill={p.color} stroke={p.color} />
                </div>
            ))}

            {/* Custom Christmas Cursor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] drop-shadow-md"
                style={{ transform: 'translate(-100px, -100px)' }} // Initial off-screen
            >
                {/* Red Arrow Cursor */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="filter drop-shadow-sm">
                    <path
                        d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                        fill="#D42426"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
};

export default MagicCursor;
