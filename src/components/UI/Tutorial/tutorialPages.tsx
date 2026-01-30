import type { TFunction } from "i18next";
import type { ReactNode } from "react";

import MoneyInd from "../../../assets/Tutorial/GetStart/MoneyInd.png";
import TerritoryPic from "../../../assets/Tutorial/GetStart/TerritoryPic.png";
import BuildOnTerr from "../../../assets/Tutorial/GetStart/BuildOnTerr.png";

import DelBuild from "../../../assets/Tutorial/BuildTutorial/DelBuild.png";
import DelBut from "../../../assets/Tutorial/BuildTutorial/DelBut.png";
import DemonCost from "../../../assets/Tutorial/BuildTutorial/DemonCost.png";
import DifInc from "../../../assets/Tutorial/BuildTutorial/DifInc.png";
import EachChar from "../../../assets/Tutorial/BuildTutorial/EachChar.png";
import SelectBuild from "../../../assets/Tutorial/BuildTutorial/SelectBuild.png";

import Expandbutton from "../../../assets/Tutorial/Territorial/Expandbutton.png";
import PlusExpansion from "../../../assets/Tutorial/Territorial/PlusExpansion.png";
import Costexpansion from "../../../assets/Tutorial/Territorial/Costexpansion.png";
import ClickButtonExp from "../../../assets/Tutorial/Territorial/ClickButtonExp.png";

import "./styles/tutorial-pages.css";

export type TutorialPage = {
  title: string;
  content: ReactNode;
};

export function getTutorialPages(t: TFunction): TutorialPage[] {
  return [
    {
      title: t("tutorial.pages.welcome.title"),
      content: (
        <div className="tutorial-content">
          <div className="tutorial-text">
            <h3>{t("tutorial.pages.welcome.subtitle")}</h3>
            <p>{t("tutorial.pages.welcome.intro")}</p>

            <ul className="tutorial-list">
              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  💰 {t("tutorial.pages.welcome.money")}
                </div>
                <div className="tutorial-image-wrapper">
                  <img src={MoneyInd} alt="" className="tutorial-image" />
                </div>
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  🏗️ {t("tutorial.pages.welcome.territory")}
                </div>
                <div className="tutorial-image-wrapper">
                  <img src={TerritoryPic} alt="" className="tutorial-image" />
                </div>
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  🏢 {t("tutorial.pages.welcome.build")}
                </div>
                <div className="tutorial-image-wrapper">
                  <img src={BuildOnTerr} alt="" className="tutorial-image" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      title: t("tutorial.pages.building.title"),
      content: (
        <div className="tutorial-content">
          <div className="tutorial-text">
            <h3>{t("tutorial.pages.building.subtitle")}</h3>

            <ul className="tutorial-list">
              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  📋 {t("tutorial.pages.building.select")}
                </div>
                <div className="tutorial-image-wrapper">
                  <img src={SelectBuild} alt="" className="tutorial-image" />
                </div>
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  🏛️ {t("tutorial.pages.building.characteristics")}
                </div>
                <div className="tutorial-image-wrapper">
                  <img src={EachChar} alt="" className="tutorial-image" />
                </div>
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  💵 {t("tutorial.pages.building.income")}
                </div>
                <div className="tutorial-image-wrapper">
                  <img src={DifInc} alt="" className="tutorial-image" />
                </div>
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  🗑️ {t("tutorial.pages.building.delete")}
                </div>
                <div className="tutorial-image-wrapper">
                  <img src={DelBut} alt="" className="tutorial-image" />
                </div>
                <div className="tutorial-image-wrapper">
                  <img src={DelBuild} alt="" className="tutorial-image" />
                </div>
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  💸 {t("tutorial.pages.building.demolishCost")}
                </div>
                <div className="tutorial-image-wrapper">
                  <img src={DemonCost} alt="" className="tutorial-image" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      title: t("tutorial.pages.expansion.title"),
      content: (
        <div className="tutorial-content">
          <div className="tutorial-text">
            <h3>{t("tutorial.pages.expansion.subtitle")}</h3>

            <ul className="tutorial-list">
              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  🗺️ {t("tutorial.pages.expansion.expand")}
                </div>
                <div className="tutorial-image-wrapper">
                  <img src={Expandbutton} alt="" className="tutorial-image" />
                </div>
                <div className="tutorial-image-wrapper">
                  <img src={PlusExpansion} alt="" className="tutorial-image" />
                </div>
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  💰 {t("tutorial.pages.expansion.cost")}
                </div>
                <div className="tutorial-image-wrapper">
                  <img src={Costexpansion} alt="" className="tutorial-image" />
                </div>
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  ➕ {t("tutorial.pages.expansion.useButton")}
                </div>
                <div className="tutorial-image-wrapper">
                  <img src={ClickButtonExp} alt="" className="tutorial-image" />
                </div>
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  📈 {t("tutorial.pages.expansion.moreTerritory")}
                </div>
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  🎯 {t("tutorial.pages.expansion.plan")}
                </div>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];
}
