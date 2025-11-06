#!/bin/bash

# Vercel Ignored Build Step Script
# Exit 1 = Build, Exit 0 = Don't build
#
# Build when:
# - VERCEL_ENV is "production" (merge to main)
# - VERCEL_ENV is "preview" (PR creation/updates)
#
# Skip when:
# - Any other scenario (regular branch pushes)
#
# This approach uses VERCEL_ENV which is set immediately by Vercel,
# avoiding race conditions with GitHub PR metadata propagation.

echo "🔍 Checking if build should proceed..."
echo "VERCEL_ENV: $VERCEL_ENV"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

# Build for production (main branch merges)
if [[ "$VERCEL_ENV" == "production" ]]; then
  echo "✅ Building: Production deployment (main branch)"
  exit 1
fi

# Build for preview (PRs and preview deployments)
if [[ "$VERCEL_ENV" == "preview" ]]; then
  echo "✅ Building: Preview deployment (PR or branch preview)"
  exit 1
fi

# Skip all other builds (should rarely happen)
echo "⏭️  Skipping: Environment '$VERCEL_ENV' does not require build"
exit 0
