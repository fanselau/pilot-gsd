---
phase: 11-fork-release-cleanup-identity-attribution-security-hygiene-and-readme
verified: 2026-03-07T18:18:14Z
status: gaps_found
score: 16/17 must-haves verified
gaps:
  - truth: "Public-facing docs are internally consistent (version, name, links match)"
    status: partial
    reason: "README.md is consistent on name and links but does not include the 0.1.0 version reference required by must_haves key_links."
    artifacts:
      - path: "README.md"
        issue: "No `0.1.0` string found, so README -> package.json version key link is not satisfied."
    missing:
      - "Add explicit fork version `0.1.0` to README.md (or relax the must_haves key_link pattern)."
  - truth: "Phase 11 requirement IDs are traceable in REQUIREMENTS.md"
    status: failed
    reason: "All requirement IDs declared in Phase 11 plans are absent from .planning/REQUIREMENTS.md, so ID-level coverage cannot be formally verified."
    artifacts:
      - path: ".planning/REQUIREMENTS.md"
        issue: "No IDENT-/HYGIENE-/SEC-/README-/VERIFY- IDs and no Phase 11 mapping."
      - path: "requirements/fork-release-cleanup-and-readme.md"
        issue: "Contains prose requirements but no explicit ID definitions matching plan frontmatter IDs."
    missing:
      - "Define IDENT-01..IDENT-05, HYGIENE-01..HYGIENE-05, SEC-01..SEC-04, README-01..README-04, VERIFY-01..VERIFY-03 in REQUIREMENTS.md."
      - "Add Phase 11 traceability mapping for these IDs in REQUIREMENTS.md."
---

# Phase 11: Fork Release Cleanup — Identity, Attribution, Security Hygiene, and README Verification Report

**Phase Goal:** pilot-gsd reads as an intentional, polished fork product — clean identity across all metadata, distinct versioning, honest README positioning, no tracked secrets, no confusing upstream references
**Verified:** 2026-03-07T18:18:14Z
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | SECURITY.md has fork-appropriate contact info, not upstream email | ✓ VERIFIED | `SECURITY.md:7` routes to `lucafanselau/pilot-gsd` advisories; `SECURITY.md:33` preserves upstream referral; no `security@gsd.build` found |
| 2 | CODEOWNERS and FUNDING.yml reference fork owner, not upstream owner | ✓ VERIFIED | `.github/CODEOWNERS:2` is `@lucafanselau`; `.github/FUNDING.yml:1` is `github: lucafanselau`; no `glittercowboy` in fork-owned metadata files |
| 3 | package.json version uses fork-distinct scheme (0.x.y, not 1.20.x) | ✓ VERIFIED | `package.json:3` is `0.1.0`; `node -e "console.log(require('./package.json').version)"` outputs `0.1.0` |
| 4 | CHANGELOG.md release links point to fork repo for fork-era entries | ✓ VERIFIED | `CHANGELOG.md:9` has `[0.1.0]`; `CHANGELOG.md:1354` and `CHANGELOG.md:1355` point to `lucafanselau/pilot-gsd` |
| 5 | Bug report template references fork package name | ✓ VERIFIED | `.github/ISSUE_TEMPLATE/bug_report.yml:13` label is `pilot-gsd Version`; `.github/ISSUE_TEMPLATE/bug_report.yml:15` placeholder uses `0.1.0` |
| 6 | Attribution to original project is preserved in LICENSE and relevant docs | ✓ VERIFIED | `LICENSE:3` preserves Lex Christopherson; `CHANGELOG.md:31` and `README.md:132` retain upstream attribution |
| 7 | No accidentally committed secrets exist in tracked tree | ✓ VERIFIED | Tracked-file scans (`git ls-files -z | xargs -0 rg`) found 0 matches for API keys, Slack tokens, cloud tokens, private key blocks; base64 hits are npm integrity hashes in `package-lock.json` |
| 8 | Interactive AskUserQuestion patterns in workflows are documented as intentional or auto-guarded | ✓ VERIFIED | Auto-mode guards present around interactive prompts (e.g., `update.md:136`, `settings.md:36`, `quick.md:20`, `new-milestone.md:91`); `discuss-phase.md` remains intentionally interactive |
| 9 | update.md does not link to upstream changelog for fork-specific updates | ✓ VERIFIED | `get-shit-done/workflows/update.md:186` links to `lucafanselau/pilot-gsd/.../CHANGELOG.md`; no upstream changelog link remains |
| 10 | No deprecated artifacts confuse the public surface | ✓ VERIFIED | `.github` templates/workflows contain no `glittercowboy`, `/gsd:`, or `~/.claude/`; legacy syntax appears only in explicit upstream comparison/historical context |
| 11 | README clearly communicates a distinct autonomy-first system inspired by GSD | ✓ VERIFIED | `README.md:3`, `README.md:9`, and `README.md:11` explicitly position pilot-gsd as autonomy-first and a substantial fork |
| 12 | README explains what changed from upstream in practical terms | ✓ VERIFIED | `README.md:15-25` comparison table lists interactivity, models, frontmatter, defaults, commands, paths, slash syntax |
| 13 | README explains who it is for and install/use path | ✓ VERIFIED | `README.md:3` target audience; `README.md:28-34` workflow; `README.md:118-129` installation and inherited bin-name note |
| 14 | README does not read like "we added one feature to upstream" | ✓ VERIFIED | `README.md:11` explicitly states "real fork, not a thin wrapper" and details broad architectural differences |
| 15 | README has respectful, explicit attribution to the original project | ✓ VERIFIED | `README.md:132-134` gives explicit credit, upstream link, and upstream README reference |
| 16 | Existing tests pass | ✓ VERIFIED | `npm test` passes with `81` tests, `0` failures |
| 17 | Public-facing docs are internally consistent (version, name, links match) | ✗ FAILED | Name and links are consistent, but README lacks explicit `0.1.0` required by must_haves key link (`grep "0\\.1\\.0" README.md` -> no matches) |

