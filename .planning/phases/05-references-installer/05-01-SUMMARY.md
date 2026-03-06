---
phase: 05-references-installer
plan: 01
subsystem: docs
tags: [documentation, fork-notes, references, installer]

# Dependency graph
requires:
  - phase: 01-agent-frontmatter
    provides: Agent frontmatter with model: field (context for model-profiles note)
  - phase: 04-workflow-interactivity
    provides: Auto-mode checkpoint handling (context for checkpoints note)
provides:
  - Fork-specific documentation notes in 3 reference files and installer
  - Clear guidance for users/agents on how this fork differs from upstream
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns: []

key-files:
  created: []
  modified:
    - get-shit-done/references/model-profiles.md
    - get-shit-done/references/checkpoints.md
    - get-shit-done/references/questioning.md
    - bin/install.js

key-decisions:
  - "Replaced upstream rule #5 in checkpoints.md rather than adding rule #6 (upstream already had a rule 5 about auto-mode)"

patterns-established: []

# Metrics
duration: 2min
completed: 2026-02-20
---

# Phase 5 Plan 1: References + Installer Documentation Summary

**Fork documentation notes added to 3 reference files (model-profiles, checkpoints, questioning) and installer comment in bin/install.js**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-20T18:57:58Z
- **Completed:** 2026-02-20T18:59:47Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- model-profiles.md documents that agent frontmatter `model:` field takes precedence over profile system
- checkpoints.md rule #5 documents that all checkpoints are auto-handled in autonomous mode
- questioning.md documents it is only used in interactive mode (discuss-phase)
- bin/install.js has pilot-gsd fork comment directing pilot users to `pilot setup`

## Task Commits

Each task was committed atomically:

1. **Task 1: Add fork notes to 3 reference files** - `3cd190c` (docs)
2. **Task 2: Add fork documentation comment to bin/install.js** - `1dee77b` (docs)

## Files Created/Modified
- `get-shit-done/references/model-profiles.md` - Blockquote about frontmatter model precedence
- `get-shit-done/references/checkpoints.md` - Rule #5 about auto-handled checkpoints
- `get-shit-done/references/questioning.md` - Blockquote about autonomous mode skip
- `bin/install.js` - Comment block after shebang about Pilot CLI install model

## Decisions Made
- Replaced upstream rule #5 in checkpoints.md with fork-specific version (upstream had "auto-mode bypasses..." rule, fork version is more explicit about human-action skipping)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- `.opencode/` directory is gitignored — edits were applied to both `.opencode/` (local install) and `get-shit-done/` (source, tracked by git). Only source files were committed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 5 complete — this was the only plan
- All 5 phases of the autonomy-fork-v1 milestone are now complete
- Ready for final verification / milestone completion

---
*Phase: 05-references-installer*
*Completed: 2026-02-20*
