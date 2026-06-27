export type MockCredential = "developer" | "user";

export interface MockSession {
  credential: MockCredential;
}

export const mockSessionStorageKey = "mypaytag.mockSession";

export function credentialLabel(credential: MockCredential) {
  return credential === "developer" ? "Developer credential" : "User credential";
}
