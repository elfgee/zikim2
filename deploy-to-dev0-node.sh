#!/usr/bin/env bash
set -euo pipefail

# Node 런타임(dev0) 배포 트리거 스크립트
# - 로컬 main을 원격 dev0 브랜치로 푸시합니다.
# - 실제 서버 반영(pull/build/restart)은 dev0 서버에서 수행합니다.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

REMOTE_NAME="${REMOTE_NAME:-origin}"
SOURCE_BRANCH="${SOURCE_BRANCH:-main}"
TARGET_BRANCH="${TARGET_BRANCH:-dev0}"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ git 저장소가 아닙니다: $ROOT_DIR" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "❌ 커밋되지 않은 변경사항이 있습니다. 먼저 커밋 후 다시 시도하세요." >&2
  git status --porcelain
  exit 1
fi

echo "✅ Fetch: $REMOTE_NAME"
git fetch "$REMOTE_NAME" --prune

echo "✅ Checkout: $SOURCE_BRANCH"
git checkout "$SOURCE_BRANCH"

echo "✅ Push: $SOURCE_BRANCH -> $REMOTE_NAME/$TARGET_BRANCH"
git push "$REMOTE_NAME" "$SOURCE_BRANCH:$TARGET_BRANCH"

echo ""
echo "✅ dev0 배포 트리거 완료"
echo "- 다음 단계: dev0 서버에서 dev0 브랜치 pull 후 build/restart"
echo "- 가이드: DEV0_NODE_DEPLOY_GUIDE.md"


