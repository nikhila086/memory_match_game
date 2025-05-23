import { CardType, DifficultyLevel } from '../types';
import { Shuffle } from 'lucide-react';

// Card icons from lucide-react icons
const cardIcons = [
  'heart', 'star', 'sun', 'moon', 'cloud', 
  'umbrella', 'zap', 'flame', 'flower', 'leaf',
  'music', 'camera', 'gift', 'coffee', 'plane', 
  'anchor', 'bicycle', 'rocket', 'palette', 'snowflake'
];

export const getDifficultyConfig = (level: DifficultyLevel): { pairs: number; cols: string } => {
  switch(level) {
    case 'easy':
      return { pairs: 6, cols: 'grid-cols-3 md:grid-cols-4' };
    case 'medium':
      return { pairs: 8, cols: 'grid-cols-4 md:grid-cols-4' };
    case 'hard':
      return { pairs: 12, cols: 'grid-cols-4 md:grid-cols-6' };
    default:
      return { pairs: 8, cols: 'grid-cols-4 md:grid-cols-4' };
  }
};

export const generateCards = (difficulty: DifficultyLevel): CardType[] => {
  const { pairs } = getDifficultyConfig(difficulty);
  
  // Select random icons based on difficulty
  const selectedIcons = [...cardIcons]
    .sort(() => 0.5 - Math.random())
    .slice(0, pairs);
  
  // Create pairs of cards
  const cardPairs = selectedIcons.flatMap((icon, index) => [
    { id: index * 2, value: index, icon },
    { id: index * 2 + 1, value: index, icon }
  ]);
  
  // Shuffle the cards
  return shuffleArray(cardPairs);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const calculateScore = (moves: number, timeInSeconds: number, difficulty: DifficultyLevel): number => {
  const { pairs } = getDifficultyConfig(difficulty);
  const baseScore = pairs * 100;
  const movesPenalty = moves * 5;
  const timePenalty = timeInSeconds * 2;
  
  let score = baseScore - movesPenalty - timePenalty;
  
  // Apply difficulty multiplier
  const multiplier = difficulty === 'easy' ? 1 : 
                     difficulty === 'medium' ? 1.5 : 2;
  
  score = Math.round(score * multiplier);
  
  // Ensure minimum score of 10
  return Math.max(10, score);
};