import { motion } from 'framer-motion';
import {
  Code,
  Download,
  FileText,
  Github,
  Linkedin,
  Sparkles,
  Zap,
} from 'lucide-react';
import React, { useEffect } from 'react';

import { StackOverflowIcon } from '@/partials/ui/Icons';

export const IntroScene: React.FC = () => {
  useEffect(() => {
    // Add smooth transition to hide the loader
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader) {
      // Add hiding class for smooth transition
      initialLoader.classList.add('hiding');

      // Remove the loader after transition completes
      setTimeout(() => {
        initialLoader.style.display = 'none';
      }, 500); // Match the CSS transition duration
    }
  }, []);

  const handleDownloadResume = () => {
    // You can update this path when you add your actual resume file
    window.open('/documents/resume.pdf', '_blank');
  };

  const handleDownloadCV = () => {
    // You can update this path when you add your actual CV file
    window.open('/documents/cv.pdf', '_blank');
  };

  return (
    <section className="scene-section relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-10 top-20 size-32 rounded-full bg-blue-500/10 blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 size-24 rounded-full bg-cyan-400/10 blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 p-4 backdrop-blur-sm">
              <img src="/assets/images/icon.png" alt="Logo" className="w-20" />
            </div>
            <motion.div
              className="absolute -right-2 -top-2"
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Sparkles size={24} className="text-cyan-400" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="gradient-text mb-6 text-6xl font-bold md:text-8xl"
          >
            Axl Cuyugan
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 h-1 w-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12 space-y-4"
          >
            <p className="text-2xl font-light text-slate-200 md:text-4xl">
              Full Stack Engineer & System Architect
            </p>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
              A magician who turns blocks of code to life. Crafting innovative
              digital experiences with modern technologies, scalable
              architectures, and a passion for clean, efficient code.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12 flex max-w-[500px] flex-wrap justify-center gap-4"
          >
            <div className="flex items-center space-x-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2">
              <Zap size={16} className="text-yellow-400" />
              <span className="text-sm text-slate-300">
                6+ Years Experience
              </span>
            </div>
            <div className="flex items-center space-x-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2">
              <Code size={16} className="text-blue-400" />
              <span className="text-sm text-slate-300">
                Enterprise Applications
              </span>
            </div>
            <div className="flex items-center space-x-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2">
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-sm text-slate-300">
                Platform Software Engineer @{' '}
                <a
                  href="https://viyahe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent transition-all duration-300 hover:from-blue-300 hover:to-blue-500"
                >
                  Viyahe
                </a>{' '}
                x{' '}
                <a
                  href="https://trials.gg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent transition-all duration-300 hover:from-red-300 hover:to-red-500"
                >
                  Monark
                </a>
              </span>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-12 flex items-center space-x-6"
          >
            <motion.a
              href="https://github.com/techuila"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-slate-700 bg-slate-800/50 p-3 text-slate-400 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/50 hover:text-blue-400"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/axlcuyugan/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-slate-700 bg-slate-800/50 p-3 text-slate-400 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/50 hover:text-blue-400"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="https://stackoverflow.com/users/4778651/techuila"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-slate-700 bg-slate-800/50 p-3 text-slate-400 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/50 hover:text-orange-400"
            >
              <StackOverflowIcon size={24} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col items-stretch justify-center gap-6 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="group relative min-w-[200px] overflow-hidden rounded-lg border-2 border-transparent bg-transparent bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-border px-8 py-4 font-semibold transition-all duration-300"
              style={{
                background:
                  'linear-gradient(#0f172a, #0f172a) padding-box, linear-gradient(90deg, #3b82f6, #06b6d4) border-box',
              }}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2 text-slate-200 transition-colors group-hover:text-white">
                <FileText
                  size={20}
                  className="transition-colors group-hover:text-blue-300"
                />
                <span>Download Resume</span>
                <Download
                  size={18}
                  className="transition-colors group-hover:text-blue-300"
                />
              </span>
              {/* Aceternity UI glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-400/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadCV}
              className="group relative min-w-[200px] overflow-hidden rounded-lg border-2 border-transparent bg-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-border px-8 py-4 font-semibold transition-all duration-300"
              style={{
                background:
                  'linear-gradient(#0f172a, #0f172a) padding-box, linear-gradient(90deg, #a855f7, #ec4899) border-box',
              }}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2 text-slate-200 transition-colors group-hover:text-white">
                <FileText
                  size={20}
                  className="transition-colors group-hover:text-purple-300"
                />
                <span>Download CV</span>
                <Download
                  size={18}
                  className="transition-colors group-hover:text-purple-300"
                />
              </span>
              {/* Aceternity UI glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
