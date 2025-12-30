import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { usePoints } from '../../context/PointsContext';
import confetti from 'canvas-confetti';

const QUESTIONS = [
    {
        question: "What is the name of Santa's most famous reindeer?",
        options: ["Dasher", "Rudolph", "Comet", "Vixen"],
        answer: 1 // Index of correct answer
    },
    {
        question: "Which country started the tradition of putting up a Christmas tree?",
        options: ["Germany", "United States", "France", "England"],
        answer: 0
    },
    {
        question: "What treat do children traditionally leave for Santa?",
        options: ["Pizza", "Carrots", "Cookies and Milk", "Hot Cocoa"],
        answer: 2
    },
    {
        question: "What color is Santa's suit?",
        options: ["Blue", "Green", "Red", "Yellow"],
        answer: 2
    },
    {
        question: "How many reindeer usually pull Santa's sleigh (counting Rudolph)?",
        options: ["8", "9", "10", "12"],
        answer: 1
    }
];

const SantaTrivia: React.FC = () => {
    const { addPoints } = usePoints();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswerClick = (optionIndex: number) => {
        if (isAnswered) return;

        setSelectedOption(optionIndex);
        setIsAnswered(true);

        if (optionIndex === QUESTIONS[currentQuestion].answer) {
            setScore(score + 1);
            // Instant feedback visual logic handled by render
        }

        // Wait a moment before next question
        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < QUESTIONS.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedOption(null);
                setIsAnswered(false);
            } else {
                setShowScore(true);
                finishGame(score + (optionIndex === QUESTIONS[currentQuestion].answer ? 1 : 0));
            }
        }, 1500);
    };

    const finishGame = (finalScore: number) => {
        const pointsEarned = finalScore * 20; // 20 points per correct answer
        addPoints(pointsEarned);
        if (finalScore > QUESTIONS.length / 2) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    const resetGame = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
        setIsAnswered(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold font-heading text-santa-red dark:text-red-400 mb-8">Holiday Trivia</h1>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-200 dark:border-gray-700">
                {showScore ? (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Quiz Completed!</h2>
                        <div className="text-6xl font-bold text-santa-red dark:text-red-400 mb-6">
                            {score} / {QUESTIONS.length}
                        </div>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            You earned <span className="font-bold text-yellow-600 dark:text-yellow-400">{score * 20} Points</span>!
                        </p>
                        <button
                            onClick={resetGame}
                            className="btn-primary text-xl px-8 py-3"
                        >
                            Play Again
                        </button>
                    </div>
                ) : (
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-500 dark:text-gray-400 font-bold">
                                Question {currentQuestion + 1}/{QUESTIONS.length}
                            </span>
                            <span className="text-santa-red dark:text-red-400 font-bold">
                                Score: {score}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100 font-heading leading-relaxed">
                            {QUESTIONS[currentQuestion].question}
                        </h2>

                        <div className="space-y-4">
                            {QUESTIONS[currentQuestion].options.map((option, index) => {
                                const isSelected = selectedOption === index;
                                const isCorrect = index === QUESTIONS[currentQuestion].answer;
                                const showCorrect = isAnswered && isCorrect;
                                const showWrong = isAnswered && isSelected && !isCorrect;

                                let buttonClass = "w-full p-4 rounded-xl border-2 text-left font-semibold text-lg transition-all duration-200 flex justify-between items-center ";

                                if (showCorrect) {
                                    buttonClass += "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-500 dark:text-green-300";
                                } else if (showWrong) {
                                    buttonClass += "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-500 dark:text-red-300";
                                } else if (isAnswered) {
                                    buttonClass += "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-500";
                                } else {
                                    buttonClass += "bg-white border-gray-200 hover:border-santa-red hover:bg-red-50 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:border-red-400 dark:hover:bg-gray-600";
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerClick(index)}
                                        disabled={isAnswered}
                                        className={buttonClass}
                                    >
                                        {option}
                                        {showCorrect && <CheckCircle className="text-green-600 dark:text-green-400" />}
                                        {showWrong && <XCircle className="text-red-600 dark:text-red-400" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SantaTrivia;
