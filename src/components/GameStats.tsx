import React from 'react';
import { useGame } from '../context/GameContext';
import { formatTime } from '../utils/gameUtils';
import { Clock, Move } from 'lucide-react';

const GameStats: React.FC = () => {
  const { moves, timer, gameState } = useGame();
  
  const isGameActive = gameState === 'playing' || gameState === 'completed';
  
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-6">
      <div className="bg-purple-800 bg-opacity-50 rounded-lg p-3 flex items-center gap-3">
        <Move className="w-5 h-5 text-purple-300" />
        <div>
          <span className="text-purple-300 text-sm">Moves</span>
          <p className="text-white font-medium text-xl">{isGameActive ? moves : '-'}</p>
        </div>
      </div>
      
      <div className="bg-purple-800 bg-opacity-50 rounded-lg p-3 flex items-center gap-3">
        <Clock className="w-5 h-5 text-purple-300" />
        <div>
          <span className="text-purple-300 text-sm">Time</span>
          <p className="text-white font-medium text-xl">{isGameActive ? formatTime(timer) : '--:--'}</p>
        </div>
      </div>
    </div>
  );
};

export default GameStats;