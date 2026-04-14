import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  mistakes: string[];
  completedWeeks: string[];
  addMistake: (word: string) => void;
  removeMistake: (word: string) => void;
  markWeekCompleted: (bookId: string, week: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      mistakes: [],
      completedWeeks: [],
      addMistake: (word) =>
        set((state) => ({
          mistakes: state.mistakes.includes(word)
            ? state.mistakes
            : [...state.mistakes, word],
        })),
      removeMistake: (word) =>
        set((state) => ({
          mistakes: state.mistakes.filter((w) => w !== word),
        })),
      markWeekCompleted: (bookId, week) =>
        set((state) => {
          const id = `${bookId}-week${week}`;
          return {
            completedWeeks: state.completedWeeks.includes(id)
              ? state.completedWeeks
              : [...state.completedWeeks, id],
          };
        }),
    }),
    {
      name: 'flashcard-storage',
    }
  )
);
