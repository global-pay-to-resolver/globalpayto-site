import {
  ArrowRight,
  Bell,
  Braces,
  CheckCircle2,
  Code2,
  KeyRound,
  Route,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const baseUrl = "https://api.mypaytag.com/functions/v1";

const endpoints = [
  {
    method: "POST",
    path: "/resolve",
    audience: "Sending apps",
    summary: "Resolve a pay-to tag, amount, and supported paths into an executable intent or safe next action.",
  },
  {
    method: "POST",
    path: "/payto-routes",
    audience: "Receiving apps",
    summary: "Register the routes a wallet or receiving app can support for a signed-in user.",
  },
  {
    method: "GET/PATCH/DELETE",
    path: "/payto-routes/{routeId}",
    audience: "Receiving apps",
    summary: "Read, update, or revoke only the routes scoped to the authenticated app and current user context.",
  },
  {
    method: "POST",
    path: "{payToDapp.intentEndpoint}/payment-intents",
    audience: "Receiving apps",
    summary: "Create a dynamic provider intent after MyPayTag selects the receiving app for one payment.",
  },
  {
    method: "GET/POST",
    path: "/hosted-actions/{actionId}",
    audience: "Hosted actions",
    summary: "Hydrate and complete signed-in route-selection actions without exposing route details in the URL.",
  },
];

const statuses = [
  ["resolved", "A one-time MyPayTag intent is ready to execute or hand off."],
  ["no_route", "No compatible authorized receive route is available. Do not infer recipient existence."],
  ["user_action_required", "Send the signed-in user to the opaque hosted action URL when present."],
  ["authorization_required", "The app needs a user grant or renewed consent before continuing."],
  ["unsupported_path", "The requested chain, network, or asset is outside the supported path set."],
  ["provider_unavailable", "The selected receiving app is temporarily unavailable."],
  ["provider_error", "The receiving app returned an invalid or failed provider response."],
  ["expired_authorization", "A required authorization expired and must be renewed."],
  ["revoked_authorization", "The user or system revoked authorization."],
  ["invalid_identifier", "Cubid validation rejected the identifier without exposing private details."],
  ["invalid_request", "The request failed public schema or policy validation."],
];

const solverIds = [
  "near_intents_1click",
  "lifi",
  "squid",
  "zero_x_cross_chain",
  "across",
  "layerzero_stargate",
];

const resolveRequest = `{
  "recipient": {
    "identifierType": "verified_stamp",
    "identifier": "email:recipient@example.com"
  },
  "supportedPaths": [
    {
      "chain": "base",
      "network": "mainnet",
      "asset": "USDC"
    }
  ],
  "amount": {
    "value": "25.00",
    "currency": "USDC"
  },
  "purpose": "payout",
  "intentMode": "one_time",
  "payingDappReference": "sender:payout_987"
}`;

const resolveResponse = `{
  "status": "resolved",
  "intent": {
    "type": "mypaytag.intent.v1",
    "resolverRequestId": "mpt_req_123",
    "selectedPath": {
      "chain": "base",
      "network": "mainnet",
      "asset": "USDC"
    },
    "paymentInstruction": {
      "kind": "provider_json",
      "payload": {
        "destination": {
          "kind": "blockchain_address",
          "recipientAddress": "0xabc..."
        }
      }
    }
  }
}`;

const routeRegistration = `{
  "recipient": {
    "identifierType": "verified_stamp",
    "identifier": "email:recipient@example.com"
  },
  "payToDappId": "example-wallet",
  "supportedRoutes": [
    {
      "chain": "base",
      "network": "mainnet",
      "asset": "USDC"
    }
  ],
  "consentToken": "cubid_consent_token"
}`;

const notificationPayload = `{
  "event": "payment_intent_created",
  "recipientDisplay": "r***@example.com",
  "amount": {
    "value": "25.00",
    "currency": "USDC"
  },
  "resolverRequestId": "mpt_req_123",
  "payingDappReference": "sender:payout_987"
}`;

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-[#d9dfd1] bg-[#101710] p-4 text-xs leading-6 text-[#dce8d7]">
      <code>{code}</code>
    </pre>
  );
}

