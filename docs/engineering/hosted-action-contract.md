# Hosted Action Contract

Date: 2026-06-24  
Status: Sprint 1 finalized design  
Repo: `globalpayto-site`

## Scope

This public site repo implements browser-safe hosted actions for GlobalPayTo setup, authorization, route selection, and Cubid comms notification landing targets. It consumes the public contracts finalized in `globalpayto-sdk/docs/engineering/mvp-api-contracts.md` and does not own private resolver behavior.

## Hosted Action Inputs

Hosted action pages receive opaque, short-lived action identifiers. They must not receive raw backend records or production database credentials.

Common page inputs:

- action id,
- short-lived action token,
- dapp display metadata,
- masked pay-to identifier display when safe,
- route options only for the current action.

Notification-triggered visits from Cubid comms use the same action identifier model.

## Hosted Action Outcomes

Pages map user and resolver outcomes to a small browser-safe state model:

| Page outcome | Meaning |
| --- | --- |
| `approved` | User approved authorization, setup, or route choice. |
| `denied` | User declined the requested action. |
| `selected_route` | User selected a route/default. |
| `expired` | Action token expired. |
| `invalid` | Action token or action id is invalid. |
| `completed` | Action was already completed. |
| `restart_required` | User must restart setup or authorization. |

The site renders friendly copy for these outcomes and does not expose private backend diagnostics.

## Browser-Safe Runtime Configuration

Browser-safe values may use `NEXT_PUBLIC_*`, including Cubid issuer/client/display configuration required for public flows.

Server-only or private values must not appear in browser env vars or bundles:

- resolver secrets,
- Cubid dapp API keys,
- service-role keys,
- provider callback credentials,
- production database credentials.

Any server route added in this repo must be reviewed against this public/private split before it is used.

## User-Facing Copy

Copy must cover:

- setup required,
- route selection required,
- authorization required,
- provider temporarily unavailable,
- expired or invalid action links,
- payment intent created,
- payment received,
- user action required from Cubid comms.

Copy must not imply that GlobalPayTo exposes a wallet graph, profile directory, dashboard, inbox, or activity feed.

## Privacy Rules

Hosted action pages must show only data needed for the current action:

- show masked identifiers rather than raw private identifiers when possible,
- show only route options relevant to the current route-selection action,
- do not show unrelated PayToDapps, unrelated routes, route preferences, wallet addresses, provider internals, or private diagnostics.

Cubid comms notification links may land on hosted actions, but the site is not the notification delivery system.

## Acceptance

Sprint 1 site alignment is complete when:

- hosted action inputs and outputs are defined,
- browser-safe configuration boundaries are documented,
- public copy requirements cover statuses and Cubid comms notifications,
- site docs reference only public SDK contracts and stable dependency IDs, not private backend files.
