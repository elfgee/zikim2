"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { resolveMessages } from "../../../../content/diagnosis/resolve";
import {
  DISPLAY_FIELDS_LOCAL,
  RULE_CARDS_LOCAL,
} from "../../../../content/diagnosis/local";

type ReportType = "safe" | "risky";

type TabKey = "property" | "owner" | "price" | "clause";

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function formatKRW(v?: string | number | null) {
  if (v === null || v === undefined) return "-";
  const n = typeof v === "string" ? Number(v) : v;
  if (!Number.isFinite(n) || n <= 0) return "-";
  return n.toLocaleString("ko-KR") + "원";
}

function statusLabel(failed: boolean) {
  return failed ? "확인 필요" : "양호";
}

function statusPillClass(failed: boolean) {
  // 요구사항: 2-level risk status (양호/확인 필요)
  return failed
    ? "bg-[color:var(--red-50)] text-[color:var(--destructive)] ring-1 ring-[color:var(--red-100)]"
    : "bg-[color:var(--neutral-100)] text-[color:var(--Zigbang-Sub-Brand-Zikim)] ring-1 ring-[color:var(--neutral-200)]";
}

function cardClass() {
  return "rounded-[var(--border-radius-xl)] border border-[color:var(--border)] bg-[color:var(--background)] shadow-sm";
}

function mutedBoxClass() {
  return "rounded-[var(--border-radius-xl)] bg-[color:var(--muted)] px-[var(--spacing-4)] py-[var(--spacing-3)]";
}

// ✅ MVP 더미 데이터 (파일 상단 하드코딩)
const DUMMY_FLAGS: Record<string, boolean> = {
  "building.violation": true,
  "owner.is.rental.business": true,
  "owner.matches.landlord": true,
  "registry.land.right.exists": true,
  "registry.land.separate.registration.exists": true,
  "registry.provisional.registration.exists": true,
  "registry.seizure.or.provisional.seizure.exists": true,
  "registry.disposition.ban.injunction.exists": false,
  "registry.trust.exists": true,
  "registry.auction.started": true,
  "registry.mortgage.exists": true,
  "registry.joint.collateral.exists": false,
  "registry.tenant.registration.order.exists": true,
  "registry.jeonse.right.exists": false,
  "history.tenant.registration.order": false,
};

const DUMMY_VALUES: Record<string, string | number | null> = {
  "building.subtype": "아파트",
  "owner.name": "김지킴",
  "owner.ownership.type": "단독",
  "registry.debt.amount": 120000000,
  "property.address": "서울시 강남구 영동대로..",
  "property.housing.type": "아파트",
  "contract.term": "6개월 초과",
  "price.estimated.amount": 700000000,
  "registry.debt.existing.total": 120000000,
  "contract.deposit.expected": 300000000,
  "price.margin.amount": 280000000,
  "tenant.super.priority": "해당하지 않아요",
  "registry.gapgu.other": "내용기재필요",
  "registry.eulgu.other": "내용기재필요",
  "registry.restriction.exists": "없어요",
};

