import React from 'react';
import { Moon, Sun, ShoppingBag, Gamepad2, Coins, LogOut, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext';
import { usePoints } from '../context/PointsContext';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { points } = usePoints();
    const { currentUser, logout } = useUser();

    return (
        <div className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none">
            <nav className="pointer-events-auto bg-transparent backdrop-blur-xl border border-white/10 dark:border-gray-700/20 shadow-xl rounded-full px-10 py-1 flex items-center gap-6 relative transition-colors duration-300">

                {/* Left Animated Ornament */}
                <div className="absolute -left-6 top-6 animate-swing z-0" style={{ animationDelay: '0s' }}>
                    <div className="w-[2px] h-12 bg-red-300 mx-auto opacity-80"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-md flex items-center justify-center border border-red-400 relative overflow-hidden">
                        <div className="w-2 h-2 bg-white/40 rounded-full absolute top-1 right-2"></div>
                        <Sparkles size={12} className="text-white absolute bottom-1 left-1 animate-pulse opacity-80" />
                    </div>
                </div>

                {/* Right Animated Ornament */}
                <div className="absolute -right-6 top-6 animate-swing z-0" style={{ animationDelay: '1.5s' }}>
                    <div className="w-[2px] h-10 bg-yellow-300 mx-auto opacity-80"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-md flex items-center justify-center border border-yellow-300 relative overflow-hidden">
                        <div className="w-2 h-2 bg-white/40 rounded-full absolute top-1 right-2"></div>
                        <Sparkles size={12} className="text-white absolute bottom-1 left-1 animate-pulse opacity-80" />
                    </div>
                </div>

                <div className="flex items-center gap-4 pr-6 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <NavLink to="/" className="flex items-center gap-2 group">
                        <div className="relative w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <img
                                src={theme === 'light' ? '/santa-hat-light.png' : '/santa-hat-dark.png'}
                                alt="Santa Hat Logo"
                                className={`w-full h-full object-contain drop-shadow-md animate-float ${theme === 'light' ? 'mix-blend-multiply' : 'mix-blend-screen'
                                    }`}
                                style={{ animationDuration: '3s' }}
                            />
                        </div>
                        <span
                            className="text-lg font-bold tracking-tight hidden md:block transition-colors duration-300 font-heading dark:text-gray-100"
                            style={{ color: theme === 'light' ? '#000000' : '' }}
                        >
                            SantaGift
                        </span>
                    </NavLink>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-1">
                    <NavLink to="/games"
                        className={({ isActive }) => `p-2 rounded-full transition-all duration-300 ${isActive ? 'bg-green-100 text-forest-green' : 'dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        style={({ isActive }) => ({ color: isActive ? '#2F5233' : (theme === 'light' ? '#000000' : '') })}
                        title="Games"
                    >
                        <Gamepad2 size={24} />
                    </NavLink>

                    <NavLink to="/shop"
                        className={({ isActive }) => `p-2 rounded-full transition-all duration-300 ${isActive ? 'bg-yellow-100 text-yellow-700' : 'dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        style={({ isActive }) => ({ color: !isActive && theme === 'light' ? '#000000' : '' })}
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

                {/* User Info */}
                {currentUser && (
                    <div className="flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-gray-700">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                            {currentUser.charAt(0).toUpperCase()}
                        </div>
                        <button
                            onClick={logout}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-500 transition-colors"
                            style={{ color: theme === 'light' ? '#000000' : '#9CA3AF' }}
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                )}

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-yellow-400 transition-colors duration-300"
                    style={{ color: theme === 'light' ? '#000000' : '' }}
                    aria-label="Toggle Theme"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

            </nav>
        </div>
    );
};

export default Navbar;
