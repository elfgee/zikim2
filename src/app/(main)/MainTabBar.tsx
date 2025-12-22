"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  key: string;
  label: string;
  href?: string;
  disabled?: boolean;
};

const TABS: Tab[] = [
  { key: "home", label: "홈", href: "/gateway" },
  { key: "presale", label: "분양", href: "/presale" },
  { key: "wish", label: "찜", disabled: true },
  { key: "ourhome", label: "우리집", href: "/my" },
];

function isActive(pathname: string, href?: string) {
  if (!href) return false;
  if (href === "/gateway") return pathname === "/gateway" || pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MainTabBar() {
  const pathname = usePathname() ?? "/";

  // 메인 탭이 어울리지 않는 플로우에서는 숨김
  const hide =
    pathname.startsWith("/diagnosis") ||
    pathname.startsWith("/payment") ||
    pathname.startsWith("/waiting") ||
    pathname.startsWith("/reports/"); // 상세 리포트(탭 없는 몰입 화면)

  if (hide) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[color:var(--border)] bg-[color:var(--background)]/95 backdrop-blur"
      aria-label="하단 탭"
    >
      <div className="mx-auto flex w-full max-w-md gap-2 px-[var(--spacing-5)] pt-[var(--spacing-2)] pb-[calc(env(safe-area-inset-bottom)+var(--spacing-3))]">
        {TABS.map((t) => {
          const active = isActive(pathname, t.href);
          const icon =
            t.key === "home"
              ? "🏠"
              : t.key === "presale"
              ? "🏗️"
              : t.key === "ourhome"
              ? "🏡"
              : "❤️";

          if (!t.href || t.disabled) {
            return (
              <button
                key={t.key}
                type="button"
                disabled
                className="flex min-h-[44px] flex-1 flex-col items-center justify-center gap-1 rounded-[var(--border-radius-xl)] px-2 py-2 text-[var(--font-size-xs)] text-[color:var(--muted-foreground)] opacity-60"
                aria-disabled="true"
              >
                <span className="text-[18px] leading-none">{icon}</span>
                <span className="font-medium leading-[14px]">{t.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={t.key}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={(() => {
                const base =
                  "flex min-h-[44px] flex-1 flex-col items-center justify-center gap-1 rounded-[var(--border-radius-xl)] px-2 py-2 text-[var(--font-size-xs)]";
                const tone = active
                  ? "bg-[color:var(--accent)] text-[color:var(--accent-foreground)]"
                  : "text-[color:var(--muted-foreground)] hover:bg-black/5 active:bg-black/10";
                const weight = active ? "font-bold" : "font-medium";
                return [base, tone, weight].join(" ");
              })()}
            >
              <span className="text-[18px] leading-none">{icon}</span>
              <span className="leading-[14px]">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