export default function ReportDetailPage() {
  const params = useParams<{ reportId: string }>();
  const reportId = params.reportId;

  const reportType: ReportType = useMemo(() => {
    return reportId.includes("safe") ? "safe" : "risky";
  }, [reportId]);

  const ctx = useMemo(() => {
    return {
      reportType,
      flags: {
        ...DUMMY_FLAGS,
      },
      values: {
        ...DUMMY_VALUES,
      },
    };
  }, [reportType]);

  const summaryMessages = useMemo(() => resolveMessages("summary", ctx), [ctx]);
  const summary = summaryMessages[0];

  const clauseMessages = useMemo(() => resolveMessages("clause", ctx), [ctx]);

  const displayBySection = useMemo(() => {
    return {
      property: DISPLAY_FIELDS_LOCAL.filter((f) => f.section === "property"),
      owner: DISPLAY_FIELDS_LOCAL.filter((f) => f.section === "owner"),
      price: DISPLAY_FIELDS_LOCAL.filter((f) => f.section === "price"),
    };
  }, []);

  const rulesBySection = useMemo(() => {
    return {
      property: RULE_CARDS_LOCAL.filter((r) => r.section === "property"),
      owner: RULE_CARDS_LOCAL.filter((r) => r.section === "owner"),
      price: RULE_CARDS_LOCAL.filter((r) => r.section === "price"),
    };
  }, []);

  const failedCount = useMemo(() => {
    const count = (cards: typeof RULE_CARDS_LOCAL) =>
      cards.filter((c) => ctx.flags[c.key] === true).length;
    return {
      property: count(rulesBySection.property),
      owner: count(rulesBySection.owner),
      price: count(rulesBySection.price),
      clause: clauseMessages.length,
      total:
        count(rulesBySection.property) +
        count(rulesBySection.owner) +
        count(rulesBySection.price),
    };
  }, [ctx.flags, rulesBySection, clauseMessages.length]);

  const overallFailed = failedCount.total > 0;

  const TABS: { key: TabKey; label: string; count?: number }[] = useMemo(() => {
    return [
      { key: "property", label: "매물 진단", count: failedCount.property },
      { key: "owner", label: "집주인 진단", count: failedCount.owner },
      { key: "price", label: "시세 진단", count: failedCount.price },
      { key: "clause", label: "맞춤 특약", count: failedCount.clause }, // ✅ always
    ];
  }, [failedCount]);

  const clauseTopRef = useRef<HTMLDivElement | null>(null);

  // ✅ 탭 상태 + 스크롤 스파이
  const [activeTab, setActiveTab] = useState<TabKey>("property");
  const sectionRefs = useRef<Record<TabKey, HTMLElement | null>>({
    property: null,
    owner: null,
    price: null,
    clause: null,
  });

  useEffect(() => {
    const entries: { key: TabKey; el: HTMLElement | null }[] = [
      { key: "property", el: sectionRefs.current.property },
      { key: "owner", el: sectionRefs.current.owner },
      { key: "price", el: sectionRefs.current.price },
      { key: "clause", el: sectionRefs.current.clause },
    ];

    const targets = entries
      .filter((x) => x.el)
      .map((x) => x.el!) as HTMLElement[];

    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (obsEntries) => {
        const visible = obsEntries
          .filter((e) => e.isIntersecting)
          .map((e) => ({
            top: (e.target as HTMLElement).getBoundingClientRect().top,
            id: (e.target as HTMLElement).dataset.tab as TabKey,
          }))
          .sort((a, b) => a.top - b.top);

        if (visible[0]?.id) setActiveTab(visible[0].id);
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5],
        rootMargin: "-110px 0px -60% 0px",
      }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // ✅ 아코디언: 확인 필요(=failed)는 기본 펼침, 양호는 기본 접힘
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const next: Record<string, boolean> = {};
    RULE_CARDS_LOCAL.forEach((c) => {
      const failed = ctx.flags[c.key] === true;
      next[c.key] = failed; // warning items expanded by default
    });
    setOpenKeys(next);
  }, [ctx.flags]);

  const propertyAddress =
    (ctx.values["property.address"] as string | undefined) ?? "";
  const contractTerm = (ctx.values["contract.term"] as string | undefined) ?? "";
  const expectedDeposit = ctx.values["contract.deposit.expected"];
  const estimatedPrice = ctx.values["price.estimated.amount"];

  return (
    <div className="min-h-dvh bg-[color:var(--background)] text-[color:var(--foreground)]">
      {/* 상단 앱바 */}
      <header className="sticky top-0 z-30 border-b border-[color:var(--border)] bg-[color:var(--background)]/95 backdrop-blur">
        <div className="mx-auto flex h-[52px] w-full max-w-md items-center justify-between px-[var(--spacing-3)]">
          <button
            type="button"
            onClick={() => history.back()}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 active:bg-black/10"
            aria-label="뒤로"
          >
            ←
          </button>
          <div className="text-[var(--font-size-sm)] font-bold text-[color:var(--foreground)]">
            지킴진단
          </div>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 active:bg-black/10"
            aria-label="공유(준비중)"
          >
            ⤴︎
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md px-[var(--spacing-5)] pt-[var(--spacing-5)] pb-[calc(env(safe-area-inset-bottom)+var(--spacing-10))]">
        {/* 상단 매물 요약 */}
        <section className="pb-[var(--spacing-6)]">
          <div className="flex items-start justify-between gap-[var(--spacing-4)]">
            <div className="min-w-0">
              <h2 className="whitespace-pre-line text-[var(--font-size-base)] font-bold leading-[var(--font-leading-7)] text-[color:var(--foreground)]">
                {propertyAddress || "주소 정보"}
              </h2>
              <p className="mt-[var(--spacing-1)] text-[var(--font-size-sm)] leading-[var(--font-leading-6)] text-[color:var(--muted-foreground)]">
                {formatKRW(expectedDeposit)} ・ 전세({contractTerm || "계약기간"})
              </p>
            </div>
            <div className="grid h-16 w-16 place-items-center rounded-[var(--border-radius-xl)] bg-[color:var(--muted)] text-xs font-bold text-[color:var(--muted-foreground)]">
              이미지
            </div>
          </div>

          {/* AI 종합 진단 의견 */}
          <div className="mt-[var(--spacing-3)] rounded-[var(--border-radius-xl)] bg-[color:var(--accent)]/60 p-[var(--spacing-5)]">
            <div className="flex flex-col items-center gap-[var(--spacing-3)]">
              <div className="flex items-center gap-2">
                <span className={cn("inline-flex items-center rounded-full px-2 py-1 text-[10px] font-bold leading-3", statusPillClass(overallFailed))}>
                  {statusLabel(overallFailed)}
                </span>
                <span className="text-[10px] font-bold leading-3 text-[color:var(--muted-foreground)]">
                  AI 종합 진단
                </span>
              </div>
              <p className="whitespace-pre-line text-center text-[var(--font-size-base)] leading-[var(--font-leading-7)] text-[color:var(--foreground)]">
                {summary?.body ??
                  (reportType === "risky"
                    ? "확인이 필요한 위험 요소가 있어요.\n계약 전 아래 정보들을 꼭 검토해보세요."
                    : "큰 위험 요소는 보이지 않아요.\n필수 체크 포인트만 확인해보세요.")}
              </p>
            </div>

            <div className="mt-[var(--spacing-6)] space-y-[var(--spacing-3)]">
              {/* 확인 필요 카운트 카드 */}
              <div className={cn(cardClass(), "p-[var(--spacing-5)]")}>
                <p className="text-center text-[var(--font-size-sm)] text-[color:var(--secondary-foreground)]">
                  <span className="font-bold">확인이 필요한 항목</span>
                  <span className="font-medium">들이 있어요!</span>
                </p>
                <ul className="mt-[var(--spacing-3)] space-y-[var(--spacing-2)] text-[var(--font-size-sm)] text-[color:var(--secondary-foreground)]">
                  <li className="flex items-center justify-between">
                    <span>🏠 매물 진단</span>
                    <span className="font-bold">{failedCount.property}개</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>👨🏻 집주인 진단</span>
                    <span className="font-bold">{failedCount.owner}개</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>📊 시세 진단</span>
                    <span className="font-bold">{failedCount.price}개</span>
                  </li>
                </ul>
              </div>

              {/* 맞춤 특약 카드 */}
              <button
                type="button"
                onClick={() => {
                  const el = sectionRefs.current.clause;
                  if (!el) return;
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(cardClass(), "w-full p-[var(--spacing-5)] text-left")}
              >
                <p className="text-center text-[var(--font-size-sm)] text-[color:var(--secondary-foreground)]">
                  <span className="font-bold">이 집 맞춤형 특약도 확인</span>
                  <span className="font-medium">해보세요!</span>
                </p>
                <div className="mt-[var(--spacing-3)] flex items-center justify-between text-[var(--font-size-sm)] text-[color:var(--secondary-foreground)]">
                  <span>✅ 안전한 계약을 위한 추천 특약</span>
                  <span className="font-bold">{clauseMessages.length}개</span>
                </div>
              </button>

              <p className="text-center text-[10px] leading-3 text-[color:var(--muted-foreground)]">
                지킴진단리포트는 등기부, 건축물 대장을 기준으로 제공되며,
                <br />
                실제와 다르거나 발급일 이후 변동사항과는 상이할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 탭 (Sticky) */}
        <nav className="sticky top-[52px] z-20 -mx-[var(--spacing-5)] border-b border-[color:var(--border)] bg-[color:var(--background)]">
          <div className="flex h-12 overflow-x-auto px-[var(--spacing-2)]">
            {TABS.map((t) => {
              const isActive = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => {
                    const el = sectionRefs.current[t.key];
                    if (!el) return;
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={cn(
                    "flex shrink-0 flex-col items-center justify-center px-3 pt-4 pb-3 text-sm",
                    isActive
                      ? "border-b-2 border-[var(--Zigbang-Orange-600)] font-bold text-[var(--Zigbang-Orange-600)]"
                      : "font-medium text-[color:var(--secondary-foreground)]"
                  )}
                >
                  {t.label} {typeof t.count === "number" ? `(${t.count})` : ""}
                </button>
              );
            })}
          </div>
        </nav>

        {/* 공통: 아코디언 아이템 */}
        <div className="mt-[var(--spacing-6)] space-y-[var(--spacing-10)]">
          {/* 매물 진단 */}
          <section
            data-tab="property"
            ref={(el) => {
              sectionRefs.current.property = el;
            }}
            className="scroll-mt-[140px]"
          >
            <h3 className="text-[var(--font-size-xl)] font-bold leading-[30px] text-[color:var(--foreground)]">
              집의 권리관계를 분석하여
              <br />
              위험한 요소들을 체크했어요!
            </h3>
            <p className="mt-[var(--spacing-1)] text-[var(--font-size-sm)] leading-[var(--font-leading-6)] text-[color:var(--secondary-foreground)]">
              등기부등본을 확인해 근저당·압류·경매 같은 보증금 보호에 영향을
              주는 위험 권리가 있는지 보는거라 중요해요.
            </p>

            <div className="mt-[var(--spacing-4)] rounded-[var(--border-radius-3xl)] bg-gradient-to-l from-[#4042ff]/5 to-[#57a3ff]/5 p-[var(--spacing-5)] text-center">
              <div className="mx-auto inline-flex items-center gap-1 rounded-full bg-[color:var(--background)] px-2 py-1 text-[11px] font-bold text-[color:var(--ring)]">
                집 위험도 분석 AI 요약
              </div>
              <p className="mt-[var(--spacing-2)] whitespace-pre-line text-[var(--font-size-base)] leading-[var(--font-leading-7)] text-[color:var(--foreground)]">
                {summary?.title ??
                  (failedCount.property > 0
                    ? "몇 가지 권리 관계가 확인되었어요.\n계약 전 반드시 확인해보세요."
                    : "주요 권리관계는 양호해요.\n필수 체크만 진행해보세요.")}
              </p>
            </div>

            {/* 📌 기본 정보 (display) */}
            <div className="mt-[var(--spacing-7)]">
              <h4 className="text-[var(--font-size-lg)] font-bold leading-[var(--font-leading-7)] text-[color:var(--foreground)]">
                📌 기본 정보
              </h4>
              <hr className="my-[var(--spacing-3)] border-t border-[color:var(--border)]" />
              <div className="space-y-[var(--spacing-2)]">
                {displayBySection.property.map((f) => {
                  const value = ctx.values[f.key];
                  const rendered =
                    f.format === "currency"
                      ? formatKRW(value)
                      : value ?? "-";

                  return (
                    <div key={f.key}>
                      <div className="flex items-start justify-between gap-[var(--spacing-4)] px-[var(--spacing-1)] py-[var(--spacing-2)]">
                        <span className="text-[var(--font-size-base)] font-bold leading-[var(--font-leading-7)] text-[color:var(--foreground)]">
                          {f.title}
                        </span>
                        <span className="whitespace-pre-line text-right text-[var(--font-size-base)] leading-[var(--font-leading-7)] text-[color:var(--foreground)]">
                          {String(rendered)}
                        </span>
                      </div>
                      {f.description ? (
                        <div className="px-[var(--spacing-1)] pb-[var(--spacing-2)]">
                          <div className={mutedBoxClass()}>
                            <div className="text-[13px] font-bold leading-[18px] text-[color:var(--secondary-foreground)]">
                              💬 참고
                            </div>
                            <div className="mt-1 whitespace-pre-line text-[13px] leading-[18px] text-[color:var(--foreground)]">
                              {f.description}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 📌 건축물대장/권리관계 (rules) */}
            <div className="mt-[var(--spacing-7)]">
              <h4 className="text-[var(--font-size-lg)] font-bold leading-[var(--font-leading-7)] text-[color:var(--foreground)]">
                📌 권리 관계 분석
              </h4>
              <hr className="my-[var(--spacing-3)] border-t border-[color:var(--border)]" />
              <div className="divide-y divide-[#f2f2f2]">
                {rulesBySection.property.map((card) => {
                  const failed = ctx.flags[card.key] === true;
                  const open = openKeys[card.key] === true;
                  const pill = statusLabel(failed);
                  const rightText = failed ? card.failText : card.passText;

                  return (
                    <div key={card.key} className="py-[var(--spacing-1)]">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-[var(--spacing-3)] px-[var(--spacing-1)] py-[var(--spacing-3)] text-left"
                        onClick={() =>
                          setOpenKeys((prev) => ({
                            ...prev,
                            [card.key]: !prev[card.key],
                          }))
                        }
                        aria-expanded={open}
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="truncate text-[var(--font-size-base)] font-bold leading-[var(--font-leading-7)] text-[color:var(--foreground)]">
                            {card.title}
                          </span>
                          <span
                            className={cn(
                              "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium leading-[14px]",
                              statusPillClass(failed)
                            )}
                          >
                            {pill}
                          </span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-[var(--font-size-base)] leading-[var(--font-leading-7)] text-[color:var(--foreground)]">
                            {rightText || (failed ? "해당" : "해당 없음")}
                          </span>
                          <span className="text-[color:var(--muted-foreground)]">{open ? "▴" : "▾"}</span>
                        </div>
                      </button>

                      {open ? (
                        <div className="pb-[var(--spacing-4)]">
                          {failed ? (
                            <div className="mx-[var(--spacing-1)] mb-[var(--spacing-2)] rounded-[var(--border-radius-xl)] border border-[color:var(--destructive)] bg-[color:var(--red-50)] px-[var(--spacing-4)] py-[var(--spacing-3)]">
                              <div className="text-[13px] font-bold leading-[18px] text-[color:var(--secondary-foreground)]">
                                ❗ 확인이 필요해요
                              </div>
                              <div className="mt-1 text-[13px] leading-[18px] text-[color:var(--foreground)]">
                                {card.failText || "해당 항목이 발견되었어요."}
                              </div>
                            </div>
                          ) : null}

                          <div className={cn("mx-[var(--spacing-1)]", mutedBoxClass())}>
                            <div className="text-[13px] font-bold leading-[18px] text-[color:var(--secondary-foreground)]">
                              💬 설명
                            </div>
                            <div className="mt-1 whitespace-pre-line text-[13px] leading-[18px] text-[color:var(--foreground)]">
                              {card.description}
                            </div>
                          </div>

                          {failed ? (
                            <button
                              type="button"
                              onClick={() => {
                                const el = sectionRefs.current.clause;
                                if (!el) return;
                                el.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }}
                              className="mx-[var(--spacing-1)] mt-[var(--spacing-2)] w-full rounded-[var(--border-radius-xl)] border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-2.5 text-[13px] font-medium leading-[18px] text-[color:var(--foreground)]"
                            >
                              계약 전, 맞춤 특약 바로 보기
                            </button>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 집주인 진단 */}
          <section
            data-tab="owner"
            ref={(el) => {
              sectionRefs.current.owner = el;
            }}
            className="scroll-mt-[140px]"
          >
            <h3 className="text-[var(--font-size-xl)] font-bold leading-[30px] text-[color:var(--foreground)]">
              집주인 정보를 확인했어요
            </h3>
            <p className="mt-[var(--spacing-1)] text-[var(--font-size-sm)] leading-[var(--font-leading-6)] text-[color:var(--secondary-foreground)]">
              소유자/임대인 일치 여부 등 계약 전 확인이 필요한 포인트를
              체크했어요.
            </p>

            <div className={cn(cardClass(), "mt-[var(--spacing-6)] p-[var(--spacing-5)]")}>
              <div className="text-[var(--font-size-base)] font-bold text-[color:var(--foreground)]">
                기본 정보
              </div>
              <div className="mt-[var(--spacing-3)] space-y-[var(--spacing-2)]">
                {displayBySection.owner.map((f) => (
                  <div
                    key={f.key}
                    className="flex items-start justify-between gap-[var(--spacing-4)]"
                  >
                    <span className="text-sm font-semibold text-[color:var(--secondary-foreground)]">
                      {f.title}
                    </span>
                    <span className="text-right text-sm font-medium text-[color:var(--foreground)]">
                      {String(ctx.values[f.key] ?? "-")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={cn(cardClass(), "mt-[var(--spacing-6)] divide-y divide-[#f2f2f2]")}>
              {rulesBySection.owner.map((card) => {
                const failed = ctx.flags[card.key] === true;
                const open = openKeys[card.key] === true;
                const pill = statusLabel(failed);
                const rightText = failed ? card.failText : card.passText;

                return (
                  <div key={card.key} className="px-[var(--spacing-4)] py-[var(--spacing-1)]">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-[var(--spacing-3)] py-[var(--spacing-3)] text-left"
                      onClick={() =>
                        setOpenKeys((prev) => ({
                          ...prev,
                          [card.key]: !prev[card.key],
                        }))
                      }
                      aria-expanded={open}
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-[var(--font-size-base)] font-bold text-[color:var(--foreground)]">
                          {card.title}
                        </span>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium leading-[14px]",
                            statusPillClass(failed)
                          )}
                        >
                          {pill}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-[var(--font-size-sm)] text-[color:var(--foreground)]">
                          {rightText || (failed ? "해당" : "미해당")}
                        </span>
                        <span className="text-[color:var(--muted-foreground)]">{open ? "▴" : "▾"}</span>
                      </div>
                    </button>
                    {open ? (
                      <div className="pb-[var(--spacing-4)]">
                        <div className={mutedBoxClass()}>
                          <div className="text-[13px] font-bold leading-[18px] text-[color:var(--secondary-foreground)]">
                            💬 설명
                          </div>
                          <div className="mt-1 whitespace-pre-line text-[13px] leading-[18px] text-[color:var(--foreground)]">
                            {card.description}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 시세 진단 */}
          <section
            data-tab="price"
            ref={(el) => {
              sectionRefs.current.price = el;
            }}
            className="scroll-mt-[140px]"
          >
            <h3 className="text-[var(--font-size-xl)] font-bold leading-[30px] text-[color:var(--foreground)]">
              시세/보증금 안전성을 확인했어요
            </h3>
            <p className="mt-[var(--spacing-1)] text-[var(--font-size-sm)] leading-[var(--font-leading-6)] text-[color:var(--secondary-foreground)]">
              시세 추정액과 채무/보증금 정보를 기반으로 여유 금액을 계산했어요.
            </p>

            <div className={cn(cardClass(), "mt-[var(--spacing-6)] p-[var(--spacing-5)]")}>
              <div className="flex items-start justify-between gap-[var(--spacing-4)]">
                <div>
                  <div className="text-[var(--font-size-base)] font-bold text-[color:var(--foreground)]">
                    시세 추정액
                  </div>
                  <div className="mt-1 text-xs text-[color:var(--muted-foreground)]">
                    (목업) 계산 근거는 추후 연결 예정
                  </div>
                </div>
                <div className="text-right">
                  <div className="tabular-nums text-[var(--font-size-xl)] font-bold text-[color:var(--foreground)]">
                    {formatKRW(estimatedPrice)}
                  </div>
                </div>
              </div>

              <div className="mt-[var(--spacing-4)] space-y-[var(--spacing-2)]">
                {displayBySection.price.map((f) => {
                  const value = ctx.values[f.key];
                  const rendered =
                    f.format === "currency" ? formatKRW(value) : value ?? "-";
                  return (
                    <div
                      key={f.key}
                      className="flex items-start justify-between gap-[var(--spacing-4)]"
                    >
                      <span className="text-sm font-semibold text-[color:var(--secondary-foreground)]">
                        {f.title}
                      </span>
                      <span className="text-right text-sm font-medium text-[color:var(--foreground)]">
                        {String(rendered)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={cn(cardClass(), "mt-[var(--spacing-6)] divide-y divide-[#f2f2f2]")}>
              {rulesBySection.price.map((card) => {
                const failed = ctx.flags[card.key] === true;
                const open = openKeys[card.key] === true;
                const pill = statusLabel(failed);
                const rightText = failed ? card.failText : card.passText;

                return (
                  <div key={card.key} className="px-[var(--spacing-4)] py-[var(--spacing-1)]">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-[var(--spacing-3)] py-[var(--spacing-3)] text-left"
                      onClick={() =>
                        setOpenKeys((prev) => ({
                          ...prev,
                          [card.key]: !prev[card.key],
                        }))
                      }
                      aria-expanded={open}
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-[var(--font-size-base)] font-bold text-[color:var(--foreground)]">
                          {card.title}
                        </span>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium leading-[14px]",
                            statusPillClass(failed)
                          )}
                        >
                          {pill}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-[var(--font-size-sm)] text-[color:var(--foreground)]">
                          {rightText || (failed ? "해당" : "미해당")}
                        </span>
                        <span className="text-[color:var(--muted-foreground)]">{open ? "▴" : "▾"}</span>
                      </div>
                    </button>
                    {open ? (
                      <div className="pb-[var(--spacing-4)]">
                        <div className={mutedBoxClass()}>
                          <div className="text-[13px] font-bold leading-[18px] text-[color:var(--secondary-foreground)]">
                            💬 설명
                          </div>
                          <div className="mt-1 whitespace-pre-line text-[13px] leading-[18px] text-[color:var(--foreground)]">
                            {card.description}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 맞춤 특약 */}
          <section
            data-tab="clause"
            ref={(el) => {
              sectionRefs.current.clause = el;
            }}
            className="scroll-mt-[140px]"
          >
            <div ref={clauseTopRef} />
            <h3 className="text-[var(--font-size-xl)] font-bold leading-[30px] text-[color:var(--foreground)]">
              이 집 맞춤 특약
            </h3>
            <p className="mt-[var(--spacing-1)] text-[var(--font-size-sm)] leading-[var(--font-leading-6)] text-[color:var(--secondary-foreground)]">
              위험 요소가 있거나 불확실한 부분은 특약으로 보완하는 게 좋아요.
            </p>

            <div className="mt-[var(--spacing-6)] space-y-[var(--spacing-2)]">
              {clauseMessages.map((m) => (
                <div
                  key={m.key}
                  className={cn(cardClass(), "p-[var(--spacing-5)]")}
                >
                  <div className="text-[var(--font-size-base)] font-bold text-[color:var(--foreground)]">
                    {m.title}
                  </div>
                  <div className="mt-[var(--spacing-2)] whitespace-pre-line text-[var(--font-size-sm)] leading-[var(--font-leading-6)] text-[color:var(--secondary-foreground)]">
                    {m.body}
                  </div>
                </div>
              ))}
              {!clauseMessages.length ? (
                <div className={cn(cardClass(), "p-[var(--spacing-5)] text-sm text-[color:var(--muted-foreground)]")}>
                  (표시할 특약이 없어요)
                </div>
              ) : null}
            </div>
          </section>
        </div>

        <div className="mt-[var(--spacing-8)] text-center text-xs text-[color:var(--muted-foreground)]">
          본 리포트는 참고용이며, 실제 계약 시 전문가 확인을 권장합니다.
        </div>
      </main>
    </div>
  );
}