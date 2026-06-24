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
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
