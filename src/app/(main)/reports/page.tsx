import Link from "next/link";

export default function ReportsPage() {
  return (
    <div className="px-[var(--spacing-5)] pt-[var(--spacing-6)] pb-[var(--spacing-10)]">
      <h1 className="text-[length:var(--font-size-xl)] leading-[length:var(--font-leading-8)] font-bold tracking-tight text-gray-900">
        나의 리포트
      </h1>
      <p className="mt-[var(--spacing-2)] text-[length:var(--font-size-sm)] leading-[length:var(--font-leading-6)] text-gray-600">
        목업용 샘플 리포트 목록입니다.
      </p>

      <div className="mt-[var(--spacing-6)] space-y-[var(--spacing-3)]">
        <Link
          href="/reports/sample-1"
          className="block rounded-[var(--border-radius-3xl)] border border-[color:var(--border)] bg-white p-[var(--spacing-5)] shadow-sm"
        >
          <div className="text-[length:var(--font-size-base)] font-semibold text-gray-900">
            샘플 리포트 sample-1
          </div>
          <div className="mt-[var(--spacing-1)] text-[length:var(--font-size-sm)] text-gray-600">
            상세로 이동 →
          </div>
        </Link>
      </div>
    </div>
  );
}
