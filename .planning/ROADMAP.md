# Roadmap

## Milestone: autonomy-fork-v1

### Phase 1: Agent Frontmatter Migration ✓
**Goal:** All 11 agent files use opencode-native frontmatter format with explicit model assignments
**Status:** Complete (verified 2026-02-20)
**Requirements:** AGENT-01, AGENT-02, AGENT-03, AGENT-04, AGENT-05, AGENT-06
**Plans:** 1 plan
Plans:
- [x] 01-01-PLAN.md — Migrate all 11 agent frontmatters (6 opus + 5 sonnet) and body text references
**Success Criteria:**
- All agent files have no `name:` field
- All agent files have `model:` field (opus or sonnet per assignment table)
- All agent files have `tools:` as YAML object (not comma-separated string)
- All agent files have `color:` as hex value
- No `/gsd:` or `~/.claude/` references remain in agent body text
- Agent files parse correctly (valid YAML frontmatter)

### Phase 2: Command Frontmatter Migration ✓
**Goal:** All 30 command files use opencode-native frontmatter format with AskUserQuestion removed
**Status:** Complete (verified 2026-02-20)
**Requirements:** CMD-01, CMD-02, CMD-03, CMD-04, CMD-05, CMD-06
**Plans:** 2 plans
Plans:
- [x] 02-01-PLAN.md — Migrate 16 non-AskUserQuestion command frontmatters and body text references
- [x] 02-02-PLAN.md — Migrate 14 AskUserQuestion command frontmatters (remove AskUserQuestion) + debug.md body fix
**Success Criteria:**
- All command files have no `name:` field
- All command files have `tools:` as YAML object (not `allowed-tools:` list)
- No command file includes `AskUserQuestion` in its tools
- No `@~/.claude/` references remain in command files
- No `/gsd:` references remain in command body text
- debug.md body text has autonomous selection replacing AskUserQuestion instruction
- Command files parse correctly (valid YAML frontmatter)

### Phase 3: Global Search-and-Replace + Templates ✓
**Goal:** All path references and slash command syntax updated across entire repo; config template updated
**Status:** Complete (verified 2026-03-03)
**Requirements:** WFLOW-17, WFLOW-18, TMPL-01
**Plans:** 1 plan
Plans:
- [x] 03-01-PLAN.md — Global sed replacements (path refs + slash commands) and config template update
**Success Criteria:**
- `grep -rn '~/.claude/' --include='*.md' --include='*.json'` returns 0 results (excluding .git/)
- `grep -rn '/gsd:' --include='*.md'` returns 0 results (excluding .git/)
- templates/config.json has yolo mode, all gates off, auto_advance true
- All `@` path references use `./.opencode/` prefix

### Phase 4: Workflow Interactivity Stripping ✓
**Goal:** All workflow AskUserQuestion calls are either removed or guarded with auto-mode bypasses
**Status:** Complete (2026-02-20)
**Requirements:** WFLOW-01 through WFLOW-16
**Plans:** 3 plans
Plans:
- [x] 04-01-PLAN.md — Strip interactivity from critical workflows (new-project.md, plan-phase.md)
- [x] 04-02-PLAN.md — Strip interactivity from medium-priority workflows (transition.md, quick.md, execute-plan.md)
- [x] 04-03-PLAN.md — Add auto-mode guards to 10 low-priority workflow files
**Success Criteria:**
- new-project.md Step 2a uses hardcoded defaults (no AskUserQuestion)
- plan-phase.md has auto-mode guards for CONTEXT.md check and existing plans
- transition.md auto-advances on incomplete plans in yolo mode
- quick.md errors on empty description in autonomous mode
- execute-plan.md auto-bypasses previous issues in auto mode
- All remaining AskUserQuestion calls in workflow files have auto-mode guards
- No unguarded AskUserQuestion exists in any autonomous code path

### Phase 5: References + Installer Documentation ✓
**Goal:** Documentation updated with fork-specific notes; installer has pilot-gsd comment
**Status:** Complete (2026-02-20)
**Requirements:** REF-01, REF-02, REF-03, INST-01
**Plans:** 1 plan
Plans:
- [x] 05-01-PLAN.md — Add fork notes to 3 reference files + installer comment
**Success Criteria:**
- model-profiles.md has note about frontmatter model field precedence
- checkpoints.md has rule #6 about auto-handled checkpoints
- questioning.md has note about autonomous mode skip
- bin/install.js has pilot-gsd fork documentation comment

### Phase 6: Workflow Enforcement - Execute-Phase & Plan-Phase Must Use gsd-tools

**Goal:** [To be planned]
**Depends on:** Phase 5
**Plans:** 0 plans

Plans:
- [ ] TBD (run /gsd-plan-phase 6 to break down)

**Details:**
[To be added during planning]

### Phase 7: Workflow Enforcement - Execute-Phase & Plan-Phase Must Use gsd-tools

**Goal:** [To be planned]
**Depends on:** Phase 6
**Plans:** 0 plans

Plans:
- [ ] TBD (run /gsd-plan-phase 7 to break down)

**Details:**
[To be added during planning]

### Phase 8: Workflow Enforcement - Execute-Phase & Plan-Phase Must Use gsd-tools

**Goal:** gsd-tools.cjs handles file paths in slug generation, supports --from-requirement flag, and searchPhaseInDir has fuzzy matching fallback for padding mismatches
**Depends on:** Phase 7
**Plans:** 2 plans

Plans:
- [ ] 08-01-PLAN.md — Fix slug generation for file paths + add --from-requirement flag to phase add
- [ ] 08-02-PLAN.md — Add fuzzy matching fallback to searchPhaseInDir

---
*Roadmap created: 2026-02-20*
*Last updated: 2026-03-03 after Phase 3 completion verification*
