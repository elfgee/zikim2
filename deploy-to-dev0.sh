#!/bin/bash

# 지킴진단 프론트엔드 dev0 자동 배포 스크립트

set -e  # 에러 발생 시 스크립트 중단

echo "🚀 dev0 배포 시작..."
echo ""

# 현재 브랜치 저장
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 현재 브랜치: $CURRENT_BRANCH"
echo ""

# 1. 배포 파일 생성
echo "📦 배포 파일 생성 중..."
./deploy.sh
echo ""

# 2. 변경사항이 있는지 확인
if [ -z "$(git status --porcelain)" ]; then
  echo "⚠️  변경사항이 없습니다. 배포를 건너뜁니다."
  exit 0
fi

# 3. main 브랜치의 변경사항 커밋 (있는 경우)
if [ "$CURRENT_BRANCH" != "dev0" ]; then
  echo "📝 main 브랜치 변경사항 커밋 중..."
  git add .
  git commit -m "feat: 지킴진단 프론트엔드 업데이트" || echo "커밋할 변경사항 없음"
  echo ""
fi

# 4. dev0 브랜치로 전환 또는 생성
echo "🔄 dev0 브랜치로 전환 중..."
if git show-ref --verify --quiet refs/heads/dev0; then
  git checkout dev0
  echo "✓ dev0 브랜치로 전환 완료"
else
  git checkout -b dev0
  echo "✓ dev0 브랜치 생성 및 전환 완료"
fi
echo ""

# 5. main 브랜치의 변경사항 병합 (있는 경우)
if [ "$CURRENT_BRANCH" != "dev0" ]; then
  echo "🔀 main 브랜치 변경사항 병합 중..."
  git merge main --no-edit || echo "병합할 변경사항 없음"
  echo ""
fi

# 6. dist 폴더 커밋
echo "📦 배포 파일 커밋 중..."
git add dist/
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
git commit -m "deploy: 지킴진단 프론트엔드 $TIMESTAMP" || echo "커밋할 변경사항 없음"
echo ""

# 7. dev0 브랜치에 푸시
echo "🚀 dev0 브랜치에 푸시 중..."
git push origin dev0
echo ""

# 8. 원래 브랜치로 복귀
if [ "$CURRENT_BRANCH" != "dev0" ]; then
  echo "🔄 원래 브랜치($CURRENT_BRANCH)로 복귀 중..."
  git checkout "$CURRENT_BRANCH"
  echo ""
fi

echo "✅ dev0 배포 완료!"
echo ""
echo "📋 배포 정보:"
echo "   - 브랜치: dev0"
echo "   - 타임스탬프: $TIMESTAMP"
echo "   - 원격 저장소: $(git remote get-url origin)"
echo ""
echo "🌐 다음 단계:"
echo "   1. dev0 서버에서 자동 배포가 시작됩니다"
echo "   2. 브라우저에서 dev0 URL 확인: [dev0-url]"
echo ""


