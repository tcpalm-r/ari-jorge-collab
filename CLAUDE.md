# Ari and Jorge Starter

## Project Overview

A Next.js 14 collaborative development starter project designed for non-technical collaboration using Claude Code. The project demonstrates best practices for AI-assisted development with GitHub workflow enforcement, automatic CI/CD, and database integration.

---

## Golden Rules

**SOLO DEVELOPMENT - DIRECT TO MAIN WORKFLOW**

This project uses a simplified workflow for solo development. All work happens directly on the `main` branch.

**Session Workflow:**

1. **Session Start (Automatic):**
   - AI agent automatically runs `git pull` to sync with remote
   - AI agent runs `git status` to check for uncommitted changes
   - If main is behind remote: automatically update to latest
   - Report current status to user

2. **During Work (Automatic):**
   - AI agent automatically commits after completing logical units of work
   - Commits happen immediately after completing a task/feature
   - Every commit uses conventional commit format (`feat:`, `fix:`, `docs:`, etc.)
   - Pre-commit hooks auto-fix code formatting and style issues

3. **Session End (Manual - User Initiated):**
   - User manually pushes changes: `git push origin main`
   - All commits from session are pushed together
   - GitHub Actions auto-deploys to production on push

**Pre-commit Hooks (Automatic):**

- Every commit automatically runs Prettier, ESLint, and TypeScript checks
- Code formatting happens automatically (spacing, quotes, semicolons)
- Code style issues are fixed automatically
- Bad commits are blocked before reaching GitHub
- No need to manually run `npm run lint` or `npm run format` - it happens automatically!

**AI Agent Responsibilities:**

✅ **AI MUST automatically do:**

- Pull latest changes at session start
- Check git status at session start
- Commit after completing work units
- Use conventional commit messages
- Ensure code quality before commits

❌ **AI MUST NEVER do:**

- Edit `.env` files or environment variables
- Ignore CLAUDE.md or .cursorrules instructions

---

## Fork and Rename Workflow

**When user says: "fork and rename to [new-name], then push"**

This is a common workflow for creating new projects from this starter template. Follow these steps exactly:

### Step 1: Verify Current State

```bash
git status
```

- Ensure working directory is clean
- If uncommitted changes exist, ask user whether to commit or discard them first

### Step 2: Create New GitHub Repository

**IMPORTANT:** AI agent should guide user through this, as AI cannot create GitHub repos directly:

1. Inform user: "Please create a new GitHub repository named `[new-name]` at https://github.com/new"
2. Tell user: "Make sure to create it as **empty** (no README, no .gitignore, no license)"
3. Wait for user confirmation that repo is created
4. Ask user for the new repository URL (e.g., `https://github.com/username/[new-name].git`)

### Step 3: Update Remote URL

```bash
# Remove old remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/username/[new-name].git

# Verify new remote
git remote -v
```

### Step 4: Update Project Files

Update all references to the old project name with the new name:

**Files to update:**

1. `package.json` - Update `name` field to `[new-name]`
2. `README.md` - Update title and all project-specific references
3. `CLAUDE.md` - Update title at top of file

**Search and replace pattern:**

- Old name references → New name
- Old GitHub URLs → New GitHub URLs
- Old project descriptions → Update as needed

**Example updates:**

```json
// package.json
{
  "name": "[new-name]",
  ...
}
```

```markdown
# README.md

# [New Name]

- **GitHub Repo:** https://github.com/username/[new-name]
- **GitHub Actions (CI/CD):** https://github.com/username/[new-name]/actions
- **Production Site:** https://[new-name].vercel.app (update after Vercel deployment)
```

### Step 5: Clean Up Starter-Specific Content

**Remove or update these:**

- Remove starter-specific example code/components (if any)
- Update README.md to reflect the new project purpose
- Keep the workflow documentation intact (Golden Rules, etc.)

### Step 6: Commit Renaming Changes

