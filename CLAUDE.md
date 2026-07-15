# CLAUDE.md

Guidance for Claude Code (and any AI assistant) working in this repository.

## Project

A frontend AI engineering capstone project. A Next.js app that integrates an
LLM API to [briefly describe core feature — e.g. "summarize documents",
"power a chat assistant", etc.].

## Tech Stack

- **Framework:** Next.js 14+ (App Router, not Pages Router)
- **Language:** TypeScript — strict mode enabled, no implicit `any`
- **UI:** React (function components + hooks only, no class components)
- **Styling:** Tailwind CSS
- **AI/LLM:** Anthropic API, called server-side only (API routes / Route Handlers)
- **Auth:** Auth.js (NextAuth.js) with httpOnly cookies — no tokens in localStorage
- **Package manager:** npm

## Conventions

### Code style
- TypeScript strict mode; prefer explicit types on function signatures and props
- Function components with named exports (no default exports for components)
- One component per file; filename matches component name (`UserCard.tsx`)
- Co-locate component-specific styles/tests with the component
- Prefer `async/await` over `.then()` chains

### Folder structure
```
/app          — routes, layouts, pages (App Router)
/components   — reusable, presentation-focused components
/lib          — API clients, utilities, helper functions
/types        — shared TypeScript types/interfaces
/middleware.ts — route protection and auth checks
```

### Security rules (non-negotiable)
- Never call the Anthropic/LLM API directly from client components — always
  route through a server-side API route or Route Handler
- Never store API keys or secrets in client-side code or `NEXT_PUBLIC_*` env vars
- Auth checks must be enforced server-side (middleware / Route Handlers), never
  relied upon client-side alone
- Session tokens go in httpOnly cookies, not localStorage

### Git conventions
- Commit messages follow **Conventional Commits**: `type: description`
  - Types used in this repo: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`
  - Example: `feat: add chat message streaming endpoint`
- Keep commits small and scoped to one logical change
- No commented-out code or console.logs in committed code

### Testing
- Vitest + React Testing Library for components, jsdom environment
- `vitest.config.ts` must include the `@vitejs/plugin-react` plugin —
  without it, any component using JSX fails every test with
  `ReferenceError: React is not defined`. Confirmed missing and fixed
  during the settings-form exercise; check this file exists and is
  configured correctly before assuming a new test setup works
- New features should include at least a basic test where practical
- After writing tests, actually run them (`npm test`) and read the
  output — do not report tests as passing without independently
  confirming the run succeeded. See RULES.md lessons-learned section
- After scaffolding or `npm install`, check `tsconfig.json` for
  `strict: true` — Next.js's auto-setup has overwritten this to
  `false` before; it must match the strict-mode rule in this file

## What to do when asked to add a feature
1. Check if it touches auth or the LLM API — if so, confirm it's implemented
   server-side per the security rules above
2. Follow existing folder structure and naming conventions
3. Use TypeScript types already defined in `/types` where applicable; add new
   ones there rather than inlining complex types
4. Suggest a Conventional Commit message for the change

## What NOT to do
- Don't introduce new dependencies without flagging it first
- Don't bypass the App Router conventions (no `pages/` directory)
- Don't add client-side-only auth checks as the sole protection for a route
