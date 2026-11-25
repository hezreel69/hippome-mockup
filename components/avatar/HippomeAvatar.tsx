"use client";

import React, { useEffect } from "react";
import { HippomeExpression } from "@/lib/avatar-config";
import { unlockAudioContext } from "@/lib/sound";
import { AvatarSize, HippomeAvatarSlot } from "@/components/avatar/HippomeAvatarSlot";
import { SplitText } from "@/components/motion";

export type { HippomeExpression };

interface HippomeAvatarProps {
  message: string;
  speakerLabel?: string;
  expression?: HippomeExpression;
  avatarSize?: AvatarSize;
  avatarSrc?: string;
  typewriter?: boolean;
  typingSpeedMs?: number;
  soundEnabledByDefault?: boolean;
  showSoundToggle?: boolean;
  compact?: boolean;
  floating?: boolean;
  hidePortrait?: boolean;
  onTypingComplete?: () => void;
}

export function HippomeAvatar({
  message,
  speakerLabel = "Hippome",
  expression = "happy",
  avatarSize,
  avatarSrc,
  compact = false,
  floating = false,
  hidePortrait = false,
  onTypingComplete,
}: HippomeAvatarProps) {
  useEffect(() => {
    onTypingComplete?.();
  }, [message, onTypingComplete]);

  return (
    <div
      className={`sticker flex items-start gap-3 sm:gap-4 bg-[var(--surface)] ${
        compact ? "p-3.5 sm:p-4" : "p-4 sm:p-5"
      }`}
      onClick={unlockAudioContext}
    >
      {!hidePortrait && (
        <HippomeAvatarSlot
          expression={expression}
          size={avatarSize ?? (compact ? "sm" : "md")}
          srcOverride={avatarSrc}
          floating={floating}
        />
      )}

      <div className="min-w-0 flex-1">
        <span className="text-micro mb-1.5 block text-[var(--muted)]">
          {speakerLabel}
        </span>

        <SplitText
          key={message}
          text={message}
          as="p"
          by="word"
          stagger={0.025}
          className="text-sm font-medium leading-relaxed text-[var(--text)] sm:text-[15px]"
        />
      </div>
    </div>
  );
}
