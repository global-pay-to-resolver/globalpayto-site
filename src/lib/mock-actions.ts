export type HostedActionState =
  | "ready"
  | "approved"
  | "denied"
  | "selected_route"
  | "expired"
  | "invalid"
  | "completed"
  | "restart_required";

export interface SetupAction {
  id: string;
  state: HostedActionState;
  dappName: string;
  dappRole: "PayingDapp" | "PayToDapp";
  maskedIdentifier: string;
  requestedScope: string;
  summary: string;
  expiresAt: string;
}

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

const setupActions: Record<string, SetupAction> = {
  "gptr_act_setup_demo": {
    id: "gptr_act_setup_demo",
    state: "ready",
    dappName: "ChainCrew Payouts",
    dappRole: "PayingDapp",
    maskedIdentifier: "u***@example.test",
    requestedScope: "Create one-time payment intents for this verified pay-to identifier.",
    summary: "Approve this request to let ChainCrew resolve payments without seeing wallet graph details.",
    expiresAt: "2026-06-24T20:00:00Z",
  },
  "gptr_act_setup_expired": {
    id: "gptr_act_setup_expired",
    state: "expired",
    dappName: "GlobalPayTo",
    dappRole: "PayingDapp",
    maskedIdentifier: "Hidden until restarted",
    requestedScope: "This action can no longer be completed.",
    summary: "Restart from the app that sent you here.",
    expiresAt: "2026-06-24T20:00:00Z",
  },
};

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

// REVIEW: Gap: mock action IDs map directly to hydrated dapp names, masked identifiers, route labels, and eligible PayToDapps. Recommendation: keep this file fixture-only and require Sprint 3 to replace it with a backend token-exchange path that returns only safe details after action validation and user authentication.

export function getSetupAction(actionId: string): SetupAction {
  return (
    setupActions[actionId] ?? {
      id: actionId,
      state: "invalid",
      dappName: "GlobalPayTo",
      dappRole: "PayingDapp",
      maskedIdentifier: "Hidden",
      requestedScope: "This action could not be loaded.",
      summary: "Restart from the app that sent you here.",
      expiresAt: "Unavailable",
    }
  );
}

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
