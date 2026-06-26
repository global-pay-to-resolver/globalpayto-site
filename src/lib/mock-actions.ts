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
}

export interface RouteSelectionAction {
  id: string;
  state: HostedActionState;
  payingDappName: string;
  maskedIdentifier: string;
  routeLabel: string;
  currentDefaultId: string;
  options: RouteOption[];
  expiresAt: string;
}

export const routeSelectionActions: Record<string, RouteSelectionAction> = {
  "gptr_act_route_demo": {
    id: "gptr_act_route_demo",
    state: "ready",
    payingDappName: "ChainCrew Payouts",
    maskedIdentifier: "u***@example.test",
    routeLabel: "Base mainnet USDC",
    currentDefaultId: "smartrust",
    options: [
      {
        id: "smartrust",
        name: "SmarTrust Wallet",
        detail: "Current default for this app and route.",
      },
      {
        id: "vaultpay",
        name: "VaultPay Wallet",
        detail: "Also supports this route.",
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
      payingDappName: "GlobalPayTo",
      maskedIdentifier: "Hidden",
      routeLabel: "Hidden",
      currentDefaultId: "",
      options: [],
      expiresAt: "Unavailable",
    }
  );
}
