---
phase: 02-command-frontmatter-migration
plan: "02"
subsystem: commands
tags: [frontmatter, yaml, opencode, askuserquestion-removal, command-config]

# Dependency graph
requires:
  - phase: 01-agent-frontmatter-migration
    provides: "Established frontmatter migration pattern (remove name:, YAML object tools:)"
  - phase: 02-command-frontmatter-migration
    provides: "Plan 01 migrated 16 non-AskUserQuestion commands"
provides:
  - "All 14 AskUserQuestion command files in opencode-native frontmatter format"
  - "AskUserQuestion removed from all command tool lists"
  - "debug.md body text updated with autonomous selection (CMD-06)"
  - "reapply-patches.md converted from inline to YAML object tools format"
  - "Updated path references (./.opencode/) and slash command syntax (/gsd-)"
affects:
  - "03-global-search-replace-templates"
  - "04-workflow-interactivity-stripping"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Command frontmatter format: description, argument-hint, tools (YAML object) — no name: or allowed-tools:"
    - "AskUserQuestion removed from all tool lists (autonomous pipeline requirement)"

key-files:
  created: []
  modified:
    - "commands/gsd/add-todo.md"
    - "commands/gsd/check-todos.md"
    - "commands/gsd/debug.md"
    - "commands/gsd/discuss-phase.md"
    - "commands/gsd/execute-phase.md"
    - "commands/gsd/health.md"
    - "commands/gsd/new-milestone.md"
    - "commands/gsd/new-project.md"
    - "commands/gsd/plan-milestone-gaps.md"
    - "commands/gsd/quick.md"
    - "commands/gsd/reapply-patches.md"
    - "commands/gsd/resume-work.md"
    - "commands/gsd/settings.md"
    - "commands/gsd/update.md"

key-decisions:
  - "No deviations from plan required — all changes were mechanical as specified"

patterns-established:
  - "AskUserQuestion removal pattern: simply omit from tools object (no replacement needed)"
  - "Inline tools format (reapply-patches) converted to multi-line YAML object"
  - "Body text AskUserQuestion instructions replaced with autonomous behavior descriptions"

# Metrics
duration: 4min
completed: 2026-02-20
---

# Phase 2 Plan 02: AskUserQuestion Command Migration Summary

**Removed AskUserQuestion from all 14 command tool lists, converted to opencode-native frontmatter, fixed debug.md body text with autonomous selection**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-20T15:17:10Z
- **Completed:** 2026-02-20T15:21:09Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments
- All 14 AskUserQuestion-containing command files converted to opencode-native frontmatter
- AskUserQuestion removed from every command tool list (critical for zero-interactivity)
- debug.md body text updated: "Use AskUserQuestion for each:" replaced with autonomous selection instruction (CMD-06)
- reapply-patches.md converted from inline `allowed-tools:` string to multi-line YAML object
- All `/gsd:` and `~/.claude/` references replaced in the 14 files

## Task Commits

Each task was committed atomically:

1. **Task 1: Migrate 7 commands (add-todo through new-milestone)** - `c28eb70` (feat)
2. **Task 2: Migrate 7 commands (new-project through update)** - `23ebb33` (feat)

## Files Created/Modified
- `commands/gsd/add-todo.md` - tools: read/write/bash (AskUserQuestion removed)
- `commands/gsd/check-todos.md` - tools: read/write/bash (AskUserQuestion removed)
- `commands/gsd/debug.md` - tools: read/bash/task (AskUserQuestion removed + body text fix)
- `commands/gsd/discuss-phase.md` - tools: read/write/bash/glob/grep/task (AskUserQuestion removed)
- `commands/gsd/execute-phase.md` - tools: read/write/edit/glob/grep/bash/task/todowrite (AskUserQuestion removed)
- `commands/gsd/health.md` - tools: read/bash/write (AskUserQuestion removed)
- `commands/gsd/new-milestone.md` - tools: read/write/bash/task (AskUserQuestion removed)
- `commands/gsd/new-project.md` - tools: read/bash/write/task (AskUserQuestion removed)
- `commands/gsd/plan-milestone-gaps.md` - tools: read/write/bash/glob/grep (AskUserQuestion removed)
- `commands/gsd/quick.md` - tools: read/write/edit/glob/grep/bash/task (AskUserQuestion removed)
- `commands/gsd/reapply-patches.md` - tools: read/write/edit/bash/glob/grep (inline→YAML object, AskUserQuestion removed)
- `commands/gsd/resume-work.md` - tools: read/bash/write/slashcommand (AskUserQuestion removed)
- `commands/gsd/settings.md` - tools: read/write/bash (AskUserQuestion removed)
- `commands/gsd/update.md` - tools: bash (AskUserQuestion removed)

## Decisions Made
None - followed plan as specified. All changes were mechanical format conversions matching the requirements spec exactly.

## Deviations from Plan
None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 2 (Command Frontmatter Migration) now fully complete — both Plan 01 and Plan 02 done
- All 30 command files have opencode-native frontmatter
- No AskUserQuestion in any command tool list
- Ready for Phase 3 (Global Search-and-Replace + Templates)
- No blockers or concerns

---
*Phase: 02-command-frontmatter-migration*
*Completed: 2026-02-20*
