import Link from "next/link";

export default function MyPage() {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-bold leading-[34px] text-gray-900">마이</h1>
      <p className="mt-2 text-sm text-gray-600">지킴진단 내역을 확인하세요.</p>

      <div className="mt-6 space-y-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="text-base font-semibold text-gray-900">최근 진단</div>
          <div className="mt-1 text-sm text-gray-600">
            아직 진단 내역이 없어요.
          </div>
        </div>

        <Link
          href="/reports"
          className="block rounded-2xl bg-gray-900 p-5 text-white shadow-sm"
        >
          <div className="text-base font-semibold">리포트 전체보기</div>
          <div className="mt-1 text-sm text-white/80">나의 리포트 목록으로 이동</div>
        </Link>
      </div>
    </div>
  );
}
