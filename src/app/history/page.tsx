import { ProtectedHistoryPage } from "@/components/history/protected-history-page";
import type { IncomingHistoryFilter } from "@/lib/incoming-transactions";

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

  return <ProtectedHistoryPage view={view} />;
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
