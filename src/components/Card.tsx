import React, { useState, useEffect } from 'react';
import { CardType } from '../types';
import { Heart, Star, Sun, Moon, Cloud, Umbrella, Zap, Flame, Flower, Leaf, Music, Camera, Gift, Coffee, Plane, Anchor, Recycle as Bicycle, Rocket, Palette, Snowflake } from 'lucide-react';

interface CardProps {
  card: CardType;
  index: number;
  isFlipped: boolean;
  isMatched: boolean;
  onFlip: () => void;
}

const iconComponents: Record<string, React.FC<{ className?: string }>> = {
  heart: Heart,
  star: Star,
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  umbrella: Umbrella,
  zap: Zap,
  flame: Flame,
  flower: Flower,
  leaf: Leaf,
  music: Music,
  camera: Camera,
  gift: Gift,
  coffee: Coffee,
  plane: Plane,
  anchor: Anchor,
  bicycle: Bicycle,
  rocket: Rocket,
  palette: Palette,
  snowflake: Snowflake
};

const Card: React.FC<CardProps> = ({ card, index, isFlipped, isMatched, onFlip }) => {
  const [flipping, setFlipping] = useState(false);
  const [flippingBack, setFlippingBack] = useState(false);
  const [showMatched, setShowMatched] = useState(false);

  const IconComponent = iconComponents[card.icon] || Star;

  useEffect(() => {
    if (isFlipped) {
      setFlipping(true);
      setFlippingBack(false);
    } else if (flipping) {
      setFlipping(false);
      setFlippingBack(true);
    }
  }, [isFlipped]);

  useEffect(() => {
    if (isMatched && !showMatched) {
      setShowMatched(true);
      
      const timeout = setTimeout(() => {
        setShowMatched(false);
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [isMatched]);

  if (isMatched) {
    return <div className="aspect-square opacity-0 transition-opacity duration-500" />;
  }

  const cardClasses = `
    flip-card aspect-square relative rounded-lg cursor-pointer
    ${flipping ? 'flipping' : ''}
    ${flippingBack ? 'flipping-back' : ''}
    ${showMatched ? 'matched' : ''}
  `;

  return (
    <div className={cardClasses} onClick={onFlip}>
      <div className="card-back bg-gradient-to-br from-purple-300 to-indigo-400 rounded-lg w-full h-full flex items-center justify-center shadow-md">
        <div className="w-12 h-12 rounded-full bg-purple-200 bg-opacity-20 flex items-center justify-center">
          <span className="text-purple-100 text-2xl">?</span>
        </div>
      </div>
      
      <div className="card-front bg-white rounded-lg w-full h-full flex items-center justify-center shadow-md">
        <IconComponent className={`w-12 h-12 ${getIconColor(card.value)}`} />
      </div>
    </div>
  );
};

const getIconColor = (value: number): string => {
  const colors = [
    'text-red-400',    
    'text-yellow-400', 
    'text-orange-400', 
    'text-blue-400',   
    'text-blue-300',   
    'text-purple-400', 
    'text-yellow-300', 
    'text-red-400',    
    'text-pink-400',   
    'text-green-400',  
    'text-indigo-400', 
    'text-gray-500',   
    'text-pink-400',   
    'text-amber-400',  
    'text-sky-400',    
    'text-blue-400',   
    'text-green-400',  
    'text-red-400',    
    'text-violet-400', 
    'text-sky-300'     
  ];
  
  return colors[value % colors.length];
};

export default Card;