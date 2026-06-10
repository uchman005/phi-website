import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

export const metadata: Metadata = {
  title: {
    template: "%s | Passion of Hope International",
    default: "Passion of Hope International",
  },
  description:
    "A US 501(c)(3) non-profit catalyzing appropriate and sustainable development in rural Africa — food sovereignty, human capacity, and community-owned change.",
  metadataBase: new URL("https://passionofhope.org"),
  openGraph: {
    type: "website",
    siteName: "Passion of Hope International",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
