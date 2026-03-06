---
phase: 09-prompt-hardening
plan: 04a
type: execute
wave: 1
depends_on: []
files_modified:
  - commands/gsd-delegate.md
  - commands/gsd-discuss-phase.md
  - commands/gsd-research-phase.md
  - .opencode/command/gsd-discuss-phase.md
  - .opencode/command/gsd-new-milestone.md
  - .opencode/command/gsd-new-project.md
  - .opencode/command/gsd-plan-milestone-gaps.md
  - .opencode/command/gsd-remove-phase.md
  - .opencode/command/gsd-research-phase.md
  - .opencode/command/gsd-verify-auto.md
  - .opencode/command/gsd-verify-work.md
autonomous: true

must_haves:
  truths:
    - "Zero negative instruction patterns remain in commands/ and .opencode/command/"
    - "Every rewritten instruction preserves the original behavioral intent"
    - "Command frontmatter is untouched (only body content modified)"
  artifacts:
    - path: ".opencode/command/gsd-verify-auto.md"
      provides: "Verify-auto command with ~9 negative instructions rewritten"
    - path: ".opencode/command/gsd-remove-phase.md"
      provides: "Remove-phase command with ~10 negative instructions rewritten"
  key_links:
    - from: "commands/*.md"
      to: "workflows/*.md"
      via: "@ references unchanged"
      pattern: "@\\./\\.opencode/get-shit-done/workflows/"
---

<objective>
Rewrite all negative instructions to positive framing in command files — both `commands/` (3 files, ~5 instances) and `.opencode/command/` (8 files, ~10 instances).

Purpose: Complete the negative-to-positive conversion in all command files. Strict frontmatter-preservation constraint applies since requirements forbid changing command frontmatter.
Output: All 11 command files use positive instruction framing with frontmatter untouched.
</objective>

<execution_context>
@./.opencode/get-shit-done/workflows/execute-plan.md
@./.opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@requirements/prompt-hardening.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rewrite negative instructions in commands/ (root) and light .opencode/command/ files</name>
  <files>
  commands/ (3 files, ~5 instances):
  - commands/gsd-delegate.md
  - commands/gsd-discuss-phase.md
  - commands/gsd-research-phase.md

  .opencode/command/ (4 lighter files, ~4 instances):
  - .opencode/command/gsd-discuss-phase.md
  - .opencode/command/gsd-new-milestone.md
  - .opencode/command/gsd-new-project.md
  - .opencode/command/gsd-plan-milestone-gaps.md
  </files>
  <action>
  For each command file, find all negative instruction patterns ("don't", "never", "do NOT", "do not", "must not", "avoid").

  IMPORTANT CONSTRAINT: Preserve frontmatter exactly as-is. Only modify body content below the closing `---` of frontmatter.

  Skip non-instruction uses:
  - Code blocks, YAML frontmatter
  - Example output text
  - Descriptive explanations

  Rewrite each instruction to positive framing:
  - "Don't use X" → "Use Y instead. Reserve X for Z."
  - "Never skip X" → "Always run X."
  - "Do NOT modify X" → "Keep X unchanged."
  - "Avoid X" → "Prefer Y."

  For "## Do NOT" sections at the end of files, rename to "## Constraints" with positively-framed rules.
  </action>
  <verify>
  Run: `rg -ci "(don't|never |do not|must not|avoid )" commands/gsd-delegate.md commands/gsd-discuss-phase.md commands/gsd-research-phase.md .opencode/command/gsd-discuss-phase.md .opencode/command/gsd-new-milestone.md .opencode/command/gsd-new-project.md .opencode/command/gsd-plan-milestone-gaps.md`
  Expected: 0 for each file.
  </verify>
  <done>7 command files have zero negative instruction patterns. Frontmatter untouched.</done>
</task>

<task type="auto">
  <name>Task 2: Rewrite negative instructions in heavy .opencode/command/ files</name>
  <files>
  .opencode/command/ (4 heavier files, ~6 instances):
  - .opencode/command/gsd-remove-phase.md (~10 instances)
  - .opencode/command/gsd-verify-auto.md (~9 instances)
  - .opencode/command/gsd-research-phase.md
  - .opencode/command/gsd-verify-work.md
  </files>
  <action>
  Same approach as Task 1. These files are the heaviest in this batch.

  IMPORTANT CONSTRAINT: Preserve frontmatter exactly as-is.

  For each file:
  1. Read the file
  2. Find all negative instruction patterns below the frontmatter
  3. Rewrite each to positive framing
  4. Preserve behavioral intent

  After completing all files, run a sweep:
  `rg "(don't|never |do not|must not|avoid )" commands/ .opencode/command/ --type md`
  to catch anything missed.
  </action>
  <verify>
  Run: `rg -ci "(don't|never |do not|must not|avoid )" .opencode/command/gsd-remove-phase.md .opencode/command/gsd-verify-auto.md .opencode/command/gsd-research-phase.md .opencode/command/gsd-verify-work.md`
  Expected: 0 for each file.
  Run: `rg -ci "(don't|never |do not|must not|avoid )" commands/ .opencode/command/ --type md | rg -v ':0$'`
  Expected: zero files with non-zero counts.
  </verify>
  <done>All 11 command files have zero negative instruction patterns. Frontmatter preserved. Full sweep confirms clean.</done>
</task>

</tasks>

<verification>
1. `rg -c "(don't|never |do not|must not|avoid )" commands/ .opencode/command/ --type md | rg -v ':0$' | wc -l` returns 0
2. Command frontmatter unchanged (spot-check 3 files — verify description, argument-hint, tools match pre-edit)
3. @ references in modified files still point to valid targets
</verification>

<success_criteria>
- Zero negative instruction patterns in commands/ and .opencode/command/
- All command frontmatter preserved exactly
- Behavioral intent maintained in every rewrite
</success_criteria>

<output>
After completion, create `.planning/phases/09-pilot-gsd-prompt-hardening-and-cleanup/09-04a-SUMMARY.md`
</output>
