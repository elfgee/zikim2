import Link from "next/link";

export default function GatewayPage() {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-bold leading-[34px] text-gray-900">
        지킴진단
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        안전한 계약을 위한 빠른 진단을 시작하세요.
      </p>

      {/* 메인 버튼 영역 */}
      <div className="mt-6 grid gap-3">
        {/* 아파트 = 탭이 아니라 메인 버튼 */}
        <Link
          href="/property"
          className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
        >
          <div className="text-base font-semibold text-gray-900">아파트</div>
          <div className="mt-1 text-sm text-gray-600">
            매물 보러가기 → 상세에서 진단 시작
          </div>
        </Link>

        {/* 지킴진단 시작 (주소 직접 입력) */}
        <Link
          href="/diagnosis/start"
          className="rounded-2xl bg-gray-900 p-5 text-white shadow-sm"
        >
          <div className="text-base font-semibold">지킴진단 시작</div>
          <div className="mt-1 text-sm text-white/80">
            주소/면적 직접 입력으로 시작
          </div>
        </Link>
      </div>
    </div>
  );
}
