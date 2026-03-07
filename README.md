# pilot-gsd

An autonomy-first development system for the [Pilot](https://github.com/lucafanselau/pilot) autonomous development pipeline, forked from [Get Shit Done](https://github.com/gsd-build/get-shit-done) by [TÂCHES](https://github.com/gsd-build).

## What This Is

pilot-gsd is built on top of GSD (Get Shit Done), the meta-prompting and context engineering framework by TÂCHES (Lex Christopherson). GSD provides a structured system for AI-driven phased development — research, planning, execution, and verification — using slash commands, agent definitions, and workflow orchestration.

The key difference: **GSD is designed for human-interactive use** with Claude Code, OpenCode, or Gemini CLI. A human sits at the terminal, answers questions, makes decisions at checkpoints, and steers direction. **pilot-gsd strips all interactivity** and makes every workflow autonomous — designed to be driven by a machine ([Pilot](https://github.com/lucafanselau/pilot)), not a human at a terminal.

This is a real fork, not a thin wrapper. It modifies agent behavior, workflow control flow, frontmatter format, path conventions, and default configuration. The changes touch dozens of files across commands, agents, workflows, references, and templates.

## Key Differences from Upstream GSD

| Aspect | Upstream GSD | pilot-gsd |
|--------|-------------|-----------|
| Interactivity | `AskUserQuestion` prompts for human input | All removed or guarded — agents never block on stdin |
| Model assignment | Inherited or implicit | Explicit `model:` field (opus for creators, sonnet for checkers) |
| Frontmatter format | Claude-native (`name:`, `color: green`, `tools: Read`) | opencode-native (`model:`, `color: #HEX`, `tools: {key: bool}`) |
| Config defaults | Interactive mode with confirmation gates | Yolo mode, all gates off, `auto_advance: true` |
| Path convention | `~/.claude/` | `.opencode/` |
| Slash commands | `/gsd:*` (colon) | `/gsd-*` (hyphen) |
| New commands | — | `gsd-delegate` (runner integration), `gsd-judge` (execution verdict) |
| Checkpoint handling | Blocks for human verification/decisions | Auto-approves verify, auto-selects first option for decisions |

## How It Works

pilot-gsd is used as a git submodule by [Pilot](https://github.com/lucafanselau/pilot):

1. `pilot setup` symlinks from this repo into the target project's `.opencode/` directories
2. Commands become available as `/gsd-*` slash commands
3. The delegation prompt (`commands/gsd-delegate.md`) reads project state and outputs JSON execution plans for the Pilot runner
4. The runner spawns agents that execute plans autonomously through the full GSD lifecycle

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
| `/gsd-verify-work <N>` | Automated phase goal verification |
| `/gsd-quick [desc]` | Ad-hoc task with GSD guarantees |

### Delegation

| Command | Description |
|---------|-------------|
| `/gsd-delegate` | Reads project state, outputs JSON execution plan for Pilot runner |
| `/gsd-judge` | Reads execution results and produces a verdict |

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

## Installation

This repo ([lucafanselau/pilot-gsd](https://github.com/lucafanselau/pilot-gsd)) is used as a git submodule of [Pilot](https://github.com/lucafanselau/pilot) — you don't install it directly.

```bash
# Managed by pilot setup — you don't need to do this manually
pilot setup
```

> [!NOTE]
> The `get-shit-done-cc` bin name in `package.json` is inherited from upstream for compatibility with the shared installer infrastructure. This does not affect how pilot-gsd is used — it's always accessed through the Pilot CLI.

## Attribution

Forked from [get-shit-done](https://github.com/gsd-build/get-shit-done) v1.20.5 by TÂCHES (Lex Christopherson). The original GSD project is the foundation this system is built on — its meta-prompting design, phased workflow architecture, and context engineering patterns are what make pilot-gsd possible.

See the [upstream README](https://github.com/gsd-build/get-shit-done#readme) for the original project documentation.

## License

[MIT](LICENSE)
