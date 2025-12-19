#!/usr/bin/env bash
set -euo pipefail

# dev0 서버에서 실행하는 "main-only" 배포 스크립트
# - 같은 서버에서 소스 pull → install → build → pm2 restart까지 수행합니다.
#
# 사용:
#   cd ~/apps/zikim-dev0
#   ./deploy-on-server.sh
#
# 요구사항:
# - Node/NPM 설치
# - PM2 설치 및 ecosystem.config.cjs로 1회 이상 start 되어 있어야 함

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

REMOTE_NAME="${REMOTE_NAME:-origin}"
BRANCH="${BRANCH:-main}"
PM2_APP_NAME="${PM2_APP_NAME:-zikim-dev0}"

if ! command -v git >/dev/null 2>&1; then
  echo "❌ git이 설치되어 있지 않습니다." >&2
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "❌ npm이 설치되어 있지 않습니다." >&2
  exit 1
fi
if ! command -v pm2 >/dev/null 2>&1; then
  echo "❌ pm2가 설치되어 있지 않습니다. (예: npm i -g pm2)" >&2
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ git 저장소가 아닙니다: $ROOT_DIR" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "❌ 작업트리에 커밋되지 않은 변경사항이 있어 배포를 중단합니다." >&2
  git status --porcelain
  exit 1
fi

echo "✅ Fetch: $REMOTE_NAME"
git fetch "$REMOTE_NAME" --prune

echo "✅ Checkout: $BRANCH"
git checkout "$BRANCH"

echo "✅ Pull: $REMOTE_NAME/$BRANCH"
git pull --ff-only "$REMOTE_NAME" "$BRANCH"

echo "✅ Install: npm ci"
npm ci

echo "✅ Build: npm run build"
npm run build

echo "✅ Restart: pm2 restart $PM2_APP_NAME"
pm2 restart "$PM2_APP_NAME"

echo ""
echo "✅ 배포 완료"
echo "- 브랜치: $BRANCH"
echo "- PM2 앱: $PM2_APP_NAME"


