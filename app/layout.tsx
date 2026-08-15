import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk, Spline_Sans_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Production-only, regardless of what's in the local env — `bun run dev`
// traffic should never land in real analytics. Same graceful-degradation
// pattern as the PayPal integration: unset simply means nothing renders.
const GA_MEASUREMENT_ID =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    : undefined;

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-spline-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.passionofhope.org";

export const metadata: Metadata = {
  title: {
    template: "%s | Passion of Hope International",
    default:
      "Passion of Hope International — 501(c)(3) Charity for Rural Africa",
  },
  description:
    "Donate to a US 501(c)(3) nonprofit transforming rural Africa — food security, clean energy, women's empowerment, and sustainable agriculture in Kenya, Nigeria, and the DRC. 100% of your gift reaches the mission.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "./",
  },
  keywords: [
    "donate to Africa charity",
    "African charity donations",
    "501(c)(3) Africa nonprofit",
    "tax-deductible donation Africa",
    "food security charity",
    "sustainable agriculture nonprofit",
    "women's empowerment Africa charity",
    "clean cooking energy charity",
    "widows support charity Kenya",
    "charity for farmers in Africa",
    "monthly giving Africa",
    "best African charities to donate to",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Passion of Hope International",
    locale: "en_US",
    url: SITE_URL,
    images: [
      {
        url: "/images/hero/hero-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Passion of Hope International — community-led development in rural Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@PassionHopeIntl",
  },
};

// Schema.org NGO markup — helps Google show PHI as a nonprofit in donor
// searches and enables the "Donate" action in rich results.
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Passion of Hope International",
  alternateName: "PHI",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logos/phi-logo.jpeg`,
  description:
    "A US 501(c)(3) nonprofit catalyzing appropriate and sustainable development in rural Africa — food sovereignty, clean energy, women's empowerment, and community-owned change in Kenya, Nigeria, and the DRC.",
  nonprofitStatus: "Nonprofit501c3",
  areaServed: ["Kenya", "Nigeria", "Democratic Republic of the Congo"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  sameAs: ["https://twitter.com/PassionHopeIntl"],
  potentialAction: {
    "@type": "DonateAction",
    target: `${SITE_URL}/donate`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${hanken.variable} ${splineMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      </body>
    </html>
  );
}
