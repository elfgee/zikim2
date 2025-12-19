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
    <div className="min-h-dvh bg-white px-5 pt-6">
      <h1 className="text-xl font-bold text-gray-900">매물 상세</h1>
      <p className="mt-2 text-sm text-gray-600">매물 ID: {id}</p>

      <div className="mt-6 rounded-2xl border p-4">
        <div className="text-sm font-semibold text-gray-900">주소</div>
        <div className="mt-1 text-sm text-gray-700">{address}</div>

        <div className="mt-4 text-sm font-semibold text-gray-900">면적</div>
        <div className="mt-1 text-sm text-gray-700">{area}㎡</div>
      </div>

      <Link
        href={href}
        className="mt-6 block w-full rounded-2xl bg-gray-900 py-4 text-center text-sm font-semibold text-white"
      >
        지킴진단하기
      </Link>
    </div>
  );
}