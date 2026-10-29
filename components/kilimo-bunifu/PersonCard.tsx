import Image from "next/image";
import Link from "next/link";
import type { Person } from "@/lib/kilimo-bunifu";

function initials(name: string): string {
  return name
    .replace(/^(Dr\.?|Prof\.?|Fr\.?|H\.E\.)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export function Avatar({
  name,
  photo,
  size = 96,
}: {
  name: string;
  photo?: string;
  size?: number;
}) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full bg-green-l ring-4 ring-paper"
      style={{ width: size, height: size }}
    >
      {photo ? (
        <Image src={photo} alt={name} fill className="object-cover" sizes={`${size}px`} />
      ) : (
        // No photo supplied — initials rather than a stock silhouette.
        <span
          className="absolute inset-0 flex items-center justify-center font-display text-green-dd"
          style={{ fontSize: size * 0.34 }}
          aria-hidden
        >
          {initials(name)}
        </span>
      )}
    </div>
  );
}

interface PersonCardProps {
  person: Person;
  /** "stack" for grids, "row" for compact lists. */
  layout?: "stack" | "row";
}

export default function PersonCard({ person, layout = "stack" }: PersonCardProps) {
  const name = person.href ? (
    <Link href={person.href} className="hover:text-green-d transition-colors">
      {person.name}
    </Link>
  ) : (
    person.name
  );

  if (layout === "row") {
    return (
      <div className="flex items-center gap-4">
        <Avatar name={person.name} photo={person.photo} size={56} />
        <div>
          <p className="font-sans font-semibold text-sm text-ink">{name}</p>
          {person.affiliation && (
            <p className="font-sans text-xs text-ink-3">{person.affiliation}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <article className="flex h-full flex-col items-center gap-3 rounded-lg border border-line bg-paper p-6 text-center">
      <Avatar name={person.name} photo={person.photo} />
      <div className="flex flex-col gap-1">
        <h3 className="font-sans font-bold text-sm text-ink">{name}</h3>
        {person.affiliation && (
          <p className="font-sans text-xs text-green-d font-semibold">
            {person.affiliation}
            {person.country ? ` · ${person.country}` : ""}
          </p>
        )}
      </div>
      {person.talk && (
        <p className="font-display text-sm italic leading-snug text-ink-2">
          &ldquo;{person.talk}&rdquo;
        </p>
      )}
    </article>
  );
}
