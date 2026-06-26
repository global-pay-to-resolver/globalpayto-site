"use client";

import Link from "next/link";
import { CubidAuthCallback, CubidAuthProvider } from "@cubid/auth-react";

import { BackButton } from "@/components/navigation/back-button";

const publicConfig = {
  clientId: process.env.NEXT_PUBLIC_CUBID_OIDC_CLIENT_ID ?? "",
  issuer: process.env.NEXT_PUBLIC_CUBID_ISSUER_URL ?? "",
  redirectUri: process.env.NEXT_PUBLIC_CUBID_REDIRECT_URI ?? "",
};

export default function CubidCallbackPage() {
  const isConfigured =
    publicConfig.clientId && publicConfig.issuer && publicConfig.redirectUri;

  if (!isConfigured) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f6f7f4] px-6 py-6 text-[#141914]">
        <BackButton desktopPadding="0rem" maxWidth="32rem" />
        <section className="w-full max-w-lg rounded-lg border border-[#d9ddd2] bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Cubid callback</h1>
          <p className="mt-3 text-sm leading-6 text-[#596456]">
            Add the browser-safe OIDC values from `.env.example` before using
            the callback route.
          </p>
          <Link
            className="mt-5 inline-flex h-10 items-center rounded-md bg-[#1f6f50] px-4 text-sm font-semibold text-white"
            href="/"
          >
            Back to starter
          </Link>
        </section>
      </main>
    );
  }

  return (
    <CubidAuthProvider
      autoUserInfo
      clientId={publicConfig.clientId}
      issuer={publicConfig.issuer}
      redirectUri={publicConfig.redirectUri}
    >
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f6f7f4] px-6 py-6 text-[#141914]">
        <BackButton desktopPadding="0rem" maxWidth="32rem" />
        <section className="w-full max-w-lg rounded-lg border border-[#d9ddd2] bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Completing Cubid sign-in</h1>
          <div className="mt-4 rounded-md border border-[#dce2d6] bg-[#f8faf6] p-4 text-sm leading-6">
            <CubidAuthCallback
              loadingFallback="Reading the Cubid callback..."
              successFallback={
                <div>
                  <p>Cubid sign-in is complete.</p>
                  <Link
                    className="mt-3 inline-flex font-semibold text-[#1f6f50] underline-offset-4 hover:underline"
                    href="/"
                  >
                    Return to the starter
                  </Link>
                </div>
              }
            />
          </div>
        </section>
      </main>
    </CubidAuthProvider>
  );
}
