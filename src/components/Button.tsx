import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-primary-light text-navy",
  outline: "border border-white text-white",
};

/**
 * Shared button. Owns the site-wide hover behaviour so every button
 * scales identically; `motion-reduce` opts out for users who ask for it.
 */
export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
}) {
  // cursor-pointer is explicit: a native <button> renders the default arrow,
  // and Tailwind's preflight does not change that.
  return (
    <button
      type="button"
      className={`flex cursor-pointer items-center justify-center rounded-xl font-bold transition-transform duration-200 ease-out hover:scale-105 active:scale-[0.98] disabled:cursor-not-allowed motion-reduce:transition-none motion-reduce:hover:scale-100 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
