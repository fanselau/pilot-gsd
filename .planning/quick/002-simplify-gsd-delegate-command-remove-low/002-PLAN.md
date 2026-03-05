---
phase: quick-002
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - commands/gsd-delegate.md
autonomous: true

must_haves:
  truths:
    - "Delegation AI only knows about 4 commands: phase, quick, new-project, new-milestone"
    - "No reference to add-phase, plan-phase, execute-phase, or verify-phase exists in the file"
    - "Phase scope section clearly describes single-step phase command usage"
    - "Output JSON format is unchanged"
  artifacts:
    - path: "commands/gsd-delegate.md"
      provides: "Simplified delegation prompt with only high-level commands"
      contains: "phase.*quick.*new-project.*new-milestone"
  key_links:
    - from: "commands/gsd-delegate.md"
      to: "commands/gsd-phase.md"
      via: "phase command is the only lifecycle command exposed"
      pattern: "command.*phase"
---

<objective>
Remove low-level GSD commands (add-phase, plan-phase, execute-phase, verify-phase) from the gsd-delegate prompt so the delegation AI cannot output them.

Purpose: The prompt currently says "never use these commands" but lists them with full usage details — classic negative instruction failure causing the AI to output forbidden commands anyway.
Output: A simplified `commands/gsd-delegate.md` with only 4 commands: phase, quick, new-project, new-milestone.
</objective>

<execution_context>
@./.Claude/get-shit-done/workflows/execute-plan.md
@./.Claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@requirements/simplify-delegation-prompt.md
@commands/gsd-delegate.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Strip low-level commands and simplify delegate prompt</name>
  <files>commands/gsd-delegate.md</files>
  <action>
Edit `commands/gsd-delegate.md` to remove all traces of low-level commands. Specific changes:

1. **Remove lines 59-66** — the entire "CRITICAL — Title extraction for add-phase" section (starts with `**CRITICAL — Title extraction for add-phase (if used as low-level fallback):**`). This is the block from line 59 through line 66.

2. **Remove lines 124-127** — the 4 low-level command rows from the Available GSD Commands table:
   - `add-phase` row
   - `plan-phase` row
   - `execute-phase` row
   - `verify-phase` row
   Keep the table with only: `phase`, `quick`, `new-project`, `new-milestone`.

3. **Simplify edge cases section (lines 107-114)** — Remove or rewrite these bullet points:
   - Remove line 112: `CRITICAL: For phase scope, ALWAYS use the phase command...Never decompose into add-phase + plan-phase + execute-phase + verify-phase...` — This is no longer needed since those commands aren't listed.
   - Remove line 113: `CRITICAL: add-phase args MUST be a human-readable title...` — No longer relevant.
   - Keep remaining edge case bullets (incomplete phases, project setup, phase numbers, quick args self-contained, requirement file content).

4. **Clean up the `phase` section (line 37)** — Remove the trailing `— do NOT break this into separate steps.` and simplify to just describe what `phase` does positively. The line should read: `Use the \`phase\` single-session orchestrator. It handles the full lifecycle internally via subagents.`

5. **Clean up milestone section (line 77)** — Remove `— do NOT break each file into add/plan/execute steps` from the comment. Simplify to: `If the project already has \`.planning/\` and \`requirement_path\` is a directory with multiple \`.md\` files, create one \`phase\` command per file:`

6. **Final sweep:** grep the entire file for any remaining occurrences of `add-phase`, `plan-phase`, `execute-phase`, `verify-phase`, `low-level`, and `fallback`. Remove or rewrite any found.

Do NOT change:
- The frontmatter
- The Input section format
- The Output Format / JSON structure
- The `quick` or `new-project`/`new-milestone` scope sections (unless they reference removed commands)
  </action>
  <verify>
Run these checks:
```bash
# No low-level commands remain
grep -c 'add-phase\|plan-phase\|execute-phase\|verify-phase' commands/gsd-delegate.md
# Expected: 0

# No "fallback" or "low-level" language
grep -c 'fallback\|low-level' commands/gsd-delegate.md
# Expected: 0

# The 4 high-level commands are still present
grep -c 'phase\|quick\|new-project\|new-milestone' commands/gsd-delegate.md
# Expected: several matches

# JSON output format still present
grep -c '"steps"' commands/gsd-delegate.md
# Expected: at least 1

# File is valid (no broken markdown tables)
grep '|.*|.*|' commands/gsd-delegate.md | head -10
```
  </verify>
  <done>
- `commands/gsd-delegate.md` contains ZERO references to add-phase, plan-phase, execute-phase, or verify-phase
- Available GSD Commands table has exactly 4 rows (phase, quick, new-project, new-milestone)
- No "low-level", "fallback", or "do NOT decompose" language remains
- JSON output format unchanged
- Phase scope section is a clean positive description of using `phase` command
  </done>
</task>

</tasks>

<verification>
```bash
# Comprehensive check: no low-level command references anywhere in file
grep -inE '(add|plan|execute|verify)-phase' commands/gsd-delegate.md && echo "FAIL: low-level commands still present" || echo "PASS: no low-level commands"

# Table row count (header + separator + 4 data rows = 6 lines with pipes)
grep -c '^|' commands/gsd-delegate.md
# Expected: 6 (header + separator + 4 command rows)

# No negative instructions about command decomposition
grep -ic 'never decompose\|never break\|do NOT break' commands/gsd-delegate.md
# Expected: 0
```
</verification>

<success_criteria>
- gsd-delegate.md exposes exactly 4 commands: phase, quick, new-project, new-milestone
- Zero references to add-phase, plan-phase, execute-phase, verify-phase in the file
- No negative instruction patterns about command decomposition remain
- Output JSON format is unchanged
- File reads cleanly as a delegation prompt
</success_criteria>

<output>
After completion, create `.planning/quick/002-simplify-gsd-delegate-command-remove-low/002-SUMMARY.md`
</output>
