import * as THREE from "three";
import { useMemo, useRef } from "react";
import type { FactoryProps } from "../../../../../types/buildings";

export const Factory = ({ cellSize = 0.5, ...props }: FactoryProps) => {
  const ref = useRef<THREE.Mesh>(null!);

  const HEIGHT = cellSize * 0.35;
  const WIDTH = cellSize * 0.7;
  const DEPTH = cellSize * 0.8;
  const yPosition = HEIGHT / 2 + cellSize / 2;

  const wallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#d9534f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const brickHeight = canvas.height / 8;
    const brickWidth = canvas.width / 12;
    ctx.strokeStyle = "#a94442";
    ctx.lineWidth = 4;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 12; col++) {
        const offset = row % 2 === 0 ? 0 : brickWidth / 2;
        ctx.strokeRect(
          col * brickWidth - offset,
          row * brickHeight,
          brickWidth,
          brickHeight,
        );
      }
    }

    const windowCount = 3;
    const windowWidth = brickWidth * 1.5;
    const windowHeight = brickHeight * 1.5;
    for (let i = 0; i < windowCount; i++) {
      const x = canvas.width * 0.15 + i * canvas.width * 0.25;
      const y = canvas.height * 0.3;

      ctx.fillStyle = "#6bb7ff";
      ctx.fillRect(x, y, windowWidth, windowHeight);

      ctx.strokeStyle = "#2c5aa0";
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, windowWidth, windowHeight);
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  const frontTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#d9534f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const brickHeight = canvas.height / 8;
    const brickWidth = canvas.width / 12;
    ctx.strokeStyle = "#a94442";
    ctx.lineWidth = 4;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 12; col++) {
        const offset = row % 2 === 0 ? 0 : brickWidth / 2;
        ctx.strokeRect(
          col * brickWidth - offset,
          row * brickHeight,
          brickWidth,
          brickHeight,
        );
      }
    }

    const doorWidth = canvas.width * 0.2;
    const doorHeight = canvas.height * 0.45;
    const doorY = canvas.height * 0.5;
    ctx.fillStyle = "#555";
    ctx.fillRect(
      canvas.width / 2 - doorWidth / 2,
      doorY,
      doorWidth,
      doorHeight,
    );

    const windowWidth = canvas.width * 0.08;
    const windowHeight = canvas.height * 0.25;
    const windowY = canvas.height * 0.45;
    ctx.fillStyle = "#6bb7ff";
    ctx.fillRect(canvas.width * 0.1, windowY, windowWidth, windowHeight);
    ctx.fillRect(canvas.width * 0.82, windowY, windowWidth, windowHeight);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("FACTORY", canvas.width / 2, canvas.height * 0.08);

    return new THREE.CanvasTexture(canvas);
  }, []);

  const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
  const frontMaterial = new THREE.MeshStandardMaterial({ map: frontTexture });
  const roofMaterial = new THREE.MeshStandardMaterial({ color: "#757575" });

  const materials = [
    wallMaterial,
    wallMaterial,
    roofMaterial,
    wallMaterial,
    frontMaterial,
    wallMaterial,
  ];

  return (
    <>
      <mesh
        ref={ref}
        position={[0, yPosition, 0]}
        material={materials}
        {...props}
      >
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
      </mesh>

      <mesh
        position={[
          WIDTH * 0.35,
          HEIGHT + yPosition + cellSize * 0.1,
          -DEPTH * 0.2,
        ]}
      >
        <cylinderGeometry
          args={[cellSize * 0.1, cellSize * 0.1, cellSize * 0.6, 16]}
        />
        <meshStandardMaterial color="#888" />
      </mesh>
    </>
  );
};
