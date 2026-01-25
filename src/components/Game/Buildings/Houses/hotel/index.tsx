import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";
import { useMemo, useRef } from "react";

type HotelProps = ThreeElements["group"] & {
  floors?: number;
  cellSize?: number;
};

export const Hotel = ({ floors = 9, cellSize = 0.5, ...props }: HotelProps) => {
  const groupRef = useRef<THREE.Group>(null!);

  const FLOOR_HEIGHT = 0.15;
  const height = floors * FLOOR_HEIGHT;

  const buildingWidth = cellSize * 0.95;
  const buildingDepth = cellSize * 0.55;

  const wallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#e6d3b1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const windowsPerFloor = 6;
    const windowWidth = (canvas.width / windowsPerFloor) * 0.55;
    const windowHeight = (canvas.height / floors) * 0.45;

    for (let floor = 0; floor < floors; floor++) {
      for (let window = 0; window < windowsPerFloor; window++) {
        const x =
          (canvas.width / windowsPerFloor) * window + windowWidth * 0.35;
        const y = (canvas.height / floors) * floor + windowHeight * 0.6;

        ctx.fillStyle = "#9ecae1";
        ctx.fillRect(x, y, windowWidth, windowHeight);

        ctx.strokeStyle = "#6b8aa6";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, windowWidth, windowHeight);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [floors]);

  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: wallTexture,
        roughness: 0.85,
        metalness: 0.05,
      }),
    [wallTexture],
  );

  const roofMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#bfa76a",
        roughness: 0.9,
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

  const starGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const spikes = 5;
    const outerRadius = 0.035;
    const innerRadius = 0.015;

    let rot = (Math.PI / 2) * 3;
    let x = 0;
    let y = 0;
    const step = Math.PI / spikes;

    shape.moveTo(0, outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = Math.cos(rot) * outerRadius;
      y = Math.sin(rot) * outerRadius;
      shape.lineTo(x, y);
      rot += step;

      x = Math.cos(rot) * innerRadius;
      y = Math.sin(rot) * innerRadius;
      shape.lineTo(x, y);
      rot += step;
    }
    shape.lineTo(0, outerRadius);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 2,
    });
  }, []);

  const starMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffd700",
        emissive: "#ffaa00",
        emissiveIntensity: 0.6,
        metalness: 0.8,
        roughness: 0.2,
      }),
    [],
  );

  const yPosition = height / 2 + cellSize / 2;
  const roofY = height + cellSize / 2 + 0.02;
  const starSpacing = 0.085;

  return (
    <group ref={groupRef} {...props}>
      <mesh position={[0, yPosition, 0]} material={materials}>
        <boxGeometry args={[buildingWidth, height, buildingDepth]} />
      </mesh>

      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          geometry={starGeometry}
          material={starMaterial}
          position={[(i - 2) * starSpacing, roofY, buildingDepth / 2 + 0.015]}
          rotation={[0, 0, 0]}
        />
      ))}
    </group>
  );
};
