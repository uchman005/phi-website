// ---------------------------------------------------------------------------
// The illustration on the 404 and error pages: fields under an African sky,
// drawn inline so it needs no image files.
//   "lost"   — a footpath that ends at a signpost with a "?" (page not found)
//   "cloudy" — a seedling under a passing cloud (something went wrong)
// Purely decorative, so it's hidden from screen readers. Motion only runs for
// people who haven't asked for reduced motion.
// ---------------------------------------------------------------------------

type Variant = "lost" | "cloudy";

// Lets CSS rotate and scale SVG parts around their own centre or base.
const ownBox = "[transform-box:fill-box]";

export default function FieldScene({ variant, className = "" }: { variant: Variant; className?: string }) {
  const id = `phi-scene-${variant}`;

  return (
    <svg
      viewBox="0 0 520 420"
      aria-hidden="true"
      focusable="false"
      className={`h-auto w-full ${className}`}
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <circle cx="260" cy="210" r="190" />
        </clipPath>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7E8C9" />
          <stop offset="0.65" stopColor="#EBF8F1" />
        </linearGradient>
      </defs>

      {/* Outer rings */}
      <circle cx="260" cy="210" r="204" fill="none" stroke="#DFA13C" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
      <circle cx="260" cy="210" r="191" fill="none" stroke="#E8E1D3" strokeWidth="2" />

      <g clipPath={`url(#${id}-clip)`}>
        <rect x="60" y="10" width="400" height="400" fill={`url(#${id}-sky)`} />

        {variant === "lost" ? (
          <>
            {/* Sun */}
            <circle cx="352" cy="118" r="54" fill="#DFA13C" className={`${ownBox} origin-center motion-safe:animate-glow`} />
            <circle cx="352" cy="118" r="32" fill="#DFA13C" />
            {/* A small cloud and two birds */}
            <g className="motion-safe:animate-drift">
              <path d="M128 122 a16 16 0 0 1 30 -8 a20 20 0 0 1 36 10 a12 12 0 0 1 -2 24 h-60 a13 13 0 0 1 -4 -26 z" fill="#FFFFFF" />
            </g>
            <path d="M228 96 q7 -7 14 0 q7 -7 14 0" fill="none" stroke="#4E5D56" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M262 76 q5 -5 10 0 q5 -5 10 0" fill="none" stroke="#4E5D56" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Sun behind a passing cloud */}
            <circle cx="338" cy="116" r="30" fill="#DFA13C" opacity="0.9" />
            <g className="motion-safe:animate-drift">
              <path d="M262 150 a22 22 0 0 1 14 -40 a32 32 0 0 1 60 -6 a24 24 0 0 1 40 22 a18 18 0 0 1 -6 35 h-102 a14 14 0 0 1 -6 -11 z" fill="#F4EDDF" />
              <path d="M256 142 a22 22 0 0 1 14 -40 a32 32 0 0 1 60 -6 a24 24 0 0 1 40 22 a18 18 0 0 1 -6 35 h-102 a14 14 0 0 1 -6 -11 z" fill="#FFFFFF" />
              <path d="M292 172 l-5 12 M318 176 l-5 12 M344 172 l-5 12" stroke="#1C9E73" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
            </g>
            <path d="M128 132 a14 14 0 0 1 26 -6 a17 17 0 0 1 30 9 a10 10 0 0 1 -2 20 h-50 a11 11 0 0 1 -4 -23 z" fill="#FFFFFF" opacity="0.9" />
          </>
        )}

        {/* Rolling fields */}
        <path d="M60 262 C 150 228, 240 236, 320 246 S 430 234, 470 240 V420 H60 Z" fill="#2BC78D" opacity="0.45" />
        <path d="M60 290 C 170 262, 300 272, 470 262 V420 H60 Z" fill="#1C9E73" />
        {/* Crop tufts on the middle field */}
        <g stroke="#0A4636" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M130 284 l4 -7 l4 7 M170 279 l4 -7 l4 7 M380 274 l4 -7 l4 7 M420 276 l4 -7 l4 7 M220 276 l4 -7 l4 7" />
        </g>
        <path d="M60 318 C 180 298, 330 300, 470 312 V420 H60 Z" fill="#0F7155" />
        {/* Furrows running to the horizon */}
        <g stroke="#0A4636" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round">
          <path d="M260 306 L40 420 M260 306 L130 420 M260 306 L215 420 M260 306 L305 420 M260 306 L390 420 M260 306 L480 420" />
        </g>

        {variant === "lost" ? (
          <>
            {/* A footpath that stops at a signpost */}
            <path d="M210 420 C 228 384, 300 378, 290 350 C 283 330, 300 318, 314 309 L 322 312 C 312 321, 302 333, 308 352 C 318 384, 266 394, 300 420 Z" fill="#F4EDDF" />
            <rect x="331" y="236" width="6" height="74" rx="2" fill="#8C5D0E" />
            <g className={`${ownBox} origin-center motion-safe:animate-sway`}>
              <path d="M300 236 H354 L368 252 L354 268 H300 Z" fill="#D5703F" />
              <text
                x="330"
                y="260"
                textAnchor="middle"
                fontSize="24"
                fontWeight="600"
                fill="#FFFFFF"
                style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
              >
                ?
              </text>
            </g>
          </>
        ) : (
          <>
            {/* A drooping seedling */}
            <ellipse cx="260" cy="356" rx="46" ry="11" fill="#8C5D0E" opacity="0.85" />
            <g className={`${ownBox} origin-bottom motion-safe:animate-sway`}>
              <path d="M260 352 C 257 332, 263 314, 258 294" fill="none" stroke="#2BC78D" strokeWidth="5" strokeLinecap="round" />
              <path d="M258 302 C 236 297, 221 307, 214 324 C 234 326, 251 316, 258 302 Z" fill="#2BC78D" />
              <path d="M259 294 C 283 287, 299 297, 306 314 C 285 317, 268 309, 259 294 Z" fill="#D7F0E5" />
            </g>
          </>
        )}
      </g>

      {/* Seeds floating around the edge */}
      <g className="motion-safe:animate-float">
        <ellipse cx="62" cy="128" rx="6" ry="3.5" fill="#DFA13C" transform="rotate(-30 62 128)" />
      </g>
      <g className="motion-safe:animate-float [animation-delay:-2s]">
        <ellipse cx="468" cy="96" rx="5" ry="3" fill="#1C9E73" transform="rotate(25 468 96)" />
      </g>
      <g className="motion-safe:animate-float [animation-delay:-4s]">
        <ellipse cx="476" cy="318" rx="6" ry="3.5" fill="#D5703F" transform="rotate(-15 476 318)" />
      </g>
      <g className="motion-safe:animate-float [animation-delay:-5s]">
        <ellipse cx="48" cy="300" rx="4" ry="2.5" fill="#1C9E73" transform="rotate(40 48 300)" />
      </g>
    </svg>
  );
}
