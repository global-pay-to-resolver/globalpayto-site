"use client";

import {
  BadgeCheck,
  BanknoteArrowDown,
  Check,
  Code2,
  Gift,
  Landmark,
  Network,
  PlugZap,
  Repeat2,
  ShieldCheck,
  Sparkles,
  Tags,
  WalletCards,
} from "lucide-react";
import { useState } from "react";

type TrackId = "sending" | "receiving" | "users";

const tracks: Record<
  TrackId,
  {
    accent: string;
    audience: string;
    benefits: Array<{ icon: typeof Code2; title: string; text: string }>;
    eyebrow: string;
    features: string[];
    intro: string;
    title: string;
  }
> = {
  sending: {
    accent: "#176b46",
    audience: "For devs of sending apps",
    eyebrow: "Expand what your app can send",
    title: "Send to any user by pay-to tag.",
    intro:
      "No pre-registration requirement. No wallet collection. No chain-by-chain routing maze for your users.",
    benefits: [
      {
        icon: Code2,
        title: "One interface",
        text: "Send any token from any chain directly into a user's preferred receive app by resolving a simple pay-to tag.",
      },
      {
        icon: Network,
        title: "Radical abstraction",
        text: "Hide wallet, route, bridge, and exchange complexity behind one resolver flow.",
      },
      {
        icon: Repeat2,
        title: "Optional optimization",
        text: "Use auto route optimization, bridging, and exchanging when you want one managed path.",
      },
      {
        icon: BanknoteArrowDown,
        title: "Fee control",
        text: "You set your own fees. If you use our exchange service, MyPayTag takes a percentage of your fees.",
      },
    ],
    features: [
      "Reach users without storing their wallets",
      "Play nicely with every receiving app in the ecosystem",
      "Keep control over fees, routes, and user experience",
      "Reduce support caused by wrong-chain and wrong-address sends",
    ],
  },
  receiving: {
    accent: "#245c8d",
    audience: "For receiving apps and wallets",
    eyebrow: "Turn users into distribution",
    title: "Let your users market your wallet for you.",
    intro:
      "Users share one globally recognized pay-to tag, and incoming funds land in the wallet experience your app manages.",
    benefits: [
      {
        icon: Gift,
        title: "Inbound growth",
        text: "Every pay-to tag your users share can route funds back into your app-managed wallet.",
      },
      {
        icon: WalletCards,
        title: "Less top-up friction",
        text: "Reduce reliance on on-ramps by letting other apps send value directly to your users.",
      },
      {
        icon: PlugZap,
        title: "Account abstraction",
        text: "Give users a simpler receive experience without asking every sender to understand your wallet stack.",
      },
      {
        icon: Landmark,
        title: "Zero inbound fees",
        text: "Pay nothing to set up and nothing for inbound transfers. Watch balances grow for your users.",
      },
    ],
    features: [
      "Set up tags from inside your wallet flow",
      "Stay compatible with sending apps across the ecosystem",
      "Own the receive experience and route registration",
      "Keep users engaged without forcing manual address sharing",
    ],
  },
  users: {
    accent: "#6a5c1f",
    audience: "For users",
    eyebrow: "A simpler way to get paid",
    title: "Connect your apps and wallets with one pay-to tag.",
    intro:
      "Set up the tag from your favorite wallet, then tell other apps this is how you want to get paid.",
    benefits: [
      {
        icon: Tags,
        title: "One tag",
        text: "Use a globally recognized pay-to tag instead of copying addresses across every app.",
      },
      {
        icon: ShieldCheck,
        title: "Pre-approved receives",
        text: "Apps can send any token, but you only receive tokens and routes you have approved.",
      },
      {
        icon: Sparkles,
        title: "No routing hassle",
        text: "MyPayTag handles chain, token, exchange, and route complexity behind the scenes.",
      },
      {
        icon: BadgeCheck,
        title: "Free to receive",
        text: "You pay nothing to receive funds. Sender apps set their fees and pay the fees.",
      },
    ],
    features: [
      "Set up from your favorite wallet",
      "Share the same tag across apps",
      "Receive only through routes you approve",
      "Let optimized routing handle the messy parts",
    ],
  },
};

const trackOrder: TrackId[] = ["sending", "receiving", "users"];

export function MarketingTracks() {
  const [selectedTrack, setSelectedTrack] = useState<TrackId | null>(null);
  const visibleTracks = selectedTrack ? [selectedTrack] : trackOrder;

  return (
    <section className="border-b border-[#d9dfd1] bg-[#fbfcf8]" id="tracks">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#176b46]">
            Choose a track
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight">
            What role do you play?
          </h2>
          <p className="mt-4 text-base leading-7 text-[#586250]">
            MyPayTag connects three groups. All benefits are visible until
            you pick the role that matches your product.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {trackOrder.map((trackId) => {
            const option = tracks[trackId];
            const active = selectedTrack === trackId;

            return (
              <button
                className={`inline-flex h-11 items-center gap-3 rounded-md border px-4 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${
                  active
                    ? "border-[#121612] bg-white text-[#121612] shadow-sm"
                    : "border-[#d9dfd1] bg-[#f6f7f2] hover:border-[#b9c7ad]"
                }`}
                key={trackId}
                onClick={() => setSelectedTrack(active ? null : trackId)}
                type="button"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: option.accent }}
                />
                <span>{option.audience}</span>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-sm border ${
                    active
                      ? "border-[#121612] bg-[#121612] text-white"
                      : "border-[#b9c7ad] bg-white text-transparent"
                  }`}
                >
                  <Check size={14} aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-10 border-t border-[#d9dfd1] pt-10">
          {visibleTracks.map((trackId) => {
            const track = tracks[trackId];

            return (
              <section
                className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"
                key={trackId}
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#586250]">
                    {track.eyebrow}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#121612] sm:text-4xl">
                    {track.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[#586250]">
                    {track.intro}
                  </p>
                  <ul className="mt-8 grid gap-3">
                    {track.features.map((feature) => (
                      <li className="flex gap-3 text-sm leading-6 text-[#3f493a]" key={feature}>
                        <span
                          className="mt-2 h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: track.accent }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {track.benefits.map((benefit) => {
                    const Icon = benefit.icon;

                    return (
                      <div className="rounded-md border border-[#d9dfd1] bg-white p-5" key={benefit.title}>
                        <Icon style={{ color: track.accent }} size={22} aria-hidden="true" />
                        <h4 className="mt-4 text-lg font-semibold text-[#121612]">
                          {benefit.title}
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-[#586250]">{benefit.text}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
