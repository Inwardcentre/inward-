import Image from "next/image";

export interface InwardLogoProps {
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
  size?: number;
  /** When true, renders the logo in light color for dark backgrounds (uses CSS invert+brightness) */
  inverted?: boolean;
}

/**
 * InwardLogo — Horizontal lockup (icon + wordmark)
 *
 * Uses the generated PNG logo asset with transparent background.
 */
export function InwardLogo({
  showText = true,
  showTagline = false,
  className,
  size = 36,
  inverted = false,
}: InwardLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className || ""}`}>
      <InwardIcon size={size} inverted={inverted} />
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-sans font-bold text-[1.25rem] leading-tight tracking-tight ${
              inverted ? "text-warm-cream" : "text-primary-forest"
            }`}
          >
            Inward
          </span>
          {showTagline && (
            <span className="font-sans text-[0.55rem] font-bold uppercase tracking-[0.18em] text-ochre-accent leading-tight mt-0.5">
              Check in. Grow forward.
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Standalone icon component — uses the PNG logo asset.
 */
export function InwardIcon({
  size = 36,
  inverted = false,
}: {
  size?: number;
  inverted?: boolean;
}) {
  return (
    <div
      className={`relative flex-shrink-0 ${inverted ? "brightness-0 invert" : ""}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/inward-logo.png"
        alt="Inward"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </div>
  );
}
