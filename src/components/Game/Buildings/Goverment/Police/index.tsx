import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useMemo, useRef } from "react";

type PoliceStationProps = ThreeElements["group"] & {
  floors?: number;
  cellSize?: number;
};

export const PoliceStation = ({
  floors = 2,
  cellSize = 0.5,
  ...props
}: PoliceStationProps) => {
  const ref = useRef<THREE.Group>(null!);

  const FLOOR_HEIGHT = 0.15;
  const height = floors * FLOOR_HEIGHT;

  const width = cellSize * 0.7;
  const depth = cellSize * 0.25;

  const yPosition = height / 2 + cellSize / 2;

  const frontWallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#b0c4de";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const windowsPerFloor = 4;
    const windowWidth = (canvas.width / windowsPerFloor) * 0.5;
    const windowHeight = (canvas.height / floors) * 0.4;

    const doorWidth = canvas.width * 0.2;
    const doorHeight = canvas.height * 0.45;
    const doorX = canvas.width / 2 - doorWidth / 2;
    const doorY = canvas.height - doorHeight;

    for (let floor = 0; floor < floors; floor++) {
      for (let i = 0; i < windowsPerFloor; i++) {
        const x = (canvas.width / windowsPerFloor) * i + windowWidth * 0.25;
        const y = (canvas.height / floors) * floor + windowHeight * 0.2;

        const intersectsDoor =
          x < doorX + doorWidth &&
          x + windowWidth > doorX &&
          y < canvas.height &&
          y + windowHeight > doorY;

        if (intersectsDoor) continue;

        ctx.fillStyle = "#0979e2";
        ctx.fillRect(x, y, windowWidth, windowHeight);
      }
    }

    ctx.fillStyle = "#003366";
    ctx.fillRect(canvas.width / 2 - 40, doorY - 60, 80, 40);

    return new THREE.CanvasTexture(canvas);
  }, [floors]);

  const sideWallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#b0c4de";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const windowsPerFloor = 4;
    const windowWidth = (canvas.width / windowsPerFloor) * 0.5;
    const windowHeight = (canvas.height / floors) * 0.4;

    for (let floor = 0; floor < floors; floor++) {
      for (let i = 0; i < windowsPerFloor; i++) {
        const x = (canvas.width / windowsPerFloor) * i + windowWidth * 0.25;
        const y = (canvas.height / floors) * floor + windowHeight * 0.2;

        ctx.fillStyle = "#0979e2";
        ctx.fillRect(x, y, windowWidth, windowHeight);
      }
    }

    return new THREE.CanvasTexture(canvas);
  }, [floors]);

  const frontWallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: frontWallTexture,
        roughness: 0.9,
        metalness: 0,
        flatShading: true,
      }),
    [frontWallTexture],
  );

  const sideWallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: sideWallTexture,
        roughness: 0.9,
        metalness: 0,
        flatShading: true,
      }),
    [sideWallTexture],
  );

  const plainWallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#b0c4de",
        roughness: 1,
        flatShading: true,
      }),
    [],
  );

  const doorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1a1a",
        roughness: 0.9,
        flatShading: true,
      }),
    [],
  );

  const roofMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#a0b0c0",
        roughness: 1,
        flatShading: true,
      }),
    [],
  );

  return (
    <group ref={ref} position={[0, yPosition, 0]} {...props}>
      <mesh
        material={[
          sideWallMaterial,
          sideWallMaterial,
          plainWallMaterial,
          plainWallMaterial,
          frontWallMaterial,
          sideWallMaterial,
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
        <boxGeometry args={[width * 0.2, height * 0.45, 0.02]} />
      </mesh>

      <mesh position={[0, height * 0.07, depth / 2 + 0.001]}>
        <boxGeometry args={[width * 0.35, 0.08, 0.002]} />
        <meshStandardMaterial color="#e0e0e0" roughness={1} flatShading />
      </mesh>

      <Text
        position={[0, height * 0.07, depth / 2 + 0.003]}
        fontSize={0.07}
        color="#003366"
        anchorX="center"
        anchorY="middle"
      >
        Police
      </Text>
    </group>
  );
};
