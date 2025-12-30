import React from 'react';
import { Gift, Brain, Sparkles, TreePine, Candy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GameHub: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 relative">
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 hidden md:block opacity-10 transform -rotate-12 pointer-events-none">
                <TreePine size={140} className="text-forest-green dark:text-green-400" />
            </div>
            <div className="absolute top-0 right-0 hidden md:block opacity-10 transform rotate-12 pointer-events-none">
                <Candy size={120} className="text-santa-red dark:text-red-400" />
            </div>

            <div className="text-center mb-12 relative z-10">
                <div className="inline-flex items-center justify-center gap-3 mb-4">
                    <Sparkles className="text-yellow-400 animate-pulse" size={32} />
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-santa-red dark:text-red-400 drop-shadow-sm">
                        Santa's Game Room
                    </h1>
                    <Sparkles className="text-yellow-400 animate-pulse" size={32} />
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-body bg-white/50 dark:bg-black/20 p-4 rounded-xl backdrop-blur-sm">
                    Play fun holiday games to earn <span className="text-yellow-600 dark:text-yellow-400 font-bold">Magic Points</span>!
                    Spend them in the shop for special gifts. 🎁
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Memory Match Card */}
                <div className="glass-card hover:scale-[1.02] transition-transform duration-300 cursor-pointer flex flex-col items-center text-center group" onClick={() => navigate('/games/memory')}>
                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                        <Brain size={48} className="text-forest-green dark:text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100 font-heading">Memory Match</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 font-body">
                        Test your memory by matching holiday pairs! Find all the matches to earn <span className="font-bold text-yellow-600 dark:text-yellow-400">100 points</span>.
                    </p>
                    <button className="bg-forest-green hover:bg-green-800 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg dark:bg-green-700 dark:hover:bg-green-600 transition-colors">
                        Play Now
                    </button>
                </div>

                {/* Gift Catcher Card */}
                <div className="glass-card hover:scale-[1.02] transition-transform duration-300 cursor-pointer flex flex-col items-center text-center group" onClick={() => navigate('/games/catcher')}>
                    <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 group-hover:-rotate-12 transition-transform duration-500">
                        <Gift size={48} className="text-santa-red dark:text-red-400" />
                    </div>
                    <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100 font-heading">Gift Catcher</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 font-body">
                        Catch the falling presents before time runs out! Click fast to earn <span className="font-bold text-yellow-600 dark:text-yellow-400">points for every gift</span>.
                    </p>
                    <button className="bg-santa-red hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg dark:bg-red-600 dark:hover:bg-red-500 transition-colors">
                        Play Now
                    </button>
                </div>

                {/* Snowball Fight Card */}
                <div className="glass-card hover:scale-[1.02] transition-transform duration-300 cursor-pointer flex flex-col items-center text-center group" onClick={() => navigate('/games/snowball')}>
                    <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                        <span className="text-4xl">☃️</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100 font-heading">Snowball Fight</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 font-body">
                        Whack the popping elves with snowballs! Hit as many as you can to earn <span className="font-bold text-yellow-600 dark:text-yellow-400">big points</span>.
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-colors">
                        Play Now
                    </button>
                </div>

                {/* Santa Trivia Card */}
                <div className="glass-card hover:scale-[1.02] transition-transform duration-300 cursor-pointer flex flex-col items-center text-center group" onClick={() => navigate('/games/trivia')}>
                    <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6 group-hover:-rotate-12 transition-transform duration-500">
                        <span className="text-4xl">❓</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100 font-heading">Holiday Trivia</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 font-body">
                        Test your Christmas knowledge! Answer correctly to win <span className="font-bold text-yellow-600 dark:text-yellow-400">points per question</span>.
                    </p>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-colors">
                        Play Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameHub;
