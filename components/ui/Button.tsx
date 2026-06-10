import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "terra" | "ghost" | "light" | "white";
type Size = "md" | "sm";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-semibold leading-none transition-all duration-200 cursor-pointer select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-green text-white rounded-pill hover:bg-green-d active:bg-green-dd shadow-sm hover:shadow-md",
  terra:
    "bg-terra text-white rounded-pill hover:bg-terra-d active:bg-terra-d shadow-sm hover:shadow-md",
  ghost:
    "border border-green text-green bg-transparent rounded-pill hover:bg-green-ll active:bg-green-l",
  light:
    "bg-white/15 text-white border border-white/30 rounded-pill hover:bg-white/25 backdrop-blur-sm",
  white:
    "bg-white text-green rounded-pill hover:bg-green-ll active:bg-green-l shadow-sm",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[0.9375rem]",
  sm: "px-4 py-2 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  children,
  className = "",
  disabled = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
