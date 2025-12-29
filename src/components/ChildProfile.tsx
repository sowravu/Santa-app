import React, { useState } from 'react';
import type { ChildProfile } from '../types';
import { User, Sparkles } from 'lucide-react';


interface Props {
    initialData: ChildProfile;
    onNext: (data: ChildProfile) => void;
}

const ChildProfileForm: React.FC<Props> = ({ initialData, onNext }) => {
    const [data, setData] = useState(initialData);
    const [currentInterest, setCurrentInterest] = useState('');

    const handleAddInterest = () => {
        if (currentInterest.trim()) {
            setData({ ...data, interests: [...data.interests, currentInterest.trim()] });
            setCurrentInterest('');
        }
    };

    const handleRemoveInterest = (index: number) => {
        const newInterests = [...data.interests];
        newInterests.splice(index, 1);
        setData({ ...data, interests: newInterests });
    };

    return (
        <div className="w-full max-w-md mx-auto animate-fadeIn">
            <h2 className="text-3xl text-center mb-6 text-yellow-300 drop-shadow-md">
                <span className="mr-2">🎅</span> Tell Santa about the Child
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm mb-1 opacity-90">Child's Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            className="input-field pl-10"
                            placeholder="e.g. Ammu"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-1 opacity-90">Age</label>
                        <input
                            type="number"
                            value={data.age || ''}
                            onChange={(e) => setData({ ...data, age: parseInt(e.target.value) || 0 })}
                            className="input-field"
                            placeholder="8"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 opacity-90">Gender</label>
                        <select
                            value={data.gender}
                            onChange={(e) => setData({ ...data, gender: e.target.value as any })}
                            className="input-field"
                        >
                            <option value="boy">Boy</option>
                            <option value="girl">Girl</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-1 opacity-90">Interests & Hobbies</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={currentInterest}
                            onChange={(e) => setCurrentInterest(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddInterest()}
                            className="input-field"
                            placeholder="e.g. Drawing, Barbie"
                        />
                        <button
                            onClick={handleAddInterest}
                            className="bg-green-600 text-white rounded-lg px-4 hover:bg-green-700 transition"
                        >
                            <Sparkles size={20} />
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {data.interests.map((interest, idx) => (
                            <span key={idx} className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-white/30">
                                {interest}
                                <button onClick={() => handleRemoveInterest(idx)} className="hover:text-red-300">×</button>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="pt-4 text-center">
                    <button
                        onClick={() => onNext(data)}
                        disabled={!data.name}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next Step ➡
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChildProfileForm;
