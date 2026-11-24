export type HippomeExpression =
  | "neutral"
  | "happy"
  | "thinking"
  | "celebrating"
  | "encouraging";

/**
 * Set `useCustomImage: true` to use a static PNG from `mockup/public/avatars/`
 * with no animation (disables talking mouth, blink, breathe, and wiggle).
 * Keep `false` (default) to use the built-in animated SVG mascot.
 */
export const HIPPOME_AVATAR_CONFIG = {
  useCustomImage: false,
  defaultSrc: "/avatars/hippome.png",
  alt: "Hippome mascot avatar",
  byExpression: {
    neutral: "/avatars/hippome.png",
    happy: "/avatars/hippome.png",
    thinking: "/avatars/hippome.png",
    celebrating: "/avatars/hippome.png",
    encouraging: "/avatars/hippome.png",
  } satisfies Record<HippomeExpression, string>,
};
