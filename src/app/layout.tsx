import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { MockSessionProvider } from "@/components/auth/mock-session-provider";
import { AppAuthProvider } from "@/components/cubid/app-auth-provider";
import { SiteHeader } from "@/components/navigation/site-header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyPayTag",
  description:
    "A global pay-to layer for crypto apps, sending apps, receiving apps, wallets, and users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AppAuthProvider>
          <MockSessionProvider>
            <SiteHeader />
            {children}
          </MockSessionProvider>
        </AppAuthProvider>
      </body>
    </html>
  );
}
