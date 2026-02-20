---
status: complete
phase: 02-command-frontmatter-migration
source: 02-01-SUMMARY.md, 02-02-SUMMARY.md
started: 2026-02-20T16:00:00Z
updated: 2026-02-20T16:10:00Z
---

## Current Test

[testing complete]

## Test Methodology

> **Note:** pilot-gsd is a meta-prompting system (markdown agents, YAML frontmatter, JSON config) — not a web application. There are no web pages, routes, or UI components. Browser-based UAT via `agent-browser` is not applicable.
>
> Verification uses file-based validation: YAML frontmatter parsing, grep pattern matching, per-file tool inventory checks, and the existing Node.js test suite (81 tests).

## Tests

### 1. No `name:` Field in Any Command Frontmatter
expected: All 30 command files have `name:` field removed from YAML frontmatter (opencode derives name from filename)
result: pass
evidence: Scanned all 30 files in `commands/gsd/` — zero matches for `^name:` in frontmatter sections

### 2. No `allowed-tools:` in Any Command Frontmatter
expected: All 30 command files use `tools:` YAML object format, not `allowed-tools:` list
result: pass
evidence: Scanned all 30 files — zero matches for `^allowed-tools:` in frontmatter sections

### 3. AskUserQuestion Removed from All Command Tool Lists
expected: None of the 30 command files contain `AskUserQuestion` in their frontmatter tools section
result: pass
evidence: Scanned all 30 frontmatter sections — zero matches for `askuserquestion` (case-insensitive)

### 4. Tools Format is YAML Object (Not Comma-Separated String)
expected: All files with `tools:` use multi-line YAML object format (`tool: true`) not inline string
result: pass
evidence: Scanned all 30 files — zero matches for comma-separated tools pattern in frontmatter

### 5. Path References Updated (~/.claude/ → ./.opencode/)
expected: No `~/.claude/` references remain in any command file
result: pass
evidence: `grep -rn '~/.claude/' commands/gsd/*.md` returns 0 results; 29 files contain `.opencode/` references

### 6. Slash Command Syntax Updated (/gsd: → /gsd-)
expected: No `/gsd:` references remain in any command file body text
result: pass
evidence: `grep -rn '/gsd:' commands/gsd/*.md` returns 0 results; 9 files contain `/gsd-` references

### 7. debug.md Body Text Fix (CMD-06)
expected: Line ~53 "Use AskUserQuestion for each:" replaced with autonomous selection instruction
result: pass
evidence: Line 51 reads: `For each issue, automatically select the most likely root cause and proceed with investigation.` — old `AskUserQuestion` instruction confirmed absent

### 8. reapply-patches.md Inline→YAML Conversion
expected: Inline `allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion` converted to multi-line YAML object with AskUserQuestion removed
result: pass
evidence: Frontmatter shows `tools:` as YAML object with `read: true`, `write: true`, `edit: true`, `bash: true`, `glob: true`, `grep: true` — no AskUserQuestion, no inline format

### 9. YAML Frontmatter Parse Validation (All 30 Files)
expected: All 30 files have valid YAML frontmatter with required `description:` field, no forbidden fields (`name:`, `allowed-tools:`, `AskUserQuestion`)
result: pass
evidence: Node.js YAML parser validated all 30 files — 30 PASS, 0 FAIL

### 10. Per-File Tool Inventory Verification
expected: Each of the 30 command files has exactly the tools specified in the requirements doc (Plan 01: 16 files, Plan 02: 14 files)
result: pass
evidence: Node.js tool checker verified all 30 files against expected tool inventories — 30 PASS, 0 FAIL. Verified: 3 files have no tools (cleanup, help, join-discord), remaining 27 have correct tool sets

### 11. No `type:` Field in Any Command Frontmatter
expected: `type: prompt` removed from complete-milestone.md (and no `type:` in any other file)
result: pass
evidence: `grep -rn '^type:' commands/gsd/*.md` returns 0 results

### 12. No `agent:` Field in Any Command Frontmatter
expected: `agent: gsd-planner` removed from plan-phase.md (and no `agent:` in any other file)
result: pass
evidence: Scanned all 30 frontmatter sections — zero matches for `^agent:` field

### 13. Existing Test Suite Still Passes
expected: All gsd-tools unit tests pass (no regressions from frontmatter changes)
result: pass
evidence: `node --test get-shit-done/bin/gsd-tools.test.cjs` — 81 tests, 18 suites, 81 pass, 0 fail (4459ms)

### 14. Plan 01 File Coverage (16 Non-AskUserQuestion Commands)
expected: All 16 files listed in 02-01-SUMMARY.md were correctly migrated
result: pass
evidence: Verified all 16: add-phase, audit-milestone, cleanup, complete-milestone, help, insert-phase, join-discord, list-phase-assumptions, map-codebase, pause-work, plan-phase, progress, remove-phase, research-phase, set-profile, verify-work

### 15. Plan 02 File Coverage (14 AskUserQuestion Commands)
expected: All 14 files listed in 02-02-SUMMARY.md were correctly migrated with AskUserQuestion removed
result: pass
evidence: Verified all 14: add-todo, check-todos, debug, discuss-phase, execute-phase, health, new-milestone, new-project, plan-milestone-gaps, quick, reapply-patches, resume-work, settings, update

## Summary

total: 15
passed: 15
issues: 0
pending: 0
skipped: 0

## Gaps

(none)

---
*Phase: 02-command-frontmatter-migration*
*UAT completed: 2026-02-20*
