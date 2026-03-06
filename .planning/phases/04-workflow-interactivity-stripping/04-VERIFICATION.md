---
phase: 04-workflow-interactivity-stripping
verified: 2026-02-20T22:30:00Z
status: passed
score: 16/16 must-haves verified
---

# Phase 4: Workflow Interactivity Stripping Verification Report

**Phase Goal:** All workflow AskUserQuestion calls are either removed or guarded with auto-mode bypasses
**Verified:** 2026-02-20
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | new-project.md Step 2a uses hardcoded config defaults instead of AskUserQuestion rounds | ✓ VERIFIED | Lines 82-106: Step 2a has "Use optimal defaults without asking. No questions — fully autonomous." with hardcoded JSON config (yolo mode, quick depth, auto_advance: true). No AskUserQuestion calls. |
| 2 | new-project.md Step 5 is skipped in auto mode | ✓ VERIFIED | Line 269: "**If auto mode:** Skip — config was collected in Step 2a. Proceed to Step 5.5." |
| 3 | new-project.md Steps 6-8 have auto-mode guards on all remaining AskUserQuestion calls | ✓ VERIFIED | Step 6 (line 427): "**If auto mode:** Default to 'Research first' without asking." Step 7 (lines 689-696): "**If auto mode:** Auto-include all table stakes... Skip per-category AskUserQuestion loops... Generate REQUIREMENTS.md and commit directly." Step 8 (line 903): "**If auto mode:** Skip approval gate — auto-approve and commit directly." |
| 4 | plan-phase.md Step 4 continues without context in auto mode instead of prompting | ✓ VERIFIED | Line 56: "**If `--auto` flag or `workflow.auto_advance` is true:** Continue without context (proceed to step 5). Log: `ℹ No CONTEXT.md — planning from research + requirements only.`" AskUserQuestion only fires in "Otherwise (interactive mode):" block (line 58). |
| 5 | plan-phase.md Step 6 replans from scratch in auto mode instead of offering options | ✓ VERIFIED | Line 140: "**If exists AND auto mode (`--auto` or `workflow.auto_advance`):** Replan from scratch — delete existing plans in phase directory and continue to Step 7." Interactive mode only at line 142. |
| 6 | transition.md auto-advances on incomplete plans in yolo mode without prompting | ✓ VERIFIED | Lines 86-96: `<if mode="yolo" AND="workflow.auto_advance true">` block auto-marks phase complete, logs incomplete plans, proceeds to cleanup_handoff. Interactive/non-auto_advance block (lines 98-121) retains safety rail and AskUserQuestion. |
| 7 | quick.md exits with error on empty description in autonomous mode | ✓ VERIFIED | Line 20: "**If running autonomously (< /dev/null or no TTY):** Exit with error: `❌ Quick task requires a description. Usage: /gsd-quick <description>`" Interactive fallback with AskUserQuestion at lines 23-29. |
| 8 | execute-plan.md auto-bypasses previous issues check in auto mode | ✓ VERIFIED | Line 130: "**If auto mode:** Log warning and proceed anyway. Note in SUMMARY.md that previous issues were auto-bypassed." Interactive AskUserQuestion only at line 132. |
| 9 | add-todo.md auto-merges overlapping todos in auto mode | ✓ VERIFIED | Line 72: "**If auto mode:** Auto-merge overlapping todos and continue. Update the existing todo with the new context (equivalent to 'Replace') and proceed to create_file step." AskUserQuestion only at line 74 prefixed "**If interactive:**". |
| 10 | check-todos.md auto-selects first/highest priority in auto mode | ✓ VERIFIED | Line 66 (handle_selection): "**If auto mode:** Select first/highest priority todo and continue." Line 104 (offer_actions): "**If auto mode:** Select first/highest priority action — 'Work on it now' (move to done, start working) and continue." Both AskUserQuestion blocks only fire for interactive/no-roadmap-match paths. |
| 11 | cleanup.md auto-approves archive in auto mode | ✓ VERIFIED | Line 96: "**If auto mode:** Auto-approve archive and continue." AskUserQuestion only at line 98 prefixed "**If interactive:**". |
| 12 | complete-milestone.md auto-archives phases and squash merges in auto mode | ✓ VERIFIED | Line 96: `<if mode="yolo">` auto-approves milestone scope. Line 387: "**If auto mode:** Auto-approve — archive phases to milestones/ directory." Line 509: "**If auto mode:** Auto-select squash merge (recommended option)." All AskUserQuestion calls prefixed "**If interactive:**". |
| 13 | discovery-phase.md uses defaults in auto mode | ✓ VERIFIED | Line 218: "**If auto mode:** Use defaults and continue — proceed anyway with caveats. Log: `ℹ Discovery confidence LOW — proceeding with caveats in auto mode.`" AskUserQuestion only at line 220 prefixed "**If interactive:**". |
| 14 | new-milestone.md has auto-mode guards on all 4+ AskUserQuestion calls | ✓ VERIFIED | Step 2 (line 30): "**If auto mode:** Skip deep questioning..." Step 8 (line 91): "**If auto mode:** Default to 'Research first' without asking." Step 9 (line 216): "**If auto mode:** Auto-include all... Skip per-category AskUserQuestion loops. Skip gap identification." Line 218 scope: "**If interactive:**" prefix. Step 10 (line 331): "**If auto mode:** Auto-approve and commit directly." Line 333: "**If interactive:**" prefix. |
| 15 | execute-phase.md logs failure and continues with remaining plans in auto mode | ✓ VERIFIED | Line 421: "**If auto mode:** Log failure and continue with remaining plans in the wave." Line 422: "**If interactive:** Ask user how to proceed." |
| 16 | pause-work.md detects phase from STATE.md in auto mode | ✓ VERIFIED | Lines 20-21: "**If auto mode:** Detect current phase from STATE.md. If STATE.md has no active phase, exit with error: `❌ No active phase detected. Cannot pause.`" Interactive fallback: "Ask user which phase they're pausing work on." |

