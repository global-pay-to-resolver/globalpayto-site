"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLocale } from "@/lib/i18n/config";

const emptyResources = {
  en: {},
  sv: {},
  "en-XA": {},
};

export function getClientI18n() {
  if (!i18next.isInitialized) {
    void i18next.use(initReactI18next).init({
      defaultNS: "common",
      fallbackLng: defaultLocale,
      interpolation: {
        escapeValue: false,
      },
      lng: defaultLocale,
      resources: emptyResources,
      supportedLngs: Object.keys(emptyResources),
    });
  }

  return i18next;
}
