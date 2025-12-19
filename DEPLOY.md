# dev0 배포 가이드

## 배포 준비

### 1. 배포 파일 구조

dev0에 배포할 파일 구조:

```
dev0/
├── index.html              # 리포트 상세 화면
├── gateway.html            # 게이트웨이
├── property-detail.html    # 매물 상세
├── start-no-address.html  # 진단 시작 (주소 없음)
├── start-with-address.html # 진단 시작 (주소 있음)
├── waiting.html           # 리포트 생성 대기
├── report-list.html       # 리포트 목록
├── mypage.html           # 마이페이지
├── styles.css            # 공통 스타일
└── assets/
    └── zuiX2.0-variables.css  # ZUIX 2.0 디자인 변수
```

### 2. 배포 전 체크리스트

- [ ] 모든 HTML 파일의 CSS 경로 확인
- [ ] ZUIX 2.0 변수 파일 경로 수정
- [ ] 외부 리소스 (Font Awesome, Google Fonts) CDN 확인
- [ ] 모든 화면 간 링크 확인
- [ ] 반응형 디자인 테스트

### 3. CSS 경로 수정 필요

현재 모든 HTML 파일이 `../Design/assets/zuiX2.0-variables.css`를 참조하고 있습니다.

dev0 배포 시 경로를 `./assets/zuiX2.0-variables.css`로 변경해야 합니다.

## 배포 방법

### 방법 1: 수동 배포

1. `src/` 폴더의 모든 HTML 파일과 `styles.css`를 dev0 서버에 업로드
2. `Design/assets/zuiX2.0-variables.css`를 `assets/zuiX2.0-variables.css`로 복사
3. 모든 HTML 파일의 CSS 경로를 `./assets/zuiX2.0-variables.css`로 수정

### 방법 2: 배포 스크립트 사용

`deploy.sh` 스크립트를 실행하여 자동으로 배포 파일 생성:

```bash
chmod +x deploy.sh
./deploy.sh
```

생성된 `dist/` 폴더를 dev0 서버에 업로드합니다.

### 방법 3: Git을 통한 배포

dev0가 Git 저장소와 연동되어 있다면:

```bash
git add .
git commit -m "feat: 지킴진단 프론트엔드 구현 완료"
git push origin dev0
```

## 배포 후 확인 사항

1. **화면 접근 확인**
   - gateway.html 접근 가능 여부
   - 모든 화면 간 링크 동작 확인

2. **스타일 확인**
   - ZUIX 2.0 변수 로드 확인
   - 폰트 (Inter, Noto Sans KR) 로드 확인
   - Font Awesome 아이콘 표시 확인

3. **기능 확인**
   - 아코디언 동작 확인
   - 탭 전환 동작 확인
   - 폼 검증 동작 확인
   - 리포트 타입별 표시 확인 (위험/안전)

4. **반응형 확인**
   - 모바일 화면 크기에서 레이아웃 확인
   - 스크롤 동작 확인

## 문제 해결

### CSS가 로드되지 않는 경우
- `assets/zuiX2.0-variables.css` 파일 경로 확인
- 브라우저 개발자 도구에서 네트워크 탭 확인

### 폰트가 적용되지 않는 경우
- Google Fonts CDN 연결 확인
- 네트워크 연결 확인

### 아이콘이 표시되지 않는 경우
- Font Awesome CDN 연결 확인
- 네트워크 연결 확인


