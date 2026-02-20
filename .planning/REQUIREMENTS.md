# Requirements: pilot-gsd Fork

**Defined:** 2026-02-20
**Core Value:** Zero interactivity — no AskUserQuestion call should ever block on stdin

## v1 Requirements

Requirements for the autonomy-first fork. Each maps to roadmap phases.

### Agent Frontmatter

- [x] **AGENT-01**: Remove `name:` field from all 11 agent files
- [x] **AGENT-02**: Add `model:` field (opus for 6 code/research agents, sonnet for 5 verification agents)
- [x] **AGENT-03**: Convert `tools:` from comma-separated string to object format in all 11 agents
- [x] **AGENT-04**: Change `color:` from name to hex value in all 11 agents
- [x] **AGENT-05**: Replace `/gsd:` with `/gsd-` in all agent body text
- [x] **AGENT-06**: Replace `~/.claude/` with `./.opencode/` in all agent body text

### Command Frontmatter

- [ ] **CMD-01**: Remove `name:` field from all 30 command files
- [ ] **CMD-02**: Convert `allowed-tools:` list to `tools:` object format in all 30 commands
- [ ] **CMD-03**: Remove `AskUserQuestion` from tools in all 16 commands that have it
- [ ] **CMD-04**: Replace `@~/.claude/` with `@./.opencode/` in all command execution_context blocks
- [ ] **CMD-05**: Replace `/gsd:` with `/gsd-` in all command body text

### Workflow Interactivity — Critical

- [ ] **WFLOW-01**: Replace AskUserQuestion rounds in new-project.md Step 2a with hardcoded defaults
- [ ] **WFLOW-02**: Add auto-mode guard for missing CONTEXT.md in plan-phase.md Step 4
- [ ] **WFLOW-03**: Add auto-mode guard for existing plans in plan-phase.md Step 6
- [ ] **WFLOW-04**: Auto-advance on incomplete plans in transition.md (yolo mode)

### Workflow Interactivity — Medium

- [ ] **WFLOW-05**: Error on empty description instead of prompting in quick.md
- [ ] **WFLOW-06**: Auto-bypass previous issues check in execute-plan.md
- [ ] **WFLOW-07**: Add auto-mode guard to new-project.md Step 5 (config settings)
- [ ] **WFLOW-08**: Add auto-mode guards to new-project.md Steps 7, 8+ (various AskUserQuestion calls)

### Workflow Interactivity — Low Priority

- [ ] **WFLOW-09**: Add auto-mode guard to add-todo.md (overlapping todos)
- [ ] **WFLOW-10**: Add auto-mode guard to check-todos.md (todo selection)
- [ ] **WFLOW-11**: Add auto-mode guard to cleanup.md (archive confirmation)
- [ ] **WFLOW-12**: Add auto-mode guards to complete-milestone.md (archive/branch decisions)
- [ ] **WFLOW-13**: Add auto-mode guard to discovery-phase.md
- [ ] **WFLOW-14**: Add auto-mode guards to new-milestone.md (multiple AskUserQuestion calls)
- [ ] **WFLOW-15**: Add auto-mode guard to execute-phase.md workflow (agent failure handling)
- [ ] **WFLOW-16**: Add auto-mode guard to pause-work.md (phase detection)

### Workflow Global Changes

- [ ] **WFLOW-17**: Replace `~/.claude/` with `./.opencode/` in all workflow files
- [ ] **WFLOW-18**: Replace `/gsd:` with `/gsd-` in all workflow files

### Templates

- [ ] **TMPL-01**: Update config.json template — yolo mode, all gates off, auto_advance true

### References

- [ ] **REF-01**: Add fork note to model-profiles.md about frontmatter model field
- [ ] **REF-02**: Add rule #6 to checkpoints.md about auto-handled checkpoints
- [ ] **REF-03**: Add fork note to questioning.md about autonomous mode skip

### Installer

- [ ] **INST-01**: Add pilot-gsd fork documentation comment to bin/install.js

### Debug Command Special Case

- [ ] **CMD-06**: Replace "Use AskUserQuestion for each:" in debug.md body with autonomous selection text

## v2 Requirements

(None planned yet)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Core plan/execute/verify logic changes | Upstream preservation requirement |
| File format changes (PLAN.md, STATE.md, etc.) | Upstream compatibility |
| gsd-tools.cjs modifications | Working correctly as-is |
| New agent roles or behaviors | Only frontmatter changes allowed |
| discuss-phase.md interactivity removal | Interactive by design, not in autonomous pipeline |
| Wave-based parallel execution changes | Working correctly as-is |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AGENT-01 | Phase 1 | Complete |
| AGENT-02 | Phase 1 | Complete |
| AGENT-03 | Phase 1 | Complete |
| AGENT-04 | Phase 1 | Complete |
| AGENT-05 | Phase 1 | Complete |
| AGENT-06 | Phase 1 | Complete |
| CMD-01 | Phase 2 | Pending |
| CMD-02 | Phase 2 | Pending |
| CMD-03 | Phase 2 | Pending |
| CMD-04 | Phase 2 | Pending |
| CMD-05 | Phase 2 | Pending |
| CMD-06 | Phase 2 | Pending |
| WFLOW-17 | Phase 3 | Pending |
| WFLOW-18 | Phase 3 | Pending |
| TMPL-01 | Phase 3 | Pending |
| WFLOW-01 | Phase 4 | Pending |
| WFLOW-02 | Phase 4 | Pending |
| WFLOW-03 | Phase 4 | Pending |
| WFLOW-04 | Phase 4 | Pending |
| WFLOW-05 | Phase 4 | Pending |
| WFLOW-06 | Phase 4 | Pending |
| WFLOW-07 | Phase 4 | Pending |
| WFLOW-08 | Phase 4 | Pending |
| WFLOW-09 | Phase 4 | Pending |
| WFLOW-10 | Phase 4 | Pending |
| WFLOW-11 | Phase 4 | Pending |
| WFLOW-12 | Phase 4 | Pending |
| WFLOW-13 | Phase 4 | Pending |
| WFLOW-14 | Phase 4 | Pending |
| WFLOW-15 | Phase 4 | Pending |
| WFLOW-16 | Phase 4 | Pending |
| REF-01 | Phase 5 | Pending |
| REF-02 | Phase 5 | Pending |
| REF-03 | Phase 5 | Pending |
| INST-01 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 36 total
- Mapped to phases: 36
- Unmapped: 0

---
*Requirements defined: 2026-02-20*
*Last updated: 2026-02-20 after Phase 1 completion*
