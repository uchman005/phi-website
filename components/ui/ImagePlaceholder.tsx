type Variant = "default" | "terra" | "ochre" | "forest";

interface ImagePlaceholderProps {
  variant?: Variant;
  label?: string;
  aspectRatio?: string;
  className?: string;
}

const gradients: Record<Variant, string> = {
  default:
    "bg-gradient-to-br from-green-l via-green to-green-d",
  terra:
    "bg-gradient-to-br from-terra-l via-terra to-terra-d",
  ochre:
    "bg-gradient-to-br from-ochre-l via-ochre to-[#b8820f]",
  forest:
    "bg-gradient-to-br from-green-d via-green-dd to-green-ddd",
};

export default function ImagePlaceholder({
  variant = "default",
  label,
  aspectRatio = "aspect-[4/3]",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${gradients[variant]} ${aspectRatio} ${className}`}
      aria-hidden="true"
    >
      {/* Diagonal pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.4) 8px, rgba(255,255,255,0.4) 9px)",
        }}
      />
      {label && (
        <>
          {/* Scrim guarantees label contrast regardless of where the label
              falls on the gradient — the lightest stops (e.g. green-l)
              leave white text near-illegible without it. */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 to-transparent" />
          <span className="absolute bottom-3 left-3 font-mono text-xs text-white uppercase tracking-widest">
            {label}
          </span>
        </>
      )}
    </div>
  );
}
