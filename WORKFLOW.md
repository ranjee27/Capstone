WORKFLOW.md

AI-Assisted Development: Prompt Precision Comparison

This compares three implementations of the same feature — a settings
form with validation — built from: an identical vague prompt to
Claude Code (experiment/settings-form-vague), a precise,
constraint-driven prompt to Claude Code with a verification step
(experiment/settings-form-clean), and the same precise spec given
to v0 (experiment/settings-form-v0).

Correctness

The vague-prompt branch was structurally incompatible with the real
project — a standalone vanilla JS/HTML/CSS app in its own subfolder,
disconnected from the actual Next.js/TypeScript/Tailwind stack, since
nothing in the prompt referenced the existing architecture.

The precise Claude Code branch matched the spec exactly: correct
fields, on-blur validation, double-submit prevention, and correctly
used the project's existing plain-Tailwind conventions per
.claude/rules/styling.md. It also surfaced a real gap on its own —
an auto-generated tsconfig.json with strict: false, contradicting
the project's own rules — caught only by checking output against the
rules directly.

v0, given the same precise spec, produced validation logic that
matched the requirements closely — correct field rules, on-blur
timing, double-submit prevention via a status state machine. But it
introduced an undeclared dependency: the component's styling relies
on shadcn/ui theme tokens (bg-primary, text-destructive, etc.)
that don't exist anywhere in this project's globals.css. The result
renders structurally but with broken styling — most visibly, the
submit button has no visible background or shape. This wasn't
knowable from reading the code; it only became visible by running the
app and viewing it in a browser.

Accessibility

The vague branch had no accessibility considerations at all. The
precise Claude Code branch correctly implemented aria-describedby
and aria-live, explicitly prompted via a reference to
accessibility.md. Notably, v0's output included the same
aria-describedby, aria-invalid, and aria-live patterns
correctly, without any equivalent rule file to reference — suggesting
reasonable accessibility defaults independent of project-specific
guidance.

Edge Cases

The precise Claude Code branch's test suite, once a missing
@vitejs/plugin-react config entry was fixed, passed all 8 cases
covering every validation rule, timing, and double-submission.
v0 generated no tests at all — its correctness could only be verified
by manual inspection and running the app, a materially weaker
verification story than a branch with an executable, repeatable test
suite.

Review Effort

The vague branch needed a full rebuild. The precise Claude Code
branch needed review to catch a test-runner misconfiguration and a
strict-mode regression — both invisible without independent
verification. The v0 branch needed the least code-level review (its
logic was clean and closely matched the spec) but the highest
integration review — the styling break was only caught by actually
rendering the page, not by reading the component in isolation.

Takeaway: each round's largest risk was different — vague
prompting risked wrong architecture, precise prompting risked
unverified claims of completion, and a third-party UI generator
risked an invisible, undeclared dependency on infrastructure the
project didn't have. All three failure modes were only caught by
actually running the code, not by reading it.
