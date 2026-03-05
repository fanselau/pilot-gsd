# Pilot-GSD Prompt Hardening & Cleanup

## Problem
Three expert audits (prompt critique, architecture analysis, prompt rewrites) identified critical issues in the GSD prompt system: broken file references, 18+ hardcoded paths that won't work outside Luca's machine, ~35K tokens of duplicated content, 20K tokens of dead files, ~25 negative instructions that backfire, and a bloated 1,844-line execute-plan.md consuming 15-20% of context window. These must be fixed before pilot can be released publicly.

## Goal
Clean, portable, efficient prompts that work on any machine. Reduce total token usage by ~27% (238K → ~175K). Fix all broken references. Convert negative instructions to positive framing. Prepare the prompt architecture for skills injection.

## Requirements

### Must Have — Critical Fixes

#### Fix Broken File References
- [ ] `commands/gsd-add-phase.md` references `@./.opencode/get-shit-done/workflows/add-phase.md` which does NOT exist. Either create the workflow file with proper add-phase logic, or inline the workflow directly in the command file.
- [ ] `commands/gsd-plan-phase.md` references `@./.opencode/get-shit-done/workflows/plan-phase.md` which does NOT exist. Same fix: create or inline.
- [ ] `commands/gsd-new-milestone.md` references `@./.opencode/get-shit-done/workflows/new-milestone.md` which does NOT exist. Same fix: create or inline.
- [ ] Verify all `@` references across ALL command and workflow files resolve to existing files. List every `@` reference and confirm the target exists.

#### Fix All Hardcoded Paths
- [ ] Replace ALL 18+ occurrences of `/home/luca/.config/opencode/get-shit-done/` with repo-relative paths (`@./.opencode/get-shit-done/`). These appear in:
  - `.opencode/get-shit-done/workflows/execute-plan.md`
  - `.opencode/get-shit-done/workflows/execute-phase.md`
  - `.opencode/get-shit-done/workflows/verify-phase.md`
  - `.opencode/get-shit-done/workflows/verify-work.md`
  - `.opencode/get-shit-done/workflows/discovery-phase.md`
  - `.opencode/get-shit-done/workflows/resume-project.md`
  - `.opencode/get-shit-done/workflows/diagnose-issues.md`
  - `.opencode/get-shit-done/templates/phase-prompt.md`
  - `.opencode/get-shit-done/templates/codebase/structure.md`
  - `.opencode/get-shit-done/references/verification-patterns.md`
  - Any other files containing `/home/luca`
- [ ] Run `grep -rn '/home/' .` (excluding .git) to verify zero absolute home paths remain

#### Convert Negative Instructions to Positive
- [ ] Find ALL "don't", "never", "do NOT", "avoid", "must not" instructions across all prompt files
- [ ] Rewrite each as a positive instruction. Examples:
  - "Don't use Task() for sequential work" → "Use sequential function calls for dependent steps. Reserve Task() only for independent parallel work."
  - "Never skip the verification step" → "Always run verification after completing implementation."
  - "Don't commit untested code" → "Run tests before every commit."
- [ ] Preserve the original intent — just flip the framing

### Must Have — Delegation Prompt Rewrite

#### Rewrite `commands/gsd-delegate.md`
- [ ] Add explicit 4-step chain-of-thought reasoning: (1) Gather State — read .planning/, ROADMAP, STATE; (2) Analyze — determine what's done, what's next; (3) Route — match to the correct case; (4) Self-Verify — check output against rules before responding
- [ ] Reorder cases from simple→complex (was backwards): Complete/up-to-date first, then needs-planning, then needs-execution, then new project
- [ ] Add self-verification checklist at the end: "Before outputting, verify: phase numbers match directory names, command names are valid, args are correctly formatted, no `--auto` on execute-phase"
- [ ] Add explicit JSON output schema with TypeScript-style type annotation
- [ ] Add category-aware section: "If job has categories, include `skills_hint` in reasoning explaining which skills are relevant"
- [ ] Refer to the full proposed rewrite in `/home/luca/.openclaw/workspace/temp/audit-gsd-rewrites.md` section 1 for the complete new prompt text

### Must Have — Context Efficiency

