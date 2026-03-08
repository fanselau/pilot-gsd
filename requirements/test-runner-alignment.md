# Test Runner Alignment — Make Verification Commands Consistent

## Problem
The fork-cleanup phase landed, but verification is inconsistent:
- `npm test` passes
- `npx vitest run` fails immediately because `get-shit-done/bin/gsd-tools.test.cjs` is a Node built-in test file, not a Vitest suite

This is a release-polish issue and a pipeline issue. The project should have one clear, reliable test/verification story. Right now different commands give conflicting answers.

## Goal
Make pilot-gsd's test tooling consistent and unsurprising so release verification is trustworthy.

## Requirements

### Must Have
- [ ] Diagnose why `npx vitest run` fails in the current repo and document the root cause in the work summary
- [ ] Decide on one of these approaches and implement it cleanly:
  - **A.** Add proper Vitest compatibility/config so `npx vitest run` passes cleanly, or
  - **B.** Make it explicit that Vitest is not the project test runner and provide a canonical verification command that Pilot / docs can rely on
- [ ] Whichever approach is chosen, eliminate the current confusing state where `npm test` passes but raw `npx vitest run` fails with "No test suite found"
- [ ] Update any release-facing docs or scripts that currently imply the wrong verification command
- [ ] Ensure the chosen verification command passes at the end

### Nice to Have
- [ ] If Vitest compatibility is cheap and clean, prefer it over documentation-only clarification
- [ ] Keep the solution minimal — no large test-framework migration unless truly necessary

## Technical Notes
- Current `package.json` uses: `node --test get-shit-done/bin/gsd-tools.test.cjs`
- The failing path is `get-shit-done/bin/gsd-tools.test.cjs`
- This repo appears to use Node's built-in test runner, not Vitest
- We want a first-impression-safe test story for public release and Pilot verification

## Do NOT
- Do NOT rewrite the entire test suite unless unavoidable
- Do NOT add noisy test infrastructure just for fashion
- Do NOT leave the repo in a state where two obvious verification commands disagree without explanation
