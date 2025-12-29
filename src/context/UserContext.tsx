import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
    users: string[];
    currentUser: string | null;
    login: (username: string) => void;
    logout: () => void;
    addUser: (username: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('santa_users');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const [currentUser, setCurrentUser] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('santa_current_user');
        }
        return null;
    });

    useEffect(() => {
        localStorage.setItem('santa_users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('santa_current_user', currentUser);
        } else {
            localStorage.removeItem('santa_current_user');
        }
    }, [currentUser]);

    const login = (username: string) => {
        setCurrentUser(username);
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const addUser = (username: string) => {
        if (username && !users.includes(username)) {
            setUsers(prev => [...prev, username]);
        }
    };

    return (
        <UserContext.Provider value={{ users, currentUser, login, logout, addUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
