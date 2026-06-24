# Main Session Log

agent: Codex
branch: main
head: 91003ef
summary: Added and README-linked a public hosted user-actions architecture doc for authorization, setup, and route-selection pages while keeping private resolver implementation out of the site boundary.
validation: Reviewed the MVP PRD split and confirmed the site doc references only public architecture docs.
follow-ups: Replace starter content with GlobalPayTo app/site behavior and make dependency setup portable for CI.

---

agent: Codex
branch: main
head: dd0aa50
summary: Completed GPTW-S1-T1 by finalizing the browser-safe hosted action page contract.
validation: Confirmed hosted actions use opaque short-lived identifiers and cover approval, denial, route selection, expired, invalid, completed, and restart-required outcomes.
follow-ups: Continue site Sprint 1 with browser-safe runtime configuration and public copy for statuses and notifications.

---

agent: Codex
branch: main
head: 5bddca5
summary: Completed GPTW-S1-T2 by documenting browser-safe runtime configuration boundaries for hosted action pages.
validation: Confirmed resolver secrets, Cubid dapp API keys, service-role keys, provider callback credentials, and production database credentials stay out of browser env vars and bundles.
follow-ups: Finish site Sprint 1 with public copy for resolver statuses and Cubid comms notifications.

---

agent: Codex
branch: main
head: c414106
summary: Completed GPTW-S1-T3 by defining public copy requirements for resolver statuses and Cubid comms notifications.
validation: Confirmed copy coverage for setup, route selection, authorization, provider unavailable, expired/invalid links, payment intent created, payment received, and user action required without private diagnostics or wallet graph claims.
follow-ups: Site Sprint 2 can begin hosted action app design after SDK contract dependencies remain complete.

---

agent: Codex
branch: main
head: 1e6857f
summary: Tightened site architecture, TODO requirements, and blog roadmap notes to match the MVP PRD trust-boundary updates, including opaque action URLs, post-validation hydration, intent-created-only notification copy, and broader browser leak checks.
validation: Confirmed site architecture, TODO, and blog authoring docs no longer contain raw REVIEW notes or payment_received/payment received MVP requirements, and removed the local sibling-checkout architecture link from public docs.
follow-ups: Align SDK public docs/TODOs with the tightened MVP notification and action-token boundaries before implementation continues.
