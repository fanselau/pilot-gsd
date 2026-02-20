# pilot-gsd — Autonomy-First GSD Fork

## What This Is

A fork of `gsd-build/get-shit-done` (v1.20.5) that makes GSD fully autonomous for the Pilot CLI. Every interactive prompt (`AskUserQuestion`) is replaced with autonomous defaults or auto-mode guards, explicit model assignments are added to agent frontmatter, and all path references are updated for Pilot's per-project symlink install model (`.opencode/` instead of `~/.claude/`).

## Core Value

Zero interactivity — no `AskUserQuestion` call should ever block on stdin. If no human is watching, the pipeline must keep moving.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Agent frontmatter: remove `name:`, add `model:`, convert `tools:` to object format, hex colors (11 files)
- [ ] Command frontmatter: remove `name:`, convert `allowed-tools:` to `tools:` object, remove `AskUserQuestion` (30 files)
- [ ] Global path replacement: `~/.claude/` to `./.opencode/` across all files
- [ ] Global slash command syntax: `/gsd:` to `/gsd-` across all files
- [ ] Template config.json: all gates off, yolo mode, auto_advance true
- [ ] Workflow new-project.md: replace AskUserQuestion rounds with hardcoded defaults
- [ ] Workflow plan-phase.md: add auto-mode guards for missing CONTEXT.md and existing plans
- [ ] Workflow transition.md: auto-advance on incomplete plans in yolo mode
- [ ] Workflow quick.md: error on empty description instead of prompting
- [ ] Workflow execute-plan.md: auto-bypass previous issues in auto mode
- [ ] Other workflow files: add auto-mode guards to remaining AskUserQuestion calls
- [ ] References: add fork notes to model-profiles.md, checkpoints.md, questioning.md
- [ ] Installer: add pilot-gsd fork documentation comment

### Out of Scope

- Core plan/execute/verify logic — preserve upstream behavior
- PLAN.md / SUMMARY.md / STATE.md / ROADMAP.md file formats — no changes
- Atomic commit patterns and git integration — no changes
- Wave-based parallel execution — no changes
- Checkpoint type definitions — no changes
- gsd-tools.cjs functionality — no changes
- discuss-phase.md interactive behavior — by design
- Agent role definitions and instructions — only frontmatter changes

## Context

- Upstream: `gsd-build/get-shit-done` v1.20.5
- Install model: Pilot CLI symlinks from this repo into project `.opencode/` directories
- `AskUserQuestion` is Category A stuck — 50% of all Pilot incidents
- Two model tiers: opus for code/architecture/research agents, sonnet for verification/checking agents
- ~59 files require changes across agents, commands, workflows, templates, references, and installer

## Constraints

- **Upstream compatibility**: Preserve all core logic, only change frontmatter format and interactivity
- **Path model**: All `@` references must use `@./.opencode/...` (relative to project root)
- **Frontmatter format**: Must match opencode's expected format (no `name:`, object `tools:`, `model:` field)
- **No new features**: This is a configuration/format migration, not feature development

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| opus for 6 agents, sonnet for 5 | Code-writing agents need best reasoning; verification follows structured patterns | — Pending |
| All gates off in config.json | Autonomous means autonomous; queue runner handles retries | — Pending |
| Remove AskUserQuestion from all commands | Prevents stdin hang (Category A stuck) | — Pending |
| `.opencode/` paths instead of `~/.claude/` | Pilot symlinks per-project, not global | — Pending |

---
*Last updated: 2026-02-20 after initialization*
