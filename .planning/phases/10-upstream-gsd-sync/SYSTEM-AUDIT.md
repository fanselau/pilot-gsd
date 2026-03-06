# pilot-gsd System Audit
## Pre-Merge Classification for Upstream GSD Sync

**Date:** 2026-03-06
**Purpose:** Complete file classification before merging `upstream/main` into `dev`. This audit is the foundation for conflict resolution — every merge decision should reference this document.

**Baseline:** pilot-gsd is a fork of [get-shit-done](https://github.com/punchlab-dev/get-shit-done) v1.20.5, currently 707+ commits behind upstream. Our fork adds zero-interactivity (no AskUserQuestion), opencode-native frontmatter format, explicit model assignments, and the Pilot delegation layer.

---

## 1. System Architecture Overview

### Dual-Directory Structure

The repo has a deliberate **dual-directory pattern**:

| Directory | Purpose | Owner |
|-----------|---------|-------|
| `commands/` | Flat-namespace slash commands (`gsd-*.md`) — registered in opencode as `/gsd-*` commands | **Ours** (pilot uses `gsd-` prefix, not `gsd/` namespace) |
| `agents/` | Agent definitions — model-assigned, tool-restricted AI roles | **Ours** (opencode-native frontmatter) |
| `get-shit-done/` | Shared workflow library — workflows, references, templates, tooling | **Mixed** (tooling = upstream, prompting = ours) |
| `.opencode/` | Pilot-specific working copies — gitignored, contains pilot's modified agents, commands, and workflows | **Ours only** |
| `requirements/` | Pilot project requirements docs | **Ours only** |

### Upstream vs Our Command Namespace

**Critical difference**: Upstream uses a `commands/gsd/` subdirectory with short names (`commands/gsd/plan-phase.md` → `/gsd:plan-phase`). We use flat `commands/gsd-plan-phase.md` → `/gsd-plan-phase`. This means:
- Our commands use `gsd-` prefix (hyphen)
- Upstream commands use `gsd:` namespace (colon)
- These are **not directly compatible** — the file paths, frontmatter formats, and command invocation patterns differ

### Core Flow

```
User → /gsd-delegate (delegation prompt)
         ↓
    Reads STATE.md + ROADMAP.md
         ↓
    Outputs JSON execution plan
         ↓
    Pilot runner executes each step:
      - /gsd-plan-phase → gsd-planner agent
      - /gsd-execute-phase → gsd-executor agent
      - /gsd-verify-work → gsd-verifier agent
```

### Key Pilot Modifications (Preserved Throughout Fork)

1. **Zero-interactivity**: All `AskUserQuestion` calls removed from autonomous code paths
2. **Opencode-native frontmatter**: `model:`, `color:`, `tools: {key: bool}` format (not Claude-native `name:`, `allowed-tools: [list]`)
3. **Explicit model assignments**: Each agent has a specific model (e.g., `claude-opus-4-6`, `claude-sonnet-4-6`)
4. **Auto-mode guards**: Workflows check `yolo` mode flag, auto-approve decisions, skip interactive menus
5. **gsd-tools path**: Our workflows reference `.opencode/get-shit-done/bin/gsd-tools.cjs` (not `~/.claude/`)
6. **Delegation layer**: `commands/gsd-delegate.md` + `commands/pilot-judge.md` are pilot-exclusive

---

## 2. File-by-File Classification

### Legend
- `ours-only`: Exists only in our fork — keep as-is, no merge needed
- `upstream-take`: Upstream version should replace ours entirely
- `ours-modified`: Exists in both but intentionally diverged — our content wins, incorporate upstream structure where safe
- `shared`: Merge carefully, upstream improvements welcome

---

### Root-Level Files

| File | Classification | Notes |
|------|---------------|-------|
| `README.md` | `ours-modified` | Ours describes pilot-gsd fork; upstream is full GSD marketing README |
| `opencode.json` | `ours-only` | Pilot-specific opencode permissions config; doesn't exist in upstream |
| `package.json` | `ours-modified` | Name: `pilot-gsd`, author: `Luca Fanselau`, repo URL is ours; upstream has `get-shit-done-cc`. Keep our identity, take upstream scripts/deps |
| `package-lock.json` | `upstream-take` | Generated lockfile — take upstream |
| `.gitignore` | `ours-modified` | Take upstream version + add back our `.opencode/` ignore entry |
| `LICENSE` | `upstream-take` | MIT license — no changes needed |
| `CHANGELOG.md` | `upstream-take` | Upstream changelog — we don't maintain a fork-specific changelog |
| `SECURITY.md` | `upstream-take` | Upstream security policy |

---

### `agents/` Directory (11 files)

**Classification: `ours-modified`** — All agent files.

All 11 agent files exist in upstream AND our fork, but with fundamentally different frontmatter:

| Our frontmatter | Upstream frontmatter |
|----------------|---------------------|
| `model: "anthropic/claude-*"` | `name: gsd-planner` |
| `color: "#HEX"` | `color: green` (named colors) |
| `tools: { read: true, write: true }` | `tools: Read, Write, Bash` (comma list) |
| NO `name:` field | HAS `name:` field |
| References `.opencode/` paths in body | References `~/.claude/` paths in body |
| AskUserQuestion removed from body | May have AskUserQuestion in body |

**Rule:** ALWAYS OUR version for agents. Upstream adds new agents (gsd-codebase-mapper, gsd-debugger, gsd-integration-checker) that we already adopted. The body content may have useful upstream improvements, but review carefully — preserve our auto-mode guards.

| File | Status |
|------|--------|
| `agents/gsd-codebase-mapper.md` | `ours-modified` |
| `agents/gsd-debugger.md` | `ours-modified` |
| `agents/gsd-executor.md` | `ours-modified` |
| `agents/gsd-integration-checker.md` | `ours-modified` |
| `agents/gsd-phase-researcher.md` | `ours-modified` |
| `agents/gsd-plan-checker.md` | `ours-modified` |
| `agents/gsd-planner.md` | `ours-modified` |
| `agents/gsd-project-researcher.md` | `ours-modified` |
| `agents/gsd-research-synthesizer.md` | `ours-modified` |
| `agents/gsd-roadmapper.md` | `ours-modified` |
| `agents/gsd-verifier.md` | `ours-modified` |

---

### `commands/` Directory (33 files)

**Classification: Mixed**

Our flat `commands/gsd-*.md` format vs upstream's `commands/gsd/*.md` subdirectory format. These are **incompatible namespaces** — we cannot simply "take upstream" for any of these.

**Our frontmatter (opencode-native):**
```yaml
---
description: "Create detailed phase plan"
argument-hint: "[phase]"
tools:
  read: true
  write: true
  task: true
---
```

**Upstream frontmatter (Claude-native):**
```yaml
---
name: gsd:plan-phase
description: Create detailed phase plan
argument-hint: "[phase]"
agent: gsd-planner
allowed-tools:
  - Read
  - Write
  - AskUserQuestion
---
```

| File | Classification | Notes |
|------|---------------|-------|
| `commands/gsd-delegate.md` | `ours-only` | Pilot delegation layer — ALWAYS ours. Not in upstream |
| `commands/pilot-judge.md` | `ours-only` | Pilot evaluation prompt — ALWAYS ours. Not in upstream |
| `commands/gsd-verify-auto.md` | **Does not exist in `commands/`** — only in `.opencode/command/` | Pilot-specific browser UAT command |
| `commands/gsd-phase.md.deprecated` | `ours-only` | Deprecated command — safe to remove in merge |
| `commands/new-project.md.bak` | `ours-only` | Backup file — safe to remove |
| `commands/gsd-research-phase.md` | `ours-modified` | Our version has pilot-specific arg parsing and auto-mode |
| `commands/gsd-discuss-phase.md` | `ours-modified` | Our version has AskUserQuestion removed |
| `commands/gsd-execute-phase.md` | `ours-modified` | Our version lacks `--auto` flag arg-hint added in upstream |
| `commands/gsd-plan-phase.md` | `ours-modified` | Our version lacks new upstream options |
| `commands/gsd-add-phase.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-add-todo.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-audit-milestone.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-check-todos.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-cleanup.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-complete-milestone.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-debug.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-health.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-help.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-insert-phase.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-join-discord.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-list-phase-assumptions.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-map-codebase.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-new-milestone.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-new-project.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-pause-work.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-plan-milestone-gaps.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-progress.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-quick.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-reapply-patches.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-remove-phase.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-resume-work.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-set-profile.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-settings.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-update.md` | `ours-modified` | Frontmatter format differs |
| `commands/gsd-verify-work.md` | `ours-modified` | Frontmatter format differs |

---

### `get-shit-done/bin/` Directory

| File | Classification | Notes |
|------|---------------|-------|
| `get-shit-done/bin/gsd-tools.cjs` | `upstream-take` | **CRITICAL** — Our version is 5381 lines (slightly larger than upstream's 5324). Upstream has latest bug fixes and new tooling. This is the file that currently fails. |
| `get-shit-done/bin/gsd-tools.test.cjs` | `upstream-take` | Test file — take upstream version |

---

### `get-shit-done/workflows/` Directory (34 files)

**Classification: `ours-modified`** for all files that exist in both.

Key pattern: Our workflows have:
- All gsd-tools calls use `.opencode/get-shit-done/bin/gsd-tools.cjs` (not `~/.claude/`)
- AskUserQuestion removed from auto-mode paths
- Auto-advance behavior in yolo mode
- pilot-gsd fork notes in references files

Files with significant divergence (auto-mode guards, path differences):

| File | Classification | Key Pilot Modifications |
|------|---------------|------------------------|
| `get-shit-done/workflows/execute-phase.md` | `ours-modified` | gsd-tools path is `.opencode/` variant; auto-mode log-and-continue behavior |
| `get-shit-done/workflows/execute-plan.md` | `ours-modified` | gsd-tools path is `.opencode/` variant; NEW IN UPSTREAM — we already have our version |
| `get-shit-done/workflows/plan-phase.md` | `ours-modified` | gsd-tools path; AskUserQuestion removed |
| `get-shit-done/workflows/quick.md` | `ours-modified` | Auto-mode guards; our version is different from upstream's new quick.md |
| `get-shit-done/workflows/new-project.md` | `ours-modified` | AskUserQuestion removed; auto-mode |
| `get-shit-done/workflows/settings.md` | `ours-modified` | Auto-exits in yolo mode |
| `get-shit-done/workflows/pause-work.md` | `ours-modified` | Detects phase from STATE.md in auto mode |
| `get-shit-done/workflows/discuss-phase.md` | `ours-modified` | AskUserQuestion removed |
| `get-shit-done/workflows/verify-work.md` | `ours-modified` | AskUserQuestion removed; auto-approve |
| `get-shit-done/workflows/verify-phase.md` | `ours-modified` | Auto-approve in yolo mode |
| `get-shit-done/workflows/resume-project.md` | `ours-modified` | AskUserQuestion removed |
| `get-shit-done/workflows/transition.md` | `ours-modified` | AskUserQuestion removed |
| `get-shit-done/workflows/map-codebase.md` | `ours-modified` | Minor path differences |
| `get-shit-done/workflows/research-phase.md` | `ours-modified` | AskUserQuestion removed |
| `get-shit-done/workflows/complete-milestone.md` | `ours-modified` | Auto-mode guards |
| `get-shit-done/workflows/discovery-phase.md` | `ours-modified` | Our custom workflow |
| `get-shit-done/workflows/list-phase-assumptions.md` | `ours-modified` | Minor changes |
| `get-shit-done/workflows/diagnose-issues.md` | `ours-modified` | Our customized version |

Files that are new in upstream (we already have them — taken during previous sync work):

| File | Classification | Status |
|------|---------------|--------|
| `get-shit-done/workflows/add-phase.md` | `ours-modified` | We have it; check upstream for improvements |
| `get-shit-done/workflows/add-todo.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/audit-milestone.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/check-todos.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/cleanup.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/health.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/help.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/insert-phase.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/new-milestone.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/pause-work.md` | `ours-modified` | We have it; auto-mode guard in ours |
| `get-shit-done/workflows/plan-milestone-gaps.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/progress.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/quick.md` | `ours-modified` | We have it; significant differences |
| `get-shit-done/workflows/remove-phase.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/set-profile.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/settings.md` | `ours-modified` | We have it; auto-exit in yolo |
| `get-shit-done/workflows/update.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/verify-phase.md` | `ours-modified` | We have it |
| `get-shit-done/workflows/verify-work.md` | `ours-modified` | We have it |

---

### `get-shit-done/references/` Directory

| File | Classification | Notes |
|------|---------------|-------|
| `get-shit-done/references/checkpoints.md` | `ours-modified` | We added pilot-gsd fork note at bottom (Rule #5 in overview + section at end) — MUST preserve |
| `get-shit-done/references/continuation-format.md` | `ours-modified` | Minor modifications |
| `get-shit-done/references/git-integration.md` | `ours-modified` | References `.opencode/` path |
| `get-shit-done/references/questioning.md` | `ours-modified` | Minor modifications |
| `get-shit-done/references/tdd.md` | `ours-modified` | Minor modifications |
| `get-shit-done/references/verification-patterns.md` | `ours-modified` | Minor modifications |
| `get-shit-done/references/decimal-phase-calculation.md` | `shared` | Both have it, likely identical or close |
| `get-shit-done/references/git-planning-commit.md` | `shared` | Both have it |
| `get-shit-done/references/model-profile-resolution.md` | `shared` | Both have it |
| `get-shit-done/references/model-profiles.md` | `shared` | Both have it |
| `get-shit-done/references/phase-argument-parsing.md` | `shared` | Both have it |
| `get-shit-done/references/planning-config.md` | `shared` | Both have it |
| `get-shit-done/references/ui-brand.md` | `shared` | Both have it |
| `get-shit-done/references/code-quality.md` | `ours-only` | Not in upstream |
| `get-shit-done/references/deployment-patterns.md` | `ours-only` | Not in upstream |
| `get-shit-done/references/frontend-design.md` | `ours-only` | Not in upstream |
| `get-shit-done/references/stack-decisions.md` | `ours-only` | Not in upstream |
| `get-shit-done/references/testing-standards.md` | `ours-only` | Not in upstream |

---

### `get-shit-done/templates/` Directory

All templates exist in both our fork and upstream.

| File | Classification | Notes |
|------|---------------|-------|
| `get-shit-done/templates/config.json` | `ours-modified` | **Critical** — Our version has yolo mode, auto-advance=true, all gates=false, parallelization enabled. Upstream has research=true, interactive gates. ALWAYS ours. |
| `get-shit-done/templates/summary.md` | `ours-modified` | Our version may have pilot additions |
| `get-shit-done/templates/context.md` | `shared` | Safe to take upstream improvements |
| `get-shit-done/templates/milestone.md` | `shared` | Safe to take upstream improvements |
| `get-shit-done/templates/milestone-archive.md` | `ours-modified` | Check for differences |
| `get-shit-done/templates/roadmap.md` | `shared` | Safe to take upstream improvements |
| `get-shit-done/templates/state.md` | `shared` | Safe to take upstream improvements |
| `get-shit-done/templates/phase-prompt.md` | `ours-modified` | Check for differences |
| `get-shit-done/templates/project.md` | `shared` | Safe to take upstream improvements |
| `get-shit-done/templates/research.md` | `shared` | Safe to take upstream improvements |
| `get-shit-done/templates/requirements.md` | `shared` | Safe to take upstream improvements |
| `get-shit-done/templates/continue-here.md` | `shared` | Safe to take upstream improvements |
| `get-shit-done/templates/discovery.md` | `ours-modified` | Our custom discovery template |
| `get-shit-done/templates/DEBUG.md` | `shared` | Both have it |
| `get-shit-done/templates/UAT.md` | `shared` | Both have it |
| `get-shit-done/templates/debug-subagent-prompt.md` | `shared` | Both have it |
| `get-shit-done/templates/planner-subagent-prompt.md` | `shared` | Both have it |
| `get-shit-done/templates/summary-complex.md` | `shared` | Both have it |
| `get-shit-done/templates/summary-minimal.md` | `shared` | Both have it |
| `get-shit-done/templates/summary-standard.md` | `shared` | Both have it |
| `get-shit-done/templates/user-setup.md` | `shared` | Both have it |
| `get-shit-done/templates/verification-report.md` | `shared` | Both have it |

`get-shit-done/templates/codebase/` — All files exist in both, all `shared`:
- `architecture.md`, `concerns.md`, `conventions.md`, `integrations.md`, `stack.md`, `structure.md`, `testing.md`

`get-shit-done/templates/research-project/` — All files exist in both, all `shared`:
- `ARCHITECTURE.md`, `FEATURES.md`, `PITFALLS.md`, `STACK.md`, `SUMMARY.md`

---

### Infrastructure Directories

| File/Directory | Classification | Notes |
|----------------|---------------|-------|
| `bin/install.js` | `upstream-take` | Massive upstream rewrite (1776 lines). Handles npm package installation. ALWAYS upstream. |
| `hooks/gsd-check-update.js` | `upstream-take` | Upstream hook script |
| `hooks/gsd-statusline.js` | `upstream-take` | Upstream hook script |
| `scripts/build-hooks.js` | `upstream-take` | Build script |
| `.github/CODEOWNERS` | `upstream-take` | CI/GitHub config |
| `.github/FUNDING.yml` | `upstream-take` | GitHub funding config |
| `.github/ISSUE_TEMPLATE/bug_report.yml` | `upstream-take` | Issue template |
| `.github/ISSUE_TEMPLATE/feature_request.yml` | `upstream-take` | Issue template |
| `.github/pull_request_template.md` | `upstream-take` | PR template |
| `.github/workflows/auto-label-issues.yml` | `upstream-take` | CI workflow |
| `docs/USER-GUIDE.md` | `upstream-take` | Upstream documentation |
| `assets/gsd-logo-2000.png` | `upstream-take` | Asset file |
| `assets/gsd-logo-2000.svg` | `upstream-take` | Asset file |
| `assets/gsd-logo-2000-transparent.png` | `upstream-take` | Asset file |
| `assets/gsd-logo-2000-transparent.svg` | `upstream-take` | Asset file |
| `assets/terminal.svg` | `ours-modified` | Check if upstream has updated version |

---

### `.opencode/` Directory (entire tree) — `ours-only`

The `.opencode/` directory is **gitignored** in our `.gitignore` and is the working copy used by pilot when this repo is installed as a submodule. It does NOT exist in upstream.

**Structure:**
```
.opencode/
├── agents/          # Pilot's working copies of agents (same as agents/ but gitignored)
├── command/         # Pilot's working copies of commands (includes pilot-specific gsd-verify-auto.md)
├── get-shit-done/
│   ├── workflows/   # Pilot's working copies of workflows
│   ├── references/  # Pilot's working copies of references  
│   └── templates/   # Subset of templates used by pilot
├── bun.lock         # Pilot dependency lock
├── package.json     # Pilot package config
└── .gitignore       # Ensures .opencode itself is gitignored
```

**Special files in `.opencode/command/` not in `commands/`:**
- `gsd-verify-auto.md` — Pilot-exclusive browser-based automated UAT command

**Note on `.opencode/` symlinks:** Some files in `.opencode/command/` are symlinks to `commands/`:
- `gsd-cleanup.md` → `../../commands/gsd-cleanup.md`
- `gsd-delegate.md` → `../../commands/gsd-delegate.md`
- `gsd-health.md` → `../../commands/gsd-health.md`
- `gsd-reapply-patches.md` → `../../commands/gsd-reapply-patches.md`
- `pilot-judge.md` → `../../commands/pilot-judge.md`

---

### `requirements/` Directory — `ours-only`

| File | Classification |
|------|---------------|
| `requirements/prompt-hardening.md` | `ours-only` |
| `requirements/upstream-sync.md` | `ours-only` |

---

## 3. Conflict Resolution Rules

Priority order for resolving every conflict:

### Priority 1: Delegation and Agent Prompts (ALWAYS OURS)

- `commands/gsd-delegate.md` — The pilot delegation brain. NEVER overwrite.
- `commands/pilot-judge.md` — The pilot evaluation prompt. NEVER overwrite.
- `agents/*.md` (all 11) — Our frontmatter format and model assignments. NEVER overwrite frontmatter. Review body for upstream improvements cautiously.

### Priority 2: Infrastructure and Tooling (ALWAYS UPSTREAM)

- `get-shit-done/bin/gsd-tools.cjs` — Take upstream. This is the critical fix.
- `get-shit-done/bin/gsd-tools.test.cjs` — Take upstream.
- `bin/install.js` — Take upstream.
- `hooks/*.js`, `scripts/*.js` — Take upstream.
- `.github/**` — Take upstream.
- `CHANGELOG.md`, `SECURITY.md`, `LICENSE` — Take upstream.
- `docs/**`, `assets/**` (except terminal.svg) — Take upstream.
- `package-lock.json` — Take upstream.

### Priority 3: Workflow Prompts (OURS for prompting, upstream for new functionality)

For every `ours-modified` workflow file:
1. Start with our version
2. Check if upstream added new `<step>` sections or functionality
3. If upstream adds something genuinely new and useful, incorporate it
4. NEVER let upstream re-introduce AskUserQuestion calls
5. NEVER change gsd-tools paths from `.opencode/` to `~/.claude/`
6. PRESERVE all yolo mode guards and auto-mode behavior

### Priority 4: Commands (OURS for format, upstream for content improvements)

For every `ours-modified` command file:
1. Start with our version (preserve opencode-native frontmatter)
2. NEVER change to Claude-native frontmatter (`name:`, `allowed-tools:`)
3. NEVER add AskUserQuestion
4. Check upstream's equivalent `commands/gsd/*.md` for useful body improvements
5. New upstream commands in `commands/gsd/*.md` that we lack: add them with our frontmatter format

### Priority 5: References (MERGE BOTH)

For `ours-modified` references:
- Our checkpoints.md: MUST preserve pilot-gsd fork note (lines 779-780 + rule #5 in overview)
- Other references: incorporate upstream improvements, keep our additions

For `shared` references:
- Safe to take upstream version or merge

### Priority 6: Templates (MERGE CAREFULLY)

For `ours-modified` templates:
- `get-shit-done/templates/config.json` — ALWAYS OURS (yolo mode, gates off, parallelization)
- Other modified templates: review and incorporate upstream improvements that don't conflict

For `shared` templates:
- Safe to take upstream version

---

## 4. Upstream New Files Inventory

Files that exist in upstream but NOT in our current fork:

### New Commands (upstream `commands/gsd/` → needs to be converted to our `commands/gsd-*.md` format)

These upstream commands are new and need to be evaluated for inclusion:

| Upstream Path | Our Target Path | Action |
|--------------|-----------------|--------|
| `commands/gsd/add-todo.md` | `commands/gsd-add-todo.md` | Already have it |
| `commands/gsd/audit-milestone.md` | `commands/gsd-audit-milestone.md` | Already have it |
| `commands/gsd/check-todos.md` | `commands/gsd-check-todos.md` | Already have it |
| `commands/gsd/cleanup.md` | `commands/gsd-cleanup.md` | Already have it |
| `commands/gsd/debug.md` | `commands/gsd-debug.md` | Already have it |
| `commands/gsd/execute-phase.md` | `commands/gsd-execute-phase.md` | Already have it |
| `commands/gsd/health.md` | `commands/gsd-health.md` | Already have it |
| `commands/gsd/join-discord.md` | `commands/gsd-join-discord.md` | Already have it |
| `commands/gsd/plan-milestone-gaps.md` | `commands/gsd-plan-milestone-gaps.md` | Already have it |
| `commands/gsd/quick.md` | `commands/gsd-quick.md` | Already have it |
| `commands/gsd/reapply-patches.md` | `commands/gsd-reapply-patches.md` | Already have it |
| `commands/gsd/remove-phase.md` | `commands/gsd-remove-phase.md` | Already have it |
| `commands/gsd/set-profile.md` | `commands/gsd-set-profile.md` | Already have it |
| `commands/gsd/settings.md` | `commands/gsd-settings.md` | Already have it |
| `commands/gsd/update.md` | `commands/gsd-update.md` | Already have it |
| `commands/gsd/verify-work.md` | `commands/gsd-verify-work.md` | Already have it |
| `commands/gsd/new-project.md.bak` | `commands/new-project.md.bak` | Already have it |

**Conclusion:** All upstream new commands are already present in our fork. No new commands to add.

### New References (upstream has these, we do not)

| Upstream Path | Action |
|--------------|--------|
| (none — we have all upstream references plus 5 ours-only extras) | N/A |

### New Workflows (upstream has these, we already have them)

All 22 "new" upstream workflow files (e.g., `add-phase.md`, `add-todo.md`, etc.) already exist in our `get-shit-done/workflows/` directory. Our versions may have been added during previous sync work.

### New Tooling Files (need to take from upstream)

| Upstream Path | Action |
|--------------|--------|
| `get-shit-done/bin/gsd-tools.cjs` | TAKE UPSTREAM (we have old version) |
| `get-shit-done/bin/gsd-tools.test.cjs` | TAKE UPSTREAM (we have old version) |
| `package-lock.json` | TAKE UPSTREAM |
| `hooks/gsd-check-update.js` | TAKE UPSTREAM (we have it) |
| `hooks/gsd-statusline.js` | TAKE UPSTREAM (we have it) |
| `scripts/build-hooks.js` | TAKE UPSTREAM (we have it) |
| `.github/**` | TAKE UPSTREAM (we have it) |

---

## 5. Upstream Deleted Files Inventory

Files that upstream has **removed** since our merge-base:

| File | Action |
|------|--------|
| `.claude-plugin/marketplace.json` | Safe to remove — upstream removed it (already gone from our disk) |
| `.claude-plugin/plugin.json` | Safe to remove — upstream removed it (already gone from our disk) |
| `commands/gsd/consider-issues.md` | Upstream removed — we have `commands/gsd-consider-issues.md`? Check |
| `commands/gsd/create-roadmap.md` | Upstream removed |
| `commands/gsd/discuss-milestone.md` | Upstream removed |
| `commands/gsd/execute-plan.md` | Upstream removed (functionality folded into execute-phase) |
| `get-shit-done/references/plan-format.md` | Upstream removed — we may still have our version |
| `get-shit-done/references/principles.md` | Upstream removed — we may still have our version |
| `get-shit-done/references/research-pitfalls.md` | Upstream removed — we may still have our version |
| `get-shit-done/references/scope-estimation.md` | Upstream removed — we may still have our version |
| `get-shit-done/templates/issues.md` | Upstream removed — we do NOT have it on disk (never had it) |
| `get-shit-done/templates/milestone-context.md` | Upstream removed — we do NOT have it on disk |
| `get-shit-done/workflows/create-milestone.md` | Upstream removed |
| `get-shit-done/workflows/create-roadmap.md` | Upstream removed |
| `get-shit-done/workflows/discuss-milestone.md` | Upstream removed |

**Note:** The "deleted in upstream" list (`diff-filter=D`) shows files that were in the common ancestor but upstream removed. Since we never had most of these files on disk (e.g., `issues.md`, `milestone-context.md`), they have no impact on our merge.

For files like `plan-format.md`, `principles.md`, `research-pitfalls.md`, `scope-estimation.md` — these appear in the "deleted by upstream" list but don't currently exist in our `get-shit-done/references/`. This suggests they were deleted from the merge-base at some point and we never had them.

---

## 6. Key Risk Areas

### Risk 1: Command Namespace Mismatch (HIGH)

When `git merge upstream/main` runs, upstream will try to add files to `commands/gsd/` subdirectory. We have our files in flat `commands/gsd-*.md`. These will NOT conflict because they're different paths — but we'll need to:
- Ignore/discard the new `commands/gsd/*.md` additions from upstream (we already have our equivalents)
- NOT accidentally overwrite our `commands/gsd-*.md` flat files

**Resolution:** After merge, manually discard all files in `commands/gsd/` that are duplicates of our `commands/gsd-*.md` files. Keep any truly new commands.

### Risk 2: All 11 Agent Files Have Frontmatter Conflicts (HIGH)

Every agent file will conflict at merge because frontmatter formats are fundamentally incompatible:
- Our format: `model:`, `color: "#HEX"`, `tools: {key: bool}`
- Upstream: `name:`, `color: green`, `tools: Read, Write`

**Resolution:** For ALL agent files, choose OUR version. After resolving, review upstream body content for any improvements to incorporate while preserving our frontmatter.

### Risk 3: Workflow Files Have Both Upstream Improvements AND Our Patches (HIGH)

Files like `execute-phase.md`, `plan-phase.md`, `quick.md` have:
- Upstream: New features, better documentation, expanded functionality
- Ours: Auto-mode guards, gsd-tools path patches, AskUserQuestion removal

**Resolution:** For each file, use our version as base. Then manually review the diff between our version and upstream to identify new `<step>` sections or functional additions that don't conflict with our autonomy requirements.

### Risk 4: gsd-tools.cjs Path References (MEDIUM)

Our workflows call gsd-tools as `.opencode/get-shit-done/bin/gsd-tools.cjs`. Upstream uses `~/.claude/get-shit-done/bin/gsd-tools.cjs`. After taking upstream's new `gsd-tools.cjs`:
- The file itself goes to `get-shit-done/bin/gsd-tools.cjs` (correct)
- Our workflows already reference `.opencode/` copies which is correct for our install

**Resolution:** No action needed — our workflows correctly reference `.opencode/` copies.

### Risk 5: config.json Template Divergence (MEDIUM)

Our `get-shit-done/templates/config.json` has auto-advance mode, all gates off. Upstream default has interactive mode, gates on. If upstream overwrites this during merge, newly installed projects would get interactive mode.

**Resolution:** Mark as conflict, choose OUR version immediately.

### Risk 6: bin/install.js (LOW-MEDIUM)

Upstream's `bin/install.js` is essentially a new file (1776 lines vs our version). It handles npm package installation into user's project. Taking upstream is correct, but the install script may reference `~/.claude/` paths. After taking upstream version, scan for path references that would break pilot's `.opencode/` install pattern.

**Resolution:** Take upstream version, then scan for `~/.claude/` → `.opencode/` path differences that matter.

---

## 7. Merge Decision Quickref

For use during actual merge in Plan 02:

| Conflict Type | Decision |
|--------------|----------|
| `agents/*.md` frontmatter | OURS |
| `agents/*.md` body | OURS (review upstream for improvements) |
| `commands/gsd-*.md` frontmatter | OURS (opencode-native format) |
| `commands/gsd/` (new upstream namespace) | DISCARD (we have our equivalents) |
| `get-shit-done/bin/gsd-tools.cjs` | UPSTREAM |
| `get-shit-done/bin/gsd-tools.test.cjs` | UPSTREAM |
| `get-shit-done/workflows/*.md` | OURS base + review upstream additions |
| `get-shit-done/references/checkpoints.md` | OURS (must preserve fork note) |
| `get-shit-done/references/*.md` (modified) | OURS + upstream improvements |
| `get-shit-done/references/*.md` (shared) | UPSTREAM or MERGE |
| `get-shit-done/templates/config.json` | OURS (yolo mode, gates off) |
| `get-shit-done/templates/*.md` (shared) | UPSTREAM or MERGE |
| `bin/install.js` | UPSTREAM |
| `hooks/*.js`, `scripts/*.js` | UPSTREAM |
| `.github/**` | UPSTREAM |
| `package.json` | OURS identity + UPSTREAM scripts/deps |
| `package-lock.json` | UPSTREAM |
| `.gitignore` | UPSTREAM + add `.opencode/` ignore |
| `README.md` | OURS (fork-specific README) |
| `CHANGELOG.md`, `SECURITY.md`, `LICENSE` | UPSTREAM |
| `.opencode/**` | OURS ONLY (gitignored, not in upstream) |
| `requirements/**` | OURS ONLY |
| `opencode.json` | OURS ONLY |

---

## 8. Post-Merge Integrity Checklist

For Plan 03 (verification phase), confirm:

- [ ] `node get-shit-done/bin/gsd-tools.cjs help` exits 0
- [ ] `agents/*.md` have opencode-native frontmatter (`model:`, `color: "#HEX"`, `tools: {key: bool}`)
- [ ] `commands/gsd-delegate.md` is our pilot delegation prompt
- [ ] No `AskUserQuestion` in any workflow that's called by autonomous paths
- [ ] `get-shit-done/references/checkpoints.md` has pilot-gsd fork note at bottom
- [ ] `get-shit-done/templates/config.json` has `"mode": "yolo"` and all gates false
- [ ] `get-shit-done/workflows/execute-phase.md` references `.opencode/get-shit-done/bin/gsd-tools.cjs`
- [ ] No merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) in any file
- [ ] `.opencode/` is gitignored
- [ ] `commands/pilot-judge.md` exists and is intact
- [ ] No `commands/gsd/*.md` files leaked into our flat `commands/` namespace incorrectly

---

*Generated: 2026-03-06 by pre-merge system audit*
*Reference: requirements/upstream-sync.md*
*Next: Use this document to guide conflict resolution in 10-02-PLAN.md*
