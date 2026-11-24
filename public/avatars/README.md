# Hippome Avatar Asset Folder

Drop your custom Hippome mascot artwork here to replace the built-in animated SVG hippo across the entire app (Auth, Onboarding, Dashboard Coach, Diagnostic Assessment, and Quiz Results).

## Quick Swap (1 Image — Static Mode)

1. Save your avatar image as:
   `mockup/public/avatars/hippome.png`
   *(Recommended: `512x512` PNG, WebP, or SVG with a transparent background.)*
2. Open `mockup/lib/avatar-config.ts` and change:
   ```ts
   useCustomImage: true,
   ```
   When `useCustomImage` is `true`, the image renders as a static PNG with **no avatar animation** (no talking mouth, blink, breathe, or wiggle). Set `useCustomImage: false` to use the built-in animated SVG mascot.

## Optional Per-Mood Artwork

If you want different expressions for each moment, add separate files here and point `byExpression` in `mockup/lib/avatar-config.ts` to them:

- `hippome-neutral.png`
- `hippome-happy.png`
- `hippome-thinking.png`
- `hippome-celebrating.png`
- `hippome-encouraging.png`
