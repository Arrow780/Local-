import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Loader2 } from 'lucide-react';
import { pinyin } from 'pinyin-pro';
import { useWordInfo } from '../hooks/useWordInfo';

interface FlashcardProps {
  word: string;
  onKnow: () => void;
  onDontKnow: () => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ word, onKnow, onDontKnow }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const wordPinyinWithTone = pinyin(word);
  const { info, loading } = useWordInfo(word);

  const handleSpeak = (e: React.MouseEvent, textToSpeak: string) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8; // slightly slower for kids
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-sm mx-auto aspect-[3/4] perspective-1000">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-xl border-4 border-amber-200 flex flex-col items-center justify-center p-8">
          <button
            onClick={(e) => handleSpeak(e, word)}
            className="absolute top-6 right-6 p-3 bg-blue-100 text-blue-500 rounded-full hover:bg-blue-200 transition-colors"
          >
            <Volume2 size={32} />
          </button>
          <span className="text-[120px] font-kaiti text-gray-800 leading-none select-none">
            {word}
          </span>
          <p className="absolute bottom-8 text-gray-400 font-medium text-lg">点击翻面</p>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-amber-50 rounded-3xl shadow-xl border-4 border-amber-300 flex flex-col items-center justify-center p-8 rotate-y-180">
          <button
            onClick={(e) => handleSpeak(e, info?.sentence || word)}
            className="absolute top-6 right-6 p-3 bg-blue-100 text-blue-500 rounded-full hover:bg-blue-200 transition-colors"
          >
            <Volume2 size={32} />
          </button>
          
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            {loading ? (
              <Loader2 className="animate-spin text-amber-400 mb-4" size={48} />
            ) : (
              <span className="text-[80px] mb-2 select-none animate-bounce">
                {info?.emoji}
              </span>
            )}
            
             <span className="text-3xl font-medium text-gray-500 mb-1 select-none">
              {wordPinyinWithTone}
             </span>
             <span className="text-[80px] font-kaiti text-gray-800 mb-4 select-none leading-none">
              {word}
            </span>
            
            {!loading && info?.sentence && (
              <p className="text-xl text-center text-gray-600 font-medium mb-6 px-2">
                {info.sentence}
              </p>
            )}

            <div className="w-full grid grid-cols-2 gap-4 mt-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDontKnow();
                }}
                className="py-4 px-6 bg-rose-100 text-rose-600 font-bold text-xl rounded-2xl hover:bg-rose-200 active:scale-95 transition-all"
              >
                不认识 😢
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onKnow();
                }}
                className="py-4 px-6 bg-emerald-100 text-emerald-600 font-bold text-xl rounded-2xl hover:bg-emerald-200 active:scale-95 transition-all"
              >
                认识 🌟
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

