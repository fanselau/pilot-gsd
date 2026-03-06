---
phase: 09-pilot-gsd-prompt-hardening-and-cleanup
verified: 2026-03-06T09:37:06Z
status: passed
score: 6/6 must-haves verified
re_verification: false
---

# Phase 9: Prompt Hardening & Cleanup — Verification Report

**Phase Goal:** Clean, portable, efficient prompts — zero broken references, zero dead files, all instructions use positive framing
**Verified:** 2026-03-06T09:37:06Z
**Status:** ✅ PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Zero hardcoded `/home/` paths in prompt files | ✓ VERIFIED | `grep -rn '/home/'` returned 0 results (excluding .git, .planning, node_modules, requirements) |
| 2 | All @ references resolve to existing files | ✓ VERIFIED | 46 unique real @ paths extracted; all `OK`; 4 regex-artifact "BROKEN" entries are backtick-trailing false positives from markdown inline code, not real references |
| 3 | Zero dead files remain in references/ and templates/ | ✓ VERIFIED | references/ = 10 files (exactly); templates/*.md = 12 files; templates/codebase/ = ABSENT |
| 4 | All behavioral instructions use positive framing (no "don't/never/do not/must not/avoid" as instructions) | ✓ VERIFIED | All remaining hits across all directories confirmed non-instruction contexts (see detail below) |
| 5 | Previously-broken workflow references now exist | ✓ VERIFIED | add-phase.md, plan-phase.md, new-milestone.md all exist in .opencode/get-shit-done/workflows/ |
| 6 | Command files are thin routing layers; frontmatter preserved | ✓ VERIFIED | All .opencode/command/ files under 270 lines (previously up to 720); gsd-plan-phase=46, gsd-execute-phase=42, gsd-help=21, gsd-new-milestone=43; frontmatter intact across all spot-checks |

**Score:** 6/6 truths verified

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `.opencode/get-shit-done/references/` | 10 files only (dead files deleted) | ✓ VERIFIED | Exactly 10: checkpoints, continuation-format, git-integration, model-profile-resolution, model-profiles, phase-argument-parsing, questioning, tdd, ui-brand, verification-patterns |
| `.opencode/get-shit-done/templates/*.md` | 12 .md files only | ✓ VERIFIED | Exactly 12: context, discovery, milestone-archive, milestone, project, requirements, roadmap, state, summary, UAT, user-setup, verification-report |
| `.opencode/get-shit-done/templates/codebase/` | Absent (7 dead files deleted) | ✓ VERIFIED | Directory does not exist |
| `.opencode/get-shit-done/workflows/add-phase.md` | Exists (was broken reference) | ✓ VERIFIED | File exists |
| `.opencode/get-shit-done/workflows/plan-phase.md` | Exists (was broken reference) | ✓ VERIFIED | File exists |
| `.opencode/get-shit-done/workflows/new-milestone.md` | Exists (was broken reference) | ✓ VERIFIED | File exists |
| `.opencode/get-shit-done/workflows/execute-plan.md` | Trimmed from 1,844 to ~800 lines | ✓ VERIFIED | 449 lines — exceeds target (better than required) |
| `commands/gsd-delegate.md` | Full rewrite with routing logic, JSON schema | ✓ VERIFIED | 262 lines; has proper Input/Output format, Decision Procedure, Arg Formatting Rules, complete JSON schema with reasoning + steps fields |
| `agents/*.md` (11 files) | Positive framing throughout | ✓ VERIFIED | All remaining grep hits confirmed non-instruction (see Truth 4 detail) |
| `.opencode/agents/*.md` (11 files) | Positive framing throughout | ✓ VERIFIED | All remaining grep hits confirmed non-instruction |
| `.opencode/command/*.md` | Thin routing layers | ✓ VERIFIED | All slim (21–262 lines vs. 720 previously) |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| All @ directives in agents/, commands/, .opencode/ | Referenced files | `@./` path resolution | ✓ WIRED | 46 unique paths extracted; all resolve; 4 backtick-suffix regex artifacts excluded |
| `.opencode/command/gsd-execute-phase.md` | `execute-phase.md` workflow | @ reference | ✓ WIRED | Confirmed thin router delegating to workflow |
| `.opencode/command/gsd-plan-phase.md` | `plan-phase.md` workflow | @ reference | ✓ WIRED | Confirmed thin router, 46 lines |
| `.opencode/command/gsd-help.md` | `help.md` workflow | @ reference | ✓ WIRED | 21 lines — thin router |
| `commands/gsd-delegate.md` | (inline logic, no workflow) | self-contained | ✓ WIRED | Correct — delegate is a pure reasoning command |

---

## Requirements Coverage

Requirements are in `requirements/prompt-hardening.md`. No formal IDs — coverage assessed by requirement:

| Requirement | Status | Notes |
|-------------|--------|-------|
| Fix `gsd-add-phase.md` → `add-phase.md` broken ref | ✓ SATISFIED | Workflow exists |
| Fix `gsd-plan-phase.md` → `plan-phase.md` broken ref | ✓ SATISFIED | Workflow exists |
| Fix `gsd-new-milestone.md` → `new-milestone.md` broken ref | ✓ SATISFIED | Workflow exists |
| Verify ALL @ references resolve | ✓ SATISFIED | 46 unique real refs, all OK |
| Replace all 18+ `/home/luca` hardcoded paths | ✓ SATISFIED | Zero `/home/` in any prompt file |
| Convert all negative instructions to positive framing | ✓ SATISFIED | All remaining hits are non-instruction contexts |
| Rewrite `commands/gsd-delegate.md` (4-step chain-of-thought, JSON schema, case ordering) | ✓ SATISFIED | Rewritten with proper Input/Output/Decision format; simple→complex case ordering (E→D→C→B→A); JSON schema with reasoning + steps; arg formatting rules table |
| Trim `execute-plan.md` (1,844 → ~800 lines) | ✓ SATISFIED (exceeded) | 449 lines — better than target |
| Remove dead files (~20K tokens) | ✓ SATISFIED | 22 files deleted (~4,669 lines); codebase/ dir removed |
| Deduplicate command ↔ workflow content | ✓ SATISFIED | All .opencode/command/ files slimmed; ~5,300 lines removed across 16 commands |

**Must Have requirements: 10/10 satisfied**

**Nice to Have requirements (not required):**
- `skills_hint` in PLAN.md frontmatter — **Not implemented** (nice to have, explicitly optional)
- Decompose gsd-planner agent — **Not implemented** (assessed: complementary to workflow, no duplication; documented in 09-06 summary)
- Flag interaction table in gsd-plan-phase.md — **Not implemented** (nice to have)
- `<guardrails>` section in gsd-execute-phase.md — **Not implemented** (nice to have)
- Token budget document — **Not implemented** (nice to have)

Nice-to-haves are explicitly out of scope for pass/fail determination.

---

## Anti-Patterns Found

### Negative-pattern hits that are confirmed NON-instructions:

| File | Count | Pattern Type | Verdict |
|------|-------|--------------|---------|
| `agents/gsd-debugger.md` | 12 | Pedagogical text: "I don't know why this fails" = teaching example, not instruction | ℹ️ Info — intentional |
| `.opencode/agents/gsd-debugger.md` | 12 | Same pedagogical content | ℹ️ Info — intentional |
| `agents/gsd-plan-checker.md` | 2 | Specification clauses: "Tasks exist but don't actually achieve..." | ℹ️ Info — descriptive |
| `.opencode/agents/gsd-plan-checker.md` | 2 | Same specification clauses | ℹ️ Info — descriptive |
| `agents/gsd-verifier.md` | 1 | Specification condition: "that don't appear in ANY plan's..." | ℹ️ Info — conditional |
| `agents/gsd-codebase-mapper.md` | 1 | Code comment in bash snippet: `# Note existence only, never read contents` | ℹ️ Info — code comment |
| `agents/gsd-integration-checker.md` | 1 | YAML example data: `reason: "Exported but never imported"` | ℹ️ Info — data value |
| `agents/gsd-planner.md` | 2 | Prose: "what to avoid and WHY" (column label); "avoid repeating" (descriptive) | ℹ️ Info — meta-reference |
| `.opencode/agents/gsd-executor.md` | 1 | Technical protocol: "STOP current task execution — avoid repeated retries" | ⚠️ Borderline — may be instruction |
| `.opencode/agents/gsd-planner.md` | 1 | Prose label: "what to avoid and WHY" | ℹ️ Info — meta-reference |
| `.opencode/agents/gsd-integration-checker.md` | 1 | YAML example data value | ℹ️ Info — data value |
| `commands/gsd-delegate.md` | 1 | Descriptive: "phase was added but never planned" | ℹ️ Info — factual state description |
| `commands/gsd-research-phase.md` | 1 | Rhetorical question: "What do I not know that I don't know?" | ℹ️ Info — rhetorical |
| `.opencode/command/gsd-research-phase.md` | 1 | Same rhetorical question | ℹ️ Info — rhetorical |
| `.opencode/get-shit-done/workflows/transition.md` | 2 | Specification clauses: "If counts don't match: incomplete"; "transitions don't use resume files" | ℹ️ Info — conditional/descriptive |
| `.opencode/get-shit-done/workflows/plan-phase.md` | 1 | Conditional: "null if files don't exist" | ℹ️ Info — factual |
| `.opencode/get-shit-done/workflows/plan-milestone-gaps.md` | 1 | YAML example data: `reason: "Dashboard API calls don't include auth header"` | ℹ️ Info — example data |
| `.opencode/get-shit-done/workflows/remove-phase.md` | 1 | Technical rationale: "in reverse order to avoid conflicts" | ℹ️ Info — descriptive rationale |
| Various templates | ~8 | Template placeholder text, code examples, pedagogical content | ℹ️ Info — not instructions |

**Borderline note:** `.opencode/agents/gsd-executor.md` line 304 (`"STOP current task execution — avoid repeated retries"`) is a borderline case. In context it reads: *"2. STOP current task execution — avoid repeated retries"*. This is a positive directive ("STOP") where "avoid" provides explanatory rationale, not a standalone prohibition. The behavioral instruction is the positive "STOP". Classified as non-blocker.

**No blockers found.** Zero genuine standalone negative behavioral instructions remain.

---

## Note on gsd-tools Binary Path

The prompt files (agents/, .opencode/agents/, workflows/) reference `.opencode/get-shit-done/bin/gsd-tools.cjs`. In this source repository, `.opencode/get-shit-done/bin/` does not exist (`.opencode/` is gitignored; the binary source is at `get-shit-done/bin/gsd-tools.cjs`). However, this is **correct by design**: when deployed to a user project via the installer, the full `get-shit-done/` tree (including `bin/`) is copied into the user's `.opencode/` directory. The path `.opencode/get-shit-done/bin/gsd-tools.cjs` is the correct runtime path for end-users. Phase 9 scope was portability (removing `/home/luca` hardcoded paths), not this path — which is already portable and correct.

---

## Human Verification Required

| Test | What to Do | Expected | Why Human |
|------|-----------|----------|-----------|
| gsd-delegate JSON validity | Run `gsd-delegate` with 2-3 test inputs (quick scope, phase with existing phases, milestone cold start) | Valid JSON with `reasoning` + `steps` fields; correct case routing | Cannot execute LLM reasoning in grep checks |
| Positive framing behavioral impact | Execute a phase using gsd-executor and observe if agent follows positive-framed instructions correctly | No confusion or instruction-backfire from remaining "don't" hits | Requires live agent execution |

---

## Summary

Phase 9 achieved its goal. All 6 observable truths verified against the codebase:

1. **Zero hardcoded paths**: `grep -rn '/home/'` returned 0 results across all prompt files
2. **Zero broken @ references**: 46 unique paths all resolve; 3 known template-variable patterns (`${PHASE}`, `{slug}`) are intentional design choices
3. **Dead files deleted**: references/ exactly 10 files, templates/ exactly 12 .md files, codebase/ directory absent, 22 dead files removed (~4,669 lines)
4. **Positive framing**: All ~40+ genuine negative behavioral instructions across agents/, .opencode/agents/, commands/, .opencode/command/, workflows/, references/, and templates/ rewritten to positive equivalents; remaining grep hits are pedagogical text, YAML data, code comments, or conditional clauses
5. **Previously broken workflow refs fixed**: add-phase.md, plan-phase.md, new-milestone.md all exist
6. **Command deduplication complete**: 16 thick .opencode/command/ files slimmed from ~5,300 lines to ~430 lines; execute-plan.md trimmed from 1,844 to 449 lines (exceeds ~800-line target)

The phase goal — *"Clean, portable, efficient prompts — zero broken references, zero dead files, all instructions use positive framing"* — is fully achieved.

---

_Verified: 2026-03-06T09:37:06Z_
_Verifier: Claude (gsd-verifier)_
