"use client";

import type { TOptions } from "i18next";
import { useTranslation } from "react-i18next";

import type {
  TranslationKey,
  TranslationNamespace,
} from "@/lib/i18n/namespaces";

export function useTypedTranslation<N extends TranslationNamespace>(namespace: N) {
  const translation = useTranslation(namespace);

  return {
    ...translation,
    t: (key: TranslationKey<N>, options?: TOptions) =>
      translation.t(key as string, options),
  };
}
