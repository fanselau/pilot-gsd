---
phase: quick
plan: 001
type: execute
wave: 1
depends_on: []
files_modified:
  - get-shit-done/workflows/plan-phase.md
  - commands/gsd-phase.md
autonomous: true
must_haves:
  truths:
    - "plan-phase --auto creates plans and exits WITHOUT spawning execute-phase"
    - "--auto flag still skips interactive prompts during planning"
    - "No Task() calls to execute-phase anywhere in plan-phase workflow"
    - "Completion message shows plans are ready for execution (doesn't claim auto-advance)"
  artifacts:
    - path: "get-shit-done/workflows/plan-phase.md"
      provides: "Plan-phase workflow without auto-advance"
      contains: "PHASE {X} PLANNED"
    - path: "commands/gsd-phase.md"
      provides: "Deprecated gsd-phase command"
      contains: "DEPRECATED"
  key_links:
    - from: "get-shit-done/workflows/plan-phase.md"
      to: "<offer_next>"
      via: "Step 13 routes to offer_next for both auto and interactive"
      pattern: "offer_next"
---

<objective>
Remove the auto-advance Task() from plan-phase.md that tries to spawn execute-phase, and deprecate the broken gsd-phase orchestrator command.

Purpose: plan-phase auto-advancing is broken (Task() subagents don't get command inlining) and redundant (pilot's runner handles lifecycle externally). Removing it prevents rogue subagent behavior and double-execution.
Output: Clean plan-phase workflow that ends after presenting results; deprecated gsd-phase command.
</objective>

<execution_context>
@./.opencode/get-shit-done/workflows/execute-plan.md
@./.opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@requirements/remove-plan-phase-auto-advance.md
@get-shit-done/workflows/plan-phase.md
@commands/gsd-phase.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Remove auto-advance from plan-phase.md</name>
  <files>get-shit-done/workflows/plan-phase.md</files>
  <action>
In `get-shit-done/workflows/plan-phase.md`:

1. **Replace Step 13** (line 323-325). Change from:
   ```
   ## 13. Present Final Status
   
   Route to `<offer_next>` OR `auto_advance` depending on flags/config.
   ```
   To:
   ```
   ## 13. Present Final Status
   
   Route to `<offer_next>` section below.
   ```

2. **Delete the entire "## 14. Auto-Advance Check" section** (lines 327-377). This includes:
   - The auto-advance trigger check
   - The Task() spawn of execute-phase
   - The handle execute-phase return block
   - The "If neither --auto nor config enabled" fallback
   
   Remove everything from `## 14. Auto-Advance Check` through the line `Route to <offer_next> (existing behavior).` (inclusive).

3. **The `<offer_next>` section** (lines 381-415) is ALREADY correct — it shows "PHASE {X} PLANNED" with a "Next: /gsd-execute-phase {X}" prompt. Keep it exactly as-is.

4. **Verify** the `</process>` closing tag (line 379) remains intact after the deletion — it should come right after Step 13, before `<offer_next>`.

Do NOT remove the `--auto` flag handling elsewhere (Step 4 context check, Step 6 existing plans check). Only remove the auto-advance to execute-phase.
  </action>
  <verify>
Run: `grep -n 'Auto-Advance\|auto_advance\|auto-advance\|Execute Phase.*Task\|gsd-execute-phase' get-shit-done/workflows/plan-phase.md`

Expected: No matches for "Auto-Advance", "auto_advance", or Task() spawning execute-phase. The only remaining "gsd-execute-phase" references should be in `<offer_next>` where it suggests the command to the user.

Also verify: `grep -n '## 14' get-shit-done/workflows/plan-phase.md` returns nothing (section removed).
  </verify>
  <done>
Step 13 routes directly to offer_next. Step 14 (auto-advance) is completely gone. --auto flag still works for skipping prompts in Steps 4 and 6. No Task() calls to execute-phase remain.
  </done>
</task>

<task type="auto">
  <name>Task 2: Add deprecation notice to gsd-phase.md</name>
  <files>commands/gsd-phase.md</files>
  <action>
In `commands/gsd-phase.md`, add a deprecation notice block immediately after the frontmatter closing `---` (line 11), before `<objective>`:

```markdown

> **DEPRECATED (pilot-gsd fork):** This single-session orchestrator is broken. Task() subagents
> don't get command inlining — `/gsd-add-phase`, `/gsd-plan-phase`, and `/gsd-execute-phase`
> are received as literal text, not executed as commands. The subagent goes rogue.
>
> **Use instead:** Pilot's runner handles the full lifecycle as separate sessions:
> `add-phase` → `plan-phase` → `execute-phase`
>
> This file is preserved for reference only. Do not invoke `/gsd-phase`.

```

Keep all existing content below the deprecation notice — do not delete anything else.
  </action>
  <verify>
Run: `head -20 commands/gsd-phase.md`

Expected: Frontmatter lines 1-11, then the deprecation blockquote starting with "> **DEPRECATED", then the existing `<objective>` tag.
  </verify>
  <done>
gsd-phase.md has clear deprecation notice explaining why it's broken and what to use instead. Existing content preserved for reference.
  </done>
</task>

</tasks>

<verification>
1. `grep -c 'Auto-Advance' get-shit-done/workflows/plan-phase.md` returns 0
2. `grep -c 'auto_advance' get-shit-done/workflows/plan-phase.md` returns 0 (not counting config reads in Step 4)
3. `grep 'Task(' get-shit-done/workflows/plan-phase.md` shows NO execute-phase Task() calls (only researcher, planner, and checker Task() calls remain)
4. `grep 'DEPRECATED' commands/gsd-phase.md` returns the deprecation notice
5. `grep -n '## 13' get-shit-done/workflows/plan-phase.md` exists
6. `grep -n '## 14' get-shit-done/workflows/plan-phase.md` does NOT exist
</verification>

<success_criteria>
- plan-phase.md workflow ends at Step 13 which routes to offer_next
- No auto-advance section (Step 14) exists
- No Task() spawn of execute-phase anywhere in plan-phase.md
- --auto flag still works for Steps 4 (no context prompt) and 6 (replan from scratch)
- gsd-phase.md has deprecation notice at top of body
- Both files are syntactically valid markdown
</success_criteria>

<output>
After completion, create `.planning/quick/001-requirements-remove-plan-phase-auto-adva/001-SUMMARY.md`
</output>
