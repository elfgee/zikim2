# 지킴진단 프론트엔드 구현

## 개요

PRD_지킴진단.md를 기반으로 구현된 지킴진단 서비스의 프론트엔드 화면입니다.

## 화면 구조

### 구현된 화면 (총 10개)

1. **gateway.html** - 게이트웨이 (서비스 홈)
2. **property-detail.html** - 매물 상세 페이지
3. **start-no-address.html** - 지킴진단 시작 화면 (주소 없음)
4. **start-with-address.html** - 지킴진단 시작 화면 (주소 있음)
5. **payment.html** - 결제 화면
6. **waiting.html** - 리포트 생성 대기 화면
7. **index.html** - 리포트 상세 화면
8. **report-list.html** - 나의 지킴 진단 리포트 목록
9. **mypage.html** - 마이페이지 지킴진단내역

## 사용자 플로우

### 플로우 1: 게이트웨이에서 진단 시작

```
gateway.html 
  → start-no-address.html (주소 직접 입력)
  → payment.html (결제 화면)
  → 토스 브랜드 페이 팝업
  → waiting.html (리포트 생성 대기)
  → index.html (리포트 상세)
```

**특징:**
- 게이트웨이에서 지킴진단 배너 클릭
- 주소와 면적을 직접 입력
- 보증금, 월세(선택), 계약 기간 입력
- 약관 동의 후 결제 진행

### 플로우 2: 매물 상세에서 진단 시작

```
property-detail.html 
  → start-with-address.html (주소 자동 완성)
  → payment.html (결제 화면)
  → 토스 브랜드 페이 팝업
  → waiting.html (리포트 생성 대기)
  → index.html (리포트 상세)
```

**특징:**
- 매물 상세 페이지에서 지킴진단 배너 클릭
- 주소와 면적이 자동으로 입력됨
- 보증금, 월세(선택), 계약 기간만 입력
- 약관 동의 후 결제 진행

### 플로우 3: 마이페이지에서 리포트 확인

```
gateway.html 
  → mypage.html (마이 탭 선택)
  → report-list.html (전체보기 클릭)
  → index.html (리포트 상세 - 위험/안전 매물)
```

**특징:**
- 마이페이지에서 지킴진단 내역 확인
- 전체보기 클릭 시 리포트 목록으로 이동
- 위험한 매물과 안전한 매물 각각 클릭하여 상세 확인
- 리포트 상세 화면에서 위험/안전 상태에 따라 다른 내용 표시

## 리포트 상세 화면 동작

### 위험한 매물 (risky)
- AI 요약: "경매 절차가 진행 중" 등 위험 요소 강조
- 진단 항목 요약: "확인이 필요한 항목들이 있어요!"
- 확인 필요 항목의 아코디언이 펼쳐진 상태로 표시
- 특약 조항 탭 표시

### 안전한 매물 (safe)
- AI 요약: "모든 주요 점검 항목이 양호" 메시지
- 진단 항목 요약: "주요 점검 모두 양호해요."
- 모든 항목의 아코디언이 접힌 상태로 표시
- 특약 조항 탭 숨김

## 기술 스택

- **HTML5**
- **CSS3** (ZUIX 2.0 Design System)
- **JavaScript** (Vanilla JS)
- **Font Awesome 6.4.0** (아이콘)
- **Inter, Noto Sans KR** (폰트)

## 디자인 시스템

- **ZUIX 2.0** 디자인 시스템 적용
- CSS 변수 사용 (`zuiX2.0-variables.css`)
- 반응형 디자인 (Mobile First)
- 위험도 레벨 2단계:
  - 양호 (Green): `#009D41`
  - 확인 필요 (Red): `var(--red-500)`

## 주요 기능

### 1. 아코디언 형식 진단 항목
- 양호한 항목: 접혀있는 상태 (클릭 시 펼쳐짐)
- 확인 필요 항목: 펼쳐있는 상태 (법률 용어 설명 포함)
- 모든 항목에 법률 용어 설명 제공

### 2. 탭 메뉴
- 매물 진단, 집주인 진단, 시세진단, 대출/보험 진단, 범죄/치안, 생활/편의, 맞춤 특약
- Sticky 네비게이션
- 확인 필요 항목 개수 표시

### 3. 리포트 생성 대기
- 진행률 표시 (0-100%)
- 단계별 상태 표시
- 예상 소요 시간 안내

### 4. 결제 화면
- 결제 정보 확인 (29,900원)
- 매물 요약 정보 표시
- 필수 약관 동의
- 토스 브랜드 페이 팝업 연동
- 실제 구현 시 토스 브랜드 페이 API 연동 필요

## 파일 구조

```
src/
├── index.html              # 리포트 상세 화면
├── gateway.html            # 게이트웨이
├── property-detail.html    # 매물 상세
├── start-no-address.html  # 진단 시작 (주소 없음)
├── start-with-address.html # 진단 시작 (주소 있음)
├── payment.html           # 결제 화면
├── waiting.html           # 리포트 생성 대기
├── report-list.html       # 리포트 목록
├── mypage.html           # 마이페이지
├── styles.css            # 공통 스타일
└── README.md             # 이 파일
```

## 실행 방법

1. 각 HTML 파일을 브라우저에서 직접 열기
2. 또는 로컬 서버 실행:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```

## 데이터 전달

화면 간 데이터 전달은 `sessionStorage`를 사용합니다:

- `diagnosisFormData`: 진단 시작 화면에서 입력한 매물 정보
- `reportType`: 리포트 타입 ('risky' 또는 'safe')

## 다음 단계

1. **백엔드 API 연동**
   - 진단 리포트 생성 API
   - 리포트 목록 조회 API
   - 사용자 정보 API

2. **토스 브랜드 페이 API 연동**
   - 실제 결제 프로세스 구현
   - 결제 성공/실패 처리

3. **푸시 알림 연동**
   - 리포트 생성 완료 알림
   - 알림 클릭 시 리포트 상세 화면으로 이동

4. **PDF 다운로드 기능**
   - 리포트 PDF 생성
   - 파일 다운로드

## 참고 문서

- PRD: `../docs/PRD_지킴진단.md`
- 리포트 상세 PRD: `../docs/PRD_지킴진단_리포트상세.md`
- 와이어프레임: `../Design/wireframes/`
- 디자인 시스템: `../Design/assets/zuiX2.0-variables.css`
