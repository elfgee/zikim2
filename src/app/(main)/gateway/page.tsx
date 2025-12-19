import Link from "next/link";

export default function GatewayPage() {
  return (
    <div className="px-[var(--spacing-5)] pt-[var(--spacing-6)]">
      {/* 상단 헤더 */}
      <header className="flex items-start justify-between gap-[var(--spacing-4)]">
        <h1 className="text-[length:var(--font-size-2xl)] leading-[length:var(--font-leading-9)] font-bold tracking-tight text-gray-900">
          부동산은
          <br />
          직방으로 하는거야
        </h1>
        <div className="flex items-center gap-[var(--spacing-3)] pt-[var(--spacing-1)]">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5"
            aria-label="알림"
          >
            <span className="text-sm text-gray-700">알</span>
          </button>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5"
            aria-label="설정"
          >
            <span className="text-sm text-gray-700">설</span>
          </button>
        </div>
      </header>

      {/* 매물 타입 그리드 */}
      <section className="mt-[var(--spacing-5)] space-y-[var(--spacing-2)]">
        <div className="flex gap-[var(--spacing-2)]">
          <Link
            href="/property"
            className="flex basis-1/2 flex-col items-center justify-center gap-[var(--spacing-3)] rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-white p-[var(--spacing-4)] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-50 text-lg font-bold text-gray-900">
              A
            </div>
            <span className="text-[length:var(--font-size-sm)] font-bold leading-5 text-gray-900">
              아파트
            </span>
          </Link>

          <div className="flex basis-1/2 flex-col gap-[var(--spacing-2)]">
            <button
              type="button"
              className="flex h-[72px] items-center gap-[var(--spacing-2)] rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-white p-[var(--spacing-4)] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]"
              aria-label="원룸 (준비중)"
            >
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-50 text-sm font-bold text-gray-900">
                1
              </div>
              <span className="text-[length:var(--font-size-sm)] font-bold leading-5 text-gray-900">
                원룸
              </span>
              <span className="ml-auto text-xs text-gray-400">준비중</span>
            </button>
            <button
              type="button"
              className="flex h-[72px] items-center gap-[var(--spacing-2)] rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-white p-[var(--spacing-4)] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]"
              aria-label="빌라/투룸+ (준비중)"
            >
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-50 text-sm font-bold text-gray-900">
                V
              </div>
              <span className="text-[length:var(--font-size-sm)] font-bold leading-5 text-gray-900">
                빌라/투룸+
              </span>
              <span className="ml-auto text-xs text-gray-400">준비중</span>
            </button>
          </div>
        </div>

        <div className="flex gap-[var(--spacing-2)]">
          <button
            type="button"
            className="flex basis-1/2 items-center gap-[var(--spacing-2)] rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-white p-[var(--spacing-4)] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]"
            aria-label="오피스텔 (준비중)"
          >
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-50 text-sm font-bold text-gray-900">
              O
            </div>
            <span className="text-[length:var(--font-size-sm)] font-bold leading-5 text-gray-900">
              오피스텔
            </span>
            <span className="ml-auto text-xs text-gray-400">준비중</span>
          </button>
          <button
            type="button"
            className="flex basis-1/2 items-center gap-[var(--spacing-2)] rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-white p-[var(--spacing-4)] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]"
            aria-label="상가 (준비중)"
          >
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-50 text-sm font-bold text-gray-900">
              S
            </div>
            <span className="text-[length:var(--font-size-sm)] font-bold leading-5 text-gray-900">
              상가
            </span>
            <span className="ml-auto text-xs text-gray-400">준비중</span>
          </button>
        </div>
      </section>

      {/* 서비스 카드 */}
      <section className="mt-[var(--spacing-4)] space-y-[var(--spacing-2)]">
        {/* 직방에 집 내놓기 */}
        <div className="relative pt-[var(--spacing-4)]">
          <div className="absolute left-[var(--spacing-3)] top-0">
            <span className="inline-flex rounded-full bg-[color:var(--Zigbang-Orange-600)] px-2 py-1 text-[11px] font-medium leading-[14px] text-white">
              집주인, 세입자 모두 가능
            </span>
          </div>
          <button
            type="button"
            className="flex w-full items-center gap-[var(--spacing-3)] rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-white p-[var(--spacing-5)] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]"
          >
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-50 text-sm font-bold text-gray-900">
              집
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="text-[length:var(--font-size-sm)] font-bold leading-5 text-gray-900">
                직방에 집 내놓기
              </div>
              <div className="mt-1 text-xs leading-4 text-gray-500">
                매매, 전세, 월세 상관없이 쉽고 빠르게 내 집을 내놓을 수 있어요.
              </div>
            </div>
            <div className="text-gray-400">›</div>
          </button>
        </div>

        {/* 지킴진단 */}
        <Link
          href="/diagnosis/start"
          className="flex items-center gap-[var(--spacing-3)] rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-white p-[var(--spacing-5)] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]"
        >
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[color:var(--Zigbang-Sub-Brand-Zikim)] text-sm font-bold text-white">
            Z
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[length:var(--font-size-sm)] font-bold leading-5 text-gray-900">
              지킴진단
            </div>
            <div className="mt-1 text-xs leading-4 text-gray-500">
              보증금 회수 위험부터 계약 안정성까지
              <br />
              전문가가 분석한 매물 진단 리포트
            </div>
          </div>
          <div className="text-gray-400">›</div>
        </Link>
      </section>

      {/* 프로모 배너 */}
      <section className="mt-[var(--spacing-4)] pb-[var(--spacing-6)]">
        <div className="flex items-center justify-between gap-[var(--spacing-4)] rounded-[var(--border-radius-2xl)] bg-[#f6f6f6] p-[var(--spacing-4)]">
          <div className="min-w-0">
            <div className="text-[length:var(--font-size-base)] font-bold leading-tight text-gray-900">
              전월세 보증금 대출 출시
            </div>
            <div className="mt-1 text-xs text-gray-500">
              전세대출 받고 전세지킴 보증도 같이 받아요
            </div>
            <button
              type="button"
              className="mt-[var(--spacing-3)] inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-900"
            >
              보러가기
            </button>
          </div>
          <div className="grid h-[72px] w-[72px] place-items-center rounded-2xl bg-white text-sm font-bold text-gray-400">
            이미지
          </div>
        </div>
      </section>

      {/* 최신 부동산 동향 (샘플) */}
      <section className="pb-[var(--spacing-8)]">
        <header className="flex items-center justify-between py-[var(--spacing-2)]">
          <h2 className="text-[length:var(--font-size-xl)] font-bold leading-[30px] text-gray-900">
            최신 부동산 동향
          </h2>
          <button type="button" className="text-sm text-gray-500">
            더보기
          </button>
        </header>
        <div className="space-y-[var(--spacing-2)]">
          {[
            {
              title:
                "10.15대책 이후 수도권 비규제지역 아파트\n매매 거래 22% 증가",
              date: "25.11.12",
              views: "3,767",
              likes: "245",
              highlight: true,
            },
            {
              title: "전세시장 동향: 체감 전세가 안정세",
              date: "25.11.10",
              views: "2,114",
              likes: "98",
              highlight: false,
            },
          ].map((a) => (
            <article
              key={a.title}
              className="rounded-[var(--border-radius-2xl)] bg-white p-[var(--spacing-5)] shadow-[0px_4px_8px_0px_rgba(26,26,26,0.06)]"
            >
              <div
                className={[
                  "whitespace-pre-line text-[length:var(--font-size-base)] leading-5",
                  a.highlight ? "font-bold text-gray-900" : "text-gray-700",
                ].join(" ")}
              >
                {a.title}
                {a.highlight ? (
                  <span className="ml-2 inline-flex rounded-full bg-[color:var(--Zigbang-Orange-600)] px-2 py-0.5 text-[10px] font-bold leading-4 text-white">
                    NEW
                  </span>
                ) : null}
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                <span>{a.date}</span>
                <span>조회 {a.views}</span>
                <span>좋아요 {a.likes}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
