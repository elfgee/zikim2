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

### 1-2) dev0 배포 브랜치 사용 (권장)

```bash
git fetch origin
git checkout -B dev0 origin/dev0
```

> dev0 브랜치는 “배포 대상 브랜치”로 쓰고, `main`은 개발/통합 브랜치로 유지하는 운영을 추천합니다.

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

### 2-1) GitHub에서 dev0 브랜치로 배포 트리거

로컬에서 아래 스크립트를 실행:

```bash
./deploy-to-dev0-node.sh
```

이 스크립트는 로컬 `main`을 원격 `dev0` 브랜치로 푸시합니다.

### 2-2) dev0 서버에서 pull/build/restart

```bash
cd ~/apps/zikim-dev0
git fetch origin
git checkout dev0
git pull --ff-only origin dev0
npm ci
npm run build
pm2 restart zikim-dev0
```

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


