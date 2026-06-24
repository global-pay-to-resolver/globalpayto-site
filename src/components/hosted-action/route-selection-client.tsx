"use client";

import { CheckCircle2, Circle, GitBranch, XCircle } from "lucide-react";
import { useState } from "react";

import type { HostedActionState, RouteSelectionAction } from "@/lib/mock-actions";

interface RouteSelectionClientProps {
  action: RouteSelectionAction;
  submitUrl: string;
}

const stateCopy: Record<HostedActionState, { title: string; body: string }> = {
  ready: {
    title: "Choose a payment route",
    body: "Pick the wallet app this paying app should use for this route.",
  },
  approved: {
    title: "Authorization approved",
    body: "The requested authorization was approved.",
  },
  denied: {
    title: "No route change made",
    body: "Your existing payment preferences were not changed.",
  },
  selected_route: {
    title: "Route preference saved",
    body: "This app can now use the selected route for matching payment intents.",
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
    body: "Open a fresh route-selection link from the requesting app.",
  },
};

export function RouteSelectionClient({ action, submitUrl }: RouteSelectionClientProps) {
  const [state, setState] = useState<HostedActionState>(action.state);
  const [selectedId, setSelectedId] = useState(action.currentDefaultId);
  const [pending, setPending] = useState(false);
  const copy = stateCopy[state];
  const isReady = state === "ready";
  const selectedOption = action.options.find((option) => option.id === selectedId);

  async function submit(decision: "select_route" | "leave_unchanged") {
    setPending(true);
    try {
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ decision, selectedRouteId: selectedId }),
      });
      const result = await response.json() as {
        state?: HostedActionState;
        selectedRouteId?: string;
      };
      if (result.selectedRouteId) setSelectedId(result.selectedRouteId);
      setState(result.state ?? "restart_required");
    } catch {
      setState("restart_required");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-5 py-8 text-[#151713] sm:px-8">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg border border-[#d9dfd1] bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#e5eef8] text-[#245c8d]">
            <GitBranch size={24} aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold leading-tight text-[#111611] sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-[#586250]">{copy.body}</p>
          <dl className="mt-8 grid gap-4 text-sm">
            <div>
              <dt className="font-semibold text-[#151713]">Paying app</dt>
              <dd className="mt-1 text-[#586250]">{action.payingDappName}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#151713]">Pay-to identifier</dt>
              <dd className="mt-1 text-[#586250]">{action.maskedIdentifier}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#151713]">Route</dt>
              <dd className="mt-1 text-[#586250]">{action.routeLabel}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-[#d9dfd1] bg-[#fbfcf8] p-5 shadow-sm">
          <div className="grid gap-3">
            {isReady && action.options.length > 0 ? (
              action.options.map((option) => {
                const selected = selectedId === option.id;

                return (
                  <button
                    className="grid grid-cols-[auto_1fr] gap-4 rounded-md border border-[#dfe5d7] bg-white p-4 text-left transition hover:border-[#b9c7ad] disabled:opacity-70"
                    key={option.id}
                    onClick={() => setSelectedId(option.id)}
                    type="button"
                  >
                    <span className="mt-1 text-[#176b46]">
                      {selected ? (
                        <CheckCircle2 size={20} aria-hidden="true" />
                      ) : (
                        <Circle size={20} aria-hidden="true" />
                      )}
                    </span>
                    <span>
                      <span className="block text-base font-semibold text-[#151713]">
                        {option.name}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-[#586250]">
                        {option.detail}
                      </span>
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="rounded-md border border-[#dfe5d7] bg-white p-5">
                <p className="text-sm leading-6 text-[#586250]">
                  Route options are hidden for this action state.
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 rounded-md bg-[#f2f5ed] p-4 text-sm leading-6 text-[#4f5a49]">
            {selectedOption
              ? `${selectedOption.name} will be used only for this paying app, identifier, route, and asset.`
              : "No route details are available for this action state."}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#176b46] px-5 text-sm font-semibold text-white transition hover:bg-[#12583a] disabled:bg-[#aeb8a6]"
              disabled={!isReady || !selectedId || pending}
              onClick={() => void submit("select_route")}
              type="button"
            >
              <CheckCircle2 size={18} aria-hidden="true" />
              Save route
            </button>
            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#cbd4c3] bg-white px-5 text-sm font-semibold text-[#2c3429] transition hover:bg-[#f1f4ec] disabled:text-[#9aa493]"
              disabled={!isReady || pending}
              onClick={() => void submit("leave_unchanged")}
              type="button"
            >
              <XCircle size={18} aria-hidden="true" />
              Leave unchanged
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
