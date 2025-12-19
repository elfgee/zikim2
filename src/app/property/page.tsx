import Link from "next/link";

export default function PropertyListPage() {
  return (
    <div className="min-h-dvh bg-white px-5 pt-6">
      <h1 className="text-xl font-bold text-gray-900">아파트 매물</h1>

      <div className="mt-4 space-y-3">
        <Link href="/property/123" className="block rounded-2xl border p-4">
          샘플 매물 #123 (상세로)
        </Link>

        <Link href="/gateway" className="block text-sm text-gray-600 underline">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}