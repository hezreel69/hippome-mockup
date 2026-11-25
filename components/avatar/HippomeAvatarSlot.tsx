"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  HIPPOME_AVATAR_CONFIG,
  HippomeExpression,
} from "@/lib/avatar-config";

export type AvatarSize = "sm" | "md" | "lg" | "xl" | "mega";

interface HippomeAvatarSlotProps {
  expression?: HippomeExpression;
  size?: AvatarSize;
  floating?: boolean;
  talking?: boolean;
  onDark?: boolean;
  frameless?: boolean;
  srcOverride?: string;
  className?: string;
}

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "h-10 w-10 sm:h-12 sm:w-12 rounded-[14px]",
  md: "h-12 w-12 sm:h-16 sm:w-16 rounded-[18px]",
  lg: "h-24 w-24 sm:h-28 sm:w-28 rounded-[22px]",
  xl: "h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 rounded-[24px]",
  mega: "h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56",
};

function StylizedHippoSvg({
  expression,
  onDark,
  talking,
  reducedMotion,
}: {
  expression: HippomeExpression;
  onDark: boolean;
  talking: boolean;
  reducedMotion: boolean;
}) {
  const skinMain = "#75c9c8"; // Pearl Aqua
  const earOuter = "#80a1d4"; // Wisteria Blue
  const earInner = onDark ? "#1b2338" : "#c0b9dd"; // Periwinkle
  const skinSnout = "#f7f4ea"; // Floral White
  const cheekTint = "#c0b9dd"; // Periwinkle
  const featureInk = "#1b2338";
  const accentStar = onDark ? "#75c9c8" : "#80a1d4";

  const animateSvg = !reducedMotion;

  return (
    <motion.svg
      viewBox="0 0 120 120"
      fill="none"
      className="h-full w-full p-1"
      role="img"
      aria-label={`Hippome mascot looking ${expression}`}
      animate={
        animateSvg && talking
          ? { scale: [1, 1.03, 0.99, 1.02, 1] }
          : { scale: 1 }
      }
      transition={
        talking
          ? { duration: 0.45, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.2 }
      }
    >
      {/* Ears with wiggle when talking */}
      <motion.g
        style={{ transformOrigin: "34px 34px" }}
        animate={
          animateSvg && talking
            ? { rotate: [-4, 6, -4] }
            : { rotate: 0 }
        }
        transition={{ duration: 0.4, repeat: talking ? Infinity : 0 }}
      >
        <circle cx="34" cy="34" r="11" fill={earOuter} stroke={featureInk} strokeWidth="2.5" />
        <circle cx="34" cy="34" r="5.2" fill={earInner} />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "86px 34px" }}
        animate={
          animateSvg && talking
            ? { rotate: [4, -6, 4] }
            : { rotate: 0 }
        }
        transition={{ duration: 0.4, repeat: talking ? Infinity : 0 }}
      >
        <circle cx="86" cy="34" r="11" fill={earOuter} stroke={featureInk} strokeWidth="2.5" />
        <circle cx="86" cy="34" r="5.2" fill={earInner} />
      </motion.g>

      {/* Main head */}
      <rect
        x="24"
        y="31"
        width="72"
        height="52"
        rx="26"
        fill={skinMain}
        stroke={featureInk}
        strokeWidth="2.5"
      />

      {/* Expression Eyes with periodic blink */}
      <motion.g
        style={{ transformOrigin: "60px 52px" }}
        animate={
          animateSvg
            ? { scaleY: [1, 1, 0.1, 1, 1] }
            : { scaleY: 1 }
        }
        transition={{
          duration: 3.8,
          times: [0, 0.92, 0.95, 0.98, 1],
          repeat: Infinity,
        }}
      >
        {expression === "happy" || expression === "celebrating" ? (
          <>
            <path
              d="M39 54C41.5 49.5 47.5 49.5 50 54"
              stroke={featureInk}
              strokeWidth="3.6"
              strokeLinecap="round"
            />
            <path
              d="M70 54C72.5 49.5 78.5 49.5 81 54"
              stroke={featureInk}
              strokeWidth="3.6"
              strokeLinecap="round"
            />
          </>
        ) : expression === "thinking" ? (
          <>
            <circle cx="44" cy="52" r="4.2" fill={featureInk} />
            <circle cx="76" cy="52" r="4.2" fill={featureInk} />
            <path
              d="M69 44L82 41"
              stroke={featureInk}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        ) : expression === "encouraging" ? (
          <>
            <circle cx="44" cy="52" r="4.5" fill={featureInk} />
            <circle cx="45.5" cy="50.5" r="1.4" fill="#ffffff" />
            <circle cx="76" cy="52" r="4.5" fill={featureInk} />
            <circle cx="77.5" cy="50.5" r="1.4" fill="#ffffff" />
            <path
              d="M38 43L49 45.5"
              stroke={featureInk}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M82 43L71 45.5"
              stroke={featureInk}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <circle cx="44" cy="52" r="4.2" fill={featureInk} />
            <circle cx="76" cy="52" r="4.2" fill={featureInk} />
          </>
        )}
      </motion.g>

      {/* Cheeks */}
      <motion.ellipse
        cx="32"
        cy="61"
        rx="5.5"
        ry="3.2"
        fill={cheekTint}
        animate={animateSvg && talking ? { opacity: [0.7, 1, 0.7] } : { opacity: 0.85 }}
        transition={{ duration: 0.5, repeat: talking ? Infinity : 0 }}
      />
      <motion.ellipse
        cx="88"
        cy="61"
        rx="5.5"
        ry="3.2"
        fill={cheekTint}
        animate={animateSvg && talking ? { opacity: [0.7, 1, 0.7] } : { opacity: 0.85 }}
        transition={{ duration: 0.5, repeat: talking ? Infinity : 0 }}
      />

      {/* Floral White snout */}
      <rect
        x="18"
        y="61"
        width="84"
        height="38"
        rx="19"
        fill={skinSnout}
        stroke={featureInk}
        strokeWidth="2.5"
      />

      {/* Nostrils */}
      <ellipse cx="42" cy="76" rx="4.5" ry="5.5" fill={featureInk} />
      <ellipse cx="78" cy="76" rx="4.5" ry="5.5" fill={featureInk} />

      {/* Expression mouth — animated when talking */}
      {animateSvg && talking ? (
        <motion.path
          stroke={featureInk}
          strokeWidth="3.2"
          strokeLinecap="round"
          fill={featureInk}
          fillOpacity={0.18}
          animate={{
            d: [
              "M51 86C55 91 65 91 69 86Z",
              "M54 87C57 88 63 88 66 87Z",
              "M49 85C54 94 66 94 71 85Z",
              "M52 86C56 90 64 90 68 86Z",
            ],
          }}
          transition={{ duration: 0.54, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : expression === "thinking" ? (
        <path
          d="M54 88H67"
          stroke={featureInk}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M49 85.5C53 91 67 91 71 85.5"
          stroke={featureInk}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      )}

      {/* Celebrating geometric stars */}
      {expression === "celebrating" && (
        <>
          <path
            d="M16 20L18 14L20 20L26 22L20 24L18 30L16 24L10 22L16 20Z"
            fill={accentStar}
          />
          <path
            d="M101 16L102.5 11.5L104 16L108.5 17.5L104 19L102.5 23.5L101 19L96.5 17.5L101 16Z"
            fill="#c0b9dd"
          />
        </>
      )}

      {/* Thinking dots */}
      {expression === "thinking" && (
        <>
          <circle cx="98" cy="24" r="3" fill={accentStar} />
          <circle cx="106" cy="15" r="4.5" fill="#c0b9dd" />
        </>
      )}
    </motion.svg>
  );
}

/**
 * Dedicated drop-in avatar slot for Hippome.
 * - `useCustomImage: true` (default): renders custom PNG (`/logo.png`, or `srcOverride` for welcome/fail).
 *   Falls back gracefully to the built-in SVG mascot if the PNG file is missing.
 */
export function HippomeAvatarSlot({
  expression = "happy",
  size = "md",
  floating = false,
  talking = false,
  onDark = false,
  frameless = false,
  srcOverride,
  className = "",
}: HippomeAvatarSlotProps) {
  const prefersReduced = Boolean(useReducedMotion());
  const isCustomStatic = HIPPOME_AVATAR_CONFIG.useCustomImage;
  const isMega = size === "mega";

  const src =
    srcOverride ??
    HIPPOME_AVATAR_CONFIG.byExpression[expression] ??
    HIPPOME_AVATAR_CONFIG.defaultSrc;

  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imgFailed = failedSrc === src;

  const containerStyle =
    isMega || frameless
      ? ""
      : onDark
        ? "bg-[var(--ink-surface-raised)] border-2 border-[var(--pearl-aqua)]"
        : "bg-[var(--raised)] border-2 border-[var(--ink-surface)] shadow-[3px_3px_0_var(--ink-surface)]";

  if (isCustomStatic && !imgFailed) {
    return (
      <div
        data-avatar-slot="hippome"
        className={`relative flex shrink-0 items-center justify-center overflow-hidden ${SIZE_CLASSES[size]} ${containerStyle} ${
          floating && !prefersReduced ? "anim-hippo-breathe" : ""
        } ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={HIPPOME_AVATAR_CONFIG.alt}
          onError={() => setFailedSrc(src)}
          className={`h-full w-full object-contain ${frameless || isMega ? "" : "p-1.5"}`}
        />
      </div>
    );
  }

  return (
    <div
      data-avatar-slot="hippome"
      className={`relative flex shrink-0 items-center justify-center overflow-visible ${SIZE_CLASSES[size]} ${containerStyle} ${
        floating && !prefersReduced ? "anim-hippo-breathe" : ""
      } ${className}`}
    >
      <StylizedHippoSvg
        expression={expression}
        onDark={onDark}
        talking={talking}
        reducedMotion={prefersReduced}
      />
    </div>
  );
}
