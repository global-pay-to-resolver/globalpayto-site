"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLocale, type SupportedLocale } from "@/lib/i18n/config";
import { translationNamespaces } from "@/lib/i18n/namespaces";
import { resources } from "@/lib/i18n/resources";

export function getClientI18n(initialLocale: SupportedLocale = defaultLocale) {
  if (!i18next.isInitialized) {
    void i18next.use(initReactI18next).init({
      defaultNS: "common",
      fallbackLng: defaultLocale,
      interpolation: {
        escapeValue: false,
      },
      lng: initialLocale,
      resources,
      ns: translationNamespaces,
      supportedLngs: Object.keys(resources),
    });
  }

  return i18next;
}
