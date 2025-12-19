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

const TABS: { key: TabKey; label: string }[] = [
  { key: "property", label: "매물 진단" },
  { key: "owner", label: "집주인 진단" },
  { key: "price", label: "시세 진단" },
  { key: "clause", label: "맞춤 특약" }, // ✅ safe/risky 상관없이 항상 노출
];

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

  // ✅ 탭 상태
  const [activeTab, setActiveTab] = useState<TabKey>("property");
  const sectionRefs = useRef<Record<TabKey, HTMLElement | null>>({
    property: null,
    owner: null,
    price: null,
    clause: null,
  });
  
  // 스크롤 스파이: 섹션이 화면 상단(탭 아래) 근처에 걸리면 activeTab 갱신
  useEffect(() => {
    const entries: { key: TabKey; el: HTMLElement | null }[] = [
      { key: "property", el: sectionRefs.current.property },
      { key: "owner", el: sectionRefs.current.owner },
      { key: "price", el: sectionRefs.current.price },
      { key: "clause", el: sectionRefs.current.clause },
    ];
  
    const targets = entries.filter((x) => x.el).map((x) => x.el!) as HTMLElement[];
  
    if (targets.length === 0) return;
  
    const io = new IntersectionObserver(
      (obsEntries) => {
        // 화면에 들어온 것들 중 "위쪽에 가장 가까운" 섹션을 active로
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
        // sticky 탭 높이 고려: 상단 근처에서 활성화되도록 조정
        root: null,
        threshold: [0.2, 0.35, 0.5],
        rootMargin: "-90px 0px -60% 0px",
      }
    );
  
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);  

  // (옵션) 특정 버튼에서 콘텐츠 최상단으로 이동시키고 싶다면 여기서 구현
  
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

  return (
    <div className="min-h-dvh bg-white px-5 pt-6">
      {/* 헤더 */}
      <h1 className="text-xl font-bold text-gray-900">지킴진단 리포트</h1>

      {/* AI 요약 */}
      <div
        className={[
          "mt-4 rounded-2xl p-4",
          reportType === "risky"
            ? "bg-red-50 text-red-700"
            : "bg-green-50 text-green-700",
        ].join(" ")}
      >
        <div className="font-semibold">
          {summary?.title ??
            (reportType === "risky"
              ? "확인이 필요한 위험 요소가 있어요"
              : "모든 주요 점검 항목이 양호해요")}
        </div>
        <div className="mt-1 text-sm">
          {summary?.body ??
            (reportType === "risky"
              ? "계약 전 반드시 확인해야 할 항목들이 발견되었습니다."
              : "계약 진행에 큰 위험 요소는 보이지 않습니다.")}
        </div>
      </div>

      {/* 탭 (Sticky) */}
      <div className="sticky top-0 z-10 -mx-5 mt-6 border-b bg-white px-5">
        <div className="flex gap-3 overflow-x-auto">
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
                className={[
                  "whitespace-nowrap pb-2 text-sm",
                  isActive
                    ? "border-b-2 border-gray-900 font-semibold text-gray-900"
                    : "text-gray-400",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 탭 콘텐츠 */}
<div className="mt-4 space-y-10">
  {/* 매물 진단 */}
  <section
    data-tab="property"
    ref={(el) => {
      sectionRefs.current.property = el;
    }}
    className="scroll-mt-[180px]"
  >
    <div className="mb-3 text-sm font-semibold text-gray-900">매물 진단</div>
    {/* 임시 렌더링: DISPLAY_FIELDS_LOCAL */}
    <div className="mb-4 overflow-hidden rounded-2xl border">
      <div className="border-b bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900">
        표시 값
      </div>
      <div className="divide-y">
        {displayBySection.property.map((f) => (
          <div key={f.key} className="flex items-start justify-between gap-4 px-4 py-3">
            <div className="text-sm">
              <div className="font-medium text-gray-900">{f.title}</div>
              <div className="mt-0.5 text-xs text-gray-400">{f.key}</div>
            </div>
            <div className="text-right text-sm font-medium text-gray-900">
              {ctx.values[f.key] ?? "-"}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 임시 렌더링: RULE_CARDS_LOCAL */}
    <div className="space-y-3">
      {rulesBySection.property.map((card) => {
        const isChecked = ctx.flags[card.key] === true;
        return (
          <div key={card.key} className="rounded-2xl border px-4 py-3">
            <div className="flex items-start gap-3">
              <input type="checkbox" checked={isChecked} readOnly className="mt-1 h-4 w-4" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-semibold text-gray-900">{card.title}</div>
                  <div className="text-xs font-semibold text-gray-500">
                    {isChecked ? "해당" : "미해당"}
                  </div>
                </div>
                <div className="mt-0.5 text-xs text-gray-400">{card.key}</div>
                <div className="mt-2 whitespace-pre-line text-sm text-gray-600">
                  {card.description}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </section>

  {/* 집주인 진단 */}
  <section
    data-tab="owner"
    ref={(el) => {
      sectionRefs.current.owner = el;
    }}
    className="scroll-mt-[180px]"
  >
    <div className="mb-3 text-sm font-semibold text-gray-900">집주인 진단</div>
    <div className="mb-4 overflow-hidden rounded-2xl border">
      <div className="border-b bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900">
        표시 값
      </div>
      <div className="divide-y">
        {displayBySection.owner.map((f) => (
          <div key={f.key} className="flex items-start justify-between gap-4 px-4 py-3">
            <div className="text-sm">
              <div className="font-medium text-gray-900">{f.title}</div>
              <div className="mt-0.5 text-xs text-gray-400">{f.key}</div>
            </div>
            <div className="text-right text-sm font-medium text-gray-900">
              {ctx.values[f.key] ?? "-"}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-3">
      {rulesBySection.owner.map((card) => {
        const isChecked = ctx.flags[card.key] === true;
        return (
          <div key={card.key} className="rounded-2xl border px-4 py-3">
            <div className="flex items-start gap-3">
              <input type="checkbox" checked={isChecked} readOnly className="mt-1 h-4 w-4" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-semibold text-gray-900">{card.title}</div>
                  <div className="text-xs font-semibold text-gray-500">
                    {isChecked ? "해당" : "미해당"}
                  </div>
                </div>
                <div className="mt-0.5 text-xs text-gray-400">{card.key}</div>
                <div className="mt-2 whitespace-pre-line text-sm text-gray-600">
                  {card.description}
                </div>
              </div>
            </div>
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
    className="scroll-mt-[180px]"
  >
    <div className="mb-3 text-sm font-semibold text-gray-900">시세 진단</div>
    <div className="mb-4 overflow-hidden rounded-2xl border">
      <div className="border-b bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900">
        표시 값
      </div>
      <div className="divide-y">
        {displayBySection.price.map((f) => (
          <div key={f.key} className="flex items-start justify-between gap-4 px-4 py-3">
            <div className="text-sm">
              <div className="font-medium text-gray-900">{f.title}</div>
              <div className="mt-0.5 text-xs text-gray-400">{f.key}</div>
            </div>
            <div className="text-right text-sm font-medium text-gray-900">
              {ctx.values[f.key] ?? "-"}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-3">
      {rulesBySection.price.map((card) => {
        const isChecked = ctx.flags[card.key] === true;
        return (
          <div key={card.key} className="rounded-2xl border px-4 py-3">
            <div className="flex items-start gap-3">
              <input type="checkbox" checked={isChecked} readOnly className="mt-1 h-4 w-4" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-semibold text-gray-900">{card.title}</div>
                  <div className="text-xs font-semibold text-gray-500">
                    {isChecked ? "해당" : "미해당"}
                  </div>
                </div>
                <div className="mt-0.5 text-xs text-gray-400">{card.key}</div>
                <div className="mt-2 whitespace-pre-line text-sm text-gray-600">
                  {card.description}
                </div>
              </div>
            </div>
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
    className="scroll-mt-[180px]"
  >
    <div className="mb-3 text-sm font-semibold text-gray-900">맞춤 특약</div>
    <div className="rounded-2xl border p-4">
      {clauseMessages.map((m) => (
        <div key={m.key} className="rounded-xl bg-gray-50 p-3">
          <div className="text-sm font-semibold text-gray-900">{m.title}</div>
          <div className="mt-1 whitespace-pre-line text-sm text-gray-600">{m.body}</div>
        </div>
      ))}
      {!clauseMessages.length ? (
        <div className="text-sm text-gray-600">(표시할 특약이 없어요)</div>
      ) : null}
    </div>
  </section>
</div>


      {/* 하단 안내 */}
      <div className="mt-8 text-xs text-gray-400">
        본 리포트는 참고용이며, 실제 계약 시 전문가 확인을 권장합니다.
      </div>
    </div>
  );
}