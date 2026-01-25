import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useMemo, useRef } from "react";

type SchoolProps = ThreeElements["group"] & {
  floors?: number;
  cellSize?: number;
};

export const School = ({
  floors = 3,
  cellSize = 0.5,
  ...props
}: SchoolProps) => {
  const ref = useRef<THREE.Group>(null!);

  const FLOOR_HEIGHT = 0.15;
  const height = floors * FLOOR_HEIGHT;

  const width = cellSize * 0.7;
  const depth = cellSize * 0.25;

  const yPosition = height / 2 + cellSize / 2;

  const wallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const windowsPerFloor = 6;
    const windowWidth = (canvas.width / windowsPerFloor) * 0.55;
    const windowHeight = (canvas.height / floors) * 0.45;

    const doorWidth = canvas.width * 0.25;
    const doorHeight = canvas.height * 0.45;
    const doorX = canvas.width / 2 - doorWidth / 2;
    const doorY = canvas.height - doorHeight;

    for (let floor = 0; floor < floors; floor++) {
      for (let i = 0; i < windowsPerFloor; i++) {
        const x = (canvas.width / windowsPerFloor) * i + windowWidth * 0.25;
        const y = (canvas.height / floors) * floor + windowHeight * 0.3;

        const wx1 = x;
        const wx2 = x + windowWidth;
        const wy1 = y;
        const wy2 = y + windowHeight;

        const dx1 = doorX;
        const dx2 = doorX + doorWidth;
        const dy1 = doorY;
        const dy2 = canvas.height;

        const intersectsDoor = wx1 < dx2 && wx2 > dx1 && wy1 < dy2 && wy2 > dy1;

        if (intersectsDoor) continue;

        ctx.fillStyle = "#9fc5e8";
        ctx.fillRect(x, y, windowWidth, windowHeight);
      }
    }

    return new THREE.CanvasTexture(canvas);
  }, [floors]);

  const frontWallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: wallTexture,
        roughness: 0.9,
        metalness: 0,
        flatShading: true,
      }),
    [wallTexture],
  );

  const plainWallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f2f2f2",
        roughness: 1,
        flatShading: true,
      }),
    [],
  );

  const doorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8b5a2b",
        roughness: 0.9,
        flatShading: true,
      }),
    [],
  );

  const roofMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d9d9d9",
        roughness: 1,
        flatShading: true,
      }),
    [],
  );

  return (
    <group ref={ref} position={[0, yPosition, 0]} {...props}>
      <mesh
        material={[
          frontWallMaterial,
          frontWallMaterial,
          plainWallMaterial,
          plainWallMaterial,
          frontWallMaterial,
          frontWallMaterial,
        ]}
      >
        <boxGeometry args={[width, height, depth]} />
      </mesh>

      <mesh position={[0, height / 2 + 0.005, 0]} material={roofMaterial}>
        <boxGeometry args={[width * 1.02, 0.015, depth * 1.05]} />
      </mesh>

      <mesh
        position={[0, -height / 4, depth / 2 + 0.006]}
        material={doorMaterial}
      >
        <boxGeometry args={[width * 0.25, height * 0.45, 0.02]} />
      </mesh>

      <mesh position={[0, height * 0.07, depth / 2 + 0.001]}>
        <boxGeometry args={[width * 0.35, 0.08, 0.002]} />
        <meshStandardMaterial color="#f2f2f2" roughness={1} flatShading />
      </mesh>

      <Text
        position={[0, height * 0.07, depth / 2 + 0.003]}
        fontSize={0.07}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        School
      </Text>
    </group>
  );
};
