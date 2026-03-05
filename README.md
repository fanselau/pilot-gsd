# pilot-gsd

GSD command definitions and agent prompts for the [pilot](https://github.com/lucafanselau/pilot) autonomous development pipeline. Fork of [get-shit-done](https://github.com/gsd-build/get-shit-done) v1.20.5, adapted for zero-interactivity.

## What This Is

This repo provides the slash commands, agent definitions, and workflow prompts that power pilot's phased development pipeline. It's a fork of GSD (Get Shit Done) modified for fully autonomous operation — no interactive prompts, explicit model assignments, and auto-mode defaults throughout.

## How It Works With Pilot

Pilot uses this as a git submodule. `pilot setup` symlinks from this repo into project `.opencode/` directories. The commands become available as `/gsd-*` slash commands. The delegation prompt (`commands/gsd-delegate.md`) is the brain — it reads project state and outputs execution plans for the runner.

## Repository Structure

```
pilot-gsd/
├── commands/           # Slash command definitions (33 commands)
│                       # Each .md defines frontmatter (tools, description) and prompt body
├── agents/             # Agent definitions (11 agents)
│                       # Each defines a role with model assignment and tool access
└── get-shit-done/      # Core system
    ├── workflows/      # Orchestration logic for each command
    ├── references/     # Shared reference docs (checkpoints, git, model profiles)
    ├── templates/      # Templates for planning artifacts (PLAN.md, SUMMARY.md, etc.)
    └── bin/            # gsd-tools.cjs utility (slug generation, phase matching)
```

## Available Commands

### Core Pipeline

| Command | Description |
|---------|-------------|
| `/gsd-new-project [--auto]` | Initialize project: research, requirements, roadmap |
| `/gsd-plan-phase <N> [--auto]` | Research + plan + verify for a phase |
| `/gsd-execute-phase <N>` | Execute all plans in parallel waves |
| `/gsd-verify-phase <N>` | Automated phase goal verification |
| `/gsd-quick [desc]` | Ad-hoc task with GSD guarantees |

### Delegation

| Command | Description |
|---------|-------------|
| `/gsd-delegate` | Reads project state, outputs JSON execution plan for pilot runner |

### Phase Management

| Command | Description |
|---------|-------------|
| `/gsd-add-phase` | Append phase to roadmap |
| `/gsd-insert-phase [N]` | Insert work between phases |
| `/gsd-remove-phase [N]` | Remove future phase, renumber |
| `/gsd-discuss-phase [N]` | Capture implementation decisions before planning |
| `/gsd-list-phase-assumptions [N]` | See intended approach before planning |

### Navigation & Utilities

| Command | Description |
|---------|-------------|
| `/gsd-progress` | Current position and next steps |
| `/gsd-health [--repair]` | Validate `.planning/` integrity |
| `/gsd-debug [desc]` | Systematic debugging with persistent state |
| `/gsd-pause-work` | Create handoff when stopping mid-phase |
| `/gsd-resume-work` | Restore from last session |
| `/gsd-map-codebase` | Analyze existing codebase |

### Milestone Management

| Command | Description |
|---------|-------------|
| `/gsd-new-milestone [name]` | Start next version cycle |
| `/gsd-audit-milestone` | Verify milestone definition of done |
| `/gsd-complete-milestone` | Archive milestone, tag release |
| `/gsd-plan-milestone-gaps` | Create phases to close gaps |

## Agent Architecture

| Agent | Model | Role |
|-------|-------|------|
| gsd-executor | claude-opus-4-6 | Implements plans with atomic commits |
| gsd-planner | claude-opus-4-6 | Creates phase plans with task breakdown |
| gsd-phase-researcher | claude-opus-4-6 | Researches implementation before planning |
| gsd-project-researcher | claude-opus-4-6 | Researches domain before roadmap |
| gsd-roadmapper | claude-opus-4-6 | Creates project roadmaps |
| gsd-debugger | claude-opus-4-6 | Investigates bugs with scientific method |
| gsd-plan-checker | claude-sonnet-4-6 | Verifies plans achieve phase goals |
| gsd-verifier | claude-sonnet-4-6 | Verifies phase goal achievement |
| gsd-integration-checker | claude-sonnet-4-6 | Cross-phase integration checks |
| gsd-research-synthesizer | claude-sonnet-4-6 | Synthesizes parallel research outputs |
| gsd-codebase-mapper | claude-sonnet-4-6 | Analyzes existing codebases |

> [!NOTE]
> Opus handles creation and deep reasoning (executor, planner, researcher, debugger). Sonnet handles verification and analysis (checker, verifier, synthesizer, mapper).

## Fork Differences from Upstream

- All `AskUserQuestion` calls removed — agents never block on stdin
- Explicit `model:` field in agent frontmatter (opus for creators, sonnet for checkers)
- `tools:` as YAML object format (not comma-separated string)
- Default config: yolo mode, all gates off, `auto_advance: true`
- Auto-mode guards on all workflow decision points

## Installation

This repo ([lucafanselau/pilot-gsd](https://github.com/lucafanselau/pilot-gsd)) is used as a submodule of [pilot](https://github.com/lucafanselau/pilot). You don't install it directly.

```bash
# Managed by pilot setup — you don't need to do this manually
pilot setup
```

## Upstream

Forked from [get-shit-done](https://github.com/gsd-build/get-shit-done) v1.20.5 by TÂCHES. See [upstream README](https://github.com/gsd-build/get-shit-done#readme) for the original project.

## License

[MIT](LICENSE)