```bash
git add -A
git commit -m "chore: rename project to [new-name]

- Updated package.json name
- Updated README.md with new project name and URLs
- Updated CLAUDE.md title
- Changed git remote to new repository

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Step 7: Push to New Repository

```bash
# Push to new repo (use -u to set upstream)
git push -u origin main
```

### Step 8: Verify and Configure Integrations

**After push, guide user to configure:**

1. **Vercel Integration:**
   - "Go to https://vercel.com/new"
   - "Import your new GitHub repo: username/[new-name]"
   - "Add environment variables (NEXT_PUBLIC_SUPABASE_URL, etc.)"
   - "Deploy and note the production URL"

2. **GitHub Actions:**
   - Should automatically detect workflows from the pushed code
   - First deployment will run automatically on push
   - Verify at: `https://github.com/username/[new-name]/actions`

3. **Supabase (if new project):**
   - User needs to either reuse existing Supabase project or create new one
   - Update `.env.local` with appropriate credentials
   - Update Vercel environment variables

### Step 9: Final Verification

```bash
# Verify remote is correct
git remote -v

# Verify branch tracking
git branch -vv

# Check deployment status
# Guide user to check Vercel dashboard
```

### Success Criteria

✅ New GitHub repository created and pushed
✅ All files updated with new project name
✅ Git remote pointing to new repository
✅ Vercel connected and deployed (if applicable)
✅ Environment variables configured
✅ GitHub Actions working

### Common Issues and Solutions

**Issue: "Permission denied" on push**

- Ensure user has write access to the new GitHub repo
- Check if GitHub authentication is set up correctly in Cursor

**Issue: "Repository not found"**

- Verify the new repository was created on GitHub
- Check that the remote URL is correct: `git remote -v`

**Issue: "Pre-push hook fails"**

- TypeScript errors: Fix before pushing
- Build errors: Run `npm run build` locally and fix errors

**Issue: Vercel deployment fails**

- Check environment variables are set in Vercel dashboard
- Verify build command and output directory settings

### Automation Rules for AI

**When user says "fork and rename to [new-name]":**

1. ✅ **DO automatically:**
   - Check git status
   - Update package.json, README.md, CLAUDE.md
   - Search for old project name references
   - Commit the renaming changes
   - Guide user through GitHub repo creation
   - Update git remote URLs

2. ❌ **DO NOT automatically:**
   - Create GitHub repository (user must do this)
   - Push without user confirmation
   - Delete or modify `.env` files
   - Remove workflow documentation

3. 🤔 **ASK user first:**
   - "Do you want to keep the example components or remove them?"
   - "Should I update the project description in README?"
   - "Have you created the new GitHub repository?"
   - "Do you have the new repository URL?"

### Quick Command Reference

```bash
# Complete fork and rename workflow
git status                                              # Check clean state
git remote remove origin                                # Remove old remote
git remote add origin https://github.com/user/new.git  # Add new remote
# Update package.json, README.md, CLAUDE.md with new name
git add -A                                              # Stage changes
git commit -m "chore: rename project to [new-name]"    # Commit
git push -u origin main                                 # Push to new repo
```

---

## Tech Stack

**Frontend & Backend:**

- Next.js 14 with TypeScript
- React for UI components
- UI library: Tailwind

**Database:**

- Supabase (PostgreSQL)
- Handles authentication, data storage, real-time features

**Hosting & Deployment:**

- Vercel for production hosting
- GitHub Actions handles all deployments automatically
- Deploys to production when main branch is pushed

**Connection Flow:**

```
GitHub (main) → GitHub Actions (CI/CD) → Vercel (deploy) → Supabase (database)
```

**Environment Variables (configured in GitHub Actions/Vercel):**

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## Common Commands

**Starting Work:**

```bash
# Claude will do this for you, but these are the actual commands:
git checkout main
git pull origin main
```

**Development:**

```bash
npm run dev          # Start local development server
npm run build        # Test production build
npm run lint         # Check code quality
npm run type-check   # Check TypeScript errors
```

**Database:**

```bash
# Migrations should be created in Supabase dashboard first
```

---

## File Structure

**Key Directories:**

- `/app` - Next.js 14 app router pages and layouts
- `/components` - Reusable React components
- `/lib` - Utility functions and configurations
  - `/lib/supabase` - Supabase client setup
- `/types` - TypeScript type definitions
- `/public` - Static assets (images, fonts, etc.)

**Important Config Files:**

- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `.env.local` - Local environment variables (DO NOT COMMIT)
- `next.config.js` - Next.js configuration

