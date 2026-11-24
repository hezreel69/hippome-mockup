import React from "react";

interface MnemoMarkProps {
  size?: number;
  inverted?: boolean;
  className?: string;
}

/**
 * Geometric Mnemo "M" monogram emblem in the brand palette.
 */
export function MnemoMark({
  size = 32,
  inverted = false,
  className = "",
}: MnemoMarkProps) {
  const tileBg = inverted ? "#75c9c8" : "#1b2338";
  const letterFill = inverted ? "#1b2338" : "#75c9c8";
  const dotFill = inverted ? "#f7f4ea" : "#c0b9dd";

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
      <path
        d="M8.5 26V11L18 19.5L27.5 11V26"
        stroke={letterFill}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="10.5" r="2.4" fill={dotFill} />
    </svg>
  );
}
