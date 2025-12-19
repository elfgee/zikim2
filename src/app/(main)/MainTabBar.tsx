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
  { key: "my", label: "마이", href: "/my" },
  { key: "search", label: "검색", disabled: true },
  { key: "wish", label: "찜", disabled: true },
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
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[color:var(--border)] bg-white/95 backdrop-blur"
      aria-label="하단 탭"
    >
      <div className="mx-auto flex w-full max-w-md px-[var(--spacing-5)] pt-[var(--spacing-3)] pb-[calc(env(safe-area-inset-bottom)+var(--spacing-4))]">
        {TABS.map((t) => {
          const active = isActive(pathname, t.href);

          if (!t.href || t.disabled) {
            return (
              <button
                key={t.key}
                type="button"
                disabled
                className="flex flex-1 flex-col items-center justify-center gap-[var(--spacing-1)] text-[length:var(--font-size-sm)] text-gray-400"
                aria-disabled="true"
              >
                <span className="text-[length:var(--font-size-xl)]">
                  {t.key === "search" ? "🔍" : "❤️"}
                </span>
                <span className="font-medium">{t.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={t.key}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={[
                "flex flex-1 flex-col items-center justify-center gap-[var(--spacing-1)] text-[length:var(--font-size-sm)]",
                active ? "font-semibold text-gray-900" : "text-gray-600",
              ].join(" ")}
            >
              <span className="text-[length:var(--font-size-xl)]">
                {t.key === "home" ? "🏠" : "👤"}
              </span>
              <span>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


