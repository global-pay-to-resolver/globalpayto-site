"use client";

import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";
import { useState } from "react";

import type { HostedActionState, SetupAction } from "@/lib/mock-actions";

interface SetupActionClientProps {
  action: SetupAction;
  submitUrl: string;
}

const stateCopy: Record<HostedActionState, { title: string; body: string }> = {
  ready: {
    title: "Review payment authorization",
    body: "Only the details needed for this action are shown.",
  },
  approved: {
    title: "Authorization approved",
    body: "The requesting app can continue with this scoped payment flow.",
  },
  denied: {
    title: "Authorization declined",
    body: "No payment route was changed.",
  },
  selected_route: {
    title: "Route selected",
    body: "The selected route can be used for this scoped payment flow.",
  },
  expired: {
    title: "This link expired",
    body: "Restart from the app that sent you here.",
  },
  invalid: {
    title: "This link cannot be used",
    body: "Restart from the app that sent you here.",
  },
  completed: {
    title: "This action is complete",
    body: "There is nothing else to do here.",
  },
  restart_required: {
    title: "Restart required",
    body: "Open a fresh setup link from the requesting app.",
  },
};

export function SetupActionClient({ action, submitUrl }: SetupActionClientProps) {
  const [state, setState] = useState<HostedActionState>(action.state);
  const [pending, setPending] = useState(false);
  const copy = stateCopy[state];
  const isReady = state === "ready";

  async function submit(decision: "approve" | "deny") {
    setPending(true);
    try {
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ decision }),
      });
      const result = await response.json() as { state?: HostedActionState };
      setState(result.state ?? "restart_required");
    } catch {
      setState("restart_required");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-5 py-8 text-[#151713] sm:px-8">
      <section className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between rounded-lg border border-[#d9dfd1] bg-white p-6 shadow-sm">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#e4f2e6] text-[#176b46]">
              <ShieldCheck size={24} aria-hidden="true" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold leading-tight text-[#111611] sm:text-4xl">
              {copy.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-[#586250]">{copy.body}</p>
          </div>
          <p className="mt-8 text-sm leading-6 text-[#6d7667]">
            GlobalPayTo shows action details only after a safe hosted-action state is loaded.
          </p>
        </div>

        <div className="rounded-lg border border-[#d9dfd1] bg-[#fbfcf8] p-5 shadow-sm">
          <div className="rounded-md border border-[#dfe5d7] bg-white p-5">
            <dl className="grid gap-4 text-sm">
              <div>
                <dt className="font-semibold text-[#151713]">Requesting app</dt>
                <dd className="mt-1 text-[#586250]">{action.dappName}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#151713]">App role</dt>
                <dd className="mt-1 text-[#586250]">{action.dappRole}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#151713]">Pay-to identifier</dt>
                <dd className="mt-1 text-[#586250]">{action.maskedIdentifier}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#151713]">Scope</dt>
                <dd className="mt-1 text-[#586250]">{action.requestedScope}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#151713]">Expires</dt>
                <dd className="mt-1 text-[#586250]">{action.expiresAt}</dd>
              </div>
            </dl>
            <p className="mt-5 rounded-md bg-[#f2f5ed] p-4 text-sm leading-6 text-[#4f5a49]">
              {action.summary}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#176b46] px-5 text-sm font-semibold text-white transition hover:bg-[#12583a] disabled:bg-[#aeb8a6]"
              disabled={!isReady || pending}
              onClick={() => void submit("approve")}
              type="button"
            >
              <CheckCircle2 size={18} aria-hidden="true" />
              Approve
            </button>
            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#cbd4c3] bg-white px-5 text-sm font-semibold text-[#2c3429] transition hover:bg-[#f1f4ec] disabled:text-[#9aa493]"
              disabled={!isReady || pending}
              onClick={() => void submit("deny")}
              type="button"
            >
              <XCircle size={18} aria-hidden="true" />
              Decline
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
