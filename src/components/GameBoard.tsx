import React from 'react';
import Card from './Card';
import { useGame } from '../context/GameContext';
import { getDifficultyConfig } from '../utils/gameUtils';

const GameBoard: React.FC = () => {
  const { cards, flippedCards, matchedPairs, difficulty, flipCard } = useGame();
  const { cols } = getDifficultyConfig(difficulty);

  return (
    <div className={`grid ${cols} gap-3 md:gap-4 mt-6`}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          index={index}
          isFlipped={flippedCards.includes(index)}
          isMatched={matchedPairs.includes(card.value)}
          onFlip={() => flipCard(index)}
        />
      ))}
    </div>
  );
};

export default GameBoard;