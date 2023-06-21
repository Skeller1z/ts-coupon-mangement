import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from "i18next-http-backend";
import { DateTime } from "luxon";

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //.use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: localStorage.getItem("Lang"),
    lng: localStorage.getItem("Lang"),
    backend: {
      loadPath:
        "https://www.memorybox-store.com/Lang/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      // format: (value, format, lng) => { // legacy usage
      //   if (value instanceof Date) {
      //     return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime[format])
      //   }
      //   return value;
      // }
    },
  });

// new usage
i18n.services.formatter.add("DATE_HUGE", (value, lng, options) => {
  return DateTime.fromJSDate(value)
    .setLocale(lng)
    .toLocaleString(DateTime.DATE_HUGE);
});

/* import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const init = async () => {
  const cna = await fetch("locales/cna/translations.json").then((res) =>
    res.json()
  );
  const rus = await fetch("locales/rus/translations.json").then((res) =>
    res.json()
  );
  const th = await fetch("locales/th/translations.json").then((res) =>
    res.json()
  );
  const en = await fetch("locales/en/translations.json").then((res) =>
    res.json()
  );

  i18n.use(initReactI18next).init({
    fallbackLng: localStorage.getItem("Lang"),
    lng: localStorage.getItem("Lang"),
    resources: {
      en: {
        translations: en,
      },
      th: {
        translations: th,
      },
      rus: {
        translations: rus,
      },
      cna: {
        translations: cna,
      },
    },
    ns: ["translations"],
    defaultNS: "translations",
  });
  i18n.languages = ["en", "th", "rus", "cna"];
};

init(); */

export default i18n;