export const metadata = {
  title: "API Documentation",
  description: "Public MyPayTag API documentation for sending apps and receiving apps.",
};

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f2] text-[#121612]">
      <section className="border-b border-[#d9dfd1] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#176b46]">
              API Documentation
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight tracking-normal">
              Build pay-to-tag payments without collecting wallet addresses.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#586250]">
              MyPayTag gives sending apps a small resolver API and gives
              receiving apps a route-registration plus provider-intent contract.
              The public surface returns payment outcomes, hosted actions, and
              typed intents without exposing a user&apos;s broader wallet graph.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#176b46] px-5 text-sm font-semibold text-white transition hover:bg-[#12583a]"
                href="/openapi.yaml"
              >
                Download OpenAPI YAML
              </a>
              <a
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#c8d4bf] bg-white px-5 text-sm font-semibold text-[#1e2b1d] transition hover:bg-[#f1f4ec]"
                href="#resolve"
              >
                Resolve flow
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a
                className="inline-flex h-11 items-center justify-center rounded-md border border-[#c8d4bf] bg-white px-5 text-sm font-semibold text-[#1e2b1d] transition hover:bg-[#f1f4ec]"
                href="#receiving-apps"
              >
                Receiving app flow
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Code2,
                title: "Sending apps",
                text: "Ask for a route using a verified recipient, amount, and supported paths.",
              },
              {
                icon: Route,
                title: "Receiving apps",
                text: "Register supported routes and create a dynamic intent only when selected.",
              },
              {
                icon: ShieldCheck,
                title: "Privacy boundary",
                text: "Responses avoid wallet inventory, unrelated routes, and private diagnostics.",
              },
              {
                icon: KeyRound,
                title: "Signed requests",
                text: "Production requests use app identity, timestamp, nonce, and signature headers.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article className="rounded-md border border-[#d9dfd1] bg-[#fbfcf8] p-5" key={item.title}>
                  <Icon className="text-[#245c8d]" size={22} aria-hidden="true" />
                  <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#586250]">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d9dfd1] bg-[#101710] text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[0.55fr_1.45fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9fd3a5]">
              Base URL
            </p>
            <p className="mt-3 font-mono text-sm text-[#dce8d7]">{baseUrl}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {["JSON only", "One-time intents", "Cubid verified stamps", "Opaque hosted actions"].map((item) => (
              <div className="rounded-md border border-white/12 bg-white/[0.06] p-4 text-sm font-semibold" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d9dfd1] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#176b46]">
              Endpoints
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal">Public integration surface</h2>
          </div>
          <div className="mt-8 grid gap-4">
            {endpoints.map((endpoint) => (
              <article
                className="grid gap-4 rounded-md border border-[#d9dfd1] bg-[#fbfcf8] p-5 lg:grid-cols-[0.32fr_0.36fr_0.32fr]"
                key={`${endpoint.method}-${endpoint.path}`}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#586250]">
                    {endpoint.audience}
                  </p>
                  <p className="mt-2 font-mono text-sm font-semibold text-[#176b46]">{endpoint.method}</p>
                </div>
                <p className="font-mono text-sm font-semibold text-[#121612]">{endpoint.path}</p>
                <p className="text-sm leading-6 text-[#586250]">{endpoint.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d9dfd1] bg-[#f6f7f2]" id="authentication">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <KeyRound className="text-[#245c8d]" size={26} aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">Authentication</h2>
            <p className="mt-4 text-sm leading-7 text-[#586250]">
              API calls are signed by the requesting app. The exact credential
              provisioning flow lives in the developer console, but every
              production request should bind identity, time, and nonce to the
              payload being sent.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "x-mypaytag-dapp-id",
              "x-mypaytag-timestamp",
              "x-mypaytag-nonce",
              "x-mypaytag-signature",
            ].map((header) => (
              <div className="rounded-md border border-[#d9dfd1] bg-white p-4" key={header}>
                <p className="font-mono text-sm font-semibold text-[#176b46]">{header}</p>
                <p className="mt-2 text-sm leading-6 text-[#586250]">
                  Required for app-authenticated resolver or provider requests.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d9dfd1] bg-white" id="resolve">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#176b46]">
              Sending Apps
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">Resolve a payment</h2>
            <p className="mt-4 text-sm leading-7 text-[#586250]">
              A sending app submits the recipient tag, supported payment paths,
              amount, purpose, and reconciliation reference. MyPayTag returns a
              resolved one-time intent, a hosted action, or a safe status.
            </p>
            <div className="mt-6">
              <CodeBlock code={resolveRequest} />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#245c8d]">
              Example Response
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-normal">Resolved intent</h3>
            <p className="mt-4 text-sm leading-7 text-[#586250]">
              The payment instruction is provider JSON, but the envelope and
              destination are typed. Apps should not store the destination as a
              reusable wallet address.
            </p>
            <div className="mt-6">
              <CodeBlock code={resolveResponse} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d9dfd1] bg-[#f6f7f2]" id="receiving-apps">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#176b46]">
              Receiving Apps And Wallets
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">Register receive routes</h2>
            <p className="mt-4 text-sm leading-7 text-[#586250]">
              Receiving apps register availability, not static destination
              accounts. Addresses, memos, payment links, and chain-specific
              instructions belong in the provider response after a one-time
              selection.
            </p>
          </div>
          <CodeBlock code={routeRegistration} />
        </div>
      </section>

      <section className="border-b border-[#d9dfd1] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <Braces className="text-[#245c8d]" size={26} aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-semibold tracking-normal">Statuses</h2>
              <p className="mt-4 text-sm leading-7 text-[#586250]">
                Integrations should branch only on public statuses. Negative
                outcomes are intentionally shaped to reduce probing and route
                enumeration.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {statuses.map(([status, description]) => (
                <article className="rounded-md border border-[#d9dfd1] bg-[#fbfcf8] p-4" key={status}>
                  <h3 className="font-mono text-sm font-semibold text-[#176b46]">{status}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#586250]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d9dfd1] bg-[#101710] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-3 lg:px-8">
          <article className="rounded-md border border-white/12 bg-white/[0.06] p-5">
            <ShieldCheck className="text-[#9fd3a5]" size={24} aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">Hosted actions</h2>
            <p className="mt-3 text-sm leading-7 text-[#d7e1d2]">
              Route-selection URLs are opaque and short-lived. The site signs
              the user in before rendering route options for the current action.
            </p>
          </article>
          <article className="rounded-md border border-white/12 bg-white/[0.06] p-5">
            <Bell className="text-[#9fd3a5]" size={24} aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">Notifications</h2>
            <p className="mt-3 text-sm leading-7 text-[#d7e1d2]">
              MVP notifications use Cubid comms and only include
              <span className="font-mono"> payment_intent_created</span>.
            </p>
          </article>
          <article className="rounded-md border border-white/12 bg-white/[0.06] p-5">
            <CheckCircle2 className="text-[#9fd3a5]" size={24} aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">Solver quotes</h2>
            <p className="mt-3 text-sm leading-7 text-[#d7e1d2]">
              If no preferred solver is selected, SDK helpers can request
              quotes from every configured execution adapter.
            </p>
          </article>
        </div>
      </section>

      <section className="border-b border-[#d9dfd1] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#176b46]">
              Notification Payload
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">Payment intent created</h2>
            <p className="mt-4 text-sm leading-7 text-[#586250]">
              MyPayTag does not claim settlement in the MVP. Notification copy
              should say that a payment intent was created, not that payment was
              received.
            </p>
          </div>
          <CodeBlock code={notificationPayload} />
        </div>
      </section>

      <section className="bg-[#f6f7f2]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#176b46]">
              SDK Helpers
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">Execution solver ids</h2>
            <p className="mt-4 text-sm leading-7 text-[#586250]">
              These ids are used by the public SDK quote helper surface. Passing
              a preferred id limits the request to one provider; omitting one
              fans out to all configured providers.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {solverIds.map((solverId) => (
              <div className="rounded-md border border-[#d9dfd1] bg-white p-4 font-mono text-sm font-semibold text-[#176b46]" key={solverId}>
                {solverId}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#d9dfd1] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold">Ready to integrate?</h2>
            <p className="mt-2 text-sm leading-6 text-[#586250]">
              Use the public SDK contracts for schema validation, fixtures, and
              app-side helper functions.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex h-11 items-center justify-center rounded-md bg-[#176b46] px-5 text-sm font-semibold text-white transition hover:bg-[#12583a]"
              href="/developer"
            >
              Developer console
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-md border border-[#c8d4bf] bg-white px-5 text-sm font-semibold text-[#1e2b1d] transition hover:bg-[#f1f4ec]"
              href="/blog"
            >
              Read guides
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
