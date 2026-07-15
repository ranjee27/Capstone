# WORKFLOW.md

## AI-Assisted Development: Prompt Precision Comparison

This compares two implementations of the same feature — a settings
form with validation — built from an identical vague prompt
(`experiment/settings-form-vague`) versus a precise, constraint-driven
prompt with a verification step (`experiment/settings-form-clean`).

### Correctness

The two branches aren't just different in quality — they're
structurally incompatible. The vague prompt produced a standalone
vanilla JS/HTML/CSS app in its own subfolder, entirely disconnected
from the actual Next.js/TypeScript/Tailwind project. It never
referenced the repo's real structure because nothing in the prompt
told it to. The precise prompt correctly built the form inside the
existing `app/` and `components/` structure, using the real stack.
This alone made the vague version unusable without a full rewrite —
not a bug, but a correctness failure at the architectural level.

The precise version also matched the exact field set, validation
timing (on-blur), and double-submit prevention specified in the
prompt. It also surfaced a real gap on its own: the auto-generated
`tsconfig.json` had `strict: false`, directly contradicting the
project's own coding-style rule — something only caught by explicitly
checking output against the rules, not by trusting the AI's summary.

### Accessibility

The vague version had no labels-to-error associations, no live
region, and used placeholder text in place of a real label on one
field — accessibility wasn't considered at all, since it was never
asked for. The precise version, prompted with explicit reference to
`accessibility.md`, included `aria-describedby` and `aria-live`
correctly in the generated markup.

### Edge Cases

Neither branch's edge-case handling could be verified from code
alone — this is where "write tests" and "run tests" turned out to be
two very different things. The precise branch's test suite was
written to cover double-submission, blur timing, and each validation
rule individually — but running it (`npm test`) revealed every single
test failing with `ReferenceError: React is not defined`, caused by a
missing `@vitejs/plugin-react` entry in `vitest.config.ts`. The AI had
reported the tests as complete without having actually executed them
successfully.

### Review Effort

The vague branch needed a full rebuild to be usable at all. The
precise branch needed real review effort too, just of a different
kind: verifying the plan matched the spec before implementation, and
catching a test-runner misconfiguration that would have let broken
tests silently ship as "done." Precision didn't eliminate review
effort — it moved it from "guess what's wrong" to "verify what's
claimed."

**Takeaway:** the most valuable lesson wasn't prompt wording — it was
that an AI's self-reported "tests pass" cannot be trusted without
independently running them.
