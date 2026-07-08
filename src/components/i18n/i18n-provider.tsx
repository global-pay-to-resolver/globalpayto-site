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
}

interface LocaleContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

const localeStorageKey = "mypaytag.locale.fixture";

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function I18nProvider({ children }: I18nProviderProps) {
  const i18n = getClientI18n();
  const [locale, setLocaleState] = useState<SupportedLocale>(defaultLocale);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(localeStorageKey);

    if (storedLocale && isSupportedLocale(storedLocale)) {
      setLocaleState(storedLocale);
      void i18n.changeLanguage(storedLocale);
      document.documentElement.lang = storedLocale;
    }
  }, [i18n]);

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
