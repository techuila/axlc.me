import { motion } from 'framer-motion';
import { Code, Sparkles } from 'lucide-react';
import React from 'react';

interface LoaderProps {
  progress: number;
}

export const Loader: React.FC<LoaderProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Icon container with same styling as IntroScene */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
        className="relative mb-12"
      >
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 p-6 backdrop-blur-sm">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Code size={72} className="text-blue-400" strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Animated sparkles */}
        <motion.div
          className="absolute -right-3 -top-3"
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles size={28} className="text-cyan-400" />
        </motion.div>
      </motion.div>

      {/* Smooth loading bar */}
      <div className="h-1 w-80 overflow-hidden rounded-full border border-slate-600/30 bg-slate-700/50 backdrop-blur-sm">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            width: `${progress}%`,
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            width: {
              duration: 0.3,
              ease: 'easeOut',
            },
            backgroundPosition: {
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        />
      </div>

      {/* Subtle glow effect */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
