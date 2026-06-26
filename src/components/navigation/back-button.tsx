"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  fallbackHref?: string;
}

export function BackButton({ fallbackHref = "/" }: BackButtonProps) {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  }

  return (
    <button
      aria-label="Go back"
      className="fixed right-4 top-4 z-50 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#cbd4c3] bg-white px-4 text-sm font-semibold text-[#2c3429] shadow-sm transition hover:bg-[#f1f4ec] focus:outline-none focus:ring-2 focus:ring-[#176b46] focus:ring-offset-2"
      onClick={goBack}
      type="button"
    >
      <ArrowLeft size={17} aria-hidden="true" />
      Back
    </button>
  );
}
