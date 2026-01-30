import { useState } from "react";
import "./styles/tutorial.css";
import { MdSchool } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";

import { LanguageSelector } from "../LanguageSelector";
import { getTutorialPages } from "./tutorialPages";

import type { TutorialProps } from "../../../types/ui";

export const Tutorial = ({ isOpen, onClose }: TutorialProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();
  const pages = getTutorialPages(t);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((p) => p + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
    }
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-modal">
        <button className="tutorial-close" onClick={onClose}>
          <IoMdClose className="tutorial-close-icon" />
        </button>

        <div className="tutorial-header">
          <MdSchool size={32} />
          <h2>{pages[currentPage].title}</h2>
        </div>

        <div className="tutorial-body">{pages[currentPage].content}</div>

        <div className="tutorial-language">
          <LanguageSelector />
        </div>

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
              ← {t("tutorial.buttons.previous")}
            </button>

            <button className="tutorial-btn next" onClick={handleNext}>
              {currentPage === pages.length - 1
                ? t("tutorial.buttons.start")
                : `${t("tutorial.buttons.next")} →`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