**Score:** 16/16 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `get-shit-done/workflows/new-project.md` | Auto-mode config defaults, auto-mode guards on Steps 5-8 | ✓ VERIFIED | 1039 lines, hardcoded config at Step 2a, all AskUserQuestion calls guarded |
| `get-shit-done/workflows/plan-phase.md` | Auto-mode guards on Steps 4 & 6 | ✓ VERIFIED | 431 lines, both steps have explicit auto-mode bypasses |
| `get-shit-done/workflows/transition.md` | Yolo auto-advance on incomplete plans | ✓ VERIFIED | 560 lines, `<if mode="yolo">` block at lines 86-96 |
| `get-shit-done/workflows/quick.md` | Error exit on autonomous empty description | ✓ VERIFIED | 456 lines, error exit at line 20 |
| `get-shit-done/workflows/execute-plan.md` | Auto-bypass previous issues | ✓ VERIFIED | 449 lines, auto mode guard at line 130 |
| `get-shit-done/workflows/add-todo.md` | Auto-merge in auto mode | ✓ VERIFIED | 159 lines, auto-merge at line 72 |
| `get-shit-done/workflows/check-todos.md` | Auto-select in auto mode | ✓ VERIFIED | 180 lines, auto-select at lines 66 and 104 |
| `get-shit-done/workflows/cleanup.md` | Auto-approve archive | ✓ VERIFIED | 154 lines, auto-approve at line 96 |
| `get-shit-done/workflows/complete-milestone.md` | Auto-archive and auto-squash-merge | ✓ VERIFIED | 704 lines, yolo block at 96, auto-archive at 387, auto-merge at 509 |
| `get-shit-done/workflows/discovery-phase.md` | Use defaults in auto mode | ✓ VERIFIED | 292 lines, auto defaults at line 218 |
| `get-shit-done/workflows/new-milestone.md` | Auto-mode guards on 4+ calls | ✓ VERIFIED | 392 lines, guards at lines 30, 91, 216, 331 |
| `get-shit-done/workflows/execute-phase.md` | Log failure and continue | ✓ VERIFIED | 432 lines, auto mode guard at line 421 |
| `get-shit-done/workflows/pause-work.md` | Detect from STATE.md | ✓ VERIFIED | 124 lines, STATE.md detection at line 20 |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| new-project.md auto mode | config.json creation | Hardcoded JSON at Step 2a | ✓ WIRED | Config created with yolo mode, auto_advance: true (lines 88-103) |
| plan-phase.md auto detect | config.json | `workflow.auto_advance` check | ✓ WIRED | Lines 56, 140 check `--auto` flag OR `workflow.auto_advance` |
| transition.md auto detect | config.json | `mode="yolo" AND workflow.auto_advance` | ✓ WIRED | Line 86: `<if mode="yolo" AND="workflow.auto_advance true">` |
| execute-phase.md auto detect | config.json | `auto mode` check | ✓ WIRED | Line 421 checks auto mode; line 184 reads `workflow.auto_advance` |
| quick.md autonomous detect | TTY detection | `< /dev/null or no TTY` | ✓ WIRED | Line 20 detects autonomous via TTY absence |

