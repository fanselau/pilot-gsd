---
phase: 09-pilot-gsd-prompt-hardening-and-cleanup
plan: "02"
subsystem: prompts
tags: [prompt-engineering, agents, positive-framing, behavioral-instructions]

# Dependency graph
requires:
  - phase: 09-pilot-gsd-prompt-hardening-and-cleanup
    provides: "@ reference audit and dead file deletion (09-01)"
provides:
  - "All 11 agent files rewritten with positive instruction framing"
  - "Zero negative instruction patterns in agents/ root directory"
affects: [agents, execution-quality]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Positive framing: 'Use X for Y' instead of 'Do NOT use X'"
    - "Guardrails sections replace anti_patterns sections"
    - "Constraint language replaced with affirmative guidance"

key-files:
  created: []
  modified:
    - agents/gsd-debugger.md
    - agents/gsd-planner.md
    - agents/gsd-plan-checker.md
    - agents/gsd-codebase-mapper.md
    - agents/gsd-phase-researcher.md
    - agents/gsd-roadmapper.md
    - agents/gsd-executor.md
    - agents/gsd-verifier.md
    - agents/gsd-project-researcher.md
    - agents/gsd-research-synthesizer.md

key-decisions:
  - "Skip non-instruction occurrences: code blocks, quoted examples, descriptive text, section titles, markdown table headers"
  - "Rewrite <anti_patterns> sections as <guardrails> sections with positive framing"
  - "Preserve identical behavioral intent across all rewrites"
  - "Phase-researcher Don't Hand-Roll section titles preserved as section name references, not instructions"

# Metrics
duration: 14min
completed: 2026-03-06
---

# Phase 9 Plan 02: Negative Instruction Rewrite Summary

**Rewrote ~40 negative instruction patterns across all 11 agent files in agents/ to positive framing — preserving behavioral intent while eliminating "don't/never/do not/must not" instruction language.**

## Performance

- **Duration:** 14 min
- **Started:** 2026-03-06T08:33:30Z
- **Completed:** 2026-03-06T08:47:32Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments

- Identified and rewrote every behavioral instruction using negative framing across all 11 agent files
- Distinguished instruction-type patterns from legitimate non-instruction uses (code blocks, quoted examples, descriptive text, template content, column headers)
- Converted two `<anti_patterns>` sections (`gsd-plan-checker.md`, `gsd-roadmapper.md`) to `<guardrails>` sections with positively-framed rules
- Preserved 100% of original behavioral intent across all rewrites

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite negative instructions in high-count agent files** - `c8d157a` (feat)
2. **Task 2: Rewrite negative instructions in remaining agent files** - `1ed0a3b` (feat)

**Plan metadata:** (see final commit below)

## Files Created/Modified

- `agents/gsd-debugger.md` — 6 instructions rewritten (ask/judge/attach/proceed/act-if/fix rules)
- `agents/gsd-planner.md` — 9 instructions rewritten (load/animations/deferred/surface/pad/empty/checkpoint/rewrite rules)
- `agents/gsd-plan-checker.md` — 4 instructions rewritten; `<anti_patterns>` → `<guardrails>`
- `agents/gsd-codebase-mapper.md` — 6 instructions rewritten (temporal/confirmation/forbidden_files/critical_rules)
- `agents/gsd-phase-researcher.md` — 4 instructions rewritten (load/alternatives/assert/confidence)
- `agents/gsd-roadmapper.md` — 10 instructions rewritten; `<anti_patterns>` → `<guardrails>`
- `agents/gsd-executor.md` — 8 instructions rewritten (load/scope-boundary/fix-limit/users-never/redo/git-add/write-tool/self-check)
- `agents/gsd-verifier.md` — 5 instructions rewritten (trust-summary/write-tool/commit/critical_rules)
- `agents/gsd-project-researcher.md` — 5 instructions rewritten (pad/guess-IDs/LOW-confidence/commit rules)
- `agents/gsd-research-synthesizer.md` — 2 instructions rewritten (researchers-commit clarification)

## Decisions Made

- **Distinguish instruction vs non-instruction**: Quoted example phrases (e.g., `"I don't know why this fails"` = good), descriptive text explaining concepts, decision tree questions, and code block content were all correctly identified as non-instructions and left unchanged.
- **Preserve section title references**: `## Don't Hand-Roll` in gsd-phase-researcher.md is a section name referenced in tables and checklists — not an instruction to the agent. Left unchanged.
- **Anti_patterns → Guardrails**: Two sections were renamed from `<anti_patterns>` to `<guardrails>` for consistency with positive framing throughout.
- **AGENTS.md load rule**: The common `Do NOT load full AGENTS.md files` pattern across 3 agents was rewritten consistently as `Load only SKILL.md files (full AGENTS.md files incur 100KB+ context cost)`.

## Deviations from Plan

None - plan executed exactly as written. All ~40 instruction patterns identified and rewritten. Remaining non-zero grep counts are exclusively from legitimate non-instruction contexts (code blocks, quoted examples, template content, column headers, descriptive text).

## Issues Encountered

None. The pre-analysis from the plan's count estimates was accurate. The final sweep confirmed all remaining patterns are in legitimate non-instruction contexts.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 9 is now complete with both plans executed (09-01: dead file deletion, 09-02: negative instruction rewrite)
- All 11 agent files have positive-framed behavioral instructions
- Ready for phase transition

---
*Phase: 09-pilot-gsd-prompt-hardening-and-cleanup*
*Completed: 2026-03-06*
