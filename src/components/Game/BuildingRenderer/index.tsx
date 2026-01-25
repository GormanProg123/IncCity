import { BUILDINGS } from "../../../types/building";
import { FiveFloorHouse } from "../Buildings/Houses/fivefloor";
import { NineFloorHouse } from "../Buildings/Houses/ninefloor";
import { Hotel } from "../Buildings/Houses/hotel";
import { Factory } from "../Buildings/Production/Factory";
import { SuperMarket } from "../Buildings/Malls/Supermarket";
import { Hospital } from "../Buildings/Goverment/Hospital";
import { School } from "../Buildings/Science/School";
import { University } from "../Buildings/Science/University";
import { PoliceStation } from "../Buildings/Goverment/Police";
import { Restaurant } from "../Buildings/Malls/Restaurant";
import { Cinema } from "../Buildings/Fun/Сinema";
import { Bank } from "../Buildings/Goverment/Bank";
import { FireStation } from "../Buildings/Goverment/FireStation";

interface BuildingRendererProps {
  buildingHere: string | null;
  cellSize: number;
}

export const BuildingRenderer = ({
  buildingHere,
  cellSize,
}: BuildingRendererProps) => {
  if (buildingHere === "five-floor") {
    return (
      <FiveFloorHouse
        floors={BUILDINGS["five-floor"].floors}
        cellSize={cellSize}
      />
    );
  }

  if (buildingHere === "nine-floor") {
    return (
      <NineFloorHouse
        floors={BUILDINGS["nine-floor"].floors}
        cellSize={cellSize}
      />
    );
  }

  if (buildingHere === "hotel") {
    return <Hotel floors={BUILDINGS["hotel"].floors} cellSize={cellSize} />;
  }

  if (buildingHere === "factory") {
    return <Factory cellSize={cellSize} />;
  }

  if (buildingHere === "supermarket") {
    return <SuperMarket cellSize={cellSize} />;
  }

  if (buildingHere === "hospital") {
    return <Hospital cellSize={cellSize} />;
  }

  if (buildingHere === "school") {
    return <School floors={BUILDINGS["school"].floors} cellSize={cellSize} />;
  }

  if (buildingHere === "university") {
    return (
      <University floors={BUILDINGS["university"].floors} cellSize={cellSize} />
    );
  }

  if (buildingHere === "police-station") {
    return (
      <PoliceStation
        floors={BUILDINGS["police-station"].floors}
        cellSize={cellSize}
      />
    );
  }

  if (buildingHere === "restaurant") {
    return <Restaurant cellSize={cellSize} />;
  }

  if (buildingHere === "cinema") {
    return <Cinema cellSize={cellSize} />;
  }

  if (buildingHere === "bank") {
    return <Bank cellSize={cellSize} />;
  }

  if (buildingHere === "fire-station") {
    return (
      <FireStation
        floors={BUILDINGS["fire-station"].floors}
        cellSize={cellSize}
      />
    );
  }

  return null;
};
