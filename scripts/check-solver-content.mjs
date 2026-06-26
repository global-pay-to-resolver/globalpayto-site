import { readFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.cwd();
const homepage = readFileSync(join(repoRoot, "src/app/page.tsx"), "utf8");
const explainer = readFileSync(
  join(repoRoot, "docs/engineering/solver-adapter-developer-explainer.md"),
  "utf8",
);

const requiredSolverNames = [
  "NEAR Intents / 1Click",
  "LI.FI",
  "Squid",
  "0x Cross-Chain API",
  "Across",
  "LayerZero / Stargate",
];

const forbiddenPatterns = [
  /globalpayto\/docs/i,
  /service[- ]role/i,
  /SUPABASE_SERVICE/i,
  /PROVIDER_CALLBACK/i,
  /DATABASE_URL/i,
  /provider credential/i,
  /private resolver env/i,
];

for (const solverName of requiredSolverNames) {
  if (!homepage.includes(solverName)) {
    throw new Error(`Homepage solver section is missing ${solverName}`);
  }
}

const publicContent = `${homepage}\n${explainer}`;
for (const pattern of forbiddenPatterns) {
  if (pattern.test(publicContent)) {
    throw new Error(`Solver public content contains forbidden private-boundary term: ${pattern}`);
  }
}

if (!homepage.includes('id="solver-adapters"')) {
  throw new Error("Homepage solver section is missing the solver-adapters anchor");
}

if (!homepage.includes("grid gap-4 md:grid-cols-2")) {
  throw new Error("Homepage solver card grid is missing the responsive mobile-to-desktop layout class");
}

if (!homepage.includes("max-w-7xl px-6")) {
  throw new Error("Homepage solver section is missing constrained responsive page padding");
}

console.log("solver_content_ok");
