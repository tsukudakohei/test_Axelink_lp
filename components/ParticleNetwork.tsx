'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleCount = 100;
  const maxDistance = 11;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    return { positions, velocities };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    // Update particle positions with wave motion
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Wave effect
      positions[i3 + 1] += Math.sin(time + positions[i3] * 0.1) * 0.01;

      // Continuous drift
      positions[i3] += particles.velocities[i].x;
      positions[i3 + 1] += particles.velocities[i].y;
      positions[i3 + 2] += particles.velocities[i].z;

      // Boundary check
      if (Math.abs(positions[i3]) > 25) particles.velocities[i].x *= -1;
      if (Math.abs(positions[i3 + 1]) > 15) particles.velocities[i].y *= -1;
      if (Math.abs(positions[i3 + 2]) > 15) particles.velocities[i].z *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update connections
    const linePositions = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const i3 = i * 3;
        const j3 = j * 3;

        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < maxDistance) {
          linePositions.push(
            positions[i3], positions[i3 + 1], positions[i3 + 2],
            positions[j3], positions[j3 + 1], positions[j3 + 2]
          );
        }
      }
    }

    linesRef.current.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
  });

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    return geom;
  }, [particles.positions]);

  return (
    <>
      {/* Particles */}
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.3}
          color="#22d3ee"
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#22d3ee"
          transparent={true}
          opacity={0.3}
        />
      </lineSegments>
    </>
  );
}

export default function ParticleNetwork() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom right, #1e293b, #0f172a)' }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
