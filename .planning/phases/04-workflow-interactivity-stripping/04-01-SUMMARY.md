---
phase: 04-workflow-interactivity-stripping
plan: 01
subsystem: workflows
tags: [AskUserQuestion, auto-mode, new-project, plan-phase, interactivity-stripping]

# Dependency graph
requires:
  - phase: 02-command-frontmatter-migration
    provides: Command frontmatter with AskUserQuestion removed from tools
provides:
  - Autonomous new-project.md workflow (hardcoded config, no interactive questions)
  - Autonomous plan-phase.md workflow (auto-mode guards on CONTEXT.md and existing plans)
affects: [04-02, 04-03, 05-references-installer]

# Tech tracking
tech-stack:
  added: []
  patterns: [auto-mode guard pattern before AskUserQuestion blocks]

key-files:
  created: []
  modified:
    - get-shit-done/workflows/new-project.md
    - get-shit-done/workflows/plan-phase.md

key-decisions:
  - "Steps 5-8 in new-project.md already had auto-mode guards — no changes needed (WFLOW-07, WFLOW-08 pre-satisfied)"
  - "Only Step 2a in new-project.md needed replacement (2 AskUserQuestion rounds → hardcoded defaults)"

patterns-established:
  - "Auto-mode guard pattern: check --auto flag or workflow.auto_advance before AskUserQuestion blocks"
  - "Hardcoded defaults for autonomous pipeline: yolo mode, quick depth, balanced model_profile"

# Metrics
duration: 2min
completed: 2026-02-20
---

# Phase 4 Plan 1: Critical Workflow Interactivity Stripping Summary

**Hardcoded autonomous defaults in new-project.md Step 2a; auto-mode guards for CONTEXT.md and existing plans in plan-phase.md**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-20T18:28:58Z
- **Completed:** 2026-02-20T18:31:14Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Replaced two interactive AskUserQuestion rounds (7 questions) in new-project.md Step 2a with hardcoded autonomous defaults
- Added auto-mode guard to plan-phase.md Step 4 (missing CONTEXT.md → continue without asking)
- Added auto-mode guard to plan-phase.md Step 6 (existing plans → replan from scratch without asking)
- Verified Steps 5-8 in new-project.md already had auto-mode guards (no changes needed)

## Task Commits

Each task was committed atomically:

1. **Task 1: Strip interactivity from new-project.md** - `f60cc4b` (feat)
2. **Task 2: Strip interactivity from plan-phase.md** - `2b054bd` (feat)

## Files Created/Modified
- `get-shit-done/workflows/new-project.md` - Replaced Step 2a AskUserQuestion rounds with hardcoded config defaults (yolo/quick/balanced)
- `get-shit-done/workflows/plan-phase.md` - Added auto-mode guards to Steps 4 (CONTEXT.md check) and 6 (existing plans check)

## Decisions Made
- Steps 5-8 in new-project.md already had auto-mode guards, so no changes were needed for WFLOW-07 and WFLOW-08 — only WFLOW-01 required editing
- The replacement in Step 2a follows the exact config structure from requirements spec Section 3a

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Ready for 04-02-PLAN.md (medium-priority workflows: transition.md, quick.md, execute-plan.md)
- Note: transition.md already has a pre-existing uncommitted change from a previous session (auto-mode guard for incomplete plans) — 04-02 should verify and incorporate this

---
*Phase: 04-workflow-interactivity-stripping*
*Completed: 2026-02-20*
