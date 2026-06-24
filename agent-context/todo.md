# GlobalPayTo Site TODO

This document tracks MVP implementation work for the public user-facing site and hosted action flows.

## Sprint 1: SDK And API Design Alignment

### GPTW-S1-T1 Finalize Hosted Action Page Contract

Status: Complete  
Feature branch: main  
Session log: agent-context/session-log/main.md  
Depends on: globalpayto-sdk:GPTS-S1-T1, globalpayto-sdk:GPTS-S1-T2, globalpayto-sdk:GPTS-S1-T3, globalpayto-sdk:GPTS-S1-T7

Define the browser-facing contract for hosted authorization, setup, and route-selection actions.

Acceptance notes:

- Page inputs use opaque action identifiers or short-lived action tokens.
- Page outputs cover user approved, user denied, selected route/default, expired action, invalid action, and restart/setup-needed states.
- Notification-triggered visits from Cubid comms use the same safe action identifier model.
- Contract does not require direct production Supabase access from the public site.

### GPTW-S1-T2 Define Browser-Safe Runtime Configuration

Status: Complete  
Feature branch: main  
Session log: agent-context/session-log/main.md  
Depends on: TBD

Define which environment variables and runtime settings are browser-safe for the public site.

Acceptance notes:

- Browser-safe values use `NEXT_PUBLIC_*`.
- Resolver secrets, Cubid dapp API keys, service-role keys, provider callback credentials, and database credentials stay out of browser env vars and client bundles.
- README setup guidance reflects the GlobalPayTo hosted-action role rather than only the Cubid starter baseline.

### GPTW-S1-T3 Define Public Copy For Resolver Statuses And Notifications

Status: Complete  
Feature branch: main  
Session log: agent-context/session-log/main.md  
Depends on: globalpayto-sdk:GPTS-S1-T1, globalpayto-sdk:GPTS-S1-T7

Define user-facing copy for resolver statuses and Cubid comms notifications that may appear in hosted action flows.

Acceptance notes:

- Copy explains setup, route selection, expired/invalid links, authorization-required, and provider-unavailable states.
- Copy covers the MVP `payment_intent_created` notification event.
- Copy avoids exposing private diagnostic details.
- Copy avoids implying a wallet graph or public profile exists.
- Provider-reported receipt copy and Cubid-comms-driven user-action notification copy are deferred until those events have explicit trust and disclosure contracts.

## Sprint 2: App Design And Implementation

### GPTW-S2-T1 Design Authorization And Setup Link Flow

Status: Complete  
Feature branch: main  
Session log: agent-context/session-log/main.md  
Depends on: globalpayto-site:GPTW-S1-T1

Design the authorization/setup flow for enabling a verified Cubid stamp as pay-to and authorizing a PayingDapp or PayToDapp.

Acceptance notes:

- Flow makes dapp identity, requested scope, involved pay-to stamp, and approval outcome legible.
- Flow does not hard-code email as the only possible stamp type.
- Flow uses Cubid identity patterns that fit the current starter baseline.

### GPTW-S2-T2 Implement Authorization And Setup Pages

Status: Complete  
Feature branch: main  
Session log: agent-context/session-log/main.md  
Depends on: globalpayto-site:GPTW-S2-T1

Implement the hosted authorization/setup pages in the public site.

Acceptance notes:

- Pages can render action state, approval/denial controls, and safe expired/invalid states.
- Pages do not store secrets in local storage.
- Pages do not write directly to production Supabase.

### GPTW-S2-T3 Design Route Selection Flow

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S1-T1

Design the route-selection flow for choosing a default when multiple PayToDapps support the same route.

Acceptance notes:

- Flow shows the route, eligible PayToDapps, current default when one exists, and effect of choosing a default.
- Flow avoids showing unrelated routes, wallet addresses, provider internals, or broader payment graph details.
- Flow has clear handling for expired and invalid action links.
- Route options and defaults are fetched only after action-token validation and user authentication.
- Route/provider details are never embedded in the unauthenticated URL.

### GPTW-S2-T4 Implement Route Selection Pages

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S2-T3

Implement hosted route-selection pages in the public site.

Acceptance notes:

- Pages support selecting and submitting a route/default choice.
- Pages handle expired, invalid, denied, and completed states safely.
- Pages keep route details limited to the current user action.

### GPTW-S2-T5 Remove Starter-Only UI That Conflicts With GlobalPayTo MVP

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S2-T1

Remove, hide, or reframe starter UI that conflicts with the GlobalPayTo MVP product boundary.

Acceptance notes:

- Site no longer centers wallet-heavy examples, deprecated Cubid package usage, or normal Cubid transaction-signing examples.
- Retained Cubid starter behavior supports identity, consent, verification, or hosted action flows.
- Retained Cubid comms behavior supports notification-driven action links without adding an inbox or activity feed.
- Public UI does not imply dashboard, wallet manager, activity history, profile directory, or wallet graph features.

