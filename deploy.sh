#!/bin/bash

# 지킴진단 프론트엔드 dev0 배포 스크립트

echo "🚀 지킴진단 프론트엔드 배포 준비 중..."

# 배포 디렉토리 생성
DIST_DIR="dist"
ASSETS_DIR="$DIST_DIR/assets"

# 기존 배포 디렉토리 삭제
if [ -d "$DIST_DIR" ]; then
  echo "📦 기존 배포 파일 삭제 중..."
  rm -rf "$DIST_DIR"
fi

# 배포 디렉토리 생성
mkdir -p "$ASSETS_DIR"

echo "📁 배포 파일 복사 중..."

# HTML 파일 복사
cp src/*.html "$DIST_DIR/"

# CSS 파일 복사
cp src/styles.css "$DIST_DIR/"

# ZUIX 2.0 변수 파일 복사
cp Design/assets/zuiX2.0-variables.css "$ASSETS_DIR/"

echo "🔧 CSS 경로 수정 중..."

# 모든 HTML 파일의 CSS 경로 수정
for file in "$DIST_DIR"/*.html; do
  if [ -f "$file" ]; then
    # macOS와 Linux 모두에서 동작하도록 sed 명령어 수정
    if [[ "$OSTYPE" == "darwin"* ]]; then
      # macOS
      sed -i '' 's|../Design/assets/zuiX2.0-variables.css|./assets/zuiX2.0-variables.css|g' "$file"
    else
      # Linux
      sed -i 's|../Design/assets/zuiX2.0-variables.css|./assets/zuiX2.0-variables.css|g' "$file"
    fi
    echo "  ✓ $(basename "$file") 경로 수정 완료"
  fi
done

echo "🔗 index.html 심볼릭 링크 생성 중..."
# 01-index.html을 index.html로 심볼릭 링크 생성 (Vercel 호환성)
if [ -f "$DIST_DIR/01-index.html" ]; then
  cd "$DIST_DIR"
  ln -sf 01-index.html index.html
  cd ..
  echo "  ✓ index.html 심볼릭 링크 생성 완료"
fi

echo ""
echo "✅ 배포 파일 생성 완료!"
echo ""
echo "📂 배포 디렉토리: $DIST_DIR"
echo ""
echo "📋 배포 파일 목록:"
ls -lh "$DIST_DIR" | grep -E "\.(html|css)$"
echo ""
ls -lh "$ASSETS_DIR"
echo ""
echo "🚀 다음 단계:"
echo "   1. $DIST_DIR 폴더의 내용을 dev0 서버에 업로드하세요"
echo "   2. 또는 Git을 통해 배포하세요:"
echo "      cd $DIST_DIR && git init && git add . && git commit -m 'deploy: 지킴진단 프론트엔드'"
echo ""


