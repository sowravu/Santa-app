import React, { useState } from 'react';
import type { WishListItem } from '../types';

import { Gift, Plus, Trash2 } from 'lucide-react';

interface Props {
    initialData: WishListItem[];
    onNext: (data: WishListItem[]) => void;
    onBack: () => void;
}

const WishList: React.FC<Props> = ({ initialData, onNext, onBack }) => {
    const [wishes, setWishes] = useState<WishListItem[]>(initialData);
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const handleAddWish = () => {
        if (newName && newPrice) {
            const newWish: WishListItem = {
                id: Date.now().toString(),
                name: newName,
                estimatedPrice: parseFloat(newPrice)
            };
            setWishes([...wishes, newWish]);
            setNewName('');
            setNewPrice('');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto animate-fadeIn">
            <h2 className="text-3xl text-center mb-2 text-yellow-300 drop-shadow-md font-heading">
                What does the child want? 🎁
            </h2>
            <p className="text-center text-white/80 mb-6 text-sm">Add items to the wishlist</p>

            <div className="bg-white/10 p-4 rounded-xl border border-white/20 mb-6">
                <div className="grid grid-cols-1 gap-3">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="input-field"
                        placeholder="Item name (e.g. Cycle)"
                    />
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            className="input-field"
                            placeholder="Price (₹)"
                        />
                        <button
                            onClick={handleAddWish}
                            className="bg-green-600 text-white rounded-lg px-4 hover:bg-green-700 transition flex items-center gap-2"
                        >
                            <Plus size={20} /> Add
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-2 mb-8 max-h-60 overflow-y-auto custom-scrollbar">
                {wishes.length === 0 && (
                    <div className="text-center text-white/50 py-4 italic">
                        No wishes added yet...
                    </div>
                )}
                {wishes.map((wish) => (
                    <div key={wish.id} className="bg-white/90 text-gray-800 p-3 rounded-lg flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3">
                            <Gift size={18} className="text-red-500" />
                            <div>
                                <p className="font-semibold">{wish.name}</p>
                                <p className="text-xs text-gray-500">₹{wish.estimatedPrice}</p>
                            </div>
                        </div>
                        <button onClick={() => setWishes(wishes.filter(w => w.id !== wish.id))} className="text-red-400 hover:text-red-600">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-6">
                <button onClick={onBack} className="text-white/80 hover:text-white underline">
                    Back
                </button>
                <button
                    onClick={() => onNext(wishes)}
                    className="btn-primary"
                >
                    Next Step ➡
                </button>
            </div>
        </div>
    );
};

export default WishList;
