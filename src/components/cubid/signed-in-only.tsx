"use client";

import {
  CubidSignInButton,
  CubidSignOutButton,
  useOptionalCubidAuth,
} from "@cubid/auth-react";
import { CheckCircle2, LoaderCircle, LogIn, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { missingCubidPublicConfig } from "@/lib/cubid/public-config";

interface SignedInOnlyProps {
  children: ReactNode;
  description: string;
  title: string;
}

export function SignedInOnly({ children, description, title }: SignedInOnlyProps) {
  const auth = useOptionalCubidAuth();
  const missing = missingCubidPublicConfig();

  if (missing.length > 0 || !auth) {
    return (
      <AccessPanel
        description="Cubid sign-in is not configured for this browser build yet."
        detail={`Missing browser-safe config: ${missing.join(", ") || "Cubid auth provider"}`}
        title="Sign in with Cubid is unavailable"
      />
    );
  }

  if (auth.status === "idle" || auth.status === "loading") {
    return (
      <AccessPanel
        description="Checking your Cubid session before showing this page."
        title="Checking sign-in"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#586250]">
          <LoaderCircle className="animate-spin" size={17} aria-hidden="true" />
          {auth.status}
        </span>
      </AccessPanel>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <AccessPanel
        description={description}
        detail={auth.error?.message}
        title={title}
      >
        <CubidSignInButton className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#176b46] px-5 text-sm font-semibold text-white transition hover:bg-[#12583a] disabled:bg-[#aeb8a6]">
          <LogIn size={17} aria-hidden="true" />
          Sign in with Cubid
        </CubidSignInButton>
      </AccessPanel>
    );
  }

  return (
    <>
      <div className="border-b border-[#d9dfd1] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 text-sm lg:px-8">
          <span className="inline-flex items-center gap-2 font-semibold text-[#176b46]">
            <CheckCircle2 size={17} aria-hidden="true" />
            Signed in with Cubid
          </span>
          <CubidSignOutButton className="inline-flex h-9 items-center justify-center rounded-md border border-[#cbd4c3] bg-white px-3 text-sm font-semibold text-[#2c3429] transition hover:bg-[#f1f4ec]">
            Sign out
          </CubidSignOutButton>
        </div>
      </div>
      {children}
    </>
  );
}

function AccessPanel({
  children,
  description,
  detail,
  title,
}: {
  children?: ReactNode;
  description: string;
  detail?: string;
  title: string;
}) {
  return (
    <main className="min-h-screen bg-[#f7f8f4] px-6 py-12 text-[#151713]">
      <section className="mx-auto max-w-lg rounded-lg border border-[#d9dfd1] bg-white p-6 shadow-sm">
        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#e4f2e6] text-[#176b46]">
          <ShieldCheck size={23} aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold leading-tight">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-[#586250]">{description}</p>
        {detail ? (
          <p className="mt-4 rounded-md border border-[#e4d4a1] bg-[#fffbea] p-3 text-sm leading-6 text-[#665313]">
            {detail}
          </p>
        ) : null}
        {children ? <div className="mt-5">{children}</div> : null}
      </section>
    </main>
  );
}
