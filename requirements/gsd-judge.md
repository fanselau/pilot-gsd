# GSD Judge Command

## Problem
The runner needs a lightweight post-execution judge to evaluate whether a phase completed successfully. Currently calls `gsd-verify-phase` which doesn't exist. The judge should live in pilot-gsd as a GSD command, like `gsd-delegate`.

## Goal
Create `commands/gsd-judge.md` — an opencode command that reads execution evidence and outputs a structured JSON verdict.

## Design

### Input (via arguments/environment)
- Job ID (so it can run `pilot log <jobId>`)
- Phase number
- Project directory (implicit — opencode runs in project context)

### What it reads
1. `pilot log <jobId> --last 50` — the execution transcript
2. `.planning/phases/XX-*/XX-SUMMARY.md` files (if they exist)
3. `.planning/phases/XX-*/XX-VERIFICATION.md` (if executor wrote one)
4. `.planning/STATE.md` — current project state

### Output — JSON only
```json
{
  "verdict": "succeeded" | "failed" | "doubting",
  "confidence": 85,
  "reason": "All 5 plans executed, tests pass, executor committed clean verification"
}
```

- `succeeded` — work clearly completed as intended
- `failed` — clear failure signal (asked for human input, compilation errors, incomplete work, "I need more information")
- `doubting` — unclear, mixed signals. Confidence 0-100 indicates how likely it succeeded (high = probably fine, low = probably broken)

### Prompt approach
The judge is a read-only evaluator. It does NOT run tests, build code, or modify files. It reads evidence and makes a call. Keep the prompt short and focused — this runs on haiku tier.

Signs of success: executor completed planned work, clean commits, summaries written, verification says passed, log ends with completion
Signs of failure: executor asked for input, compilation/test failures, error loops, "I need more information", log ends mid-task
Signs of doubt: mixed signals, partial completion, some tasks done but unclear if all requirements met

## Requirements

### Must Have
- [ ] `commands/gsd-judge.md` exists with proper opencode frontmatter (haiku model, read-only tools: read, bash, glob, grep)
- [ ] Command accepts arguments: `<jobId> <phaseNum>`
- [ ] Reads pilot log via `pilot log <jobId>`
- [ ] Reads planning artifacts from `.planning/phases/`
- [ ] Outputs ONLY a JSON object `{ verdict, confidence, reason }` — no other text
- [ ] Also place in `.opencode/command/gsd-judge.md` (the local mirror)
- [ ] Verdict values: `succeeded`, `failed`, `doubting`
- [ ] Confidence: integer 0-100 (required for `doubting`, optional but welcome for all verdicts)
- [ ] Reason: one sentence, human-readable, suitable for notification messages

### Nice to Have
- [ ] Judge also glances at git diff stats for the phase commits

## Technical Notes
- Model: haiku (cheap, fast — it's just reading and judging)
- Tools needed: `read`, `bash` (for `pilot log`), `glob`, `grep` — NO `write`, `edit`, or `task`
- Pattern: identical to `gsd-delegate` — command prompt + structured JSON output
- The runner will parse this JSON the same way it parses delegation JSON

## Do NOT
- Run tests or build code — judge is read-only
- Write any files — output is JSON to stdout only
- Make this interactive or conversational
- Add complex multi-step reasoning — read evidence, output verdict, done
