import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  variant?: 'minimal' | 'full';
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ variant = 'full' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle / Mesh Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Interactive Wireframe Icosahedron (Representing Standardized System Structure)
    const icoGeometry = new THREE.IcosahedronGeometry(8, 2);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x2563eb, // Vibrant Royal Blue
      wireframe: true,
      transparent: true,
      opacity: variant === 'minimal' ? 0.2 : 0.35,
    });
    const cosaMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    group.add(cosaMesh);

    // 2. Inner Glowing Core
    const innerGeo = new THREE.IcosahedronGeometry(4, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x10b981, // Emerald Green Accent
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // 3. Floating Network Nodes (Particles)
    const particleCount = variant === 'minimal' ? 80 : 160;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x10b981); // Emerald Green
    const color2 = new THREE.Color(0x2563eb); // Royal Blue
    const color3 = new THREE.Color(0x06b6d4); // Cyan Blue

    for (let i = 0; i < particleCount; i++) {
      const radius = 12 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? color1 : Math.random() > 0.3 ? color2 : color3;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particleSystem = new THREE.Points(geometry, pMaterial);
    group.add(particleSystem);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth inertia rotation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      cosaMesh.rotation.y += 0.003;
      cosaMesh.rotation.x += 0.001;

      innerMesh.rotation.y -= 0.005;
      innerMesh.rotation.z += 0.002;

      particleSystem.rotation.y += 0.001;

      group.rotation.y = targetX * 2;
      group.rotation.x = -targetY * 2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      icoGeometry.dispose();
      innerGeo.dispose();
      icoMaterial.dispose();
      innerMat.dispose();
      pMaterial.dispose();
      renderer.dispose();
    };
  }, [variant]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-80"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
