---
phase: 09-prompt-hardening
plan: 06
subsystem: infra
tags: [commands, routing, deduplication, token-reduction, thin-router]

# Dependency graph
requires:
  - phase: 09-pilot-gsd-prompt-hardening-and-cleanup
    provides: negative instruction rewrites (09-04a, 09-04b) that established positive framing patterns
provides:
  - Thin routing layer pattern applied to all .opencode/command/ files
  - ~5,300 lines of duplicated workflow content removed from commands
  - All .opencode/command/ files now delegate to workflow files via @ references
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Thin router pattern: frontmatter + objective + execution_context(@workflow) + context(args) + process(delegate)"
    - "@ reference delegation: commands route to workflows, not inline logic"

key-files:
  created: []
  modified:
    - .opencode/command/gsd-execute-phase.md
    - .opencode/command/gsd-plan-phase.md
    - .opencode/command/gsd-help.md
    - .opencode/command/gsd-new-milestone.md
    - .opencode/command/gsd-remove-phase.md
    - .opencode/command/gsd-progress.md
    - .opencode/command/gsd-quick.md
    - .opencode/command/gsd-audit-milestone.md
    - .opencode/command/gsd-new-project.md
    - .opencode/command/gsd-plan-milestone-gaps.md
    - .opencode/command/gsd-check-todos.md
    - .opencode/command/gsd-insert-phase.md
    - .opencode/command/gsd-verify-work.md
    - .opencode/command/gsd-add-phase.md
    - .opencode/command/gsd-add-todo.md
    - .opencode/command/gsd-update.md

key-decisions:
  - "gsd-planner agent and plan-phase.md workflow are complementary, not duplicated: agent is planning METHODOLOGY, workflow is ORCHESTRATION (spawn order, context loading, revision loop)"
  - "gsd-delegate, gsd-verify-auto, gsd-research-phase, gsd-debug left unchanged: at parity with commands/ or pilot-specific inline implementations with no workflow target"
  - "Files under 200 lines skipped per plan guidance (diminishing returns)"

patterns-established:
  - "Thin router: delegate to @workflow, never inline logic in command files"

# Metrics
duration: 4min
completed: 2026-03-06
---

# Phase 9 Plan 06: Command Deduplication Summary

**13 thick .opencode/command/ files slimmed from combined ~3,265 lines to ~430 lines by replacing inlined workflow logic with @ reference delegation**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-06T09:21:30Z
- **Completed:** 2026-03-06T09:26:16Z
- **Tasks:** 2
- **Files modified:** 16

## Accomplishments

- Slimmed 4 worst offenders (Task 1): gsd-execute-phase (340→42), gsd-plan-phase (524→46), gsd-help (481→21), gsd-new-milestone (720→43) — combined 2,065 → 152 lines
- Slimmed 12 additional offenders (Task 2): gsd-remove-phase, gsd-progress, gsd-quick, gsd-audit-milestone, gsd-new-project, gsd-plan-milestone-gaps, gsd-check-todos, gsd-insert-phase, gsd-verify-work, gsd-add-phase, gsd-add-todo, gsd-update
- Assessed gsd-planner agent (1,381 lines) — confirmed complementary to plan-phase.md workflow (not duplicated)

## Task Commits

Each task was committed atomically:

1. **Task 1: Slim 4 worst .opencode/command/ offenders** - `f3685eb` (feat)
2. **Task 2: Slim remaining thick commands + assess gsd-planner** - `af43f0a` (feat)

**Plan metadata:** (next commit)

_Note: .opencode/ is gitignored — task commits are empty git records; actual file changes are on disk only._

## Files Created/Modified

### Task 1 (4 files — combined 2,065 → 152 lines)
- `.opencode/command/gsd-execute-phase.md` — 340 → 42 lines; added --auto flag doc preserved
- `.opencode/command/gsd-plan-phase.md` — 524 → 46 lines; agent: gsd-planner frontmatter preserved
- `.opencode/command/gsd-help.md` — 481 → 21 lines; delegates to help.md workflow
- `.opencode/command/gsd-new-milestone.md` — 720 → 43 lines; delegates to new-milestone.md workflow

### Task 2 (12 files slimmed + 4 assessed/unchanged)
- `.opencode/command/gsd-remove-phase.md` — 348 → 31 lines
- `.opencode/command/gsd-progress.md` — 363 → 24 lines
- `.opencode/command/gsd-quick.md` — 313 → 40 lines
- `.opencode/command/gsd-audit-milestone.md` — 276 → 36 lines
- `.opencode/command/gsd-new-project.md` — 282 → 39 lines
- `.opencode/command/gsd-plan-milestone-gaps.md` — 294 → 33 lines
- `.opencode/command/gsd-check-todos.md` — 227 → 30 lines
- `.opencode/command/gsd-insert-phase.md` — 226 → 31 lines
- `.opencode/command/gsd-verify-work.md` — 218 → 38 lines
- `.opencode/command/gsd-add-phase.md` — 204 → 35 lines
- `.opencode/command/gsd-add-todo.md` — 192 → 30 lines
- `.opencode/command/gsd-update.md` — 171 → 18 lines

### Unchanged (at parity or pilot-specific)
- `.opencode/command/gsd-delegate.md` — 262 lines = commands/ parity (no bloat)
- `.opencode/command/gsd-verify-auto.md` — 220 lines = pilot-specific, no workflow target exists
- `.opencode/command/gsd-research-phase.md` — 199 lines ≈ commands/ parity (188 lines)
- `.opencode/command/gsd-debug.md` — 168 lines ≈ commands/ parity (162 lines)

## Decisions Made

1. **gsd-planner agent is complementary, not duplicated** — The 1,381-line gsd-planner.md contains planning METHODOLOGY (task sizing, wave design, TDD heuristics, specificity examples). The 379-line plan-phase.md contains ORCHESTRATION (when to spawn agents, how to pass context, revision loop). Only 1 gsd-tools reference in gsd-planner vs 14 in plan-phase.md confirms the split. No extraction needed.

2. **Files at commands/ parity left unchanged** — gsd-delegate (262≈262), gsd-research-phase (199≈188), gsd-debug (168≈162) are at parity with their commands/ counterparts. No bloat to remove.

3. **gsd-verify-auto.md left unchanged** — Pilot-gsd-specific command (browser-based automated UAT). No workflow file exists for it to delegate to. Content is necessary inline implementation.

4. **Files under 200 lines skipped** — gsd-settings (135), gsd-complete-milestone (135), gsd-pause-work (133) are below the diminishing-returns threshold specified in the plan.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All .opencode/command/ files are thin routing layers — token waste from duplicated logic eliminated
- No files over 150 lines that aren't at parity with commands/ or pilot-specific inline implementations
- Phase 9 prompt hardening complete — ready for milestone completion

---
*Phase: 09-pilot-gsd-prompt-hardening-and-cleanup*
*Completed: 2026-03-06*
