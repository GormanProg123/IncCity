import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { CinemaProps } from "../../../../../types/buildings";

export const Cinema = ({ cellSize = 0.5, ...props }: CinemaProps) => {
  const ref = useRef<THREE.Group>(null!);

  const HEIGHT = cellSize * 0.35;
  const WIDTH = cellSize * 0.85;
  const DEPTH = cellSize * 0.6;
  const yPosition = HEIGHT / 2 + cellSize / 2;

  const frontTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#8e24aa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const windowCount = 3;
    const windowWidth = (canvas.width / windowCount) * 0.7;
    const windowHeight = canvas.height * 0.35;
    for (let i = 0; i < windowCount; i++) {
      const x = (canvas.width / windowCount) * i + windowWidth * 0.15;
      const y = canvas.height * 0.1;

      ctx.fillStyle = "#333";
      ctx.fillRect(x - 5, y - 5, windowWidth + 10, windowHeight + 10);

      ctx.fillStyle = "#4fc3f7";
      ctx.fillRect(x, y, windowWidth, windowHeight);
    }

    const doorWidth = canvas.width * 0.25;
    const doorHeight = canvas.height * 0.45;
    const doorX = (canvas.width - doorWidth) / 2;
    const doorY = canvas.height * 0.52;

    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(doorX - 8, doorY - 8, doorWidth + 16, doorHeight + 16);

    ctx.fillStyle = "#263238";
    ctx.fillRect(doorX, doorY, doorWidth, doorHeight);

    ctx.fillStyle = "#ffd700";
    ctx.fillRect(doorX + doorWidth * 0.8, doorY + doorHeight / 2 - 10, 15, 20);

    return new THREE.CanvasTexture(canvas);
  }, []);

  const sideTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#8e24aa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return new THREE.CanvasTexture(canvas);
  }, []);

  const materials = [
    new THREE.MeshStandardMaterial({ map: sideTexture }),
    new THREE.MeshStandardMaterial({ map: sideTexture }),
    new THREE.MeshStandardMaterial({ color: "#7b1fa2" }),
    new THREE.MeshStandardMaterial({ color: "#7b1fa2" }),
    new THREE.MeshStandardMaterial({ map: frontTexture }),
    new THREE.MeshStandardMaterial({ map: sideTexture }),
  ];

  const marqueeWidth = WIDTH * 0.8;
  const marqueeHeight = HEIGHT * 0.25;
  const marqueeDepth = 0.12;

  const bulbPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const spacing = 0.08;

    for (let x = -marqueeWidth / 2; x <= marqueeWidth / 2; x += spacing) {
      positions.push([x, marqueeHeight / 2, 0]);
      positions.push([x, -marqueeHeight / 2, 0]);
    }

    for (let y = -marqueeHeight / 2; y <= marqueeHeight / 2; y += spacing) {
      positions.push([-marqueeWidth / 2, y, 0]);
      positions.push([marqueeWidth / 2, y, 0]);
    }

    return positions;
  }, [marqueeWidth, marqueeHeight]);

  return (
    <group ref={ref} position={[0, yPosition, 0]} {...props}>
      <mesh material={materials}>
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
      </mesh>

      <mesh position={[0, HEIGHT * 0.6, DEPTH / 2 + marqueeDepth / 2]}>
        <boxGeometry args={[marqueeWidth, marqueeHeight, marqueeDepth]} />
        <meshStandardMaterial color="#e53935" />
      </mesh>

      <mesh position={[0, HEIGHT * 0.6, DEPTH / 2 + marqueeDepth + 0.01]}>
        <boxGeometry args={[marqueeWidth + 0.02, marqueeHeight + 0.02, 0.02]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>

      {bulbPositions.map((pos, i) => (
        <mesh
          key={i}
          position={[
            pos[0],
            HEIGHT * 0.6 + pos[1],
            DEPTH / 2 + marqueeDepth + 0.03,
          ]}
        >
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#ffeb3b" : "#fff59d"}
            emissive={i % 2 === 0 ? "#ffeb3b" : "#fff59d"}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      <Text
        position={[0, HEIGHT * 0.6, DEPTH / 2 + marqueeDepth + 0.04]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        CINEMA
      </Text>
    </group>
  );
};
