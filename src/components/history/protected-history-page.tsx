"use client";

import { ArrowDownToLine, ArrowUpFromLine, History } from "lucide-react";
import Link from "next/link";

import { SignedInOnly } from "@/components/cubid/signed-in-only";
import { BackButton } from "@/components/navigation/back-button";
import {
  groupIncomingTransactions,
  type IncomingHistoryFilter,
  type IncomingHistoryType,
} from "@/lib/incoming-transactions";

const groupLabels: Array<{ id: IncomingHistoryFilter; label: string }> = [
  { id: "paying-app", label: "Paying app" },
  { id: "payto-app", label: "PayToDapp" },
  { id: "token", label: "Token" },
  { id: "chain", label: "Chain" },
];

const typeLabels: Array<{ id?: IncomingHistoryType; label: string }> = [
  { id: "queries", label: "Queries" },
  { id: "transactions", label: "Transactions" },
  { id: "intents", label: "Intents" },
  { label: "All" },
];

interface ProtectedHistoryPageProps {
  type?: IncomingHistoryType;
  view: IncomingHistoryFilter;
}

export function ProtectedHistoryPage({ type, view }: ProtectedHistoryPageProps) {
  const groups = groupIncomingTransactions(view, type);

  return (
    <SignedInOnly
      description="Incoming transaction history is available after Cubid sign-in."
      title="Sign in to view incoming history"
    >
      <main className="min-h-screen bg-[#f7f8f4] text-[#151713]">
        <BackButton />
        <section className="border-b border-[#d9dfd1] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <Link
              className="text-sm font-semibold text-[#176b46] underline-offset-4 hover:underline"
              href="/"
            >
              MyPayTag
            </Link>
            <div className="mt-5 flex max-w-4xl items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#e5eef8] text-[#245c8d]">
                <History size={23} aria-hidden="true" />
              </span>
              <div>
                <h1 className="text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
                  Incoming transaction history
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-[#586250]">
                  Review payment intents MyPayTag has facilitated, grouped by
                  paying app, PayToDapp, token, or chain.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-4">
              <nav className="flex flex-wrap gap-2" aria-label="History group by">
                {groupLabels.map((filter) => {
                  const active = filter.id === view;

                  return (
                    <Link
                      className={`inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-semibold transition ${
                        active
                          ? "border-[#176b46] bg-[#176b46] text-white"
                          : "border-[#cbd4c3] bg-white text-[#2c3429] hover:bg-[#f1f4ec]"
                      }`}
                      href={historyHref(filter.id, type)}
                      key={filter.id}
                    >
                      {filter.label}
                    </Link>
                  );
                })}
              </nav>
              <nav className="flex flex-wrap gap-2" aria-label="History type">
                {typeLabels.map((filter) => {
                  const active = filter.id === type || (!filter.id && !type);

                  return (
                    <Link
                      className={`inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-semibold transition ${
                        active
                          ? "border-[#245c8d] bg-[#245c8d] text-white"
                          : "border-[#cbd4c3] bg-white text-[#2c3429] hover:bg-[#f1f4ec]"
                      }`}
                      href={historyHref(view, filter.id)}
                      key={filter.label}
                    >
                      {filter.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-6 py-8 lg:px-8">
          {Array.from(groups.entries()).map(([label, transactions]) => (
            <section
              className="rounded-lg border border-[#d9dfd1] bg-white p-5"
              key={label}
            >
              <h2 className="text-xl font-semibold text-[#151713]">{label}</h2>
              <div className="mt-4 grid gap-3">
                {transactions.map((transaction) => (
                  <article
                    className="grid gap-4 rounded-md border border-[#dfe5d7] bg-[#fbfcf8] p-4 lg:grid-cols-2"
                    key={transaction.id}
                  >
                    <div className="lg:col-span-2">
                      <span className="inline-flex rounded-md bg-[#e5eef8] px-2 py-1 text-xs font-semibold capitalize text-[#245c8d]">
                        {transaction.type}
                      </span>
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#245c8d]">
                        <ArrowUpFromLine size={17} aria-hidden="true" />
                        Sent
                      </div>
                      <dl className="grid gap-2 text-sm">
                        <TransactionRow label="Timestamp" value={transaction.sent.timestamp} />
                        <TransactionRow label="Paying app" value={transaction.sent.payingApp} />
                        <TransactionRow label="Value" value={transaction.sent.value} />
                        <TransactionRow label="Token" value={transaction.sent.token} />
                        <TransactionRow label="Chain" value={transaction.sent.chain} />
                      </dl>
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#176b46]">
                        <ArrowDownToLine size={17} aria-hidden="true" />
                        Received
                      </div>
                      <dl className="grid gap-2 text-sm">
                        <TransactionRow label="Timestamp" value={transaction.received.timestamp} />
                        <TransactionRow label="PayToDapp" value={transaction.received.payToApp} />
                        <TransactionRow label="Value" value={transaction.received.value} />
                        <TransactionRow label="Token" value={transaction.received.token} />
                        <TransactionRow label="Chain" value={transaction.received.chain} />
                      </dl>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </section>
      </main>
    </SignedInOnly>
  );
}

function historyHref(view: IncomingHistoryFilter, type?: IncomingHistoryType) {
  const params = new URLSearchParams({ view });
  if (type) params.set("type", type);
  return `/history?${params.toString()}`;
}

function TransactionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[8.5rem_1fr] gap-3">
      <dt className="font-semibold text-[#151713]">{label}</dt>
      <dd className="min-w-0 break-words text-[#586250]">{value}</dd>
    </div>
  );
}
