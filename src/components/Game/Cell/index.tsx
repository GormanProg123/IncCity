import * as THREE from "three";
import { useMemo, useRef } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import grassImg from "../../../assets/grass3.jpg";
import type { CellProps } from "../../../types/game";

export const Cell = ({ size = 1, onClick, ...props }: CellProps) => {
  const ref = useRef<THREE.Mesh>(null!);

  const earthTexture = useMemo(
    () => new THREE.TextureLoader().load(grassImg),
    [],
  );

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <mesh ref={ref} {...props} onClick={handleClick}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};
