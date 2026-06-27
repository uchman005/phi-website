import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  location?: string;
  photo: string;
  kind?: "person" | "organization";
}

export default function TestimonialCard({
  quote,
  name,
  role,
  location,
  photo,
  kind = "person",
}: TestimonialCardProps) {
  return (
    <blockquote className="bg-paper rounded-lg p-8 border border-line flex flex-col gap-6 h-full">
      <p className="font-display text-lg text-ink leading-relaxed italic flex-1">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="flex items-center gap-3">
        <div
          className={`relative w-10 h-10 shrink-0 overflow-hidden ${
            kind === "organization"
              ? "rounded-lg bg-white border border-line"
              : "rounded-full"
          }`}
        >
          <Image
            src={photo}
            alt={name}
            fill
            className={kind === "organization" ? "object-contain p-1" : "object-cover"}
            sizes="40px"
          />
        </div>
        <cite className="not-italic">
          <span className="block font-sans font-semibold text-sm text-ink">
            {name}
          </span>
          <span className="block font-sans text-xs text-ink-3">
            {role}
            {location ? ` · ${location}` : ""}
          </span>
        </cite>
      </footer>
    </blockquote>
  );
}
