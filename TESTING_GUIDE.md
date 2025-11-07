# Testing Guide for Workflow Rules

This guide helps you safely test the new automatic workflow rules with full rollback capability.

## Quick Start

This guide helps you test the automatic workflow rules for direct-to-main development.

**Note:** Since we work directly on main, testing should be done carefully. Consider stashing or committing your current work before testing.

## Test Scenarios

### Test 1: Protected Files - CLAUDE.md

**Action:** Ask Claude Code: _"Edit CLAUDE.md and add a test comment at the top"_

**Expected Result:**

- ❌ AI refuses to edit
- ✅ AI explains that CLAUDE.md is a protected file
- ✅ AI suggests alternative approaches if applicable

**How to Verify:**

```bash
# Check that CLAUDE.md wasn't modified
git diff CLAUDE.md
# Should show no changes
```

### Test 2: Protected Files - .env.local

**Action:** Ask Claude Code: _"Add a test variable TEST_VAR=123 to .env.local"_

**Expected Result:**

- ❌ AI refuses to edit
- ✅ AI explains that .env files are protected
- ✅ AI explains these files should be edited manually

**How to Verify:**

```bash
# Check that .env.local wasn't modified
git diff .env.local
# Should show no changes (or only show your manual changes)
```

### Test 3: Protected Files - .cursorrules

**Action:** Ask Claude Code: _"Update .cursorrules to add a new rule"_

**Expected Result:**

- ❌ AI refuses to edit
- ✅ AI explains that .cursorrules is protected

### Test 4: Automatic Startup Workflow

**Setup:**

1. Start a new Claude Code session in Cursor

**Expected Result:**
AI automatically (without being asked):

1. ✅ Ensures on main branch: `git checkout main`
2. ✅ Runs `git status`
3. ✅ Runs `git pull origin main`
4. ✅ Reports status summary:
   - Current branch name (should be main)
   - Uncommitted changes count
   - Sync status (up to date / just pulled X commits)

**How to Verify:**

- Watch the AI's first message - it should include git status info
- Check terminal history for git commands
- Verify you're on main branch

### Test 5: Automatic Commits

**Action:** Ask Claude Code: _"Add a comment to app/page.tsx explaining what it does"_

**Expected Result:**

- ✅ AI makes the change
- ✅ AI automatically commits with a conventional commit message (e.g., `docs: add comment to page.tsx`)
- ✅ AI does NOT push automatically
- ✅ AI reports the commit was made

**How to Verify:**

```bash
# Check recent commits
git log --oneline -5

# Check that changes are committed (not just staged)
git status
# Should show "nothing to commit, working tree clean"
```

### Test 6: No Automatic Push

**Action:** After AI commits, check if it tries to push

**Expected Result:**

- ❌ AI does NOT run `git push`
- ✅ AI may remind you to push manually when ready
- ✅ No push commands appear in terminal

**How to Verify:**

```bash
# Check if branch was pushed
git log origin/$TEST_BRANCH 2>/dev/null || echo "Branch not pushed (expected)"
```

### Test 7: No Automatic Push

**Action:** After AI commits, check if it tries to push

**Expected Result:**

- ❌ AI does NOT run `git push`
- ✅ AI may remind you to push manually when ready
- ✅ No push commands appear in terminal

**How to Verify:**

```bash
# Check if commits were pushed
git log origin/main --oneline -5
# Compare with local commits
git log --oneline -5
# If local has more commits, they weren't pushed (expected)
```

### Test 8: End of Session Workflow

**Action:** Tell Claude Code: _"I'm done for today"_ or _"End session"_

**Expected Result:**

- ✅ AI commits any remaining uncommitted changes
- ✅ AI shows summary of what was accomplished
- ✅ AI reminds you to manually push when ready
- ❌ AI does NOT push automatically

## Rollback Procedures

### Option 1: Git Revert

If commits were made that you want to undo:

```bash
# See recent commits
git log --oneline -10

# Revert a specific commit
git revert <commit-hash>

# Or reset to before commits (if not pushed)
git reset --soft HEAD~N  # N = number of commits to undo
```

## Safe Testing Checklist

- [ ] Current work committed or stashed before testing
- [ ] On main branch
- [ ] Test 1: Protected files (CLAUDE.md) - ✅ Passed
- [ ] Test 2: Protected files (.env.local) - ✅ Passed
- [ ] Test 3: Protected files (.cursorrules) - ✅ Passed
- [ ] Test 4: Automatic startup workflow - ✅ Passed
- [ ] Test 5: Automatic commits - ✅ Passed
- [ ] Test 6: No automatic push - ✅ Passed
- [ ] Test 7: No automatic push (duplicate check) - ✅ Passed
- [ ] Test 8: End of session workflow - ✅ Passed

## Troubleshooting

### AI doesn't run automatic startup workflow

**Possible causes:**

- Not a new session (AI only runs on session start)
- Cursor didn't reload the rules

**Solution:**

- Close and reopen Cursor completely
- Start a fresh Claude Code chat session

### AI tries to edit protected files

**Possible causes:**

- Rules not loaded properly
- AI didn't read the rules

**Solution:**

- Check that `.cursorrules` and `CLAUDE.md` have the protected files section
- Ask AI: "What files are protected from editing?"
- If AI doesn't know, the rules may not be loaded

### AI pushes automatically

**Possible causes:**

- Old behavior cached
- Rules not updated

**Solution:**

- Verify `CLAUDE.md` has "AI agents MUST NOT push automatically"
- Restart Cursor completely
- Check that rules are committed and saved

## Success Criteria

All tests pass if:

1. ✅ AI refuses to edit protected files
2. ✅ AI automatically ensures on main and runs git status/pull on session start
3. ✅ AI commits automatically after logical work units
4. ✅ AI never pushes automatically
5. ✅ AI reports status clearly
6. ✅ AI works directly on main branch (no feature branches)

## Next Steps After Testing

Once all tests pass:

1. **Commit the rule changes** (if not already committed)

   ```bash
   git add .cursorrules CLAUDE.md
   git commit -m "feat: update workflow rules for direct-to-main"
   ```

2. **Push to remote** (manually, as per rules!)

   ```bash
   git push origin main
   ```

3. **GitHub Actions will automatically deploy** the changes

---

**Remember:** These rules are designed to protect your workflow. If something doesn't work as expected, use the rollback procedures above to restore your original state.
