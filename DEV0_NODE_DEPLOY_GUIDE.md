## DEV0 Node 런타임 배포 가이드 (Next.js App Router)

이 프로젝트는 **정적 export**가 아니라, dev0 서버에서 **Node 런타임으로 `next start`** 를 실행하는 배포 방식을 권장합니다.

---

## 0) 전제

- **Node.js 20.x** (레포 `.nvmrc` 참고)
- 서버에서 `git`, `npm` 사용 가능
- 프로세스 매니저는 **PM2 권장**
- 서버에 `3000` 포트(또는 리버스 프록시)가 열려 있어야 함

---

## 1) dev0 서버 1회 초기 셋업

### 1-1) 레포 클론

```bash
mkdir -p ~/apps && cd ~/apps
git clone https://github.com/elfgee/zikim2.git zikim-dev0
cd zikim-dev0
```

### 1-2) main 브랜치 사용 (현재 운영 방식)

```bash
git fetch origin
git checkout -B main origin/main
```

> 현재는 **`main`만** 사용합니다. (배포 브랜치 분리는 추후 필요해지면 도입)

### 1-3) 의존성 설치 + 빌드

```bash
npm ci
npm run build
```

### 1-4) PM2 설치 및 실행

```bash
npm i -g pm2
pm2 start ecosystem.config.cjs
pm2 save
```

서버 재부팅 후 자동 시작까지 필요하면(서버 환경에 따라):

```bash
pm2 startup
```

---

## 2) 배포(반복) 절차

### 2-1) GitHub `main` 업데이트

로컬에서 작업을 커밋하고 `origin/main`으로 푸시합니다.

```bash
git push origin main
```

### 2-2) dev0 서버에서 pull/build/restart (main 기준)

```bash
cd ~/apps/zikim-dev0
git fetch origin
git checkout main
git pull --ff-only origin main
npm ci
npm run build
pm2 restart zikim-dev0
```

### (권장) dev0 서버에서 한 번에 배포하기

아래 스크립트는 서버에서 **pull → install → build → pm2 restart**를 한 번에 수행합니다.

```bash
cd ~/apps/zikim-dev0
chmod +x deploy-on-server.sh
./deploy-on-server.sh
```

포트/앱 이름/브랜치를 바꾸고 싶으면 환경변수로 오버라이드할 수 있습니다:

```bash
PM2_APP_NAME=zikim-dev0 BRANCH=main ./deploy-on-server.sh
```

---

## (옵션) 배포 브랜치(dev0) 운영

나중에 “개발/배포 브랜치 분리”가 필요해지면 아래 방식으로 전환할 수 있습니다.

- **개념**: 로컬 `main` → 원격 `dev0`로 푸시(배포 트리거) → dev0 서버는 `origin/dev0`만 pull
- **트리거 스크립트**: `./deploy-to-dev0-node.sh`

---

## 3) 운영 팁

- 로그 확인:

```bash
pm2 logs zikim-dev0 --lines 200
```

- 상태 확인:

```bash
pm2 status
```

- 포트 변경:
  - `ecosystem.config.cjs`의 `args: "start -p 3000"` 수정


