import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useMemo, useRef } from "react";

type RestaurantProps = ThreeElements["group"] & {
  cellSize?: number;
};

export const Restaurant = ({ cellSize = 0.5, ...props }: RestaurantProps) => {
  const ref = useRef<THREE.Group>(null!);

  const HEIGHT = cellSize * 0.18;
  const WIDTH = cellSize * 0.7;
  const DEPTH = cellSize * 0.5;
  const yPosition = HEIGHT / 2 + cellSize / 2;

  const frontTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#4caf50";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#8b5a2b";
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

    ctx.fillStyle = "#4caf50";
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.18);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("WACDONALD", canvas.width / 2, canvas.height * 0.09);

    return new THREE.CanvasTexture(canvas);
  }, []);

  const sideTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#4caf50";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#8b5a2b";
    ctx.fillRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25);

    const windowCount = 3;
    const windowWidth = (canvas.width / windowCount) * 0.5;
    const windowHeight = canvas.height * 0.35;
    for (let i = 0; i < windowCount; i++) {
      const x = (canvas.width / windowCount) * i + windowWidth * 0.25;
      const y = canvas.height * 0.32;
      ctx.fillStyle = "#6bb7ff";
      ctx.fillRect(x, y, windowWidth, windowHeight);
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  const frontMaterial = new THREE.MeshStandardMaterial({ map: frontTexture });
  const sideMaterial = new THREE.MeshStandardMaterial({ map: sideTexture });
  const roofMaterial = new THREE.MeshStandardMaterial({ color: "#388e3c" });

  const materials = [
    sideMaterial,
    sideMaterial,
    roofMaterial,
    sideMaterial,
    frontMaterial,
    sideMaterial,
  ];

  return (
    <group ref={ref} position={[0, yPosition, 0]} {...props}>
      <mesh material={materials}>
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
      </mesh>

      <group position={[WIDTH / 2 + 0.05, HEIGHT / 2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 0.6]} />
          <meshStandardMaterial color="#555" />
        </mesh>
        <Text
          position={[0, 0.3, 0]}
          rotation={[Math.PI, 0, 0]}
          fontSize={0.15}
          color="#ffcc00"
          anchorX="center"
          anchorY="middle"
        >
          M
        </Text>
      </group>
    </group>
  );
};
