import type { Stat } from "@/lib/site-facts";

/**
 * Footnote under a stat: a "Source" link when the source is a URL, or the
 * document name otherwise. Renders nothing for unsourced stats.
 */
export default function SourceNote({ stat, className = "" }: { stat: Stat; className?: string }) {
  if (!stat.source) return null;
  const asOf = stat.asOf ? ` · as of ${stat.asOf}` : "";
  return (
    <p className={`font-sans text-[11px] text-ink-3 ${className}`}>
      {/^https?:\/\//.test(stat.source) ? (
        <a href={stat.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-d">
          Source
        </a>
      ) : (
        <>Source: {stat.source}</>
      )}
      {asOf}
    </p>
  );
}
