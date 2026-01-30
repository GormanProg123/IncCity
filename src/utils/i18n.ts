import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en/en.json";
import ru from "../locales/ru/ru.json";
import pl from "../locales/pl/pl.json";
import by from "../locales/by/by.json";
import es from "../locales/es/es.json";

const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    pl: { translation: pl },
    by: { translation: by },
    es: { translation: es },
  },
  lng: savedLanguage, //basic language
  fallbackLng: "en", //if we don't have translation for different language, we use english
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
