# Custom Brand Fonts

Drop your font files here so Mnemo renders the exact brand typefaces:

- **Kapsalon** (used for the `"Mnemo"` wordmark):
  - `public/fonts/kapsalon.woff2` (or `.otf` / `.ttf`)
- **Slopes** (used for the `"Education is key!"` subtitle):
  - `public/fonts/slopes.woff2` (or `.otf` / `.ttf`)

Both fonts are loaded via `@font-face` in `app/globals.css` with automatic fallback to the display font until the files are placed here.
