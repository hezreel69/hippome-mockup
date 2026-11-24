"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

export const BRAND_LIST = [
  "TNG eWallet",
  "ZUS Coffee",
  "CHAGEE",
  "Mixue",
  "7-Eleven",
  "FamilyMart",
  "Tealive",
  "GrabFood",
  "Popular",
  "Shopee",
] as const;

interface BrandLogoProps {
  brand: string;
  size?: number;
  className?: string;
  wobble?: boolean;
}

function BrandGlyph({ brand }: { brand: string }) {
  switch (brand) {
    case "TNG eWallet":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-full w-full"
          role="img"
          aria-label="TNG eWallet logo (placeholder)"
        >
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="#80a1d4"
            stroke="#1b2338"
            strokeWidth="2.5"
          />
          <text
            x="21"
            y="30"
            textAnchor="middle"
            fill="#1b2338"
            fontSize="16"
            fontWeight="800"
            fontFamily="sans-serif"
            letterSpacing="-0.5"
          >
            tng
          </text>
          <circle cx="37" cy="14" r="4" fill="#75c9c8" stroke="#1b2338" strokeWidth="1.5" />
        </svg>
      );

    case "ZUS Coffee":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-full w-full"
          role="img"
          aria-label="ZUS Coffee logo (placeholder)"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="#1b2338"
            stroke="#1b2338"
            strokeWidth="2.5"
          />
          <path
            d="M16 11C17.5 9 19.5 9 20 11C20.5 13 22.5 13 23 11"
            stroke="#75c9c8"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M26 10C27.5 8 29.5 8 30 10"
            stroke="#c0b9dd"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <text
            x="24"
            y="34"
            textAnchor="middle"
            fill="#f7f4ea"
            fontSize="21"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            Z
          </text>
        </svg>
      );

    case "CHAGEE":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-full w-full"
          role="img"
          aria-label="CHAGEE logo (placeholder)"
        >
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="#75c9c8"
            stroke="#1b2338"
            strokeWidth="2.5"
          />
          <path
            d="M28 11C33 11 36 14 36 19C31 19 28 16 28 11Z"
            fill="#f7f4ea"
            stroke="#1b2338"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <text
            x="22"
            y="35"
            textAnchor="middle"
            fill="#1b2338"
            fontSize="21"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            C
          </text>
        </svg>
      );

    case "Mixue":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-full w-full"
          role="img"
          aria-label="Mixue logo (placeholder)"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="#c0b9dd"
            stroke="#1b2338"
            strokeWidth="2.5"
          />
          <path
            d="M17 26H31L24 39L17 26Z"
            fill="#f7f4ea"
            stroke="#1b2338"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M17 26C16 22 19 19 22 19C22 15.5 25 13 28 14C29 17 32 19 31 26H17Z"
            fill="#75c9c8"
            stroke="#1b2338"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "7-Eleven":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-full w-full"
          role="img"
          aria-label="7-Eleven logo (placeholder)"
        >
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="#f7f4ea"
            stroke="#1b2338"
            strokeWidth="2.5"
          />
          <rect x="8" y="10" width="32" height="4" rx="2" fill="#75c9c8" />
          <rect x="8" y="16" width="32" height="4" rx="2" fill="#80a1d4" />
          <rect x="8" y="34" width="32" height="4" rx="2" fill="#c0b9dd" />
          <path
            d="M18 22H30L22 33"
            stroke="#1b2338"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "FamilyMart":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-full w-full"
          role="img"
          aria-label="FamilyMart logo (placeholder)"
        >
          <rect
            x="2"
            y="6"
            width="44"
            height="36"
            rx="18"
            fill="#75c9c8"
            stroke="#1b2338"
            strokeWidth="2.5"
          />
          <rect x="10" y="12" width="28" height="4" rx="2" fill="#f7f4ea" />
          <text
            x="24"
            y="32"
            textAnchor="middle"
            fill="#1b2338"
            fontSize="15"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            FM
          </text>
        </svg>
      );

    case "Tealive":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-full w-full"
          role="img"
          aria-label="Tealive logo (placeholder)"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="#c0b9dd"
            stroke="#1b2338"
            strokeWidth="2.5"
          />
          <path
            d="M27 9L24 17"
            stroke="#1b2338"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M16 17H32L30 36H18L16 17Z"
            fill="#f7f4ea"
            stroke="#1b2338"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="21" cy="31" r="1.8" fill="#1b2338" />
          <circle cx="25" cy="32" r="1.8" fill="#1b2338" />
          <circle cx="27" cy="28.5" r="1.8" fill="#1b2338" />
        </svg>
      );

    case "GrabFood":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-full w-full"
          role="img"
          aria-label="GrabFood logo (placeholder)"
        >
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="#75c9c8"
            stroke="#1b2338"
            strokeWidth="2.5"
          />
          <path
            d="M19 12V22C19 24.5 21 26 24 26C27 26 29 24.5 29 22V12M24 12V37"
            stroke="#1b2338"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case "Popular":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-full w-full"
          role="img"
          aria-label="Popular logo (placeholder)"
        >
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="#80a1d4"
            stroke="#1b2338"
            strokeWidth="2.5"
          />
          <path
            d="M13 15C17 13 21 14 24 17C27 14 31 13 35 15V33C31 31 27 32 24 35C21 32 17 31 13 33V15Z"
            fill="#f7f4ea"
            stroke="#1b2338"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M24 17V35" stroke="#1b2338" strokeWidth="2" />
        </svg>
      );

    case "Shopee":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-full w-full"
          role="img"
          aria-label="Shopee logo (placeholder)"
        >
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="#c0b9dd"
            stroke="#1b2338"
            strokeWidth="2.5"
          />
          <path
            d="M18 16C18 12.5 20.5 10 24 10C27.5 10 30 12.5 30 16"
            stroke="#1b2338"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <rect
            x="12"
            y="16"
            width="24"
            height="22"
            rx="5"
            fill="#f7f4ea"
            stroke="#1b2338"
            strokeWidth="2.2"
          />
          <text
            x="24"
            y="32"
            textAnchor="middle"
            fill="#1b2338"
            fontSize="14"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            S
          </text>
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-full w-full"
          role="img"
          aria-label={`${brand} logo (placeholder)`}
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="#1b2338"
            stroke="#1b2338"
            strokeWidth="2.5"
          />
          <text
            x="24"
            y="31"
            textAnchor="middle"
            fill="#f7f4ea"
            fontSize="20"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            {brand.slice(0, 1).toUpperCase()}
          </text>
        </svg>
      );
  }
}

export function BrandLogo({
  brand,
  size = 40,
  className = "",
  wobble = true,
}: BrandLogoProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.span
      whileHover={
        wobble && !prefersReduced
          ? { rotate: [0, -8, 8, -4, 0], scale: 1.08 }
          : undefined
      }
      transition={{ duration: 0.45 }}
      style={{ width: size, height: size }}
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
    >
      <BrandGlyph brand={brand} />
    </motion.span>
  );
}
