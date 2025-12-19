# dev0 서버 배포 가이드

## 배포 방법 선택

dev0 서버의 설정에 따라 다음 중 하나를 선택하세요:

---

## 방법 1: Git을 통한 배포 (추천)

dev0 서버가 Git 저장소와 연동되어 자동 배포하는 경우:

### 자동 배포 스크립트 사용

```bash
./deploy-to-dev0.sh
```

이 스크립트가 자동으로:
1. 배포 파일 생성 (`./deploy.sh`)
2. dev0 브랜치로 전환
3. 변경사항 커밋
4. dev0 브랜치에 푸시

### 수동 배포

```bash
# 1. 배포 파일 생성
./deploy.sh

# 2. dev0 브랜치로 전환
git checkout dev0

# 3. 변경사항 커밋
git add dist/
git commit -m "deploy: 지킴진단 프론트엔드 업데이트"

# 4. dev0 브랜치에 푸시
git push origin dev0
```

---

## 방법 2: SSH/SCP를 통한 파일 업로드

dev0 서버에 SSH 접근이 가능한 경우:

### 1. SSH 접속 정보 확인 필요
- 서버 주소: `dev0.example.com` (예시)
- 사용자명: `username` (예시)
- 배포 경로: `/var/www/html` (예시)

### 2. SCP로 파일 업로드

```bash
# dist 폴더 전체를 서버에 업로드
scp -r dist/* username@dev0.example.com:/var/www/html/

# 또는 특정 파일만 업로드
scp -r dist/ username@dev0.example.com:/var/www/html/
```

### 3. rsync 사용 (더 효율적)

```bash
# 변경된 파일만 동기화
rsync -avz --delete dist/ username@dev0.example.com:/var/www/html/
```

---

## 방법 3: FTP/SFTP를 통한 업로드

FTP 클라이언트를 사용하는 경우:

### 필요한 정보
- FTP 서버 주소
- 포트 (일반적으로 21 또는 22)
- 사용자명/비밀번호
- 배포 경로

### 추천 FTP 클라이언트
- **FileZilla** (무료, 크로스 플랫폼)
- **Cyberduck** (Mac)
- **WinSCP** (Windows)

### 업로드 방법
1. FTP 클라이언트 실행
2. dev0 서버에 연결
3. `dist/` 폴더의 모든 파일을 서버의 배포 경로로 드래그 앤 드롭

---

## 방법 4: CI/CD 파이프라인 (자동화)

GitHub Actions, GitLab CI 등을 사용하는 경우:

### GitHub Actions 예시

`.github/workflows/deploy-dev0.yml` 파일 생성:

```yaml
name: Deploy to dev0

on:
  push:
    branches:
      - dev0

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
      
      - name: Deploy to dev0
        run: |
          ./deploy.sh
          # 배포 스크립트 실행
```

---

## 배포 전 확인 사항

### ✅ 체크리스트

- [ ] `dist/` 폴더에 모든 파일이 있는지 확인
  ```bash
  ls -la dist/
  ```

- [ ] CSS 경로가 올바른지 확인
  ```bash
  grep "zuiX2.0-variables.css" dist/*.html
  ```
  → `./assets/zuiX2.0-variables.css`로 표시되어야 함

- [ ] assets 폴더가 있는지 확인
  ```bash
  ls -la dist/assets/
  ```

- [ ] payment.html이 포함되어 있는지 확인
  ```bash
  ls dist/payment.html
  ```

---

## 배포 후 확인

### 1. 브라우저에서 접근 테스트

```
https://dev0.example.com/gateway.html
https://dev0.example.com/payment.html
https://dev0.example.com/index.html
```

### 2. 개발자 도구 확인

- **Network 탭**: CSS 파일 로드 확인
  - `assets/zuiX2.0-variables.css` 로드 여부
  - Font Awesome, Google Fonts 로드 여부

- **Console 탭**: JavaScript 에러 확인

### 3. 화면 테스트

- [ ] 모든 화면 접근 가능
- [ ] 화면 간 링크 정상 동작
- [ ] 결제하기 버튼 클릭 시 알림 표시
- [ ] 아코디언, 탭 등 인터랙션 정상 동작

---

## 문제 해결

### CSS가 로드되지 않는 경우

```bash
# 서버에서 파일 경로 확인
ls -la /var/www/html/assets/zuiX2.0-variables.css

# HTML 파일의 경로 확인
grep "assets/zuiX2.0-variables.css" /var/www/html/*.html
```

### 권한 문제

```bash
# 파일 권한 설정
chmod -R 755 /var/www/html/
chown -R www-data:www-data /var/www/html/
```

### 캐시 문제

- 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
- 하드 리프레시 (Ctrl+Shift+R 또는 Cmd+Shift+R)

---

## dev0 서버 정보 확인 필요

다음 정보를 확인하시면 더 구체적인 배포 방법을 안내할 수 있습니다:

1. **서버 접근 방식**
   - [ ] Git 브랜치 자동 배포
   - [ ] SSH/SCP 접근 가능
   - [ ] FTP/SFTP 접근 가능
   - [ ] CI/CD 파이프라인 사용

2. **서버 정보** (SSH/FTP 사용 시)
   - 서버 주소: `_________________`
   - 사용자명: `_________________`
   - 배포 경로: `_________________`

3. **배포 URL**
   - dev0 접속 URL: `_________________`

---

## 빠른 배포 (Git 사용 시)

가장 간단한 방법:

```bash
./deploy-to-dev0.sh
```

이 명령어 하나로 모든 배포 과정이 자동으로 완료됩니다!

