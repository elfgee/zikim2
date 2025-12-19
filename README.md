# 지킴진단(zikim) – UI/UX 목업 검증용 프론트엔드

현재 목적은 **개인 프로젝트 UI/UX 및 목업 동작 검증**이며, 서버(dev0) 배포 대신 **Vercel Preview 환경**에서 확인합니다.

---

## 로컬 실행

```bash
npm ci
npm run dev
```

기본 진입: `http://localhost:3000/` → `/gateway`로 리다이렉트됩니다.

---

## Vercel Preview로 확인하기(권장)

### 1) Vercel에 GitHub 레포 Import
- Vercel에서 `elfgee/zikim2` 레포를 Import
- Framework Preset: **Next.js**

### 2) (기본값이면 그대로) Build 설정
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: (비움)
- Node 버전: `package.json`의 `engines.node`는 **20.x** 입니다.

### 3) Preview URL 확인
- `main` 브랜치에 커밋/푸시하면 Vercel이 자동으로 빌드/배포합니다.
- PR을 사용하면 PR 단위로 Preview URL이 생성됩니다.

---

## 참고

- 일부 화면은 `sessionStorage` 기반 목업 흐름을 사용합니다.
  - 예: `/diagnosis/start` → `/payment` → `/waiting` → `/reports/<id>`


