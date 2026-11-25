"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface SplitTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  by?: "word" | "char";
  stagger?: number;
  delay?: number;
  className?: string;
  wordClassName?: (unit: string, idx: number) => string;
}

export function SplitText({
  text,
  as = "h1",
  by = "word",
  stagger = 0.045,
  delay = 0,
  className = "",
  wordClassName,
}: SplitTextProps) {
  const prefersReduced = useReducedMotion();
  const Tag = as;
  const units = by === "char" ? Array.from(text) : text.split(" ");

  if (prefersReduced) {
    if (!wordClassName) {
      return <Tag className={className}>{text}</Tag>;
    }
    return (
      <Tag className={className}>
        {units.map((unit, idx) => (
          <React.Fragment key={`${idx}-${unit}`}>
            <span className={wordClassName(unit, idx)}>
              {unit === " " ? "\u00A0" : unit}
            </span>
            {by === "word" && idx < units.length - 1 ? "\u00A0" : null}
          </React.Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={text}>
      {units.map((unit, idx) => {
        const isSpace = unit === " ";
        const customUnitClass = wordClassName ? wordClassName(unit, idx) : "";
        return (
          <span
            key={`${idx}-${unit}`}
            aria-hidden="true"
            className="inline-block align-bottom"
          >
            <motion.span
              className={`inline-block will-change-transform ${customUnitClass}`}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
                delay: delay + idx * stagger,
              }}
            >
              {isSpace ? "\u00A0" : unit}
            </motion.span>
            {by === "word" && idx < units.length - 1 ? "\u00A0" : null}
          </span>
        );
      })}
    </Tag>
  );
}
