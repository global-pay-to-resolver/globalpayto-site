"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { I18nextProvider } from "react-i18next";

import {
  defaultLocale,
  isSupportedLocale,
  type SupportedLocale,
} from "@/lib/i18n/config";
import { getClientI18n } from "@/lib/i18n/client";

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: SupportedLocale;
}

interface LocaleContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

const localeStorageKey = "mypaytag.locale.fixture";

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function I18nProvider({
  children,
  initialLocale = defaultLocale,
}: I18nProviderProps) {
  const startingLocale = readStoredFixtureLocale(initialLocale);
  const i18n = getClientI18n(startingLocale);
  const [locale, setLocaleState] = useState<SupportedLocale>(startingLocale);

  useEffect(() => {
    void i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
  }, [i18n, locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale(nextLocale) {
        setLocaleState(nextLocale);
        window.localStorage.setItem(localeStorageKey, nextLocale);
        void i18n.changeLanguage(nextLocale);
        document.documentElement.lang = nextLocale;
      },
    }),
    [i18n, locale],
  );

  return (
    <I18nextProvider i18n={i18n}>
      <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
    </I18nextProvider>
  );
}

export function useLocale() {
  const value = useContext(LocaleContext);

  if (!value) {
    throw new Error("useLocale must be used inside I18nProvider.");
  }

  return value;
}

function readStoredFixtureLocale(fallbackLocale: SupportedLocale) {
  if (typeof window === "undefined") {
    return fallbackLocale;
  }

  const storedLocale = window.localStorage.getItem(localeStorageKey);

  return storedLocale && isSupportedLocale(storedLocale)
    ? storedLocale
    : fallbackLocale;
}
