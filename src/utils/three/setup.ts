// Three.js setup with particle system
import { useStore } from '@/store';

export const setupThreeJS = async (canvas: HTMLDivElement) => {
  try {
    // Load Three.js and particles when needed
    const [THREE, { createParticleSystem }] = await Promise.all([
      import('three'),
      import('./particles'),
    ]);

    // Simple scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvas.appendChild(renderer.domElement);

    // Simple ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Initialize particle system with first scene
    let currentParticles = createParticleSystem(0);
    scene.add(currentParticles);

    // Animation rotation for particles
    let animationTime = 0;

    // Scene transition handler
    const handleSceneChange = (sceneIndex: number) => {
      // Remove old particles
      if (currentParticles) {
        scene.remove(currentParticles);
        currentParticles.geometry.dispose();
        if (currentParticles.material instanceof THREE.Material) {
          currentParticles.material.dispose();
        }
      }

      // Add new particles for the scene
      currentParticles = createParticleSystem(sceneIndex);
      scene.add(currentParticles);
    };

    // Store reference for subscription
    let { currentScene } = useStore.getState();

    // Subscribe to store changes
    const unsubscribe = useStore.subscribe((state) => {
      if (state.currentScene !== currentScene) {
        currentScene = state.currentScene;
        handleSceneChange(currentScene);
      }
    });

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop with particle rotation
    const animate = () => {
      requestAnimationFrame(animate);

      animationTime += 0.005;

      // Rotate particles
      if (currentParticles) {
        currentParticles.rotation.y = animationTime * 0.1;
        currentParticles.rotation.x = Math.sin(animationTime * 0.1) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    const cleanup = () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);

      // Clean up particles
      if (currentParticles) {
        scene.remove(currentParticles);
        currentParticles.geometry.dispose();
        if (currentParticles.material instanceof THREE.Material) {
          currentParticles.material.dispose();
        }
      }

      if (canvas.contains(renderer.domElement)) {
        canvas.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };

    return { cleanup, scene, camera, renderer };
  } catch (error) {
    console.error('Failed to load Three.js:', error);
    return {
      cleanup: () => {},
      scene: null,
      camera: null,
      renderer: null,
    };
  }
};
