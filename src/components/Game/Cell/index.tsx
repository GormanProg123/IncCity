import * as THREE from "three";
import { useMemo, useRef } from "react";
import type { ThreeElements, ThreeEvent } from "@react-three/fiber";
import grassImg from "../../../assets/grass3.jpg";

type CellProps = Omit<ThreeElements["mesh"], "onClick"> & {
  size?: number;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
};

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
