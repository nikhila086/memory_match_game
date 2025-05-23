export type CardType = {
  id: number;
  value: number;
  icon: string;
};

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type GameState = 'idle' | 'ready' | 'playing' | 'completed';