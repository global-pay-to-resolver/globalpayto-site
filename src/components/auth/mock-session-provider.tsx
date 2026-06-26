"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  mockSessionStorageKey,
  type MockCredential,
  type MockSession,
} from "@/lib/mock-session";

interface MockSessionContextValue {
  isLoaded: boolean;
  session: MockSession | null;
  signIn: (credential: MockCredential) => void;
  signOut: () => void;
}

const MockSessionContext = createContext<MockSessionContextValue | null>(null);
const mockSessionEventName = "globalpayto:mock-session";

export function MockSessionProvider({ children }: { children: ReactNode }) {
  const credential = useSyncExternalStore(
    subscribeToMockSession,
    readMockCredential,
    () => null,
  );
  const session = useMemo<MockSession | null>(
    () => (credential ? { credential } : null),
    [credential],
  );

  const value = useMemo<MockSessionContextValue>(
    () => ({
      isLoaded: true,
      session,
      signIn: (credential) => {
        window.localStorage.setItem(mockSessionStorageKey, credential);
        window.dispatchEvent(new Event(mockSessionEventName));
      },
      signOut: () => {
        window.localStorage.removeItem(mockSessionStorageKey);
        window.dispatchEvent(new Event(mockSessionEventName));
      },
    }),
    [session],
  );

  return (
    <MockSessionContext.Provider value={value}>
      {children}
    </MockSessionContext.Provider>
  );
}

function readMockCredential(): MockCredential | null {
  const raw = window.localStorage.getItem(mockSessionStorageKey);
  if (raw === "developer" || raw === "user") return raw;
  return null;
}

function subscribeToMockSession(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(mockSessionEventName, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(mockSessionEventName, onStoreChange);
  };
}

export function useMockSession() {
  const context = useContext(MockSessionContext);
  if (!context) {
    throw new Error("MockSessionProvider is missing.");
  }

  return context;
}
