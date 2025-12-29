import './index.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { ThemeProvider } from './utils/ThemeContext';
import { PointsProvider } from './context/PointsContext';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Planner from './components/Planner';
import GameHub from './components/games/GameHub';
import MemoryMatch from './components/games/MemoryMatch';
import GiftCatcher from './components/games/GiftCatcher';
import Shop from './components/Shop';

function App() {
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
    <ThemeProvider>
      <PointsProvider>
        <Router>
          <div className="min-h-screen w-full flex flex-col items-center pt-32 px-4 relative overflow-x-hidden">
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
            <main className="w-full z-10 min-h-[500px] flex justify-center">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/planner" element={<Planner />} />
                <Route path="/games" element={<GameHub />} />
                <Route path="/games/memory" element={<MemoryMatch />} />
                <Route path="/games/catcher" element={<GiftCatcher />} />
                <Route path="/shop" element={<Shop />} />
              </Routes>
            </main>

            {/* Footer Removed */}
          </div>
        </Router>
      </PointsProvider>
    </ThemeProvider>
  );
}


export default App;
