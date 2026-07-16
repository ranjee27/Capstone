# SKILLS.md

A running log of skills and techniques used in this project, updated as the
work progresses. Each section records a technique that has already been used
in practice rather than a planned idea.

## Format for each entry

```
## <Skill/technique name>
- What it's used for in this project
- Where it's implemented (file/folder)
- Any gotchas or decisions worth remembering
```

## Log

### Prompt precision & repo-aware implementation
- Uses explicit target paths and constraints in prompts so the generated work
  lands in the intended part of the project rather than becoming a detached
  prototype.
- Where it's implemented: the workflow notes in `WORKFLOW.md` and the repo
  guidance in `CLAUDE.md` and `RULES.md`
- Gotcha: a vague prompt can easily produce a standalone app that does not
  fit the repository's real structure.

### Forms & validation
- Blur-triggered validation with per-field error state, built in the
  settings-form experiment
- Submit-button disabling for both invalid state and post-submit cases to
  prevent double submission
- Gotcha: validation timing and idempotency need to be specified explicitly
  in any prompt; otherwise the default behavior is underspecified

### Accessibility
- `aria-describedby` linking each field to its error message and an
  `aria-live` region announcing validation state, aligned with
  `.claude/rules/accessibility.md`
- Gotcha: accessibility is not applied by default and must be called out in
  the prompt if it is required

### Testing (Vitest + React Testing Library)
- Component tests should be colocated with the component under test where
  practical
- Gotcha: `vitest.config.ts` requires the `@vitejs/plugin-react` plugin for
  JSX components; omitting it causes failures such as
  `ReferenceError: React is not defined`
- Gotcha: always run the relevant test command yourself rather than trusting
  an AI summary that tests were written and passed

### Project scaffolding (Next.js + TypeScript)
- Gotcha: auto-generated Next.js configuration can silently set `strict: false`
  or miss required plugins, so new config should be checked against the repo
  rules before being accepted
