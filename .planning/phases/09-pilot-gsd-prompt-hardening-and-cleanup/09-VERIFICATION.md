---
phase: 09-pilot-gsd-prompt-hardening-and-cleanup
verified: 2026-03-06T10:20:00Z
status: passed
score: 7/7 must-haves verified
resolution: Orchestrator fixed 3 surviving negative instructions (commit c49e0e6)
re_verification:
  previous_status: passed
  previous_score: 6/6
  gaps_closed: []
  gaps_remaining:
    - "commands/gsd-help.md contains genuine negative instruction 'Do NOT add:'"
    - ".opencode/command/gsd-help.md contains genuine negative instruction 'Do NOT add:'"
    - ".opencode/command/gsd-add-phase.md contains genuine negative instruction 'Never ask questions.'"
  regressions:
    - "Truth 4 (all instructions positive framing) — previous VERIFICATION classified all hits as non-instructions, but independent re-verification found 3 genuine surviving behavioral instructions in command files"
gaps:
  - truth: "All instructions use positive framing in commands/ directory"
    status: failed
    reason: "commands/gsd-help.md:7 contains 'Do NOT add:' — a genuine negative behavioral instruction telling Claude what NOT to do. File was not included in 09-04a scope (only gsd-delegate, gsd-discuss-phase, gsd-research-phase were listed) and pre-existed phase 9 with this pattern."
    artifacts:
      - path: "commands/gsd-help.md"
        issue: "Line 7: 'Do NOT add:' — negative instruction to Claude not in positive form"
    missing:
      - "Rewrite 'Do NOT add: [list]' to positive: 'Output only: reference content. Omit project analysis, git status, next-step suggestions, and commentary.'"

  - truth: "All instructions use positive framing in .opencode/command/ directory"
    status: failed
    reason: "Two .opencode/command/ files contain genuine negative behavioral instructions introduced by 09-06 slimming: gsd-help.md:7 mirrors commands/ version with 'Do NOT add:'; gsd-add-phase.md:19 has 'Never ask questions.' added by 09-06 OBJECTIVE section authoring."
    artifacts:
      - path: ".opencode/command/gsd-help.md"
        issue: "Line 7: 'Do NOT add:' — negative instruction created when 09-06 slimmed from 481 to 21 lines using commands/ version as template"
      - path: ".opencode/command/gsd-add-phase.md"
        issue: "Line 19: 'Never ask questions.' — negative instruction in OBJECTIVE section created by 09-06 slimming"
    missing:
      - "Rewrite .opencode/command/gsd-help.md line 7 to positive form"
      - "Rewrite .opencode/command/gsd-add-phase.md line 19: 'Never ask questions.' → 'Make autonomous decisions from arguments and roadmap context.'"
---

# Phase 9: Prompt Hardening & Cleanup — Verification Report

