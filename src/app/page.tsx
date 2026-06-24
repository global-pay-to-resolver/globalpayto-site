import {
  BellRing,
  CheckCircle2,
  Fingerprint,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const actionLinks = [
  {
    href: "/actions/setup/gptr_act_setup_demo",
    icon: ShieldCheck,
    title: "Review setup authorization",
    text: "Approve a scoped payment-resolution grant without exposing wallet graph details.",
  },
  {
    href: "/actions/route-selection/gptr_act_route_demo",
    icon: GitBranch,
    title: "Choose a route default",
    text: "Pick one eligible PayToDapp for a single app, identifier, chain, network, and asset tuple.",
  },
];

const principles = [
  {
    icon: Fingerprint,
    title: "Verified identifiers",
    text: "Users pay with Cubid-backed stamps while hosted actions show masked displays only.",
  },
  {
    icon: CheckCircle2,
    title: "Scoped consent",
    text: "Every action is limited to the requesting app and the current payment-resolution purpose.",
  },
  {
    icon: BellRing,
    title: "Intent notifications",
    text: "MVP notification copy is limited to payment intent created events through Cubid comms.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f4] text-[#151713]">
      <section className="border-b border-[#d9dfd1] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-normal text-[#111611] sm:text-6xl">
              GlobalPayTo hosted actions
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4f5a49]">
              Users approve payment-resolution setup and route choices in a
              browser-safe flow. The site receives opaque action identifiers,
              hydrates only the current action, and avoids private resolver
              state.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#176b46] px-5 text-sm font-semibold text-white transition hover:bg-[#12583a]"
                href="/actions/setup/gptr_act_setup_demo"
              >
                Open setup action
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md border border-[#cbd4c3] bg-white px-5 text-sm font-semibold text-[#2c3429] transition hover:bg-[#f1f4ec]"
                href="/actions/route-selection/gptr_act_route_demo"
              >
                Open route selection
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {actionLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  className="grid grid-cols-[auto_1fr] gap-4 rounded-lg border border-[#d9dfd1] bg-[#fbfcf8] p-5 shadow-sm transition hover:border-[#b9c7ad]"
                  href={item.href}
                  key={item.href}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#e4f2e6] text-[#176b46]">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold text-[#151713]">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-[#586250]">
                      {item.text}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 py-8 lg:grid-cols-3 lg:px-8">
        {principles.map((item) => {
          const Icon = item.icon;

          return (
            <div className="rounded-lg border border-[#d9dfd1] bg-white p-5" key={item.title}>
              <Icon className="text-[#245c8d]" size={22} aria-hidden="true" />
              <h2 className="mt-4 text-base font-semibold text-[#151713]">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#586250]">{item.text}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