**Score:** 16/17 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
| --- | --- | --- | --- |
| `SECURITY.md` | Fork-appropriate security contact | ✓ VERIFIED | Exists; includes fork advisory link and upstream referral note |
| `.github/CODEOWNERS` | Fork code ownership | ✓ VERIFIED | Exists; owner set to `@lucafanselau` |
| `.github/FUNDING.yml` | Fork funding config | ✓ VERIFIED | Exists; GitHub sponsor owner is `lucafanselau` |
| `package.json` | Fork identity and distinct version | ✓ VERIFIED | Exists; name `pilot-gsd`, version `0.1.0`, fork repo URLs |
| `CHANGELOG.md` | Fork release section + correct links | ✓ VERIFIED | Exists; fork release section present; fork links for `[Unreleased]` and `[0.1.0]` |
| `.github/ISSUE_TEMPLATE/bug_report.yml` | Fork-appropriate bug template | ✓ VERIFIED | Exists; fork package/version prompts are present |
| `LICENSE` | Original attribution preserved | ✓ VERIFIED | Exists; copyright remains Lex Christopherson |
| `get-shit-done/workflows/update.md` | Fork-appropriate changelog link | ✓ VERIFIED | Exists; changelog URL points to fork repository |
| `.planning/phases/11-fork-release-cleanup-identity-attribution-security-hygiene-and-readme/11-02-SUMMARY.md` | Security/hygiene audit documentation | ✓ VERIFIED | Exists and documents secret scan + AskUserQuestion audit outputs |
| `README.md` | Complete fork-positioned README (>=80 lines) | ⚠️ PARTIAL | Exists at 138 lines and is substantive, but required version key-link pattern `0.1.0` is missing |

### Key Link Verification

