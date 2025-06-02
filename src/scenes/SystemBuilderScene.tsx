import { motion } from 'framer-motion';
import { Box, Cloud, Database, GitBranch, Server, Shield } from 'lucide-react';
import React, { useState } from 'react';

import { InteractiveOrb } from '@/partials/InteractiveOrb';
import { TextOverlay } from '@/partials/TextOverlay';

export const SystemBuilderScene: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const orbs = [
    {
      title: 'Cloud Architecture',
      icon: <Cloud size={32} color="white" />,
      color: 'from-blue-400 to-blue-600',
      position: 'center',
      size: 'lg' as const,
      delay: 0,
      targetX: 0,
      targetY: 0,
    },
    {
      title: 'Database Systems',
      icon: <Database size={24} color="white" />,
      color: 'from-green-400 to-green-600',
      position: 'top',
      size: 'md' as const,
      delay: 0.3,
      targetX: 0,
      targetY: -180,
    },
    {
      title: 'Server Infrastructure',
      icon: <Server size={24} color="white" />,
      color: 'from-orange-400 to-orange-600',
      position: 'bottom',
      size: 'md' as const,
      delay: 0.5,
      targetX: 0,
      targetY: 180,
    },
    {
      title: 'CI/CD Pipelines',
      icon: <GitBranch size={24} color="white" />,
      color: 'from-purple-400 to-purple-600',
      position: 'left',
      size: 'md' as const,
      delay: 0.7,
      targetX: -180,
      targetY: 0,
    },
    {
      title: 'Microservices',
      icon: <Box size={24} color="white" />,
      color: 'from-indigo-400 to-indigo-600',
      position: 'right',
      size: 'md' as const,
      delay: 0.9,
      targetX: 180,
      targetY: 0,
    },
    {
      title: 'Security',
      icon: <Shield size={24} color="white" />,
      color: 'from-red-400 to-pink-600',
      position: 'top-right',
      size: 'sm' as const,
      delay: 1.1,
      targetX: 140,
      targetY: -140,
    },
  ];

  return (
    <section className="scene-section flex items-center py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left side - Animated Orbs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            onViewportEnter={() => setIsVisible(true)}
            onViewportLeave={() => setIsVisible(false)}
            transition={{ duration: 0.6 }}
            className="relative order-2 flex h-[500px] w-full items-center justify-center lg:order-1"
          >
            {orbs.map((orb) => (
              <motion.div
                key={orb.title}
                className="absolute"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                animate={
                  isVisible
                    ? {
                        x: orb.targetX,
                        y: orb.targetY,
                        opacity: 1,
                        scale: 1,
                      }
                    : { x: 0, y: 0, opacity: 0, scale: 0.5 }
                }
                transition={{
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 100,
                }}
              >
                <motion.div
                  animate={
                    isVisible
                      ? {
                          y: [0, -15, 0],
                          rotate: [0, 5, -5, 0],
                        }
                      : { y: 0, rotate: 0 }
                  }
                  transition={{
                    duration: 6 + Math.random() * 2,
                    repeat: isVisible ? Infinity : 0,
                    ease: 'easeInOut',
                    delay: isVisible ? 1 : 0,
                  }}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <InteractiveOrb
                      title={orb.title}
                      link="https://github.com/techuila"
                      color={orb.color}
                      size={orb.size}
                    >
                      {orb.icon}
                    </InteractiveOrb>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - Text content */}
          <div className="order-1 space-y-8 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <TextOverlay
                title="System Builder"
                subtitle="Architecture & Infrastructure"
                description="Designing robust systems and infrastructure with AWS, CI/CD pipelines, and modern DevOps practices. I create scalable solutions that grow with business needs while maintaining security and performance."
                position="left"
              />
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card-hover rounded-xl p-4"
              >
                <h4 className="mb-2 font-semibold text-blue-400">
                  Scalable Architecture
                </h4>
                <p className="text-sm text-slate-400">
                  Microservices and distributed systems design
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="card-hover rounded-xl p-4"
              >
                <h4 className="mb-2 font-semibold text-green-400">
                  High Availability
                </h4>
                <p className="text-sm text-slate-400">
                  Fault-tolerant systems with robust monitoring
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card-hover rounded-xl p-4"
              >
                <h4 className="mb-2 font-semibold text-purple-400">
                  Automated Workflows
                </h4>
                <p className="text-sm text-slate-400">
                  CI/CD pipelines and deployment automation
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="card-hover rounded-xl p-4"
              >
                <h4 className="mb-2 font-semibold text-orange-400">
                  Cloud Native
                </h4>
                <p className="text-sm text-slate-400">
                  AWS, Docker, Kubernetes expertise
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
