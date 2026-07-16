# RULES.md

Repo-wide rules for this project. `CLAUDE.md` captures the stack and
high-level conventions; the files under `.claude/rules/` break those
conventions down by concern. This file is the index and should be read
before making changes.

## Current repository context

- The workspace currently contains project guidance, workflow notes, and the
  settings-form experiment under `experiment/settings-form-vague`.
- The implementation work is still being shaped, so new work should stay
  aligned with the intended Next.js, TypeScript, and Tailwind structure
  instead of creating detached standalone demos.

## Rule files

| File | Covers |
|---|---|
| `.claude/rules/coding-style.md` | TypeScript/React syntax conventions, naming, file structure |
| `.claude/rules/component-patterns.md` | Component design rules — props, composition, client vs server |
| `.claude/rules/styling.md` | Tailwind usage conventions |
| `.claude/rules/security.md` | Auth, secrets, and data-handling rules |
| `.claude/rules/git-workflow.md` | Commit format, branching, PR expectations |
| `.claude/rules/accessibility.md` | Accessibility baseline requirements |

## How these are used

Claude Code and any contributor should read the relevant rule file before
making changes in that area — for example, read `styling.md` before
changing Tailwind classes, and read `security.md` before touching auth or
API routes.

## Precedence

If a rule here conflicts with something in `CLAUDE.md`, `CLAUDE.md` wins
for stack and architecture decisions; the rule files win for
implementation-level detail.

## Lessons learned — prompt-precision exercise (settings form)

1. **Never trust a reported "tests pass" without running them yourself.**
   The settings-form exercise showed that a tool summary can be wrong even
   when the implementation appears complete. Verification must be an explicit
   step performed in the workspace.

2. **A vague prompt will not infer the project's existing architecture.**
   Without file references or structural constraints, an implementation can
   drift into a standalone app that does not match the real project layout.
   Every prompt that adds a feature should name the target area (for example
   `app/`, `components/`, or `lib/`).

3. **Auto-generated config can silently violate project rules.**
   Next.js-generated configuration can accidentally weaken strict mode or
   omit required plugins. Any generated or auto-modified config file should
   be checked against the repo rules before being accepted.

4. **Specify validation timing and idempotency explicitly.**
   Requirements such as on-blur validation, submit-button disabling, and
   double-submission prevention need to be described directly in the prompt
   rather than left implicit.

5. **Accessibility should be requested explicitly.**
   Good UI behavior is not guaranteed by default; prompts should call out
   keyboard support, focus states, and screen-reader announcements when the
   feature depends on them.
