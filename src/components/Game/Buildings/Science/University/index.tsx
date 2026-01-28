import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { UniversityProps } from "../../../../../types/buildings";

export const University = ({
  floors = 5,
  cellSize = 0.5,
  ...props
}: UniversityProps) => {
  const ref = useRef<THREE.Group>(null!);

  const FLOOR_HEIGHT = 0.15;
  const height = floors * FLOOR_HEIGHT;

  const width = cellSize * 0.75;
  const depth = cellSize * 0.3;

  const yPosition = height / 2 + cellSize / 2;

  const wallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const windowsPerFloor = 7;
    const windowWidth = (canvas.width / windowsPerFloor) * 0.55;
    const windowHeight = (canvas.height / floors) * 0.4;

    const doorWidth = canvas.width * 0.28;
    const doorHeight = canvas.height * 0.4;
    const doorX = canvas.width / 2 - doorWidth / 2;
    const doorY = canvas.height - doorHeight;

    for (let floor = 0; floor < floors; floor++) {
      for (let i = 0; i < windowsPerFloor; i++) {
        const x = (canvas.width / windowsPerFloor) * i + windowWidth * 0.25;
        const y = (canvas.height / floors) * floor + windowHeight * 0.35;

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
        color: "#f0f0f0",
        roughness: 1,
        flatShading: true,
      }),
    [],
  );

  const doorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#7a4a1f",
        roughness: 0.9,
        flatShading: true,
      }),
    [],
  );

  const roofMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d6d6d6",
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
        <boxGeometry args={[width * 1.03, 0.018, depth * 1.07]} />
      </mesh>

      <mesh
        position={[0, -height / 4, depth / 2 + 0.006]}
        material={doorMaterial}
      >
        <boxGeometry args={[width * 0.28, height * 0.4, 0.02]} />
      </mesh>

      <mesh position={[0, height * 0.01, depth / 2 + 0.001]}>
        <boxGeometry args={[width * 0.5, 0.09, 0.002]} />
        <meshStandardMaterial color="#f0f0f0" roughness={1} flatShading />
      </mesh>

      <Text
        position={[0, height * 0.01, depth / 2 + 0.003]}
        fontSize={0.065}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        University
      </Text>
    </group>
  );
};