## Sprint 3: Backend Integration And Privacy Hardening

### GPTW-S3-T1 Wire Hosted Actions To Backend Action Endpoints

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto:GPTR-S3-T1, globalpayto:GPTR-S3-T4, globalpayto:GPTR-S3-T7

Wire hosted action pages to backend action endpoints for authorization/setup and route selection.

Acceptance notes:

- Site submits user decisions through backend APIs rather than direct database writes.
- API responses are mapped to public status copy.
- Setup, authorization, and route-selection actions are initiated from resolver responses.
- Cubid-comms-driven user-action links are deferred until that event contract is explicitly added.
- Integration preserves browser-safe configuration boundaries.

### GPTW-S3-T2 Handle Expired Or Invalid Action Links Safely

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S2-T2, globalpayto-site:GPTW-S2-T4

Implement safe handling for expired, invalid, already-used, or denied action links.

Acceptance notes:

- Expired or invalid states do not reveal whether a recipient exists.
- Restart/setup-needed paths use public backend-provided guidance.
- Pages avoid leaking private diagnostics.
- Action-token pages set a restrictive `Referrer-Policy`.
- Action-token URLs avoid third-party analytics, redact tokens from logs, and exchange valid tokens into clean URLs after validation.

### GPTW-S3-T3 Verify Browser Bundle Contains No Resolver Secrets

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S1-T2

Add verification that the browser bundle contains no resolver secrets or server-only credentials.

Acceptance notes:

- Checks cover resolver secrets, Cubid dapp API keys, service-role keys, provider callback credentials, and database credentials.
- Server-only values are never renamed to `NEXT_PUBLIC_*`.
- Checks include built assets, source maps, rendered HTML, route handlers, public runtime config, server-only environment names, and known secret prefixes.
- Build or test output makes failures actionable.

### GPTW-S3-T4 Confirm Route Selection Does Not Leak Wallet Graph Details

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S2-T4

Review and test the route-selection UX for wallet graph and preference leakage.

Acceptance notes:

- Route selection shows only data needed for the current action.
- Route selection does not reveal unrelated routes, unrelated PayToDapps, wallet addresses, or provider internals.
- Notification-triggered route selection does not reveal more information than a normal hosted action link.
- Public copy avoids implying a broader searchable profile or directory exists.

## Sprint 4: Site Acceptance And Public Readiness

### GPTW-S4-T1 Add Browser Acceptance Coverage For Hosted Actions

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S2-T2, globalpayto-site:GPTW-S2-T4

Add browser acceptance coverage for authorization/setup and route-selection hosted actions.

Acceptance notes:

- Tests cover approval, denial, expired, invalid, and completed states.
- Tests verify required UI content is visible and does not overlap at supported viewport sizes.
- Tests do not require production secrets.

### GPTW-S4-T2 Add Responsive And Accessibility Checks

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S2-T2, globalpayto-site:GPTW-S2-T4

Add responsive and accessibility checks for hosted action pages.

Acceptance notes:

- Pages work on mobile and desktop viewports.
- Forms and choices are keyboard accessible.
- Text fits within controls and does not obscure adjacent content.

### GPTW-S4-T3 Update Public README And Setup Docs

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S2-T2, globalpayto-site:GPTW-S2-T4

Update public README and setup docs to describe the GlobalPayTo hosted-action app rather than only the Cubid starter baseline.

Acceptance notes:

- Docs explain local setup, browser-safe env vars, and hosted action flows.
- Docs keep private resolver implementation and secrets out of the public repo.
- Docs link to public SDK docs where protocol details belong.

### GPTW-S4-T4 Validate Public Docs Do Not Link Into The Private Repo

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S4-T3

Review public site docs for private-repo links and private implementation leakage.

Acceptance notes:

- Public docs do not link into private `globalpayto` files.
- Public docs avoid Supabase schema details, provider callback internals, audit internals, service-role usage, and admin processes.
- Cross-repo references point only to public SDK docs or stable dependency IDs.

## Sprint 5: Blog Post Writing And Publishing

### GPTW-S5-T1 Write And Publish Introducing GlobalPayToResolver: Pay Users, Not Wallet Addresses

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S4-T3

Write and publish the core launch post introducing GlobalPayToResolver as a way to pay users by approved identity rather than wallet address.

Acceptance notes:

- Post explains the address-centric UX and privacy problem.
- Post introduces user-approved pay-to identifiers and consented payment intents.
- Post explains that GlobalPayToResolver is powered by Cubid but separate from Cubid.
- Post includes a CTA for early PayToDapp and PayingDapp integrations.

### GPTW-S5-T2 Write And Publish Why Crypto Needs A Pay-To Layer

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S5-T1

Write and publish the ecosystem thesis post explaining why payment resolution is the missing layer between identity, wallets, chains, and apps.

Acceptance notes:

