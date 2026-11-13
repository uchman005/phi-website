"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { TbHome, TbRefresh } from "react-icons/tb";
import Button from "@/components/ui/Button";
import FieldScene from "@/components/ui/FieldScene";
import { siteFacts } from "@/lib/site-facts";

/** The server's reference for an error, which matches its log entry. */
function errorReference(error: unknown): string | undefined {
  if (error instanceof Error && "digest" in error && typeof error.digest === "string") return error.digest;
  return undefined;
}

// Shown in place of a page that fails to load. The navigation and footer stay.
// (Not named "Error": that would hide the built-in Error that errorReference checks against.)
export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const reference = errorReference(error);
  const email = siteFacts.contact.primaryEmail;

  return (
    <section className="relative overflow-hidden bg-cream px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-ochre-l/70 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="mb-4 inline-flex items-center gap-2 rounded-pill bg-terra-l px-3 py-1 font-mono text-xs uppercase tracking-widest text-terra-d">
            Something went wrong
          </p>
          <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            A <em className="text-green-d">passing cloud</em> on our side.
          </h1>
          <p className="mt-5 max-w-lg font-sans text-lg leading-relaxed text-ink-2">
            This page didn&apos;t load properly. It&apos;s usually temporary, so please try again.
            If it keeps happening, email{" "}
            <a href={`mailto:${email}`} className="font-semibold text-green-d underline underline-offset-2 hover:text-green-dd">
              {email}
            </a>
            {reference ? " and include the reference below" : ""}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => retry()}>
              <TbRefresh aria-hidden /> Try again
            </Button>
            <Button href="/" variant="ghost">
              <TbHome aria-hidden /> Back to home
            </Button>
          </div>
          {reference && (
            <p className="mt-8 font-sans text-sm text-ink-3">
              Reference:{" "}
              <code className="select-all rounded-sm bg-white px-2 py-1 font-mono text-xs text-ink-2 ring-1 ring-line">
                {reference}
              </code>
            </p>
          )}
        </div>

        <div className="order-1 mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:order-2 lg:max-w-[480px]">
          <FieldScene variant="cloudy" />
        </div>
      </div>
    </section>
  );
}
