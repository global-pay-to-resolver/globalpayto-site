"use client";

import { LoaderCircle, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { useMockSession } from "@/components/auth/mock-session-provider";
import { credentialLabel } from "@/lib/mock-session";

interface SignedInOnlyProps {
  children: ReactNode;
  description: string;
  title: string;
}

export function SignedInOnly({ children, description, title }: SignedInOnlyProps) {
  const { isLoaded, session } = useMockSession();

  if (!isLoaded) {
    return (
      <AccessPanel
        description="Checking your mock session before showing this page."
        title="Checking sign-in"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#586250]">
          <LoaderCircle className="animate-spin" size={17} aria-hidden="true" />
          Loading
        </span>
      </AccessPanel>
    );
  }

  if (!session) {
    return (
      <AccessPanel
        description={description}
        title={title}
        detail="Use the Sign in menu in the header. This is a temporary mock gate until SIWC is connected."
      />
    );
  }

  return (
    <>
      <div className="sr-only">Signed in with {credentialLabel(session.credential)}</div>
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
