import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const SPEED = 5;
const LOOK_SPEED = 0.002;
const MOVE_SPEED = 5;
const ZOOM_SPEED = 8;
const ZOOM_SMOOTHING = 0.15;
const ZOOM_REQUIRE_RIGHT_CLICK = false;

export const FreeCameraControls = () => {
  const { camera, gl } = useThree();
  const keys = useRef<Record<string, boolean>>({});
  const yaw = useRef(0);
  const pitch = useRef(0);
  const rightMouseDown = useRef(false);
  const initialized = useRef(false);

  const targetPos = useRef<THREE.Vector3 | null>(null);
  const zoomVelocity = useRef(0);

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
      pitch.current = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, pitch.current),
      );
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
        if (document.pointerLockElement === gl.domElement)
          document.exitPointerLock();
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
  }, [gl.domElement, camera]);

  useEffect(() => {
    const handleMoveCamera = (e: any) => {
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
    canvas.addEventListener("moveCameraTo", handleMoveCamera);

    return () => {
      canvas.removeEventListener("moveCameraTo", handleMoveCamera);
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
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.negate();

      const zoomAmount = zoomVelocity.current * delta;
      camera.position.addScaledVector(forward, zoomAmount);

      zoomVelocity.current *= 1 - ZOOM_SMOOTHING;
      if (Math.abs(zoomVelocity.current) < 0.001) {
        zoomVelocity.current = 0;
      }
    }

    if (initialized.current) {
      camera.rotation.set(pitch.current, yaw.current, 0, "YXZ");
    }
  });

  return <mesh visible={false} />;
};
