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
