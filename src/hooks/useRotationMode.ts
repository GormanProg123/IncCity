import { useCallback, useState } from "react";

interface UseRotationModeProps {
  onSetSelectedCell: (cell: { x: number; z: number } | null) => void;
  onSetDeletedMode: (mode: boolean) => void;
}

export const useRotationMode = ({
  onSetSelectedCell,
  onSetDeletedMode,
}: UseRotationModeProps) => {
  const [rotationMode, setRotationMode] = useState(false);

  const handleToggleRotationMode = useCallback(() => {
    setRotationMode((prev) => {
      if (prev) onSetSelectedCell(null);
      if (!prev) onSetDeletedMode(false);
      return !prev;
    });
  }, [onSetSelectedCell, onSetDeletedMode]);

  const disableRotationMode = useCallback(() => {
    setRotationMode(false);
    onSetSelectedCell(null);
  }, [onSetSelectedCell]);

  return {
    rotationMode,
    handleToggleRotationMode,
    disableRotationMode,
  };
};
