export const cubidPublicConfig = {
  clientId: process.env.NEXT_PUBLIC_CUBID_OIDC_CLIENT_ID ?? "",
  issuer: process.env.NEXT_PUBLIC_CUBID_ISSUER_URL ?? "",
  redirectUri: process.env.NEXT_PUBLIC_CUBID_REDIRECT_URI ?? "",
};

export function missingCubidPublicConfig() {
  return Object.entries(cubidPublicConfig)
    .filter(([, value]) => !value.trim())
    .map(([key]) => key);
}
