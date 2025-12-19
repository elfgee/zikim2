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

  const href = `/diagnosis/start?address=${encodeURIComponent(
    address
  )}&area=${encodeURIComponent(area)}&from=property&id=${encodeURIComponent(id)}`;

  return (
    <div className="px-[var(--spacing-5)] pt-[var(--spacing-6)] pb-[calc(env(safe-area-inset-bottom)+var(--spacing-10))]">
      <div className="flex items-start justify-between gap-[var(--spacing-4)]">
        <div className="min-w-0">
          <h1 className="text-[length:var(--font-size-xl)] leading-[length:var(--font-leading-8)] font-bold tracking-tight text-gray-900">
            매물 상세
          </h1>
          <p className="mt-[var(--spacing-1)] text-[length:var(--font-size-sm)] leading-[length:var(--font-leading-6)] text-gray-600">
            매물 ID: {id}
          </p>
        </div>
        <Link
          href="/property"
          className="shrink-0 rounded-[var(--border-radius-lg)] px-[var(--spacing-2)] py-[var(--spacing-1)] text-[length:var(--font-size-sm)] font-medium text-gray-700 hover:bg-black/5 active:bg-black/10"
        >
          목록
        </Link>
      </div>

      <div className="mt-[var(--spacing-6)] rounded-[var(--border-radius-3xl)] border border-[color:var(--border)] bg-white p-[var(--spacing-5)] shadow-sm">
        <div className="text-sm font-semibold text-gray-900">주소</div>
        <div className="mt-[var(--spacing-1)] text-sm text-gray-700">
          {address}
        </div>

        <div className="mt-[var(--spacing-4)] text-sm font-semibold text-gray-900">
          전용면적
        </div>
        <div className="mt-[var(--spacing-1)] text-sm text-gray-700">
          {area}㎡
        </div>
      </div>

      <Link
        href={href}
        className="mt-[var(--spacing-6)] block w-full rounded-[var(--border-radius-3xl)] bg-[var(--Zigbang-Sub-Brand-Zikim)] py-[var(--spacing-4)] text-center text-[length:var(--font-size-base)] font-semibold text-white shadow-sm hover:opacity-95 active:opacity-90"
      >
        지킴진단하기
      </Link>
    </div>
  );
}