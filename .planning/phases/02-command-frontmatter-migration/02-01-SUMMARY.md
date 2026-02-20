---
phase: 02-command-frontmatter-migration
plan: "01"
subsystem: commands
tags: [frontmatter, yaml, opencode, command-config, tools-object]

# Dependency graph
requires:
  - phase: 01-agent-frontmatter-migration
    provides: "Established frontmatter migration pattern and body text replacement pattern"
provides:
  - "16 non-AskUserQuestion command files in opencode-native frontmatter format"
  - "tools: YAML object format replacing allowed-tools: list"
  - "Updated path references (./.opencode/) and slash command syntax (/gsd-)"
affects:
  - "02-command-frontmatter-migration (plan 02 — remaining 14 AskUserQuestion commands)"
  - "03-global-search-replace-templates"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "opencode command frontmatter format: description, argument-hint, tools (YAML object)"
    - "Tool name mapping: Read→read, Write→write, Bash→bash, Glob→glob, Grep→grep, Task→task, SlashCommand→slashcommand, WebFetch→webfetch, mcp__context7__*→mcp__context7__*"

key-files:
  created: []
  modified:
    - "commands/gsd/add-phase.md"
    - "commands/gsd/audit-milestone.md"
    - "commands/gsd/cleanup.md"
    - "commands/gsd/complete-milestone.md"
    - "commands/gsd/help.md"
    - "commands/gsd/insert-phase.md"
    - "commands/gsd/join-discord.md"
    - "commands/gsd/list-phase-assumptions.md"
    - "commands/gsd/map-codebase.md"
    - "commands/gsd/pause-work.md"
    - "commands/gsd/plan-phase.md"
    - "commands/gsd/progress.md"
    - "commands/gsd/remove-phase.md"
    - "commands/gsd/research-phase.md"
    - "commands/gsd/set-profile.md"
    - "commands/gsd/verify-work.md"

key-decisions:
  - "No deviations from plan required — all changes were mechanical as specified"

patterns-established:
  - "Command frontmatter migration: remove name:, remove type: prompt, remove agent:, convert allowed-tools: to tools: YAML object"
  - "Files with no allowed-tools: (cleanup, help, join-discord) get name: removal + path fixes only, no tools section added"

# Metrics
duration: 3min
completed: 2026-02-20
---

# Phase 2 Plan 01: Non-AskUserQuestion Command Migration Summary

**Migrated 16 command files to opencode-native frontmatter (tools: YAML object, no name: field) with all body text path/command references updated**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-20T15:16:20Z
- **Completed:** 2026-02-20T15:19:13Z
- **Tasks:** 2
- **Files modified:** 16

## Accomplishments
- All 16 non-AskUserQuestion command files converted from upstream GSD frontmatter to opencode-native format
- `name:` field removed from all 16 files (opencode derives name from filename)
- `allowed-tools:` lists converted to `tools:` YAML object format in 13 files (3 had no tools)
- `type: prompt` removed from complete-milestone.md
- `agent: gsd-planner` removed from plan-phase.md
- All `~/.claude/` path references replaced with `./.opencode/` (including gsd-tools.cjs paths in research-phase.md)
- All `/gsd:` slash command references replaced with `/gsd-` across body text

## Task Commits

Each task was committed atomically:

1. **Task 1: Migrate 8 command files (add-phase through list-phase-assumptions)** - `3c433e2` (feat)
2. **Task 2: Migrate 8 command files (map-codebase through verify-work)** - `1bdef37` (feat)

## Files Created/Modified
- `commands/gsd/add-phase.md` - tools: read/write/bash
- `commands/gsd/audit-milestone.md` - tools: read/glob/grep/bash/task/write
- `commands/gsd/cleanup.md` - No tools section (no allowed-tools in original)
- `commands/gsd/complete-milestone.md` - tools: read/write/bash; removed type: prompt
- `commands/gsd/help.md` - No tools section (no allowed-tools in original)
- `commands/gsd/insert-phase.md` - tools: read/write/bash
- `commands/gsd/join-discord.md` - No tools section (no allowed-tools in original)
- `commands/gsd/list-phase-assumptions.md` - tools: read/bash/grep/glob
- `commands/gsd/map-codebase.md` - tools: read/bash/glob/grep/write/task
- `commands/gsd/pause-work.md` - tools: read/write/bash
- `commands/gsd/plan-phase.md` - tools: read/write/bash/glob/grep/task/webfetch/mcp__context7__*; removed agent: field
- `commands/gsd/progress.md` - tools: read/bash/grep/glob/slashcommand
- `commands/gsd/remove-phase.md` - tools: read/write/bash/glob
- `commands/gsd/research-phase.md` - tools: read/bash/task; all gsd-tools.cjs and agent paths updated
- `commands/gsd/set-profile.md` - tools: read/write/bash
- `commands/gsd/verify-work.md` - tools: read/bash/glob/grep/edit/write/task

## Decisions Made
None - followed plan as specified. All changes were mechanical format conversions matching the requirements spec exactly.

## Deviations from Plan
None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Ready for 02-02-PLAN.md (14 AskUserQuestion command files)
- Phase 3 (Global Search-and-Replace) will handle any remaining `~/.claude/` or `/gsd:` references in non-command files
- No blockers or concerns

---
*Phase: 02-command-frontmatter-migration*
*Completed: 2026-02-20*
