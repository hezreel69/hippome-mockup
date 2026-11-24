"use client";

import React from "react";
import { Confetti } from "@/components/motion/Confetti";

interface RewardBurstProps {
  active?: boolean;
}

/**
 * Celebration burst in the Hippome brand palette.
 */
export function RewardBurst({ active = true }: RewardBurstProps) {
  return <Confetti active={active} count={36} spread="burst" />;
}
