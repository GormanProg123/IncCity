import * as THREE from "three";
import { useMemo, useRef } from "react";
import type { FiveFloorHouseProps } from "../../../../../types/buildings";

export const FiveFloorHouse = ({
  floors = 5,
  cellSize = 0.5,

  ...props
}: FiveFloorHouseProps) => {
  const ref = useRef<THREE.Mesh>(null!);

  const FLOOR_HEIGHT = 0.15;
  const height = floors * FLOOR_HEIGHT;

  const buildingWidth = cellSize * 0.9;
  const buildingDepth = cellSize * 0.4;

  const wallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#d4a574";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const windowsPerFloor = 6;
    const windowWidth = (canvas.width / windowsPerFloor) * 0.6;
    const windowHeight = (canvas.height / floors) * 0.5;

    for (let floor = 0; floor < floors; floor++) {
      for (let window = 0; window < windowsPerFloor; window++) {
        const x = (canvas.width / windowsPerFloor) * window + windowWidth * 0.3;
        const y = (canvas.height / floors) * floor + windowHeight * 0.5;

        ctx.fillStyle = "#4a90e2";
        ctx.fillRect(x, y, windowWidth, windowHeight);

        ctx.strokeStyle = "#2c5aa0";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, windowWidth, windowHeight);

        ctx.beginPath();
        ctx.moveTo(x + windowWidth / 2, y);
        ctx.lineTo(x + windowWidth / 2, y + windowHeight);
        ctx.stroke();
      }
    }

    const t = new THREE.CanvasTexture(canvas);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }, [floors]);

  const wallMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: wallTexture }),
    [wallTexture],
  );

  const roofMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d4a574" }),
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
