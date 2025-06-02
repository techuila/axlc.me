import * as THREE from 'three';
// eslint-disable-next-line import/extensions
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { useStore } from '../../store';
import { createParticleSystem } from './particles';

// Scene instances and state for each scene
const scenes: THREE.Scene[] = [];
const cameras: THREE.PerspectiveCamera[] = [];

export const setupThreeJS = (container: HTMLDivElement) => {
  // Create renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Create scenes for each section
  for (let i = 0; i < 6; i++) {
    const scene = new THREE.Scene();
    scenes.push(scene);

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameras.push(camera);

    // Add basic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add particles to each scene
    const particles = createParticleSystem(i);
    scene.add(particles);
  }

  // Customize specific scenes
  customizeScenes();

  // Set up controls for development (can be removed in production)
  const controls = new OrbitControls(cameras[0]!, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Handle window resize
  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // eslint-disable-next-line no-restricted-syntax
    for (const camera of cameras) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    renderer.setSize(width, height);
  };

  window.addEventListener('resize', handleResize);

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Get current active scene
    const { currentScene } = useStore.getState();

    // Update active camera based on current scene
    controls.object = cameras[currentScene]!;

    // Render the current scene
    renderer.render(scenes[currentScene]!, cameras[currentScene]!);

    // Update particles
    // eslint-disable-next-line no-restricted-syntax
    for (const scene of scenes) {
      const particles = scene.children.find(
        (child) => child.name === 'particles'
      );
      if (particles) {
        (particles as THREE.Points).rotation.y += 0.0005;
      }
    }
  };

  animate();

  return {
    scenes,
    cameras,
    renderer,
    cleanup: () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    },
  };
};

// Function to customize each scene with specific 3D elements
const customizeScenes = () => {
  // Intro Scene (0)
  const introText = new THREE.Group();
  introText.name = 'introText';
  scenes[0]!.add(introText);

  // Tech Mastery Scene (1)
  const techMasteryObjects = new THREE.Group();
  techMasteryObjects.name = 'techMasteryObjects';
  scenes[1]!.add(techMasteryObjects);

  // System Builder Scene (2)
  const systemBuilderObjects = new THREE.Group();
  systemBuilderObjects.name = 'systemBuilderObjects';
  scenes[2]!.add(systemBuilderObjects);

  // Mentor Scene (3)
  const mentorObjects = new THREE.Group();
  mentorObjects.name = 'mentorObjects';
  scenes[3]!.add(mentorObjects);

  // Innovator Scene (4)
  const innovatorObjects = new THREE.Group();
  innovatorObjects.name = 'innovatorObjects';
  scenes[4]!.add(innovatorObjects);

  // Final Scene (5)
  const finalObjects = new THREE.Group();
  finalObjects.name = 'finalObjects';
  scenes[5]!.add(finalObjects);
};
