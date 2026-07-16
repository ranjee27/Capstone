# CLAUDE.md

Guidance for Claude Code (and any AI assistant) working in this repository.

## Project

FlyRank is a frontend AI engineering capstone project focused on building a
secure, polished AI-assisted experience. The repository currently contains
project guidance, workflow notes, and a settings-form experiment used to
compare prompt precision and implementation quality.

## Tech stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript — strict mode enabled, no implicit `any`
- **UI:** React (function components + hooks only)
- **Styling:** Tailwind CSS
- **AI/LLM:** Server-side calls only via Route Handlers or Server Actions
- **Auth:** Server-side checks with httpOnly cookies — no tokens in localStorage
- **Package manager:** npm

## Repository context

- The current workspace includes documentation, workflow notes, and the
  experimental settings-form implementation under `experiment/settings-form-vague`.
- Keep new work aligned with the intended project structure instead of creating
  a disconnected one-off prototype.

## Conventions

### Code style
- TypeScript strict mode; prefer explicit types on function signatures and props
- Function components with named exports (no default exports for components)
- One component per file; filename matches the component name (`UserCard.tsx`)
- Co-locate component-specific tests with the component where practical
- Prefer `async/await` over `.then()` chains

### Folder structure
```
/app          — routes, layouts, and pages (App Router)
/components   — reusable presentation-focused components
/lib          — API clients, utilities, and helper functions
/types        — shared TypeScript types/interfaces
/middleware.ts — route protection and auth checks
```

### Security rules (non-negotiable)
- Never call the LLM API directly from client components — route through a
  server-side API route or Route Handler
- Never store API keys or secrets in client-side code or `NEXT_PUBLIC_*`
  environment variables
- Auth checks must be enforced server-side (middleware / Route Handlers), not
  only by UI state
- Session tokens should be managed in httpOnly cookies, not localStorage

### Git conventions
- Commit messages follow **Conventional Commits**: `type: description`
  - Types used in this repo: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`
  - Example: `feat: add chat message streaming endpoint`
- Keep commits small and scoped to one logical change
- No commented-out code or `console.log` statements in committed code

### Testing
- Vitest + React Testing Library are the expected test stack for component work
- `vitest.config.ts` must include the `@vitejs/plugin-react` plugin so JSX
  components test correctly
- New features should include at least a basic test where practical
- After writing tests, run them yourself and read the output rather than
  trusting a summary alone
- After scaffolding or `npm install`, check `tsconfig.json` for `strict: true`
  so it matches the repository rules

## What to do when asked to add a feature
1. Check whether it touches auth or the LLM API — if so, confirm it is
   implemented server-side
2. Follow the existing folder structure and naming conventions
3. Use shared types from `/types` where applicable rather than inlining them
4. Add a basic test where practical
5. Suggest a Conventional Commit message for the change

## What NOT to do
- Don't introduce new dependencies without flagging them first
- Don't bypass the App Router conventions (no `pages/` directory)
- Don't rely on client-side-only auth checks as the sole protection for a route
