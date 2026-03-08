# Fork Release Cleanup — Identity, Attribution, Security Hygiene, and README

## Problem
pilot-gsd works, but its public surface still feels too much like a rough fork instead of a polished autonomy-first product:
- upstream references and branding are still scattered through docs and metadata
- versioning is confusing if it matches upstream exactly
- README/installer/package surface do not clearly explain how this fork differs
- there may be leftover interactive or deprecated artifacts that undermine the autonomy story
- we want strong attribution to the inspiration while making it clear this is a distinct system

There is also security hygiene work to do around secret exposure checks. We want the repo surface clean before launch.

## Goal
pilot-gsd should feel intentional and sharp for public launch:
1. clearly inspired by Get Shit Done, but not presented as a trivial one-feature fork
2. clean, accurate, and consistent project identity across README, package metadata, install surface, changelog, and repo files
3. no misleading upstream contact/ownership references where our fork should speak for itself
4. no tracked secret leaks in the current tree
5. no confusing deprecated/public-facing artifacts left behind

## Requirements

### Must Have — Public Identity Cleanup
- [ ] Audit the public-facing surface: `README.md`, `package.json`, installer/banner text, `SECURITY.md`, `.github/CODEOWNERS`, `.github/FUNDING.yml`, `CHANGELOG.md`, and other top-level docs/metadata
- [ ] Replace misleading upstream-owner references with the correct fork identity where appropriate
- [ ] Preserve proper attribution to the original project and inspiration — do NOT erase provenance
- [ ] Adopt a distinct versioning scheme for the fork so it is not confused with upstream releases
- [ ] Make package/bin/install naming intentional and consistent with the fork's public story

### Must Have — README Rewrite and Positioning
- [ ] Use the installed README-writing skills if available (`create-readme`, `crafting-effective-readmes`)
- [ ] Rewrite README so it explicitly communicates:
  - this project is heavily inspired by Get Shit Done prompting/design
  - this fork is now a distinct autonomy-first system used by Pilot
  - what changed from upstream in practical terms
  - who it is for
  - what the current install/use path is
- [ ] The README must NOT read like "we added one feature to upstream" — it should explain the larger autonomy/fork direction honestly
- [ ] Keep attribution respectful and explicit

### Must Have — Fork Hygiene / Surface Cleanup
- [ ] Remove or clean up deprecated or obviously confusing shipped artifacts that should not be part of the public surface
- [ ] Audit for leftover interactive language or interactive-only prompts/commands that conflict with the autonomy-first positioning
- [ ] Search for `AskUserQuestion` and related interactive patterns; remove or document them where they are not intentional
- [ ] If some interactive paths are intentionally retained, make that distinction explicit rather than accidental
- [ ] Audit changelog/release links and repo references so they do not point users to the wrong project for fork-specific release information

### Must Have — Security Hygiene
- [ ] Scan the tracked repository tree for accidentally committed tokens, credentials, or unsafe secrets
- [ ] Sanitize any tracked secret exposure found in the current tree
- [ ] DO NOT rewrite git history or force-push branches in this phase
- [ ] If history rewrite is truly needed, create a short documented remediation plan describing:
  - whether the exposure is in tracked history or only local git config
  - exact recommended cleanup steps
  - risks of rewriting public history
  - what should be done manually after this phase

### Must Have — Verification
- [ ] Existing tests still pass at the end
- [ ] Public-facing docs are internally consistent
- [ ] The project clearly reads as a deliberate forked product with clean attribution and clear identity

## Technical Notes
- The local `.git/config` remote URLs are not repo files; do not waste time trying to "fix" those via committed changes
- Focus on tracked content and user-facing project surface
- Prefer surgical cleanup over broad churn
- If package/bin naming should remain temporarily for compatibility reasons, explain that in the final notes and make the docs explicit

## Do NOT
- Do NOT erase credit to the original project
- Do NOT rewrite public git history in this phase
- Do NOT change core prompting/agent behavior unless required for intentional autonomy cleanup
- Do NOT add new product features
- Do NOT turn the README into vague marketing fluff — keep it concrete and credible
