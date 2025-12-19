import Link from "next/link";

export default function MyPage() {
  return (
    <div className="bg-white">
      {/* Header (wireframe 7 참고) */}
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="flex items-center justify-between px-[var(--spacing-5)] py-3">
          <h1 className="text-[length:var(--font-size-lg)] font-bold leading-[length:var(--font-leading-7)] text-neutral-900">
            마이페이지
          </h1>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-neutral-600 hover:bg-neutral-50 active:bg-neutral-100"
            aria-label="알림(준비중)"
          >
            🔔
          </button>
        </div>
      </header>

      <main className="pb-[calc(env(safe-area-inset-bottom)+var(--spacing-20))]">
        {/* 프로필 */}
        <section className="border-b border-neutral-100 px-[var(--spacing-5)] py-[var(--spacing-6)]">
          <div className="flex items-center justify-between gap-[var(--spacing-4)]">
            <div className="flex min-w-0 items-center gap-[var(--spacing-4)]">
              <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-neutral-200 bg-neutral-50 text-lg font-bold text-neutral-700">
                김
              </div>
              <div className="min-w-0">
                <div className="text-[length:var(--font-size-xl)] font-bold leading-[length:var(--font-leading-8)] text-neutral-900">
                  김지킴
                </div>
                <div className="mt-1 truncate text-[length:var(--font-size-sm)] leading-[length:var(--font-leading-6)] text-neutral-500">
                  jikim@example.com
                </div>
              </div>
            </div>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full text-neutral-600 hover:bg-neutral-50 active:bg-neutral-100"
              aria-label="설정(준비중)"
            >
              ⚙︎
            </button>
          </div>

          <div className="mt-[var(--spacing-4)] grid grid-cols-3 gap-3">
            {[
              { label: "진단 내역", value: "12" },
              { label: "관심 단지", value: "3" },
              { label: "저장 목록", value: "8" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-neutral-50 p-3 text-center"
              >
                <div className="text-2xl font-bold text-neutral-900">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-medium text-neutral-600">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 퀵 액션 */}
        <section className="border-b border-neutral-100 px-[var(--spacing-5)] py-[var(--spacing-4)]">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "찜한 매물", icon: "❤️" },
              { label: "최근 본", icon: "🕒" },
              { label: "계약 관리", icon: "📄" },
              { label: "결제 내역", icon: "🧾" },
            ].map((a) => (
              <button
                key={a.label}
                type="button"
                className="flex flex-col items-center gap-2"
                aria-label={`${a.label}(준비중)`}
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-neutral-100 text-lg text-neutral-700">
                  {a.icon}
                </div>
                <span className="text-xs font-medium text-neutral-700">
                  {a.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 지킴진단 내역 */}
        <section className="border-b-8 border-neutral-100 bg-white px-[var(--spacing-5)] py-[var(--spacing-5)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[length:var(--font-size-base)] font-bold leading-[length:var(--font-leading-7)] text-neutral-900">
              지킴진단 내역
            </h2>
            <Link
              href="/reports"
              className="inline-flex items-center gap-1 text-[length:var(--font-size-sm)] font-medium text-neutral-500"
            >
              전체보기 <span className="text-xs">›</span>
            </Link>
          </div>

          <div className="space-y-3">
            {/* 완료(확인 필요) */}
            <Link
              href="/reports/sample-risky-001"
              className="block rounded-xl border border-neutral-200 bg-white p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-md bg-black px-2 py-1 text-xs font-semibold text-white">
                      완료
                    </span>
                    <span className="text-xs text-neutral-500">2025.01.15</span>
                    <span className="rounded-full bg-[#ffeceb] px-2 py-0.5 text-[11px] font-semibold text-[#f94e3e]">
                      확인 필요
                    </span>
                  </div>
                  <div className="truncate text-[length:var(--font-size-base)] font-bold text-neutral-900">
                    서울시 양천구 중앙로333
                  </div>
                  <div className="mt-1 text-[length:var(--font-size-sm)] text-neutral-600">
                    래미안대치팰리스 84㎡
                  </div>
                </div>
                <div className="shrink-0 pt-1 text-neutral-400">›</div>
              </div>

              <div className="flex items-center gap-2 border-t border-neutral-100 pt-3">
                <div className="flex-1 rounded-xl bg-neutral-50 px-3 py-2">
                  <div className="mb-1 text-xs text-neutral-500">예상 시세</div>
                  <div className="text-sm font-semibold text-neutral-900">
                    23억 5,000만원
                  </div>
                </div>
                <div className="flex-1 rounded-xl bg-neutral-50 px-3 py-2">
                  <div className="mb-1 text-xs text-neutral-500">적정 가격</div>
                  <div className="text-sm font-semibold text-neutral-900">
                    22억 8,000만원
                  </div>
                </div>
              </div>
            </Link>

            {/* 완료(양호) */}
            <Link
              href="/reports/sample-safe-001"
              className="block rounded-xl border border-neutral-200 bg-white p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-md bg-black px-2 py-1 text-xs font-semibold text-white">
                      완료
                    </span>
                    <span className="text-xs text-neutral-500">2025.01.05</span>
                    <span className="rounded-full bg-[#e6f5d3] px-2 py-0.5 text-[11px] font-semibold text-[#259b04]">
                      양호
                    </span>
                  </div>
                  <div className="truncate text-[length:var(--font-size-base)] font-bold text-neutral-900">
                    서울시 송파구 잠실동
                  </div>
                  <div className="mt-1 text-[length:var(--font-size-sm)] text-neutral-600">
                    잠실엘스 114㎡
                  </div>
                </div>
                <div className="shrink-0 pt-1 text-neutral-400">›</div>
              </div>

              <div className="flex items-center gap-2 border-t border-neutral-100 pt-3">
                <div className="flex-1 rounded-xl bg-neutral-50 px-3 py-2">
                  <div className="mb-1 text-xs text-neutral-500">예상 시세</div>
                  <div className="text-sm font-semibold text-neutral-900">
                    28억 2,000만원
                  </div>
                </div>
                <div className="flex-1 rounded-xl bg-neutral-50 px-3 py-2">
                  <div className="mb-1 text-xs text-neutral-500">적정 가격</div>
                  <div className="text-sm font-semibold text-neutral-900">
                    27억 5,000만원
                  </div>
                </div>
              </div>
            </Link>

            {/* 진행중(목업) */}
            <div className="rounded-xl border border-neutral-200 bg-white p-4 opacity-90">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-md bg-neutral-200 px-2 py-1 text-xs font-semibold text-neutral-700">
                      진행중
                    </span>
                    <span className="text-xs text-neutral-500">2025.01.10</span>
                  </div>
                  <div className="truncate text-[length:var(--font-size-base)] font-bold text-neutral-900">
                    경기도 성남시 분당구
                  </div>
                  <div className="mt-1 text-[length:var(--font-size-sm)] text-neutral-600">
                    판교원마을8단지 59㎡
                  </div>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-neutral-500"
                  aria-label="상세(준비중)"
                  disabled
                >
                  준비중
                </button>
              </div>

              <div className="flex items-center gap-2 border-t border-neutral-100 pt-3">
                <div className="flex-1 rounded-xl bg-neutral-50 px-3 py-2">
                  <div className="mb-1 text-xs text-neutral-500">진행률</div>
                  <div className="text-sm font-semibold text-neutral-900">
                    65%
                  </div>
                </div>
                <div className="flex-1 rounded-xl bg-neutral-50 px-3 py-2">
                  <div className="mb-1 text-xs text-neutral-500">예상 완료</div>
                  <div className="text-sm font-semibold text-neutral-900">
                    1월 20일
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 입주민 인증 + 실거래가 */}
        <section className="border-b-8 border-neutral-100 bg-white px-[var(--spacing-5)] py-[var(--spacing-5)]">
          <h2 className="mb-4 text-[length:var(--font-size-base)] font-bold leading-[length:var(--font-leading-7)] text-neutral-900">
            입주민 인증
          </h2>

          <div className="mb-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-black text-white">
                🏢
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="truncate font-semibold text-neutral-900">
                    래미안대치팰리스
                  </div>
                  <span className="rounded-md bg-black px-2 py-0.5 text-xs font-semibold text-white">
                    인증완료
                  </span>
                </div>
                <div className="mt-1 text-sm text-neutral-600">
                  서울시 강남구 대치동
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white"
              aria-label="커뮤니티 채팅(준비중)"
            >
              커뮤니티 채팅 입장하기
            </button>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-neutral-900">
              최근 실거래가
            </h3>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500"
              aria-label="더보기(준비중)"
            >
              더보기 <span className="text-xs">›</span>
            </button>
          </div>

          <div className="space-y-2">
            {[
              {
                size: "84㎡ · 25층",
                type: "매매",
                date: "2025.01.12",
                price: "23.5억",
                delta: "+5,000",
              },
              {
                size: "84㎡ · 18층",
                type: "전세",
                date: "2025.01.10",
                price: "15.8억",
                delta: "-2,000",
              },
              {
                size: "114㎡ · 32층",
                type: "매매",
                date: "2025.01.08",
                price: "28.2억",
                delta: "보합",
              },
            ].map((t) => (
              <div
                key={`${t.size}-${t.date}`}
                className="rounded-xl border border-neutral-200 bg-white p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 text-sm text-neutral-600">{t.size}</div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-700">
                        {t.type}
                      </span>
                      <span className="text-xs text-neutral-500">{t.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-neutral-900">
                      {t.price}
                    </div>
                    <div className="mt-1 text-xs text-neutral-600">{t.delta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 청약 진단 결과 (목업) */}
        <section className="border-b-8 border-neutral-100 bg-white px-[var(--spacing-5)] py-[var(--spacing-5)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[length:var(--font-size-base)] font-bold leading-[length:var(--font-leading-7)] text-neutral-900">
              청약 진단 결과
            </h2>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-neutral-500"
              aria-label="상세보기(준비중)"
            >
              상세보기 <span className="text-xs">›</span>
            </button>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-700 p-5 text-white">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-neutral-300">나의 청약 점수</div>
                <div className="mt-1 text-3xl font-bold">85점</div>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white/20 text-2xl">
                📈
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-white/20">
                <div className="h-2 w-[85%] rounded-full bg-white" />
              </div>
              <span className="text-sm font-semibold">상위 15%</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