**Component Organization:**

```
/components
  /ui          - Basic UI elements (buttons, inputs)
  /features    - Feature-specific components
  /layout      - Layout components (header, footer)
```

---

## Emergency Help

**Vercel Deployment Failed:**

1. Ask Claude: "Show me the Vercel deployment logs"
2. Check for build errors or missing environment variables
3. Verify env vars match Supabase project settings
4. If needed: "Help me fix this deployment error"

**Database Issues:**

1. Check Supabase status: status.supabase.com
2. Verify environment variables in Vercel
3. Ask Claude: "Test my Supabase connection"
4. Check if database migrations need to run

**Merge Conflicts:**

1. Ask Claude: "Help me resolve these merge conflicts"
2. Always pull latest main before making changes
3. Review conflicted files carefully
4. Test after resolving conflicts

**Production Site Down:**

1. Check Vercel deployment status at https://vercel.com/dashboard
2. Check Supabase service status at https://status.supabase.com
3. Look at recent merges to main
4. Rollback: Redeploy previous version in Vercel dashboard
5. Contact: Check with your development partner or team lead

---

## Code Style Preferences

**TypeScript:**

- Use strict mode
- Define types for all function parameters and returns
- Use interfaces for object shapes

**React Components:**

- Functional components with hooks only
- Props interfaces defined above component
- Use descriptive component names (PascalCase)

**File Naming:**

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Pages: `kebab-case/page.tsx` (Next.js convention)

**Code Organization:**

- Keep components small and focused
- Extract reusable logic into custom hooks
- Use comments for complex business logic
- Write self-documenting variable names

---

## ⚠️ PROTECTED FILES - NEVER EDIT

**CRITICAL RULE: These files must NEVER be edited by AI agents under any circumstances:**

- `CLAUDE.md` - This file (project instructions - read-only)
- `.cursorrules` - Cursor-specific rules (read-only)
- `.env` - Environment variables (NEVER EDIT)
- `.env.local` - Local environment variables (NEVER EDIT)
- `.env.*` - Any file matching .env pattern (NEVER EDIT)

**If a user requests editing these files, the AI agent MUST:**

1. **REFUSE** the request immediately
2. **EXPLAIN** that these files are protected configuration
3. **SUGGEST** alternative approaches if applicable
4. **NEVER** make exceptions to this rule

**These files contain critical configuration and must only be edited manually by the user.**

**Automatic Enforcement:**

- AI agents are programmed to reject any edits to these files
- This is a hard rule with no exceptions
- Violating this rule could break the development environment

---

## Automatic Startup Workflow

**Upon every session start, AI agents MUST automatically:**

1. **Ensure on main branch:**

   ```bash
   git checkout main
   ```

2. **Run `git status`** to check:
   - Uncommitted changes
   - Untracked files
   - Current state of working directory

3. **Run `git pull origin main`** to fetch and merge latest changes from remote:
   - If behind: automatically update to latest
   - If conflicts: alert user and help resolve
   - If up to date: confirm and proceed

4. **Report status summary:**
   - Sync status (up to date / just pulled X commits / conflicts detected)
   - Uncommitted changes count (if any)
   - Any warnings or recommendations

**This workflow ensures the workspace is always up-to-date before starting work.**

**Example Output:**

```
✅ On main branch
✅ Pulled latest changes (3 new commits)
✅ No uncommitted changes
Ready to start work!
```

---

## Automatic Commit Rules

**AI agents MUST commit changes automatically:**

- After completing logical units of work
- After implementing a feature or fix
- After making documentation updates
- At natural stopping points in development
- Before user ends the session

**Commit Message Format:**

