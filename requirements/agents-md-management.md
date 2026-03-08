# AGENTS.md Management — Setup, Lessons, and Health

## Problem
AGENTS.md (the instruction file that tells coding agents HOW to work in a project) is a critical factor in autonomous execution quality. Research shows:
- Well-written instructions reduce runtime by 29% and token consumption by 17%
- BUT stale/wrong instructions produce worse results than no file at all
- LLM-generated instructions actually degrade performance by ~3% — human curation matters
- The sweet spot is <60 lines of non-inferable knowledge (commands, boundaries, gotchas)

Currently Pilot has no involvement in AGENTS.md. Users either write one manually or don't have one at all. Both are suboptimal.

## Goal
Three new GSD commands that give Pilot smart, AI-powered AGENTS.md management:
1. `gsd-setup-agents` — scaffold a minimal, high-value AGENTS.md from codebase analysis
2. `gsd-lessons` — extract actionable lessons from recent build sessions into a candidate buffer
3. `pilot doctor` gains an AI-powered AGENTS.md health check per registered project

## Requirements

### Must Have

#### `gsd-setup-agents` command (pilot-gsd)
- [ ] New command file: `commands/gsd-setup-agents.md`
- [ ] When invoked, the opencode session should:
  1. Analyze the project's actual codebase:
     - Read `package.json` / `Makefile` / `Cargo.toml` / etc. to extract exact build/test/lint commands
     - Detect framework + version from dependencies
     - Map top-level directory structure
     - Read existing linter/formatter configs to avoid duplicating their rules
     - Check for existing AGENTS.md / CLAUDE.md / .cursorrules and incorporate relevant content
  2. Generate a minimal AGENTS.md following this structure:
     ```markdown
     # AGENTS.md
     
     ## Commands
     (exact build, test, lint, typecheck, dev commands)
     (file-scoped variants where possible: test single file, lint single file)
     
     ## Stack
     (framework, language, key deps WITH versions — only what matters)
     
     ## Structure
     (top-level dirs and what lives where — brief)
     
     ## Boundaries
     (do NOT rules: files to never modify, patterns to avoid)
     ```
  3. Write the generated file but DO NOT commit it — leave it as an unstaged change for human review
  4. Print a summary of what was generated and why
- [ ] Target length: 20-40 lines. Absolute max 60. Only include what the agent CANNOT infer from reading the code itself.
- [ ] The command should have frontmatter with appropriate tools: `read`, `glob`, `grep`, `write`
- [ ] No `bash` tool needed — this is pure analysis + file generation

#### `gsd-lessons` command (pilot-gsd)
- [ ] New command file: `commands/gsd-lessons.md`
- [ ] When invoked with a project path, the opencode session should:
  1. Read the project's recent build history:
     - Check `.planning/` for recent phase summaries (especially failure notes)
     - Read recent VERIFICATION.md files for patterns
     - Look for repeated failure patterns or workarounds
  2. Extract actionable, specific lessons — NOT generic advice
     - Good: "vitest requires `pool: 'forks'` and `maxForks: 1` in this project to avoid OOM"
     - Bad: "Always write comprehensive tests"
  3. Write lessons to `.planning/LESSONS-CANDIDATES.md` (a buffer file, not AGENTS.md directly)
     - Each lesson should have a one-line summary and brief context
     - Mark each as `[ ] pending review`
  4. If AGENTS.md exists, cross-reference to avoid duplicating existing instructions
  5. Print the candidates for human review
- [ ] NEVER auto-commit lessons to AGENTS.md — this is always a candidate buffer
- [ ] The command needs tools: `read`, `glob`, `grep`, `write`

#### `pilot doctor` AGENTS.md health check (pilot CLI)
- [ ] Add an AGENTS.md health check to `pilot doctor` for each registered project
- [ ] The check should spawn a quick AI session (via opencode) that:
  1. Reads the project's AGENTS.md (if it exists)
  2. Reads the actual codebase state (package.json, project structure, key configs)
  3. Identifies drift: instructions that no longer match reality
     - Referenced commands that don't exist in package.json scripts
     - Referenced file paths that don't exist
     - Referenced package versions that don't match installed versions
     - Referenced patterns/frameworks that have been replaced
  4. Reports findings as warnings in the doctor output
  5. If no AGENTS.md exists, suggest running `pilot setup --agents` (or equivalent)
- [ ] This should NOT use hardcoded heuristics — the AI session does the analysis intelligently
- [ ] Keep the session short and cheap (use haiku/budget model)
- [ ] The doctor check should be skippable (`pilot doctor --skip-agents`) for speed

#### Integration with `pilot setup`
- [ ] `pilot setup <project>` should offer to run `gsd-setup-agents` as part of the setup flow
  - "No AGENTS.md found. Generate one? [Y/n]"
  - If yes, spawn the `gsd-setup-agents` session
  - Present the result for review before any commit
- [ ] `pilot setup` should NOT auto-generate without asking — always interactive

### Nice to Have
- [ ] `pilot lessons <project>` CLI shorthand that spawns `gsd-lessons` for a project
- [ ] After a job completes with verdict "failed", automatically note in the job record that lessons should be extracted (don't auto-run, just flag it)
- [ ] `gsd-setup-agents` detects monorepo structure and suggests per-package AGENTS.md files
- [ ] Support for CLAUDE.md alongside AGENTS.md (generate both, keeping CLAUDE.md for Claude-specific features)

## Technical Notes
- GSD commands live in `commands/` directory of the pilot-gsd repo
- Command frontmatter specifies available tools and argument hints
- The delegation AI (`gsd-delegate.md`) will need to know about these new commands for when they're invoked
- `pilot doctor` is in the pilot repo (`src/cli/commands/`), not pilot-gsd
- The doctor AGENTS.md check needs to spawn an opencode session — similar pattern to how `pilot-judge` works but simpler
- `.planning/LESSONS-CANDIDATES.md` is gitignored by default (lives in `.planning/`)
- Research reference: ETH Zurich study shows <60 lines optimal, commands are highest-value content, architecture descriptions don't help agents find files

## Do NOT
- Auto-commit anything to AGENTS.md — always buffer + human review
- Generate verbose AGENTS.md with architecture descriptions, coding philosophy, or generic best practices — these hurt more than help
- Use hardcoded heuristics for the doctor health check — let the AI analyze intelligently
- Make AGENTS.md management mandatory — projects should work fine without it
- Include rules that duplicate what linters/formatters already enforce
- Generate instructions about things the agent can infer from reading the code itself
