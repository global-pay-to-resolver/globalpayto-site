# GlobalPayTo Hosted User Actions Architecture

Date: 2026-06-24  
Status: MVP architecture  
Repo: `globalpayto-site`

## Scope

This public repo owns the user-facing GlobalPayTo site and the minimal hosted action pages needed by the MVP. It should stay focused on browser-safe user experiences and must not contain private resolver implementation details.

The MVP site surfaces are:

- authorization/setup links for enabling a verified Cubid stamp as pay-to or authorizing a dapp,
- route-selection links for choosing a default when multiple PayToDapps support the same route.

The site does not own production Supabase schema, Edge Functions, provider callbacks, audit logging, private admin tools, or operational resolver logic.

For public protocol contracts and integration examples, see the public SDK architecture doc in [`../../../globalpayto-sdk/docs/engineering/protocol-and-sdk-architecture.md`](../../../globalpayto-sdk/docs/engineering/protocol-and-sdk-architecture.md) when working from the parent workspace checkout.

## Product Boundary

The site is not a full dashboard in the MVP. It should not include:

- wallet manager pages,
- activity history,
- public searchable profiles,
- directory pages,
- payment status tracking beyond the action being completed,
- direct wallet graph display,
- arbitrary wallet connection,
- private admin or provider operation views.

The site exists to help a user safely complete an authorization or selection that an API flow could not finish without user involvement.

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

Keep deprecated wallet-heavy Cubid starter patterns out of this app.

## API Expectations

The hosted action pages should receive opaque action identifiers or tokens, not private backend state.

Expected page inputs:

- action id,
- short-lived action token,
- dapp display metadata,
- masked pay-to identifier display when safe,
- route options for route selection.

Expected page outputs:

- user approved,
- user denied,
- selected route/default,
- expired or invalid action,
- restart/setup-needed state.

The public SDK docs should define any response status names that integrators need to handle. The site should present user-friendly copy for those statuses without exposing private diagnostic details.

## Privacy Requirements

The site must:

- show only the data needed for the current user action,
- avoid revealing other PayToDapps or routes unless required for the current selection,
- avoid displaying raw wallet addresses in MVP route registration flows,
- avoid storing secrets in local storage,
- handle expired links without leaking whether a recipient exists,
- use masked identifier displays when a stamp value is shown.

## Acceptance Targets

The site architecture is MVP-complete when:

- a user can complete pay-to stamp enablement or authorization from a setup link,
- a user can choose a route default when overlapping PayToDapp routes exist,
- expired or invalid links fail safely,
- the browser bundle contains no resolver secrets,
- the site calls backend APIs rather than writing directly to production data stores,
- public copy avoids wallet graph disclosure.
