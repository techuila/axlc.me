import React, { useEffect, useRef } from 'react';

import { FinalScene } from '@/scenes/FinalScene';
import { InnovatorScene } from '@/scenes/InnovatorScene';
import { IntroScene } from '@/scenes/IntroScene';
import { MentorScene } from '@/scenes/MentorScene';
import { SystemBuilderScene } from '@/scenes/SystemBuilderScene';
import { TechMasteryScene } from '@/scenes/TechMasteryScene';
import { useStore } from '@/store';
import { setupScrollTrigger } from '@/utils/animation/scrollTrigger';
import { setupThreeJS } from '@/utils/three/setup';

import SceneController from './SceneController';

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const { setCurrentScene } = useStore();

  useEffect(() => {
    if (!canvasRef.current || !scrollableRef.current) return;

    const { cleanup } = setupThreeJS(canvasRef.current);
    const scrollCleanup = setupScrollTrigger(
      scrollableRef.current,
      setCurrentScene
    );

    // eslint-disable-next-line consistent-return
    return () => {
      cleanup();
      scrollCleanup();
    };
  }, [setCurrentScene]);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full">
      {/* Fixed canvas for ThreeJS */}
      <div ref={canvasRef} className="scene-wrapper" />

      {/* Scrollable content */}
      <div ref={scrollableRef} className="scrollable">
        <IntroScene />
        <TechMasteryScene />
        <SystemBuilderScene />
        <MentorScene />
        <InnovatorScene />
        <FinalScene />
      </div>

      {/* Scene controller */}
      <SceneController />
    </div>
  );
};

export default Portfolio;
