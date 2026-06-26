"use client";

import {
  Clock3,
  Copy,
  KeyRound,
  MailPlus,
  RefreshCw,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useMockSession } from "@/components/auth/mock-session-provider";
import { SignedInOnly } from "@/components/cubid/signed-in-only";

const appHistory = [
  {
    event: "Resolve request",
    detail: "Base USDC route returned two receive options",
    time: "2026-06-24 15:02 UTC",
  },
  {
    event: "Intent created",
    detail: "TreasuryDesk created a 125.00 USDT intent",
    time: "2026-06-24 14:50 UTC",
  },
  {
    event: "Route selected",
    detail: "SmarTrust Wallet set as default for Base USDC",
    time: "2026-06-23 18:43 UTC",
  },
];

export function DeveloperConsole() {
  const { session } = useMockSession();
  const [apiKeyVersion, setApiKeyVersion] = useState(1);
  const [invites, setInvites] = useState(["maya@example.test"]);
  const [email, setEmail] = useState("");

  const apiKey = useMemo(
    () => `gptr_dev_${String(apiKeyVersion).padStart(2, "0")}_••••_mock_key`,
    [apiKeyVersion],
  );

  function inviteDeveloper() {
    const nextEmail = email.trim();
    if (!nextEmail) return;
    setInvites((current) => [nextEmail, ...current]);
    setEmail("");
  }

  return (
    <SignedInOnly
      description="Developer tools are available after signing in as a developer from the header."
      title="Sign in as a developer"
    >
      {session?.credential !== "developer" ? (
        <main className="min-h-screen bg-[#f7f8f4] px-6 py-12 text-[#151713]">
          <section className="mx-auto max-w-lg rounded-lg border border-[#d9dfd1] bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold">Developer login required</h1>
            <p className="mt-3 text-sm leading-6 text-[#586250]">
              Use the header menu to sign out, then log in as a developer to
              access API keys, developer invites, and app history.
            </p>
          </section>
        </main>
      ) : (
      <main className="min-h-screen bg-[#f7f8f4] text-[#151713]">
        <section className="border-b border-[#d9dfd1] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#176b46]">
              Developer console
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              API access for sending and receiving apps
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#586250]">
              Mock developer account controls for API provisioning, key rotation,
              team access, and recent app history until SIWC is connected.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-6 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="rounded-lg border border-[#d9dfd1] bg-white p-5">
            <div className="flex items-center gap-3">
              <KeyRound className="text-[#176b46]" size={22} aria-hidden="true" />
              <h2 className="text-xl font-semibold">Provisioned API</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#586250]">
              Your mock developer account has an API key ready for resolver
              requests. Rotate it any time.
            </p>
            <div className="mt-5 rounded-md border border-[#dfe5d7] bg-[#fbfcf8] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#586250]">
                Current key
              </p>
              <p className="mt-2 break-words font-mono text-sm text-[#151713]">{apiKey}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                className="inline-flex h-10 items-center gap-2 rounded-md bg-[#176b46] px-4 text-sm font-semibold text-white transition hover:bg-[#12583a]"
                onClick={() => setApiKeyVersion((version) => version + 1)}
                type="button"
              >
                <RefreshCw size={16} aria-hidden="true" />
                Rotate key
              </button>
              <button
                className="inline-flex h-10 items-center gap-2 rounded-md border border-[#cbd4c3] bg-white px-4 text-sm font-semibold text-[#2c3429] transition hover:bg-[#f1f4ec]"
                type="button"
              >
                <Copy size={16} aria-hidden="true" />
                Copy key
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-[#d9dfd1] bg-white p-5">
            <div className="flex items-center gap-3">
              <UsersRound className="text-[#245c8d]" size={22} aria-hidden="true" />
              <h2 className="text-xl font-semibold">Developer team</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#586250]">
              Invite other developers to the same app account.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                className="h-10 min-w-0 flex-1 rounded-md border border-[#cbd4c3] bg-white px-3 text-sm outline-none focus:border-[#176b46] focus:ring-2 focus:ring-[#dcebdd]"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="developer@example.com"
                type="email"
                value={email}
              />
              <button
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#176b46] px-4 text-sm font-semibold text-white transition hover:bg-[#12583a]"
                onClick={inviteDeveloper}
                type="button"
              >
                <MailPlus size={16} aria-hidden="true" />
                Invite
              </button>
            </div>
            <ul className="mt-5 grid gap-2">
              {invites.map((invite) => (
                <li
                  className="flex items-center gap-2 rounded-md border border-[#dfe5d7] bg-[#fbfcf8] px-3 py-2 text-sm text-[#3f493a]"
                  key={invite}
                >
                  <ShieldCheck size={15} aria-hidden="true" className="text-[#176b46]" />
                  {invite}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
          <div className="rounded-lg border border-[#d9dfd1] bg-white p-5">
            <div className="flex items-center gap-3">
              <Clock3 className="text-[#6a5c1f]" size={22} aria-hidden="true" />
              <h2 className="text-xl font-semibold">Recent app history</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {appHistory.map((item) => (
                <article
                  className="grid gap-2 rounded-md border border-[#dfe5d7] bg-[#fbfcf8] p-4 md:grid-cols-[12rem_1fr]"
                  key={`${item.event}-${item.time}`}
                >
                  <time className="text-sm font-semibold text-[#586250]">{item.time}</time>
                  <div>
                    <h3 className="text-base font-semibold text-[#151713]">{item.event}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#586250]">{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      )}
    </SignedInOnly>
  );
}
