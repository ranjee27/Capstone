# Accessibility Baseline

## Semantic HTML
- Use semantic elements (`<button>`, `<nav>`, `<main>`, `<header>`,
  `<footer>`) over generic `<div>`s with click handlers
- Headings follow a logical order (`h1` → `h2` → `h3`), not chosen for
  visual size

## Forms
- Every input has an associated `<label>` (visible or `sr-only`, not
  placeholder-only)
- Validation errors are announced (e.g. `aria-live` region or
  `aria-describedby` linking the error to the field)
- Required fields marked with `aria-required` in addition to visual
  indication

## Interactive elements
- All interactive elements are keyboard-operable (tab order, Enter/Space
  activation) — test without a mouse before considering a feature done
- Visible focus states — don't remove Tailwind's default focus ring
  without replacing it with an equally visible alternative
- Images have meaningful `alt` text; decorative images use `alt=""`

## Color & contrast
- Text meets WCAG AA contrast minimums against its background
- Don't rely on color alone to convey state (e.g. error/success) — pair
  with an icon or text label

## Testing
- Run an automated check (e.g. axe DevTools or Lighthouse accessibility
  audit) during the responsive/polish phase, not only at the end
