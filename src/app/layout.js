import "./globals.css";

export const viewport = {
  themeColor: "#09110C",
};

export const metadata = {
  title: "Proovd — Sell out before the product exists",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Proovd connects startup founders with affiliate creators to validate ideas before they're built.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
