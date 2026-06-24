# GlobalPayTo Hosted User Actions Architecture

Date: 2026-06-24  
Status: MVP architecture  
Repo: `globalpayto-site`

## Scope

This public repo owns the user-facing GlobalPayTo site and the minimal hosted action pages needed by the MVP. It should stay focused on browser-safe user experiences and must not contain private resolver implementation details.

The MVP site surfaces are:

- authorization/setup links for enabling a verified Cubid stamp as pay-to or authorizing a dapp,
- route-selection links for choosing a default when multiple PayToDapps support the same route.
- landing targets for Cubid comms `payment_intent_created` notifications when the notification links back to the current intent context.

The site does not own production Supabase schema, Edge Functions, provider callbacks, audit logging, private admin tools, or operational resolver logic.

For public protocol contracts and integration examples, see the GlobalPayTo SDK repository docs, especially `docs/engineering/protocol-and-sdk-architecture.md` and `docs/engineering/mvp-api-contracts.md`.

## Product Boundary

The site is not a full dashboard in the MVP. It should not include:

- wallet manager pages,
- activity history,
- public searchable profiles,
- directory pages,
- payment status tracking beyond the action being completed,
- notification inboxes or activity feeds,
- direct wallet graph display,
- arbitrary wallet connection,
- private admin or provider operation views.

The site exists to help a user safely complete an authorization or selection that an API flow could not finish without user involvement.

MVP notifications are limited to `payment_intent_created` through Cubid comms. Payment-received landing behavior belongs to a future provider-reported receipt phase with its own trust and disclosure rules. The site may render a linked intent-created landing target, but it should not become the notification delivery system.

## User Actions

### Enable Stamp As Pay-To

The user can enable an eligible Cubid verified stamp as a pay-to identifier.

Copy direction:

```text
Choose which verified identifier apps can use to pay you.
```

The UI must not hard-code email as the only possible stamp. Stamp eligibility should come from Cubid-backed validation and metadata.

### Authorize Dapp

The user can authorize a PayingDapp or PayToDapp for scoped payment resolution.

The page should make the scope legible:

- which dapp is requesting access,
- whether the request is for paying, receiving, or both,
- which pay-to stamp is involved,
- what action will happen after approval.

### Select Route Priority

When more than one PayToDapp supports the same route for a user, the site presents a route-priority/default choice.

The page should show:

- the route, such as Base USDC,
- the eligible PayToDapps,
- the current default when one exists,
- the effect of choosing a default.

The hosted action must validate the action token and authenticate the user before route options, eligible PayToDapps, or current defaults are rendered. Route details should be fetched for that action after validation rather than embedded in an unauthenticated URL.

It should not reveal unrelated routes, wallet addresses, provider internals, or a user's broader payment graph.

## Runtime Boundaries

Browser-safe values can use `NEXT_PUBLIC_*`. Resolver secrets, Cubid dapp API keys, service-role keys, provider callback credentials, and database credentials must never be exposed in browser env vars or client bundles.

The site may call public backend action endpoints when a user submits an authorization or route selection. It should not write directly to production Supabase.

Any server route added to this app must be reviewed against the public/private split:

- Browser-safe UI orchestration belongs here.
- Private resolver decisions and durable writes belong behind backend APIs.
- Provider callback handling belongs outside this repo.

## Dependencies

This repo is forked from `Cubid-Me/cubid-starter-v3` and currently demonstrates Cubid identity primitives. The GlobalPayTo site should reuse those Cubid patterns where they fit:

- Login with Cubid / OIDC PKCE for user identity.
- Hosted Cubid verification or consent launchers where needed.
- Server-only Cubid calls only when secrets remain server-side.
- Cubid comms links or preferences where needed for notification-driven user actions.

Keep deprecated wallet-heavy Cubid starter patterns out of this app.

## API Expectations

The hosted action pages should receive opaque action identifiers or tokens, not private backend state.

Sprint 1 hosted action contract details live in [`hosted-action-contract.md`](./hosted-action-contract.md).

Sprint 2 flow design details live in [`hosted-action-flow-design.md`](./hosted-action-flow-design.md).

Expected page inputs:

- action id,
- short-lived action token,
- dapp display metadata,
- masked pay-to identifier display when safe,
- route options for route selection.

Public URLs carry only opaque action identifiers or short-lived tokens. Dapp metadata, masked identifiers, and route options are hydrated from backend action endpoints after validation.

Expected page outputs:

- user approved,
- user denied,
- selected route/default,
- expired or invalid action,
- restart/setup-needed state.

The public SDK docs should define any response status names that integrators need to handle. The site should present user-friendly copy for those statuses without exposing private diagnostic details.

Notification-triggered visits should use the same opaque action identifiers or short-lived tokens as other hosted action pages.

## Privacy Requirements

The site must:

- show only the data needed for the current user action,
- avoid revealing other PayToDapps or routes unless required for the current selection,
- avoid displaying raw wallet addresses in MVP route registration flows,
- avoid storing secrets in local storage,
- handle expired links without leaking whether a recipient exists,
- avoid displaying notification content that exposes wallet graphs, unrelated PayToDapps, route preferences, provider internals, or raw identifiers,
- use masked identifier displays when a stamp value is shown.

## Acceptance Targets

The site architecture is MVP-complete when:

- a user can complete pay-to stamp enablement or authorization from a setup link,
- a user can choose a route default when overlapping PayToDapp routes exist,
- expired or invalid links fail safely,
- the browser bundle contains no resolver secrets,
- the site calls backend APIs rather than writing directly to production data stores,
- Cubid comms `payment_intent_created` notification links land on safe hosted action states,
- public copy avoids wallet graph disclosure.
