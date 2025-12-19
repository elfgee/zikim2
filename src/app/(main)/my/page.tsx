import Link from "next/link";

export default function MyPage() {
  return (
    <div className="px-[var(--spacing-5)] pt-[var(--spacing-6)] pb-[var(--spacing-10)]">
      <h1 className="text-[length:var(--font-size-xl)] leading-[length:var(--font-leading-8)] font-bold tracking-tight text-gray-900">
        마이
      </h1>
      <p className="mt-[var(--spacing-2)] text-[length:var(--font-size-sm)] leading-[length:var(--font-leading-6)] text-gray-600">
        지킴진단 내역을 확인하세요.
      </p>

      <div className="mt-[var(--spacing-6)] space-y-[var(--spacing-3)]">
        <div className="rounded-[var(--border-radius-3xl)] border border-[color:var(--border)] bg-white p-[var(--spacing-5)] shadow-sm">
          <div className="text-[length:var(--font-size-base)] font-semibold text-gray-900">
            최근 진단
          </div>
          <div className="mt-[var(--spacing-1)] text-[length:var(--font-size-sm)] text-gray-600">
            아직 진단 내역이 없어요.
          </div>
        </div>

        <Link
          href="/reports"
          className="block rounded-[var(--border-radius-3xl)] bg-gray-900 p-[var(--spacing-5)] text-white shadow-sm hover:opacity-95 active:opacity-90"
        >
          <div className="text-[length:var(--font-size-base)] font-semibold">
            리포트 전체보기
          </div>
          <div className="mt-[var(--spacing-1)] text-[length:var(--font-size-sm)] text-white/80">
            나의 리포트 목록으로 이동
          </div>
        </Link>
      </div>
    </div>
  );
}
