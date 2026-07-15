# Git Workflow

## Commit messages — Conventional Commits
Format: `type: description`

Types used in this repo:
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation only
- `chore` — tooling, config, dependencies
- `refactor` — code change that isn't a fix or feature
- `test` — adding or updating tests
- `style` — formatting only, no logic change

Examples:
```
feat: add booking form with date validation
fix: prevent double-booking on concurrent requests
docs: update README setup instructions
```

## Commit hygiene
- Keep commits scoped to one logical change — don't mix an unrelated
  fix into a feature commit
- No commented-out code, debug logs, or unused files in a commit
- Write commit messages in imperative mood ("add", not "added")

## Branching (if used)
- `main` stays deployable
- Feature work on `feature/<short-name>` branches, merged via PR when
  working with reviewers; direct commits to `main` are fine for solo
  capstone work but keep history clean regardless

## Before pushing
- Run lint and type-check locally
- Confirm no `.env` or secret file is staged (`git status` check)
