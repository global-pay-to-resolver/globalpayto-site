"use client";

import { useState, useTransition } from "react";
import { DatabaseZap, LoaderCircle, Play } from "lucide-react";

const operations = [
  { label: "Ensure user by email", value: "ensure-user" },
  { label: "Fetch identity", value: "identity" },
  { label: "Fetch stamps", value: "stamps" },
  { label: "Fetch humanity score", value: "score" },
  { label: "Recovery bundle status", value: "recovery-status" },
  { label: "Start recovery release", value: "start-recovery-release" },
] as const;

type Operation = (typeof operations)[number]["value"];

type DemoState =
  | { status: "idle" }
  | { result: unknown; status: "success" }
  | { result: unknown; status: "error" };

export function ServerDemo() {
  const [operation, setOperation] = useState<Operation>("ensure-user");
  const [email, setEmail] = useState("demo@example.com");
  const [userId, setUserId] = useState("");
  const [recoveryBundleId, setRecoveryBundleId] = useState("");
  const [providerKey, setProviderKey] = useState("");
  const [state, setState] = useState<DemoState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  function runDemo() {
    startTransition(async () => {
      const response = await fetch("/api/cubid/server-demo", {
        body: JSON.stringify({
          email,
          operation,
          providerKey,
          recoveryBundleId,
          userId,
        }),
        headers: { "content-type": "application/json" },
        method: "POST",
      });
      const result = (await response.json()) as unknown;

      setState({
        result,
        status: response.ok ? "success" : "error",
      });
    });
  }

  const needsEmail = operation === "ensure-user";
  const needsRecovery =
    operation === "recovery-status" ||
    operation === "start-recovery-release";

  return (
    <section className="rounded-lg border border-[#d9ddd2] bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#dbe9d6] text-[#1f6f50]">
          <DatabaseZap size={20} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Server API demo</h2>
          <p className="mt-2 text-sm leading-6 text-[#596456]">
            These actions run through a Next.js API route using `@cubid/core`.
            Missing server credentials return a safe setup response instead of
            leaking secrets into the browser.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-medium">
          Operation
          <select
            className="h-11 rounded-md border border-[#cfd6c7] bg-white px-3 text-sm outline-none focus:border-[#1f6f50]"
            onChange={(event) => setOperation(event.target.value as Operation)}
            value={operation}
          >
            {operations.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        {needsEmail ? (
          <label className="grid gap-2 text-sm font-medium">
            Email
            <input
              className="h-11 rounded-md border border-[#cfd6c7] px-3 text-sm outline-none focus:border-[#1f6f50]"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="person@example.com"
              type="email"
              value={email}
            />
          </label>
        ) : (
          <label className="grid gap-2 text-sm font-medium">
            Cubid app-scoped user id
            <input
              className="h-11 rounded-md border border-[#cfd6c7] px-3 text-sm outline-none focus:border-[#1f6f50]"
              onChange={(event) => setUserId(event.target.value)}
              placeholder="usr_..."
              value={userId}
            />
          </label>
        )}

        {needsRecovery ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Recovery bundle id
              <input
                className="h-11 rounded-md border border-[#cfd6c7] px-3 text-sm outline-none focus:border-[#1f6f50]"
                onChange={(event) => setRecoveryBundleId(event.target.value)}
                placeholder="optional exact bundle"
                value={recoveryBundleId}
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Provider key
              <input
                className="h-11 rounded-md border border-[#cfd6c7] px-3 text-sm outline-none focus:border-[#1f6f50]"
                onChange={(event) => setProviderKey(event.target.value)}
                placeholder="optional provider"
                value={providerKey}
              />
            </label>
          </div>
        ) : null}

        <button
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1f6f50] px-4 text-sm font-semibold text-white transition hover:bg-[#18593f] disabled:cursor-not-allowed disabled:bg-[#a8b6a1]"
          disabled={isPending}
          onClick={runDemo}
          type="button"
        >
          {isPending ? (
            <LoaderCircle className="animate-spin" size={17} aria-hidden="true" />
          ) : (
            <Play size={17} aria-hidden="true" />
          )}
          Run server call
        </button>
      </div>

      <pre
        className={`mt-5 max-h-[420px] overflow-auto rounded-md border p-4 text-xs leading-5 ${
          state.status === "error"
            ? "border-[#e0b7ad] bg-[#fff7f5] text-[#713022]"
            : "border-[#dce2d6] bg-[#f8faf6] text-[#263026]"
        }`}
      >
        {state.status === "idle"
          ? "Run an operation to see the sanitized server response."
          : JSON.stringify(state.result, null, 2)}
      </pre>
    </section>
  );
}
