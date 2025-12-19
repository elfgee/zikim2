import Link from "next/link";

export default function ReportsPage() {
  return (
    <div className="min-h-dvh bg-white px-5 pt-6">
      <h1 className="text-xl font-bold text-gray-900">나의 리포트</h1>

      <div className="mt-4 space-y-3">
        <Link href="/reports/sample-1" className="block rounded-2xl border p-4">
          샘플 리포트 sample-1
        </Link>
      </div>
    </div>
  );
}
