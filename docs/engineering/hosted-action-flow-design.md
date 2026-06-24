# Hosted Action Flow Design

Date: 2026-06-24  
Status: Sprint 2 design  
Repo: `globalpayto-site`

## Authorization And Setup Flow

Route family: `/actions/setup/[actionId]`

Purpose:

- let a signed-in user approve enabling a Cubid verified stamp as pay-to,
- let a signed-in user approve scoped PayingDapp or PayToDapp authorization,
- show safe expired, invalid, completed, denied, and restart-required states.

Unauthenticated URL rule:

- the URL contains only an opaque `actionId`,
- Sprint 2 mock pages use local fixtures only,
- production dapp metadata, masked stamp display, requested scope, and action copy are hydrated only after backend action-token exchange and Cubid-authenticated user validation,
- the public site renders only the browser-safe view model returned by the backend,
- no wallet address, route graph, route count, provider internal detail, raw identifier, or private diagnostic appears in the URL.

Visible states:

- `ready`: show dapp display name, masked identifier, requested scope, and approve/deny controls,
- `approved`: confirm the authorization/setup action was approved,
- `denied`: confirm the user declined,
- `expired`: show restart-safe copy without saying whether the recipient exists,
- `invalid`: show restart-safe copy without private diagnostics,
- `completed`: show already-completed copy,
- `restart_required`: show generic restart/setup-needed copy.

## Route Selection Flow

Route family: `/actions/route-selection/[actionId]`

Purpose:

- let an authenticated user choose a default PayToDapp for a single route preference tuple,
- show only route options for the current action,
- keep the current default and eligible PayToDapps unavailable until action validation succeeds.

Preference tuple:

- user,
- pay-to alias,
- chain,
- network,
- asset,
- PayingDapp,
- selected PayToDapp.

Visible states:

- `ready`: show masked identifier, PayingDapp, route, eligible PayToDapps, and current default,
- `selected_route`: confirm the selected default,
- `denied`: confirm the user made no change,
- `expired`: show restart-safe copy,
- `invalid`: show restart-safe copy,
- `completed`: show already-completed copy,
- `restart_required`: show generic restart/setup-needed copy.

Interaction behavior:

- the first eligible option is never auto-submitted by the site,
- the current default is visually selected when the action loads,
- the user must explicitly choose an option and submit,
- submitting stores only local Sprint 2 UI state and shows `selected_route`,
- declining stores only local Sprint 2 UI state and shows `denied`,
- expired, invalid, completed, and restart-required states disable route controls.

Sprint 3 production transition criteria:

- approve, deny, save, and leave-unchanged states are shown only after backend confirmation,
- the backend must complete or invalidate the action token before the site renders success,
- the backend must create the required audit event before the site renders success,
- expired, replayed, or unauthorized submissions render safe restart-required or expired states without private diagnostics.

Displayed route details:

- route label may show chain, network, and asset,
- PayToDapp names may be shown only for eligible options in this action,
- no unrelated routes, unrelated PayToDapps, wallet addresses, route counts, private diagnostics, or provider internals are shown.

## Mock Data Boundary

Sprint 2 uses local mock action state only. Sprint 3 will replace mock hydration and submit handlers with backend action endpoints. Mock state must preserve the privacy contract:

- action IDs are opaque,
- hydrated details are fixture-only,
- expired and invalid states do not reveal recipient existence,
- no production Supabase access or resolver secrets are introduced.

Before real action links are distributed, hosted action routes must set
`noindex`/`noarchive` robot behavior and a strict referrer policy so opaque
action URLs are not indexed or leaked through outbound navigation.
