import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/utils/cn';

interface TimelineItemComponentProps {
  item: TimelineItem;
  isActive: boolean;
}

const TimelineItemComponent: React.FC<TimelineItemComponentProps> = ({
  item,
  isActive,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (isActive) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, delay: 0 },
      });
    } else {
      controls.start({
        opacity: 0.3,
        x: 0,
        transition: { duration: 0.3 },
      });
    }
  }, [isActive, controls]);

  return (
    <motion.div ref={itemRef} className="relative flex items-start">
      {/* Timeline point - properly centered on the line */}
      {/* eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values */}
      <motion.div className="absolute -left-16 flex w-8 items-center justify-center">
        <motion.div
          className="size-6 rounded-full border-4 bg-slate-900"
          animate={{
            scale: isActive ? 1.2 : 1,
            backgroundColor: isActive ? '#a855f7' : '#1e293b',
            borderColor: isActive ? '#a855f7' : '#475569',
            boxShadow: isActive
              ? '0 0 20px rgba(168, 85, 247, 0.8)'
              : '0 0 0px rgba(168, 85, 247, 0)',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Content card */}
      <motion.div
        className="card-hover flex-1 rounded-xl p-6"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: isActive ? 0 : 50, opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-xl font-bold text-purple-400">{item.title}</h3>
            <span className="text-sm font-medium text-slate-400">
              {item.date}
            </span>
          </div>

          <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <h4 className="text-lg font-semibold text-slate-200">
              {item.company}
            </h4>
            {item.location && (
              <span className="text-sm text-slate-400">{item.location}</span>
            )}
          </div>

          <p className="leading-relaxed text-slate-300">{item.description}</p>

          {item.technologies && item.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {item.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  company: string;
  description: string;
  technologies?: string[];
  location?: string;
}

interface AnimatedTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const AnimatedTimeline: React.FC<AnimatedTimelineProps> = ({
  items,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Update line height based on scroll - improved calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Calculate progress based on viewport center position within the timeline
      let progress = 0;

      if (sectionTop <= viewportCenter && rect.bottom >= viewportCenter) {
        // Viewport center is within the timeline section
        const distanceFromTop = viewportCenter - sectionTop;
        progress = Math.max(0, Math.min(1, distanceFromTop / sectionHeight));
      } else if (rect.bottom < viewportCenter) {
        // Timeline is completely above viewport center
        progress = 1;
      }

      // Update line height
      setLineHeight(progress * 100);

      // Update active index based on progress
      const itemProgress = progress * items.length;
      const newActiveIndex = Math.floor(itemProgress);
      setActiveIndex(Math.min(newActiveIndex, items.length - 1));
    };

    // Listen to window scroll events
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll, true);

    // Initial check with a slight delay to ensure proper rendering
    const timeoutId = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll, true);
      clearTimeout(timeoutId);
    };
  }, [items.length]);

  return (
    <div
      ref={timelineRef}
      className={cn('relative max-w-4xl mx-auto', className)}
    >
      {/* Container for line - properly centered */}
      <div className="absolute left-8 top-0 flex h-full w-8 justify-center">
        {/* Static background line */}
        <div className="h-full w-1 rounded-full bg-slate-700" />

        {/* Animated gradient line */}
        <motion.div
          className="absolute top-0 w-1 overflow-hidden rounded-full"
          style={{ height: `${lineHeight}%` }}
        >
          <div className="timeline-line-gradient size-full" />
        </motion.div>
      </div>

      {/* Timeline items */}
      <div className="space-y-12 pl-24">
        {items.map((item, index) => (
          <TimelineItemComponent
            key={item.id}
            item={item}
            isActive={activeIndex >= index}
          />
        ))}
      </div>
    </div>
  );
};
