import React, { useState } from 'react';
import { UserPlus, User } from 'lucide-react';
import { useUser } from '../context/UserContext';

const LoginScreen: React.FC = () => {
    const { users, login, addUser } = useUser();
    const [newUsername, setNewUsername] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (newUsername.trim()) {
            addUser(newUsername.trim());
            login(newUsername.trim());
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-[#121212] transition-colors duration-300">
            <div className="w-full max-w-md glass-card bg-white/90 dark:bg-[#1E1E1E]/90 text-center animate-fadeIn">
                <h1 className="text-4xl font-bold font-heading text-santa-red dark:text-red-400 mb-2">Who is playing?</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Select your profile to load your magic points.</p>

                {users.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {users.map(user => (
                            <button
                                key={user}
                                onClick={() => login(user)}
                                className="flex flex-col items-center p-4 rounded-xl transition-all duration-200 hover:bg-red-50 dark:hover:bg-gray-800 group border border-transparent hover:border-red-100 dark:hover:border-gray-700"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white text-2xl mb-2 shadow-md group-hover:scale-110 transition-transform">
                                    {user.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-santa-red dark:group-hover:text-red-400">{user}</span>
                            </button>
                        ))}
                    </div>
                )}

                {!isAdding ? (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center justify-center gap-2 text-santa-red dark:text-red-400 font-bold hover:underline mx-auto"
                    >
                        <UserPlus size={20} />
                        Add New Player
                    </button>
                ) : (
                    <form onSubmit={handleAddUser} className="animate-fadeIn">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="Enter your name..."
                                className="input-field"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="bg-santa-red text-white p-3 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <UserPlus size={20} />
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsAdding(false)}
                            className="text-gray-400 text-sm mt-2 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginScreen;
