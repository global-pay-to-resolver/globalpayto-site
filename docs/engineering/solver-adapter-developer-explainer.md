# Solver Adapter Developer Explainer

Date: 2026-06-26  
Status: Public MVP guidance  
Repo: `globalpayto-site`

## Purpose

GlobalPayTo resolves who should receive a payment before execution adapters quote or route the payment. Solver and router adapters are execution tools, not recipient preference engines.

For public protocol details, use the public SDK repository:

- `globalpayto-sdk/docs/engineering/protocol-and-sdk-architecture.md`
- `globalpayto-sdk/docs/engineering/mvp-api-contracts.md`
- `globalpayto-sdk/docs/integration/paying-dapps.md`

## Payor-App Flow

Payor-apps should think about the flow in three layers:

1. Build a resolver request from sender-side state: recipient pay-to tag, amount, supported source paths, and a payor-app reference.
2. Let GlobalPayTo resolve the recipient's approved receive requirement.
3. Ask execution adapters for quotes or transaction requests that can satisfy that receive requirement.

The receive requirement is the boundary between resolution and execution. A typical resolved execution input looks like:

```json
{
  "destinationAsset": "eip155:8453/erc20:0x...",
  "recipient": "eip155:8453:0x...",
  "amount": "25000000",
  "expiresAt": "2026-06-26T20:00:00Z"
}
```

Adapters may quote bridges, swaps, transaction requests, or intent-based execution. They must not choose which PayToDapp the recipient prefers and must not expose the recipient's wallet graph.

## Preferred Solver Vs Fanout

If a payor-app selects a preferred solver, only that solver should be asked for a quote. This is useful when an app has a commercial route, compliance requirement, wallet UX constraint, or known execution preference.

If no preferred solver is selected, the SDK helper requests quotes from every configured provider and returns successful quote results. This lets the payor-app compare viable execution paths without making GlobalPayTo responsible for choosing the final transaction.

The MVP public solver set is:

- NEAR Intents / 1Click
- LI.FI
- Squid
- 0x Cross-Chain API
- Across
- LayerZero / Stargate

## Privacy Boundary

Solver adapters consume a resolved receive requirement. They should not receive:

- unrelated PayToDapps,
- route preference history,
- raw verified identifiers,
- wallet inventory,
- private resolver diagnostics,
- server-only write credentials,
- private execution configuration.

Public pages may explain adapter behavior, tradeoffs, and examples. Private provider policy, credentials, operational routing configuration, and backend storage details stay outside this repo.
