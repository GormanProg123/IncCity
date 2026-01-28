import * as THREE from "three";
import { Line } from "@react-three/drei";
import type { GridProps } from "../../../types/game";

export const Grid = ({
  size = 1,
  color = "white",
  lineWidth = 2,
}: GridProps) => {
  const half = size / 2;
  const yOffset = 0.51;

  // Define the corners of the grid (Perimeter of a cube)
  const points = [
    new THREE.Vector3(-half, yOffset, -half),
    new THREE.Vector3(half, yOffset, -half),
    new THREE.Vector3(half, yOffset, half),
    new THREE.Vector3(-half, yOffset, half),
    new THREE.Vector3(-half, yOffset, -half),
  ];

  return <Line points={points} color={color} lineWidth={lineWidth} />;
};
