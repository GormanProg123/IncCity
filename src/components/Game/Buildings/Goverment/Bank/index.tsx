import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useMemo, useRef } from "react";

type BankProps = ThreeElements["group"] & {
  cellSize?: number;
};

export const Bank = ({ cellSize = 0.5, ...props }: BankProps) => {
  const ref = useRef<THREE.Group>(null!);

  const HEIGHT = cellSize * 0.3;
  const WIDTH = cellSize * 0.8;
  const DEPTH = cellSize * 0.6;
  const yPosition = HEIGHT / 2 + cellSize / 2;
  const roofHeight = HEIGHT * 0.35;

  const frontTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const doorWidth = canvas.width * 0.12;
    const doorHeight = canvas.height * 0.55;
    const doorY = canvas.height * 0.42;

    ctx.fillStyle = "#2c2c2c";
    ctx.fillRect(
      canvas.width / 2 - doorWidth - 5,
      doorY,
      doorWidth,
      doorHeight,
    );
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 3;
    ctx.strokeRect(
      canvas.width / 2 - doorWidth - 5,
      doorY,
      doorWidth,
      doorHeight,
    );

    ctx.fillRect(canvas.width / 2 + 5, doorY, doorWidth, doorHeight);
    ctx.strokeRect(canvas.width / 2 + 5, doorY, doorWidth, doorHeight);

    ctx.fillStyle = "#b8860b";
    ctx.fillRect(canvas.width / 2 - 15, doorY + doorHeight / 2 - 10, 8, 20);
    ctx.fillRect(canvas.width / 2 + 7, doorY + doorHeight / 2 - 10, 8, 20);

    return new THREE.CanvasTexture(canvas);
  }, []);

  const sideTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const windowCount = 2;
    const windowWidth = canvas.width * 0.3;
    const windowHeight = canvas.height * 0.4;
    for (let i = 0; i < windowCount; i++) {
      const x = (canvas.width / (windowCount + 1)) * (i + 1) - windowWidth / 2;
      const y = canvas.height * 0.3;

      ctx.fillStyle = "#87ceeb";
      ctx.fillRect(x, y, windowWidth, windowHeight);
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, windowWidth, windowHeight);
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  const materials = [
    new THREE.MeshStandardMaterial({ map: sideTexture }),
    new THREE.MeshStandardMaterial({ map: sideTexture }),
    new THREE.MeshStandardMaterial({ color: "#d0d0d0" }),
    new THREE.MeshStandardMaterial({ color: "#f5f5f5" }),
    new THREE.MeshStandardMaterial({ map: frontTexture }),
    new THREE.MeshStandardMaterial({ map: sideTexture }),
  ];

  const roofOverhang = 0.1;
  const roofDepth = DEPTH + 0.2;
  const roofY = HEIGHT / 2 + roofHeight / 2;

  return (
    <group ref={ref} position={[0, yPosition, 0]} {...props}>
      <mesh material={materials}>
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
      </mesh>

      <group position={[0, roofY, -0.4]}>
        <mesh>
          <extrudeGeometry
            args={[
              new THREE.Shape([
                new THREE.Vector2(-WIDTH / 2 - roofOverhang, -roofHeight / 2),
                new THREE.Vector2(0, roofHeight / 2),
                new THREE.Vector2(WIDTH / 2 + roofOverhang, -roofHeight / 2),
              ]),
              { depth: roofDepth, bevelEnabled: false },
            ]}
          />
          <meshStandardMaterial color="#b0b0b0" />
        </mesh>
      </group>

      <Text
        position={[0, HEIGHT / 5 + roofHeight * 0.6, DEPTH / 2 + 0.01]}
        fontSize={0.08}
        color="#1a1a1a"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        BANK
      </Text>

      {[0, 1, 2, 3].map((i) => {
        const colSpacing = WIDTH / 5;
        const x = -WIDTH / 2 + colSpacing + i * colSpacing;
        return (
          <group key={i}>
            <mesh position={[x, 0, DEPTH / 2 + 0.08]}>
              <cylinderGeometry args={[0.035, 0.035, HEIGHT, 16]} />
              <meshStandardMaterial color="#e8e8e8" />
            </mesh>
            <mesh position={[x, HEIGHT / 2.2, DEPTH / 2 + 0.08]}>
              <cylinderGeometry args={[0.04, 0.035, 0.03, 16]} />
              <meshStandardMaterial color="#ddd" />
            </mesh>
            <mesh position={[x, -HEIGHT / 2.2, DEPTH / 2 + 0.08]}>
              <cylinderGeometry args={[0.04, 0.045, 0.03, 16]} />
              <meshStandardMaterial color="#ddd" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
