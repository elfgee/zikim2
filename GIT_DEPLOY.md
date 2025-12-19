# Git을 통한 dev0 배포 가이드

## 현재 Git 상태

- **원격 저장소**: `https://github.com/elfgee/zikim.git`
- **현재 브랜치**: `main`
- **배포 파일**: `dist/` 폴더

---

## 배포 방법 선택

dev0 환경에 따라 다음 중 하나를 선택하세요:

### 방법 1: dev0가 별도 브랜치인 경우

dev0 서버가 특정 브랜치(예: `dev0`, `staging`)를 자동으로 배포하는 경우:

```bash
# 1. 배포 파일 생성
./deploy.sh

# 2. 변경사항 커밋
git add .
git commit -m "feat: 지킴진단 프론트엔드 배포 준비"

# 3. dev0 브랜치로 전환 (없으면 생성)
git checkout -b dev0

# 4. dist 폴더의 내용을 루트로 이동 (필요한 경우)
# 또는 dev0 브랜치에서 dist/ 폴더를 서빙하도록 설정

# 5. dev0 브랜치에 푸시
git push origin dev0
```

### 방법 2: dev0가 별도 원격 저장소인 경우

dev0가 별도의 Git 저장소를 사용하는 경우:

```bash
# 1. 배포 파일 생성
./deploy.sh

# 2. dev0 원격 저장소 추가 (한 번만 실행)
git remote add dev0 [dev0-git-url]
# 예: git remote add dev0 https://dev0.example.com/repo.git

# 3. dist 폴더를 dev0에 푸시
cd dist
git init
git add .
git commit -m "deploy: 지킴진단 프론트엔드"
git remote add origin [dev0-git-url]
git push -u origin main
```

### 방법 3: GitHub Pages를 사용하는 경우

GitHub Pages로 배포하는 경우:

```bash
# 1. 배포 파일 생성
./deploy.sh

# 2. gh-pages 브랜치 생성 및 배포
git subtree push --prefix dist origin gh-pages

# 또는
cd dist
git init
git checkout -b gh-pages
git add .
git commit -m "deploy: 지킴진단 프론트엔드"
git remote add origin https://github.com/elfgee/zikim.git
git push origin gh-pages
```

### 방법 4: dist 폴더를 서브모듈로 관리하는 경우

```bash
# 1. 배포 파일 생성
./deploy.sh

# 2. dist를 서브모듈로 추가
git submodule add [dev0-git-url] dist

# 3. 서브모듈 업데이트
cd dist
git add .
git commit -m "deploy: 지킴진단 프론트엔드"
git push origin main
cd ..
git add dist
git commit -m "chore: dist 서브모듈 업데이트"
```

---

## 추천 방법: dev0 브랜치 사용

가장 일반적인 방법은 dev0 브랜치를 사용하는 것입니다:

### 초기 설정 (한 번만 실행)

```bash
# 1. dev0 브랜치 생성
git checkout -b dev0

# 2. 배포 파일 생성
./deploy.sh

# 3. dist 폴더 내용을 커밋
git add dist/
git commit -m "feat: 지킴진단 프론트엔드 배포 파일"

# 4. dev0 브랜치에 푸시
git push -u origin dev0
```

### 이후 배포 (업데이트 시)

```bash
# 1. main 브랜치에서 작업
git checkout main

# 2. 소스 코드 수정 후 커밋
git add .
git commit -m "fix: [수정 내용]"
git push origin main

# 3. 배포 파일 재생성
./deploy.sh

# 4. dev0 브랜치로 전환
git checkout dev0

# 5. main 브랜치의 변경사항 병합
git merge main

# 6. dist 폴더 업데이트 커밋
git add dist/
git commit -m "deploy: 지킴진단 프론트엔드 업데이트"

# 7. dev0 브랜치에 푸시
git push origin dev0
```

---

## 자동화 스크립트

배포를 자동화하려면 `deploy-to-dev0.sh` 스크립트를 사용하세요:

```bash
#!/bin/bash

echo "🚀 dev0 배포 시작..."

# 배포 파일 생성
./deploy.sh

# dev0 브랜치로 전환
git checkout dev0 2>/dev/null || git checkout -b dev0

# main 브랜치의 변경사항 병합
git merge main

# dist 폴더 커밋
git add dist/
git commit -m "deploy: 지킴진단 프론트엔드 $(date +%Y%m%d-%H%M%S)"

# dev0 브랜치에 푸시
git push origin dev0

echo "✅ dev0 배포 완료!"
echo "🌐 dev0 URL: [dev0-url]"
```

---

## 배포 확인

배포 후 다음을 확인하세요:

1. **브라우저에서 접근**
   ```
   https://dev0.example.com/gateway.html
   ```

2. **개발자 도구 확인**
   - Network 탭에서 CSS 파일 로드 확인
   - Console에서 에러 확인

3. **화면 간 링크 테스트**
   - 모든 화면 전환이 정상 동작하는지 확인

---

## 문제 해결

### 배포 후 CSS가 로드되지 않는 경우

```bash
# dist 폴더의 파일 구조 확인
ls -la dist/
ls -la dist/assets/

# HTML 파일의 CSS 경로 확인
grep "zuiX2.0-variables.css" dist/*.html
```

### Git 충돌 발생 시

```bash
# 충돌 해결
git status
# 충돌 파일 수정
git add .
git commit -m "fix: 충돌 해결"
git push origin dev0
```

### 배포 파일이 업데이트되지 않는 경우

```bash
# dist 폴더 강제 재생성
rm -rf dist/
./deploy.sh
git add dist/
git commit -m "fix: 배포 파일 재생성"
git push origin dev0
```

---

## 참고사항

- `dist/` 폴더는 배포 전용이므로 `.gitignore`에 추가하지 마세요
- 배포 파일은 자동 생성되므로 수동으로 수정하지 마세요
- 소스 코드는 `src/` 폴더에서 수정하고, 배포는 `./deploy.sh`로 자동화하세요

