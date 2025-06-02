import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    smoothScroll?: (target: number) => void;
  }
}

export const setupScrollTrigger = (
  scrollContainer: HTMLDivElement,
  setCurrentScene: (scene: number) => void
) => {
  // Get all scene sections
  const sections = scrollContainer.querySelectorAll('.scene-section');

  // Create timeline for each section
  sections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setCurrentScene(index),
      onEnterBack: () => setCurrentScene(index),
      markers: false,
    });

    // Animate content
    gsap.fromTo(
      section.querySelector('.text-overlay'),
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  // Enable smooth scrolling
  const smoothScroll = (target: number) => {
    const targetSection = sections[target] as HTMLElement;
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  // Export smooth scroll function
  window.smoothScroll = smoothScroll;

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    delete window.smoothScroll;
  };
};
