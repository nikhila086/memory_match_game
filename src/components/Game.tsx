import React from 'react';
import { useGame } from '../context/GameContext';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import GameStats from './GameStats';
import GameComplete from './GameComplete';

const Game: React.FC = () => {
  const { gameState } = useGame();

  return (
    <div className="max-w-4xl mx-auto">
      <GameControls />
      <GameStats />
      <GameBoard />
      {gameState === 'completed' && <GameComplete />}
    </div>
  );
};

export default Game;