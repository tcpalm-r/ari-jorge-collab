# Vercel Deployment Configuration

## Deployment Strategy

This project uses selective deployments to optimize build times and costs:

- ✅ **Preview Deployments**: Automatically deploy when PRs are created/updated
- ✅ **Production Deployments**: Automatically deploy when changes are merged to `main`
- ❌ **Skip**: Regular branch pushes without PRs (to avoid unnecessary builds)

## Setup Instructions

### 1. Configure Ignored Build Step in Vercel Dashboard

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Git**
4. Scroll to **Ignored Build Step**
5. Select **Custom** from the dropdown
6. Enter this command:

```bash
bash vercel-build-ignore.sh
```

### 2. How It Works

The `vercel-build-ignore.sh` script checks Vercel environment variables:

| Condition                | Environment Check                   | Action   |
| ------------------------ | ----------------------------------- | -------- |
| Production (main branch) | `VERCEL_ENV === "production"`       | ✅ Build |
| Pull Request             | `VERCEL_GIT_PULL_REQUEST_ID` is set | ✅ Build |
| Regular branch push      | Neither condition above             | ⏭️ Skip  |

### 3. Vercel Environment Variables Reference

- `VERCEL_ENV`: `production`, `preview`, or `development`
- `VERCEL_GIT_COMMIT_REF`: The git branch name
- `VERCEL_GIT_PULL_REQUEST_ID`: Only populated when building a PR

### 4. Testing the Configuration

#### Test 1: Regular Branch Push (Should Skip)

```bash
git checkout -b test/deployment
git commit --allow-empty -m "test: verify build skip"
git push origin test/deployment
```

Expected: ⏭️ Vercel shows "Canceled by Ignored Build Step"

#### Test 2: Pull Request (Should Build)

```bash
# After pushing the branch above
gh pr create --title "Test PR" --body "Testing Vercel preview deployment"
```

Expected: ✅ Vercel creates preview deployment

#### Test 3: Production Deploy (Should Build)

```bash
# After merging PR to main
git checkout main
git pull origin main
```

Expected: ✅ Vercel creates production deployment

## Troubleshooting

### Issue: PRs are not triggering preview deployments

**Solution**: Verify the Ignored Build Step command in Vercel dashboard is exactly:

```bash
bash vercel-build-ignore.sh
```

### Issue: Script not found error

**Solution**: Ensure `vercel-build-ignore.sh` is committed to the repository:

```bash
git add vercel-build-ignore.sh
git commit -m "chore: add Vercel build ignore script"
git push
```

### Issue: Permission denied

**Solution**: The script must be executable:

```bash
chmod +x vercel-build-ignore.sh
git add vercel-build-ignore.sh
git commit -m "chore: make build script executable"
git push
```

## Alternative: vercel.json Configuration

If you prefer not to use the Vercel dashboard, you can configure this in `vercel.json`:

```json
{
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  },
  "github": {
    "silent": false,
    "autoAlias": true
  }
}
```

However, this doesn't provide the same level of control as the script approach.

## Current Status

- ✅ Script created: `vercel-build-ignore.sh`
- ⚠️ **Action Required**: Configure the Ignored Build Step in Vercel dashboard
- 📝 After configuration, test with a new PR to verify preview deployments work

## Related Files

- `vercel-build-ignore.sh` - The build ignore script
- `test-vercel-skip.txt` - Test file used for verifying skip behavior
