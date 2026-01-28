import * as THREE from "three";
import { useMemo, useRef } from "react";
import type { HospitalProps } from "../../../../../types/buildings";

export const Hospital = ({
  floors = 3,
  cellSize = 0.5,
  ...props
}: HospitalProps) => {
  const ref = useRef<THREE.Group>(null!);

  const FLOOR_HEIGHT = 0.15;
  const height = floors * FLOOR_HEIGHT;

  const sideWidth = cellSize * 0.25;
  const sideDepth = cellSize * 0.3;
  const centerWidth = cellSize * 0.2;
  const centerDepth = cellSize * 0.12;

  const yPosition = height / 2 + cellSize / 2;
  const sideOffset = (sideWidth + centerWidth) / 2;

  const centerHeight = height * 0.5;
  const centerYOffset = -height / 4;

  const roofMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#ffffff" }),
    [],
  );

  const sideTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const windowsPerFloor = 3;
    const windowWidth = (canvas.width / windowsPerFloor) * 0.6;
    const windowHeight = (canvas.height / floors) * 0.5;

    for (let floor = 0; floor < floors; floor++) {
      for (let window = 0; window < windowsPerFloor; window++) {
        const x = (canvas.width / windowsPerFloor) * window + windowWidth * 0.2;
        const y = (canvas.height / floors) * floor + windowHeight * 0.25;

        ctx.fillStyle = "#4a90e2";
        ctx.fillRect(x, y, windowWidth, windowHeight);

        ctx.strokeStyle = "#2c5aa0";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, windowWidth, windowHeight);
      }
    }

    const t = new THREE.CanvasTexture(canvas);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }, [floors]);

  const sideMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: sideTexture }),
    [sideTexture],
  );

  const centerTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const doorWidth = canvas.width * 0.35;
    const doorHeight = canvas.height * 0.35;
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(
      (canvas.width - doorWidth) / 2,
      canvas.height - doorHeight - 15,
      doorWidth,
      doorHeight,
    );

    const t = new THREE.CanvasTexture(canvas);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }, []);

  const centerMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: centerTexture }),
    [centerTexture],
  );

  return (
    <group position={[0, yPosition, 0]} {...props} ref={ref}>
      <mesh position={[-sideOffset, 0, 0]} material={sideMaterial}>
        <boxGeometry args={[sideWidth, height, sideDepth]} />
      </mesh>

      <mesh position={[-sideOffset, height / 2, 0]} material={roofMaterial}>
        <boxGeometry args={[sideWidth, 0.01, sideDepth]} />
      </mesh>

      <mesh position={[0, centerYOffset, 0]} material={centerMaterial}>
        <boxGeometry args={[centerWidth, centerHeight, centerDepth]} />
      </mesh>

      <mesh
        position={[0, centerYOffset + centerHeight / 2, 0]}
        material={roofMaterial}
      >
        <boxGeometry args={[centerWidth, 0.01, centerDepth]} />
      </mesh>

      <mesh position={[sideOffset, 0, 0]} material={sideMaterial}>
        <boxGeometry args={[sideWidth, height, sideDepth]} />
      </mesh>

      <mesh position={[sideOffset, height / 2, 0]} material={roofMaterial}>
        <boxGeometry args={[sideWidth, 0.01, sideDepth]} />
      </mesh>

      <group position={[0, centerYOffset + centerHeight / 2 + 0.08, 0]}>
        <mesh>
          <boxGeometry args={[centerWidth * 0.15, 0.15, 0.02]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[centerWidth * 0.15, 0.15, 0.02]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
      </group>
    </group>
  );
};
