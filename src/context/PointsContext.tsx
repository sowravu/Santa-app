import React, { createContext, useContext, useState, useEffect } from 'react';

interface ShopItem {
    id: string;
    name: string;
    cost: number;
    image: string;
}

interface PointsContextType {
    points: number;
    addPoints: (amount: number) => void;
    subtractPoints: (amount: number) => void;
    inventory: string[];
    addToInventory: (itemId: string) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [points, setPoints] = useState<number>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('santa_points');
            return saved ? parseInt(saved, 10) : 0;
        }
        return 0;
    });

    const [inventory, setInventory] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('santa_inventory');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('santa_points', points.toString());
    }, [points]);

    useEffect(() => {
        localStorage.setItem('santa_inventory', JSON.stringify(inventory));
    }, [inventory]);

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
