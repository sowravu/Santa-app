import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';

interface PointsContextType {
    points: number;
    addPoints: (amount: number) => void;
    subtractPoints: (amount: number) => void;
    inventory: string[];
    addToInventory: (itemId: string) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useUser();
    const [points, setPoints] = useState<number>(0);
    const [inventory, setInventory] = useState<string[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load data when user changes
    useEffect(() => {
        if (currentUser) {
            const savedPoints = localStorage.getItem(`santa_points_${currentUser}`);
            const savedInventory = localStorage.getItem(`santa_inventory_${currentUser}`);

            setPoints(savedPoints ? parseInt(savedPoints, 10) : 0);
            setInventory(savedInventory ? JSON.parse(savedInventory) : []);
            setIsInitialized(true);
        } else {
            setPoints(0);
            setInventory([]);
            setIsInitialized(false);
        }
    }, [currentUser]);

    // Save data when it changes (only if initialized and user exists)
    useEffect(() => {
        if (currentUser && isInitialized) {
            localStorage.setItem(`santa_points_${currentUser}`, points.toString());
        }
    }, [points, currentUser, isInitialized]);

    useEffect(() => {
        if (currentUser && isInitialized) {
            localStorage.setItem(`santa_inventory_${currentUser}`, JSON.stringify(inventory));
        }
    }, [inventory, currentUser, isInitialized]);

    const addPoints = (amount: number) => {
        setPoints(prev => prev + amount);
    };

    const subtractPoints = (amount: number) => {
        setPoints(prev => Math.max(0, prev - amount));
    };

    const addToInventory = (itemId: string) => {
        if (!inventory.includes(itemId)) {
            setInventory(prev => [...prev, itemId]);
        }
    };

    return (
        <PointsContext.Provider value={{ points, addPoints, subtractPoints, inventory, addToInventory }}>
            {children}
        </PointsContext.Provider>
    );
};

export const usePoints = () => {
    const context = useContext(PointsContext);
    if (context === undefined) {
        throw new Error('usePoints must be used within a PointsProvider');
    }
    return context;
};
