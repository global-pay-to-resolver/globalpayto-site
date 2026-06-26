import { ArrowDownToLine, ArrowUpFromLine, History } from "lucide-react";
import Link from "next/link";

import {
  groupIncomingTransactions,
  type IncomingHistoryFilter,
} from "@/lib/incoming-transactions";

const filterLabels: Array<{ id: IncomingHistoryFilter; label: string }> = [
  { id: "paying-app", label: "Paying app" },
  { id: "payto-app", label: "PayToDapp" },
  { id: "token", label: "Token" },
  { id: "chain", label: "Chain" },
];

interface HistoryPageProps {
  searchParams: Promise<{
    view?: string;
  }>;
}

export const metadata = {
  title: "Incoming Transaction History",
  description:
    "Browser-safe incoming transaction history grouped by paying app, PayToDapp, token, or chain.",
};

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const params = await searchParams;
  const view = normalizeFilter(params.view);
  const groups = groupIncomingTransactions(view);

  return (
    <main className="min-h-screen bg-[#f7f8f4] text-[#151713]">
      <section className="border-b border-[#d9dfd1] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <Link
            className="text-sm font-semibold text-[#176b46] underline-offset-4 hover:underline"
            href="/"
          >
            GlobalPayTo
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
                Review payment intents GlobalPayTo has facilitated, grouped by
                paying app, PayToDapp, token, or chain.
              </p>
            </div>
          </div>

          <nav className="mt-7 flex flex-wrap gap-2" aria-label="History views">
            {filterLabels.map((filter) => {
              const active = filter.id === view;

              return (
                <Link
                  className={`inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-semibold transition ${
                    active
                      ? "border-[#176b46] bg-[#176b46] text-white"
                      : "border-[#cbd4c3] bg-white text-[#2c3429] hover:bg-[#f1f4ec]"
                  }`}
                  href={`/history?view=${filter.id}`}
                  key={filter.id}
                >
                  {filter.label}
                </Link>
              );
            })}
          </nav>
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
  );
}

function TransactionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[8.5rem_1fr] gap-3">
      <dt className="font-semibold text-[#151713]">{label}</dt>
      <dd className="min-w-0 break-words text-[#586250]">{value}</dd>
    </div>
  );
}

function normalizeFilter(value: string | undefined): IncomingHistoryFilter {
  if (
    value === "paying-app" ||
    value === "payto-app" ||
    value === "token" ||
    value === "chain"
  ) {
    return value;
  }

  return "paying-app";
}
