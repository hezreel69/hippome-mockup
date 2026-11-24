import React from "react";

interface HippomeMarkProps {
  size?: number;
  inverted?: boolean;
  className?: string;
}

/**
 * Bespoke flat geometric Hippome emblem using the brand palette
 * (Midnight Ink, Pearl Aqua, Periwinkle, Floral White).
 */
export function HippomeMark({
  size = 32,
  inverted = false,
  className = "",
}: HippomeMarkProps) {
  const tileBg = inverted ? "#75c9c8" : "#1b2338";
  const earFill = inverted ? "#1b2338" : "#c0b9dd";
  const headFill = inverted ? "#1b2338" : "#75c9c8";
  const snoutFill = inverted ? "#26314d" : "#f7f4ea";
  const dotFill = inverted ? "#75c9c8" : "#1b2338";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="10" fill={tileBg} />
      {/* Ears */}
      <circle cx="11" cy="11.5" r="3.2" fill={earFill} />
      <circle cx="25" cy="11.5" r="3.2" fill={earFill} />
      {/* Upper head */}
      <rect x="8.5" y="11" width="19" height="12" rx="6" fill={headFill} />
      {/* Eyes */}
      <circle cx="14" cy="16" r="1.4" fill={dotFill} />
      <circle cx="22" cy="16" r="1.4" fill={dotFill} />
      {/* Snout */}
      <rect x="7" y="18.5" width="22" height="10" rx="5" fill={snoutFill} />
      {/* Nostrils */}
      <circle cx="13.5" cy="23.3" r="1.5" fill={dotFill} />
      <circle cx="22.5" cy="23.3" r="1.5" fill={dotFill} />
    </svg>
  );
}
