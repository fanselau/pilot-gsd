---
phase: "005"
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - vitest.config.ts
  - README.md
autonomous: true
must_haves:
  truths:
    - "`npm test` passes with 81 tests, 0 failures"
    - "`npx vitest run` exits 0 (no test suite failure)"
    - "README documents `npm test` as the canonical verification command"
  artifacts:
    - path: "vitest.config.ts"
      provides: "Vitest exclusion config so npx vitest run exits cleanly"
    - path: "README.md"
      provides: "Canonical test command documentation"
  key_links: []
---

<objective>
Make test runner behavior consistent and unsurprising: `npm test` is the canonical command (Node built-in test runner), and `npx vitest run` no longer fails with a confusing "No test suite found" error.

Purpose: Eliminate the confusing state where two obvious verification commands give conflicting pass/fail results, ensuring release verification is trustworthy.
Output: Clean `vitest.config.ts` exclusion + updated README with test instructions.
</objective>

<execution_context>
@./.Claude/get-shit-done/workflows/execute-plan.md
@./.Claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@package.json
@get-shit-done/bin/gsd-tools.test.cjs (first 30 lines — to confirm Node built-in test runner usage)
@README.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add vitest.config.ts to neutralize npx vitest run</name>
  <files>vitest.config.ts</files>
  <action>
Create `vitest.config.ts` in the project root with the following content:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'

// This project uses Node's built-in test runner (node --test), not Vitest.
// This config exists solely to prevent `npx vitest run` from failing with
// "No test suite found" when it auto-discovers *.test.cjs files that use
// `require('node:test')` instead of Vitest's test API.
//
// Canonical test command: npm test
export default defineConfig({
  test: {
    include: [],
    passWithNoTests: true,
  },
})
```

Root cause being addressed: Vitest's default file discovery (`**/*.test.*`) picks up `get-shit-done/bin/gsd-tools.test.cjs` and `.opencode/get-shit-done/bin/gsd-tools.test.cjs`. These files use `require('node:test')` — Node's built-in test runner. When Vitest executes them, the Node `describe`/`test` blocks run as side effects (all 81 tests pass internally), but Vitest sees zero exported test suites and reports "No test suite found" with exit code 1. Setting `include: []` tells Vitest there are no Vitest test files, and `passWithNoTests: true` ensures a clean exit 0.
  </action>
  <verify>
Run both commands and confirm both exit 0:
```bash
npm test 2>&1 | tail -5
npx vitest run 2>&1 | tail -5
```
`npm test` should show 81 tests passing. `npx vitest run` should show 0 test files with a clean exit (no "Failed Suites").
  </verify>
  <done>`npm test` passes with 81 tests. `npx vitest run` exits 0 with no failures.</done>
</task>

<task type="auto">
  <name>Task 2: Document canonical test command in README</name>
  <files>README.md</files>
  <action>
Add a "Development" or "Testing" section to README.md (before the "Attribution" section at the bottom) that makes the canonical test command explicit:

```markdown
## Development

**Run tests:**

```bash
npm test
```

Tests use Node's built-in test runner (`node --test`). Vitest is not used — if you run `npx vitest run` it will exit cleanly with no tests (this is expected).
```

This makes the test story first-impression-safe for anyone cloning the repo. Do NOT rewrite existing README content — only add this new section.
  </action>
  <verify>
1. Confirm the new section exists: `grep -A 5 "## Development" README.md`
2. Confirm `npm test` is mentioned as the canonical command
3. Confirm the Vitest note is present
  </verify>
  <done>README.md contains a Development section documenting `npm test` as the canonical test command with a note explaining Vitest behavior.</done>
</task>

</tasks>

<verification>
```bash
# Both commands must exit 0
npm test
npx vitest run

# README must document the test command
grep "npm test" README.md
grep -i "vitest" README.md
```
</verification>

<success_criteria>
1. `npm test` exits 0 with 81 tests passing (unchanged behavior)
2. `npx vitest run` exits 0 with no "Failed Suites" error
3. README documents `npm test` as canonical, explains Vitest absence
4. No existing test behavior changed — only Vitest discovery neutralized
</success_criteria>

<output>
After completion, create `.planning/quick/005-test-runner-alignment-make-verification-/005-SUMMARY.md`
</output>
