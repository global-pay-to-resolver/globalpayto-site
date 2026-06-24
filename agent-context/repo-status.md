# Repo Status

| Requirement | Status |
| --- | --- |
| README quality | Partial - README is relabeled for GlobalPayTo but still documents the Cubid starter baseline. |
| License | Missing - no license chosen for this public repo. |
| AGENTS guidance | Pass - repo role, upstream fork note, package path caveat, and session-log expectations are documented. |
| Session log | Pass - canonical `agent-context/session-log/` folder and guidance exist. |
| Future ideas | Pass - deferred ideas file exists and is explicitly not an active roadmap. |
| Docs placement | Partial - no product docs yet; add `docs/engineering/` when the app diverges from starter behavior. |
| Cubid architecture | Partial - starter uses Cubid packages; GlobalPayTo-specific architecture is not documented yet. |
| Testing strategy | Partial - lint, typecheck, and build scripts exist; no tests or coverage governance yet. |
| Local acceptance harness | Missing - no browser acceptance flow has been added for GlobalPayTo yet. |
| CI | Missing - local scripts pass, but portable CI is blocked while dependencies use local `workspace:*` Cubid packages. |
| Supabase access rules | Not applicable - public site repo should not own production Supabase reads or writes. |
| Environment and scripts | Partial - `.env.example` exists; workspace package paths are corrected for this machine but remain local-machine specific. |
