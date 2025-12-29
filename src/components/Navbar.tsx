import React from 'react';
import { Snowflake, Moon, Sun, ShoppingBag, Gamepad2, Coins } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext';
import { usePoints } from '../context/PointsContext';

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { points } = usePoints();

    return (
        <div className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none">
            <nav className="pointer-events-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/40 dark:border-gray-700 shadow-xl rounded-full pl-6 pr-6 py-3 flex items-center gap-6 relative transition-colors duration-300">

                {/* Left Animated Ornament */}
                <div className="absolute -left-6 top-8 animate-swing" style={{ animationDelay: '0s' }}>
                    <div className="w-[2px] h-12 bg-red-300 mx-auto"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-md flex items-center justify-center border border-red-400">
                        <div className="w-2 h-2 bg-white/40 rounded-full absolute top-1 right-2"></div>
                    </div>
                </div>

                {/* Right Animated Ornament */}
                <div className="absolute -right-6 top-6 animate-swing" style={{ animationDelay: '1.5s' }}>
                    <div className="w-[2px] h-10 bg-yellow-300 mx-auto"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-md flex items-center justify-center border border-yellow-300">
                        <div className="w-2 h-2 bg-white/40 rounded-full absolute top-1 right-2"></div>
                    </div>
                </div>

                {/* Logo Link to Home */}
                <div className="flex items-center gap-3 pr-4 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <NavLink to="/" className="flex items-center gap-3 group">
                        <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-full text-white shadow-sm group-hover:rotate-180 transition-transform duration-700">
                            <Snowflake size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100 hidden md:block transition-colors duration-300">
                            SantaGift
                        </span>
                    </NavLink>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-1">
                    <NavLink to="/games"
                        className={({ isActive }) => `p-2 rounded-full transition-all duration-300 ${isActive ? 'bg-green-100 text-forest-green' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        title="Games"
                    >
                        <Gamepad2 size={24} />
                    </NavLink>

                    <NavLink to="/shop"
                        className={({ isActive }) => `p-2 rounded-full transition-all duration-300 ${isActive ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        title="Shop"
                    >
                        <ShoppingBag size={24} />
                    </NavLink>
                </div>

                {/* Points Badge */}
                <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1.5 rounded-full border border-yellow-200 dark:border-yellow-700/50">
                    <Coins size={16} className="text-yellow-600 dark:text-yellow-500" />
                    <span className="font-bold text-yellow-700 dark:text-yellow-400 text-sm">{points}</span>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-yellow-400 transition-colors duration-300"
                    aria-label="Toggle Theme"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

            </nav>
        </div>
    );
};

export default Navbar;
