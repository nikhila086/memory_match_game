import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { calculateScore, formatTime } from '../utils/gameUtils';
import { Trophy, Clock, Move, Award } from 'lucide-react';
import Confetti from './Confetti';

const GameComplete: React.FC = () => {
  const { moves, timer, difficulty, resetGame } = useGame();
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const finalScore = calculateScore(moves, timer, difficulty);
    setScore(finalScore);
    
    const timeout = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}
      
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10 px-4">
        <div className="bg-gradient-to-br from-purple-400 to-indigo-400 rounded-xl p-6 md:p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16 text-yellow-300" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">Game Complete!</h2>
            <p className="text-purple-100">Congratulations! You've matched all pairs.</p>
          </div>
          
          <div className="bg-purple-300 bg-opacity-30 rounded-lg p-5 mb-6">
            <div className="text-center mb-4">
              <span className="text-purple-100 text-sm uppercase tracking-wider">Your Score</span>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
                {score}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Move className="w-5 h-5 text-purple-200 flex-shrink-0" />
                <div>
                  <span className="text-purple-200 text-xs">Moves</span>
                  <p className="text-white">{moves}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-200 flex-shrink-0" />
                <div>
                  <span className="text-purple-200 text-xs">Time</span>
                  <p className="text-white">{formatTime(timer)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-200 flex-shrink-0" />
                <div>
                  <span className="text-purple-200 text-xs">Difficulty</span>
                  <p className="text-white capitalize">{difficulty}</p>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={resetGame}
            className="w-full bg-teal-400 hover:bg-teal-500 text-white font-medium py-3 rounded-md transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    </>
  );
};

export default GameComplete;