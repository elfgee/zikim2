export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <main className="mx-auto w-full max-w-md">{children}</main>
    </div>
  );
}


