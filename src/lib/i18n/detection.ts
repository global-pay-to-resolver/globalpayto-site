import {
  defaultLocale,
  isSupportedLocale,
  normalizeLocale,
  type SupportedLocale,
} from "@/lib/i18n/config";

export const localeCookieName = "mypaytag.locale";

const countryHeaderNames = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "x-country-code",
] as const;

export function detectLocaleFromRequestHeaders(
  requestHeaders: Headers,
): SupportedLocale {
  const cookieLocale = readLocaleCookie(requestHeaders.get("cookie"));

  if (cookieLocale) {
    return cookieLocale;
  }

  for (const headerName of countryHeaderNames) {
    const country = requestHeaders.get(headerName);

    if (country?.toUpperCase() === "SE") {
      return "sv";
    }
  }

  const acceptLanguage = requestHeaders.get("accept-language");

  if (acceptLanguage) {
    const preferredLocale = parseAcceptedLanguages(acceptLanguage).find((locale) => {
      return locale === "sv" || locale.toLowerCase() === "sv-se";
    });

    if (preferredLocale) {
      return "sv";
    }
  }

  return defaultLocale;
}

function readLocaleCookie(cookieHeader: string | null): SupportedLocale | null {
  if (!cookieHeader) {
    return null;
  }

  const localeCookie = cookieHeader
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${localeCookieName}=`));

  if (!localeCookie) {
    return null;
  }

  const value = decodeURIComponent(localeCookie.split("=").slice(1).join("="));

  return isSupportedLocale(value) ? normalizeLocale(value) : null;
}

function parseAcceptedLanguages(header: string) {
  return header
    .split(",")
    .map((entry) => {
      const [locale, quality] = entry.trim().split(";q=");

      return {
        locale: locale.trim(),
        quality: quality ? Number.parseFloat(quality) : 1,
      };
    })
    .filter((entry) => entry.locale.length > 0)
    .sort((left, right) => right.quality - left.quality)
    .map((entry) => entry.locale);
}
