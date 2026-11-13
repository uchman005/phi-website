"use client"; // Error boundaries must be Client Components
/* eslint-disable @next/next/no-html-link-for-pages -- the app shell has failed,
   so a full page load is the safest way back, not a client-side navigation. */

import { useEffect } from "react";
import Image from "next/image";
import FieldScene from "@/components/ui/FieldScene";
import { siteFacts } from "@/lib/site-facts";
import "./globals.css";

// Last resort, used only when the root layout itself fails. It replaces the
// whole document, so the navigation, footer and web fonts aren't available:
// links are plain <a> tags and text uses system fonts.
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const reference =
    error instanceof Error && "digest" in error && typeof error.digest === "string" ? error.digest : undefined;
  const email = siteFacts.contact.primaryEmail;

  return (
    <html lang="en">
      <body
        className="flex min-h-screen flex-col bg-cream text-ink antialiased"
        style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}
      >
        <title>Something went wrong | Passion of Hope International</title>

        <header className="px-4 py-5 sm:px-6 lg:px-8">
          <a href="/" className="mx-auto flex max-w-[1200px] items-center gap-2.5">
            <Image src="/images/logos/phi-logo.jpeg" alt="" width={36} height={36} className="rounded-xl object-cover" />
            <span className="text-sm font-semibold leading-tight">Passion of Hope International</span>
          </a>
        </header>

        <main className="flex flex-1 items-center px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_1fr]">
            <div className="order-2 md:order-1">
              <p className="mb-4 inline-flex rounded-pill bg-terra-l px-3 py-1 text-xs font-semibold uppercase tracking-widest text-terra-d">
                Something went wrong
              </p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                A <em className="text-green-d">passing cloud</em> on our side.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-2">
                The site didn&apos;t load properly. Please try again in a moment. If it keeps
                happening, email{" "}
                <a href={`mailto:${email}`} className="font-semibold text-green-d underline underline-offset-2">
                  {email}
                </a>
                {reference ? " and include the reference below" : ""}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => retry()}
                  className="rounded-pill bg-green-d px-6 py-3 text-[0.9375rem] font-semibold text-white shadow-sm transition-colors hover:bg-green-dd"
                >
                  Try again
                </button>
                <a
                  href="/"
                  className="rounded-pill border border-green px-6 py-3 text-[0.9375rem] font-semibold text-green-d transition-colors hover:bg-green-ll"
                >
                  Back to home
                </a>
              </div>
              {reference && (
                <p className="mt-8 text-sm text-ink-3">
                  Reference:{" "}
                  <code className="select-all rounded-sm bg-white px-2 py-1 font-mono text-xs text-ink-2 ring-1 ring-line">
                    {reference}
                  </code>
                </p>
              )}
            </div>
            <div className="order-1 mx-auto w-full max-w-[280px] md:order-2 md:max-w-[420px]">
              <FieldScene variant="cloudy" />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
