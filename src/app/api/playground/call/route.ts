import { NextResponse } from "next/server";

import type { PlaygroundOperation } from "@/lib/playground/examples";

export const dynamic = "force-dynamic";

type DemoAppId = "chaincrew" | "smartrust-wallet";

interface DemoDappSecret {
  id: string;
  role: "paying_dapp" | "payto_dapp" | "both";
  status: "active" | "disabled";
  secret: string;
}

interface PlaygroundRequest {
  operation?: PlaygroundOperation;
  body?: unknown;
}

const operationConfig: Record<
  Exclude<PlaygroundOperation, "simulateQuotes">,
  { method: "GET" | "POST"; path: string; dappId?: DemoAppId }
> = {
  validatePayToTag: { method: "POST", path: "/validate-payto-identifier" },
  registerRoutes: { method: "POST", path: "/payto-routes", dappId: "smartrust-wallet" },
  resolvePayment: { method: "POST", path: "/resolve", dappId: "chaincrew" },
  hydrateRouteSelection: { method: "GET", path: "/hosted-actions" },
  completeRouteSelection: { method: "POST", path: "/route-selection" },
};

const defaultDemoDapps: Record<DemoAppId, DemoDappSecret> = {
  chaincrew: {
    id: "chaincrew",
    role: "paying_dapp",
    status: "active",
    secret: "local-chaincrew-secret",
  },
  "smartrust-wallet": {
    id: "smartrust-wallet",
    role: "both",
    status: "active",
    secret: "local-smartrust-secret",
  },
};

export async function POST(request: Request) {
  if (process.env.MYPAYTAG_PLAYGROUND_ENABLED !== "true") {
    return NextResponse.json(
      {
        status: "disabled",
        message: "Set MYPAYTAG_PLAYGROUND_ENABLED=true in .env.local to enable local API calls.",
      },
      { status: 403 },
    );
  }

  const input = await request.json() as PlaygroundRequest;
  if (!input.operation) {
    return NextResponse.json({ status: "invalid_request", message: "Missing operation." }, { status: 400 });
  }

  if (input.operation === "simulateQuotes") {
    return NextResponse.json(simulateQuotes(input.body));
  }

  const config = operationConfig[input.operation];
  if (!config) {
    return NextResponse.json({ status: "invalid_request", message: "Unsupported operation." }, { status: 400 });
  }

  const resolverBaseUrl = process.env.MYPAYTAG_RESOLVER_BASE_URL ?? "http://127.0.0.1:54321";
  const { url, signingPathWithSearch } = buildFunctionUrl(resolverBaseUrl, config.path, input.body);
  const bodyText = config.method === "GET" ? "" : JSON.stringify(input.body ?? {});
  const headers: Record<string, string> = {
    accept: "application/json",
    "content-type": "application/json",
  };

  if (config.dappId) {
    Object.assign(headers, await signedHeaders({
      bodyText,
      dappId: config.dappId,
      method: config.method,
      pathWithSearch: signingPathWithSearch,
    }));
  }

  const response = await fetch(url, {
    method: config.method,
    headers,
    body: config.method === "GET" ? undefined : bodyText,
    cache: "no-store",
  });
  const responseText = await response.text();

  return NextResponse.json({
    request: {
      method: config.method,
      url,
      headers: redactHeaders(headers),
      body: bodyText ? JSON.parse(bodyText) : undefined,
    },
    response: {
      ok: response.ok,
      status: response.status,
      body: parseJsonOrText(responseText),
    },
  });
}

function buildFunctionUrl(resolverBaseUrl: string, path: string, body: unknown) {
  const url = new URL(`/functions/v1${path}`, resolverBaseUrl);

  if (path === "/hosted-actions") {
    const actionId = hasStringProperty(body, "actionId") ? body.actionId : "mpt_act_route_demo";
    url.searchParams.set("actionId", actionId);
    url.searchParams.set("kind", "route_selection");
  }

  return {
    url: url.toString(),
    signingPathWithSearch: `${path}${url.search}`,
  };
}

async function signedHeaders(input: {
  bodyText: string;
  dappId: DemoAppId;
  method: "GET" | "POST";
  pathWithSearch: string;
}) {
  const timestamp = new Date().toISOString();
  const nonce = crypto.randomUUID();
  const dapps = loadDemoDapps();
  const dapp = dapps[input.dappId];
  if (!dapp || dapp.status !== "active") {
    throw new Error(`Missing active demo dapp secret for ${input.dappId}.`);
  }

  const bodyHash = await sha256Hex(input.bodyText);
  const canonical = [
    input.method,
    input.pathWithSearch,
    input.dappId,
    timestamp,
    nonce,
    bodyHash,
  ].join("\n");

  return {
    "x-mypaytag-dapp-id": input.dappId,
    "x-mypaytag-timestamp": timestamp,
    "x-mypaytag-nonce": nonce,
    "x-mypaytag-signature": `sha256=${await hmacHex(dapp.secret, canonical)}`,
  };
}

function loadDemoDapps(): Record<DemoAppId, DemoDappSecret> {
  const raw = process.env.MYPAYTAG_PLAYGROUND_DAPP_SECRETS_JSON;
  if (!raw) return defaultDemoDapps;
  return JSON.parse(raw) as Record<DemoAppId, DemoDappSecret>;
}

function redactHeaders(headers: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [
      key,
      key === "x-mypaytag-signature" ? "sha256=[server-generated]" : value,
    ]),
  );
}

function parseJsonOrText(value: string) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function hasStringProperty(value: unknown, property: string): value is Record<string, string> {
  return Boolean(
    value &&
      typeof value === "object" &&
      property in value &&
      typeof (value as Record<string, unknown>)[property] === "string",
  );
}

function simulateQuotes(body: unknown) {
  const input = body && typeof body === "object" ? body as { preferredSolverId?: string } : {};
  const solvers = [
    quote("near_intents_1click", "quote_near_fixture", "25.18", 20, "NEAR 1Click"),
    quote("lifi", "quote_lifi_fixture", "25.24", 45, "LI.FI"),
    quote("squid", "quote_squid_fixture", "25.29", 55, "Squid"),
    quote("zero_x_cross_chain", "quote_zero_x_fixture", "25.21", 18, "0x Cross-Chain"),
    quote("across", "quote_across_fixture", "25.12", 30, "Across"),
    quote("layerzero_stargate", "quote_layerzero_fixture", "25.20", 40, "LayerZero / Stargate"),
  ];
  const selected = input.preferredSolverId
    ? solvers.filter((candidate) => candidate.solverId === input.preferredSolverId)
    : solvers;

  return {
    request: {
      method: "POST",
      url: "SDK quote simulation",
      body,
    },
    response: {
      ok: true,
      status: 200,
      body: {
        status: "simulated",
        note: "No public quote Edge Function exists yet. This mirrors the current SDK quote-provider behavior.",
        quoteMode: input.preferredSolverId ? "preferred_solver_only" : "fanout_all_configured_solvers",
        quotes: selected,
      },
    },
  };
}

function quote(
  solverId: string,
  quoteId: string,
  sendAmount: string,
  estimatedDurationSeconds: number,
  label: string,
) {
  return {
    solverId,
    quoteId,
    label,
    sendAmount,
    receiveAmount: "25.00",
    estimatedDurationSeconds,
    warnings: solverId === "near_intents_1click"
      ? ["Strong default when both sides are crypto or stablecoin."]
      : [],
  };
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return bytesToHex(new Uint8Array(digest));
}

async function hmacHex(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { hash: "SHA-256", name: "HMAC" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return bytesToHex(new Uint8Array(signature));
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
