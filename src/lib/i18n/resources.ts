import type {
  TranslationKey,
  TranslationNamespace,
} from "@/lib/i18n/namespaces";
import { translationKeys, translationNamespaces } from "@/lib/i18n/namespaces";

export type NamespaceResource<N extends TranslationNamespace> = Record<
  TranslationKey<N>,
  string
>;

export type TranslationResources = {
  [N in TranslationNamespace]: NamespaceResource<N>;
};

const en = {
  common: {
    brandName: "MyPayTag",
    loading: "Loading",
    mockMode: "Development fixture",
    users: "{{count}} users",
    mainnet: "Mainnet",
    testnet: "Testnet",
    notAvailableYet: "Not available yet",
  },
  navigation: {
    tracks: "Tracks",
    blog: "Blog",
    enterPaytag: "Enter Paytag",
    apiDocs: "API Docs",
    playground: "Playground",
    reference: "Reference",
    history: "History",
    github: "GitHub",
    developer: "Developer",
    signedInAs: "Signed in as {{credential}}",
    loginUser: "Log in as user",
    loginDeveloper: "Log in as developer",
    loginUserDescription: "Access route choices and incoming history.",
    loginDeveloperDescription: "Manage API access, team invites, and app history.",
  },
  buttons: {
    back: "Back",
    cancel: "Cancel",
    chooseTrack: "Choose your track",
    connect: "Connect",
    continue: "Continue",
    copy: "Copy",
    disconnect: "Disconnect",
    readApiDocs: "Read API docs",
    retry: "Retry",
    rotate: "Rotate",
    save: "Save",
    signIn: "Sign in",
    signOut: "Sign out",
    submit: "Submit",
  },
  settings: {
    localeLabel: "Locale",
    localeEnglish: "English",
    localeSwedish: "Swedish",
    localePseudo: "Pseudo-locale",
    localeDetectedSweden: "Swedish selected for Sweden.",
    localeDefaultEnglish: "English is used globally by default.",
  },
  onboarding: {
    heroEyebrow: "Pay users, not wallet addresses",
    heroTitle: "A Paytag layer for crypto apps.",
    heroDescription:
      "MyPayTag lets PayingDapps reach any user through a Paytag while PayToDapps stay in control of the provider intent they create.",
    networkEyebrow: "The network layer",
    networkTitle: "Three audiences. One MVP payment path.",
    paytagId: "Paytag ID",
    ecosystemStepPayingDapp: "PayingDapp submits a Paytag",
    ecosystemStepRoute: "MyPayTag selects a route",
    ecosystemStepPayToDapp: "PayToDapp creates the intent",
    ecosystemStepInstructions: "PayingDapp receives one-time instructions",
  },
  developer: {
    metadataTitle: "Register your app",
    metadataDescription:
      "Add app metadata before issuing a browser-visible API key.",
    appNameLabel: "Marketing name",
    appUrlLabel: "App URL",
    environmentLabel: "Environment",
    apiKeyTitle: "API key",
    apiKeyIssued: "API key issued",
    localeFixtureTitle: "Locale fixture",
    localeFixtureDescription:
      "Switch UI language locally to inspect translations and layout.",
  },
  playground: {
    title: "API playground",
    description: "Try resolver payloads against mock or configured backend flows.",
    localMockLabel: "Local mock response",
    realBackendLabel: "Real backend response",
    quoteTitle: "NEAR 1Click quote",
    selectedQuoteTitle: "Selected quote",
  },
  hostedAction: {
    routeSelectionTitle: "Choose a receive route",
    routeSelectionDescription:
      "Select which PayToDapp should receive this payment route.",
    expiredTitle: "This action link has expired",
    invalidTitle: "This action link cannot be used",
    completedTitle: "Route selection complete",
    deniedTitle: "Route selection declined",
    selectDefaultRoute: "Select as default route",
  },
  pay: {
    enterPaytagTitle: "Enter a Paytag",
    enterPaytagDescription:
      "Connect a wallet, enter a destination Paytag, and compare direct or quoted payment options.",
    paytagLabel: "Destination Paytag",
    amountLabel: "Amount",
    tokenLabel: "Token",
    directOptionsTitle: "Direct payment options",
    quoteOptionsTitle: "Quote options",
    registeredWalletsEyebrow: "Registered PayTo wallets",
    registeredWalletsTitle: "Wallets with active mainnet receive registrations.",
    registeredWalletsDescription:
      "This directory shows public app metadata only. It does not expose users, wallet addresses, balances, route preferences, provider internals, or testnet-only registrations.",
    mainnetWalletDescription:
      "Mainnet PayTo wallet with active registered users.",
    emptyWalletDirectory:
      "No public mainnet PayTo wallet entries are available yet.",
  },
  marketing: {
    onePaytagTitle: "One Paytag",
    onePaytagText:
      "A MyPayTag-branded payment identity gives paying apps one user-approved handle to start from.",
    mvpRouteSelectionTitle: "MVP route selection",
    mvpRouteSelectionText:
      "MyPayTag selects an approved PayToDapp route for the current paytag, asset, network, and paying app.",
    cubidIdentityTitle: "Cubid stays identity-only",
    cubidIdentityText:
      "Cubid powers verified identity, consent, and aliases without receiving wallet, route, or payment details.",
    solverEyebrow: "Execution adapter",
    solverTitle: "NEAR 1Click first, broader solver fanout later.",
    phaseOneAdapter: "Phase 1 MVP adapter",
    phaseTwoAdapter: "Phase 2 adapter",
  },
} satisfies TranslationResources;

