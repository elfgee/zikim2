import MainTabBar from "./MainTabBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-slate-50 pb-[calc(env(safe-area-inset-bottom)+80px)]">
      <main className="mx-auto w-full max-w-md">{children}</main>
      <MainTabBar />
    </div>
  );
}