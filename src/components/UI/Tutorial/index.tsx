import { useState } from "react";
import "./styles/tutorial.css";
import { MdSchool, MdClose } from "react-icons/md";
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
import type { TutorialProps } from "../../../types/ui";

export const Tutorial = ({ isOpen, onClose }: TutorialProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "Welcome to City Builder",
      content: (
        <div className="tutorial-content">
          <div className="tutorial-text">
            <h3>Getting Started</h3>
            <p>Welcome to the city building game!</p>
            <ul className="tutorial-list">
              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  💰 You start with <strong>100</strong> initial money
                </div>
                <img
                  src={MoneyInd}
                  alt="Initial money"
                  className="tutorial-image"
                />
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  🏗️ You have an initial territory to build on
                </div>
                <img
                  src={TerritoryPic}
                  alt="Initial territory"
                  className="tutorial-image"
                />
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  🏢 Place buildings on the available cells to develop your city
                </div>
                <img
                  src={BuildOnTerr}
                  alt="Build on territory"
                  className="tutorial-image"
                />
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Building Mechanics",
      content: (
        <div className="tutorial-content">
          <div className="tutorial-text">
            <h3>How to Build</h3>

            <ul className="tutorial-list">
              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  📋 Select a building from the menu
                </div>
                <img
                  src={SelectBuild}
                  alt="Select building"
                  className="tutorial-image"
                />
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  🏛️ Each building has unique characteristics and costs
                </div>
                <img
                  src={EachChar}
                  alt="Building characteristics"
                  className="tutorial-image"
                />
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  💵 Different buildings provide different income
                </div>
                <img
                  src={DifInc}
                  alt="Different income"
                  className="tutorial-image"
                />
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  🗑️ Click the delete button to demolish buildings
                </div>

                <img
                  src={DelBut}
                  alt="Delete button"
                  className="tutorial-image"
                />
                <img
                  src={DelBuild}
                  alt="Building demolished"
                  className="tutorial-image"
                />
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  💸 Demolishing costs money based on the building type
                </div>
                <img
                  src={DemonCost}
                  alt="Demolition cost"
                  className="tutorial-image"
                />
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Expand Your Territory",
      content: (
        <div className="tutorial-content">
          <div className="tutorial-text">
            <h3>Territory Expansion</h3>

            <ul className="tutorial-list">
              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  🗺️ Expand your territory to build more
                </div>
                <img
                  src={Expandbutton}
                  alt="Expand button"
                  className="tutorial-image"
                />
                <img
                  src={PlusExpansion}
                  alt="Available expansion cells"
                  className="tutorial-image"
                />
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  💰 Each expansion costs money
                </div>
                <img
                  src={Costexpansion}
                  alt="Expansion cost"
                  className="tutorial-image"
                />
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  ➕ Use the expand button to see available expansion cells
                </div>
                <img
                  src={ClickButtonExp}
                  alt="Click expand button"
                  className="tutorial-image"
                />
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  📈 More territory = more building possibilities
                </div>
              </li>

              <li className="tutorial-item">
                <div className="tutorial-item-text">
                  🎯 Plan your city growth wisely to maximize income
                </div>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  if (!isOpen) {
    return null;
  }

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-modal">
        <button className="tutorial-close" onClick={onClose}>
          <MdClose size={24} />
        </button>

        <div className="tutorial-header">
          <MdSchool size={32} />
          <h2>{pages[currentPage].title}</h2>
        </div>

        <div className="tutorial-body">{pages[currentPage].content}</div>

        <div className="tutorial-footer">
          <div className="tutorial-dots">
            {pages.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </div>

          <div className="tutorial-buttons">
            <button
              className="tutorial-btn prev"
              onClick={handlePrev}
              disabled={currentPage === 0}
            >
              ← Previous
            </button>
            <button className="tutorial-btn next" onClick={handleNext}>
              {currentPage === pages.length - 1 ? "Start Game" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
