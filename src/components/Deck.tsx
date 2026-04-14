import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Flashcard } from './Flashcard';
import { useStore } from '../store/useStore';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface DeckProps {
  words: string[];
  title: string;
  onClose: () => void;
  onComplete?: () => void;
}

export const Deck: React.FC<DeckProps> = ({ words, title, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { addMistake, removeMistake } = useStore();

  const currentWord = words[currentIndex];

  const handleKnow = () => {
    removeMistake(currentWord);
    nextCard();
  };

  const handleDontKnow = () => {
    addMistake(currentWord);
    nextCard();
  };

  const nextCard = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
      if (onComplete) onComplete();
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-8 p-6 text-center">
        <div className="text-6xl">🎉</div>
        <h2 className="text-4xl font-bold text-gray-800">太棒了！</h2>
        <p className="text-xl text-gray-600">你完成了 {title} 的学习！</p>
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setIsFinished(false);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-200 transition-colors"
          >
            <RotateCcw size={24} />
            再来一次
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200"
          >
            返回主页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onClose}
          className="p-3 bg-white rounded-full shadow-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
        <div className="text-lg font-bold text-gray-400 bg-white px-4 py-2 rounded-full shadow-sm">
          {currentIndex + 1} / {words.length}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {/* We use a key to force re-render of the Flashcard component so it resets its flipped state */}
        <Flashcard
          key={currentWord + currentIndex}
          word={currentWord}
          onKnow={handleKnow}
          onDontKnow={handleDontKnow}
        />
      </div>
      
      <div className="mt-8">
        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-400 transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex) / words.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
