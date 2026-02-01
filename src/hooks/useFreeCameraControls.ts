import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  PITCH_MIN,
  PITCH_MAX,
  MOVE_SPEED,
  ZOOM_SPEED,
  ZOOM_SMOOTHING,
  ZOOM_REQUIRE_RIGHT_CLICK,
  MOBILE_LOOK_SENSITIVITY,
  MOBILE_ZOOM_SENSITIVITY,
  MOBILE_PAN_SENSITIVITY,
  INERTIA_DECAY,
  INERTIA_MIN,
  SPEED,
  LOOK_SPEED,
  getTouchCenter,
  getPinchDistance,
  clampCameraPosition,
} from "../types/freeCameraControls";
import type {
  MoveCameraToDetail,
  TouchPoint,
} from "../types/freeCameraControls";

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export function useFreeCameraControls(): void {
  const { camera, gl } = useThree();
  const isMobile = useRef(isMobileDevice());

  const keys = useRef<Record<string, boolean>>({});
  const yaw = useRef(0);
  const pitch = useRef(0);
  const rightMouseDown = useRef(false);
  const initialized = useRef(false);

  const targetPos = useRef<THREE.Vector3 | null>(null);
  const zoomVelocity = useRef(0);

  const touchCount = useRef(0);
  const lastOneFinger = useRef<TouchPoint | null>(null);
  const lastPinchDistance = useRef(0);
  const lastPinchCenter = useRef<TouchPoint | null>(null);

  const yawVelocity = useRef(0);
  const pitchVelocity = useRef(0);
  const panVelocity = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    initialized.current = false;
    return () => {
      initialized.current = false;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => (keys.current[e.code] = true);
    const handleKeyUp = (e: KeyboardEvent) => (keys.current[e.code] = false);

    const handleMouseMove = (e: MouseEvent) => {
      if (!rightMouseDown.current) return;
      yaw.current -= e.movementX * LOOK_SPEED;
      pitch.current -= e.movementY * LOOK_SPEED;
      pitch.current = Math.max(PITCH_MIN, Math.min(PITCH_MAX, pitch.current));
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 2) {
        rightMouseDown.current = true;
        gl.domElement.requestPointerLock();
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 2) {
        rightMouseDown.current = false;
        if (document.pointerLockElement === gl.domElement) {
          document.exitPointerLock();
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (ZOOM_REQUIRE_RIGHT_CLICK && !rightMouseDown.current) return;
      if (document.pointerLockElement === gl.domElement) return;
      e.preventDefault();
      e.stopPropagation();
      zoomVelocity.current += -e.deltaY * 0.01 * ZOOM_SPEED;
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    gl.domElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      gl.domElement.removeEventListener("wheel", handleWheel);
    };
  }, [gl.domElement]);

  useEffect(() => {
    const el = gl.domElement;

    const handleTouchStart = (e: TouchEvent) => {
      touchCount.current = e.touches.length;

      if (e.touches.length === 1) {
        lastOneFinger.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        lastPinchCenter.current = null;
        lastPinchDistance.current = 0;
      } else if (e.touches.length === 2) {
        lastPinchDistance.current = getPinchDistance(e.touches);
        lastPinchCenter.current = getTouchCenter(e.touches);
        lastOneFinger.current = null;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      touchCount.current = e.touches.length;

      if (e.touches.length === 1 && lastOneFinger.current) {
        const dx = e.touches[0].clientX - lastOneFinger.current.x;
        const dy = e.touches[0].clientY - lastOneFinger.current.y;

        yawVelocity.current -= dx * MOBILE_LOOK_SENSITIVITY;
        pitchVelocity.current -= dy * MOBILE_LOOK_SENSITIVITY;

        lastOneFinger.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        return;
      }

      if (e.touches.length === 2) {
        const pinchDist = getPinchDistance(e.touches);
        const center = getTouchCenter(e.touches);

        if (lastPinchDistance.current > 0) {
          const zoomDelta =
            (lastPinchDistance.current - pinchDist) * MOBILE_ZOOM_SENSITIVITY;
          zoomVelocity.current += zoomDelta;
        }

        if (lastPinchCenter.current) {
          panVelocity.current.x -=
            (center.x - lastPinchCenter.current.x) * MOBILE_PAN_SENSITIVITY;
          panVelocity.current.y +=
            (center.y - lastPinchCenter.current.y) * MOBILE_PAN_SENSITIVITY;
        }

        lastPinchDistance.current = pinchDist;
        lastPinchCenter.current = center;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchCount.current = e.touches.length;
      lastOneFinger.current = null;
      lastPinchDistance.current = 0;
      lastPinchCenter.current = null;
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    el.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [gl.domElement]);

  useEffect(() => {
    const handleMoveCamera = (e: CustomEvent<MoveCameraToDetail>) => {
      if (e.detail.preservePosition) {
        const euler = new THREE.Euler().setFromQuaternion(
          camera.quaternion,
          "YXZ",
        );
        yaw.current = euler.y;
        pitch.current = euler.x;
        targetPos.current = null;
      } else if (
        e.detail.x !== undefined &&
        e.detail.y !== undefined &&
        e.detail.z !== undefined
      ) {
        targetPos.current = new THREE.Vector3(
          e.detail.x,
          e.detail.y,
          e.detail.z,
        );
      }
    };

    const canvas = gl.domElement;
    canvas.addEventListener("moveCameraTo", handleMoveCamera as EventListener);

    return () => {
      canvas.removeEventListener(
        "moveCameraTo",
        handleMoveCamera as EventListener,
      );
    };
  }, [gl.domElement, camera]);

  useFrame((_, delta) => {
    if (!initialized.current) {
      const euler = new THREE.Euler().setFromQuaternion(
        camera.quaternion,
        "YXZ",
      );
      yaw.current = euler.y;
      pitch.current = euler.x;
      initialized.current = true;
    }

    if (targetPos.current) {
      camera.position.lerp(targetPos.current, Math.min(1, MOVE_SPEED * delta));
      if (camera.position.distanceTo(targetPos.current) < 0.01) {
        targetPos.current = null;
      }
      if (isMobile.current) clampCameraPosition(camera.position);
    } else {
      yaw.current += yawVelocity.current;
      pitch.current += pitchVelocity.current;
      pitch.current = Math.max(PITCH_MIN, Math.min(PITCH_MAX, pitch.current));

      yawVelocity.current *= INERTIA_DECAY;
      pitchVelocity.current *= INERTIA_DECAY;

      if (Math.abs(yawVelocity.current) < INERTIA_MIN) yawVelocity.current = 0;
      if (Math.abs(pitchVelocity.current) < INERTIA_MIN)
        pitchVelocity.current = 0;

      if (panVelocity.current.lengthSq() > 1e-8) {
        const quat = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, yaw.current, 0, "YXZ"),
        );
        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(quat);
        const up = new THREE.Vector3(0, 1, 0);

        const panScale = 25;
        camera.position.addScaledVector(
          right,
          -panVelocity.current.x * delta * panScale,
        );
        camera.position.addScaledVector(
          up,
          panVelocity.current.y * delta * panScale,
        );

        panVelocity.current.multiplyScalar(INERTIA_DECAY);
        if (panVelocity.current.lengthSq() < INERTIA_MIN * INERTIA_MIN) {
          panVelocity.current.set(0, 0);
        }
      }

      const move = new THREE.Vector3();
      const quaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, yaw.current, 0, "YXZ"),
      );
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(quaternion);
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(quaternion);

      if (keys.current["KeyW"] || keys.current["ArrowUp"]) move.add(forward);
      if (keys.current["KeyS"] || keys.current["ArrowDown"]) move.sub(forward);
      if (keys.current["KeyA"] || keys.current["ArrowLeft"]) move.sub(right);
      if (keys.current["KeyD"] || keys.current["ArrowRight"]) move.add(right);

      if (move.length() > 0) {
        move.normalize();
        camera.position.addScaledVector(move, SPEED * delta);
      }

      if (Math.abs(zoomVelocity.current) > 0.001) {
        const toCenter = new THREE.Vector3(0, 0, 0)
          .sub(camera.position)
          .normalize();

        const zoomAmount = zoomVelocity.current * delta;
        camera.position.addScaledVector(toCenter, zoomAmount);

        zoomVelocity.current *= 1 - ZOOM_SMOOTHING;
        if (Math.abs(zoomVelocity.current) < 0.001) {
          zoomVelocity.current = 0;
        }
      }

      if (isMobile.current) clampCameraPosition(camera.position);
    }

    camera.rotation.set(pitch.current, yaw.current, 0, "YXZ");

    if (isMobile.current) {
      clampCameraPosition(camera.position);
      camera.lookAt(0, 0, 0);
    }
  });
}
