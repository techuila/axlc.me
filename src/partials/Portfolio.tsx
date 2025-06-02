import React, { lazy, Suspense, useEffect, useRef } from 'react';

import { useStore } from '@/store';
import { setupScrollTrigger } from '@/utils/animation/scrollTrigger';
import { setupThreeJS } from '@/utils/three/setup';

// Lazy load scene components for code splitting
const IntroScene = lazy(() =>
  import('@/scenes/IntroScene').then((module) => ({
    default: module.IntroScene,
  }))
);
const TechMasteryScene = lazy(() =>
  import('@/scenes/TechMasteryScene').then((module) => ({
    default: module.TechMasteryScene,
  }))
);
const SystemBuilderScene = lazy(() =>
  import('@/scenes/SystemBuilderScene').then((module) => ({
    default: module.SystemBuilderScene,
  }))
);
const MentorScene = lazy(() =>
  import('@/scenes/MentorScene').then((module) => ({
    default: module.MentorScene,
  }))
);
const InnovatorScene = lazy(() =>
  import('@/scenes/InnovatorScene').then((module) => ({
    default: module.InnovatorScene,
  }))
);
const FinalScene = lazy(() =>
  import('@/scenes/FinalScene').then((module) => ({
    default: module.FinalScene,
  }))
);

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const { setCurrentScene } = useStore();

  useEffect(() => {
    let cleanupFn: (() => void) | undefined;

    if (canvasRef.current && scrollableRef.current) {
      const initializeThreeJS = async () => {
        try {
          const { cleanup } = await setupThreeJS(canvasRef.current!);
          const scrollCleanup = setupScrollTrigger(
            scrollableRef.current!,
            setCurrentScene
          );

          cleanupFn = () => {
            cleanup();
            scrollCleanup();
          };
        } catch (error) {
          console.error('Failed to initialize Three.js:', error);
        }
      };

      initializeThreeJS();
    }

    return () => {
      if (cleanupFn) {
        cleanupFn();
      }
    };
  }, [setCurrentScene]);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full">
      {/* Fixed canvas for ThreeJS */}
      <div ref={canvasRef} className="scene-wrapper" />

      {/* Scrollable content */}
      <div ref={scrollableRef} className="scrollable">
        <Suspense>
          <IntroScene />

          <TechMasteryScene />

          <SystemBuilderScene />

          <MentorScene />

          <InnovatorScene />

          <FinalScene />
        </Suspense>
      </div>
    </div>
  );
};

export default Portfolio;
