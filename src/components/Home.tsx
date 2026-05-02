import React, { useState } from 'react';
import { wordLists } from '../data/words';
import { useStore } from '../store/useStore';
import { Deck } from './Deck';
import { BookOpen, Star, Trophy, AlertCircle, PlusCircle, X, Play, Dices } from 'lucide-react';

export const Home: React.FC = () => {
  const { mistakes, completedWeeks, markWeekCompleted, addMistakes } = useStore();
  const [activeDeck, setActiveDeck] = useState<{ words: string[]; title: string; bookId?: string; week?: number } | null>(null);
  
  // Custom Modal States
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const startReview = () => {
    if (mistakes.length === 0) return;
    // Shuffle mistakes for review
    const shuffled = [...mistakes].sort(() => Math.random() - 0.5);
    setActiveDeck({
      words: shuffled,
      title: '错题复习',
    });
  };

  const startWeek = (bookId: string, week: number, words: string[], title: string) => {
    setActiveDeck({
      words,
      title,
      bookId,
      week,
    });
  };

  const handleDeckComplete = () => {
    if (activeDeck?.bookId && activeDeck?.week) {
      markWeekCompleted(activeDeck.bookId, activeDeck.week);
    }
  };

  const startStageTest = (bookId: string, title: string) => {
    const book = wordLists.find((b) => b.id === bookId);
    if (!book) return;
    
    // Combine all words and take 30 random ones
    const allWords = book.weeks.flatMap((w) => w.words);
    const randomized = [...allWords].sort(() => Math.random() - 0.5);
    const selectedWords = randomized.slice(0, 30);
    
    setActiveDeck({
      words: selectedWords,
      title: `${title} 总测验`,
    });
  };

  const processCustomStrings = (input: string) => {
    // Splits by spaces, commas, new lines, Chinese commas/caesuras, etc.
    return input.split(/[\s,，、；;]+/).filter(w => w.trim().length > 0);
  };

  const handleCustomTest = () => {
    const words = processCustomStrings(customInput);
    if (words.length > 0) {
      // Create a single-character array if they entered contiguous chars without spaces
      // Or if they wanted multi-char words, it supports it, but breaking down to chars is safer for kids flashcards unless defined as words.
      // E.g., "苹果 香蕉" -> ["苹果", "香蕉"]. 
      // Typically Chinese character flashcards are one char per card: "平 果" -> ["平","果"].
      // Let's just trust their spacing. If they paste a long string, maybe keep as is, but usually they'll separate it.
      
      // Based on original `words: '人口大中小哭笑'.split('')`, it usually uses single chars. 
      // If the word has multiple characters, `Flashcard` component still works.
      setActiveDeck({
        words,
        title: '临时测验',
      });
      setShowCustomModal(false);
      setCustomInput('');
    }
  };

  const handleAddMistakes = () => {
    const words = processCustomStrings(customInput);
    if (words.length > 0) {
      // If user inputs a continuous string of chars without spaces like "苹果", split into individual chars? 
      // Let's assume space separated words. "我 爱 中 国" -> ["我", "爱", "中", "国"]
      addMistakes(words);
      setShowCustomModal(false);
      setCustomInput('');
    }
  };

  if (activeDeck) {
    return (
      <div className="fixed inset-0 bg-slate-50 z-50 overflow-y-auto">
        <Deck
          words={activeDeck.words}
          title={activeDeck.title}
          onClose={() => setActiveDeck(null)}
          onComplete={handleDeckComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 relative overflow-hidden">
      {/* Playful background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md pt-12 pb-8 px-6 rounded-b-[3rem] shadow-sm mb-8 z-10 border-b border-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center gap-3">
              <Star className="text-amber-400 fill-amber-400" size={36} />
              识字小达人
            </h1>
            <p className="text-gray-500 font-medium text-lg ml-12">每天进步一点点！</p>
          </div>
          <div className="hidden sm:flex items-center gap-4 bg-amber-50 px-6 py-3 rounded-2xl border border-amber-100 shadow-sm">
            <Trophy className="text-amber-500" size={28} />
            <div>
              <div className="text-sm text-amber-600 font-bold">已完成</div>
              <div className="text-2xl font-black text-amber-700">{completedWeeks.length} 课</div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto px-6 space-y-12 z-10">
        {/* Review & Custom Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={mistakes.length > 0 ? startReview : undefined}
            className={`relative overflow-hidden rounded-3xl p-8 flex flex-col items-start justify-between transition-all min-h-[200px] ${
              mistakes.length > 0 
                ? 'bg-gradient-to-r from-rose-400 to-pink-500 cursor-pointer hover:shadow-lg hover:shadow-rose-200 hover:-translate-y-1' 
                : 'bg-gray-200 opacity-70 cursor-not-allowed'
            }`}
          >
            <div className="relative z-10 text-white w-full">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <AlertCircle size={32} />
                消灭错题本
              </h2>
              <p className="text-rose-100 font-medium text-lg">
                {mistakes.length > 0 
                  ? `有 ${mistakes.length} 个字需要复习哦，加油！` 
                  : '太棒了！目前没有错题！'}
              </p>
            </div>
            {mistakes.length > 0 && (
              <button className="relative z-10 bg-white text-rose-500 px-6 py-3 mt-4 rounded-full font-bold text-lg shadow-sm hover:bg-rose-50 transition-colors self-start">
                开始复习
              </button>
            )}
            {/* Decorative background shapes */}
            <div className="absolute right-0 top-0 w-48 h-48 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
          </div>

          <div 
            onClick={() => setShowCustomModal(true)}
            className="relative overflow-hidden rounded-3xl p-8 flex flex-col items-start justify-between min-h-[200px] bg-gradient-to-r from-violet-400 to-purple-500 cursor-pointer hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-1 transition-all"
          >
            <div className="relative z-10 text-white w-full">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <PlusCircle size={32} />
                自定义测验
              </h2>
              <p className="text-violet-100 font-medium text-lg">
                输入想练习的单词，随时开启挑战！
              </p>
            </div>
            <button className="relative z-10 bg-white text-violet-600 px-6 py-3 mt-4 rounded-full font-bold text-lg shadow-sm hover:bg-violet-50 transition-colors self-start">
              添加词语
            </button>
            {/* Decorative background shapes */}
            <div className="absolute right-0 top-0 w-48 h-48 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
          </div>
        </section>

        {/* Books Section */}
        <div className="space-y-10">
          {wordLists.map((book) => (
            <section key={book.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl text-white ${book.color}`}>
                    <BookOpen size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
                </div>
                <button
                  onClick={() => startStageTest(book.id, book.title)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-colors shadow-sm self-start sm:self-auto"
                >
                  <Dices size={20} />
                  阶段抽测 (30字)
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {book.weeks.map((weekData) => {
                  const isCompleted = completedWeeks.includes(`${book.id}-week${weekData.week}`);
                  return (
                    <button
                      key={weekData.week}
                      onClick={() => startWeek(book.id, weekData.week, weekData.words, `${book.title} - 第 ${weekData.week} 周`)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all hover:-translate-y-1 ${
                        isCompleted 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:shadow-md hover:shadow-emerald-100' 
                          : 'bg-white border-gray-100 text-gray-600 hover:border-blue-200 hover:shadow-md hover:shadow-blue-100'
                      }`}
                    >
                      {isCompleted && (
                        <div className="absolute -top-2 -right-2 bg-emerald-400 text-white p-1 rounded-full shadow-sm">
                          <Star size={16} className="fill-white" />
                        </div>
                      )}
                      <span className="text-lg font-bold mb-1">第 {weekData.week} 周</span>
                      <span className="text-sm opacity-70 font-medium">{weekData.words.length} 个字</span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Custom Input Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowCustomModal(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-violet-100 p-3 rounded-full text-violet-600">
                <PlusCircle size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">自定义测验 / 错题</h2>
            </div>
            
            <p className="text-gray-600 mb-4 font-medium">
              请在下方输入你想要练习的生字或词语。可以用空格、逗号或回车进行分隔：
            </p>
            
            <textarea
              className="w-full h-40 p-5 bg-gray-50 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-violet-400 focus:bg-white transition-colors text-lg text-gray-700 placeholder:text-gray-400 mb-6"
              placeholder={'例如：\n森林 采蘑菇 或者 苹果,香蕉'}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <button
                disabled={!customInput.trim()}
                onClick={handleAddMistakes}
                className="flex items-center justify-center gap-2 py-4 px-6 bg-rose-50 text-rose-600 font-bold rounded-2xl hover:bg-rose-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <AlertCircle size={20} />
                加入错题本
              </button>
              <button
                disabled={!customInput.trim()}
                onClick={handleCustomTest}
                className="flex items-center justify-center gap-2 py-4 px-6 bg-violet-500 text-white font-bold rounded-2xl hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-violet-200 hover:shadow-lg transition-all active:scale-95"
              >
                <Play size={20} fill="currentColor" />
                开始测验
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
