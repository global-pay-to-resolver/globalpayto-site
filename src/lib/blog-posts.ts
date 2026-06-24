export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
  body: BlogBlock[];
}

export type BlogBlock =
  | {
    type: "paragraph";
    text: string;
  }
  | {
    type: "heading";
    text: string;
  }
  | {
    type: "list";
    items: string[];
  }
  | {
    type: "code";
    code: string;
  };

export const blogPosts: BlogPost[] = [
  {
    slug: "introducing-globalpaytoresolver-pay-users-not-wallet-addresses",
    title: "Introducing GlobalPayToResolver: Pay Users, Not Wallet Addresses",
    description:
      "GlobalPayToResolver helps apps pay users through approved identity and consented payment intents instead of copied wallet addresses.",
    category: "Product / Vision",
    publishedAt: "2026-06-24",
    readingMinutes: 5,
    body: [
      {
        type: "paragraph",
        text: "Crypto payments still ask too much of users and too little of apps. If an app needs to pay someone, the default answer is usually a wallet address: paste it, store it, hope it is current, and hope it belongs to the right person on the right chain.",
      },
      {
        type: "paragraph",
        text: "That address-centric model is brittle. Users have many wallets, many chains, rotating preferences, and different receive paths for different contexts. Apps should not have to guess where funds should land, and users should not have to expose more of their wallet graph just to get paid.",
      },
      {
        type: "heading",
        text: "A pay-to identifier is not a wallet address",
      },
      {
        type: "paragraph",
        text: "GlobalPayToResolver starts from a different question: what user-approved identifier can an app pay to? A verified email-like stamp, domain-like stamp, public pay-to handle, or other approved identifier can become the entry point for payment resolution without becoming a permanent public wallet endpoint.",
      },
      {
        type: "paragraph",
        text: "The resolver does not turn that identifier into a durable address book record. It turns the request into a scoped, consent-aware payment intent that fits the current app, user, asset, route, and authorization state.",
      },
      {
        type: "heading",
        text: "Powered by Cubid, separate from Cubid",
      },
      {
        type: "paragraph",
        text: "Cubid provides the identity and consent substrate: verified stamps, app-scoped user identity, and user-facing approval moments. GlobalPayToResolver is the payment-resolution layer that uses that identity context to decide what receive path can be used for a specific payment request.",
      },
      {
        type: "paragraph",
        text: "That separation matters. Cubid is not being treated as a universal payment address, and GlobalPayToResolver is not trying to become the identity provider. Each layer has a narrow job.",
      },
      {
        type: "heading",
        text: "For apps that pay and apps that receive",
      },
      {
        type: "list",
        items: [
          "PayingDapps ask the resolver for a payment intent for a user-approved identifier and supported payment paths.",
          "PayToDapps register receive capabilities and, in the MVP path, produce provider-specific payment intents when selected.",
          "Users approve setup, authorizations, and route choices through hosted actions that reveal only the current action context.",
        ],
      },
      {
        type: "paragraph",
        text: "The result is a cleaner primitive: pay the user, not an address copied from yesterday's wallet state.",
      },
      {
        type: "heading",
        text: "Early integrations",
      },
      {
        type: "paragraph",
        text: "We are building with early PayToDapp and PayingDapp partners now. Wallets, embedded wallet providers, payout products, marketplaces, and escrow systems are the first natural fits. If your app helps users receive funds or needs to pay users, GlobalPayToResolver is meant to give that workflow a safer default.",
      },
    ],
  },
  {
    slug: "why-crypto-needs-a-pay-to-layer",
    title: "Why Crypto Needs a Pay-To Layer",
    description:
      "Identity, wallets, chains, and apps are fragmented. A pay-to layer connects who should be paid with where funds should safely go.",
    category: "Product / Vision",
    publishedAt: "2026-06-24",
    readingMinutes: 5,
    body: [
      {
        type: "paragraph",
        text: "Crypto has strong primitives for signing, custody, and settlement, but the everyday act of paying a person is still awkward. Apps often know who should receive funds, while payment rails ask where to send funds. That gap is where mistakes, privacy leaks, and abandoned flows appear.",
      },
      {
        type: "paragraph",
        text: "A pay-to layer is the missing connective tissue between identity, wallets, chains, and apps. It lets a user present an approved payment identity while retaining control over the actual receive path.",
      },
      {
        type: "heading",
        text: "Names and links are not enough",
      },
      {
        type: "list",
        items: [
          "ENS-style names are useful, but they usually resolve to durable public destinations or public profile records.",
          "Wallet address books help repeat senders, but they do not express user consent, route preference, or app-specific authorization.",
          "Payment links can start a payment flow, but they are usually created by the receiver or provider, not resolved from the payer's user context.",
        ],
      },
      {
        type: "paragraph",
        text: "Each tool solves part of the problem. None of them fully answers how an app should pay a user when that user may have several wallets, several verified identifiers, and different preferences depending on chain, asset, app, and purpose.",
      },
      {
        type: "heading",
        text: "Payment resolution is a product layer",
      },
      {
        type: "paragraph",
        text: "The hard part is not looking up a string. The hard part is combining consent, preference, route selection, privacy, expiry, and provider behavior into a result the paying app can actually use.",
      },
      {
        type: "paragraph",
        text: "GlobalPayToResolver treats those concerns as the product, not as edge cases. A user can authorize a PayingDapp, choose or confirm a PayToDapp route, and receive a scoped payment intent without exposing every eligible wallet or receive provider to the payer.",
      },
      {
        type: "heading",
        text: "User control is the center",
      },
      {
        type: "paragraph",
        text: "The pay-to layer should not become a universal directory of people and wallets. It should help the user decide how they are payable in a specific context. That means route defaults are scoped, action links are opaque, and negative outcomes avoid telling a payer whether an identifier exists, lacks a route, or needs setup.",
      },
      {
        type: "paragraph",
        text: "Crypto needs a pay-to layer because payment destinations are no longer simple. The safer default is to pay an approved user identifier and let the user's authorized receive path produce the payment intent.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