- Post explains why ENS-style names, wallet address books, and payment links are not enough.
- Post frames consent, preferences, route selection, and privacy as core pay-to layer requirements.
- Post keeps user control over receive paths as the main conclusion.

### GPTW-S5-T3 Write And Publish From Wallet Addresses To Payment Intents

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-sdk:GPTS-S1-T5, globalpayto-site:GPTW-S5-T1

Write and publish the product abstraction post explaining why the resolver returns payment intents rather than static addresses.

Acceptance notes:

- Post contrasts static addresses with structured, scoped, expiring payment intents.
- Post covers memos, expiry, one-time routes, provider-specific logic, and auditability.
- Post aligns with the GlobalPayTo JSON intent schema and avoids external protocol promises beyond MVP.

### GPTW-S5-T4 Write And Publish How GlobalPayToResolver Works: The Five Roles

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S5-T1

Write and publish a developer education post explaining the five MVP roles: User, GlobalPayToResolver, Cubid, PayToDapp, and PayingDapp.

Acceptance notes:

- Post clearly separates Cubid identity from resolver payment destination resolution.
- Post explains PayToDapps as receive-path providers and PayingDapps as intent requesters.
- Post emphasizes user consent and preferences.

### GPTW-S5-T5 Write And Publish PayToDapp Vs PayingDapp: Which One Are You?

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S5-T4

Write and publish a practical integration post helping builders identify whether their app is a PayToDapp, PayingDapp, or both.

Acceptance notes:

- Post includes examples such as SmarTrust Wallet, ChainCrew payout flow, marketplace seller wallet, marketplace payout flow, and escrow release systems.
- Post explains that some apps can be both PayToDapp and PayingDapp.
- Post points readers to the relevant public SDK integration path.

### GPTW-S5-T6 Write And Publish Modality A Vs Modality B: Two Ways To Integrate Wallets

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-sdk:GPTS-S1-T2, globalpayto-site:GPTW-S5-T3

Write and publish the wallet integration post comparing Modality A and Modality B while making clear that MVP implementation uses Modality B only.

Acceptance notes:

- Post explains Modality A as resolver-built intents from accounts/addresses.
- Post explains Modality B as route-only registration where the PayToDapp builds the payment intent.
- Post states that Modality B is the MVP path because it is more private and powerful.
- Post frames Modality A as simpler but out of MVP scope.

### GPTW-S5-T7 Write And Publish The Minimal API For Identity-Based Crypto Payments

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-sdk:GPTS-S1-T3, globalpayto-site:GPTW-S5-T3

Write and publish a developer-facing API post with example resolve requests and a CTA to try the SDK.

Acceptance notes:

- Post shows a verified-stamp recipient and supported paths.
- Post explains amount, intent mode, and one-time payment intent behavior.
- Post keeps examples aligned with the public SDK/API contracts.

### GPTW-S5-T8 Write And Publish Building A PayToDapp Integration

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-sdk:GPTS-S1-T2, globalpayto-sdk:GPTS-S1-T4, globalpayto-site:GPTW-S5-T5

Write and publish a wallet-focused integration walkthrough for PayToDapps.

Acceptance notes:

- Post covers app registration, user consent, receive capability registration, Modality B intent handling, path revocation, and mock resolver testing.
- Post avoids instructing MVP PayToDapps to submit wallet addresses.
- Post points to provider SDK helpers when available.

### GPTW-S5-T9 Write And Publish Building A PayingDapp Integration

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-sdk:GPTS-S1-T1, globalpayto-sdk:GPTS-S1-T3, globalpayto-site:GPTW-S5-T5

Write and publish an app-focused integration walkthrough for PayingDapps.

Acceptance notes:

- Post covers collecting a recipient pay-to identifier, requesting resolver authorization, submitting supported paths, and receiving a payment intent.
- Post explains `no_route`, `user_action_required`, and `resolved`.
- Post explains how to present the returned payment intent to the payer.

### GPTW-S5-T10 Write And Publish Why We Don't Use A Universal CubidID

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S5-T4

Write and publish the identity and privacy post explaining why GlobalPayToResolver does not rely on a universal CubidID.

Acceptance notes:

- Post explains why universal IDs are convenient but privacy-hostile.
- Post explains app-scoped `DappUserId` behavior and user-approved pay-to identifiers.
- Post makes cross-dapp tracking prevention feel intentional and mature.

### GPTW-S5-T11 Write And Publish Four Ways To Identify A User For Payment Resolution

Status: TBD  
Feature branch: TBD  
Session log: TBD  
Depends on: globalpayto-site:GPTW-S5-T10

Write and publish the identity model post explaining the main options for identifying a user for payment resolution.

Acceptance notes:

- Post covers verified stamps as pay-to identifiers, PublicCubidPayToID, Cubid-brokered DappUserId sharing, and manual fallback identifiers.
- Post recommends verified stamps as the likely MVP default.
- Post frames public IDs as useful but optional rather than required for payment resolution.
