export type HippomeExpression =
  | "neutral"
  | "happy"
  | "thinking"
  | "celebrating"
  | "encouraging";

/**
 * 3-PNG custom asset configuration:
 * 1. `welcomeSrc`: `/avatars/hippome.png` (Onboarding Slide 1 hero hippo head)
 * 2. `defaultSrc`: `/logo.png` (Header logo, site-wide avatar & Quiz Pass result)
 * 3. `failSrc`: `/logo-fail.png` (Quiz Fail result)
 */
export const HIPPOME_AVATAR_CONFIG = {
  useCustomImage: true,
  welcomeSrc: "/avatars/hippome.png",
  defaultSrc: "/logo.png",
  failSrc: "/logo-fail.png",
  alt: "Hippome mascot avatar",
  byExpression: {
    neutral: "/logo.png",
    happy: "/logo.png",
    thinking: "/logo.png",
    celebrating: "/logo.png",
    encouraging: "/logo.png",
  } satisfies Record<HippomeExpression, string>,
};
