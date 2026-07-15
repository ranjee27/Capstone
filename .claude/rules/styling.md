# Styling (Tailwind CSS)

## General approach
- Utility classes directly in JSX — no separate CSS files unless a
  utility genuinely can't express something (rare; e.g. complex
  keyframe animation)
- Use Tailwind's design scale (spacing, font-size, color steps) rather
  than arbitrary values (`px-[13px]`) except when matching a specific
  design-to-pixel requirement — comment why when you do

## Responsive design
- Mobile-first: unprefixed classes are the mobile styles, add `sm:`
  `md:` `lg:` `xl:` to layer up
- Every page must be checked at minimum at: 375px (mobile), 768px
  (tablet), 1280px (desktop)

## Class organization
- Order roughly: layout → spacing → sizing → typography → color →
  state (hover/focus) — keeps long className strings scannable
- For components with long/repeated class strings, extract to a
  `cn()`/`clsx()` helper or a variant map rather than duplicating
  strings across files

## Design tokens
- Custom brand colors, fonts, and spacing overrides go in
  `tailwind.config.ts`, not inline arbitrary values, so the design
  system stays centralized and easy to adjust in the pixel-polish phase

## Dark mode / theming
- Not required unless the project spec calls for it — don't add
  `dark:` variants speculatively
