export type HostedActionState =
  | "ready"
  | "denied"
  | "selected_route"
  | "expired"
  | "invalid"
  | "completed"
  | "restart_required";

export interface RouteOption {
  id: string;
  name: string;
  detail: string;
  addedAt: string;
  lastTransaction: {
    payingApp: string;
    date: string;
    amount: string;
    fromAccount: string;
  };
}

export interface ReceivePath {
  id: string;
  label: string;
  chain: string;
  token: string;
  currentDefaultId: string;
  options: RouteOption[];
}

export interface RouteSelectionAction {
  id: string;
  state: HostedActionState;
  maskedIdentifier: string;
  paths: ReceivePath[];
  expiresAt: string;
}

export const routeSelectionActions: Record<string, RouteSelectionAction> = {
  "mpt_act_route_demo": {
    id: "mpt_act_route_demo",
    state: "ready",
    maskedIdentifier: "u***@example.test",
    paths: [
      {
        id: "base-usdc",
        label: "Base mainnet USDC",
        chain: "Base mainnet",
        token: "USDC",
        currentDefaultId: "smartrust",
        options: [
          {
            id: "smartrust",
            name: "SmarTrust Wallet",
            detail: "Current default for this channel.",
            addedAt: "2026-06-18",
            lastTransaction: {
              payingApp: "ChainCrew Payouts",
              date: "2026-06-24",
              amount: "25.00 USDC",
              fromAccount: "chaincrew-treasury-1042",
            },
          },
          {
            id: "vaultpay",
            name: "VaultPay Wallet",
            detail: "Also supports this channel.",
            addedAt: "2026-06-21",
            lastTransaction: {
              payingApp: "GrantFlow",
              date: "2026-06-23",
              amount: "80.00 USDC",
              fromAccount: "grantflow-disbursements-221",
            },
          },
        ],
      },
      {
        id: "solana-usdc",
        label: "Solana USDC",
        chain: "Solana",
        token: "USDC",
        currentDefaultId: "solflare-pay",
        options: [
          {
            id: "solflare-pay",
            name: "Solflare Pay",
            detail: "Only active receive app for this channel.",
            addedAt: "2026-06-19",
            lastTransaction: {
              payingApp: "MarketBursar",
              date: "2026-06-22",
              amount: "42.00 USDC",
              fromAccount: "marketbursar-clearing-778",
            },
          },
        ],
      },
      {
        id: "ethereum-eth",
        label: "Ethereum ETH",
        chain: "Ethereum mainnet",
        token: "ETH",
        currentDefaultId: "smartrust",
        options: [
          {
            id: "smartrust-eth",
            name: "SmarTrust Wallet",
            detail: "Primary ETH receive app.",
            addedAt: "2026-06-20",
            lastTransaction: {
              payingApp: "EscrowLine",
              date: "2026-06-20",
              amount: "0.18 ETH",
              fromAccount: "escrowline-release-509",
            },
          },
          {
            id: "embedded-safe",
            name: "Embedded Safe",
            detail: "Secondary ETH receive app.",
            addedAt: "2026-06-22",
            lastTransaction: {
              payingApp: "CreatorPool",
              date: "2026-06-21",
              amount: "0.07 ETH",
              fromAccount: "creatorpool-payouts-313",
            },
          },
        ],
      },
    ],
    expiresAt: "2026-06-24T20:00:00Z",
  },
};

export function getRouteSelectionAction(actionId: string): RouteSelectionAction {
  return (
    routeSelectionActions[actionId] ?? {
      id: actionId,
      state: "invalid",
      maskedIdentifier: "Hidden",
      paths: [],
      expiresAt: "Unavailable",
    }
  );
}
