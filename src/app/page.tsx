import {
  ArrowRight,
  CircleDollarSign,
  Code2,
  GitBranch,
  Link2,
  Route,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import Link from "next/link";

import { MarketingTracks } from "@/components/marketing/marketing-tracks";

const introPoints = [
  {
    icon: Link2,
    title: "One pay-to tag",
    text: "A globally recognized tag becomes the bridge between apps, wallets, users, chains, and assets.",
  },
  {
    icon: Route,
    title: "Optimized routing",
    text: "The sender can send from where they are; the recipient receives only through approved routes.",
  },
  {
    icon: ShieldCheck,
    title: "No wallet graph",
    text: "Apps resolve a payment flow, not a permanent address book of a user's wallets.",
  },
];

const ecosystemSteps = [
  "Paying app asks for a route",
  "GlobalPayTo resolves options",
  "Receiving app creates the intent",
  "User gets paid where they prefer",
];

const solverCards = [
  {
    name: "NEAR Intents / 1Click",
    bestFor: "Crypto-to-crypto swaps, cross-chain stablecoin delivery, and distribution-channel fees.",
    text: "NEAR 1Click gives GlobalPayTo a strong default execution adapter when both sides are crypto or stablecoin. It abstracts intent creation, solver coordination, transaction execution, status tracking, retries, refunds, and quote-level fee configuration behind a REST surface.",
  },
  {
    name: "LI.FI",
    bestFor: "EVM and Solana routing, bridge/DEX aggregation, and wallet-controlled execution.",
    text: "LI.FI is an aggregator/router with a practical developer surface for fetching quotes, executing cross-chain transfers, and tracking status. Its quote model can return an estimated result plus a transaction request that a wallet can sign, which fits payor-wallet UX well.",
  },
  {
    name: "Squid",
    bestFor: "Broad chain coverage, cross-chain swaps, bridges, contract calls, and Cosmos/Axelar-style routes.",
    text: "Squid is useful when GlobalPayTo needs breadth across ecosystems. It covers swaps, bridges, and contract calls across many chains, and its Boost model points toward fast optimistic settlement for eligible routes.",
  },
  {
    name: "0x Cross-Chain API",
    bestFor: "Cross-chain payments, EVM/Solana routing, stablecoin settlement, fallback paths, and progress tracking.",
    text: "0x is especially relevant because cross-chain payments are part of its positioning. It can become a high-quality execution adapter for stablecoin payment flows where quote speed, fallback behavior, and execution tracking matter.",
  },
  {
    name: "Across",
    bestFor: "Fast EVM/L2 stablecoin bridging with lower route complexity where supported.",
    text: "Across is narrower than broad solver networks, but that can be a strength. For supported EVM and L2 stablecoin transfers, it offers a simpler bridge-focused path that can be easier to evaluate and present to sending apps.",
  },
  {
    name: "LayerZero / Stargate",
    bestFor: "Cross-chain token transfers, OFT assets, LayerZero ecosystem routes, and Stargate-supported stablecoins.",
    text: "LayerZero Value Transfer and Stargate matter where token transfer infrastructure is already strong. GlobalPayTo should treat them as execution adapters that need careful asset canonicalization, not as recipient-resolution systems.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f7f2] text-[#121612]">
      <section className="relative overflow-hidden border-b border-[#d9dfd1] bg-[#0f1712] text-white">
        <div className="absolute inset-0 opacity-55">
          <div className="h-full w-full bg-[radial-gradient(circle_at_18%_28%,rgba(63,167,111,0.42),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(87,134,192,0.36),transparent_24%),linear-gradient(135deg,#0f1712_0%,#17251b_48%,#0d1511_100%)]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#97c39d] to-transparent" />

        <div className="relative mx-auto grid min-h-[calc(100svh-73px)] max-w-7xl content-center gap-12 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="animate-[fadeUp_650ms_ease-out_both]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9fd3a5]">
              Pay users, not wallet addresses
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal sm:text-7xl">
              A global pay-to layer for crypto apps.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d6dfd1]">
              GlobalPayTo lets sending apps reach any user through a simple tag
              while receiving apps and wallets stay in control of where funds
              land.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#9fd3a5] px-5 text-sm font-semibold text-[#101710] transition hover:bg-[#b8e3ba]"
                href="#tracks"
              >
                Choose your track
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md border border-[#6f806f] px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                href="/blog"
              >
                Read the blog
              </Link>
            </div>
          </div>

          <div className="animate-[fadeUp_800ms_160ms_ease-out_both]">
            <div className="relative mx-auto aspect-square max-w-[34rem]">
              <div className="absolute inset-8 rounded-full border border-[#d6e5d0]/20" />
              <div className="absolute inset-20 rounded-full border border-[#d6e5d0]/25" />
              <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#9fd3a5]/40 bg-[#f6f7f2] text-[#121612] shadow-2xl">
                <span className="text-center text-sm font-bold leading-5">
                  pay-to
                  <br />
                  tag
                </span>
              </div>
              {ecosystemSteps.map((step, index) => (
                <div
                  className={`absolute max-w-40 rounded-md border border-white/15 bg-white/10 p-3 text-sm leading-5 text-[#eef4ea] backdrop-blur transition duration-200 hover:-translate-y-1 hover:bg-white/15 ${
                    index === 0
                      ? "left-0 top-16"
                      : index === 1
                        ? "right-0 top-24"
                        : index === 2
                          ? "bottom-20 left-3"
                          : "bottom-10 right-4"
                  }`}
                  key={step}
                >
                  {step}
                </div>
              ))}
              <div className="absolute left-1/2 top-1/2 h-[78%] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-b from-transparent via-[#9fd3a5]/70 to-transparent" />
              <div className="absolute left-1/2 top-1/2 h-[78%] w-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gradient-to-b from-transparent via-[#8cb0d8]/70 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d9dfd1] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#176b46]">
              The network layer
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              Three audiences. One payment primitive.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {introPoints.map((item) => {
              const Icon = item.icon;

              return (
                <div className="border-l border-[#d9dfd1] pl-5" key={item.title}>
                  <Icon className="text-[#245c8d]" size={22} aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#586250]">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <MarketingTracks />

      <section
        className="border-t border-[#d9dfd1] bg-[#101710] text-white"
        id="solver-adapters"
        data-testid="solver-adapters"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9fd3a5]">
                Solver-ready execution
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight">
                Quote every viable crypto-native route when no solver is preferred.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#c9d7c4]">
                GlobalPayTo resolves who should receive. Execution adapters then
                compete or route the payment without learning the recipient&apos;s
                broader wallet graph.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {solverCards.map((solver) => (
                <article
                  className="rounded-md border border-white/12 bg-white/[0.06] p-5 transition duration-200 hover:-translate-y-1 hover:bg-white/[0.09]"
                  key={solver.name}
                >
                  <h3 className="text-lg font-semibold">{solver.name}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#9fd3a5]">
                    {solver.bestFor}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#d7e1d2]">{solver.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f7f2]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#176b46]">
              Developer-led, user-safe
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              Built to reduce integration surface area without taking control
              away from apps.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Code2,
                title: "Simple API",
                text: "Sending apps ask for a payment route by tag instead of collecting wallet details.",
              },
              {
                icon: WalletCards,
                title: "Wallet-native setup",
                text: "Receiving apps can own setup inside their existing wallet experience.",
              },
              {
                icon: GitBranch,
                title: "Route choice",
                text: "Users approve what they can receive; routing handles the rest.",
              },
              {
                icon: CircleDollarSign,
                title: "Fee control",
                text: "Sender apps set and pay their fees; receiving users pay nothing to receive.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div className="rounded-md border border-[#d9dfd1] bg-white p-5" key={item.title}>
                  <Icon className="text-[#245c8d]" size={22} aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#586250]">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#d9dfd1] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold">Ready to build on pay-to tags?</h2>
            <p className="mt-2 text-sm leading-6 text-[#586250]">
              Start with the track that matches your app, then wire the SDK
              contracts into your product flow.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-11 items-center justify-center rounded-md bg-[#176b46] px-5 text-sm font-semibold text-white transition hover:bg-[#12583a]"
              href="#tracks"
            >
              Compare tracks
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
