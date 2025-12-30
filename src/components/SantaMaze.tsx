import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RefreshCcw, Trophy, Trees, Flower, Carrot, Sun } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

// Maze constants
const ROWS = 15;
const COLS = 15;

type Point = { x: number; y: number };
type CellType = 'wall' | 'path' | 'start' | 'end';

// Decorative icons for walls
const WallDecoration: React.FC<{ index: number }> = React.memo(({ index }) => {
    // Deterministic decoration based on index
    const decorations = [
        null, null, null, null, // Mostly empty grass
        <Trees size={16} className="text-green-700 opacity-60" />,
        <Trees size={14} className="text-green-800 opacity-50" />,
        <Flower size={12} className="text-pink-400 opacity-70" />,
        <Carrot size={12} className="text-orange-400 opacity-70" />, // Rabbit food!
        <Flower size={10} className="text-yellow-400 opacity-60" />,
    ];

    // Simple pseudo-random using index
    const deco = decorations[index % decorations.length];

    return deco ? <div className="absolute">{deco}</div> : null;
});

const SantaMaze: React.FC = () => {
    const [maze, setMaze] = useState<CellType[][]>([]);
    const [santaPos, setSantaPos] = useState<Point>({ x: 1, y: 1 });
    const [endPos, setEndPos] = useState<Point>({ x: COLS - 2, y: ROWS - 2 });
    const [won, setWon] = useState(false);
    const [moves, setMoves] = useState(0);

    // Initialize/Reset Game
    const generateMaze = useCallback(() => {
        // 1. Initialize grid with walls
        const newMaze: CellType[][] = Array(ROWS).fill(null).map(() => Array(COLS).fill('wall'));

        // 2. Recursive Backtracker Algorithm
        const carvingConfig = {
            directions: [
                { x: 0, y: -2 }, // Up
                { x: 0, y: 2 },  // Down
                { x: -2, y: 0 }, // Left
                { x: 2, y: 0 }   // Right
            ]
        };

        const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

        const carve = (x: number, y: number) => {
            newMaze[y][x] = 'path';

            const dirs = shuffle([...carvingConfig.directions]);

            for (const { x: dx, y: dy } of dirs) {
                const nx = x + dx;
                const ny = y + dy;

                if (nx > 0 && nx < COLS - 1 && ny > 0 && ny < ROWS - 1 && newMaze[ny][nx] === 'wall') {
                    newMaze[y + dy / 2][x + dx / 2] = 'path'; // Carve path between
                    carve(nx, ny);
                }
            }
        };

        // Start from (1,1)
        carve(1, 1);

        // Ensure end point is reachable/open
        newMaze[1][1] = 'start';

        // Find a valid end position
        let ex = COLS - 2;
        let ey = ROWS - 2;
        // Ensure it's a path
        while (newMaze[ey][ex] === 'wall') {
            if (ex > 1) ex--;
            else if (ey > 1) { ey--; ex = COLS - 2; }
        }
        newMaze[ey][ex] = 'end';

        setEndPos({ x: ex, y: ey });
        setMaze(newMaze);
        setSantaPos({ x: 1, y: 1 });
        setWon(false);
        setMoves(0);
    }, []);

    useEffect(() => {
        generateMaze();
    }, [generateMaze]);

    // Movement Logic
    const moveSanta = useCallback((dx: number, dy: number) => {
        if (won) return;

        setSantaPos(prev => {
            const newX = prev.x + dx;
            const newY = prev.y + dy;

            // Check bounds and walls
            if (
                newX >= 0 && newX < COLS &&
                newY >= 0 && newY < ROWS &&
                maze[newY][newX] !== 'wall'
            ) {
                const newMoves = moves + 1;
                setMoves(newMoves);

                // Check Win
                if (newX === endPos.x && newY === endPos.y) {
                    setWon(true);
                    canvasConfetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#D42426', '#2F5233', '#FFD700', '#FFFFFF']
                    });
                }

                return { x: newX, y: newY };
            }
            return prev;
        });
    }, [maze, won, endPos, moves]);

    // Keyboard Controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }

            switch (e.key) {
                case 'ArrowUp': moveSanta(0, -1); break;
                case 'ArrowDown': moveSanta(0, 1); break;
                case 'ArrowLeft': moveSanta(-1, 0); break;
                case 'ArrowRight': moveSanta(1, 0); break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [moveSanta]);

    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-8 relative">

            {/* Background decoration */}
            <div className="absolute -top-10 -left-10 text-yellow-400 opacity-20 animate-spin-slow">
                <Sun size={100} />
            </div>

            <div className="text-center mb-8 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold font-heading text-green-600 dark:text-green-400 mb-4 drop-shadow-sm">
                    Santa's Garden Maze
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl mx-auto font-body">
                    Guide Santa through the magical garden path to find his home! 🏡
                </p>
            </div>

            {/* Main Container - Colorful Cartoon Style */}
            <div className="bg-[#86efac] dark:bg-green-900/50 rounded-[3rem] shadow-[0_20px_50px_rgba(0,128,0,0.3)] p-6 md:p-10 border-[8px] border-white/40 flex flex-col md:flex-row gap-8 items-center justify-center relative overflow-hidden">

                {/* Grass Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grass.png')] pointer-events-none mix-blend-overlay" />

                {/* MAZE GRID */}
                <div className="relative z-10 p-4 rounded-[2rem] bg-[#4ade80] dark:bg-green-800 shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)] border-4 border-white/30">
                    <div
                        className="grid"
                        style={{
                            gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                            width: 'min(80vw, 400px)',
                            aspectRatio: '1/1'
                        }}
                    >
                        {maze.map((row, y) => (
                            row.map((cell, x) => {
                                const isSanta = santaPos.x === x && santaPos.y === y;
                                const isEnd = cell === 'end';
                                const isWall = cell === 'wall';

                                // Calculate corners (simple approximation for smoothness would require more complex checking adjacent cells, 
                                // but we can use rounded-lg on path cells to make them look like stones/path)

                                return (
                                    <div
                                        key={`${x}-${y}`}
                                        className={`
                                            relative w-full h-full flex items-center justify-center
                                            ${isWall ? '' : 'bg-white rounded-md scale-110 z-0 shadow-sm'} 
                                            transition-all duration-300
                                        `}
                                    >
                                        {/* Wall Decoration */}
                                        {isWall && <WallDecoration index={x * y + x + y} />}

                                        {/* House / End Goal */}
                                        {isEnd && (
                                            <span className="text-2xl md:text-3xl drop-shadow-md filter transition-all animate-bounce relative z-10">
                                                🏠
                                            </span>
                                        )}

                                        {/* Santa / Player */}
                                        {isSanta && (
                                            <div className="absolute inset-0 flex items-center justify-center z-20 transition-all duration-100 ease-out">
                                                <span className="text-2xl md:text-3xl drop-shadow-lg filter transform -translate-y-1">🎅</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ))}
                    </div>

                    {/* Win Overlay */}
                    {won && (
                        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-[2rem] animate-fadeIn text-white">
                            <div className="bg-white p-6 rounded-3xl shadow-2xl text-center border-4 border-yellow-400 transform scale-110">
                                <Trophy size={48} className="text-yellow-400 mx-auto mb-2 animate-bounce" />
                                <h3 className="text-3xl font-bold mb-2 text-green-600">You Did It!</h3>
                                <p className="text-gray-500 mb-6 font-mono">Moves: {moves}</p>
                                <button
                                    onClick={generateMaze}
                                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all shadow-[0_4px_14px_0_rgba(74,222,128,0.39)] hover:shadow-[0_6px_20px_rgba(74,222,128,0.23)] hover:-translate-y-1 flex items-center gap-2 mx-auto"
                                >
                                    <RefreshCcw size={20} /> Play Again
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* CONTROLS */}
                <div className="flex flex-col items-center gap-6 z-10">

                    {/* Stats */}
                    <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-4 shadow-md text-green-800">
                        <div className="text-center">
                            <span className="block text-xs font-bold uppercase text-green-600/60">Moves</span>
                            <span className="text-2xl font-bold font-mono">{moves}</span>
                        </div>
                        <button
                            onClick={generateMaze}
                            className="p-2 bg-green-100 hover:bg-green-200 rounded-xl text-green-600 transition-colors"
                            title="New Game"
                        >
                            <RefreshCcw size={20} />
                        </button>
                    </div>

                    {/* D-Pad */}
                    <div className="grid grid-cols-3 gap-2 p-4 bg-white/40 rounded-full shadow-lg border border-white/20">
                        <div className="col-start-2">
                            <button
                                onClick={() => moveSanta(0, -1)}
                                className="w-14 h-14 bg-white hover:bg-green-50 rounded-2xl shadow-[0_4px_0_rgb(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center text-green-600"
                            >
                                <ArrowUp size={28} />
                            </button>
                        </div>
                        <div className="col-start-1 row-start-2">
                            <button
                                onClick={() => moveSanta(-1, 0)}
                                className="w-14 h-14 bg-white hover:bg-green-50 rounded-2xl shadow-[0_4px_0_rgb(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center text-green-600"
                            >
                                <ArrowLeft size={28} />
                            </button>
                        </div>
                        <div className="col-start-2 row-start-2">
                            <button
                                onClick={() => moveSanta(0, 1)}
                                className="w-14 h-14 bg-white hover:bg-green-50 rounded-2xl shadow-[0_4px_0_rgb(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center text-green-600"
                            >
                                <ArrowDown size={28} />
                            </button>
                        </div>
                        <div className="col-start-3 row-start-2">
                            <button
                                onClick={() => moveSanta(1, 0)}
                                className="w-14 h-14 bg-white hover:bg-green-50 rounded-2xl shadow-[0_4px_0_rgb(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center text-green-600"
                            >
                                <ArrowRight size={28} />
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-green-800/60 italic font-medium tracking-wide bg-white/40 px-3 py-1 rounded-full">
                        Use arrow keys or touch
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SantaMaze;
