import { motion } from 'framer-motion';
import {
  Code,
  ExternalLink,
  Gamepad2,
  Github,
  Globe,
  Lightbulb,
  Package,
  ShieldCheck,
  Star,
} from 'lucide-react';
import React from 'react';

import { TextOverlay } from '@/partials/TextOverlay';

export const InnovatorScene: React.FC = () => {
  const featuredProjects = [
    {
      title: 'AWS TypeScript Toolkit',
      description:
        'Common utils, types, exceptions, constants and services for AWS TypeScript projects',
      icon: <Package size={24} className="text-white" />,
      color: 'from-orange-400 to-red-500',
      link: 'https://github.com/techuila/aws-typescript-toolkit',
      technologies: ['TypeScript', 'AWS', 'Node.js'],
      stars: '⭐ Public Repository',
    },
    {
      title: 'Node Loopie',
      description:
        'Reduce your code with node-loopie. Routes declaration, models, and more',
      icon: <Code size={24} className="text-white" />,
      color: 'from-green-400 to-emerald-500',
      link: 'https://github.com/techuila/node-loopie',
      technologies: ['JavaScript', 'Node.js', 'CLI'],
      stars: '⭐ 6 GitHub Stars',
    },
    {
      title: 'Instagram Clone',
      description:
        "A replica of Instagram's homepage with react-virtualized carousel implementation",
      icon: <Globe size={24} className="text-white" />,
      color: 'from-purple-400 to-pink-500',
      link: 'https://github.com/techuila/instagram-clone',
      technologies: ['React', 'TypeScript', 'UI/UX'],
      stars: '⭐ UI/UX Focus',
    },
    {
      title: 'Advent of Code',
      description:
        'Multi-language solutions for Advent of Code challenges showcasing versatility',
      icon: <Lightbulb size={24} className="text-white" />,
      color: 'from-indigo-400 to-purple-500',
      link: 'https://github.com/techuila/advent-of-code',
      technologies: ['Elixir', 'Python', 'Algorithms'],
      stars: '⭐ Multi-Language',
    },
    {
      title: 'Vue Swipeable Bottom Sheet',
      description:
        'Contributed to popular Vue.js component with 47 stars and 14 forks',
      icon: <ShieldCheck size={24} className="text-white" />,
      color: 'from-cyan-400 to-blue-500',
      link: 'https://github.com/axtutuu/vue-swipeable-bottom-sheet',
      technologies: ['Vue.js', 'JavaScript', 'Component'],
      stars: '⭐ 47 Stars, 14 Forks',
    },
    {
      title: 'Electron Overlay',
      description:
        'Desktop overlay application built with Electron for gaming and productivity',
      icon: <Gamepad2 size={24} className="text-white" />,
      color: 'from-blue-400 to-indigo-500',
      link: 'https://github.com/techuila/electron-overlay',
      technologies: ['C++', 'Electron', 'Desktop'],
      stars: '⭐ Desktop App',
    },
  ];

  const projectStats = [
    { label: 'Open Source Projects', value: '20+', color: 'text-green-400' },
    { label: 'GitHub Stars', value: '50+', color: 'text-yellow-400' },
    { label: 'Programming Languages', value: '8+', color: 'text-blue-400' },
    { label: 'Years Contributing', value: '6+', color: 'text-purple-400' },
  ];

  return (
    <section className="scene-section flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <TextOverlay
              title="Innovator & Creator"
              description="Constantly exploring new technologies and creating innovative solutions. My portfolio spans from developer tools to experimental interfaces, showcasing versatility across multiple programming languages and frameworks."
              position="left"
            />

            {/* GitHub stats */}
            <div className="grid grid-cols-2 gap-4">
              {projectStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-hover rounded-xl p-4 text-center"
                >
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card-hover rounded-xl p-6"
            >
              <div className="mb-4 flex items-center space-x-3">
                <Github className="size-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-slate-200">
                  Explore My Work
                </h3>
              </div>
              <p className="mb-4 text-slate-400">
                Check out my GitHub profile to see my repositories and
                contributions to the open-source community.
              </p>
              <a
                href="https://github.com/techuila"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-400 transition-colors hover:text-blue-300"
              >
                <span>Visit GitHub Profile</span>
                <ExternalLink size={16} />
              </a>
            </motion.div>
          </div>

          {/* Right side - Project showcase */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-hover group rounded-xl p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`size-12 rounded-lg bg-gradient-to-br ${project.color} flex shrink-0 items-center justify-center`}
                  >
                    {project.icon}
                  </div>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-slate-400 transition-colors hover:text-blue-400"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-slate-200 transition-colors group-hover:text-blue-400">
                  {project.title}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>

                <div className="mb-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded border border-slate-600 bg-slate-700/50 px-2 py-1 text-xs font-medium text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-xs text-slate-500">
                  <Star size={12} className="mr-1" />
                  {project.stars}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom section - Innovation philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="card-hover mx-auto max-w-4xl rounded-2xl p-8">
            <div className="mb-6 flex items-center justify-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                <Lightbulb className="size-8 text-white" />
              </div>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-purple-400">
              Innovation Philosophy
            </h3>
            <p className="leading-relaxed text-slate-300">
              "A magician who turns blocks of code to life." Every project is an
              opportunity to solve real problems, learn new technologies, and
              push the boundaries of what's possible. From utility libraries
              that streamline development workflows to experimental interfaces
              that explore new paradigms, I believe in building solutions that
              make a difference.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
