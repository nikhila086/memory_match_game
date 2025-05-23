import React from 'react';
import Game from './components/Game';
import { GameProvider } from './context/GameContext';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-400 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-purple-300">Memory Match</h1>
          <p className="text-purple-100">Test your memory by matching pairs of cards</p>
        </header>
        <main>
          <GameProvider>
            <Game />
          </GameProvider>
        </main>
        <footer className="mt-8 text-center text-purple-300 text-sm">
          <p></p>
        </footer>
      </div>
    </div>
  );
}

export default App