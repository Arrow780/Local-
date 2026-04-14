import React, { useState } from 'react';
import { wordLists } from '../data/words';
import { useStore } from '../store/useStore';
import { Deck } from './Deck';
import { BookOpen, Star, Trophy, AlertCircle } from 'lucide-react';

export const Home: React.FC = () => {
  const { mistakes, completedWeeks, markWeekCompleted } = useStore();
  const [activeDeck, setActiveDeck] = useState<{ words: string[]; title: string; bookId?: string; week?: number } | null>(null);

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
        {/* Review Section */}
        <section>
          <div 
            onClick={mistakes.length > 0 ? startReview : undefined}
            className={`relative overflow-hidden rounded-3xl p-8 flex items-center justify-between transition-all ${
              mistakes.length > 0 
                ? 'bg-gradient-to-r from-rose-400 to-pink-500 cursor-pointer hover:shadow-lg hover:shadow-rose-200 hover:-translate-y-1' 
                : 'bg-gray-200 opacity-70 cursor-not-allowed'
            }`}
          >
            <div className="relative z-10 text-white">
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
              <button className="relative z-10 bg-white text-rose-500 px-8 py-4 rounded-full font-bold text-xl shadow-md hover:bg-rose-50 transition-colors">
                开始复习
              </button>
            )}
            {/* Decorative background shapes */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
          </div>
        </section>

        {/* Books Section */}
        <div className="space-y-10">
          {wordLists.map((book) => (
            <section key={book.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl text-white ${book.color}`}>
                  <BookOpen size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
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
    </div>
  );
};