const sv = {
  common: {
    brandName: "MyPayTag",
    loading: "Laddar",
    mockMode: "Utvecklingsfixtur",
    users: "{{count}} användare",
    mainnet: "Mainnet",
    testnet: "Testnet",
    notAvailableYet: "Inte tillgängligt än",
  },
  navigation: {
    tracks: "Spår",
    blog: "Blogg",
    enterPaytag: "Ange Paytag",
    apiDocs: "API-dokumentation",
    playground: "Testyta",
    reference: "Referens",
    history: "Historik",
    github: "GitHub",
    developer: "Utvecklare",
    signedInAs: "Inloggad som {{credential}}",
    loginUser: "Logga in som användare",
    loginDeveloper: "Logga in som utvecklare",
    loginUserDescription: "Öppna ruttval och inkommande historik.",
    loginDeveloperDescription:
      "Hantera API-åtkomst, teaminbjudningar och apphistorik.",
  },
  buttons: {
    back: "Tillbaka",
    cancel: "Avbryt",
    chooseTrack: "Välj spår",
    connect: "Anslut",
    continue: "Fortsätt",
    copy: "Kopiera",
    disconnect: "Koppla från",
    readApiDocs: "Läs API-dokumentation",
    retry: "Försök igen",
    rotate: "Rotera",
    save: "Spara",
    signIn: "Logga in",
    signOut: "Logga ut",
    submit: "Skicka",
  },
  settings: {
    localeLabel: "Språk",
    localeEnglish: "Engelska",
    localeSwedish: "Svenska",
    localePseudo: "Pseudospråk",
    localeDetectedSweden: "Svenska valdes för Sverige.",
    localeDefaultEnglish: "Engelska används globalt som standard.",
  },
  onboarding: {
    heroEyebrow: "Betala användare, inte plånboksadresser",
    heroTitle: "Ett Paytag-lager för kryptoappar.",
    heroDescription:
      "MyPayTag låter PayingDapps nå en användare via en Paytag medan PayToDapps behåller kontrollen över den provider-intent de skapar.",
    networkEyebrow: "Nätverkslagret",
    networkTitle: "Tre målgrupper. En MVP-betalningsväg.",
    paytagId: "Paytag-ID",
    ecosystemStepPayingDapp: "PayingDapp skickar en Paytag",
    ecosystemStepRoute: "MyPayTag väljer en rutt",
    ecosystemStepPayToDapp: "PayToDapp skapar intenten",
    ecosystemStepInstructions: "PayingDapp får engångsinstruktioner",
  },
  developer: {
    metadataTitle: "Registrera din app",
    metadataDescription:
      "Lägg till appmetadata innan en API-nyckel som syns i webbläsaren skapas.",
    appNameLabel: "Marknadsnamn",
    appUrlLabel: "App-URL",
    environmentLabel: "Miljö",
    apiKeyTitle: "API-nyckel",
    apiKeyIssued: "API-nyckel skapad",
    localeFixtureTitle: "Språkfixtur",
    localeFixtureDescription:
      "Byt språk lokalt för att granska översättningar och layout.",
  },
  playground: {
    title: "API-testyta",
    description:
      "Prova resolver-payloads mot mockade eller konfigurerade backendflöden.",
    localMockLabel: "Lokalt mockat svar",
    realBackendLabel: "Riktigt backendsvar",
    quoteTitle: "NEAR 1Click-offert",
    selectedQuoteTitle: "Vald offert",
  },
  hostedAction: {
    routeSelectionTitle: "Välj mottagningsrutt",
    routeSelectionDescription:
      "Välj vilken PayToDapp som ska ta emot den här betalningsrutten.",
    expiredTitle: "Den här åtgärdslänken har löpt ut",
    invalidTitle: "Den här åtgärdslänken kan inte användas",
    completedTitle: "Ruttvalet är klart",
    deniedTitle: "Ruttvalet avböjdes",
    selectDefaultRoute: "Välj som standardrutt",
  },
  pay: {
    enterPaytagTitle: "Ange en Paytag",
    enterPaytagDescription:
      "Anslut en plånbok, ange en mottagande Paytag och jämför direkta eller offererade betalningsalternativ.",
    paytagLabel: "Mottagande Paytag",
    amountLabel: "Belopp",
    tokenLabel: "Token",
    directOptionsTitle: "Direkta betalningsalternativ",
    quoteOptionsTitle: "Offertalternativ",
    registeredWalletsEyebrow: "Registrerade PayTo-plånböcker",
    registeredWalletsTitle:
      "Plånböcker med aktiva mottagningsregistreringar på mainnet.",
    registeredWalletsDescription:
      "Den här katalogen visar bara offentlig appmetadata. Den exponerar inte användare, plånboksadresser, saldon, ruttpreferenser, provider-internals eller testnet-only-registreringar.",
    mainnetWalletDescription:
      "Mainnet PayTo-plånbok med aktiva registrerade användare.",
    emptyWalletDirectory:
      "Det finns inga offentliga mainnet-poster för PayTo-plånböcker än.",
  },
  marketing: {
    onePaytagTitle: "En Paytag",
    onePaytagText:
      "En MyPayTag-märkt betalningsidentitet ger betalande appar ett användargodkänt handtag att börja från.",
    mvpRouteSelectionTitle: "MVP-ruttval",
    mvpRouteSelectionText:
      "MyPayTag väljer en godkänd PayToDapp-rutt för aktuell paytag, tillgång, nätverk och betalande app.",
    cubidIdentityTitle: "Cubid är bara identitet",
    cubidIdentityText:
      "Cubid hanterar verifierad identitet, samtycke och alias utan att ta emot plånboks-, rutt- eller betalningsdetaljer.",
    solverEyebrow: "Exekveringsadapter",
    solverTitle: "NEAR 1Click först, bredare solver-fanout senare.",
    phaseOneAdapter: "Fas 1 MVP-adapter",
    phaseTwoAdapter: "Fas 2-adapter",
  },
} satisfies TranslationResources;

