import React from 'react';
import { Gift, Star, Moon } from 'lucide-react';

interface Props {
    onStart: () => void;
}

const HomePage: React.FC<Props> = ({ onStart }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-6 md:pt-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-16 animate-fadeIn h-full">

            {/* Left Content */}
            <div className="flex-1 text-left z-20">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-santa-red leading-[1.1] font-heading">
                    Make this <br />
                    <span className="text-gray-900">Christmas</span> <br />
                    Magical!
                </h1>

                <p className="text-lg md:text-xl text-gray-500 mb-8 leading-relaxed max-w-lg font-body">
                    Welcome to Santa's secret planning tool. <br />
                    Plan the perfect gifts for your loved ones based on budget, behavior, and magic.
                </p>

                <button
                    onClick={onStart}
                    className="bg-[#D42426] text-white py-3 px-8 rounded-xl text-xl font-bold shadow-lg hover:bg-red-700 hover:-translate-y-1 transition-all duration-200 inline-flex items-center gap-3 z-50 cursor-pointer"
                >
                    Let's Explore
                    <Gift size={24} />
                </button>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center md:justify-end z-10 w-full h-full relative">
                <div className="relative w-full h-full flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                    <img
                        src="/final-santa.png"
                        alt="Santa and Friends"
                        className="object-contain max-h-[85vh] w-auto drop-shadow-2xl mix-blend-lighten relative z-10"
                    />

                    {/* Decorative Elements - Natural Sky Layout */}

                    {/* Moon - Top Right Sky Position */}
                    <div className="absolute top-0 -right-12 md:right-0 text-gray-400 animate-float hover:scale-110 transition-transform duration-500 cursor-pointer z-20">
                        <Moon size={56} fill="#D1D5DB" className="drop-shadow-lg -rotate-12 opacity-90" />
                    </div>

                    {/* Scattered Stars - Sky Effect */}

                    {/* Top Left Area */}
                    <div className="absolute top-4 left-4 text-[#FFD700] animate-twinkle hover:scale-125 transition-transform duration-300" style={{ animationDelay: '0.2s' }}>
                        <Star size={32} fill="#FFD700" className="opacity-90 drop-shadow-md" />
                    </div>
                    <div className="absolute top-20 left-16 text-[#FFA500] animate-twinkle hover:scale-125 transition-transform duration-300" style={{ animationDelay: '0.9s' }}>
                        <Star size={24} fill="#FFA500" className="drop-shadow-md rotate-45" />
                    </div>

                    {/* Top Center-ish Areas */}
                    <div className="absolute top-2 left-1/3 text-[#87CEEB] animate-twinkle hover:scale-125 transition-transform duration-300" style={{ animationDelay: '1.5s' }}>
                        <Star size={20} fill="#87CEEB" className="drop-shadow-md" />
                    </div>
                    <div className="absolute top-12 right-1/3 text-[#32CD32] animate-twinkle hover:scale-125 transition-transform duration-300" style={{ animationDelay: '0.5s' }}>
                        <Star size={28} fill="#32CD32" className="drop-shadow-md -rotate-12" />
                    </div>

                    {/* Near the Moon (Top Right) */}
                    <div className="absolute top-24 right-10 text-[#EE82EE] animate-float hover:scale-125 transition-transform duration-300" style={{ animationDelay: '0.7s' }}>
                        <Star size={36} fill="#EE82EE" className="drop-shadow-lg rotate-12" />
                    </div>

                    {/* Lower Mid-Range Stars */}
                    <div className="absolute top-40 -left-6 text-[#FF4500] animate-twinkle hover:scale-125 transition-transform duration-300" style={{ animationDelay: '2.1s' }}>
                        <Star size={40} fill="#FF4500" className="drop-shadow-[0_0_8px_rgba(255,69,0,0.6)] -rotate-12" />
                    </div>
                    <div className="absolute top-1/2 right-0 text-[#D42426] animate-twinkle hover:scale-125 transition-transform duration-300" style={{ animationDelay: '1.2s' }}>
                        <Star size={26} fill="#D42426" className="drop-shadow-[0_0_8px_rgba(212,36,38,0.6)]" />
                    </div>

                    {/* Gifts at the base (Retained) */}
                    <div className="absolute bottom-20 -left-6 text-[#D42426] animate-bounce hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ animationDuration: '3s' }}>
                        <Gift size={36} className="-rotate-6 drop-shadow-md" />
                    </div>
                    <div className="absolute bottom-20 -right-6 text-[#FFD700] animate-bounce hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ animationDuration: '3.5s' }}>
                        <Gift size={36} className="rotate-6 drop-shadow-md" />
                    </div>

                    {/* Floating Particles (Sparkles) */}
                    <div className="absolute top-10 left-1/2 w-2 h-2 bg-white rounded-full blur-[1px] animate-ping" />
                    <div className="absolute top-32 right-1/4 w-3 h-3 bg-[#FF4500] rounded-full blur-[2px] animate-pulse" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
