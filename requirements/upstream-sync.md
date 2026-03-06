# Upstream GSD Sync

## Problem
pilot-gsd is a fork of [get-shit-done](https://github.com/punchlab-dev/get-shit-done) (v1.20.5), currently 707 commits behind upstream. The upstream has significant improvements:
- Context-proxy orchestration flow
- STATE.md regeneration fixes
- Project CLAUDE.md + skill discovery for subagent spawn points
- gsd-tools.cjs fixes and simplifications
- Executor ROADMAP.md/REQUIREMENTS.md per-plan updates
- Milestone audit tightening
- Various bug fixes (#657, #671, #672, #217)

pilot currently fails on the gsd-tools.cjs JavaScript script that upstream bundles — our fork's version is outdated and diverged.

## Goal
Merge upstream/main into our fork's dev branch, resolving conflicts while preserving our autonomy-focused prompt modifications. After merge:
- gsd-tools.cjs matches upstream (or is a clean superset)
- All upstream bug fixes are incorporated
- Our custom prompt hardening, frontmatter migrations, and interactivity stripping are preserved
- `node get-shit-done/bin/gsd-tools.cjs help` works without errors

## Requirements

### Must Have
- [ ] Merge upstream/main into dev branch with conflict resolution
- [ ] gsd-tools.cjs works: `node get-shit-done/bin/gsd-tools.cjs help` exits 0
- [ ] All upstream workflow/reference improvements incorporated
- [ ] Our autonomy modifications preserved (yolo mode, auto-advance, no AskUserQuestion in autonomous paths)
- [ ] Our frontmatter format preserved (opencode-native, not claude-native)
- [ ] `git diff upstream/main -- commands/` shows only our intentional divergences
- [ ] No merge conflict markers left in any file

### Nice to Have
- [ ] Document which files are intentionally diverged from upstream and why
- [ ] Create a FORK-STATUS.md tracking divergence points

## Technical Notes
- Upstream remote: `upstream` → `https://github.com/punchlab-dev/get-shit-done.git`
- Our fork: `origin` → `github.com/lucafanselau/pilot-gsd.git`
- Branch: `dev`
- Key divergence areas: commands/ (frontmatter format), agents/ (model assignments), workflows/ (interactivity stripping), get-shit-done/bin/gsd-tools.cjs
- The fork was taken at v1.20.5 but the commit history diverged much earlier due to rebasing

## Do NOT
- Overwrite our custom agent prompts with upstream defaults
- Re-introduce AskUserQuestion calls in autonomous code paths
- Change our frontmatter format back to claude-native
- Break the .planning/ state or phase history
