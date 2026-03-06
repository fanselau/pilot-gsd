---
phase: 09-prompt-hardening
plan: 03
subsystem: agents
tags: [prompt-hardening, positive-framing, opencode, agents]

# Dependency graph
requires:
  - phase: 09-prompt-hardening
    provides: "09-02 completed same rewrite for root agents/ directory (reference for patterns)"
provides:
  - "All 11 .opencode/agents/ files with negative instructions rewritten to positive framing"
  - "~30 negative instruction instances converted across codebase-mapper, debugger, executor, integration-checker, phase-researcher, plan-checker, planner, project-researcher, research-synthesizer, roadmapper, verifier"
affects: [09-prompt-hardening]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Positive framing: 'Don't use X' → 'Use Z. Reserve X for W.'"
    - "Positive framing: 'DO NOT commit' → 'Leave committing to the orchestrator'"
    - "Positive framing: 'DON'T:' blocks → 'GUIDELINE:' blocks"
    - "anti_patterns sections → guardrails sections (where applicable)"

key-files:
  created: []
  modified:
    - .opencode/agents/gsd-codebase-mapper.md
    - .opencode/agents/gsd-debugger.md
    - .opencode/agents/gsd-executor.md
    - .opencode/agents/gsd-integration-checker.md
    - .opencode/agents/gsd-phase-researcher.md
    - .opencode/agents/gsd-plan-checker.md
    - .opencode/agents/gsd-planner.md
    - .opencode/agents/gsd-project-researcher.md
    - .opencode/agents/gsd-research-synthesizer.md
    - .opencode/agents/gsd-roadmapper.md
    - .opencode/agents/gsd-verifier.md

key-decisions:
  - "Non-instruction uses of negative words preserved (code blocks, quoted strings, descriptive text, section headers, column names)"
  - "Users NEVER run CLI commands in gsd-executor quick-reference kept — descriptive statement about user role, not agent instruction"
  - "gsd-integration-checker had zero instruction-type negatives (only YAML code example string)"

patterns-established:
  - "Positive framing pattern: same as 09-02 for root agents/ directory"

# Metrics
duration: 45min
completed: 2026-03-06
---

# Phase 9 Plan 03: Negative Instruction Rewrite — .opencode/agents/ Summary

**~30 negative instruction instances across all 11 .opencode/agents/ files rewritten to positive framing, completing the prompt-hardening pass for both agents/ and .opencode/agents/ directories**

## Performance

- **Duration:** ~45 min
- **Started:** 2026-03-06T (continued from prior session)
- **Completed:** 2026-03-06
- **Tasks:** 2/2
- **Files modified:** 11 agent files (gitignored, disk-only)

## Accomplishments

- Rewrote all negative instruction patterns in 11 `.opencode/agents/` files
- Task 1 (high-count files): gsd-debugger (~8), gsd-phase-researcher (~6), gsd-roadmapper (~5), gsd-plan-checker (~7), gsd-project-researcher (~5)
- Task 2 (remaining files): gsd-codebase-mapper (~3), gsd-planner (~5), gsd-executor (~4), gsd-verifier (~5), gsd-research-synthesizer (~2), gsd-integration-checker (0)
- Preserved all non-instruction uses (descriptive text, code examples, column headers, YAML strings)

## Task Commits

Each task was committed atomically (empty commits — .opencode/ is gitignored):

1. **Task 1: Rewrite high-count files** - `ada42e1` (refactor)
2. **Task 2: Rewrite remaining files** - `5d9e9a8` (chore)

**Plan metadata:** _(this commit)_

## Files Created/Modified

All 11 `.opencode/agents/` files modified (disk only, gitignored):
- `gsd-debugger.md` — 8 rewrites: "Don't add changes on top of confusion", "Don't get attached", "Do NOT proceed to fix_and_verify", etc.
- `gsd-phase-researcher.md` — 6 rewrites: "Don't explore alternatives to locked decisions", "Never present LOW confidence", etc.
- `gsd-roadmapper.md` — 5 rewrites including `<anti_patterns>` → `<guardrails>` rename
- `gsd-plan-checker.md` — 7 rewrites: all "DO NOT check/run/accept/skip/ignore/verify/trust" → positive guardrails
- `gsd-project-researcher.md` — 5 rewrites: philosophy, confidence level, DO NOT commit
- `gsd-research-synthesizer.md` — 2 rewrites: researcher commit responsibilities
- `gsd-codebase-mapper.md` — 3 rewrites: `<critical_rules>` block (WRITE DIRECTLY, USE TEMPLATES, DO NOT COMMIT)
- `gsd-planner.md` — 5 rewrites: pad/compress warning, Do NOT surface, Do NOT use for, DON'T block, DO NOT revise block, do not revisit
- `gsd-executor.md` — 4 rewrites: do not continue, Don't retry, DO NOT redo, NEVER git add
- `gsd-verifier.md` — 5 rewrites: Do NOT trust SUMMARY, DO NOT COMMIT (x2), critical_rules block
- `gsd-integration-checker.md` — 0 rewrites (only YAML code example string, not instruction)

## Decisions Made

- **Non-instruction uses preserved:** Code blocks, quoted strings, descriptive text ("you don't know why"), section headers ("Don't Hand-Roll"), column names, and rhetorical questions were left unchanged — consistent with 09-02 approach.
- **"Users NEVER run CLI commands" kept in gsd-executor:** This is a descriptive statement about the user/Claude division of labor, not an instruction to the agent itself.
- **gsd-integration-checker zero-touch:** The one grep hit (`reason: "Exported but never imported"`) is inside a YAML code example string — not an instruction.

## Deviations from Plan

None — plan executed exactly as written. The ~30 instance estimate proved accurate (~30 actual instruction rewrites across the 11 files).

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 9 (Pilot-GSD Prompt Hardening & Cleanup) is now fully complete: all 3 plans done (09-01 dead files, 09-02 root agents/ rewrite, 09-03 .opencode/agents/ rewrite)
- Milestone `autonomy-fork-v1` is complete — all 13 plans across 9 phases done
- No blockers or concerns

---
*Phase: 09-prompt-hardening*
*Completed: 2026-03-06*
