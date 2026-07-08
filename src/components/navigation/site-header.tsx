"use client";

import { CheckCircle2, ChevronDown, Code2, Github, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useMockSession } from "@/components/auth/mock-session-provider";
import { useTypedTranslation } from "@/lib/i18n/use-typed-translation";
import { credentialLabel, type MockCredential } from "@/lib/mock-session";

export function SiteHeader() {
  const { t: tButton } = useTypedTranslation("buttons");
  const { t: tCommon } = useTypedTranslation("common");
  const { t: tNav } = useTypedTranslation("navigation");
  const { isLoaded, session, signIn, signOut } = useMockSession();
  const [open, setOpen] = useState(false);

  function login(credential: MockCredential) {
    signIn(credential);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#d9dfd1] bg-[#fbfcf8]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link className="text-base font-semibold text-[#121612]" href="/">
          MyPayTag
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[#4f5a49]">
          <Link className="hover:text-[#176b46]" href="/#tracks">
            {tNav("tracks")}
          </Link>
          <Link className="hover:text-[#176b46]" href="/blog">
            {tNav("blog")}
          </Link>
          <Link className="hover:text-[#176b46]" href="/enter-paytag">
            {tNav("enterPaytag")}
          </Link>
          <Link className="hover:text-[#176b46]" href="/api-docs">
            {tNav("apiDocs")}
          </Link>
          <Link className="hover:text-[#176b46]" href="/api-playground">
            {tNav("playground")}
          </Link>
          <Link className="hover:text-[#176b46]" href="/reference">
            {tNav("reference")}
          </Link>
          <Link className="hover:text-[#176b46]" href="/history">
            {tNav("history")}
          </Link>
          <a
            className="inline-flex items-center gap-1.5 hover:text-[#176b46]"
            href="https://github.com/myPayTag"
            rel="noreferrer"
            target="_blank"
          >
            <Github size={15} aria-hidden="true" />
            {tNav("github")}
          </a>
          {session?.credential === "developer" ? (
            <Link className="hover:text-[#176b46]" href="/developer">
              {tNav("developer")}
            </Link>
          ) : null}
        </nav>

        <div className="relative">
          {session ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex h-9 items-center gap-2 rounded-md border border-[#b9c7ad] bg-[#eef7ef] px-3 text-sm font-semibold text-[#176b46]">
                <CheckCircle2 size={16} aria-hidden="true" />
                <span className="sr-only">
                  {tNav("signedInAs", { credential: credentialLabel(session.credential) })}
                </span>
                {credentialLabel(session.credential)}
              </span>
              <button
                className="inline-flex h-9 items-center gap-2 rounded-md border border-[#cbd4c3] bg-white px-3 text-sm font-semibold text-[#2c3429] transition hover:bg-[#f1f4ec]"
                onClick={signOut}
                type="button"
              >
                <LogOut size={15} aria-hidden="true" />
                {tButton("signOut")}
              </button>
            </div>
          ) : (
            <>
              <button
                className="inline-flex h-9 items-center gap-2 rounded-md bg-[#176b46] px-4 text-sm font-semibold text-white transition hover:bg-[#12583a] disabled:bg-[#aeb8a6]"
                disabled={!isLoaded}
                onClick={() => setOpen((current) => !current)}
                type="button"
              >
                {tButton("signIn")}
                <ChevronDown size={15} aria-hidden="true" />
              </button>
              {open ? (
                <div className="absolute left-0 mt-2 w-60 rounded-md border border-[#d9dfd1] bg-white p-2 shadow-lg sm:left-auto sm:right-0">
                  <button
                    className="flex w-full items-start gap-3 rounded-md px-3 py-3 text-left transition hover:bg-[#f1f4ec]"
                    onClick={() => login("user")}
                    type="button"
                  >
                    <UserRound className="mt-0.5 text-[#176b46]" size={18} aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-semibold text-[#121612]">
                        {tNav("loginUser")}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[#586250]">
                        {tNav("loginUserDescription")}
                      </span>
                    </span>
                  </button>
                  <button
                    className="flex w-full items-start gap-3 rounded-md px-3 py-3 text-left transition hover:bg-[#f1f4ec]"
                    onClick={() => login("developer")}
                    type="button"
                  >
                    <Code2 className="mt-0.5 text-[#245c8d]" size={18} aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-semibold text-[#121612]">
                        {tNav("loginDeveloper")}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[#586250]">
                        {tNav("loginDeveloperDescription")}
                      </span>
                    </span>
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
