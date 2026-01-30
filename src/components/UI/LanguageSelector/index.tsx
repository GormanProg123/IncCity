import "./styles/lansel.css";
import { IoLanguage } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../../constants/languages";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setOpen(false);
  };

  return (
    <div className="language-selector" ref={selectorRef}>
      <button
        className="restart-button language-button"
        onClick={() => setOpen(!open)}
      >
        <IoLanguage />
      </button>

      {open && (
        <div className="language-dropdown">
          {LANGUAGES.map((lang) => (
            <div
              key={lang.code}
              className={`language-option ${i18n.language === lang.code ? "active" : ""}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
