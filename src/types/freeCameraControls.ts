import * as THREE from "three";

export const SPEED = 5;
export const LOOK_SPEED = 0.002;
export const MOVE_SPEED = 5;
export const ZOOM_SPEED = 8;
export const ZOOM_SMOOTHING = 0.15;
export const ZOOM_REQUIRE_RIGHT_CLICK = false;

export const PITCH_MIN = -Math.PI / 2 + 0.35;
export const PITCH_MAX = Math.PI / 2 - 0.6;

export const MOBILE_LOOK_SENSITIVITY = 0.004;
export const MOBILE_ZOOM_SENSITIVITY = 0.008;
export const MOBILE_PAN_SENSITIVITY = 0.003;

export const INERTIA_DECAY = 0.92;
export const INERTIA_MIN = 0.0002;

export const MIN_CAMERA_HEIGHT = 1.5;
export const MIN_CAMERA_HEIGHT_SAFE = MIN_CAMERA_HEIGHT + 0.2;
export const MAX_CAMERA_HEIGHT = 25;
export const MIN_DISTANCE_FROM_ORIGIN = 2;
export const MAX_DISTANCE_FROM_ORIGIN = 50;

export interface TouchPoint {
  x: number;
  y: number;
}

export interface MoveCameraToDetail {
  preservePosition?: boolean;
  x?: number;
  y?: number;
  z?: number;
}

export function getTouchCenter(touches: TouchList): TouchPoint {
  const n = touches.length;
  let x = 0;
  let y = 0;
  for (let i = 0; i < n; i++) {
    x += touches[i].clientX;
    y += touches[i].clientY;
  }
  return { x: x / n, y: y / n };
}

export function getPinchDistance(touches: TouchList): number {
  if (touches.length < 2) return 0;
  const dx = touches[1].clientX - touches[0].clientX;
  const dy = touches[1].clientY - touches[0].clientY;
  return Math.hypot(dx, dy);
}

export function clampCameraPosition(pos: THREE.Vector3): void {
  pos.y = Math.max(MIN_CAMERA_HEIGHT_SAFE, Math.min(MAX_CAMERA_HEIGHT, pos.y));

  const xz = Math.hypot(pos.x, pos.z);
  if (xz > 0) {
    const clamped = Math.max(
      MIN_DISTANCE_FROM_ORIGIN,
      Math.min(MAX_DISTANCE_FROM_ORIGIN, xz),
    );
    const scale = clamped / xz;
    pos.x *= scale;
    pos.z *= scale;
  }

  if (xz > MAX_DISTANCE_FROM_ORIGIN) {
    pos.x *= 0.98;
    pos.z *= 0.98;
  }
}
