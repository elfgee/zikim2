import Link from "next/link";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // ✅ 지금은 더미. 나중에 id로 실제 매물 데이터 fetch해서 채우면 됨.
  const address = `서울시 강남구 영동대로 123 (매물 ${id})`;
  const area = "84";
  const complexName = "래미안옥수리버젠";
  const priceLabel = "매매 19억 7,500 ~ 19억 9,000";
  const supplyArea = "112.9";
  const exclusiveArea = "84.9";

  const href = `/diagnosis/start?address=${encodeURIComponent(
    address
  )}&area=${encodeURIComponent(area)}&from=property&id=${encodeURIComponent(id)}`;

  return (
    <div className="bg-white pb-[calc(env(safe-area-inset-bottom)+var(--spacing-16))]">
      {/* 상단 헤더 (wireframe 1-2 참고) */}
      <header className="sticky top-0 z-30 border-b border-[color:var(--border)] bg-white/95 backdrop-blur">
        <div className="flex h-[52px] items-center justify-between px-[var(--spacing-3)]">
          <Link
            href="/property"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 active:bg-black/10"
            aria-label="뒤로가기"
          >
            ←
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 active:bg-black/10"
              aria-label="채팅(준비중)"
            >
              💬
            </button>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 active:bg-black/10"
              aria-label="찜(준비중)"
            >
              ❤️
            </button>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 active:bg-black/10"
              aria-label="공유(준비중)"
            >
              ⤴︎
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* 타이틀/가격 */}
        <section className="px-[var(--spacing-5)] pt-[var(--spacing-4)] pb-[var(--spacing-2)]">
          <div className="flex items-center gap-1">
            <h1 className="text-[length:var(--font-size-sm)] font-medium leading-[length:var(--font-leading-5)] text-[#191919]">
              {complexName}
            </h1>
            <span className="text-xs text-gray-400">ⓘ</span>
          </div>
          <p className="mt-2 text-[length:var(--font-size-2xl)] font-bold leading-[34px] text-[#191919]">
            {priceLabel}
          </p>
          <p className="mt-1 text-xs text-gray-500">매물 ID: {id}</p>
        </section>

        {/* 탭 (목업) */}
        <nav className="border-b border-gray-200">
          <div className="flex w-full px-[var(--spacing-5)]">
            <a
              href="#unit"
              className="flex-1 border-b-2 border-[var(--Zigbang-Orange-600)] pt-4 pb-3 text-center text-sm font-bold leading-5 text-[var(--Zigbang-Orange-600)]"
            >
              세대 정보
            </a>
            <a
              href="#price"
              className="flex-1 pt-4 pb-3 text-center text-sm font-medium leading-5 text-[#4c4c4c]"
            >
              시세 정보
            </a>
            <a
              href="#apt"
              className="flex-1 pt-4 pb-3 text-center text-sm font-medium leading-5 text-[#4c4c4c]"
            >
              아파트 정보
            </a>
          </div>
        </nav>

        {/* 세대 정보 */}
        <section id="unit">
          <div className="px-[var(--spacing-5)] pt-[var(--spacing-6)] pb-[var(--spacing-2)]">
            <div className="relative h-[164px] overflow-hidden rounded-xl border border-black/10 bg-slate-100">
              {/* 이미지 자리 */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/0" />
              <div className="absolute left-2 top-2 inline-flex items-center rounded-full bg-[#f1f1f1] px-2 py-1 text-xs font-medium leading-4 text-[#7f7f7f]">
                112A㎡
              </div>
              <button
                type="button"
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-xs text-gray-700 shadow-sm ring-1 ring-black/5"
                aria-label="확대(준비중)"
              >
                ⤢
              </button>
              <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-[var(--Zigbang-Orange-600)] px-2 py-1 text-xs font-bold leading-4 text-white">
                VR
              </div>
            </div>
          </div>

          <div className="px-[var(--spacing-5)] text-sm leading-5 text-[#191919]">
            <div className="flex items-center pt-4 pb-1">
              <span className="w-[90px] text-[#191919]">면적</span>
              <span className="font-medium">
                공급 {supplyArea}㎡ ・ 전용 {exclusiveArea}㎡
              </span>
            </div>
            <div className="flex items-center py-1">
              <span className="w-[90px] text-[#191919]">방개수</span>
              <span className="font-medium">방 3개 ・ 욕실 2개</span>
            </div>
            <div className="flex items-center py-1">
              <span className="w-[90px] text-[#191919]">위치</span>
              <span className="font-medium">2001동 ・ 3층(24층)</span>
            </div>
            <div className="flex py-1">
              <div className="w-[90px]">
                <div className="flex items-center gap-1">
                  <span>관리비</span>
                  <span className="text-xs text-gray-400">ⓘ</span>
                </div>
                <p className="text-[13px] font-medium leading-[18px] text-[#7f7f7f]">
                  관리규약에 따름
                </p>
              </div>
              <div className="flex-1">
                <p className="font-medium">평균 30만원</p>
                <p className="text-[13px] font-medium leading-[18px] text-[#7f7f7f]">
                  여름(6~8월) 21만원
                  <br />
                  겨울(12~2월) 25만원
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 px-[var(--spacing-5)] py-2">
            <span className="text-xs text-gray-400">ⓘ</span>
            <p className="text-sm leading-5 text-[#7f7f7f]">
              직방에서 수집한 정보입니다. (목업)
            </p>
          </div>
        </section>

        {/* 지킴진단 프로모 (wireframe 카드) */}
        <section className="p-[var(--spacing-5)]">
          <div className="rounded-xl border border-[#e6e6e6] bg-white p-4">
            <div className="flex items-start justify-between pb-4">
              <div>
                <h3 className="text-[length:var(--font-size-base)] font-bold leading-[length:var(--font-leading-7)] text-[#191919]">
                  지킴진단
                </h3>
                <p className="mt-1 text-[13px] leading-[18px] text-slate-600">
                  보증금 회수 위험부터 계약 안정성까지
                  <br />
                  전문가가 분석한 매물 진단 리포트
                </p>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--Zigbang-Sub-Brand-Zikim)] text-sm font-bold text-white">
                ✓
              </div>
            </div>

            <div className="flex justify-between gap-2 text-[13px] font-medium leading-[18px] text-[#4c4c4c]">
              <div className="flex items-center gap-1">
                <span className="text-[var(--Zigbang-Sub-Brand-Zikim)]">✓</span>
                <span>권리 관계 분석</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[var(--Zigbang-Sub-Brand-Zikim)]">✓</span>
                <span>시세 진단</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[var(--Zigbang-Sub-Brand-Zikim)]">✓</span>
                <span>특약 제공</span>
              </div>
            </div>

            <Link
              href={href}
              className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-xl bg-[var(--Zigbang-Sub-Brand-Zikim)] px-4 text-sm font-semibold leading-5 text-white shadow-sm hover:opacity-95 active:opacity-90"
            >
              보증금 안전 진단 받기
            </Link>
          </div>
        </section>

        {/* 중개 매물 리스트 (목업 1개 카드) */}
        <section className="pb-[var(--spacing-16)]">
          <h2 className="px-[var(--spacing-5)] pt-[var(--spacing-7)] pb-[var(--spacing-2)] text-[length:var(--font-size-lg)] font-bold leading-[length:var(--font-leading-7)] text-[#191919]">
            8곳에서 중개중이에요
          </h2>
          <div className="px-[var(--spacing-5)] py-2">
            <div className="overflow-hidden rounded-xl border border-[#e6e6e6] bg-white">
              <div className="p-4">
                <span className="inline-flex rounded-full bg-[#fff7ef] px-2 py-1 text-[11px] font-medium leading-[14px] text-[var(--Zigbang-Orange-600)]">
                  실매물 확인
                </span>
                <p className="mt-1 text-[length:var(--font-size-xl)] font-bold leading-[30px] text-[#191919]">
                  매매 19억 7,500
                </p>
              </div>

              <div className="flex items-center gap-3 px-5 pb-4">
                <div className="h-[60px] w-[60px] rounded-xl bg-slate-100" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-[#ff6905]">
                    아파트 PRO
                  </div>
                  <h3 className="mt-1 truncate text-[length:var(--font-size-base)] font-bold leading-[length:var(--font-leading-7)] text-[#191919]">
                    굿파트너공인중개사사무소
                  </h3>
                  <p className="text-sm font-medium leading-5">
                    <span className="text-[#4c4c4c]">매매 </span>
                    <span className="text-[#ff6905]">4</span>
                    <span className="text-[#4c4c4c]"> · 전세 </span>
                    <span className="text-[#ff6905]">4</span>
                    <span className="text-[#4c4c4c]"> · 월세 </span>
                    <span className="text-[#ff6905]">6</span>
                  </p>
                </div>
                <button
                  type="button"
                  className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 active:bg-black/10"
                  aria-label="더보기(준비중)"
                >
                  ⋯
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-1">
                  <span className="text-[var(--Zigbang-Orange-600)]">✓</span>
                  <span className="text-[13px] font-medium leading-[18px] text-[var(--Zigbang-Orange-600)]">
                    중개사가 등록한 매물
                  </span>
                </div>
                <h4 className="mt-1 text-[length:var(--font-size-lg)] font-bold leading-[length:var(--font-leading-7)] text-[#191919]">
                  “한강뷰가 한눈에 보이는 신축세대”
                </h4>
                <p className="mt-1 text-[length:var(--font-size-base)] leading-[length:var(--font-leading-7)] text-[#4c4c4c]">
                  이 집은 한강 뷰가 있어서 정말 멋진데, 지식산업센터가 완공되면
                  뷰가 막힐 예정이랍니다. 부엌은 아름다운 대리석으로 꾸며져서
                  청소가 쉽고 좋아요.
                </p>
              </div>

              <div className="flex items-center justify-between px-4 pt-5 pb-2 text-sm leading-5">
                <span className="text-[#191919]">입주 가능일</span>
                <span className="font-medium text-[#191919]">즉시입주 가능</span>
              </div>
              <hr className="mx-4 border-t border-[#e6e6e6]" />
              <button
                type="button"
                className="flex w-full items-center justify-center gap-1 py-2 text-sm font-medium leading-5 text-[#191919]"
              >
                <span>필수 표기 정보 보기</span>
                <span className="text-gray-400">▾</span>
              </button>
              <hr className="mx-4 border-t border-[#e6e6e6]" />
              <div className="px-4 py-3 text-right text-[13px] leading-[18px] text-[#7f7f7f]">
                3일전 확인
              </div>
            </div>
          </div>
        </section>

        {/* 시세 정보/아파트 정보 섹션 앵커(목업) */}
        <section id="price" className="px-[var(--spacing-5)] pb-[var(--spacing-10)]">
          <div className="rounded-xl border border-[color:var(--border)] bg-white p-4 text-sm text-gray-600">
            시세 정보 영역(목업)
          </div>
        </section>
        <section id="apt" className="px-[var(--spacing-5)] pb-[var(--spacing-10)]">
          <div className="rounded-xl border border-[color:var(--border)] bg-white p-4 text-sm text-gray-600">
            아파트 정보 영역(목업)
          </div>
        </section>
      </main>

      {/* 플로팅 문의하기 (radius 정책: 12px 이하) */}
      <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+var(--spacing-4))] right-[var(--spacing-5)] z-20">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-[var(--Zigbang-Orange-600)] px-4 py-2 shadow-[0px_8px_20px_0px_rgba(26,26,26,0.10)]"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-white">
            💬
          </span>
          <span className="text-sm font-bold leading-5 text-white">문의하기</span>
        </button>
      </div>
    </div>
  );
}