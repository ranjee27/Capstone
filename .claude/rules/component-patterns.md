# Component Patterns

## Server vs Client Components
- Default to Server Components (no `"use client"` directive) unless the
  component needs interactivity, state, or browser-only APIs
- Push `"use client"` as far down the tree as possible — wrap only the
  interactive leaf (e.g. a form button), not the whole page
- Never fetch data with a client-side `useEffect` if it can be fetched in
  a Server Component instead

## Props
- Define an explicit `Props` type/interface per component, even for
  small components
- Avoid prop drilling more than 2 levels — use composition or context
  instead
- Optional props get sensible defaults, not `undefined` handling
  scattered through the component body

## Composition
- Prefer composition (children, slots) over large components with many
  boolean flags controlling internal branches
- Extract a sub-component once a single component's JSX exceeds ~150
  lines or mixes more than one clear responsibility

## Data fetching
- Server Components fetch data directly (Supabase server client, no
  client-side fetch needed)
- Client Components that need fresh data use a Route Handler or Server
  Action — never call Supabase directly with client-exposed credentials
  beyond the public anon key's intended scope

## State
- Local UI state: `useState`
- Shared state across a few related components: lift state up or use
  context — avoid a global state library unless the project genuinely
  needs it (e.g. cart state in Corner Market)
