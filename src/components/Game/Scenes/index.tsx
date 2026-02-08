import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Cell } from "../Cell";
import { Grid } from "../Grid";
import { useCallback, useState, useRef } from "react";
import { GameHUD } from "../../UI/HUD";
import { cellKey } from "../../../types/cell";
import { useGameState } from "../../../hooks/useGameState";
import { useCellExpansion } from "../../../hooks/useCellExpansion";
import { useIncome } from "../../../hooks/useIncome";
import { useBuildingDelete } from "../../../hooks/useBuildingDelete";
import { useRotationMode } from "../../../hooks/useRotationMode";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { IoIosAddCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { FaArrowsRotate } from "react-icons/fa6";
import { BuildingRenderer } from "../BuildingRenderer";
import { Tutorial } from "../../UI/Tutorial";
import type { CameraMode } from "../../../types/CameraMode";
import { FreeCameraControls } from "../FreeCameraControls";

const CELL_SIZE = 1;

export const MainScene = () => {
  const {
    money,
    setMoney,
    cells,
    builtBuildings,
    setBuiltBuildings,
    buildingRotations,
    selectedCell,
    setSelectedCell,
    rotateBuildingAt,
    selectedBuilding,
    setSelectedBuilding,
    buyBuilding,
    expandCell,
    resetGame,
  } = useGameState();

  const { expansionCells } = useCellExpansion(cells);
  const [cameraMode, setCameraMode] = useState<CameraMode>("orbit");
  const [expandMode, setExpandMode] = useState(false);
  const [deletedMode, setDeletedMode] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(
    !localStorage.getItem("tutorialSeen"),
  );
  const orbitControlsRef = useRef<any>(null);

  const { rotationMode, handleToggleRotationMode, disableRotationMode } =
    useRotationMode({
      onSetSelectedCell: setSelectedCell,
      onSetDeletedMode: setDeletedMode,
    });

  const handleToggleDeletedMode = useCallback(() => {
    setDeletedMode((prev) => {
      if (!prev) {
        disableRotationMode();
        setTutorialOpen(false);
      }
      return !prev;
    });
  }, [disableRotationMode]);

  const handleToggleCameraMode = () => {
    if (cameraMode === "orbit") {
      setCameraMode("free");
    } else {
      setCameraMode("orbit");
    }
  };

  const handleCellClick = useCallback(
    (x: number, z: number) => {
      const key = cellKey(x, z);
      if (rotationMode && builtBuildings[key]) {
        setSelectedCell({ x, z });
        return;
      }
      if (!rotationMode && builtBuildings[key]) {
        return;
      }
      if (deletedMode) return;
      if (!selectedBuilding) return;
      buyBuilding(x, z, selectedBuilding);
    },
    [
      rotationMode,
      deletedMode,
      builtBuildings,
      setSelectedCell,
      selectedBuilding,
      buyBuilding,
    ],
  );

  const handleCellDoubleClick = useCallback(
    (x: number, z: number) => {
      if (!rotationMode) return;
      const key = cellKey(x, z);
      if (builtBuildings[key]) {
        setSelectedCell({ x, z });
        rotateBuildingAt(x, z);
      }
    },
    [rotationMode, builtBuildings, setSelectedCell, rotateBuildingAt],
  );

  const handleExpand = useCallback(
    (x: number, z: number, cost: number) => {
      expandCell(x, z, cost);
    },
    [expandCell],
  );

  useIncome(builtBuildings, (income) => {
    setMoney((prev) => prev + income);
  });

  const { deleteBuilding, canDeleteBuilding } = useBuildingDelete({
    builtBuildings,
    setBuiltBuildings,
    money,
    onPay: (amount) => {
      setMoney((prev) => prev - amount);
    },
  });

  const handleRestartGame = () => {
    resetGame();
    setExpandMode(false);
    setDeletedMode(false);
    disableRotationMode();
  };

  const handleCloseTutorial = () => {
    setTutorialOpen(false);
    localStorage.setItem("tutorialSeen", "true");
  };

  const handleOpenTutorial = () => {
    setExpandMode(false);
    setDeletedMode(false);
    disableRotationMode();
    setTutorialOpen(true);
  };

  const handleToggleExpandMode = () => {
    if (!expandMode) {
      setTutorialOpen(false);
    }
    setExpandMode((v) => !v);
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas camera={{ position: [0, 6, 6], fov: 60 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />

        {cameraMode === "orbit" && (
          <OrbitControls
            ref={orbitControlsRef}
            enablePan={false}
            minDistance={3}
            maxDistance={45}
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI / 2 - 0.15}
            enableDamping
            dampingFactor={0.08}
          />
        )}

        {cameraMode === "free" && <FreeCameraControls />}

        {cells.map(({ x, z }) => {
          const key = cellKey(x, z);
          const buildingHere = builtBuildings[key];
          const rotationDeg = buildingRotations[key] ?? 0;
          const rotationYRad = (rotationDeg * Math.PI) / 180;
          const isSelectedForRotation =
            rotationMode &&
            selectedCell &&
            selectedCell.x === x &&
            selectedCell.z === z;

          return (
            <group key={key} position={[x * CELL_SIZE, 0, z * CELL_SIZE]}>
              <Cell
                onClick={() => handleCellClick(x, z)}
                onDoubleClick={() => handleCellDoubleClick(x, z)}
              />
              <Grid color={buildingHere ? "gray" : "white"} />
              {isSelectedForRotation && (
                <Line
                  points={[
                    [-0.5, 0.52, -0.5],
                    [0.5, 0.52, -0.5],
                    [0.5, 0.52, 0.5],
                    [-0.5, 0.52, 0.5],
                    [-0.5, 0.52, -0.5],
                  ].map((p) => new THREE.Vector3(p[0], p[1], p[2]))}
                  color="#00ffff"
                  lineWidth={3}
                />
              )}

              {!tutorialOpen &&
                rotationMode &&
                isSelectedForRotation &&
                buildingHere && (
                  <group position={[0, 1.4, 0]}>
                    <Html center key={`rotate-${cameraMode}-${key}`}>
                      <button
                        type="button"
                        className="rotate-button-above-building"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          rotateBuildingAt(x, z);
                        }}
                        aria-label="Rotate building 90°"
                      >
                        <FaArrowsRotate size={24} />
                        <span className="rotate-button-above-building__label">
                          90°
                        </span>
                      </button>
                    </Html>
                  </group>
                )}

              <group rotation={[0, rotationYRad, 0]}>
                <BuildingRenderer
                  buildingHere={buildingHere}
                  cellSize={CELL_SIZE}
                />
              </group>

              {!tutorialOpen &&
                deletedMode &&
                !rotationMode &&
                buildingHere &&
                canDeleteBuilding(x, z) && (
                  <group position={[0, 1.4, 0]}>
                    <Html center key={`delete-${cameraMode}-${key}`}>
                      <TiDelete
                        size={36}
                        color="red"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteBuilding(x, z);
                        }}
                      />
                    </Html>
                  </group>
                )}
            </group>
          );
        })}

        {!tutorialOpen &&
          expandMode &&
          expansionCells.map(({ x, z, cost }) => (
            <group
              key={`expand-${x}:${z}`}
              position={[x * CELL_SIZE, 0.6, z * CELL_SIZE]}
            >
              <Html center key={`expand-${cameraMode}-${x}:${z}`}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pointerEvents: "auto",
                  }}
                >
                  <div
                    style={{
                      marginBottom: 4,
                      padding: "2px 6px",
                      background: "rgba(0,0,0,0.7)",
                      color: "white",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    −{cost} 💰
                  </div>

                  <IoIosAddCircle
                    size={32}
                    color="lime"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExpand(x, z, cost);
                    }}
                  />
                </div>
              </Html>
            </group>
          ))}
      </Canvas>

      <GameHUD
        money={money}
        selectedBuilding={selectedBuilding}
        onSelectBuilding={setSelectedBuilding}
        expandMode={expandMode}
        onToggleExpandMode={handleToggleExpandMode}
        deletedMode={deletedMode}
        onToggleDeletedMode={handleToggleDeletedMode}
        onOpenTutorial={handleOpenTutorial}
        onRestart={handleRestartGame}
        cameraMode={cameraMode}
        onToggleCameraMode={handleToggleCameraMode}
        rotationMode={rotationMode}
        onToggleRotationMode={handleToggleRotationMode}
      />

      <Tutorial isOpen={tutorialOpen} onClose={handleCloseTutorial} />
    </div>
  );
};
