import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface Props {
    initialScore: number;
    childName: string;
    onNext: (score: number) => void;
    onBack: () => void;
}

const BehaviorRating: React.FC<Props> = ({ initialScore, childName, onNext, onBack }) => {
    const [score, setScore] = useState(initialScore);

    return (
        <div className="w-full max-w-md mx-auto animate-fadeIn text-center">
            <h2 className="text-3xl mb-4 text-yellow-300 drop-shadow-md font-heading">
                How was {childName || 'the child'} this year?
            </h2>

            <div className="flex justify-center gap-2 mb-8 my-10">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => setScore(star)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                    >
                        <Star
                            size={48}
                            fill={star <= score ? "#F1D570" : "none"}
                            stroke={star <= score ? "#F1D570" : "rgba(255,255,255,0.5)"}
                            className="drop-shadow-lg"
                        />
                    </button>
                ))}
            </div>

            <div className="bg-white/10 p-4 rounded-xl border border-white/20 mb-8 backdrop-blur-sm">
                <p className="text-xl font-heading">
                    {score === 5 && "😇 Absolute Angel!"}
                    {score === 4 && "😊 Very Good!"}
                    {score === 3 && "🙂 Good"}
                    {score === 2 && "😐 Naughty"}
                    {score === 1 && "😈 Very Naughty!"}
                </p>
            </div>

            <div className="flex justify-between mt-6">
                <button onClick={onBack} className="text-white/80 hover:text-white underline">
                    Back
                </button>
                <button
                    onClick={() => onNext(score)}
                    className="btn-primary"
                >
                    Next Step ➡
                </button>
            </div>
        </div>
    );
};

export default BehaviorRating;
