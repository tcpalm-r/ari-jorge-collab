#!/bin/bash

# Vercel Ignored Build Step Script
# Exit 1 = Build, Exit 0 = Don't build
#
# Build when:
# - It's a pull request (preview deployment)
# - It's the main branch (production deployment)
#
# Skip when:
# - It's a regular branch push without a PR

echo "🔍 Checking if build should proceed..."
echo "VERCEL_ENV: $VERCEL_ENV"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
echo "VERCEL_GIT_PULL_REQUEST_ID: $VERCEL_GIT_PULL_REQUEST_ID"

# Always build production (main branch)
if [[ "$VERCEL_ENV" == "production" ]]; then
  echo "✅ Building: Production deployment (main branch)"
  exit 1
fi

# Always build pull requests (preview deployment)
if [[ -n "$VERCEL_GIT_PULL_REQUEST_ID" ]]; then
  echo "✅ Building: Pull request preview deployment"
  exit 1
fi

# Skip all other builds (regular branch pushes)
echo "⏭️  Skipping: Regular branch push without PR"
exit 0
