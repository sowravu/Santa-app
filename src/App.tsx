import { useState } from 'react';
import './index.css';
import { INITIAL_STATE } from './types';
import type { AppState, ChildProfile, WishListItem } from './types';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ChildProfileForm from './components/ChildProfile';
import WishList from './components/WishList';
import BehaviorRating from './components/BehaviorRating';
import BudgetInput from './components/BudgetInput';
import GiftResults from './components/GiftResults';

function App() {
  const [showHome, setShowHome] = useState(true);
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const startPlanner = () => setShowHome(false);

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

  const updateBudget = (budget: number) => {
    setState(s => ({ ...s, budget }));
    nextStep();
  };

  const resetApp = () => {
    setState(INITIAL_STATE);
    setShowHome(true);
  };

  // Simple snowfall background using CSS/divs
  const snowflakes = Array.from({ length: 50 }).map((_, i) => (
    <div
      key={i}
      className="fixed text-gray-200 opacity-60 pointer-events-none animate-spin-slow"
      style={{
        position: 'fixed', // Force fixed position
        pointerEvents: 'none',
        zIndex: 0,
        left: `${Math.random() * 100}vw`,
        top: `-20px`,
        color: '#E5E7EB', // Light Gray Snow on White
        animation: `fall ${5 + Math.random() * 10}s linear infinite`,
        animationDelay: `${Math.random() * 5}s`,
        fontSize: `${10 + Math.random() * 20}px`
      }}
    >
      ❄
    </div>
  ));

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-16 px-4 relative bg-white text-gray-800 overflow-x-hidden">
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-30vh); }
          100% { transform: translateY(110vh); }
        }
      `}</style>

      {/* Background Effect */}
      {snowflakes}

      <Navbar />

      {/* Main Content Area */}
      {/* Removed max-w-2xl constraint when showing Home to allow full width */}
      <main className={`w-full z-10 min-h-[500px] flex justify-center ${!showHome ? 'max-w-2xl' : ''}`}>
        {showHome ? (
          <HomePage onStart={startPlanner} />
        ) : (
          <div className="w-full max-w-lg transition-all duration-500 transform translate-y-0 opacity-100">
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
              <div className="glass-card">
                <BudgetInput initialBudget={state.budget} onNext={updateBudget} onBack={prevStep} />
              </div>
            )}

            {state.step === 5 && (
              <GiftResults state={state} onReset={resetApp} />
            )}
          </div>
        )}
      </main>

      {/* Footer Removed */}
    </div>
  );
}


export default App;
