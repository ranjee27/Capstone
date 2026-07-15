# SKILLS.md

A running log of skills/techniques used in this project, updated as the
build progresses. Not filled in yet — add entries as each phase is
implemented. One section per skill/technique, added when it's actually
used, not planned in advance.

## Format for each entry

```
## <Skill/technique name>
- What it's used for in this project
- Where it's implemented (file/folder)
- Any gotchas or decisions worth remembering
```

## Log

### Forms & validation
- Blur-triggered validation with per-field error state, built in
  `components/SettingsForm.tsx` (Client Component)
- Submit-button disabling for both invalid state and post-submit
  (double-submission prevention)
- Gotcha: validation timing (blur vs change vs submit) must be
  specified explicitly in any prompt — left unspecified, the default
  assumption drifts toward change/submit-only

### Accessibility
- `aria-describedby` linking each field to its error message,
  `aria-live` region announcing validation/success state, implemented
  per `.claude/rules/accessibility.md`
- Gotcha: accessibility isn't applied by default — must be explicitly
  referenced in the prompt, confirmed by comparing the vague-prompt
  branch (no aria attributes) against the precise-prompt branch (fully
  implemented)

### Testing (Vitest + React Testing Library)
- Component tests colocated as `components/SettingsForm.test.tsx`
- Gotcha: `vitest.config.ts` requires the `@vitejs/plugin-react` plugin
  for any component using JSX — omitting it fails every test with
  `ReferenceError: React is not defined`. This was missing initially
  and caused all 8 tests to fail despite being reported as passing
- Gotcha: always run `npm test` independently rather than trusting an
  AI's report that tests were written and pass

### Project scaffolding (Next.js + TypeScript)
- Gotcha: Next.js's auto-generated `tsconfig.json` sets
  `strict: false` by default — must be manually corrected to
  `strict: true` to match `.claude/rules/coding-style.md`
