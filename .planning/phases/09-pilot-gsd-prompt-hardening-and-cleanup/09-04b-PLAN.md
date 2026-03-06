---
phase: 09-prompt-hardening
plan: 04b
type: execute
wave: 1
depends_on: []
files_modified:
  - .opencode/get-shit-done/workflows/plan-milestone-gaps.md
  - .opencode/get-shit-done/workflows/plan-phase.md
  - .opencode/get-shit-done/workflows/remove-phase.md
  - .opencode/get-shit-done/workflows/transition.md
  - .opencode/get-shit-done/references/verification-patterns.md
  - .opencode/get-shit-done/templates/project.md
  - .opencode/get-shit-done/templates/UAT.md
  - .opencode/get-shit-done/templates/summary.md
  - .opencode/get-shit-done/templates/discovery.md
  - .opencode/get-shit-done/templates/roadmap.md
  - .opencode/get-shit-done/templates/milestone-archive.md
  - .opencode/get-shit-done/templates/context.md
  - .opencode/get-shit-done/templates/milestone.md
autonomous: true

must_haves:
  truths:
    - "Zero negative instruction patterns remain in workflows/, references/, and surviving templates"
    - "Every rewritten instruction preserves the original behavioral intent"
    - "Template structure preserved — only instruction text reframed"
  artifacts:
    - path: ".opencode/get-shit-done/workflows/plan-phase.md"
      provides: "Plan-phase workflow with negative instructions rewritten"
    - path: ".opencode/get-shit-done/templates/summary.md"
      provides: "Summary template with negative instructions rewritten"
  key_links:
    - from: "workflows/*.md"
      to: "references/ and templates/"
      via: "@ directives unchanged"
      pattern: "@\\./\\.opencode/get-shit-done/(references|templates)/"
---

<objective>
Rewrite all negative instructions to positive framing in workflow files (4 files, ~5 instances), reference files (1 file, ~1 instance), and surviving template files (8 files, ~8 instances).

Purpose: Complete the negative-to-positive conversion across workflows, references, and templates. Combined with plans 02, 03, and 04a, this covers every prompt file in the system.
Output: All workflow, reference, and template files use positive instruction framing.
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
  <name>Task 1: Rewrite negative instructions in workflows and references</name>
  <files>
  Workflows (4 files, ~5 instances):
  - .opencode/get-shit-done/workflows/plan-milestone-gaps.md
  - .opencode/get-shit-done/workflows/plan-phase.md
  - .opencode/get-shit-done/workflows/remove-phase.md
  - .opencode/get-shit-done/workflows/transition.md

  References (1 file, ~1 instance):
  - .opencode/get-shit-done/references/verification-patterns.md
  </files>
  <action>
  For each file, find all negative instruction patterns ("don't", "never", "do NOT", "do not", "must not", "avoid").

  Skip non-instruction uses:
  - Code blocks (``` delimited)
  - Example/template content
  - Descriptive text explaining behavior

  Rewrite each instruction to positive framing:
  - "Don't use X" → "Use Y instead. Reserve X for Z."
  - "Never skip X" → "Always run X."
  - "Do NOT modify X" → "Keep X unchanged."
  - "Avoid X" → "Prefer Y."
  </action>
  <verify>
  Run: `rg -ci "(don't|never |do not|must not|avoid )" .opencode/get-shit-done/workflows/plan-milestone-gaps.md .opencode/get-shit-done/workflows/plan-phase.md .opencode/get-shit-done/workflows/remove-phase.md .opencode/get-shit-done/workflows/transition.md .opencode/get-shit-done/references/verification-patterns.md`
  Expected: 0 for each file.
  </verify>
  <done>5 workflow/reference files have zero negative instruction patterns.</done>
</task>

<task type="auto">
  <name>Task 2: Rewrite negative instructions in surviving template files</name>
  <files>
  Templates (8 files, ~8 instances):
  - .opencode/get-shit-done/templates/project.md
  - .opencode/get-shit-done/templates/UAT.md
  - .opencode/get-shit-done/templates/summary.md
  - .opencode/get-shit-done/templates/discovery.md
  - .opencode/get-shit-done/templates/roadmap.md
  - .opencode/get-shit-done/templates/milestone-archive.md
  - .opencode/get-shit-done/templates/context.md
  - .opencode/get-shit-done/templates/milestone.md
  </files>
  <action>
  For template files specifically:
  - Templates contain placeholder/example text that Claude will fill in when creating new files
  - If a negative pattern is inside example section headings (e.g., "## Do NOT" as a section the user fills), rename to "## Constraints" or "## Guardrails" with positively-framed placeholder rules
  - Template instructions that guide Claude on how to use the template should use positive framing

  After completing all files, run a comprehensive sweep across ALL non-agent directories:
  `rg "(don't|never |do not|must not|avoid )" commands/ .opencode/command/ .opencode/get-shit-done/workflows/ .opencode/get-shit-done/references/ .opencode/get-shit-done/templates/ --type md`

  Any remaining hits should be only in legitimate non-instruction contexts (descriptive text, code examples).
  </action>
  <verify>
  Run comprehensive check: `rg -ci "(don't|never |do not|must not|avoid )" .opencode/get-shit-done/workflows/ .opencode/get-shit-done/references/ .opencode/get-shit-done/templates/ --type md | rg -v ':0$'`
  Expected: zero files with non-zero counts.
  </verify>
  <done>All 13 workflow, reference, and template files have zero negative instruction patterns. Comprehensive sweep confirms clean.</done>
</task>

</tasks>

<verification>
1. `rg -c "(don't|never |do not|must not|avoid )" .opencode/get-shit-done/ --type md | rg -v ':0$' | wc -l` returns 0 (or near-zero for legitimate uses)
2. Template structure preserved (spot-check project.md and summary.md)
3. @ references in modified files still point to valid targets
</verification>

<success_criteria>
- Zero negative instruction patterns in workflows/, references/, and templates/
- Template structure preserved — only instruction framing changed
- Behavioral intent maintained in every rewrite
</success_criteria>

<output>
After completion, create `.planning/phases/09-pilot-gsd-prompt-hardening-and-cleanup/09-04b-SUMMARY.md`
</output>
