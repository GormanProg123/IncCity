import * as THREE from "three";
import { useMemo, useRef } from "react";
import type { SuperMarketProps } from "../../../../../types/buildings";

export const SuperMarket = ({ cellSize = 0.5, ...props }: SuperMarketProps) => {
  const ref = useRef<THREE.Mesh>(null!);

  const HEIGHT = cellSize * 0.22;
  const WIDTH = cellSize * 0.88;
  const DEPTH = cellSize * 0.62;

  const yPosition = HEIGHT / 2 + cellSize / 2;

  const wallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#d0d0d0";
    ctx.fillRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25);

    const windowCount = 6;
    const windowWidth = (canvas.width / windowCount) * 0.7;
    const windowHeight = canvas.height * 0.35;

    for (let i = 0; i < windowCount; i++) {
      const x =
        (canvas.width / windowCount) * i +
        (canvas.width / windowCount - windowWidth) / 2;
      const y = canvas.height * 0.32;

      ctx.fillStyle = "#6bb7ff";
      ctx.fillRect(x, y, windowWidth, windowHeight);

      ctx.strokeStyle = "#2c5aa0";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, windowWidth, windowHeight);
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  const frontTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#d0d0d0";
    ctx.fillRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25);

    const windowWidth = canvas.width * 0.25;
    const windowHeight = canvas.height * 0.35;
    const y = canvas.height * 0.32;

    ctx.fillStyle = "#6bb7ff";
    ctx.fillRect(canvas.width * 0.05, y, windowWidth, windowHeight);
    ctx.fillRect(canvas.width * 0.7, y, windowWidth, windowHeight);

    const doorWidth = canvas.width * 0.12;
    const doorHeight = canvas.height * 0.45;

    ctx.fillStyle = "#333";
    ctx.fillRect(
      canvas.width / 2 - doorWidth / 2,
      canvas.height * 0.45,
      doorWidth,
      doorHeight,
    );

    ctx.fillStyle = "#e53935";
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.18);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SUPERMARKET", canvas.width / 2, canvas.height * 0.09);

    return new THREE.CanvasTexture(canvas);
  }, []);

  const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
  const frontMaterial = new THREE.MeshStandardMaterial({ map: frontTexture });
  const roofMaterial = new THREE.MeshStandardMaterial({ color: "#c62828" });

  const materials = [
    wallMaterial,
    wallMaterial,
    roofMaterial,
    wallMaterial,
    frontMaterial,
    wallMaterial,
  ];

  return (
    <mesh
      ref={ref}
      position={[0, yPosition, 0]}
      material={materials}
      {...props}
    >
      <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
    </mesh>
  );
};
