import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CardType, DifficultyLevel, GameState } from '../types';
import { generateCards } from '../utils/gameUtils';

interface GameContextType {
  cards: CardType[];
  flippedCards: number[];
  matchedPairs: number[];
  moves: number;
  timer: number;
  gameState: GameState;
  difficulty: DifficultyLevel;
  flipCard: (index: number) => void;
  startGame: () => void;
  resetGame: () => void;
  setDifficulty: (level: DifficultyLevel) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Initialize game
  useEffect(() => {
    const newCards = generateCards(difficulty);
    setCards(newCards);
  }, [difficulty]);

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
      setTimerInterval(interval);
    } else if (timerInterval) {
      clearInterval(timerInterval);
    }
    
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [gameState]);

  // Check for game completion
  useEffect(() => {
    if (cards.length > 0 && matchedPairs.length === cards.length / 2) {
      setGameState('completed');
    }
  }, [matchedPairs, cards]);

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(prevMoves => prevMoves + 1);
      
      const [firstCardIndex, secondCardIndex] = flippedCards;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[secondCardIndex];
      
      if (firstCard.value === secondCard.value) {
        // Match found
        setMatchedPairs(prevMatched => [...prevMatched, firstCard.value]);
        setFlippedCards([]);
      } else {
        // No match, flip cards back after delay
        const timeout = setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [flippedCards, cards]);

  const flipCard = (index: number) => {
    // Prevent flipping if:
    // - game is not in playing state
    // - card is already flipped
    // - card is already matched
    // - two cards are already flipped
    if (
      gameState !== 'playing' || 
      flippedCards.includes(index) || 
      matchedPairs.includes(cards[index].value) ||
      flippedCards.length >= 2
    ) {
      return;
    }
    
    setFlippedCards(prev => [...prev, index]);
  };

  const startGame = () => {
    const newCards = generateCards(difficulty);
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setTimer(0);
    setGameState('playing');
  };

  const resetGame = () => {
    startGame();
  };

  const changeDifficulty = (level: DifficultyLevel) => {
    setDifficulty(level);
  };

  const value = {
    cards,
    flippedCards,
    matchedPairs,
    moves,
    timer,
    gameState,
    difficulty,
    flipCard,
    startGame,
    resetGame,
    setDifficulty: changeDifficulty
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};