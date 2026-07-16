# Front-End AI Capstone — FlyRank

A frontend AI engineering capstone project focused on building a secure,
modern AI-assisted experience. The repository currently contains guidance,
workflow notes, and a settings-form experiment used to compare prompt
precision and implementation quality.

## What is in this repository right now

- Project guidance and conventions in `RULES.md` and `CLAUDE.md`
- Workflow and lessons learned in `WORKFLOW.md`
- The settings-form experiment in `experiment/settings-form-vague`
- Shared guidance under `.claude/rules/` and `.claude/skillls/`

## Current focus

The current work is less about shipping a fully polished app and more about
establishing a reliable implementation workflow: prompt precision,
server-side AI handling, accessibility, testing, and verification. As the
real app layer is added, it should continue to follow Next.js, TypeScript,
and Tailwind conventions.

## Tech stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** React
- **Styling:** Tailwind CSS
- **AI/LLM:** Server-side integration only
- **Auth:** Server-side checks with httpOnly cookies
- **Package manager:** npm

## Project structure

```
/app          — future App Router routes and layouts
/components   — reusable UI components
/lib          — utilities, API clients, and helpers
/types        — shared TypeScript types
/experiment   — implementation experiments and comparisons
```

## Getting started

1. Review the guidance in `RULES.md` and `CLAUDE.md` before making changes.
2. Keep any new feature work aligned with the existing repository structure.
3. If you add AI-backed functionality, use the environment template in
   `.env.example` and keep secrets server-side.

## Environment notes

- Copy `.env.example` to `.env.local` when you need to configure local secrets.
- Never expose API keys or sensitive values to client-side code.

## Verification

- Run tests and lint commands yourself whenever you add or change behavior.
- Prefer small, reviewable changes and confirm them in the workspace before
  reporting completion.

## License

MIT — see [LICENSE](./LICENSE).
