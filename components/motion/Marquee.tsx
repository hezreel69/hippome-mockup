"use client";

import React from "react";

interface MarqueeProps {
  items: React.ReactNode[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export function Marquee({
  items,
  speed = 26,
  direction = "left",
  className = "",
}: MarqueeProps) {
  const animClass =
    direction === "right" ? "anim-marquee-reverse" : "anim-marquee";

  return (
    <div
      className={`marquee-wrap relative w-full overflow-hidden select-none ${className}`}
    >
      <div
        className={`flex w-max items-center gap-6 ${animClass}`}
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center gap-6">{items}</div>
        <div className="flex shrink-0 items-center gap-6" aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
}
