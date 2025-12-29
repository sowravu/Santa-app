import React, { useState } from 'react';

interface Props {
    initialBudget: number;
    onNext: (budget: number) => void;
    onBack: () => void;
}

const BudgetInput: React.FC<Props> = ({ initialBudget, onNext, onBack }) => {
    const [budget, setBudget] = useState(initialBudget > 0 ? initialBudget.toString() : '');

    return (
        <div className="w-full max-w-md mx-auto animate-fadeIn text-center">
            <h2 className="text-3xl mb-4 text-yellow-300 drop-shadow-md font-heading">
                Set Santa's Budget 💰
            </h2>
            <p className="text-white/80 mb-8">How much can Santa spend for this child?</p>

            <div className="relative max-w-xs mx-auto mb-8">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-bold">₹</span>
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="input-field pl-10 text-center text-2xl font-bold text-green-800"
                    placeholder="2000"
                    autoFocus
                />
            </div>

            <div className="flex justify-between mt-6">
                <button onClick={onBack} className="text-white/80 hover:text-white underline">
                    Back
                </button>
                <button
                    onClick={() => onNext(parseInt(budget) || 0)}
                    disabled={!budget}
                    className="btn-primary disabled:opacity-50"
                >
                    Find Gifts! 🎁
                </button>
            </div>
        </div>
    );
};

export default BudgetInput;
