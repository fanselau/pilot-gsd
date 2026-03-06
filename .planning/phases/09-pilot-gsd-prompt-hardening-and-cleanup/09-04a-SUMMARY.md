---
phase: 09-prompt-hardening
plan: 04a
subsystem: prompts
tags: [negative-instructions, positive-framing, commands, prompt-hardening]

# Dependency graph
requires:
  - phase: 09-02-root-agents-negative-instructions
    provides: negative instruction rewrite pattern established for root-level files
  - phase: 09-03-opencode-agents-negative-instructions
    provides: negative instruction rewrite pattern applied to .opencode/agents/
provides:
  - All 11 in-scope command files use positive instruction framing
  - commands/ (3 files) fully rewritten
  - .opencode/command/ (8 files) fully rewritten
affects: [any future prompt hardening, executor quality]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "anti_patterns sections renamed to constraints with positively-framed rules"
    - "Non-instruction negative words preserved (code blocks, YAML examples, rhetorical questions, descriptive rationale)"

key-files:
  created: []
  modified:
    - commands/gsd-delegate.md
    - commands/gsd-discuss-phase.md
    - commands/gsd-research-phase.md
    - .opencode/command/gsd-discuss-phase.md (disk-only)
    - .opencode/command/gsd-new-milestone.md (disk-only)
    - .opencode/command/gsd-new-project.md (disk-only)
    - .opencode/command/gsd-plan-milestone-gaps.md (disk-only, no changes needed)
    - .opencode/command/gsd-remove-phase.md (disk-only)
    - .opencode/command/gsd-verify-auto.md (disk-only)
    - .opencode/command/gsd-research-phase.md (disk-only)
    - .opencode/command/gsd-verify-work.md (disk-only)

key-decisions:
  - "Non-instruction negative words preserved: YAML reason: fields, rhetorical example questions, rationale text, backtick-quoted section names"
  - "anti_patterns sections renamed to constraints across verify-auto, verify-work, and remove-phase"
  - ".opencode/command/ edits committed as disk-only (gitignored) with empty marker commits"

# Metrics
duration: 4min
completed: 2026-03-06
---

# Phase 9 Plan 04a: Command File Negative-to-Positive Rewrite Summary

**Converted all behavioral negative instructions to positive framing across 11 command files in `commands/` and `.opencode/command/`, with frontmatter untouched**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-06T09:03:15Z
- **Completed:** 2026-03-06T09:08:11Z
- **Tasks:** 2 completed
- **Files modified:** 11 (3 tracked in git, 8 disk-only in gitignored .opencode/)

## Accomplishments

- Rewrote all behavioral negative instructions in 11 command files to positive framing
- `anti_patterns` sections renamed to `constraints` in gsd-verify-auto, gsd-verify-work, gsd-remove-phase
- Preserved non-instruction negative words (YAML code examples, rationale text, rhetorical questions, backtick-quoted section names)
- Frontmatter (description, argument-hint, tools) untouched across all files

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite commands/ and light .opencode/command/ files** - `3374036` (fix)
2. **Task 2: Rewrite heavy .opencode/command/ files** - `dd91daa` (fix, disk-only marker commit)

**Plan metadata:** `6a38f7d` (docs: complete plan)

## Files Created/Modified

### Tracked in git (`commands/`)
- `commands/gsd-delegate.md` — "You never output it" → "Omit it — runner adds it"
- `commands/gsd-discuss-phase.md` — "don't lose/act" → "record for later / keep out of scope"; "Do NOT ask about" → "Claude handles these"
- `commands/gsd-research-phase.md` — "do not inline" → "pass to agent / keep lean"; "NEVER build" → "always use library instead"

### Disk-only (gitignored `.opencode/command/`)
- `gsd-discuss-phase.md` — same fixes as root version
- `gsd-new-milestone.md` — "DO NOT re-research" → "already confirmed — skip"; "don't include" → "skip"
- `gsd-new-project.md` — "Do NOT ask/use/wait" → positive framing; "do not continue" → "stop here — interactive flow below is for non-auto mode"
- `gsd-plan-milestone-gaps.md` — no behavioral instructions found (YAML example only)
- `gsd-remove-phase.md` — "Do NOT add" → "Keep out of STATE.md"; anti_patterns → constraints (6 items)
- `gsd-verify-auto.md` — "Do NOT delegate/check" → positive; "Don't complete payment" → "Stop at payment initiation"; anti_patterns → constraints (6 items)
- `gsd-research-phase.md` — "NEVER build" → "always use library instead"
- `gsd-verify-work.md` — anti_patterns → constraints (5 items); "never asked" → "infer, not asked"

## Decisions Made

- **Non-instruction preservation:** Negative words in YAML `reason:` fields, rhetorical example questions ("What do I not know that I don't know?"), rationale text ("to avoid conflicts"), and backtick-quoted section names (`` `## Don't Hand-Roll` ``) are not behavioral instructions — preserved unchanged
- **anti_patterns → constraints:** Three files had `<anti_patterns>` sections; renamed to `<constraints>` with positively-framed rules (consistent with 09-02 pattern established in agent files)
- **Empty marker commits for gitignored files:** `.opencode/command/` is gitignored; Task 2 committed as empty commit with full description of disk changes

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 11 command files in this batch now use positive framing
- Pattern consistent with 09-02 (root agents) and 09-03 (.opencode/agents/) work
- Phase 9 prompt hardening cleanup complete for negative instructions across commands/

---
*Phase: 09-prompt-hardening*
*Completed: 2026-03-06*
