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
import { Html } from "@react-three/drei";
import { IoIosAddCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
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

  const handleToggleCameraMode = () => {
    if (cameraMode === "orbit") {
      setCameraMode("free");
    } else {
      setCameraMode("orbit");
    }
  };

  const handleCellClick = useCallback(
    (x: number, z: number) => {
      if (deletedMode) return;
      if (!selectedBuilding) return;

      buyBuilding(x, z, selectedBuilding);
    },
    [deletedMode, selectedBuilding, buyBuilding],
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
  };

  const handleCloseTutorial = () => {
    setTutorialOpen(false);
    localStorage.setItem("tutorialSeen", "true");
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

          return (
            <group key={key} position={[x * CELL_SIZE, 0, z * CELL_SIZE]}>
              <Cell onClick={() => handleCellClick(x, z)} />
              <Grid color={buildingHere ? "gray" : "white"} />

              <BuildingRenderer
                buildingHere={buildingHere}
                cellSize={CELL_SIZE}
              />

              {deletedMode && buildingHere && canDeleteBuilding(x, z) && (
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

        {expandMode &&
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
        onToggleExpandMode={() => setExpandMode((v) => !v)}
        deletedMode={deletedMode}
        onToggleDeletedMode={() => setDeletedMode((v) => !v)}
        onOpenTutorial={() => setTutorialOpen(true)}
        onRestart={handleRestartGame}
        cameraMode={cameraMode}
        onToggleCameraMode={handleToggleCameraMode}
      />

      <Tutorial isOpen={tutorialOpen} onClose={handleCloseTutorial} />
    </div>
  );
};
