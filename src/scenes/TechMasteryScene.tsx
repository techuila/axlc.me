import { motion } from 'framer-motion';
import { Cloud, Code, Cpu, Database, Server, Zap } from 'lucide-react';
import React from 'react';

import { TextOverlay } from '@/partials/TextOverlay';

export const TechMasteryScene: React.FC = () => {
  const techCategories = [
    {
      title: 'Frontend',
      icon: <Code className="size-6" />,
      color: 'from-blue-500 to-cyan-400',
      description:
        'Building responsive, interactive user interfaces with modern frameworks and cutting-edge design systems.',
      technologies: [
        'React',
        'TypeScript',
        'Next.js',
        'Vue.js',
        'Tailwind CSS',
        'Framer Motion',
      ],
    },
    {
      title: 'Backend',
      icon: <Server className="size-6" />,
      color: 'from-green-500 to-emerald-400',
      description:
        'Developing robust server-side applications with RESTful APIs, GraphQL, and microservices architecture.',
      technologies: [
        'Node.js',
        'GraphQL',
        'Express',
        'Python',
        'PHP',
        'Laravel',
      ],
    },
    {
      title: 'Database',
      icon: <Database className="size-6" />,
      color: 'from-purple-500 to-pink-400',
      description:
        'Designing efficient data storage solutions with both SQL and NoSQL databases for optimal performance.',
      technologies: [
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'MySQL',
        'DynamoDB',
        'ElasticSearch',
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: <Cloud className="size-6" />,
      color: 'from-orange-500 to-red-400',
      description:
        'Implementing scalable cloud infrastructure with automated CI/CD pipelines and container orchestration.',
      technologies: [
        'AWS',
        'Docker',
        'Kubernetes',
        'Jenkins',
        'GitHub Actions',
        'Terraform',
      ],
    },
    {
      title: 'Languages',
      icon: <Cpu className="size-6" />,
      color: 'from-indigo-500 to-purple-400',
      description:
        'Proficient in multiple programming paradigms from functional to object-oriented programming.',
      technologies: [
        'JavaScript',
        'TypeScript',
        'Python',
        'PHP',
        'Elixir',
        'C++',
      ],
    },
    {
      title: 'Tools & Others',
      icon: <Zap className="size-6" />,
      color: 'from-yellow-500 to-orange-400',
      description:
        'Leveraging modern development tools and workflows to enhance productivity and code quality.',
      technologies: ['Git', 'Webpack', 'Vite', 'Jest', 'Cypress', 'Figma'],
    },
  ];

  return (
    <section className="scene-section flex items-center py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-5">
          {/* Left side - Text content */}
          <div className="space-y-8 lg:col-span-2">
            <TextOverlay
              title="Tech Mastery"
              subtitle="Building with Modern Technologies"
              description="Specializing in full-stack development with expertise across the entire technology stack. From React and Node.js to cloud architecture and DevOps, I create scalable, maintainable applications with modern architecture principles."
              position="left"
            />
          </div>

          {/* Right side - 3x2 Bento Grid Technology showcase */}
          <div className="lg:col-span-3">
            <div className="grid h-auto grid-cols-1 grid-rows-6 gap-4 md:grid-cols-2 md:grid-rows-3 md:gap-6">
              {techCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className="relative"
                >
                  <div
                    className={`card-hover group relative h-full overflow-hidden rounded-xl p-6`}
                  >
                    <div className="flex h-full flex-col">
                      <div className="mb-4 flex items-center space-x-3">
                        <div
                          className={`size-10 rounded-lg bg-gradient-to-br ${category.color} flex shrink-0 items-center justify-center`}
                        >
                          <div className="text-white">{category.icon}</div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-1 truncate text-lg font-semibold text-slate-200">
                            {category.title}
                          </h3>
                          <p className="line-clamp-3 text-sm leading-relaxed text-slate-400">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-2">
                        {category.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: categoryIndex * 0.1 + techIndex * 0.05,
                            }}
                            whileHover={{ scale: 1.05 }}
                            className="cursor-default rounded-full border border-slate-600 bg-slate-700/50 px-3 py-1 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-blue-500/50 hover:text-blue-300"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
