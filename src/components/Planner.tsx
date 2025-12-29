import { useState } from 'react';
import { INITIAL_STATE } from '../types';
import type { AppState, ChildProfile, WishListItem } from '../types';

import ChildProfileForm from './ChildProfile';
import WishList from './WishList';
import BehaviorRating from './BehaviorRating';
import GiftResults from './GiftResults';

export default function Planner() {
    const [state, setState] = useState<AppState>(INITIAL_STATE);

    const nextStep = () => setState(s => ({ ...s, step: s.step + 1 }));
    const prevStep = () => setState(s => ({ ...s, step: s.step - 1 }));

    const updateProfile = (data: ChildProfile) => {
        setState(s => ({ ...s, childProfile: data }));
        nextStep();
    };

    const updateWishList = (data: WishListItem[]) => {
        setState(s => ({ ...s, wishList: data }));
        nextStep();
    };

    const updateBehavior = (score: number) => {
        setState(s => ({ ...s, behaviorScore: score }));
        nextStep();
    };

    const resetApp = () => {
        setState(INITIAL_STATE);
    };

    return (
        <div className="w-full max-w-lg transition-all duration-500 transform translate-y-0 opacity-100 mx-auto mt-20">
            {state.step === 1 && (
                <div className="glass-card">
                    <ChildProfileForm initialData={state.childProfile} onNext={updateProfile} />
                </div>
            )}

            {state.step === 2 && (
                <div className="glass-card">
                    <WishList initialData={state.wishList} onNext={updateWishList} onBack={prevStep} />
                </div>
            )}

            {state.step === 3 && (
                <div className="glass-card">
                    <BehaviorRating initialScore={state.behaviorScore} childName={state.childProfile.name} onNext={updateBehavior} onBack={prevStep} />
                </div>
            )}

            {state.step === 4 && (
                <GiftResults state={state} onReset={resetApp} />
            )}
        </div>
    );
}
