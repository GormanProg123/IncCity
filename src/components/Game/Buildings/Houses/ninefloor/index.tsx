import * as THREE from "three";
import { useMemo, useRef } from "react";
import type { NineFloorHouseProps } from "../../../../../types/buildings";

export const NineFloorHouse = ({
  floors = 9,
  cellSize = 0.5,
  ...props
}: NineFloorHouseProps) => {
  const ref = useRef<THREE.Mesh>(null!);

  const FLOOR_HEIGHT = 0.15;
  const height = floors * FLOOR_HEIGHT;

  const buildingWidth = cellSize * 0.95;
  const buildingDepth = cellSize * 0.45;

  const wallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#b0b0b0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const windowsPerFloor = 7;
    const windowWidth = (canvas.width / windowsPerFloor) * 0.55;
    const windowHeight = (canvas.height / floors) * 0.45;

    for (let floor = 0; floor < floors; floor++) {
      for (let window = 0; window < windowsPerFloor; window++) {
        const x =
          (canvas.width / windowsPerFloor) * window + windowWidth * 0.35;
        const y = (canvas.height / floors) * floor + windowHeight * 0.55;

        ctx.fillStyle = "#6fa8dc";
        ctx.fillRect(x, y, windowWidth, windowHeight);

        ctx.strokeStyle = "#4a6c8a";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, windowWidth, windowHeight);
      }
    }

    const t = new THREE.CanvasTexture(canvas);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }, [floors]);

  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: wallTexture,
        roughness: 0.9,
        metalness: 0.05,
      }),
    [wallTexture],
  );

  const roofMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#9a9a9a",
        roughness: 1,
      }),
    [],
  );

  const materials = useMemo(
    () => [
      wallMaterial,
      wallMaterial,
      roofMaterial,
      wallMaterial,
      wallMaterial,
      wallMaterial,
    ],
    [wallMaterial, roofMaterial],
  );

  const yPosition = height / 2 + cellSize / 2;

  return (
    <mesh
      ref={ref}
      position={[0, yPosition, 0]}
      {...props}
      material={materials}
    >
      <boxGeometry args={[buildingWidth, height, buildingDepth]} />
    </mesh>
  );
};
