import Link from "next/link";

export default function ReportsPage() {
  const items = [
    {
      id: "sample-risky-001",
      status: "확인 필요" as const,
      statusClass: "bg-[#ffeceb] text-[#f94e3e]",
      title: "확인이 필요한 항목이 있어요",
      address: "서울시 양천구 중앙로333 (신월동) 제9층 902호",
      price: "전세 5억 5,000만원 · 24개월",
      meta: "방금 생성됨 · 매물 진단 5 · 집주인 2 · 시세 1",
    },
    {
      id: "sample-safe-001",
      status: "양호" as const,
      statusClass: "bg-[#e6f5d3] text-[#259b04]",
      title: "주요 점검 항목이 양호해요",
      address: "서울시 강남구 영동대로 123 (가상 매물)",
      price: "전세 3억 0,000만원 · 24개월",
      meta: "1일 전 · 매물 진단 0 · 집주인 0 · 시세 0",
    },
  ];

  return (
    <div className="px-[var(--spacing-5)] pt-[var(--spacing-6)] pb-[var(--spacing-10)]">
      <h1 className="text-[length:var(--font-size-xl)] leading-[length:var(--font-leading-8)] font-bold tracking-tight text-gray-900">
        나의 리포트
      </h1>
      <p className="mt-[var(--spacing-2)] text-[length:var(--font-size-sm)] leading-[length:var(--font-leading-6)] text-gray-600">
        목업용 샘플 리포트 목록입니다. (양호/확인 필요 2종)
      </p>

      <div className="mt-[var(--spacing-6)] space-y-[var(--spacing-3)]">
        {items.map((r) => (
          <Link
            key={r.id}
            href={`/reports/${r.id}`}
            className="block rounded-[var(--border-radius-3xl)] border border-[color:var(--border)] bg-white p-[var(--spacing-5)] shadow-sm transition hover:bg-black/[0.01] active:bg-black/[0.02]"
          >
            <div className="flex items-start justify-between gap-[var(--spacing-4)]">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold leading-[14px]",
                      r.statusClass,
                    ].join(" ")}
                  >
                    {r.status}
                  </span>
                  <span className="text-[length:var(--font-size-sm)] font-semibold text-gray-900">
                    {r.title}
                  </span>
                </div>

                <div className="mt-[var(--spacing-2)] line-clamp-2 text-[length:var(--font-size-base)] font-bold leading-[length:var(--font-leading-7)] text-gray-900">
                  {r.address}
                </div>
                <div className="mt-[var(--spacing-1)] text-[length:var(--font-size-sm)] text-gray-600">
                  {r.price}
                </div>
                <div className="mt-[var(--spacing-2)] text-xs text-gray-500">
                  {r.meta}
                </div>
              </div>

              <div className="shrink-0 pt-1 text-gray-400">›</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
