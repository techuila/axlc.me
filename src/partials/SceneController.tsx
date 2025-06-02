import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';

import { useStore } from '@/store';

const SceneController: React.FC = () => {
  const { currentScene, totalScenes, setCurrentScene } = useStore();

  const handleSceneChange = (scene: number) => {
    if (scene >= 0 && scene < totalScenes) {
      setCurrentScene(scene);
      const { smoothScroll } = window as unknown as {
        smoothScroll?: (scene: number) => void;
      };
      if (smoothScroll) {
        smoothScroll(scene);
      }
    }
  };

  return (
    <div className="fixed right-8 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center space-y-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`flex size-12 items-center justify-center rounded-full transition-all duration-300 ${
          currentScene > 0
            ? 'glass border border-blue-500/30 text-blue-400 shadow-lg hover:shadow-blue-500/25'
            : 'cursor-not-allowed border border-slate-700 bg-slate-800/50 text-slate-500'
        }`}
        onClick={() => handleSceneChange(currentScene - 1)}
        disabled={currentScene === 0}
      >
        <ChevronUp size={20} />
      </motion.button>

      <div className="flex flex-col items-center space-y-3 py-4">
        {Array.from({ length: totalScenes }).map((_, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`cursor-pointer rounded-full transition-all duration-300 ${
              currentScene === index
                ? 'size-4 bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/50'
                : 'size-3 border-2 border-slate-700 bg-slate-600 hover:border-slate-500 hover:bg-slate-500'
            }`}
            onClick={() => handleSceneChange(index)}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`flex size-12 items-center justify-center rounded-full transition-all duration-300 ${
          currentScene < totalScenes - 1
            ? 'glass border border-blue-500/30 text-blue-400 shadow-lg hover:shadow-blue-500/25'
            : 'cursor-not-allowed border border-slate-700 bg-slate-800/50 text-slate-500'
        }`}
        onClick={() => handleSceneChange(currentScene + 1)}
        disabled={currentScene === totalScenes - 1}
      >
        <ChevronDown size={20} />
      </motion.button>
    </div>
  );
};

export default SceneController;
