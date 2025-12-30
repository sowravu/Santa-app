import React, { useState, useEffect, useRef } from 'react';
import { Gift, Bug, Cookie, ArrowLeft, ShoppingBag, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePoints } from '../../context/PointsContext';

interface FallingItem {
    id: number;
    x: number;
    y: number;
    speed: number;
    type: 'gift' | 'coal' | 'cookie';
}

const GiftCatcher: React.FC = () => {
    const { addPoints } = usePoints();
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const [items, setItems] = useState<FallingItem[]>([]);

    // ... (refs and logic remain unchanged) ...
    // Refs for game loop state accessibility
    const isPlayingRef = useRef(false);
    const scoreRef = useRef(0);
    const timeLeftRef = useRef(30);

    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Sync refs with state
    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    useEffect(() => {
        timeLeftRef.current = timeLeft;
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft === 0 && isPlaying) {
            endGame();
        }
    }, [timeLeft, isPlaying]);

    useEffect(() => {
        return () => {
            stopGame();
        };
    }, []);

    const stopGame = () => {
        isPlayingRef.current = false;
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };

    const startGame = () => {
        stopGame(); // Ensure clean slate

        setScore(0);
        setTimeLeft(30);
        setItems([]);
        setIsPlaying(true);

        isPlayingRef.current = true;
        scoreRef.current = 0;
        timeLeftRef.current = 30;

        lastTimeRef.current = performance.now();
        requestRef.current = requestAnimationFrame(gameLoop);

        // Timer Interval
        // Timer Interval
        timerIntervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) return 0;
                return prev - 1;
            });
        }, 1000);
    };

    const endGame = () => {
        stopGame();
        setIsPlaying(false);

        // Use ref to get the most up-to-date score
        const finalScore = scoreRef.current;
        if (finalScore > 0) {
            addPoints(finalScore);
        }
    };

    const gameLoop = (time: number) => {
        if (!isPlayingRef.current) return;

        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;

        setItems(prevItems => {
            // Move items
            const movedItems = prevItems.map(item => ({
                ...item,
                y: item.y + item.speed * (deltaTime / 16)
            })).filter(item => item.y < 600); // Remove if off screen

            // Spawn new item randomly (~2% chance per frame)
            if (Math.random() < 0.03) {
                const typeRand = Math.random();
                let type: 'gift' | 'coal' | 'cookie' = 'gift';
                if (typeRand > 0.8) type = 'coal';
                else if (typeRand > 0.6) type = 'cookie';

                movedItems.push({
                    id: Date.now() + Math.random(),
                    x: Math.random() * (containerRef.current?.offsetWidth || 300) - 40, // Adjust for width
                    y: -50,
                    speed: 2 + Math.random() * 3,
                    type
                });
            }

            return movedItems;
        });

        if (timeLeftRef.current > 0) {
            requestRef.current = requestAnimationFrame(gameLoop);
        }
    };

    const handleItemClick = (id: number, type: string) => {
        if (!isPlayingRef.current) return;

        setItems(prev => prev.filter(item => item.id !== id));

        setScore(s => {
            let newScore = s;
            if (type === 'gift') newScore += 10;
            else if (type === 'cookie') newScore += 20;
            else if (type === 'coal') newScore = Math.max(0, s - 10);
            return newScore;
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center relative">
            {/* Back Button */}
            <button
                onClick={() => navigate('/games')}
                className="absolute top-8 left-0 p-2 bg-white/50 dark:bg-black/30 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors z-20"
                title="Back to Games"
            >
                <ArrowLeft className="text-gray-700 dark:text-gray-200" size={24} />
            </button>

            <div className="flex justify-between w-full items-center mb-6 pl-12">
                <h1 className="text-3xl font-bold font-heading text-santa-red dark:text-red-400">Gift Catcher</h1>
                <div className="flex gap-4">
                    <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow font-bold text-gray-800 dark:text-gray-100">
                        Score: {score}
                    </div>
                    <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow font-bold text-red-600 dark:text-red-400">
                        Time: {timeLeft}s
                    </div>
                </div>
            </div>

            <div
                ref={containerRef}
                className="relative w-full h-[500px] bg-sky-100 dark:bg-gray-800 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl cursor-crosshair select-none"
            >
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 backdrop-blur-sm">
                        <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-sm w-full mx-4">
                            <h2 className="text-3xl font-bold mb-4 font-heading text-santa-red dark:text-red-400">
                                {timeLeft === 0 ? 'Game Over!' : 'Ready to Catch?'}
                            </h2>
                            {timeLeft === 0 && (
                                <p className="mb-6 text-xl text-gray-700 dark:text-gray-300">
                                    You earned <span className="font-bold text-yellow-600">{score} points!</span>
                                </p>
                            )}

                            {timeLeft === 30 && (
                                <p className="mb-6 text-sm text-gray-500">
                                    Catch Gifts (+10) & Cookies (+20). <br /> Avoid the Coal Bugs (-10)!
                                </p>
                            )}

                            <div className="flex flex-col gap-3 items-center w-full">
                                <button
                                    onClick={startGame}
                                    className="bg-santa-red hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg transition-transform hover:scale-105 w-full"
                                >
                                    {timeLeft === 0 ? 'Play Again' : 'Start Game'}
                                </button>

                                {timeLeft === 0 && (
                                    <>
                                        <button
                                            onClick={() => navigate('/shop')}
                                            className="flex items-center justify-center gap-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-bold transition-colors w-full"
                                        >
                                            <ShoppingBag size={20} />
                                            Go to Shop
                                        </button>
                                        <button
                                            onClick={() => navigate('/games')}
                                            className="text-gray-400 hover:text-white flex items-center gap-2 mt-2"
                                        >
                                            <Gamepad2 size={16} />
                                            Back to Games
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {items.map(item => (
                    <div
                        key={item.id}
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            handleItemClick(item.id, item.type);
                        }}
                        className="absolute cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                        style={{
                            left: Math.max(0, item.x), // Prevent overflow left
                            top: item.y,
                            transition: 'top 0s',
                            willChange: 'top'
                        }}
                    >
                        {item.type === 'gift' && <Gift size={40} className="text-red-500 drop-shadow-md" />}
                        {item.type === 'cookie' && <Cookie size={32} className="text-amber-600 drop-shadow-md" />}
                        {item.type === 'coal' && <Bug size={36} className="text-gray-800 dark:text-gray-900 drop-shadow-md" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GiftCatcher;
