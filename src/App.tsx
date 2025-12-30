import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './utils/ThemeContext';
import { PointsProvider } from './context/PointsContext';
import { UserProvider, useUser } from './context/UserContext';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Planner from './components/Planner';
import GameHub from './components/games/GameHub';
import MemoryMatch from './components/games/MemoryMatch';
import GiftCatcher from './components/games/GiftCatcher';
import Shop from './components/Shop';
import LoginScreen from './components/LoginScreen';

import MagicCursor from './components/effects/MagicCursor';
import Snowfall from './components/effects/Snowfall';

function MainApp() {
  const { currentUser } = useUser();

  if (!currentUser) {
    return (
      <div className="min-h-screen w-full relative overflow-x-hidden">
        <Snowfall />
        <MagicCursor />
        <div className="relative z-10">
          <LoginScreen />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col items-center pt-32 px-4 relative overflow-x-hidden">
        <Snowfall />
        <MagicCursor />

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
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <PointsProvider>
          <MainApp />
        </PointsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}


export default App;
