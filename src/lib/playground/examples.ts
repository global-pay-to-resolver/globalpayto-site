export type PlaygroundOperation =
  | "validatePayToTag"
  | "registerRoutes"
  | "resolvePayment"
  | "hydrateRouteSelection"
  | "completeRouteSelection"
  | "simulateQuotes";

export interface PlaygroundExample {
  operation: PlaygroundOperation;
  label: string;
  eyebrow: string;
  description: string;
  method: "GET" | "POST";
  endpoint: string;
  appId?: "chaincrew" | "smartrust-wallet";
  body: unknown;
  notes: string[];
}

export const receivingExamples: PlaygroundExample[] = [
  {
    operation: "validatePayToTag",
    label: "Get a consented Paytag",
    eyebrow: "Cubid identity validation",
    description:
      "The live MVP stand-in validates a Cubid verified stamp and returns only alias/hash/display metadata. In production this depends on Cubid-owned identity, consent, and Paytag enablement contracts.",
    method: "POST",
    endpoint: "/validate-payto-identifier",
    body: {
      identifierType: "verified_stamp",
      identifier: "fixture:user:payto:primary",
    },
    notes: [
      "MyPayTag is the caller of Cubid identity validation; PayingDapps should call MyPayTag, not Cubid directly.",
      "Raw identifiers are not meant to become durable resolver records.",
    ],
  },
  {
    operation: "registerRoutes",
    label: "Register the Paytag receive paths",
    eyebrow: "MyPayTag route registration",
    description:
      "A PayToDapp registers supported chain/token paths for the user. It must not submit wallet addresses, memos, account ids, or payment instructions.",
    method: "POST",
    endpoint: "/payto-routes",
    appId: "smartrust-wallet",
    body: {
      recipient: {
        identifierType: "verified_stamp",
        identifier: "fixture:user:payto:primary",
      },
      payToDappId: "smartrust-wallet",
      supportedRoutes: [
        {
          chain: "base",
          network: "mainnet",
          asset: "USDC",
        },
        {
          chain: "base",
          network: "mainnet",
          asset: "EURC",
        },
        {
          chain: "solana",
          network: "mainnet-beta",
          asset: "USDC",
        },
      ],
      consentToken: "cubid_consent_fixture_primary",
    },
    notes: [
      "The server signs this request as the local SmarTrust Wallet demo app.",
      "Add an address-like field to see the backend reject unsafe route registration.",
    ],
  },
];

export const sendingExamples: PlaygroundExample[] = [
  {
    operation: "resolvePayment",
    label: "Resolve routes for a Paytag",
    eyebrow: "MyPayTag resolve",
    description:
      "A PayingDapp asks MyPayTag for a user-approved receive path. The current local resolver returns a normalized one-time provider intent or a safe public status.",
    method: "POST",
    endpoint: "/resolve",
    appId: "chaincrew",
    body: {
      recipient: {
        identifierType: "verified_stamp",
        identifier: "fixture:user:payto:primary",
      },
      supportedPaths: [
        {
          chain: "base",
          network: "mainnet",
          asset: "USDC",
        },
      ],
      amount: {
        value: "25.00",
        currency: "USDC",
      },
      purpose: "payout",
      intentMode: "one_time",
      payingDappReference: "chaincrew:payout_playground_001",
    },
    notes: [
      "Change the identifier to include no-route or overlap to see safe no-route or route-selection behavior.",
      "The response must not expose unrelated PayToDapps or a wallet graph.",
    ],
  },
  {
    operation: "hydrateRouteSelection",
    label: "Hydrate a route-selection action",
    eyebrow: "Hosted action",
    description:
      "When multiple receive apps can handle a route, the site hydrates an opaque route-selection action without putting route details in the URL.",
    method: "GET",
    endpoint: "/hosted-actions?actionId=mpt_act_route_demo",
    body: {
      actionId: "mpt_act_route_demo",
    },
    notes: [
      "This call is browser-safe and does not require a paying-app signature.",
      "Try mpt_act_expired, mpt_act_completed, or mpt_act_invalid to see safe action states.",
    ],
  },
  {
    operation: "completeRouteSelection",
    label: "Select a default receive app",
    eyebrow: "Hosted action completion",
    description:
      "The user chooses a default PayToDapp for a chain/token channel. This is the current API shape closest to setting the pay-to route preference.",
    method: "POST",
    endpoint: "/route-selection",
    body: {
      actionId: "mpt_act_route_demo",
      kind: "route_selection",
      decision: "select_route",
      selectedRouteId: "smartrust",
    },
    notes: [
      "This is not a NEAR call; it is the MyPayTag route preference action.",
      "Any execution quote step is separate and shown below as a future SDK simulation.",
    ],
  },
  {
    operation: "simulateQuotes",
    label: "Simulate future execution quotes",
    eyebrow: "Future SDK simulation",
    description:
      "There is no public quote Edge Function yet, and quote fanout is not part of the MVP core flow. This panel simulates a future execution-adapter helper: prefer NEAR 1Click when selected, otherwise fan out across configured solvers.",
    method: "POST",
    endpoint: "SDK quote simulation",
    body: {
      amount: {
        value: "25.00",
        currency: "USDC",
      },
      sourceAsset: "eip155:1/erc20:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      destinationAsset: "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      recipient: "eip155:8453:0x0000000000000000000000000000000000000001",
      reference: "chaincrew:payout_playground_001",
      preferredSolverId: "near_intents_1click",
    },
    notes: [
      "These execution steps happen after MyPayTag route selection and provider-intent creation; they are not required for MVP resolve.",
      "Remove preferredSolverId to see future quote fanout across every configured demo solver.",
    ],
  },
];

export function prettyJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}
