import React from 'react';
import { useGame } from '../context/GameContext';
import { PlayCircle, RefreshCw } from 'lucide-react';

const GameControls: React.FC = () => {
  const { gameState, startGame, resetGame, difficulty, setDifficulty } = useGame();

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={gameState === 'completed' ? resetGame : startGame}
          className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
        >
          {gameState === 'completed' ? (
            <>
              <RefreshCw className="w-5 h-5" />
              Play Again
            </>
          ) : (
            <>
              <PlayCircle className="w-5 h-5" />
              {gameState === 'playing' ? 'Restart Game' : 'Start Game'}
            </>
          )}
        </button>
      </div>
      
      <div className="flex items-center gap-3">
        <label htmlFor="difficulty" className="text-purple-200 font-medium">
          Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as any)}
          className="bg-purple-700 text-purple-100 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
          disabled={gameState === 'playing'}
        >
          {difficultyOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GameControls;