**Phase Goal:** Clean, portable, efficient prompts — zero broken references, zero dead files, all instructions use positive framing
**Verified:** 2026-03-06T10:20:00Z
**Status:** ⚠️ GAPS FOUND
**Re-verification:** Yes — independent re-verification after initial auto-verification claimed status: passed

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Zero hardcoded `/home/` paths in prompt files | ✓ VERIFIED | `grep -rn '/home/' agents/ commands/ .opencode/` returned 0 results |
| 2 | All @ references resolve to existing files | ✓ VERIFIED | 45 unique @ refs extracted and verified on disk — 0 broken |
| 3 | Zero dead files remain in references/ and templates/ | ✓ VERIFIED | references/ = 10 files exactly; templates/*.md = 12 files; codebase/ absent; config.json absent |
| 4 | All behavioral instructions use positive framing in agents/ and .opencode/agents/ | ✓ VERIFIED | All remaining hits in agent files are pedagogical text, YAML data values, code block comments, section name references, or conditional clauses — not behavioral instructions |
| 5 | All behavioral instructions use positive framing in commands/ | ✗ FAILED | `commands/gsd-help.md:7` contains genuine negative instruction `Do NOT add:` — not converted (not in 09-04a scope) |
| 6 | All behavioral instructions use positive framing in .opencode/command/ | ✗ FAILED | `.opencode/command/gsd-help.md:7` and `.opencode/command/gsd-add-phase.md:19` contain genuine negative instructions introduced by 09-06 slimming |
| 7 | .opencode/command/ files are thin routing layers; frontmatter preserved | ✓ VERIFIED | Primary targets: gsd-execute-phase=42, gsd-plan-phase=46, gsd-help=21, gsd-new-milestone=43; 16 files slimmed from ~5,300 combined to ~430 lines; files >80 lines have documented justification (at-parity or pilot-specific) |

**Score: 5/7 truths verified**

---

## Re-verification Note

The **initial VERIFICATION.md** (created at 09:37:06Z by the executing agent) claimed `status: passed` with `score: 6/6`. This independent re-verification **disagrees** on Truth 4/5/6 (positive framing completeness):

The initial verifier correctly identified most hits as non-instructions. However it missed 3 genuine surviving behavioral instructions in command files:
1. `commands/gsd-help.md:7` — "Do NOT add:" (pre-existing; not in 09-04a scope)
2. `.opencode/command/gsd-help.md:7` — "Do NOT add:" (introduced by 09-06)
3. `.opencode/command/gsd-add-phase.md:19` — "Never ask questions." (introduced by 09-06)

These are minor (3 lines total, no broken functionality), but they are genuine behavioral instructions that remain in negative framing contrary to the phase goal. The previous verifier's classification of these as "no blockers found — zero genuine standalone negative behavioral instructions remain" was incorrect for these 3 cases.

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `.opencode/get-shit-done/references/` | 10 files only (dead files deleted) | ✓ VERIFIED | Exactly 10: checkpoints, continuation-format, git-integration, model-profile-resolution, model-profiles, phase-argument-parsing, questioning, tdd, ui-brand, verification-patterns |
| `.opencode/get-shit-done/templates/*.md` | 12 .md files only | ✓ VERIFIED | Exactly 12: context, discovery, milestone-archive, milestone, project, requirements, roadmap, state, summary, UAT, user-setup, verification-report |
| `.opencode/get-shit-done/templates/codebase/` | Absent (7 dead files deleted) | ✓ VERIFIED | Directory does not exist |
| `.opencode/get-shit-done/workflows/add-phase.md` | Exists | ✓ VERIFIED | File exists |
| `.opencode/get-shit-done/workflows/plan-phase.md` | Exists | ✓ VERIFIED | File exists |
| `.opencode/get-shit-done/workflows/new-milestone.md` | Exists | ✓ VERIFIED | File exists |
| `agents/*.md` (11 files) | Positive framing throughout | ✓ VERIFIED | All remaining grep hits confirmed non-instruction (pedagogical, code blocks, section name refs) |
| `.opencode/agents/*.md` (11 files) | Positive framing throughout | ✓ VERIFIED | All remaining grep hits confirmed non-instruction |
| `commands/gsd-help.md` | Positive framing | ✗ FAILED | Line 7: `Do NOT add:` — genuine negative behavioral instruction survives |
| `.opencode/command/gsd-help.md` | Thin routing + positive framing | ✗ FAILED | Slimmed to 21 lines (✓) but line 7 `Do NOT add:` is genuine negative instruction (✗) |
| `.opencode/command/gsd-add-phase.md` | Thin routing + positive framing | ✗ FAILED | Slimmed to 35 lines (✓) but line 19 `Never ask questions.` is genuine negative instruction (✗) |
| `.opencode/command/gsd-execute-phase.md` | Under 80 lines, positive framing | ✓ VERIFIED | 42 lines; delegates to execute-phase.md workflow |
| `.opencode/command/gsd-plan-phase.md` | Under 80 lines, positive framing | ✓ VERIFIED | 46 lines; delegates to plan-phase.md workflow |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| All @ directives in agents/, commands/, .opencode/ | Referenced files | `@./` path resolution | ✓ WIRED | 45 unique paths extracted; all resolve on disk |
| `.opencode/command/gsd-execute-phase.md` | `execute-phase.md` workflow | @ reference | ✓ WIRED | Confirmed thin router, 42 lines, delegates to workflow |
| `.opencode/command/gsd-plan-phase.md` | `plan-phase.md` workflow | @ reference | ✓ WIRED | Confirmed thin router, 46 lines |
| `.opencode/command/gsd-help.md` | `help.md` workflow | @ reference | ✓ WIRED | 21 lines — thin router — but contains negative instruction |
| `commands/gsd-help.md` | behavioral intent | positive framing | ✗ BROKEN | `Do NOT add:` instruction survives unconverted |
| `.opencode/command/gsd-add-phase.md` | behavioral intent | positive framing | ✗ BROKEN | `Never ask questions.` instruction survives unconverted |

---

## Requirements Coverage

No formal IDs mapped to Phase 9 in REQUIREMENTS.md — coverage assessed against `requirements/prompt-hardening.md`.

| Requirement | Status | Notes |
|-------------|--------|-------|
| Verify ALL @ references resolve | ✓ SATISFIED | 45 unique real refs, 0 broken |
| Replace all `/home/luca` hardcoded paths | ✓ SATISFIED | Zero `/home/` in any prompt file |
| Convert all negative instructions to positive framing | ✗ PARTIAL | 3 genuine negative instructions survive in command files (see gaps) |
| Remove dead files (~20K tokens) | ✓ SATISFIED | 22 files deleted (~4,669 lines); codebase/ dir removed |
| Deduplicate command ↔ workflow content | ✓ SATISFIED | All .opencode/command/ primary targets slimmed; ~5,300 lines removed across 16 commands |
| All agents have valid frontmatter | ✓ SATISFIED | Spot-checked 5 agents — valid YAML frontmatter |

---

## Anti-Patterns Found

### Genuine surviving negative instructions (blockers for phase goal):

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `commands/gsd-help.md` | 7 | `Do NOT add:` | ⚠️ Minor | Behavioral instruction in negative framing — tells Claude what NOT to do instead of what TO do |
| `.opencode/command/gsd-help.md` | 7 | `Do NOT add:` | ⚠️ Minor | Introduced by 09-06 slimming; same pattern as commands/ version |
| `.opencode/command/gsd-add-phase.md` | 19 | `Never ask questions.` | ⚠️ Minor | Negative instruction added to OBJECTIVE section by 09-06 slimming |

### Confirmed non-instruction hits (not blockers):

| File | Count | Pattern Type | Verdict |
|------|-------|--------------|---------|
| `agents/gsd-debugger.md` + `.opencode/` copy | 12 each | Pedagogical: "I don't know why this fails" = teaching example, not instruction | ℹ️ Info |
| `agents/gsd-phase-researcher.md` + `.opencode/` copy | 5 each | Section name reference: "Don't Hand-Roll" is a named section heading, not instruction | ℹ️ Info |
| `agents/gsd-plan-checker.md` + `.opencode/` copy | 2 each | Descriptive criteria: "don't actually achieve the requirement" | ℹ️ Info |
| `agents/gsd-codebase-mapper.md` | 3 | 1 descriptive bullet; 2 in bash code block (`# DO NOT read`, `never read contents`) | ℹ️ Info |
| `agents/gsd-verifier.md` | 1 | Conditional clause: "don't appear in ANY plan's `requirements` field" | ℹ️ Info |
| `agents/gsd-integration-checker.md` + `.opencode/` copy | 1 each | YAML example data: `reason: "Exported but never imported"` | ℹ️ Info |
| `agents/gsd-planner.md` + `.opencode/` copy | 2 each | Prose label: "what to avoid and WHY"; "avoid repeating" (descriptive) | ℹ️ Info |
| `.opencode/agents/gsd-executor.md` | 1 | "STOP current task — avoid repeated retries": positive directive ("STOP") with rationale modifier | ℹ️ Borderline |
| `commands/gsd-delegate.md` | 1 | "never planned" — factual description of state | ℹ️ Info |
| `commands/gsd-research-phase.md` + `.opencode/` copy | 1 each | Rhetorical: "What do I not know that I don't know?" | ℹ️ Info |
| Workflow files | 4 | Conditional clauses, YAML data, technical rationale | ℹ️ Info |
| Template files | ~8 | Template placeholder text, project-domain examples, annotations | ℹ️ Info |
| `continuation-format.md` | 4 | `### Don't:` section heading labels in anti-pattern examples (not instructions) | ℹ️ Info |

---

## Gaps Summary

**3 genuine negative instructions survive** in command files — minor severity, no broken functionality, but contrary to the phase goal "all instructions use positive framing":

1. **`commands/gsd-help.md:7`** — `Do NOT add:` — pre-existing instruction not included in 09-04a scope
2. **`.opencode/command/gsd-help.md:7`** — `Do NOT add:` — introduced by 09-06 when slimming from 481 to 21 lines (copied from commands/ template)
3. **`.opencode/command/gsd-add-phase.md:19`** — `Never ask questions.` — introduced by 09-06 when writing the OBJECTIVE section

**Root cause:** Plan 09-04a listed only 11 specific command files for negative instruction conversion and did not include `gsd-help.md` (already thin). Plan 09-06 created new slimmed content that inadvertently replicated the pre-existing negative framing from commands/ and added a new `Never ask questions` instruction.

**What's verified (5/7 truths):**
- ✓ Zero broken @ references (45 checked, 0 broken)
- ✓ Zero dead files (10 refs, 12 templates, codebase/ gone)
- ✓ All agents use positive framing (agents/ and .opencode/agents/)
- ✓ .opencode/command/ slimmed to thin routing layers
- ✓ Zero /home/ hardcoded paths

**What has gaps (2/7 truths):**
- ✗ commands/ positive framing: `gsd-help.md:7` survives with `Do NOT add:`
- ✗ .opencode/command/ positive framing: `gsd-help.md:7` and `gsd-add-phase.md:19` survive

---

## Human Verification Required

None — all checks are mechanically verifiable.

---

*Verified: 2026-03-06T10:20:00Z*
*Verifier: Claude (gsd-verifier) — independent re-verification*
