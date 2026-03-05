# Quick Task 003: Rewrite gsd-delegate.md with clean v2 prompt

**Description:** rewrite gsd-delegate.md with clean v2 prompt  
**Directory:** .planning/quick/003-rewrite-gsd-delegate-md-with-clean-v2-pr/  
**Mode:** quick

## Goal

Replace the body content of `commands/gsd-delegate.md` with the clean v2 prompt from `/home/user/.openclaw/workspace/temp/gsd-delegate-v2.md`, preserving the existing YAML frontmatter.

## Tasks

### Task 1: Replace gsd-delegate.md body with v2 content

- Read `/home/user/.openclaw/workspace/temp/gsd-delegate-v2.md` — the new prompt is already written
- The new file has its own frontmatter — extract only the body (everything after the closing `---`)
- The existing `commands/gsd-delegate.md` has frontmatter to keep:
  ```yaml
  ---
  description: "Read project state and output a delegation plan for a job"
  argument-hint: "<scope> <description> [requirement_path]"
  tools:
    read: true
    glob: true
    grep: true
  ---
  ```
- Replace the body of `commands/gsd-delegate.md` with the body from v2
- Verify no references to deprecated `phase` meta-command remain as an output option
- Verify all 6 commands are documented: `quick`, `new-project`, `new-milestone`, `add-phase`, `plan-phase`, `execute-phase`

## Success Criteria

- [ ] `commands/gsd-delegate.md` body replaced with v2 content
- [ ] Frontmatter preserved (description, argument-hint, tools)
- [ ] No `phase` command in Available Commands table (deprecated)
- [ ] All 6 valid commands present: quick, new-project, new-milestone, add-phase, plan-phase, execute-phase
- [ ] Atomic git commit created
