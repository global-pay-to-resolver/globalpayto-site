"use client";

import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import { getClientI18n } from "@/lib/i18n/client";

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  return <I18nextProvider i18n={getClientI18n()}>{children}</I18nextProvider>;
}
