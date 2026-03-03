---
description: "Evaluate whether a phase job succeeded by reading opencode DB transcript"
argument-hint: "<requirement-path-or-description> <session-title>"
model: haiku
tools:
  read: true
  bash: true
---
<objective>
Evaluate whether a phase job accomplished its requirement by reading the opencode DB transcript of the session. Output a structured JSON verdict that the runner uses to decide pass/fail/retry.

This is a cheap, fast evaluation — not creative work. Use the transcript as evidence. Do NOT hallucinate success or failure — if transcript is ambiguous, say so.
</objective>

<context>
$ARGUMENTS

First argument: requirement path (file) or inline description (what was supposed to happen)
Second argument: session title of the phase session to evaluate
</context>

<process>

## 1. Parse Arguments

Split `$ARGUMENTS` into:
- **Requirement source:** First arg — either a file path (if it contains `/` or ends in `.md`) or an inline description
- **Session title:** Remaining args after the requirement source

## 2. Read the Requirement

If the requirement source is a file path:
- Read the file to understand what was supposed to happen
- Extract the key deliverables and success criteria

If it's an inline description:
- Use it as the requirement directly

## 3. Query Opencode DB for Session Transcript

Run these queries via bash:

```bash
# Find session ID by title
sqlite3 ~/.local/share/opencode/opencode.db "SELECT id FROM session WHERE title = '<session-title>' ORDER BY time_created DESC LIMIT 1"
```

With the session ID:

```bash
# Get message summary (role + truncated content)
sqlite3 ~/.local/share/opencode/opencode.db "
  SELECT json_extract(m.data, '$.role') as role,
    substr(COALESCE(
      (SELECT GROUP_CONCAT(json_extract(p.data, '$.text'), char(10))
       FROM part p
       WHERE p.message_id = m.id
         AND json_extract(p.data, '$.type') = 'text'), ''), 1, 500) as content
  FROM message m
  WHERE m.session_id = '<session-id>'
  ORDER BY m.time_created ASC
"
```

```bash
# Get the LAST assistant message (most important — contains result summary)
sqlite3 ~/.local/share/opencode/opencode.db "
  SELECT substr(COALESCE(
    (SELECT GROUP_CONCAT(json_extract(p.data, '$.text'), char(10))
     FROM part p
     WHERE p.message_id = m.id
       AND json_extract(p.data, '$.type') = 'text'), ''), 1, 2000) as content
  FROM message m
  WHERE m.session_id = '<session-id>'
    AND json_extract(m.data, '$.role') = 'assistant'
  ORDER BY m.time_created DESC
  LIMIT 1
"
```

```bash
# Check for tool errors
sqlite3 ~/.local/share/opencode/opencode.db "
  SELECT COUNT(*) as error_count
  FROM part p
  WHERE p.session_id = '<session-id>'
    AND json_extract(p.data, '$.state.status') = 'error'
"
```

## 4. Evaluate

Based on the transcript evidence, assess whether the requirement was accomplished:

**Evidence of success (look for these):**
- Git commits mentioned in the transcript
- Files created/modified successfully
- Tests passing
- Build succeeding
- Phase completion messages ("Phase N complete", "All plans executed")
- SUMMARY.md files created

**Evidence of failure (look for these):**
- Compilation/build errors
- Test failures
- "I was unable to", "I couldn't", "Unfortunately"
- Error patterns in tool calls
- No meaningful output or commits
- Session ended abruptly

**Ambiguous cases:**
- Partial work done but not all requirements met
- Some tests pass, some fail
- Session ended mid-work (token limit, timeout)

## 5. Output Verdict

Output ONLY a JSON code block with the verdict — no other text before or after:

```json
{
  "verdict": "pass",
  "confidence": 0.85,
  "summary": "Phase 3 completed successfully. All 4 plans executed, 12 commits made, tests passing.",
  "retryRecommendation": "none",
  "retryHint": ""
}
```

### Verdict Values

- **`pass`**: Requirement clearly accomplished. Evidence of commits, tests passing, artifacts created. Confidence should be ≥0.7.
- **`partial`**: Some work done but incomplete. Recommend `retry-resume`. Include what's missing in summary.
- **`fail`**: No meaningful progress or fundamental error. Recommend `retry-full` (or `none` if hopeless).

### retryRecommendation Values

- **`none`**: No retry needed (pass) or retrying won't help (persistent error)
- **`retry-full`**: Start fresh — the approach needs rethinking
- **`retry-resume`**: Resume from where it stopped — partial progress exists

### retryHint

Optional hint for the next attempt. Examples:
- `"Resume from plan 03"` — for partial completions
- `"Fix tsconfig.json paths before retrying"` — for fixable errors
- `""` — when no specific hint needed

</process>

<rules>
- Output ONLY the JSON code block — no preamble, no explanation
- Do NOT hallucinate — if the transcript doesn't contain enough info, set confidence low and verdict to "partial"
- Complete evaluation in <30 seconds
- Use haiku model for speed and cost (this is evaluation, not creative work)
- Be conservative: if unsure, say "partial" not "pass"
- The summary field should be human-readable (shown in TUI and notifications)
</rules>
