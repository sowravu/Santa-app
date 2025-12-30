import React, { useState, useEffect } from 'react';
import { Gift, TreePine, Snowflake, Star, Bell, Candy, Heart, Music, ArrowLeft, ShoppingBag, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePoints } from '../../context/PointsContext';
import confetti from 'canvas-confetti';

interface Card {
    id: number;
    icon: React.ElementType;
    isFlipped: boolean;
    isMatched: boolean;
}

const ICONS = [Gift, TreePine, Snowflake, Star, Bell, Candy, Heart, Music];

const MemoryMatch: React.FC = () => {
    const { addPoints } = usePoints();
    const navigate = useNavigate();
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const gameIcons = [...ICONS, ...ICONS];
        const shuffled = gameIcons
            .sort(() => Math.random() - 0.5)
            .map((Icon, index) => ({
                id: index,
                icon: Icon,
                isFlipped: false,
                isMatched: false
            }));
        setCards(shuffled);
        setFlippedCards([]);
        setGameOver(false);
        setIsProcessing(false);
    };

    const handleCardClick = (id: number) => {
        if (isProcessing || flippedCards.includes(id) || cards[id].isMatched || cards[id].isFlipped) return;

        const newCards = [...cards];
        newCards[id].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setIsProcessing(true);
            checkForMatch(newFlipped, newCards);
        }
    };

    const checkForMatch = (flippedIds: number[], currentCards: Card[]) => {
        const [id1, id2] = flippedIds;
        const card1 = currentCards[id1];
        const card2 = currentCards[id2];

        if (card1.icon === card2.icon) {
            // Match found
            setTimeout(() => {
                const newCards = [...currentCards];
                newCards[id1].isMatched = true;
                newCards[id2].isMatched = true;
                setCards(newCards);
                setFlippedCards([]);
                setIsProcessing(false);
                checkWin(newCards);
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                const newCards = [...currentCards];
                newCards[id1].isFlipped = false;
                newCards[id2].isFlipped = false;
                setCards(newCards);
                setFlippedCards([]);
                setIsProcessing(false);
            }, 1000);
        }
    };

    const checkWin = (currentCards: Card[]) => {
        if (currentCards.every(card => card.isMatched)) {
            setGameOver(true);
            addPoints(100);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center relative">
            {/* Back Button */}
            <button
                onClick={() => navigate('/games')}
                className="absolute top-8 left-0 p-2 bg-white/50 dark:bg-black/30 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors z-20"
                title="Back to Games"
            >
                <ArrowLeft className="text-gray-700 dark:text-gray-200" size={24} />
            </button>

            <div className="flex justify-between w-full items-center mb-8 pl-12">
                <h1 className="text-3xl font-bold font-heading text-santa-red dark:text-red-400">Match the Pairs</h1>
                <button
                    onClick={initializeGame}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full font-bold shadow-md transition-colors"
                >
                    Restart
                </button>
            </div>

            {gameOver && (
                <div className="mb-8 p-6 bg-green-100 dark:bg-green-900/40 rounded-2xl text-center animate-bounce shadow-lg border border-green-200 dark:border-green-800">
                    <h2 className="text-3xl font-bold text-forest-green dark:text-green-400 mb-4">You Won! 🎉</h2>
                    <p className="text-xl text-gray-700 dark:text-gray-200 mb-6">+100 Points added to your stash!</p>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => navigate('/shop')}
                            className="flex items-center gap-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-bold transition-colors"
                        >
                            <ShoppingBag size={20} />
                            Go to Shop
                        </button>
                        <button
                            onClick={initializeGame}
                            className="bg-santa-red hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-md transition-colors"
                        >
                            Play Again
                        </button>
                    </div>
                    <button
                        onClick={() => navigate('/games')}
                        className="mt-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center justify-center gap-2 mx-auto"
                    >
                        <Gamepad2 size={18} />
                        Back to Games
                    </button>
                </div>
            )}

            <div className="grid grid-cols-4 gap-4 w-full max-w-lg aspect-square">
                {cards.map(card => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            className={`
                                relative w-full h-full cursor-pointer transition-all duration-500 transform
                                ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
                            `}
                            style={{ perspective: '1000px' }}
                        >
                            <div className={`
                                w-full h-full rounded-xl shadow-md flex items-center justify-center text-4xl transition-all duration-300
                                ${card.isFlipped || card.isMatched
                                    ? 'bg-white dark:bg-gray-800 border-2 border-santa-red dark:border-red-500'
                                    : 'bg-gradient-to-br from-red-500 to-red-600 dark:from-red-700 dark:to-red-800'}
                            `}>
                                {(card.isFlipped || card.isMatched) ? (
                                    <Icon size={40} className="text-santa-red dark:text-red-400 animate-fadeIn" />
                                ) : (
                                    <Snowflake size={32} className="text-white/30" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MemoryMatch;
