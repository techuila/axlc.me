import { create } from 'zustand';

export interface StoreState {
  currentScene: number;
  totalScenes: number;
  setCurrentScene: (scene: number) => void;
  nextScene: () => void;
  prevScene: () => void;
}

export const useStore = create<StoreState>((set) => ({
  currentScene: 0,
  totalScenes: 6,
  setCurrentScene: (scene) => set({ currentScene: scene }),
  nextScene: () =>
    set((state) => ({
      currentScene: Math.min(state.currentScene + 1, state.totalScenes - 1),
    })),
  prevScene: () =>
    set((state) => ({
      currentScene: Math.max(state.currentScene - 1, 0),
    })),
}));
