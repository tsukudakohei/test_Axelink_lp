'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, EdgesGeometry, LineBasicMaterial, LineSegments, DodecahedronGeometry } from 'three';

function DodecahedronMesh() {
  const meshRef = useRef<Mesh>(null);
  const edgesRef = useRef<LineSegments>(null);

  // Create geometry and edges - much larger size
  const geometry = useMemo(() => new DodecahedronGeometry(5, 0), []);
  const edgesGeometry = useMemo(() => new EdgesGeometry(geometry), [geometry]);
  const edgesMaterial = useMemo(() => new LineBasicMaterial({
    color: 0x06b6d4, // cyan-500
    linewidth: 3,
    transparent: true,
    opacity: 0.9,
  }), []);

  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.003;
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.y += 0.005;
      edgesRef.current.rotation.x += 0.003;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhongMaterial
          color={0x3b82f6}
          transparent
          opacity={0.1}
          wireframe={false}
        />
      </mesh>
      <lineSegments ref={edgesRef} geometry={edgesGeometry} material={edgesMaterial} />
    </group>
  );
}

export default function Dodecahedron() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.7} color={0x9333ea} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color={0x06b6d4} />
        <DodecahedronMesh />
      </Canvas>
    </div>
  );
}
