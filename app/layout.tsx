import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

// Used to build absolute URLs for Open Graph tags and the sitemap.
// Set NEXT_PUBLIC_SITE_URL in production (e.g. https://agecalculator.com).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://agecalculator.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Age Calculator — Find Your Exact Age Instantly",
    template: "%s | Age Calculator",
  },
  description:
    "Age Calculator instantly calculates your exact age in years, months, days, and live seconds from your date of birth. Free, fast, and private.",
  keywords: [
    "age calculator",
    "calculate age",
    "date of birth calculator",
    "how old am i",
    "exact age calculator",
    "age calculator",
  ],
  authors: [{ name: "Age Calculator" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Age Calculator",
    title: "Age Calculator — Find Your Exact Age Instantly",
    description:
      "Age Calculator instantly calculates your exact age in years, months, days, and live seconds from your date of birth.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Age Calculator — Find Your Exact Age Instantly",
    description:
      "Age Calculator instantly calculates your exact age in years, months, days, and live seconds from your date of birth.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F7F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0D12" },
  ],
};

// TODO: Replace with your real AdSense publisher ID (starts with ca-pub-)
const ADSENSE_CLIENT_ID = "ca-pub-1997946834342523";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense — loaded once, site-wide */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${body.variable} ${display.variable} font-body antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
