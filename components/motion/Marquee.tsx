"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";

interface MarqueeProps {
  items: React.ReactNode[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export function Marquee({
  items,
  speed = 24,
  direction = "left",
  className = "",
}: MarqueeProps) {
  const prefersReduced = useReducedMotion();
  const controls = useAnimationControls();
  const [paused, setPaused] = useState(false);

  const duration = prefersReduced ? speed * 2 : speed;
  const fromX = direction === "right" ? "-50%" : "0%";
  const toX = direction === "right" ? "0%" : "-50%";

  useEffect(() => {
    if (paused) {
      controls.stop();
      return;
    }

    void controls.start({
      x: [fromX, toX],
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls, paused, duration, fromX, toX]);

  const groupItems = [...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden select-none ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <motion.div
        animate={controls}
        initial={{ x: fromX }}
        className="flex w-max items-center will-change-transform"
      >
        <div className="flex shrink-0 items-center">
          {groupItems.map((item, idx) => (
            <div key={`a-${idx}`} className="shrink-0 pr-6">
              {item}
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {groupItems.map((item, idx) => (
            <div key={`b-${idx}`} className="shrink-0 pr-6">
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
