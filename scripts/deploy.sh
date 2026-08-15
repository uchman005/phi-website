#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Safe deploy script — runs ON THE VPS, invoked over SSH by
# .github/workflows/deploy.yml on every push to master.
#
# Guarantees:
#   - pm2 is only restarted if `npm run lint` AND `npm run build` succeed.
#   - If anything fails (deps, lint, build, or the post-restart health check),
#     the app is rolled back to the exact commit it was running before this
#     deploy started, and pm2 is restarted on that known-good version.
#   - Rollback restores the previous .next build from a local backup rather
#     than rebuilding it — so rollback never itself depends on a build
#     succeeding.
#
# This script is downloaded fresh from GitHub for the exact commit being
# deployed (see the workflow) and run from a throwaway path outside the
# app's own working directory — it is never executed from inside a
# directory that `git reset --hard` is about to rewrite.
#
# Required environment variables (set by the workflow):
#   APP_DIR      Absolute path to the app's git working directory on the VPS.
#   PM2_ID       pm2 process id (or name) to restart, e.g. 0.
#   HEALTH_URL   URL to curl after restart to confirm the app came back up.
# ---------------------------------------------------------------------------

set -euo pipefail

: "${APP_DIR:?APP_DIR is required}"
: "${PM2_ID:=0}"
: "${HEALTH_URL:=http://127.0.0.1:3000}"

BACKUP_DIR="$APP_DIR/.deploy-backup"

log() { printf '[deploy %s] %s\n' "$(date -u +%H:%M:%S)" "$*"; }

rollback() {
  log "DEPLOY FAILED at step: $1 — rolling back to $PREV_COMMIT"
  cd "$APP_DIR"
  git reset --hard "$PREV_COMMIT"

  if [ -f "$BACKUP_DIR/package-lock.json.bak" ]; then
    cp "$BACKUP_DIR/package-lock.json.bak" package-lock.json
  fi
  npm ci --no-audit --no-fund

  if [ -d "$BACKUP_DIR/.next" ]; then
    rm -rf .next
    cp -r "$BACKUP_DIR/.next" .next
    log "Restored previous .next build from backup (no rebuild needed)"
  else
    log "No previous build backup available — rebuilding previous commit as a last resort"
    npm run build
  fi

  pm2 restart "$PM2_ID" --update-env
  pm2 save

  log "Rollback complete. App is back on $PREV_COMMIT and pm2 process $PM2_ID has been restarted."
  log "This deploy is reported as FAILED — production was left safe on the previous version."
  exit 1
}

[ -d "$APP_DIR/.git" ] || { echo "APP_DIR ($APP_DIR) is not a git repository"; exit 1; }
cd "$APP_DIR"

PREV_COMMIT=$(git rev-parse HEAD)
log "Deploying in $APP_DIR — currently on $PREV_COMMIT"

# Back up the build that's currently live *before* touching anything, so
# rollback can restore it verbatim regardless of what goes wrong next.
rm -rf "$BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
[ -d .next ] && cp -r .next "$BACKUP_DIR/.next"
[ -f package-lock.json ] && cp package-lock.json "$BACKUP_DIR/package-lock.json.bak"

log "Fetching origin/master (public repo — no credentials needed)..."
git fetch --all --prune
git reset --hard origin/master
NEW_COMMIT=$(git rev-parse HEAD)

if [ "$NEW_COMMIT" = "$PREV_COMMIT" ]; then
  log "Already up to date at $NEW_COMMIT — nothing to deploy."
  rm -rf "$BACKUP_DIR"
  exit 0
fi
log "Updated working tree to $NEW_COMMIT"

log "Installing dependencies..."
npm ci --no-audit --no-fund || rollback "npm ci"

log "Running lint..."
npm run lint || rollback "lint"

log "Running build..."
npm run build || rollback "build"

log "Lint and build are clean. Restarting pm2 process $PM2_ID..."
pm2 restart "$PM2_ID" --update-env
pm2 save

log "Health check against $HEALTH_URL..."
attempt=0
until curl -fsS -o /dev/null "$HEALTH_URL"; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 10 ]; then
    rollback "post-restart health check ($HEALTH_URL did not respond)"
  fi
  sleep 2
done

rm -rf "$BACKUP_DIR"
log "Deploy successful — now running commit $NEW_COMMIT"
