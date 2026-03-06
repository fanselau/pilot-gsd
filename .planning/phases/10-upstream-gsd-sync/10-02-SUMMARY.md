---
phase: 10-upstream-gsd-sync
plan: "02"
subsystem: infra
tags: [git, merge, upstream, conflict-resolution, gsd-tools]

# Dependency graph
requires:
  - phase: 10-upstream-gsd-sync/10-01
    provides: "SYSTEM-AUDIT.md with file-by-file classification and conflict resolution rules"
provides:
  - "Clean merge commit: upstream/main (707 commits) merged into dev"
  - "gsd-tools.cjs: upstream version with bug fixes now in place"
  - "All pilot frontmatter preserved: model:, color:#HEX, tools:{key:bool} format"
  - "All pilot auto-mode guards preserved in workflows"
  - "All pilot customizations preserved: gsd-delegate.md, pilot-judge.md, checkpoints.md fork note"
  - "pre-upstream-sync-backup branch: rollback point if needed"
affects:
  - 10-upstream-gsd-sync/10-03 (verification phase - should pass against integrity checklist)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Conflict resolution by SYSTEM-AUDIT.md classification: ours-only/upstream-take/ours-modified/shared"
    - "Safety branch before merge: pre-upstream-sync-backup"
    - "Batch resolution: all agents at once (ours), all workflows at once (ours), tooling at once (upstream)"

key-files:
  created:
    - ".planning/phases/10-upstream-gsd-sync/10-02-SUMMARY.md"
  modified:
    - "get-shit-done/bin/gsd-tools.cjs (upstream version)"
    - "bin/install.js (upstream version)"
    - "CHANGELOG.md (upstream version)"
    - "docs/USER-GUIDE.md (upstream version)"
    - ".gitignore (upstream + .opencode/ entry added)"
    - "package.json (our identity + upstream scripts/deps)"
    - "get-shit-done/references/*.md (shared files: upstream; ours-modified: ours)"
    - "get-shit-done/templates/*.md (shared files: upstream; config.json: ours)"
    - "get-shit-done/workflows/*.md (all ours)"
    - "agents/*.md (all 11: ours)"
    - ".planning/phases/ (renamed 10-upstream-sync -> 10-upstream-gsd-sync)"

key-decisions:
  - "All 11 agent files: took ours — pilot opencode-native frontmatter must be preserved"
  - "gsd-tools.cjs: took upstream — this is the critical bug fix (5324-line upstream version)"
  - "All workflows: took ours — auto-mode guards and .opencode/ paths must be preserved"
  - "commands/gsd/ subdirectory: discarded all — we have equivalents in flat commands/gsd-*.md"
  - "config.json template: always ours — yolo mode + gates-off is core to pilot operation"
  - "checkpoints.md: ours — fork note at bottom must be preserved"
  - "package.json: manual merge — our name/description/author/repo + upstream scripts"
  - "pause-work.md: manual resolution required — 8-char conflict markers from rename collision"
  - "Planning directory: renamed from 10-upstream-sync to 10-upstream-gsd-sync during merge"

patterns-established:
  - "Upstream merge pattern: safety branch + --no-commit + resolve-by-category + verify"
  - "Batch conflict resolution: all files in same category resolved in one git command"

requirements-completed: []

# Metrics
duration: 7min
completed: 2026-03-06
---

# Phase 10 Plan 02: Upstream Merge Summary

**Clean merge of 707 upstream commits with all pilot customizations preserved: gsd-tools.cjs updated to upstream bug-fix version, all 11 agent files retain opencode-native frontmatter, all workflows retain auto-mode guards**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-06T10:00:42Z
- **Completed:** 2026-03-06T10:07:59Z
- **Tasks:** 1
- **Files modified:** ~30+ (merge commit)

## Accomplishments
- Created `pre-upstream-sync-backup` branch as rollback point
- Executed `git merge upstream/main --no-commit` to stage all clean merges and expose conflicts
- Resolved all 95+ conflict files using SYSTEM-AUDIT.md classification as deterministic guide
- Finalized merge commit with clean state — zero conflict markers remaining
- gsd-tools.cjs now running upstream version (critical bug fix)
- All 11 agent files verified with pilot opencode-native frontmatter

## Task Commits

Each task was committed atomically:

1. **Task 1: Execute merge and resolve all conflicts** - `3ef4df2` (merge)

**Plan metadata:** _(this commit)_

