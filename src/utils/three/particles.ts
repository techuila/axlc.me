import * as THREE from 'three';

// Create different particle systems for each scene
export const createParticleSystem = (sceneIndex: number) => {
  const particleCount = 1000;
  const particleGeometry = new THREE.BufferGeometry();

  // Different particle distributions based on scene
  let positions: Float32Array;
  let colors: Float32Array;

  switch (sceneIndex) {
    case 0: // Intro: more focused, centralized particles
      positions = createIntroParticles(particleCount);
      colors = createGradientColors(particleCount, '#4f46e5', '#818cf8');
      break;
    case 1: // Tech Mastery: code-like particle grid
      positions = createGridParticles(particleCount);
      colors = createGradientColors(particleCount, '#818cf8', '#8b5cf6');
      break;
    case 2: // System Builder: networked particles
      positions = createNetworkParticles(particleCount);
      colors = createGradientColors(particleCount, '#8b5cf6', '#06b6d4');
      break;
    case 3: // Mentor: distributed particles
      positions = createSpiralParticles(particleCount);
      colors = createGradientColors(particleCount, '#06b6d4', '#4f46e5');
      break;
    case 4: // Innovator: explosive particles
      positions = createRadialParticles(particleCount);
      colors = createGradientColors(particleCount, '#4f46e5', '#8b5cf6');
      break;
    case 5: // Final: skyline particles
      positions = createSkylineParticles(particleCount);
      colors = createGradientColors(particleCount, '#8b5cf6', '#06b6d4');
      break;
    default:
      positions = createRandomParticles(particleCount);
      colors = createGradientColors(particleCount, '#4f46e5', '#8b5cf6');
  }

  particleGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Create a circular texture for rounded particles
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext('2d')!;

  // Create circular gradient
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, 32, 32);

  const texture = new THREE.CanvasTexture(canvas);

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    map: texture,
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  particles.name = 'particles';

  return particles;
};

// Helper functions for different particle distributions

function createRandomParticles(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
  }

  return positions;
}

function createIntroParticles(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const theta = Math.random() * Math.PI * 2;
    const radius = 2 + Math.random() * 3;

    positions[i3] = Math.cos(theta) * radius;
    positions[i3 + 1] = (Math.random() - 0.5) * 4;
    positions[i3 + 2] = Math.sin(theta) * radius;
  }

  return positions;
}

function createGridParticles(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const gridSize = Math.cbrt(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = ((i % gridSize) / gridSize - 0.5) * 10;
    const y = ((Math.floor(i / gridSize) % gridSize) / gridSize - 0.5) * 10;
    const z = (Math.floor(i / (gridSize * gridSize)) / gridSize - 0.5) * 10;

    positions[i3] = x + (Math.random() - 0.5) * 0.5;
    positions[i3 + 1] = y + (Math.random() - 0.5) * 0.5;
    positions[i3 + 2] = z + (Math.random() - 0.5) * 0.5;
  }

  return positions;
}

function createNetworkParticles(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const nodeCount = 10;
  const nodesPositions: [number, number, number][] = [];

  // Create main nodes
  for (let i = 0; i < nodeCount; i++) {
    nodesPositions.push([
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
    ]);
  }

  // Create particles around nodes
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const nodeIndex = Math.floor(Math.random() * nodeCount);
    const [nx, ny, nz] = nodesPositions[nodeIndex]!;

    positions[i3] = nx + (Math.random() - 0.5) * 2;
    positions[i3 + 1] = ny + (Math.random() - 0.5) * 2;
    positions[i3 + 2] = nz + (Math.random() - 0.5) * 2;
  }

  return positions;
}

function createSpiralParticles(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const t = i / count;
    const angle = t * Math.PI * 20;

    positions[i3] = Math.cos(angle) * (t * 5);
    positions[i3 + 1] = (t - 0.5) * 10;
    positions[i3 + 2] = Math.sin(angle) * (t * 5);
  }

  return positions;
}

function createRadialParticles(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = Math.random() * 5;

    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi);
  }

  return positions;
}

function createSkylineParticles(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Create a skyline effect with particles more concentrated at bottom
    const x = (Math.random() - 0.5) * 10;
    // More particles at bottom, fewer at top
    const y = Math.random() ** 3 * 5 - 2.5;
    const z = (Math.random() - 0.5) * 10;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
  }

  return positions;
}

// Helper for creating gradient colored particles
function createGradientColors(
  count: number,
  startColor: string,
  endColor: string
): Float32Array {
  const colors = new Float32Array(count * 3);

  // Parse hex colors to rgb
  const startRGB = hexToRgb(startColor);
  const endRGB = hexToRgb(endColor);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const t = i / count;

    // Linear interpolation between colors
    colors[i3] = startRGB.r + t * (endRGB.r - startRGB.r);
    colors[i3 + 1] = startRGB.g + t * (endRGB.g - startRGB.g);
    colors[i3 + 2] = startRGB.b + t * (endRGB.b - startRGB.b);
  }

  return colors;
}

// Helper for converting hex colors to rgb
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16) / 255,
    g: parseInt(hex.substring(2, 4), 16) / 255,
    b: parseInt(hex.substring(4, 6), 16) / 255,
  };
}
