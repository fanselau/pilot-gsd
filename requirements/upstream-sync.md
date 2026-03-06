# Upstream GSD Sync

## Problem
pilot-gsd is a fork of [get-shit-done](https://github.com/punchlab-dev/get-shit-done) (v1.20.5), currently 707 commits behind upstream. The upstream has significant improvements to tooling, bug fixes, and infrastructure — but our core prompting is intentionally diverged and must be preserved.

pilot currently fails on the gsd-tools.cjs JavaScript script that upstream bundles — our fork's version is outdated.

## Goal
Merge upstream/main into our fork's dev branch. After merge:
- Infrastructure/tooling files match upstream (gsd-tools.cjs, install.js, etc.)
- Our core prompting flow (quick → phase → milestone → delegation) is preserved exactly
- The system still works end-to-end as documented

## Strategy — Three-Phase with Subagents

**This is a complex merge. Use subagents heavily for each phase.**

### Phase A: Document Current System (Pre-Merge Audit)
Spawn a subagent to produce a comprehensive document of how pilot-gsd currently works:
- What each file does and its role in the system
- The core flow: delegation → planning → execution → verification
- Which files contain OUR custom prompting vs which are vanilla upstream
- File-by-file classification: `ours-only` | `upstream-take` | `ours-modified` | `shared`
- Save as `.planning/phases/XX-upstream-sync/SYSTEM-AUDIT.md`

### Phase B: The Merge
Use the audit to guide conflict resolution:
- **`ours-only` files**: Keep as-is, no merge needed
- **`upstream-take` files**: Accept upstream version entirely (gsd-tools.cjs, install.js, bin/*, any supporting scripts, new utility files)
- **`ours-modified` files**: These are the hard ones. Our prompts win, but incorporate upstream structural improvements (new sections, better formatting) where they don't conflict with our intent
- **`shared` files**: Merge carefully, preferring upstream for infrastructure, ours for prompting

Conflict resolution priority:
1. Our delegation prompt (`gsd-delegate.md`) — ALWAYS ours
2. Our agent prompts (agents/*.md) — ALWAYS ours  
3. Our workflow prompts (workflows/*.md) — ours for prompting, upstream for tooling/infrastructure improvements
4. Commands (commands/*.md) — ours for frontmatter format, upstream for new commands we don't have
5. References (references/*.md) — merge both, upstream improvements welcome
6. Scripts/tooling (bin/*, *.cjs, *.js) — ALWAYS upstream

### Phase C: Post-Merge Verification (Integrity Check)
Spawn a second subagent that takes the SYSTEM-AUDIT.md as input and verifies:
- Does the merged codebase still match the documented system architecture?
- Are all our core flows intact (delegation, planning, execution, verification)?
- Do the file roles still align with the audit's classification?
- Does `node get-shit-done/bin/gsd-tools.cjs help` work?
- Are there any broken `@` references?
- Flag any regressions or drift from our intended design

## Requirements

### Must Have
- [ ] SYSTEM-AUDIT.md produced before any merge work begins
- [ ] `git merge upstream/main` completed with all conflicts resolved
- [ ] gsd-tools.cjs works: `node get-shit-done/bin/gsd-tools.cjs help` exits 0
- [ ] Our delegation flow preserved (gsd-delegate.md is ours)
- [ ] Our agent prompts preserved (agents/*.md are ours)
- [ ] Our frontmatter format preserved (opencode-native, not claude-native)
- [ ] Our autonomy modifications preserved (yolo mode, auto-advance, no AskUserQuestion in autonomous paths)
- [ ] No merge conflict markers left in any file
- [ ] Post-merge integrity check passes against SYSTEM-AUDIT.md

### Nice to Have
- [ ] FORK-STATUS.md tracking which files diverge from upstream and why
- [ ] New upstream commands/references integrated where useful

## Technical Notes
- Upstream remote: `upstream` → `github.com/punchlab-dev/get-shit-done.git`
- Our fork: `origin` → `github.com/lucafanselau/pilot-gsd.git`
- Branch: `dev`
- Upstream remote already configured and fetched
- PAT token at `~/.pilot_github_token` for push access

## Do NOT
- Overwrite our custom agent prompts with upstream defaults
- Re-introduce AskUserQuestion calls in autonomous code paths
- Change our frontmatter format back to claude-native
- Break the .planning/ state or phase history
- Skip the pre-merge audit — it's the foundation for everything else
