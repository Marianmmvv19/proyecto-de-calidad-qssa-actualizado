import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ShieldCheck, RotateCcw, Box, Globe, Award, Layers } from 'lucide-react';

type ModelType = 'isoShield' | 'qualityCube' | 'globalNetwork' | 'atomicStandard';

interface ThreeModelViewerProps {
  initialModel?: ModelType;
  title?: string;
  subtitle?: string;
}

export const ThreeModelViewer: React.FC<ThreeModelViewerProps> = ({
  initialModel = 'isoShield',
  title = 'Visualizador 3D Interactivo QSSA',
  subtitle = 'Interactúe directamente con los modelos tridimensionales de acreditación y certificación.'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<ModelType>(initialModel);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x10b981, 2);
    dirLight2.position.set(-10, -10, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x38bdf8, 3, 20);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Main Group for Model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // BUILD DIFFERENT MODELS
    const rebuildModel = (type: ModelType) => {
      // Clear previous
      while (modelGroup.children.length > 0) {
        const child = modelGroup.children[0];
        modelGroup.remove(child);
      }

      if (type === 'isoShield') {
        // 1. SHIELD + CERTIFICATION RING
        const shieldGeo = new THREE.CylinderGeometry(3.5, 2.8, 0.6, 6);
        const shieldMat = new THREE.MeshStandardMaterial({
          color: 0x1e3a8a,
          metalness: 0.8,
          roughness: 0.2,
        });
        const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
        shieldMesh.rotation.x = Math.PI / 2;
        modelGroup.add(shieldMesh);

        // Green Ring
        const torusGeo = new THREE.TorusGeometry(4.2, 0.2, 16, 100);
        const torusMat = new THREE.MeshStandardMaterial({
          color: 0x10b981,
          metalness: 0.9,
          roughness: 0.1,
        });
        const torusMesh = new THREE.Mesh(torusGeo, torusMat);
        modelGroup.add(torusMesh);

        // Checkmark geometry (made of tubes)
        const path = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-1.5, 0, 0.5),
          new THREE.Vector3(-0.3, -1.2, 0.5),
          new THREE.Vector3(1.8, 1.5, 0.5),
        ]);
        const tubeGeo = new THREE.TubeGeometry(path, 20, 0.35, 8, false);
        const tubeMat = new THREE.MeshStandardMaterial({
          color: 0x10b981, // Emerald Green
          emissive: 0x022c22,
          roughness: 0.3,
        });
        const checkMesh = new THREE.Mesh(tubeGeo, tubeMat);
        modelGroup.add(checkMesh);

      } else if (type === 'qualityCube') {
        // 2. ISO 7 PRINCIPIOS RUBIK CUBE STRUCTURE
        const cubeSize = 1.2;
        const gap = 0.2;
        const cubeMat = new THREE.MeshStandardMaterial({
          color: 0x2563eb,
          roughness: 0.2,
          metalness: 0.5,
        });
        const edgeMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true });

        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
              if (x === 0 && y === 0 && z === 0) continue;
              const geo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
              const mesh = new THREE.Mesh(geo, cubeMat);
              mesh.position.set(x * (cubeSize + gap), y * (cubeSize + gap), z * (cubeSize + gap));

              const wire = new THREE.Mesh(geo, edgeMat);
              wire.scale.setScalar(1.02);
              mesh.add(wire);

              modelGroup.add(mesh);
            }
          }
        }
      } else if (type === 'globalNetwork') {
        // 3. 3D WIREFRAME GLOBE WITH NODES (BOLIVIA - CHILE - PERU)
        const sphereGeo = new THREE.SphereGeometry(3.5, 24, 24);
        const sphereMat = new THREE.MeshBasicMaterial({
          color: 0x2563eb,
          wireframe: true,
          transparent: true,
          opacity: 0.4,
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        modelGroup.add(sphere);

        // Core Glowing Globe
        const innerGeo = new THREE.SphereGeometry(3.2, 32, 32);
        const innerMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          metalness: 0.9,
          roughness: 0.1,
        });
        modelGroup.add(new THREE.Mesh(innerGeo, innerMat));

        // Regional Connection Arcs
        const arcCurve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-1.5, 2, 2.5),
          new THREE.Vector3(0, 4, 1),
          new THREE.Vector3(2, -1, 2.5)
        );
        const tubeGeo = new THREE.TubeGeometry(arcCurve, 30, 0.1, 8, false);
        const tubeMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });
        modelGroup.add(new THREE.Mesh(tubeGeo, tubeMat));

        // Node points
        const nodeGeo = new THREE.SphereGeometry(0.3, 16, 16);
        const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        
        const n1 = new THREE.Mesh(nodeGeo, nodeMat);
        n1.position.set(-1.5, 2, 2.5); // Oruro/Bolivia
        modelGroup.add(n1);

        const n2 = new THREE.Mesh(nodeGeo, nodeMat);
        n2.position.set(2, -1, 2.5); // Chile
        modelGroup.add(n2);

      } else if (type === 'atomicStandard') {
        // 4. ATOMIC/ISO LATTICE RING
        const ringCount = 3;
        for (let i = 0; i < ringCount; i++) {
          const ringGeo = new THREE.TorusGeometry(3.5 + i * 0.4, 0.08, 16, 100);
          const ringMat = new THREE.MeshStandardMaterial({
            color: i === 0 ? 0x10b981 : i === 1 ? 0x2563eb : 0x38bdf8,
            metalness: 0.8,
          });
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.rotation.x = Math.PI / (i + 1);
          ring.rotation.y = Math.PI / (i + 2);
          modelGroup.add(ring);
        }

        const centerGeo = new THREE.IcosahedronGeometry(1.6, 1);
        const centerMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.9 });
        modelGroup.add(new THREE.Mesh(centerGeo, centerMat));
      }
    };

    rebuildModel(activeModel);

    // MOUSE DRAG ROTATION
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !modelGroupRef.current) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      modelGroupRef.current.rotation.y += deltaMove.x * 0.01;
      modelGroupRef.current.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Render loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (autoRotate && modelGroupRef.current && !isDragging) {
        modelGroupRef.current.rotation.y += 0.008;
        modelGroupRef.current.rotation.x += 0.002;
      }

      camera.position.z = 14 / zoomLevel;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeModel, autoRotate, zoomLevel]);

  return (
    <div className="bg-[#001845] border border-[#00205B] rounded-3xl p-6 shadow-2xl relative text-white overflow-hidden">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-black text-white flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#DA291C]" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1">{subtitle}</p>
        </div>

        {/* Model Selector Buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'isoShield' as ModelType, label: 'Sello ISO', icon: ShieldCheck },
            { id: 'qualityCube' as ModelType, label: 'Estructura ISO', icon: Box },
            { id: 'globalNetwork' as ModelType, label: 'Red Regional', icon: Globe },
            { id: 'atomicStandard' as ModelType, label: 'Norma Técnica', icon: Layers },
          ].map((m) => {
            const IconComp = m.icon;
            const isActive = activeModel === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveModel(m.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-[#DA291C] text-white shadow-lg'
                    : 'bg-[#001233] text-slate-300 hover:text-white hover:bg-[#00205B]'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Canvas Area */}
      <div className="relative w-full h-[340px] sm:h-[400px] rounded-2xl bg-[#001233]/90 border border-white/10 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden">
        
        <div ref={mountRef} className="w-full h-full" />

        {/* Overlay Controls */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-[#001845]/90 backdrop-blur-md p-2 rounded-xl border border-white/10 text-xs font-bold">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1 rounded-lg transition ${
              autoRotate ? 'bg-[#DA291C] text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {autoRotate ? 'Rotación On' : 'Pausado'}
          </button>
          
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
            className="px-2.5 py-1 bg-[#00205B] text-white rounded-lg hover:bg-[#0033a0] transition"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.6))}
            className="px-2.5 py-1 bg-[#00205B] text-white rounded-lg hover:bg-[#0033a0] transition"
          >
            -
          </button>
        </div>

        {/* Drag Instruction Banner */}
        <div className="absolute top-4 left-4 bg-[#001845]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-slate-300 pointer-events-none flex items-center space-x-1.5">
          <RotateCcw className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span>Arrastre con el mouse para rotar en 3D</span>
        </div>

      </div>

    </div>
  );
};