function pseudoLocalize(value: string) {
  const placeholders = value.match(/{{\s*[\w.]+\s*}}/g) ?? [];
  const placeholderToken = "\u0000I18N_PLACEHOLDER_";
  let protectedValue = value;

  placeholders.forEach((placeholder, index) => {
    protectedValue = protectedValue.replace(
      placeholder,
      `${placeholderToken}${index}\u0000`,
    );
  });

  let expanded = protectedValue.replace(/[A-Za-zÅÄÖåäö]/g, (character) => {
    const map: Record<string, string> = {
      A: "Ȧ",
      a: "ȧ",
      E: "Ḗ",
      e: "ḗ",
      I: "Ī",
      i: "ī",
      O: "Ǿ",
      o: "ǿ",
      U: "Ū",
      u: "ū",
    };

    return map[character] ?? character;
  });

  placeholders.forEach((placeholder, index) => {
    expanded = expanded.replace(`${placeholderToken}${index}\u0000`, placeholder);
  });

  return `[!! ${expanded} ${expanded} !!]`;
}

function createPseudoResources(source: TranslationResources): TranslationResources {
  const nextResources = {} as TranslationResources;

  for (const namespace of translationNamespaces) {
    const namespaceResources = {} as NamespaceResource<typeof namespace>;
    const sourceNamespace = source[namespace] as NamespaceResource<typeof namespace>;
    const keys = translationKeys[namespace] as readonly TranslationKey<
      typeof namespace
    >[];

    for (const key of keys) {
      namespaceResources[key] = pseudoLocalize(sourceNamespace[key]);
    }

    nextResources[namespace] = namespaceResources;
  }

  return nextResources;
}

const enXA = createPseudoResources(en);

export const resources = {
  en,
  sv,
  "en-XA": enXA,
} as const satisfies Record<string, TranslationResources>;
