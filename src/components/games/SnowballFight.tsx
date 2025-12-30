import React, { useState, useEffect, useRef } from 'react';
import { User, ArrowLeft, ShoppingBag, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePoints } from '../../context/PointsContext';
import confetti from 'canvas-confetti';

const SnowballFight: React.FC = () => {
    const { addPoints } = usePoints();
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [activeMole, setActiveMole] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    // ... (refs and other logic remain the same) ...
    // Refs to hold current state values for use in closures (intervals/timeouts)
    const scoreRef = useRef(0);
    const timeLeftRef = useRef(30);
    const isPlayingRef = useRef(false);

    // 9 holes
    const holes = Array.from({ length: 9 }, (_, i) => i);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const moleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Update refs whenever state changes
    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    useEffect(() => {
        timeLeftRef.current = timeLeft;
    }, [timeLeft]);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    useEffect(() => {
        if (timeLeft === 0 && isPlaying) {
            endGame();
        }
    }, [timeLeft, isPlaying]);

    useEffect(() => {
        return () => {
            stopGameLoop();
        };
    }, []);

    const stopGameLoop = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
        timerRef.current = null;
        moleTimerRef.current = null;
    };

    const startGame = () => {
        // Reset state
        setScore(0);
        setTimeLeft(30);
        setIsPlaying(true);
        setGameOver(false);
        setActiveMole(null);

        // Reset refs immediately
        scoreRef.current = 0;
        timeLeftRef.current = 30;
        isPlayingRef.current = true;

        stopGameLoop();

        // Game loop for timer
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                const newTime = prev - 1;
                if (newTime <= 0) return 0;
                return newTime;
            });
        }, 1000);

        moveMole();
    };

    const endGame = () => {
        setIsPlaying(false);
        setGameOver(true);
        isPlayingRef.current = false; // Update ref immediately for reliability

        stopGameLoop();
        setActiveMole(null);

        // Use ref to get the *latest* score
        const finalScore = scoreRef.current;

        // Award points based on score
        if (finalScore > 0) {
            addPoints(finalScore * 5); // 5 points per hit
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    const moveMole = () => {
        // Check refs for latest status
        if (!isPlayingRef.current) return;

        const randomHole = Math.floor(Math.random() * holes.length);
        setActiveMole(randomHole);

        const randomTime = Math.floor(Math.random() * 800) + 400; // 400ms to 1200ms

        moleTimerRef.current = setTimeout(() => {
            // Check refs again before recursion
            if (isPlayingRef.current && timeLeftRef.current > 0) {
                moveMole();
            }
        }, randomTime);
    };

    const handleWhack = (index: number) => {
        if (!isPlaying || index !== activeMole) return;

        setScore((prev) => prev + 1);
        setActiveMole(null);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center relative">
            {/* Back Button */}
            <button
                onClick={() => navigate('/games')}
                className="absolute top-8 left-4 p-2 bg-white/50 dark:bg-black/30 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                title="Back to Games"
            >
                <ArrowLeft className="text-gray-700 dark:text-gray-200" size={24} />
            </button>

            <h1 className="text-4xl font-bold font-heading text-santa-red dark:text-red-400 mb-8">Snowball Fight!</h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-2xl mb-8 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-2xl font-bold font-heading text-gray-700 dark:text-gray-200">
                        Score: <span className="text-forest-green dark:text-green-400">{score}</span>
                    </div>
                    <div className="text-2xl font-bold font-heading text-gray-700 dark:text-gray-200">
                        Time: <span className={`${timeLeft < 10 ? 'text-red-500' : 'text-blue-500'}`}>{timeLeft}s</span>
                    </div>
                </div>

                {!isPlaying && !gameOver && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                            Click the elves as they pop up to throw snowballs at them!
                            <br />
                            <span className="text-sm opacity-75">(Don't worry, they like it!)</span>
                        </p>
                        <button
                            onClick={startGame}
                            className="btn-primary text-xl px-8 py-3 transform hover:scale-105 transition-transform"
                        >
                            Start Game
                        </button>
                    </div>
                )}

                {gameOver && (
                    <div className="text-center py-8">
                        <h2 className="text-3xl font-bold text-santa-red dark:text-red-400 mb-2">Time's Up!</h2>
                        <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
                            You hit <span className="font-bold">{score}</span> elves!
                        </p>
                        <p className="text-lg text-yellow-600 dark:text-yellow-400 font-bold mb-8">
                            +{score * 5} Points Earned
                        </p>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={startGame}
                                className="btn-primary text-lg"
                            >
                                Play Again
                            </button>
                            <button
                                onClick={() => navigate('/shop')}
                                className="flex items-center gap-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-bold transition-colors"
                            >
                                <ShoppingBag size={20} />
                                Go to Shop
                            </button>
                        </div>
                        <button
                            onClick={() => navigate('/games')}
                            className="mt-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center justify-center gap-2 mx-auto"
                        >
                            <Gamepad2 size={18} />
                            Back to Games
                        </button>
                    </div>
                )}

                {isPlaying && (
                    <div className="grid grid-cols-3 gap-4 w-full aspect-square md:aspect-video">
                        {holes.map((index) => (
                            <div
                                key={index}
                                className="relative bg-blue-100 dark:bg-gray-700 rounded-full border-4 border-blue-200 dark:border-gray-600 overflow-hidden cursor-crosshair active:scale-95 transition-transform"
                                onClick={() => handleWhack(index)}
                            >
                                {/* Snow mound bottom */}
                                <div className="absolute bottom-0 w-full h-1/3 bg-white rounded-t-xl z-20"></div>

                                {/* Elf */}
                                <div
                                    className={`absolute left-1/2 -translate-x-1/2 w-3/4 transition-all duration-100 ease-out z-10 flex flex-col items-center
                                        ${activeMole === index ? 'bottom-1/4' : '-bottom-full'}
                                    `}
                                >
                                    <User size={48} className="text-green-600 dark:text-green-400" />
                                    <div className="w-full h-8 bg-green-600 dark:bg-green-500 rounded-t-full mt-[-10px]"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SnowballFight;
