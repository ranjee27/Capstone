# Coding Style

## TypeScript
- Strict mode is on — no `any` unless explicitly justified with a comment
- Prefer `interface` for object shapes that may be extended; `type` for
  unions, primitives, and function signatures
- Explicit return types on exported functions; inference is fine for
  small local/private helpers
- No non-null assertions (`!`) unless the alternative is genuinely worse —
  prefer narrowing or optional chaining

## Naming
- Components: `PascalCase` (`BookingForm.tsx`)
- Hooks: `camelCase` prefixed with `use` (`useBookingState.ts`)
- Utility functions: `camelCase`
- Types/interfaces: `PascalCase`, no `I` prefix (`Booking`, not `IBooking`)
- Constants: `SCREAMING_SNAKE_CASE` only for true constants (config values,
  enums-as-objects); otherwise `camelCase`

## File structure
- One component per file; filename matches the component name
- Co-locate a component's types in the same file unless shared across
  multiple files, in which case move to `/types`
- No default exports for components — named exports only, for consistent
  auto-import behavior

## General
- `async/await` over `.then()` chains
- Avoid deeply nested ternaries — extract to a named variable or early
  return instead
- No commented-out code or stray `console.log` in committed code
