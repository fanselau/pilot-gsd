---
phase: 03-global-search-replace-templates
plan: 01
subsystem: infra
tags: [sed, search-replace, config, migration, paths]

# Dependency graph
requires:
  - phase: 01-agent-frontmatter
    provides: "Agent files already migrated to .opencode/ paths"
  - phase: 02-command-frontmatter
    provides: "Command files already migrated to .opencode/ paths"
provides:
  - "Zero .claude/ references remaining in repo (outside .git/.planning/requirements)"
  - "Zero /gsd: slash command references remaining"
  - "Autonomous-first config.json template (mode=yolo, all gates=false)"
affects: [all-phases]

# Tech tracking
tech-stack:
  added: []
  patterns: ["All path references use ./.opencode/ prefix", "Slash commands use /gsd- syntax"]

key-files:
  created: []
  modified:
    - get-shit-done/workflows/update.md
    - get-shit-done/templates/config.json
    - README.md
    - CHANGELOG.md

key-decisions:
  - "Extended sed to catch .claude/ references without ~/ prefix (update.md, README.md, CHANGELOG.md)"

patterns-established:
  - "Path convention: ./.opencode/ for all @ references and install paths"
  - "Config template: autonomous-first defaults (yolo mode, all gates off)"

# Metrics
duration: 2min
completed: 2026-03-03
---

# Phase 3 Plan 1: Global Search-Replace + Config Template Summary

**Replaced remaining .claude/ path references with .opencode/ across workflows/docs and set config template to autonomous defaults (yolo mode, all gates off)**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-03T11:05:19Z
- **Completed:** 2026-03-03T11:07:42Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Eliminated all `.claude/` path references from repo files (update.md, README.md, CHANGELOG.md)
- Confirmed `~/.claude/` and `/gsd:` patterns already had zero hits (prior phases handled them)
- Updated config.json template `workflow.research` from `false` to `true` per requirements spec
- All four verification checks pass: zero grep hits + config assertions valid

## Task Commits

Each task was committed atomically:

1. **Task 1: Global sed replacements** - `554ce9b` (chore)
2. **Task 2: Update config.json template** - `88daccf` (chore)

## Files Created/Modified
- `get-shit-done/workflows/update.md` - Replaced .claude/ install paths with .opencode/
- `README.md` - Updated .claude/ references to .opencode/ in install docs and troubleshooting
- `CHANGELOG.md` - Updated .claude/rules/ reference to .opencode/rules/
- `get-shit-done/templates/config.json` - Set workflow.research to true (was only remaining diff from requirements)

## Decisions Made
- Extended the replacement beyond `~/.claude/` to also catch `.claude/` (without `~/` prefix) since update.md, README.md, and CHANGELOG.md had references like `./.claude/` and `.claude/settings.json` that also needed migration

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Broader .claude/ pattern replacement needed**
- **Found during:** Task 1 (Global sed replacements)
- **Issue:** Plan's sed command targeted `~/.claude/` which already had 0 hits, but `.claude/` (without `~/` prefix) had 8 hits across 3 files
- **Fix:** Added additional sed pass for `\.claude/` → `.opencode/` to catch remaining references, then reverted false positive changes in agents/ and commands/ (where sed matched `anthropic/claude-` incorrectly)
- **Files modified:** CHANGELOG.md, README.md, get-shit-done/workflows/update.md
- **Verification:** grep confirms zero `.claude/` references remaining
- **Committed in:** 554ce9b (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug — broader pattern match needed)
**Impact on plan:** Essential for completeness — `.claude/` references without `~/` prefix would have remained.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 3 complete — all global replacements done and config template updated
- Ready for any remaining phases or milestone completion

---
*Phase: 03-global-search-replace-templates*
*Completed: 2026-03-03*
