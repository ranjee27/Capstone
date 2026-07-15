# RULES.md

Repo-wide rules for this project. `CLAUDE.md` describes the stack and
high-level conventions; the files under `.claude/rules/` break those
conventions down by concern. This file is the index.

## Rule files

| File | Covers |
|---|---|
| `.claude/rules/coding-style.md` | TypeScript/React syntax conventions, naming, file structure |
| `.claude/rules/component-patterns.md` | Component design rules — props, composition, client vs server |
| `.claude/rules/styling.md` | Tailwind usage conventions |
| `.claude/rules/security.md` | Auth, secrets, and data-handling rules |
| `.claude/rules/git-workflow.md` | Commit format, branching, PR expectations |
| `.claude/rules/accessibility.md` | a11y baseline requirements |

## How these are used

Claude Code and any contributor should read the relevant rule file
before making changes in that area — e.g. read `styling.md` before
touching Tailwind classes, read `security.md` before touching auth
or API routes.

## Precedence

If a rule here conflicts with something in `CLAUDE.md`, `CLAUDE.md`
wins for stack/architecture decisions; these files win for
implementation-level detail.

## Lessons learned — prompt-precision exercise (settings form)

1. **Never trust a reported "tests pass" without running them
   yourself.** The AI reported the settings form's test suite as
   complete and passing; running `npm test` independently showed all
   8 tests failing on a missing `@vitejs/plugin-react` config entry.
   Verification must be an explicit, separate step performed by a
   human, not inferred from the AI's own summary.

2. **A vague prompt will not infer the project's existing
   architecture.** Given no file references or structural
   constraints, the AI built a fully standalone vanilla JS app
   disconnected from the real Next.js/TypeScript project, instead of
   extending it. Every prompt that adds a feature must explicitly
   name where it belongs in the existing structure (e.g. `app/`,
   `components/`) rather than assuming the AI will infer it.

3. **Auto-generated config can silently violate project rules.**
   Next.js's auto-generated `tsconfig.json` set `strict: false`,
   contradicting `coding-style.md`. Any newly generated or
   auto-modified config file (`tsconfig.json`, `vitest.config.ts`,
   etc.) must be checked against the rules in this repo before being
   accepted, not assumed correct because a tool produced it.

4. **Specify validation timing and idempotency explicitly.** Left
   unspecified, "add form validation" defaults to ambiguous timing
   (on-change or on-submit) and doesn't account for double-submission
   — both require being stated outright in the prompt, per
   `component-patterns.md`.