#### Trim execute-plan.md (1,844 lines → ~800 lines)
- [ ] Extract deviation handling rules (~200 lines) into `.opencode/get-shit-done/references/deviation-handling.md`
- [ ] Extract TDD methodology (~150 lines) into a reference file (or rely on the existing `references/tdd.md`)
- [ ] Extract auth gate / human approval patterns (~100 lines) into `.opencode/get-shit-done/references/auth-gates.md`
- [ ] Keep the core execution flow, checkpoint handling, and commit protocol in execute-plan.md
- [ ] Update all `@` references pointing to execute-plan.md — they should still work since the file exists, just slimmer

#### Remove Dead Files (~20K tokens)
- [ ] Identify all files in `.opencode/get-shit-done/references/` and `.opencode/get-shit-done/templates/` that are NEVER referenced by any `@` directive in any command, workflow, or agent file
- [ ] Delete unreferenced files (or move to an `archive/` directory if uncertain)
- [ ] Common suspects: check if `continuation-format.md`, `verification-report.md`, `UAT.md`, `codebase/structure.md` are actually referenced

#### Deduplicate Command ↔ Workflow Content
- [ ] Commands should be thin routing layers (description + args + which workflow to invoke). The workflow file should contain the actual logic.
- [ ] Check `gsd-execute-phase.md` (command) vs `workflows/execute-phase.md` — deduplicate any overlapping content
- [ ] Check gsd-planner agent vs planning workflow content — the planner agent (10.5K tokens, largest file) likely contains content that belongs in reference files

### Nice to Have

- [ ] Add `skills_hint` field to PLAN.md frontmatter template (in `templates/phase-prompt.md`) so planners can recommend skills for executors
- [ ] Decompose `gsd-planner.md` agent (10.5K tokens) — extract planning methodology into a reference file, keep the agent prompt focused on orchestration
- [ ] Add flag interaction documentation table to `gsd-plan-phase.md` (which flags override which)
- [ ] Add `<guardrails>` section to `gsd-execute-phase.md` for common failure mode handling
- [ ] Create a token budget document showing how much context each layer consumes

## Technical Notes

### How @ References Work
OpenCode's `@` directive inlines file content into the prompt. Files are resolved relative to the project root. Format: `@./path/to/file.md` or `@/absolute/path`. If the file doesn't exist, the directive is silently ignored (no error, no content) — this makes broken references especially dangerous.

### Files to Modify (Priority Order)
1. `commands/gsd-delegate.md` — full rewrite
2. `.opencode/get-shit-done/workflows/execute-plan.md` — trim from 1,844 to ~800 lines
3. All files with `/home/luca` paths — find & replace
4. `commands/gsd-add-phase.md`, `gsd-plan-phase.md`, `gsd-new-milestone.md` — fix broken refs
5. All files with negative instructions — rewrite to positive
6. Dead reference/template files — delete

### Reference Material
The audit reports contain detailed findings and proposed rewrites:
- `/home/luca/.openclaw/workspace/temp/audit-gsd-prompts-critique.md` — detailed critique with line references
- `/home/luca/.openclaw/workspace/temp/audit-gsd-architecture.md` — token analysis, dependency graph, restructuring plan  
- `/home/luca/.openclaw/workspace/temp/audit-gsd-rewrites.md` — concrete proposed rewrites for all files (START WITH SECTION 1: gsd-delegate.md rewrite)

### Validation After Changes
- [ ] `grep -rn '/home/' . --exclude-dir=.git` returns zero results
- [ ] Every `@` reference in every `.md` file points to a file that exists
- [ ] `gsd-delegate.md` produces valid JSON when given test inputs (manually verify with a few examples)
- [ ] No "don't", "never", "do NOT" in any prompt file (grep check)

## Do NOT
- Do NOT change the fundamental pipeline architecture (delegation → plan → execute → verify)
- Do NOT modify opencode.json agent configurations
- Do NOT rename command files (the slash command names must stay the same)
- Do NOT remove any command that's actively used by the pilot runner (gsd-delegate, gsd-add-phase, gsd-plan-phase, gsd-execute-phase, gsd-new-milestone)
- Do NOT add new GSD commands — this is cleanup only
- Do NOT modify the frontmatter of command files (description, argument-hint, tools) unless fixing a bug