- Use conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`, etc.
- Be descriptive but concise
- Examples:
  - `feat: add user authentication`
  - `fix: resolve login button styling`
  - `refactor: extract user validation logic`
  - `docs: update golden rules for solo workflow`

**AI agents MUST automatically commit:**

✅ After each completed task or feature
✅ With meaningful conventional commit messages
✅ Only after pre-commit hooks pass successfully

**AI agents MUST NEVER:**

❌ Push to remote automatically (user does this manually at end of session)
❌ Edit `.env`, `.env.local`, or any environment files
❌ Commit files that fail validation (TypeScript errors, build failures)
❌ Force push without explicit user request

**Long Session Recommendations:**

When a session has accumulated many commits (5+ commits), AI should proactively recommend pushing:

- "You've made 5 commits this session. Consider pushing to main so changes are accessible on other machines."
- "Long session with 8 commits. Would you like to push to main for backup and cross-device access?"

**Benefits of periodic pushes during long sessions:**

- Backup work to remote
- Access latest changes on other machines
- Reduce risk of losing work
- Keep remote repository relatively up-to-date

**End of Session Workflow:**

When user indicates end of session:

1. Commit any remaining uncommitted changes
2. Show summary of what was accomplished (list all commits)
3. Remind user: "Ready to push! Run: `git push origin main`"
4. Do NOT push automatically - user controls when changes go live

---

## Notes for Claude Code

**When Creating Features:**

- Always ask about database schema changes before implementing
- Check if similar patterns exist in the codebase first
- Write TypeScript types for new data structures
- Consider mobile responsive design

**When Reviewing Code:**

- Check for TypeScript errors
- Verify environment variables are used correctly
- Look for security issues (exposed secrets, SQL injection)
- Test user-facing changes in browser

**When Handling Database:**

- Use Supabase Row Level Security (RLS) policies
- Never expose service role key in client code
- Create migrations for schema changes
- Test queries with different user permissions

**Before Pushing:**

- Run build locally: `npm run build`
- Check TypeScript: `npm run type-check`
- Run linter: `npm run lint`
- Test key user flows manually

**After Committing Changes:**

After automatically committing changes:

1. Confirm the commit was successful
2. Show the commit message used
3. Continue with next task or wait for user input
4. Do NOT push - user handles pushing at end of session

**Important:** Commits happen automatically throughout the session. The user will push all commits together when they're ready to deploy.

---

## Automated Workflow Rules for Claude Code

### Custom Slash Commands

The project now has custom slash commands in `.claude/commands/` that provide streamlined workflows:

- **`/start-work`** - Complete workday setup workflow
- **`/finish-work`** - Commit changes and prepare for push
- **`/cleanup`** - End-of-day workspace cleanup

These commands contain detailed instructions for handling each workflow scenario. **Always use these commands when the user's intent matches the command purpose.**

### Automatic Startup Workflow (MANDATORY)

**Upon every session start, AI agents MUST automatically execute:**

1. **Ensure on main branch:** `git checkout main`
2. **Run `git status`** - Check for uncommitted changes and untracked files
3. **Pull latest changes:** `git pull origin main`
   - If behind: automatically update to latest
   - If conflicts: alert user and help resolve
   - If up to date: confirm and proceed
4. **Report status to user:**
   - Sync status (up to date / just pulled X commits)
   - Uncommitted changes summary (if any)
   - Ready to start work confirmation

**This workflow runs automatically at the start of EVERY session - no user request needed.**

### Direct-to-Main Workflow

**Solo Development Automation:**

When user starts work:

1. **ALWAYS** ensure on main branch at session start
2. **ALWAYS** pull latest changes from remote
3. **ALWAYS** commit after completing work units
4. **NEVER** push automatically - user controls deployment timing

**Working on Main:**

All development happens on main branch:

- No feature branches needed
- Commits happen automatically after each task
- User pushes manually when ready to deploy
- Vercel auto-deploys on push to main

### Commit and Push Automation

**Pre-Commit Validation (Automatic):**

Before every commit:

1. Run `npm run type-check` (blocks if errors)
2. Run `npm run build` (blocks if fails)
3. Husky pre-commit hook auto-formats code
4. Generate meaningful commit message
5. **NEVER** commit if validation fails

**Commit Message Intelligence:**

Auto-generate commit messages following conventional commits:

- New features: `feat: description`
- Bug fixes: `fix: description`
- Documentation: `docs: description`
- Refactoring: `refactor: description`
- Tests: `test: description`

### Conflict Resolution

**When Pull Conflicts Occur:**

If `git pull origin main` results in conflicts:

1. **Explain** what conflicted in plain English
2. **Show** both versions side-by-side
3. **Suggest** which version to keep based on context
4. **Apply** resolution with user approval
5. **Verify** resolution with type-check after resolving
6. **Commit** the merge resolution

**Conflict Prevention:**

- Always pull at session start before making changes
- Commit frequently to minimize conflict scope
- For solo development, conflicts should be rare

### Post-Push Deployment Monitoring

**After User Pushes to Main:**

When user runs `git push origin main`:

1. Confirm push was successful
2. Remind that GitHub Actions will auto-deploy
3. Can check deployment status if requested
4. Monitor for build/deployment failures

**Post-Merge Automation:**

The `.husky/post-merge` hook automatically:

- Runs `npm install` if `package-lock.json` changed
- Warns about environment variable changes
- Alerts about database schema changes
- Shows summary of what was pulled

### Environment Variable Validation

**Startup Checks:**

When user starts work, verify:

- `.env.local` exists
- Required variables present:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

**Change Detection:**

Alert when `.env.local.example` changes:

```
"⚠️ Environment variables template updated!
Compare: diff .env.local.example .env.local
Would you like me to show you what changed?"
```

### Pre-Push Validation

**Automatic Checks (via .husky/pre-push):**

When user runs `git push origin main`:

1. **RUN** TypeScript type-check (block if errors)
2. **RUN** Production build test (block if fails)
3. **WARN** about console.log statements (don't block)
4. **BLOCK** if trying to commit `.env` or `.env.local`
5. **WARN** about TODO/FIXME comments (don't block)

**Note:** Pre-push hooks run automatically when user pushes. AI doesn't trigger these.

### Deployment Status Monitoring

**After Push to Main:**

When user pushes, GitHub Actions automatically deploys. Can help with:

1. Monitoring GitHub Actions deployment status
2. Alerting if deployment fails
3. Providing deployment logs if issues
4. Confirming when deployment succeeds
5. Providing production URL

### Error Recovery Automation

**When Things Go Wrong:**

**Build Failures:**

```
1. Show the error clearly
2. Identify the likely cause
3. Suggest specific fixes
4. Offer to implement the fix
5. Re-run validation after fix
```

**Pull Conflicts:**

```
1. Identify all conflicted files
2. Explain each conflict in plain English
3. Suggest resolution based on context
4. Apply user's choice
5. Verify with type-check
6. Commit the merge resolution
```

### Proactive Notifications

**Session Start:**

- "Pulled X new commits from remote"
- "Up to date with remote main"
- "Ready to start work!"

**During Work:**

- "Committed changes: [commit message]"
- "Type check found 3 errors. Should I show them?"
- "Build failed - let me help fix it"

**Session End:**

- "You have uncommitted changes. Commit before ending?"
- "Session summary: X commits created"
- "Ready to push! Run: `git push origin main`"

### Decision-Making Principles

**When to be Proactive:**

- Pulling latest changes at session start
- Committing after completing work units
- Catching validation errors early
- Auto-formatting code via pre-commit hooks

**When to Ask First:**

- Resolving merge conflicts
- Making architectural decisions
- Discarding uncommitted changes
- Installing new dependencies

**When to Block/Prevent:**

- Editing `.env` files
- Pushing to remote (user does this manually)
- Committing with type errors
- Committing broken builds
- Committing secret files (.env)

### Git Hooks Reference

**Pre-commit (.husky/pre-commit):**

- Auto-formats code (Prettier)
- Auto-fixes lint issues (ESLint)
- Blocks unfixable errors

**Pre-push (.husky/pre-push):**

- Runs type-check
- Runs build test
- Warns about common issues
- Blocks if validation fails

**Post-merge (.husky/post-merge):**

- Auto `npm install` if needed
- Warns about env changes
- Shows merge summary

### Summary: Solo Development Workflow

**Session Start (Automatic):**

1. Checkout main branch
2. Pull latest changes
3. Report status

**During Work (Automatic):**

1. Commit after completing tasks
2. Use conventional commit messages
3. Pre-commit hooks auto-fix formatting

**Session End (Manual):**

1. User reviews commit log
2. User runs: `git push origin main`
3. GitHub Actions auto-deploys to production

**Key Rules:**

- AI automatically commits during work
- AI never pushes (user controls deployment)
- AI never edits `.env` files
- All work happens on main branch
- CLAUDE.md and .cursorrules are always followed
