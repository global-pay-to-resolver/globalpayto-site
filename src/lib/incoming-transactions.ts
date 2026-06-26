export type IncomingHistoryFilter = "paying-app" | "payto-app" | "token" | "chain";
export type IncomingHistoryType = "queries" | "intents" | "transactions";

export interface IncomingTransaction {
  id: string;
  type: IncomingHistoryType;
  sent: {
    timestamp: string;
    payingApp: string;
    value: string;
    token: string;
    chain: string;
  };
  received: {
    timestamp: string;
    payToApp: string;
    value: string;
    token: string;
    chain: string;
  };
}

export const incomingTransactions: IncomingTransaction[] = [
  {
    id: "qry_001",
    type: "queries",
    sent: {
      timestamp: "2026-06-24 15:02 UTC",
      payingApp: "ChainCrew Payouts",
      value: "Route availability query",
      token: "Any supported",
      chain: "Any supported",
    },
    received: {
      timestamp: "2026-06-24 15:02 UTC",
      payToApp: "Available routes only",
      value: "No intent created",
      token: "USDC, USDT",
      chain: "Base mainnet, Solana",
    },
  },
  {
    id: "int_001",
    type: "intents",
    sent: {
      timestamp: "2026-06-24 14:50 UTC",
      payingApp: "TreasuryDesk",
      value: "125.00",
      token: "USDT",
      chain: "Base mainnet",
    },
    received: {
      timestamp: "2026-06-24 14:50 UTC",
      payToApp: "Options returned",
      value: "Awaiting route selection",
      token: "USDT",
      chain: "Base mainnet",
    },
  },
  {
    id: "txn_001",
    type: "transactions",
    sent: {
      timestamp: "2026-06-24 14:18 UTC",
      payingApp: "ChainCrew Payouts",
      value: "25.00",
      token: "USDC",
      chain: "Base mainnet",
    },
    received: {
      timestamp: "2026-06-24 14:19 UTC",
      payToApp: "SmarTrust Wallet",
      value: "25.00",
      token: "USDC",
      chain: "Base mainnet",
    },
  },
  {
    id: "txn_002",
    type: "transactions",
    sent: {
      timestamp: "2026-06-23 18:42 UTC",
      payingApp: "GrantFlow",
      value: "80.00",
      token: "USDC",
      chain: "Base mainnet",
    },
    received: {
      timestamp: "2026-06-23 18:43 UTC",
      payToApp: "VaultPay Wallet",
      value: "80.00",
      token: "USDC",
      chain: "Base mainnet",
    },
  },
  {
    id: "qry_002",
    type: "queries",
    sent: {
      timestamp: "2026-06-23 20:11 UTC",
      payingApp: "GrantFlow",
      value: "Route availability query",
      token: "USDC",
      chain: "Base mainnet",
    },
    received: {
      timestamp: "2026-06-23 20:11 UTC",
      payToApp: "Available routes only",
      value: "No intent created",
      token: "USDC",
      chain: "Base mainnet",
    },
  },
  {
    id: "int_002",
    type: "intents",
    sent: {
      timestamp: "2026-06-23 19:08 UTC",
      payingApp: "MarketBursar",
      value: "60.00",
      token: "USDC",
      chain: "Solana",
    },
    received: {
      timestamp: "2026-06-23 19:08 UTC",
      payToApp: "Options returned",
      value: "Awaiting route selection",
      token: "USDC",
      chain: "Solana",
    },
  },
  {
    id: "txn_003",
    type: "transactions",
    sent: {
      timestamp: "2026-06-22 10:05 UTC",
      payingApp: "MarketBursar",
      value: "42.00",
      token: "USDC",
      chain: "Solana",
    },
    received: {
      timestamp: "2026-06-22 10:05 UTC",
      payToApp: "Solflare Pay",
      value: "42.00",
      token: "USDC",
      chain: "Solana",
    },
  },
  {
    id: "txn_004",
    type: "transactions",
    sent: {
      timestamp: "2026-06-21 21:30 UTC",
      payingApp: "CreatorPool",
      value: "0.07",
      token: "ETH",
      chain: "Ethereum mainnet",
    },
    received: {
      timestamp: "2026-06-21 21:33 UTC",
      payToApp: "Embedded Safe",
      value: "0.07",
      token: "ETH",
      chain: "Ethereum mainnet",
    },
  },
  {
    id: "txn_005",
    type: "transactions",
    sent: {
      timestamp: "2026-06-20 16:12 UTC",
      payingApp: "EscrowLine",
      value: "0.18",
      token: "ETH",
      chain: "Ethereum mainnet",
    },
    received: {
      timestamp: "2026-06-20 16:16 UTC",
      payToApp: "SmarTrust Wallet",
      value: "0.18",
      token: "ETH",
      chain: "Ethereum mainnet",
    },
  },
];

export function groupIncomingTransactions(
  filter: IncomingHistoryFilter,
  type?: IncomingHistoryType,
) {
  const filteredTransactions = type
    ? incomingTransactions.filter((transaction) => transaction.type === type)
    : incomingTransactions;

  return Map.groupBy(filteredTransactions, (transaction) => {
    if (filter === "paying-app") return transaction.sent.payingApp;
    if (filter === "payto-app") return transaction.received.payToApp;
    if (filter === "token") return transaction.received.token;
    return transaction.received.chain;
  });
}
