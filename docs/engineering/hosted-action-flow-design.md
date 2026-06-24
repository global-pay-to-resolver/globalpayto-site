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
- dapp metadata, masked stamp display, requested scope, and action copy are hydrated after local action-token validation,
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