## Files Created/Modified
- `get-shit-done/bin/gsd-tools.cjs` — Updated to upstream version (bug fixes)
- `bin/install.js` — Updated to upstream version
- `CHANGELOG.md` — Updated to upstream version
- `docs/USER-GUIDE.md` — Updated to upstream version
- `.gitignore` — Upstream version + `.opencode/` entry added back
- `package.json` — Manual merge: our identity + upstream scripts
- `get-shit-done/references/` (8 shared files) — Upstream versions
- `get-shit-done/references/` (3 ours-modified) — Our versions preserved
- `get-shit-done/templates/` (6 shared files) — Upstream versions
- `get-shit-done/templates/config.json` — Our version preserved (yolo mode)
- `get-shit-done/templates/phase-prompt.md` — Our version preserved
- `get-shit-done/workflows/` (31 files) — All our versions preserved
- `agents/` (11 files) — All our versions preserved (pilot frontmatter)
- `.planning/phases/10-upstream-gsd-sync/` — Directory renamed from 10-upstream-sync

## Decisions Made

1. **All agents: ours** — opencode-native frontmatter is non-negotiable; upstream Claude-native format is incompatible.

2. **gsd-tools.cjs: upstream** — This is the critical fix. Our version (5381 lines) was outdated; upstream (5324 lines) has bug fixes that make the tooling work.

3. **All workflows: ours** — Auto-mode guards, `.opencode/` path references, and AskUserQuestion removal are all baked in. Taking upstream would break pilot's zero-interactivity guarantee.

4. **commands/gsd/ subdirectory: discarded** — Upstream moved commands to `commands/gsd/*.md` but we use flat `commands/gsd-*.md`. Every upstream command was already present in our flat namespace. All 17 upstream `commands/gsd/` files removed.

5. **config.json: ours** — `yolo` mode + all `gates: false` is the foundation of pilot's zero-interactivity operation.

6. **package.json: manual merge** — Kept our `name: pilot-gsd`, `description`, `author: Luca Fanselau`, `repository/homepage/bugs` pointing to our fork. Kept upstream `devDependencies` and `scripts`. Test command stayed `.test.cjs` (file exists as .cjs, not .js).

7. **pause-work.md: manual resolution** — Git used 8-character conflict markers (`<<<<<<<< HEAD`) instead of 7 due to the "rename involved in collision" situation. Required manual extraction of our content.

8. **Planning directory rename: included in merge commit** — Pre-existing rename from `10-upstream-sync/` to `10-upstream-gsd-sync/` was staged and included in the merge commit as renames.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] pause-work.md: 8-character conflict markers from rename collision**
- **Found during:** Task 1 (Step 6 - clean up conflict markers check)
- **Issue:** Git generated `<<<<<<<< HEAD` (8 chars) for the pause-work.md rename collision conflict, which wasn't cleared by `git checkout --ours`
- **Fix:** Manually rewrote the file with our version's content (lines 5-148 of original conflict, OUR side)
- **Files modified:** `get-shit-done/workflows/pause-work.md`
- **Verification:** `grep -n '<<<<<<<' pause-work.md` returns 0 results
- **Committed in:** 3ef4df2 (merge commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - unusual git conflict format requiring manual resolution)
**Impact on plan:** No scope creep. Manual extraction of our file content was equivalent to `git checkout --ours`, just different mechanism.

## Issues Encountered

None beyond the pause-work.md 8-char conflict marker issue documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

The merge is complete. Plan 03 (verification) should now pass the integrity checklist from SYSTEM-AUDIT.md Section 8:

- ✅ `node get-shit-done/bin/gsd-tools.cjs` — runs correctly (verified during this plan)
- ✅ `agents/*.md` have opencode-native frontmatter — verified (all 11 files)  
- ✅ `commands/gsd-delegate.md` is our pilot delegation prompt — verified
- ✅ `get-shit-done/references/checkpoints.md` has pilot-gsd fork note at bottom — verified
- ✅ `get-shit-done/templates/config.json` has `"mode": "yolo"` — verified
- ✅ No merge conflict markers in any file — verified
- ✅ `.opencode/` is gitignored — `.gitignore` has the entry
- ✅ `commands/pilot-judge.md` exists — not modified by merge
- ✅ No `commands/gsd/*.md` leaked into our flat namespace — all discarded

**Ready for:** `10-03-PLAN.md` (post-merge integrity verification)

---
*Phase: 10-upstream-gsd-sync*
*Completed: 2026-03-06*
