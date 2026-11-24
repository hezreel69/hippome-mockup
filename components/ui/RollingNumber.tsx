import React from "react";

interface RollingNumberProps {
  value: string;
  className?: string;
}

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

/**
 * Digit-by-digit vertical odometer animation (taste-skill/references/motion.md).
 * Keeps the true string in an sr-only span for screen readers and respects reduced motion.
 */
export function RollingNumber({ value, className = "" }: RollingNumberProps) {
  let digitColumn = 0;

  return (
    <span className={`num inline-flex items-baseline ${className}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex items-baseline leading-none">
        {Array.from(value).map((ch, idx) => {
          if (!/\d/.test(ch)) {
            return (
              <span key={`${idx}-${ch}`} className="leading-none">
                {ch}
              </span>
            );
          }

          const colIdx = digitColumn;
          digitColumn += 1;

          return (
            <span
              key={`${idx}-${ch}-${value}`}
              className="inline-block h-[1em] overflow-clip leading-none"
            >
              <span
                className="anim-roll-strip flex flex-col leading-none"
                style={
                  {
                    "--digit": Number(ch),
                    "--col-i": colIdx,
                  } as React.CSSProperties
                }
              >
                {DIGITS.map((d) => (
                  <span key={d} className="block h-[1em] leading-none">
                    {d}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
