---
description: "Orchestrate full phase lifecycle (add→plan→execute) in a single session"
argument-hint: "<description-or-@path> [--phase N] [--resume] [--auto]"
tools:
  read: true
  write: true
  bash: true
  glob: true
  grep: true
  task: true
---
<objective>
Orchestrate a complete phase lifecycle (add→plan→execute) in a single session using Task() subagents for each step.

This replaces the old multi-session approach where the runner spawned 3-4 separate sessions (add-phase, plan-phase, execute-phase). Instead, one session manages the flow and delegates heavy work to subagents.

Stay LEAN — orchestrator context should be ~20-30k tokens max. Delegate ALL heavy work (code reading, editing, testing) to subagents.
</objective>

<context>
$ARGUMENTS

Read only what's needed:
- `.planning/STATE.md` — frontmatter + current phase/milestone info (first 30 lines)
- `.planning/ROADMAP.md` — phase list (scan for `### Phase N:` headings only)
</context>

<process>

## 1. Parse Arguments

Extract from `$ARGUMENTS`:
- **Requirement source:** Either an inline description string OR `@path/to/requirement.md` file reference
- **`--phase N`:** Explicit phase number to work on (skip add-phase)
- **`--resume`:** Skip add-phase and plan-phase, only execute remaining plans
- **`--auto`:** Pass through to subagent commands

If requirement source starts with `@`, it's a file path — strip the `@` prefix for file reads.

## 2. Read Project Context (Lean)

Read only frontmatter/headings from:
- `.planning/STATE.md` — first 30 lines for current position
- `.planning/ROADMAP.md` — scan for `### Phase N:` headings to understand existing phases

Do NOT read full file contents. Stay lean.

## 3. Determine Phase Number

**If `--phase N` was provided:** Use phase N directly. Skip to step 5 (plan) or step 6 (execute).

**If `--resume` was provided:** Scan `.planning/phases/` for the phase directory matching the requirement. If found, skip to step 6.

**Otherwise:** Check if a phase already exists for this requirement:
- Scan `ROADMAP.md` headings for a matching title (case-insensitive substring match)
- If match found, use that phase number and skip to step 5

If no existing phase found, proceed to step 4 (add-phase).

## 4. Add Phase (if needed)

Call `/gsd-add-phase` via Task() with the requirement title as the description.

```
Task: Run /gsd-add-phase with description: "<requirement title>"
```

After completion, read the Task result summary to find the new phase number. Verify by scanning `.planning/phases/` for the newly created directory.

**On failure:** Retry ONCE. If still fails, report failure in final message and stop.

## 5. Plan Phase

Call `/gsd-plan-phase` via Task() with the phase number and `--auto` flag.

If requirement is a file path, include `@<path>` in the args:
```
Task: Run /gsd-plan-phase with args: "<N> @<requirement-path> --auto"
```

Otherwise:
```
Task: Run /gsd-plan-phase with args: "<N> --auto"
```

**On failure:** Retry ONCE. If still fails, report what was accomplished and stop.

## 6. Execute Phase

If `--resume`: Scan `.planning/phases/<NN>-*/` for PLAN.md files without matching SUMMARY.md. If all plans have summaries, report "all plans already executed" and stop.

Call `/gsd-execute-phase` via Task() with the phase number:
```
Task: Run /gsd-execute-phase with args: "<N>"
```

If the phase has >6 plans, consider splitting into two execute-phase calls to keep each subagent's context fresh.

If `--resume` and there are unexecuted plans:
```
Task: Run /gsd-execute-phase with args: "<N> --gaps-only"
```

**On failure:** Report what was accomplished and what failed.

## 7. Final Summary

Your final message MUST include a clear result summary:

```
## Phase Result

**Phase:** <N> — <title>
**Steps completed:** add-phase ✓ | plan-phase ✓ | execute-phase ✓
**Plans executed:** <M> of <total>
**Status:** [complete | partial | failed]

<Brief description of what was built/changed>
```

If any step failed, include the failure details.
</process>

<rules>
- Stay LEAN — orchestrator context should be ~20-30k tokens max
- Read only frontmatter/titles from .planning files, never full content
- Each subagent (add-phase, plan-phase, execute-phase) gets its own fresh context window via Task()
- If phase has >6 plans, split into two execute-phase calls
- Final message MUST include a clear result summary with phase number, plans executed, and completion status
- Do NOT read source code — that's the subagents' job
- Do NOT write code — that's the subagents' job
- You are an orchestrator, not an implementer
</rules>
