# GlobalPayTo Site

Public user-facing app/site for GlobalPayTo.

This repo is forked from [`Cubid-Me/cubid-starter-v3`](https://github.com/Cubid-Me/cubid-starter-v3) so it can continue to receive useful upstream starter updates while the GlobalPayTo experience is built out.

The current codebase is still the canonical full-stack Next.js starter for the
modern Cubid public SDK package family from
[`Cubid-Me/cubid-sdk`](https://github.com/Cubid-Me/cubid-sdk).

This app demonstrates Cubid as an identity stack first: identity aggregation,
proof of personhood and sybil-defense signals, Login with Cubid, ClearPass
Verify, user notification preferences, and passkey-first wallet recovery.

Deprecated archive references:

- [`Cubid-Me/cubid-starter-v1`](https://github.com/Cubid-Me/cubid-starter-v1)
- `/Users/botmaster/src/cubid/cubid-starter-v2`

Do not copy wallet-heavy examples, old `cubid-sdk` usage, deprecated
`@cubid/web2` / `@cubid/web2-react` imports, Cubid-generated wallet creation,
or normal Cubid transaction-signing examples from those projects.

## What This Starter Shows

- `@cubid/core` in a server-only Next.js API route for dapp API-key calls.
- `@cubid/auth` and `@cubid/auth-react` for Login with Cubid / OIDC PKCE.
- `@cubid/browser` and `@cubid/react` for hosted ClearPass Verify launchers.
- `@cubid/comms` for signed-in notification channel and preference metadata.
- `@cubid/wallet-recovery` and `@cubid/wallet-recovery-react` for hosted,
  user-authorized recoverable-wallet recovery launchers.

Cubid dapp API keys, service-role keys, and recovery bundle material must stay
out of browser env vars and client bundles.

## Copy-Paste Local Setup

```sh
cd /Users/botmaster/src/global-pay-to-resolver/globalpayto-site
cp .env.example .env.local
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is busy,
Next.js will print the alternate local URL. Update
`NEXT_PUBLIC_CUBID_REDIRECT_URI` and the Cubid OIDC client redirect URI to
match that alternate port before testing Login with Cubid.

## Environment Variables

Browser-safe values use `NEXT_PUBLIC_*` and can appear in the client bundle:

```sh
NEXT_PUBLIC_CUBID_ISSUER_URL=https://id.cubid.me
NEXT_PUBLIC_CUBID_OIDC_CLIENT_ID=your-oidc-client-id
NEXT_PUBLIC_CUBID_REDIRECT_URI=http://localhost:3000/auth/callback
NEXT_PUBLIC_CUBID_PASSPORT_BASE_URL=https://passport.cubid.me
NEXT_PUBLIC_CUBID_CLEARPASS_PAGE_ID=your-clearpass-page-id
```

Server-only values are read only by `src/app/api/cubid/server-demo/route.ts`:

```sh
CUBID_API_BASE_URL=https://passport.cubid.me
CUBID_API_KEY=your-dapp-api-key
CUBID_DAPP_ID=your-dapp-id
```

Never rename server credentials to `NEXT_PUBLIC_*`. The starter intentionally
fails the server demo with a safe setup response when `CUBID_API_BASE_URL` or
`CUBID_API_KEY` is missing.

## Cubid Console Setup

Create or configure an OIDC client in Cubid with:

- Issuer URL: the Cubid issuer, for example `https://id.cubid.me`.
- Client id: copied into `NEXT_PUBLIC_CUBID_OIDC_CLIENT_ID`.
- Redirect URI: `http://localhost:3000/auth/callback` for local dev.
- Post-logout redirect URI: `http://localhost:3000` for local dev.

Create or configure your dapp API credentials with:

- Cubid API base URL: copied into `CUBID_API_BASE_URL`.
- Dapp API key: copied into `CUBID_API_KEY`.
- Dapp id: copied into `CUBID_DAPP_ID` when your Cubid environment requires it.
- ClearPass page id: copied into `NEXT_PUBLIC_CUBID_CLEARPASS_PAGE_ID`.

## Package Source

Most `@cubid/*` packages are published on npm. This checkout is also wired as a
small pnpm workspace that links the current local SDK packages from:

```txt
/Users/botmaster/src/cubid/cubid-sdk-v2/packages/*
```

That keeps the starter aligned with the canonical SDK source while package
publishing catches up, especially for `@cubid/comms`.

## Validation

```sh
pnpm lint
pnpm typecheck
pnpm build
```

The browser demo can render without server credentials. The server demo returns
a non-secret setup message until server-only Cubid credentials are present in
`.env.local`.
