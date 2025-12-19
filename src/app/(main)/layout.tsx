export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-slate-50 pb-20">
      <main className="mx-auto w-full max-w-md">{children}</main>
      {/* bottom tab */}
    </div>
  );
}