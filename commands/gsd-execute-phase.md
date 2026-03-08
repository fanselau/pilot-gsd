---
description: Execute all plans in a phase with wave-based parallelization
argument-hint: "<phase-number> [--gaps-only]"
tools:
  read: true
  write: true
  edit: true
  glob: true
  grep: true
  bash: true
  task: true
  todowrite: true
---
<objective>
Execute all plans in a phase using wave-based parallel execution.

Orchestrator stays lean: discover plans, analyze dependencies, group into waves, spawn subagents, collect results. Each subagent loads the full execute-plan context and handles its own plan.

Context budget: ~15% orchestrator, 100% fresh per subagent.
</objective>

<execution_context>
@./.opencode/get-shit-done/workflows/execute-phase.md
@./.opencode/get-shit-done/references/ui-brand.md
</execution_context>

<context>
Phase: $ARGUMENTS

Parse `$ARGUMENTS` to extract the phase number and any flags:
- The phase number is always the first token (e.g. "3" or "03")
- If the literal string `--gaps-only` appears in `$ARGUMENTS`, set gaps-only mode. Otherwise, run in normal mode (execute ALL incomplete plans).
- **Default is normal mode.** Only activate gaps-only when `--gaps-only` is explicitly present in the arguments above.

Context files are resolved inside the workflow via `gsd-tools init execute-phase` and per-subagent `<files_to_read>` blocks.
</context>

<process>
Execute the execute-phase workflow from @./.opencode/get-shit-done/workflows/execute-phase.md end-to-end.
Preserve all workflow gates (wave execution, checkpoint handling, verification, state updates, routing).
</process>
