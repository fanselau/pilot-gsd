---
phase: 09-prompt-hardening
plan: 04b
subsystem: prompt-hardening
tags: [negative-instructions, positive-framing, templates, workflows, references]

# Dependency graph
requires:
  - phase: 09-prompt-hardening
    provides: "Plans 02, 03, 04a negative instruction rewrites in agents and command files"
provides:
  - "Workflow files (4) with zero negative instruction patterns"
  - "Reference file (1) with zero negative instruction patterns"
  - "Template files (8) with zero negative instruction patterns"
  - "Complete negative-to-positive conversion across all prompt file directories"
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Positive framing: all behavioral instructions use affirmative language"
    - "Legitimate non-instruction negatives (descriptive text, YAML examples, code blocks) preserved"

key-files:
  created: []
  modified:
    - .opencode/get-shit-done/workflows/remove-phase.md
    - .opencode/get-shit-done/templates/UAT.md
    - .opencode/get-shit-done/templates/roadmap.md
    - .opencode/get-shit-done/templates/milestone-archive.md
    - .opencode/get-shit-done/templates/discovery.md
    - .opencode/get-shit-done/templates/milestone.md

key-decisions:
  - "Non-instruction negatives preserved in workflows/references (YAML examples, descriptive text, code block comments are not behavioral instructions)"
  - "anti_patterns section renamed to constraints in remove-phase.md for consistency with 09-02/09-04a"
  - "UAT.md severity inference: rewritten as 'Always infer; asking disrupts the flow' to avoid introducing new negative pattern"

patterns-established:
  - "Pattern: Survey all hits before editing — filter genuine instructions from legitimate non-instruction contexts"

# Metrics
duration: 4min
completed: 2026-03-06
---

# Phase 9 Plan 04b: Prompt Hardening Workflows/References/Templates Summary

**Negative-to-positive instruction rewrite completed across workflows, references, and templates — 5 genuine instruction patterns rewritten across 5 files; remaining hits all confirmed non-instruction contexts.**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-06T09:14:06Z
- **Completed:** 2026-03-06T09:17:33Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Confirmed zero genuine negative instruction patterns in 5 workflow files and 1 reference file
- Rewrote 5 genuine instruction patterns across 4 template files (UAT.md, roadmap.md, milestone-archive.md, discovery.md, milestone.md)
- Renamed `<anti_patterns>` to `<constraints>` in remove-phase.md for consistency with prior plans
- Completed the negative-to-positive conversion across the entire prompt file system

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite negative instructions in workflows and references** - `c369d0f` (refactor)
2. **Task 2: Rewrite negative instructions in surviving template files** - `9601e76` (refactor)

## Files Created/Modified

- `.opencode/get-shit-done/workflows/remove-phase.md` — renamed `<anti_patterns>` to `<constraints>`
- `.opencode/get-shit-done/templates/UAT.md` — rewritten: "never asked" → "Always infer; asking disrupts the flow"
- `.opencode/get-shit-done/templates/roadmap.md` — rewritten: "never restart at 01" → "always continue from highest existing phase number"
- `.opencode/get-shit-done/templates/milestone-archive.md` — same rewrite as roadmap.md
- `.opencode/get-shit-done/templates/discovery.md` — rewritten: "never WebSearch alone" → "always confirm with authoritative sources, treating WebSearch as supplementary"
- `.opencode/get-shit-done/templates/milestone.md` — rewritten: "Don't create milestones for:" → "Reserve milestones for shipped work only:" with positive-framed items

## Decisions Made

- **Non-instruction negatives preserved**: YAML example content (`"Dashboard API calls don't include auth header"`), descriptive parentheticals (`"transitions don't use resume files"`), code block comments (`"# Functions that do nothing"`), and false positives from "whenever" containing "never " are all legitimate non-instruction contexts — preserved unchanged.
- **anti_patterns → constraints**: Renamed in remove-phase.md to match pattern established in 09-02 (guardrails) and 09-04a (constraints). Used "constraints" to match command file convention.
- **UAT.md phrasing**: First rewrite introduced "do not ask" — caught during sweep and corrected to "asking disrupts the flow" to avoid re-introducing a negative pattern.

## Deviations from Plan

None - plan executed exactly as written. The count of genuine instruction patterns (5) was slightly lower than the ~9 estimated (plan said ~5 in workflows/refs and ~8 in templates), as most hits were non-instruction contexts.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 9 plan 04b complete
- All 4 plans in Phase 9 are now complete (09-01, 09-02, 09-03, 09-04a, 09-04b)
- Milestone autonomy-fork-v1 is fully complete
- No blockers

---
*Phase: 09-pilot-gsd-prompt-hardening-and-cleanup*
*Completed: 2026-03-06*