### Requirements Coverage

All 16 WFLOW requirements (WFLOW-01 through WFLOW-16) mapped to this phase are addressed by the auto-mode guards verified above. Each workflow file containing AskUserQuestion now has either:
- Explicit `**If auto mode:**` guard before the call
- Explicit `**If interactive:**` prefix on the AskUserQuestion
- Structural skip (auto mode directive skips entire section containing the call)

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| new-milestone.md | 225 | "Identify gaps via AskUserQuestion:" not explicitly prefixed with "If interactive:" | ℹ️ Info | Implicitly guarded by line 216 "Skip gap identification" auto-mode directive; auto mode would never reach this line. Minor readability concern only. |
| new-project.md | 429 | "Use AskUserQuestion:" at Step 6 research follows auto-mode guard at line 427 but isn't explicitly prefixed "If interactive:" | ℹ️ Info | Structurally safe: line 427 auto-mode guard causes default selection before this line is reached. |

No blocker or warning-level anti-patterns found.

### Unguarded AskUserQuestion Audit

Comprehensive grep shows all remaining AskUserQuestion calls in workflow files:

| File | Guarded? | How |
|------|----------|-----|
| add-todo.md:74 | ✓ | Prefixed "**If interactive:**" (auto-merge at line 72) |
| check-todos.md:108 | ✓ | Preceded by "**If auto mode:**" at line 104 |
| check-todos.md:119 | ✓ | Same auto-mode guard covers both AskUserQuestion blocks |
| cleanup.md:98 | ✓ | Prefixed "**If interactive:**" (auto-approve at line 96) |
| complete-milestone.md:389 | ✓ | Prefixed "**If interactive:**" (auto-approve at line 387) |
| complete-milestone.md:511 | ✓ | Prefixed "**If interactive:**" (auto-select at line 509) |
| discovery-phase.md:220 | ✓ | Prefixed "**If interactive:**" (auto defaults at line 218) |
| discuss-phase.md:138,154,206,258 | ✓ | discuss-phase.md is interactive by design (not in autonomous pipeline) |
| execute-plan.md:132 | ✓ | Prefixed "**If interactive:**" (auto-bypass at line 130) |
| new-milestone.md:35 | ✓ | Inside "**If interactive:**" block (auto-mode at line 30) |
| new-milestone.md:93 | ✓ | Prefixed "**If interactive:**" (auto default at line 91) |
| new-milestone.md:216-225 | ✓ | Auto mode skips entire loop (line 216); AskUserQuestion at 218 prefixed "**If interactive:**" |
| new-milestone.md:333 | ✓ | Prefixed "**If interactive:**" (auto-approve at line 331) |
| new-project.md:67 | ✓ | Inside Step 2 Brownfield Offer (auto mode skips at line 63) |
| new-project.md:139,147,169 | ✓ | Inside Step 3 Deep Questioning (auto mode skips at line 127) |
| new-project.md:274 | ✓ | Inside Step 5 (auto mode skips at line 269) |
| new-project.md:429 | ✓ | Step 6 (auto-mode default at line 427) |
| new-project.md:693,734,752 | ✓ | Inside Step 7 (auto mode skips loops at line 689) |
| new-project.md:907 | ✓ | Step 8 (auto-mode auto-approve at line 903) |
| plan-phase.md:59 | ✓ | Inside "Otherwise (interactive mode):" block (auto at line 56) |
| quick.md:24 | ✓ | Inside "**If interactive:**" block (error exit at line 20) |
| settings.md:38,41,130 | ✓ | Prefixed "**If interactive:**" |
| update.md:138 | ✓ | Prefixed "**If interactive:**" |
| verify-work.md:193 | ✓ | Not AskUserQuestion — says "Wait for user response (plain text, no AskUserQuestion)" |

**Result: 0 unguarded AskUserQuestion calls in autonomous code paths.**

### Human Verification Required

None — all checks pass through code-level verification. This phase involves only markdown workflow file modifications (no runtime code), so browser verification is not applicable.

### Gaps Summary

No gaps found. All 16 must-haves verified. Every workflow file containing AskUserQuestion has proper auto-mode guards. The phase goal — "All workflow AskUserQuestion calls are either removed or guarded with auto-mode bypasses" — is fully achieved.

---

_Verified: 2026-02-20T22:30:00Z_
_Verifier: Claude (gsd-verifier)_