| From | To | Via | Status | Details |
| --- | --- | --- | --- | --- |
| `package.json` | `README.md` | version/name consistency (`pilot-gsd`) | ✓ WIRED | `package.json:2` and `README.md:1` both use `pilot-gsd` |
| `CHANGELOG.md` | `github.com/lucafanselau/pilot-gsd` | release links for fork entries | ✓ WIRED | `[Unreleased]` and `[0.1.0]` links point to fork repo |
| `get-shit-done/workflows/update.md` | `CHANGELOG.md` | changelog link (`lucafanselau/pilot-gsd`) | ✓ WIRED | `update.md:186` uses fork changelog URL |
| `README.md` | `package.json` | version consistency (`0.1.0`) | ✗ NOT_WIRED | `README.md` has no `0.1.0` occurrence while `package.json:3` is `0.1.0` |
| `README.md` | `https://github.com/gsd-build/get-shit-done` | attribution link | ✓ WIRED | Upstream attribution link appears in intro and attribution section |
| `README.md` | `https://github.com/lucafanselau/pilot` | parent project link | ✓ WIRED | Parent Pilot link appears in intro, How It Works, and Installation |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| --- | --- | --- | --- | --- |
| `IDENT-01, IDENT-02, IDENT-03, IDENT-04, IDENT-05` | `11-01-PLAN.md` | Not defined in `.planning/REQUIREMENTS.md` | ✗ BLOCKED | IDs are declared in plan frontmatter, but no matching ID definitions exist in `.planning/REQUIREMENTS.md` |
| `HYGIENE-01, HYGIENE-02, HYGIENE-03, HYGIENE-04, HYGIENE-05` | `11-01-PLAN.md`, `11-02-PLAN.md` | Not defined in `.planning/REQUIREMENTS.md` | ✗ BLOCKED | Hygiene implementation evidence exists (`update.md`, scans), but IDs are absent from REQUIREMENTS traceability source |
| `SEC-01, SEC-02, SEC-03, SEC-04` | `11-02-PLAN.md` | Not defined in `.planning/REQUIREMENTS.md` | ✗ BLOCKED | Secret scanning evidence exists, but formal ID definitions are missing in REQUIREMENTS.md |
| `README-01, README-02, README-03, README-04` | `11-03-PLAN.md` | Not defined in `.planning/REQUIREMENTS.md` | ✗ BLOCKED | README implementation exists, but IDs are not present in REQUIREMENTS.md |
| `VERIFY-01, VERIFY-02, VERIFY-03` | `11-03-PLAN.md` | Not defined in `.planning/REQUIREMENTS.md` | ✗ BLOCKED | Tests and consistency checks were run, but REQUIREMENTS.md has no matching ID entries |

Orphaned requirements check:
- `Phase 11` is not mapped in `.planning/REQUIREMENTS.md` at all, so no additional phase-11 IDs can be reconciled from the traceability table.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| --- | --- | --- | --- | --- |
| `.github/ISSUE_TEMPLATE/bug_report.yml` | 15 | `placeholder` field | ℹ️ Info | Legitimate issue-template placeholder, not implementation stub |
| `.github/ISSUE_TEMPLATE/bug_report.yml` | 47 | `placeholder` block | ℹ️ Info | Legitimate issue-template example steps |
| `CHANGELOG.md` | 544 | `placeholders` word | ℹ️ Info | Historical upstream changelog text, not TODO/stub marker |
| `CHANGELOG.md` | 832 | `TODOs` word | ℹ️ Info | Historical changelog content, not unresolved in-code TODO |

No blocker anti-patterns found in phase-modified files.

### Human Verification Required

None required for current blockers. Remaining gaps are deterministic (missing README version link pattern and missing REQUIREMENTS ID traceability).

### Gaps Summary

Phase 11 is mostly delivered: identity files, security contact paths, fork versioning, changelog fork links, README positioning, and test pass status are all present and substantively implemented.

Two gaps block a full pass:

1. **Must-have key-link mismatch:** `README.md` does not include `0.1.0`, so the declared README -> package version link is not satisfied as written.
2. **Requirements traceability break:** all 21 requirement IDs used by Phase 11 plans are missing from `.planning/REQUIREMENTS.md`, so ID-level requirement verification cannot be completed.

---

_Verified: 2026-03-07T18:18:14Z_
_Verifier: Claude (gsd-verifier)_
