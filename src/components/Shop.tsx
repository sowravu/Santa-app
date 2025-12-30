import React from 'react';
import { usePoints } from '../context/PointsContext';
import { useUser } from '../context/UserContext';
import { ShoppingBag, Lock, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const ITEMS = [
    { id: 'hat', name: "Santa's Hat", cost: 50, icon: "🎅" },
    { id: 'tree', name: "Magic Tree", cost: 150, icon: "🎄" },
    { id: 'sleigh', name: "Golden Sleigh", cost: 300, icon: "🛷" },
    { id: 'elf', name: "Elf Helper", cost: 500, icon: "🧝" },
    { id: 'reindeer', name: "Rudolph", cost: 1000, icon: "🦌" },
    { id: 'star', name: "North Star", cost: 2000, icon: "🌟" },
];

const Shop: React.FC = () => {
    const { points, subtractPoints, inventory, addToInventory } = usePoints();
    const { currentUser } = useUser();
    const [showCongrats, setShowCongrats] = React.useState(false);

    React.useEffect(() => {
        if (inventory.length > 0 && inventory.length === ITEMS.length) {
            setShowCongrats(true);
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 }
            });
        }
    }, [inventory]);

    const handleBuy = (item: typeof ITEMS[0]) => {
        if (points >= item.cost && !inventory.includes(item.id)) {
            subtractPoints(item.cost);
            addToInventory(item.id);
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 }
            });
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-heading text-santa-red dark:text-red-400 mb-4">Santa's Workshop Store</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    You have <span className="font-bold text-yellow-600 dark:text-yellow-400">{points} Magic Points</span> to spend!
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {ITEMS.map(item => {
                    const isOwned = inventory.includes(item.id);
                    const canAfford = points >= item.cost;

                    return (
                        <div key={item.id} className="glass-card relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-green-500"></div>

                            <div className="flex flex-col items-center">
                                <div className="text-8xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                                    {item.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{item.name}</h3>

                                <div className="flex items-center gap-2 mb-6 text-yellow-600 dark:text-yellow-400 font-bold text-lg">
                                    {isOwned ? (
                                        <span className="text-green-600 dark:text-green-400 flex items-center gap-2">
                                            <Check size={20} /> Collected
                                        </span>
                                    ) : (
                                        <span>{item.cost} Points</span>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleBuy(item)}
                                    disabled={isOwned || !canAfford}
                                    className={`
                                        w-full py-3 rounded-xl font-bold text-lg shadow-md transition-all flex items-center justify-center gap-2
                                        ${isOwned
                                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-default'
                                            : canAfford
                                                ? 'bg-[#D42426] hover:bg-red-700 text-white transform active:scale-95'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed opacity-70'}
                                    `}
                                >
                                    {isOwned ? (
                                        'Owned'
                                    ) : canAfford ? (
                                        <>Buy Item <ShoppingBag size={20} /></>
                                    ) : (
                                        <>Need {item.cost - points} more <Lock size={18} /></>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-16 p-8 bg-green-50 dark:bg-green-900/20 rounded-3xl text-center">
                <h2 className="text-2xl font-bold text-forest-green dark:text-green-400 mb-4">Your Collection</h2>
                {inventory.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 italic">Your sleigh is empty! Play games to earn points.</p>
                ) : (
                    <div className="flex flex-wrap justify-center gap-4">
                        {ITEMS.filter(i => inventory.includes(i.id)).map(item => (
                            <div key={item.id} className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-4xl shadow-md border-2 border-yellow-200 dark:border-yellow-700/50" title={item.name}>
                                {item.icon}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Congratulation Modal */}
            {showCongrats && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-lg w-full text-center shadow-2xl border-4 border-yellow-400 transform scale-100 animate-bounce-in relative">
                        <button
                            onClick={() => setShowCongrats(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            ✕
                        </button>
                        <div className="text-6xl mb-6">🎅🎁🎉</div>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-santa-red dark:text-red-400 mb-4">
                            Congratulations {currentUser}!
                        </h2>
                        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 font-body leading-relaxed">
                            You've collected everything in the shop!
                            <br />
                            <span className="font-bold text-green-600 dark:text-green-400 block mt-2 text-2xl">
                                Santa is coming for you with the gifts! 🛷🦌
                            </span>
                        </p>
                        <button
                            onClick={() => setShowCongrats(false)}
                            className="bg-forest-green hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-transform hover:scale-105"
                        >
                            Yay! Thank you Santa!
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Shop;
