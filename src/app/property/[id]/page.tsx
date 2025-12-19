export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h1>매물 상세</h1>
      <p>매물 ID: {id}</p>
    </div>
  );
}



