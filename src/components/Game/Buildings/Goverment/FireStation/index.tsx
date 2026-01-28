import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { FireStationProps } from "../../../../../types/buildings";

export const FireStation = ({
  floors = 2,
  cellSize = 0.5,
  ...props
}: FireStationProps) => {
  const ref = useRef<THREE.Group>(null!);

  const FLOOR_HEIGHT = 0.15;
  const height = floors * FLOOR_HEIGHT;

  const width = cellSize * 0.8;
  const depth = cellSize * 0.3;

  const yPosition = height / 2 + cellSize / 2;

  const frontWallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#ff8c00";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const windowsPerFloor = 4;
    const windowWidth = (canvas.width / windowsPerFloor) * 0.5;
    const windowHeight = (canvas.height / floors) * 0.5;

    for (let i = 0; i < windowsPerFloor; i++) {
      const x = (canvas.width / windowsPerFloor) * i + windowWidth * 0.5;
      const y = (canvas.height / floors) * 0.1;
      ctx.fillStyle = "#0979e2";
      ctx.fillRect(x, y, windowWidth, windowHeight);
    }

    const stripeHeight = 50;
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(0, canvas.height - stripeHeight, canvas.width, stripeHeight);

    return new THREE.CanvasTexture(canvas);
  }, [floors]);

  const sideWallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#ff8c00";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return new THREE.CanvasTexture(canvas);
  }, []);

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
        color: "#ff8c00",
        roughness: 1,
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

      <mesh position={[0, height / 2 + 0.005, 0]} material={roofMaterial}>
        <boxGeometry args={[width * 1.02, 0.015, depth * 1.05]} />
      </mesh>

      {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
        <mesh key={i} position={[x * width, -height / 3, depth / 2.13 + 0.002]}>
          <boxGeometry args={[width * 0.15, height * 0.4, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} flatShading />
        </mesh>
      ))}

      <mesh position={[0, height * 0.05, depth / 2 + 0.001]}>
        <boxGeometry args={[width * 0.5, 0.08, 0.002]} />
        <meshStandardMaterial color="#ff0000" roughness={1} flatShading />
      </mesh>

      <Text
        position={[0, height * 0.05, depth / 2 + 0.003]}
        fontSize={0.07}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Fire Station
      </Text>
    </group>
  );
};
