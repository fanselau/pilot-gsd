---
description: "Analyze codebase and generate a minimal, high-value AGENTS.md"
argument-hint: "[project-path]"
tools:
  read: true
  glob: true
  grep: true
  write: true
---

<objective>
Analyze the project's actual codebase and generate a minimal AGENTS.md containing only what coding agents CANNOT infer from reading the code itself.

Target: 20-40 lines. Absolute maximum: 60 lines. Every line must earn its place.

Principle: If a linter enforces it, a config defines it, or the code makes it obvious — leave it out. AGENTS.md is for the non-obvious knowledge that prevents wasted cycles.

Output: An AGENTS.md file written to the project root as an unstaged change for human review.
</objective>

<process>

<step name="check_existing">
## 1. Check for existing agent instruction files

Look for any existing instruction files:
```
glob("AGENTS.md")
glob("CLAUDE.md")
glob(".cursorrules")
glob(".github/copilot-instructions.md")
```

If found, read each one. Note what content exists — you will incorporate relevant parts rather than starting from scratch. Flag anything that looks stale or wrong for the summary.
</step>

<step name="detect_commands">
## 2. Detect build/test/lint/dev commands

Read the project's command configuration:
```
read("package.json")           # scripts section
read("Makefile")               # targets
read("Cargo.toml")             # workspace commands
read("pyproject.toml")         # scripts/tools
read("Taskfile.yml")           # task definitions
read("justfile")               # just commands
```

Read whichever exist. Extract exact commands for:
- **Build:** the production build command
- **Test:** full suite AND single-file variant (e.g., `vitest run path/to/test.ts`)
- **Lint:** full AND single-file variant (e.g., `eslint path/to/file.ts`)
- **Typecheck:** if applicable (e.g., `tsc --noEmit`)
- **Dev server:** local development command
- **Format:** if separate from lint

For each command, prefer the exact invocation (e.g., `npm run test` not "run tests").
Single-file variants are high-value — agents run these constantly.
</step>

<step name="detect_stack">
## 3. Detect framework + key dependencies

Read dependency files:
```
read("package.json")         # dependencies + devDependencies
read("requirements.txt")     # Python deps
read("Cargo.toml")           # Rust deps
read("go.mod")               # Go deps
read("pyproject.toml")       # Python deps
```

Extract:
- **Language** and version (from engines, .nvmrc, .python-version, rust-toolchain, etc.)
- **Framework** with version (Next.js 14, Django 5, Axum 0.7, etc.)
- **Key libraries** that affect how agents write code (ORM, test framework, state management)
- Only include dependencies that matter for agent context — skip utilities, transitive deps, and obvious standard-library packages
</step>

<step name="map_structure">
## 4. Map directory structure

Read the top-level directory listing and identify what lives where:
```
read(".")
```

Keep this brief. Agents can run `ls` themselves. Only note:
- Non-obvious directory purposes (e.g., `packages/shared` = shared types used by all services)
- Directories agents should know about but might miss
- Any monorepo workspace structure

Skip obvious directories (src, test, docs, node_modules, .git).
</step>

<step name="read_configs">
## 5. Read existing linter/formatter configs

Check for configuration files:
```
glob(".eslintrc*")
glob("eslint.config.*")
glob(".prettierrc*")
glob("prettier.config.*")
glob("biome.json")
glob("biome.jsonc")
glob(".editorconfig")
glob("tsconfig.json")
glob("tsconfig.*.json")
glob("rustfmt.toml")
glob(".clang-format")
glob("ruff.toml")
glob("pyproject.toml")  # [tool.ruff], [tool.black], etc.
```

Read each that exists. The purpose is to identify what is ALREADY enforced. If a linter or formatter handles it, you MUST NOT include it in AGENTS.md. The rule: never duplicate tooling that already runs.
</step>

<step name="detect_boundaries">
## 6. Identify boundary rules

Look for patterns that suggest "do not touch" zones:
- Generated files (look for `// @generated`, `# DO NOT EDIT`, auto-generated headers)
- Lock files (package-lock.json, yarn.lock, Cargo.lock, poetry.lock)
- Build output directories (dist/, build/, .next/, target/)
- Vendored code (vendor/, third_party/)
- Config files that should not be modified by agents

Also look for project-specific patterns:
- Are there files that follow strict naming conventions?
- Are there directories with special ownership (e.g., only CI modifies .github/)?
- Are there patterns agents commonly get wrong in this stack?

Only include boundaries that are non-obvious. Agents already know not to edit node_modules.
</step>

<step name="generate">
## 7. Generate AGENTS.md

Compose the file with exactly this structure:

```markdown
# AGENTS.md

## Commands
[exact build, test, lint, typecheck, dev commands]
[file-scoped variants where available]

## Stack
[framework, language, key deps WITH versions]

## Structure
[top-level dirs and what lives where — brief]

## Boundaries
[do NOT rules: files to never modify, patterns to avoid]
```

Rules for generation:
- **20-40 lines** target. If you exceed 60, trim aggressively — cut the least valuable lines.
- Every line must answer: "Would an agent waste time or make a mistake without knowing this?" If no, cut it.
- Use terse, scannable formatting. Bullet points over prose. Commands in backticks.
- Omit any section that would be empty (e.g., skip Boundaries if there are none worth noting).

If an existing AGENTS.md or CLAUDE.md was found, incorporate its still-valid content. Note in the summary what was kept, updated, or dropped.
</step>

<step name="write_file">
## 8. Write the file

Write the generated content to `AGENTS.md` in the project root.

**Do NOT commit the file.** Leave it as an unstaged change for human review.

If an existing AGENTS.md was found, write to the same path (overwriting the old one). The old version is recoverable via `git checkout -- AGENTS.md`.
</step>

<step name="print_summary">
## 9. Print summary

After writing, print a summary:
- Line count of the generated file
- What each section contains and why it was included
- What was deliberately omitted (and why — e.g., "Omitted import ordering — enforced by ESLint")
- If existing instruction files were found: what was incorporated vs. dropped vs. new
- Remind the user: "Review the generated AGENTS.md and commit when satisfied."
</step>

</process>

<output_format>
The generated AGENTS.md should look like this example (content will vary by project):

```markdown
# AGENTS.md

## Commands
- Build: `npm run build`
- Test all: `npm test`
- Test file: `vitest run path/to/test.ts`
- Lint all: `npm run lint`
- Lint file: `eslint path/to/file.ts`
- Typecheck: `tsc --noEmit`
- Dev: `npm run dev`

## Stack
- TypeScript 5.3, Node 20
- Next.js 14 (App Router)
- Prisma 5.8 (PostgreSQL)
- Vitest 1.2, React Testing Library

## Structure
- `src/app/` — Next.js App Router pages and layouts
- `src/lib/` — Shared utilities and helpers
- `prisma/` — Database schema and migrations

## Boundaries
- Never edit `prisma/migrations/` — use `prisma migrate dev` to generate
- Never modify files in `src/generated/` — auto-generated from GraphQL schema
```

This example is 22 lines — well within the 20-40 target.
</output_format>

<guardrails>
- NEVER auto-commit the generated file — always leave for human review
- NEVER exceed 60 lines — trim aggressively if needed
- NEVER duplicate rules that linters/formatters already enforce
- NEVER include generic advice ("write clean code", "follow best practices")
- NEVER include architecture descriptions that agents can infer from reading the code
- NEVER include coding philosophy or style preferences enforced by tooling
- If the project has very little non-inferable knowledge, a 10-line AGENTS.md is better than a padded 40-line one
</guardrails>
