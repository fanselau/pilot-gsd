---
phase: quick-4
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - commands/gsd-judge.md
  - .opencode/command/gsd-judge.md
autonomous: true
requirements: [JUDGE-01]
must_haves:
  truths:
    - "Running /gsd-judge <jobId> <phaseNum> outputs a JSON verdict object"
    - "Judge reads pilot log, planning artifacts, and STATE.md as evidence"
    - "Judge outputs ONLY JSON — no conversational text, no markdown outside the JSON"
    - "Verdict is one of: succeeded, failed, doubting"
  artifacts:
    - path: "commands/gsd-judge.md"
      provides: "opencode command for execution verdict"
      contains: "verdict"
    - path: ".opencode/command/gsd-judge.md"
      provides: "local mirror of judge command"
      contains: "verdict"
  key_links:
    - from: "commands/gsd-judge.md"
      to: "pilot log"
      via: "bash tool invocation"
      pattern: "pilot log"
---

<objective>
Create `gsd-judge.md` — an opencode command that reads execution evidence (pilot logs, planning artifacts, git history) and outputs a structured JSON verdict: `{ verdict, confidence, reason }`.

Purpose: Enable automated post-execution assessment without human review. The judge is read-only — it evaluates evidence, never modifies anything.
Output: `commands/gsd-judge.md` and `.opencode/command/gsd-judge.md` (identical copies)
</objective>

<execution_context>
@./.Claude/get-shit-done/workflows/execute-plan.md
@./.Claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@commands/gsd-delegate.md (frontmatter pattern reference)
@.planning/STATE.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create gsd-judge.md command with proper frontmatter and prompt</name>
  <files>commands/gsd-judge.md, .opencode/command/gsd-judge.md</files>
  <action>
Create `commands/gsd-judge.md` with the following structure:

**Frontmatter** (matching gsd-delegate pattern):
```yaml
---
description: "Read execution evidence and output a structured JSON verdict"
argument-hint: "<jobId> <phaseNum>"
model: haiku
tools:
  read: true
  bash: true
  glob: true
  grep: true
---
```

Key frontmatter notes:
- `model: haiku` — this runs on the cheap/fast tier
- Tools: `read`, `bash`, `glob`, `grep` ONLY — NO `write`, `edit`, or `task`
- `argument-hint` shows the two required args

**Prompt body** — write a focused, concise prompt with these sections:

1. **Role**: "You are a read-only execution judge. You read evidence from a completed job and output a JSON verdict. You MUST NOT modify any files, run tests, or build code."

2. **Input**: Arguments arrive as `<jobId> <phaseNum>`. Parse them from the argument string.

3. **Evidence gathering** — instruct the judge to read these sources in order:
   - Run `pilot log <jobId> --last 50` via bash to get the execution transcript
   - Glob for `.planning/phases/<phaseNum>-*/*-SUMMARY.md` files
   - Glob for `.planning/phases/<phaseNum>-*/*-VERIFICATION.md` files
   - Read `.planning/STATE.md`
   - Optionally run `git log --oneline -20` to see recent commits

4. **Assessment criteria** — define the three signal categories:

   **Signs of success:**
   - Executor completed all planned tasks
   - Clean git commits present
   - SUMMARY files written for plans
   - VERIFICATION.md says "passed" or equivalent
   - Log ends with completion/done language
   - State file updated

   **Signs of failure:**
   - Executor asked for human input (AskUserQuestion, "I need more information")
   - Compilation errors, test failures, error loops in log
   - Log ends mid-task or with an error
   - Missing expected output files
   - Repeated retry patterns suggesting stuck execution

   **Signs of doubt:**
   - Mixed signals (some tasks done, others unclear)
   - Partial completion
   - Warnings present but execution continued
   - Log ambiguous about final state

5. **Output format** — strict JSON-only output:

   ```
   Output ONLY a JSON object. No markdown fences. No explanation text before or after. Just the JSON:

   {"verdict":"succeeded","confidence":95,"reason":"All 3 plans executed, summaries written, clean commits present"}

   Fields:
   - verdict: "succeeded" | "failed" | "doubting"
   - confidence: integer 0-100 (how sure you are about the verdict)
   - reason: one sentence, human-readable, suitable for a notification message
   ```

6. **Constraint reminder**: "Output the JSON object and nothing else. No preamble, no follow-up, no markdown formatting."

After creating `commands/gsd-judge.md`, copy the identical content to `.opencode/command/gsd-judge.md`.
  </action>
  <verify>
Both files exist and are identical:
```bash
test -f commands/gsd-judge.md && test -f .opencode/command/gsd-judge.md && diff commands/gsd-judge.md .opencode/command/gsd-judge.md
```

Frontmatter check:
```bash
head -10 commands/gsd-judge.md | grep -q 'model: haiku' && echo "haiku model OK"
head -10 commands/gsd-judge.md | grep -q 'argument-hint' && echo "argument-hint OK"
```

Content check:
```bash
grep -q 'verdict' commands/gsd-judge.md && grep -q 'confidence' commands/gsd-judge.md && grep -q 'pilot log' commands/gsd-judge.md && echo "Content OK"
```

Verify NO write/edit tools in frontmatter:
```bash
grep -E '^\s+(write|edit|task):' commands/gsd-judge.md && echo "FAIL: has forbidden tools" || echo "No forbidden tools OK"
```
  </verify>
  <done>
- `commands/gsd-judge.md` exists with opencode frontmatter (model: haiku, tools: read+bash+glob+grep only)
- `.opencode/command/gsd-judge.md` is an identical copy
- Command accepts `<jobId> <phaseNum>` arguments
- Prompt instructs reading pilot log, SUMMARY, VERIFICATION, STATE artifacts
- Output is strictly `{ verdict, confidence, reason }` JSON — no other text
- Verdict values: succeeded, failed, doubting
- Confidence: integer 0-100
- Reason: one sentence, human-readable
  </done>
</task>

</tasks>

<verification>
1. Both files exist at correct paths
2. Files are byte-identical
3. Frontmatter has: description, argument-hint, model: haiku, tools (read, bash, glob, grep — no write/edit/task)
4. Body references `pilot log <jobId>` for evidence gathering
5. Body specifies JSON-only output with verdict/confidence/reason fields
6. No instructions to modify files, run tests, or build code
</verification>

<success_criteria>
- `commands/gsd-judge.md` and `.opencode/command/gsd-judge.md` exist and are identical
- Frontmatter uses haiku model with read-only tools
- Prompt is focused and concise (suitable for haiku context)
- Output contract is unambiguous: JSON with { verdict, confidence, reason }
</success_criteria>

<output>
After completion, create `.planning/quick/4-create-gsd-judge-md-command-for-reading-/4-SUMMARY.md`
</output>
