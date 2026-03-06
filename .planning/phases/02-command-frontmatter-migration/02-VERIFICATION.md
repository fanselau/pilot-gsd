---
phase: 02-command-frontmatter-migration
verified: 2026-02-20T15:30:00Z
status: passed
score: 7/7 must-haves verified
---

# Phase 2: Command Frontmatter Migration — Verification Report

**Phase Goal:** All 30 command files use opencode-native frontmatter format with AskUserQuestion removed
**Verified:** 2026-02-20
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All command files have no `name:` field | ✓ VERIFIED | Scanned all 30 .md files in `commands/gsd/` — zero `name:` fields found in any frontmatter |
| 2 | All command files have `tools:` as YAML object (not `allowed-tools:` list) | ✓ VERIFIED | Python YAML parser confirmed all 30 files have valid frontmatter; 27 files have `tools:` as dict, 3 files (cleanup.md, help.md, join-discord.md) have no tools section (correct — they don't need tools) |
| 3 | No command file includes `AskUserQuestion` in its tools | ✓ VERIFIED | `grep -rn 'AskUserQuestion' commands/gsd/ --include='*.md'` returns 0 results — removed from all 14 files that previously had it |
| 4 | No `@~/.claude/` references remain in command files | ✓ VERIFIED | `grep -rn '~/.claude/' commands/gsd/ --include='*.md'` returns 0 results; all 30 files use `./.opencode/` path prefix |
| 5 | No `/gsd:` references remain in command body text | ✓ VERIFIED | `grep -rn '/gsd:' commands/gsd/ --include='*.md'` returns 0 results; all slash commands use `/gsd-` hyphen syntax |
| 6 | debug.md body text has autonomous selection replacing AskUserQuestion instruction | ✓ VERIFIED | Line 51 reads: "For each issue, automatically select the most likely root cause and proceed with investigation." — matches required replacement text |
| 7 | Command files parse correctly (valid YAML frontmatter) | ✓ VERIFIED | Python `yaml.safe_load()` successfully parsed all 30 files; all have `description:` field; tools sections are proper dicts |

**Score:** 7/7 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `commands/gsd/*.md` (30 files) | opencode-native frontmatter | ✓ VERIFIED | All 30 files exist, have valid YAML frontmatter, no `name:` field, `tools:` as object format |
| `commands/gsd/debug.md` | Autonomous body text | ✓ VERIFIED | Line 51 has autonomous selection text, no AskUserQuestion in body |
| 14 AskUserQuestion files | AskUserQuestion removed from tools | ✓ VERIFIED | add-todo, check-todos, debug, discuss-phase, execute-phase, health, new-milestone, new-project, plan-milestone-gaps, quick, reapply-patches, resume-work, settings, update — all clean |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| Command frontmatter `tools:` | opencode tool system | YAML object format | ✓ WIRED | All tools use `key: true` format (read, write, edit, bash, grep, glob, task, todowrite, slashcommand, webfetch, websearch, mcp__context7__*) |
| Command `@` paths | workflow files | `./.opencode/` prefix | ✓ WIRED | All 30 files reference `./.opencode/get-shit-done/` paths; no old `~/.claude/` references |
| Slash command refs | opencode routing | `/gsd-` hyphen syntax | ✓ WIRED | All inter-command references use `/gsd-` format |

### Requirements Coverage

| Requirement | Status | Notes |
|-------------|--------|-------|
| CMD-01: Remove `name:` field from all commands | ✓ SATISFIED | Zero `name:` fields found |
| CMD-02: Convert `allowed-tools:` to `tools:` object | ✓ SATISFIED | All 27 files with tools use dict format |
| CMD-03: Remove AskUserQuestion from all tools | ✓ SATISFIED | Zero AskUserQuestion references in any file |
| CMD-04: Update path references | ✓ SATISFIED | All use `./.opencode/` |
| CMD-05: Update slash command syntax | ✓ SATISFIED | All use `/gsd-` format |
| CMD-06: debug.md body text change | ✓ SATISFIED | Autonomous selection text in place |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| — | — | — | — | No anti-patterns found |

No TODO, FIXME, placeholder, or stub patterns detected in command file frontmatter sections.

### Detailed File-by-File Verification

All 30 command files verified:

| File | No `name:` | `tools:` dict | No AskUser | `.opencode/` paths | `/gsd-` syntax | Valid YAML |
|------|-----------|---------------|------------|-------------------|----------------|------------|
| add-phase.md | ✓ | ✓ (3 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| add-todo.md | ✓ | ✓ (3 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| audit-milestone.md | ✓ | ✓ (6 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| check-todos.md | ✓ | ✓ (3 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| cleanup.md | ✓ | ✓ (no tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| complete-milestone.md | ✓ | ✓ (3 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| debug.md | ✓ | ✓ (3 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| discuss-phase.md | ✓ | ✓ (6 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| execute-phase.md | ✓ | ✓ (8 tools) | ✓ | ✓ (3 refs) | ✓ | ✓ |
| health.md | ✓ | ✓ (3 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| help.md | ✓ | ✓ (no tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| insert-phase.md | ✓ | ✓ (3 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| join-discord.md | ✓ | ✓ (no tools) | ✓ | ✓ (0 refs) | ✓ | ✓ |
| list-phase-assumptions.md | ✓ | ✓ (4 tools) | ✓ | ✓ (1 ref) | ✓ | ✓ |
| map-codebase.md | ✓ | ✓ (6 tools) | ✓ | ✓ (1 ref) | ✓ | ✓ |
| new-milestone.md | ✓ | ✓ (4 tools) | ✓ | ✓ (6 refs) | ✓ | ✓ |
| new-project.md | ✓ | ✓ (4 tools) | ✓ | ✓ (6 refs) | ✓ | ✓ |
| pause-work.md | ✓ | ✓ (3 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| plan-milestone-gaps.md | ✓ | ✓ (5 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| plan-phase.md | ✓ | ✓ (8 tools) | ✓ | ✓ (3 refs) | ✓ | ✓ |
| progress.md | ✓ | ✓ (5 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| quick.md | ✓ | ✓ (7 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| reapply-patches.md | ✓ | ✓ (6 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| remove-phase.md | ✓ | ✓ (4 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| research-phase.md | ✓ | ✓ (3 tools) | ✓ | ✓ (5 refs) | ✓ | ✓ |
| resume-work.md | ✓ | ✓ (4 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| set-profile.md | ✓ | ✓ (3 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| settings.md | ✓ | ✓ (3 tools) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| update.md | ✓ | ✓ (1 tool) | ✓ | ✓ (2 refs) | ✓ | ✓ |
| verify-work.md | ✓ | ✓ (7 tools) | ✓ | ✓ (3 refs) | ✓ | ✓ |

### Human Verification Required

None — all criteria are mechanically verifiable and have been verified through file content analysis.

---

_Verified: 2026-02-20_
_Verifier: Claude (gsd-verifier)_
