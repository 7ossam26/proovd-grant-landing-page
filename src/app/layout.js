import Script from "next/script";
import "./globals.css";
import { ConsentProvider } from "@/lib/consent";
import CookieBanner from "@/components/layout/CookieBanner";
import AnalyticsLifecycle from "@/components/AnalyticsLifecycle";
import ClarityScript from "@/components/ClarityScript";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://proovd.io";

export const viewport = {
  themeColor: "#09110C",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Proovd — Sell out before the product exists",
    template: "%s | Proovd",
  },
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Validate your startup idea with real backers, not your friends' opinions. Pitch in 10 minutes, get matched with affiliates in 72 hours, see if people actually pledge.",
  keywords: [
    "startup validation",
    "affiliate crowdfunding",
    "pre-product validation",
    "startup MVP",
    "founder tools",
  ],
  authors: [{ name: "Proovd" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Proovd",
    title: "Proovd — Sell out before the product exists",
    description:
      "Validate your startup idea with real backers, not your friends' opinions.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Proovd" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proovd — Sell out before the product exists",
    description: "Validate your startup idea with real backers.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const IS_PROD = process.env.NODE_ENV === "production";
const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/satoshi/satoshi-black.woff2"
          crossOrigin="anonymous"
        />
        {UMAMI_SRC && (
          <link rel="preconnect" href={new URL(UMAMI_SRC).origin} />
        )}
      </head>
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-lime focus:text-brand-forest focus:px-4 focus:py-2 focus:font-medium focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
        >
          Skip to content
        </a>
        <ConsentProvider>
          {children}
          <CookieBanner />
          <AnalyticsLifecycle />
          <ClarityScript />
        </ConsentProvider>
        {IS_PROD && UMAMI_SRC && UMAMI_ID && (
          <Script
            src={UMAMI_SRC}
            data-website-id={UMAMI_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
