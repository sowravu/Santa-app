import React from 'react';
import { Gift, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GameHub: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 font-heading text-santa-red dark:text-red-400">
                Santa's Game Room
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-12 max-w-2xl mx-auto font-body">
                Play games to earn magic points! Spend your points in Santa's Shop to collect special holiday items.
            </p>

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
                    <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 group-hover: -rotate-12 transition-transform duration-500">
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
            </div>
        </div>
    );
};

export default GameHub;
