# 디자인 에셋 (Design Assets)

이 폴더는 지킴진단 서비스의 디자인 에셋을 관리합니다.

## 파일 구조

```
assets/
├── README.md (이 파일)
├── zuiX2.0-variables.css  # ZUIX 2.0 디자인 시스템 CSS 변수
└── [기타 에셋 파일들]
```

## ZUIX 2.0 CSS Variables

### 파일: `zuiX2.0-variables.css`

ZUIX 2.0 디자인 시스템의 기본 CSS 변수들을 포함합니다.

#### 주요 색상 변수

**지킴진단 브랜드 색상:**
- `--Zigbang-Sub-Brand-Zikim: #009D41FF` - 지킴진단 Green (Primary Color)

**직방 브랜드 색상:**
- `--Zigbang-Orange-*` - 직방 Orange 색상 팔레트
- `--Zigbang-Navy-*` - 직방 Navy 색상 팔레트

**기본 색상:**
- `--base-black`, `--base-white` - 기본 흑백
- `--gray-*`, `--slate-*`, `--neutral-*` - 그레이 스케일
- `--red-*`, `--blue-*` - 상태 색상

#### 색상 시맨틱 (Colour Semantics)

- `--primary`: Primary 색상 (기본: Orange-600)
- `--secondary`: Secondary 색상
- `--accent`: Accent 색상
- `--destructive`: Destructive 색상 (에러, 경고)
- `--background`: 배경 색상
- `--foreground`: 전경 색상
- `--border`: 테두리 색상
- `--input`: 입력 필드 색상

#### 타이포그래피 (Typography)

**폰트 패밀리:**
- `--font-family-sans`: Pretendard (기본 Sans 폰트)
- `--font-family-serif`: Georgia
- `--font-family-mono`: Menlo

**폰트 사이즈:**
- `--font-size-xs` ~ `--font-size-9xl`: 12px ~ 128px

**폰트 굵기:**
- `--font-weight-thin` ~ `--font-weight-black`: 100 ~ 900

**자간 (Letter Spacing):**
- `--font-tracking-tighter` ~ `--font-tracking-widest`: -0.8px ~ 1.6px

**행간 (Line Height):**
- `--font-leading-3` ~ `--font-leading-10`: 12px ~ 40px

#### 스페이싱 (Spacing)

- `--spacing-0` ~ `--spacing-96`: 0px ~ 384px
- `--spacing-px`: 1px

#### 테두리 (Border)

**테두리 너비:**
- `--border-width-0` ~ `--border-width-8`: 0px ~ 8px

**테두리 반경:**
- `--border-radius-none` ~ `--border-radius-full`: 0px ~ 9999px

#### 투명도 (Opacity)

- `--opacity-0` ~ `--opacity-100`: 0px ~ 100px
- `--disabled`: 비활성화 상태 (var(--opacity-50) 참조)

#### 블러 (Blur)

- `--blur-none` ~ `--blur-3xl`: 0px ~ 64px

#### 너비 (Width)

**최소 너비:**
- `--min-width-0` ~ `--min-width-96`: 0px ~ 384px

**최대 너비:**
- `--max-width-0` ~ `--max-width-7xl`: 0px ~ 1280px

#### 반응형 브레이크포인트 (Responsive Breakpoints)

- `--screens-sm`: 640px
- `--screens-md`: 768px
- `--screens-lg`: 1024px
- `--screens-xl`: 1280px
- `--screens-2xl`: 1536px

#### 기타

- `--skew-0` ~ `--skew-12`: 변형 값
- `--margin-mt-*`: 마진 값

### 사용 방법

HTML 파일에서 다음과 같이 사용할 수 있습니다:

```html
<link rel="stylesheet" href="assets/zuiX2.0-variables.css">
```

CSS에서 변수 사용:

```css
.button-primary {
  background-color: var(--Zigbang-Sub-Brand-Zikim);
  color: var(--base-white);
}

.button-primary:hover {
  background-color: var(--primary-hover);
}
```

### 지킴진단 서비스 적용

지킴진단 서비스는 **Green 색상**을 Primary Color로 사용합니다:

```css
/* 지킴진단 Primary Color */
--zikim-primary: var(--Zigbang-Sub-Brand-Zikim); /* #009D41FF */

/* 사용 예시 */
.cta-button {
  background-color: var(--zikim-primary);
  color: var(--base-white);
}
```

## 참고 자료

- ZUIX 2.0 디자인 시스템: [Figma 링크](https://www.figma.com/design/4ZDxigMgcTwzJmNlrmY0iq/ZUIX-2.0?m=auto&t=YCrqYD4ySFnpuv4W-6)
- ZUIX 2.0 적용 방안: `../specifications/ZUIX2.0_적용방안.md`

