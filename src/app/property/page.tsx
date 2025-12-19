import Link from "next/link";

export default function PropertyListPage() {
  return (
    <div className="px-[var(--spacing-5)] pt-[var(--spacing-6)] pb-[var(--spacing-10)]">
      <h1 className="text-[length:var(--font-size-xl)] leading-[length:var(--font-leading-8)] font-bold tracking-tight text-gray-900">
        아파트 매물
      </h1>
      <p className="mt-[var(--spacing-2)] text-[length:var(--font-size-sm)] leading-[length:var(--font-leading-6)] text-gray-600">
        샘플 목록(목업)입니다. 상세로 들어가 지킴진단 흐름을 확인하세요.
      </p>

      <div className="mt-[var(--spacing-6)] space-y-[var(--spacing-3)]">
        <Link
          href="/property/123"
          className="block rounded-[var(--border-radius-3xl)] border border-[color:var(--border)] bg-white p-[var(--spacing-5)] shadow-sm"
        >
          <div className="text-[length:var(--font-size-base)] font-semibold text-gray-900">
            샘플 매물 #123
          </div>
          <div className="mt-[var(--spacing-1)] text-[length:var(--font-size-sm)] text-gray-600">
            상세로 이동 →
          </div>
        </Link>

        <Link
          href="/gateway"
          className="inline-flex text-[length:var(--font-size-sm)] font-medium text-gray-700 underline"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}