import Script from "next/script";
import "./globals.css";
import { ConsentProvider } from "@/lib/consent";
import CookieBanner from "@/components/layout/CookieBanner";
import AnalyticsLifecycle from "@/components/AnalyticsLifecycle";
import ClarityScript from "@/components/ClarityScript";

export const viewport = {
  themeColor: "#09110C",
};

export const metadata = {
  title: "Proovd — Sell out before the product exists",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Proovd connects startup founders with affiliate creators to validate ideas before they're built.",
};

const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <ConsentProvider>
          {children}
          <CookieBanner />
          <AnalyticsLifecycle />
          <ClarityScript />
        </ConsentProvider>
        {UMAMI_SRC && UMAMI_ID && (
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
