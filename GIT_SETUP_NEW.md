# 새로운 GitHub 저장소 연결 가이드

## 현재 상태

기존 원격 저장소 연결이 제거되었습니다.

---

## 새로운 GitHub 저장소 연결 방법

### 1. 새로운 GitHub 저장소 생성

1. GitHub에 로그인
2. 우측 상단의 **+** 버튼 클릭 → **New repository** 선택
3. 저장소 이름 입력 (예: `zikim`)
4. **Public** 또는 **Private** 선택
5. **Create repository** 클릭

### 2. 로컬 저장소와 연결

새로운 저장소 URL을 받은 후 다음 명령어를 실행하세요:

```bash
# 새로운 원격 저장소 추가
git remote add origin https://github.com/[새로운사용자명]/[저장소명].git

# 또는 SSH 사용 시
git remote add origin git@github.com:[새로운사용자명]/[저장소명].git
```

### 3. 연결 확인

```bash
git remote -v
```

### 4. 첫 푸시

```bash
# 모든 브랜치 푸시
git push -u origin main

# dev0 브랜치도 푸시
git push -u origin dev0
```

---

## 인증 방법

### HTTPS 사용 시

GitHub에서 Personal Access Token을 사용해야 합니다:

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. **Generate new token** 클릭
3. 필요한 권한 선택 (repo 권한 필수)
4. 토큰 생성 후 복사
5. 푸시 시 비밀번호 대신 토큰 사용

### SSH 사용 시

SSH 키를 설정해야 합니다:

```bash
# SSH 키 생성 (없는 경우)
ssh-keygen -t ed25519 -C "your_email@example.com"

# SSH 키를 GitHub에 추가
# 1. 공개 키 복사
cat ~/.ssh/id_ed25519.pub

# 2. GitHub → Settings → SSH and GPG keys → New SSH key
# 3. 복사한 키를 붙여넣고 저장
```

---

## 주의사항

### 커밋되지 않은 변경사항

현재 main 브랜치가 origin/main보다 3 커밋 앞서 있습니다. 
새 저장소에 푸시하기 전에:

```bash
# 현재 상태 확인
git log --oneline -5

# 필요시 커밋 메시지 확인
git log
```

### 기존 브랜치

dev0 브랜치도 함께 푸시해야 합니다:

```bash
# 모든 브랜치 확인
git branch -a

# dev0 브랜치 푸시
git push -u origin dev0
```

---

## 빠른 시작 (새 저장소 URL이 있는 경우)

새로운 GitHub 저장소 URL을 받으셨다면:

```bash
# 1. 원격 저장소 추가
git remote add origin [새로운저장소URL]

# 2. 연결 확인
git remote -v

# 3. 모든 브랜치 푸시
git push -u origin main
git push -u origin dev0
```

---

## 문제 해결

### 인증 오류 발생 시

```bash
# GitHub 인증 정보 재설정
git config --global credential.helper store

# 또는 SSH 사용으로 전환
git remote set-url origin git@github.com:[사용자명]/[저장소명].git
```

### 푸시 거부 시

```bash
# 강제 푸시 (주의: 기존 히스토리를 덮어씀)
git push -u origin main --force

# 또는 새 저장소이므로 안전하게 푸시
git push -u origin main
```

