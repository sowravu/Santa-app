import React, { useEffect } from 'react';
import type { AppState } from '../types';

import { calculateSuggestions, getBehaviorMessage } from '../utils/santaLogic';
import confetti from 'canvas-confetti';
import { Share2, RotateCcw, Gift as GiftIcon } from 'lucide-react';


interface Props {
    state: AppState;
    onReset: () => void;
}

const GiftResults: React.FC<Props> = ({ state, onReset }) => {
    const suggestions = calculateSuggestions(state);
    const totalCost = suggestions.reduce((sum, g) => sum + g.price, 0);
    const savings = state.budget - totalCost;
    const message = getBehaviorMessage(state.behaviorScore, state.childProfile.name);

    useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D42426', '#2F5233', '#F1D570', '#FFFFFF']
        });
    }, []);

    return (
        <div className="w-full max-w-md mx-auto animate-fadeIn pb-10">
            <div className="text-center mb-6">
                <div className="inline-block bg-white/20 p-4 rounded-full mb-4 border border-white/30 backdrop-blur-md">
                    <span className="text-4xl filter drop-shadow-lg">🎅</span>
                </div>
                <h2 className="text-3xl text-yellow-300 font-heading drop-shadow-md">Santa's Gift Plan</h2>
                <p className="text-white/90 mt-2 font-medium">{message}</p>
            </div>

            <div className="bg-white/90 text-gray-800 rounded-2xl shadow-2xl overflow-hidden mb-6">
                <div className="bg-red-600 p-4 text-white text-center">
                    <h3 className="text-xl font-heading">Gift Box for {state.childProfile.name}</h3>
                </div>
                <div className="p-4 space-y-3">
                    {suggestions.length === 0 ? (
                        <p className="text-center py-6 text-gray-500">
                            Oh no! Santa couldn't find gifts within this budget.
                            <br />Try increasing the budget? 🥺
                        </p>
                    ) : (
                        suggestions.map((gift, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-50 p-2 rounded-lg text-red-600">
                                        <GiftIcon size={20} />
                                    </div>

                                    <div>
                                        <p className="font-bold text-gray-800">{gift.name}</p>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                                            {gift.isSuggested ? 'Santa Choice ✨' : 'From Wishlist ✅'}
                                        </span>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-700">₹{gift.price}</span>
                            </div>
                        ))
                    )}
                </div>

                {suggestions.length > 0 && (
                    <div className="bg-gray-50 p-4 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-500">Total Budget</span>
                            <span className="text-gray-500">₹{state.budget}</span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-500">Total Cost</span>
                            <span className="font-bold text-red-600">- ₹{totalCost}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                            <span className="font-bold text-green-700">Savings</span>
                            <span className="font-bold text-green-700 text-xl">₹{savings}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={onReset}
                    className="bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl backdrop-blur-md transition flex justify-center items-center gap-2 font-medium"
                >
                    <RotateCcw size={18} /> Start Over
                </button>
                <button
                    className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl shadow-lg transition flex justify-center items-center gap-2 font-medium"
                    onClick={() => alert('Sharing feature coming soon! 🎄')}
                >
                    <Share2 size={18} /> Share Plan
                </button>
            </div>
        </div>
    );
};

export default GiftResults;
