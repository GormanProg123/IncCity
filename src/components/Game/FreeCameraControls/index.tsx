import { useFreeCameraControls } from "../../../hooks/useFreeCameraControls";

export const FreeCameraControls = () => {
  useFreeCameraControls();
  return <mesh visible={false} />;
};
