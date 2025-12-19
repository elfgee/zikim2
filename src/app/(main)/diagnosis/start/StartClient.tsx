"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type DiagnosisFormData = {
  address: string;
  area: string;
  deposit: string; // 보증금(원) 문자열
  monthlyRent: string; // 월세(원) 문자열 (선택)
  contractMonths: string; // 계약기간(개월)
  agreed: boolean;
  from: "gateway" | "property";
  propertyId?: string;
};

function onlyDigits(v: string) {
  return v.replace(/[^\d]/g, "");
}

function formatNumberWithComma(v: string) {
  const digits = onlyDigits(v);
  if (!digits) return "";
  const normalized = digits.replace(/^0+(?=\d)/, "");
  return normalized.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function DiagnosisStartClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fromParam = searchParams.get("from");
  const idParam = searchParams.get("id");

  // ✅ property 상세에서 넘긴 값
  const addressParam = searchParams.get("address") ?? "";
  const areaParam = searchParams.get("area") ?? "";

  const from = useMemo<"gateway" | "property">(() => {
    return fromParam === "property" ? "property" : "gateway";
  }, [fromParam]);

  const [form, setForm] = useState<DiagnosisFormData>({
    address: "",
    area: "",
    deposit: "",
    monthlyRent: "",
    contractMonths: "24",
    agreed: false,
    from,
    propertyId: from === "property" ? idParam ?? undefined : undefined,
  });

  // ✅ 진입 시 query 우선 반영 (있으면 그대로 세팅)
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      from,
      propertyId: from === "property" ? idParam ?? undefined : undefined,
      address: addressParam || prev.address,
      area: areaParam || prev.area,
    }));
  }, [from, idParam, addressParam, areaParam]);

  const canSubmit =
    form.address.trim().length > 0 &&
    form.area.trim().length > 0 &&
    onlyDigits(form.deposit).length > 0 &&
    form.contractMonths.trim().length > 0 &&
    form.agreed;

  const onChange =
    (key: keyof DiagnosisFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value;

      setForm((prev) => ({ ...prev, [key]: value as any }));
    };

  const onDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithComma(e.target.value);
    setForm((prev) => ({ ...prev, deposit: formatted }));
  };

  const onMonthlyRentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithComma(e.target.value);
    setForm((prev) => ({ ...prev, monthlyRent: formatted }));
  };

  const onAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^\d.]/g, "");
    setForm((prev) => ({ ...prev, area: v }));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    const payload: DiagnosisFormData = {
      ...form,
      deposit: onlyDigits(form.deposit),
      monthlyRent: onlyDigits(form.monthlyRent),
    };

    sessionStorage.setItem("diagnosisFormData", JSON.stringify(payload));
    router.push("/payment");
  };

  return (
    <div className="min-h-dvh bg-slate-50 px-[var(--spacing-5)] pt-[var(--spacing-6)] pb-[calc(env(safe-area-inset-bottom)+120px)]">
      {/* 상단: 타이틀 + 서브카피 + 뒤로 */}
      <div className="flex items-start justify-between gap-[var(--spacing-4)]">
        <div className="min-w-0">
          <h1 className="text-[length:var(--font-size-xl)] leading-[length:var(--font-leading-8)] font-bold tracking-tight text-gray-900">
            지킴진단 시작
          </h1>
          <p className="mt-[var(--spacing-1)] text-[length:var(--font-size-sm)] leading-[length:var(--font-leading-6)] text-gray-600">
            {from === "property" && form.propertyId
              ? `매물에서 가져온 정보로 시작해요 (ID: ${form.propertyId})`
              : "주소와 계약 정보를 입력해주세요."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          className="shrink-0 rounded-[var(--border-radius-lg)] px-[var(--spacing-2)] py-[var(--spacing-1)] text-[length:var(--font-size-sm)] font-medium text-gray-700 hover:bg-black/5 active:bg-black/10"
        >
          뒤로
        </button>
      </div>

      <div className="mt-[var(--spacing-6)] space-y-[var(--spacing-4)]">
        {/* 입력: 카드형 섹션으로 그룹핑 */}
        <section className="rounded-[var(--border-radius-3xl)] border border-[color:var(--border)] bg-[color:var(--background)] p-[var(--spacing-4)] shadow-sm">
          <div className="text-[length:var(--font-size-sm)] font-semibold text-gray-900">
            기본 정보
          </div>
          <div className="mt-[var(--spacing-4)] space-y-[var(--spacing-4)]">
            {/* 주소 */}
            <div className="space-y-[var(--spacing-2)]">
              <label className="block text-sm font-medium text-gray-900">
                주소
              </label>
              <input
                value={form.address}
                onChange={onChange("address")}
                placeholder="예) 서울시 송파구 ..."
                className="w-full rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-[color:var(--background)] px-[var(--spacing-4)] py-[var(--spacing-3)] text-[length:var(--font-size-base)] leading-[length:var(--font-leading-7)] text-gray-900 placeholder:text-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-[var(--Zigbang-Sub-Brand-Zikim)] focus-visible:ring-opacity-20"
              />
            </div>

            {/* 면적 */}
            <div className="space-y-[var(--spacing-2)]">
              <label className="block text-sm font-medium text-gray-900">
                전용면적
              </label>
              <div className="relative">
                <input
                  value={form.area}
                  onChange={onAreaChange}
                  inputMode="decimal"
                  placeholder="예) 84"
                  className="w-full rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-[color:var(--background)] px-[var(--spacing-4)] py-[var(--spacing-3)] pr-[var(--spacing-14)] text-right tabular-nums text-[length:var(--font-size-base)] leading-[length:var(--font-leading-7)] text-gray-900 placeholder:text-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-[var(--Zigbang-Sub-Brand-Zikim)] focus-visible:ring-opacity-20"
                />
                <div className="pointer-events-none absolute inset-y-0 right-[var(--spacing-4)] flex items-center text-[length:var(--font-size-sm)] text-gray-500">
                  ㎡
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[var(--border-radius-3xl)] border border-[color:var(--border)] bg-[color:var(--background)] p-[var(--spacing-4)] shadow-sm">
          <div className="text-[length:var(--font-size-sm)] font-semibold text-gray-900">
            금액
          </div>
          <div className="mt-[var(--spacing-4)] space-y-[var(--spacing-4)]">
            {/* 보증금 */}
            <div className="space-y-[var(--spacing-2)]">
              <label className="block text-sm font-medium text-gray-900">
                보증금
              </label>
              <div className="relative">
                <input
                  value={form.deposit}
                  onChange={onDepositChange}
                  inputMode="numeric"
                  placeholder="예) 500,000,000"
                  className="w-full rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-[color:var(--background)] px-[var(--spacing-4)] py-[var(--spacing-3)] pr-[var(--spacing-12)] text-right tabular-nums text-[length:var(--font-size-base)] leading-[length:var(--font-leading-7)] text-gray-900 placeholder:text-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-[var(--Zigbang-Sub-Brand-Zikim)] focus-visible:ring-opacity-20"
                />
                <div className="pointer-events-none absolute inset-y-0 right-[var(--spacing-4)] flex items-center text-[length:var(--font-size-sm)] text-gray-500">
                  원
                </div>
              </div>
            </div>

            {/* 월세(선택) */}
            <div className="space-y-[var(--spacing-2)]">
              <label className="block text-sm font-medium text-gray-900">
                월세 <span className="text-gray-500">(선택)</span>
              </label>
              <div className="relative">
                <input
                  value={form.monthlyRent}
                  onChange={onMonthlyRentChange}
                  inputMode="numeric"
                  placeholder="예) 1,500,000"
                  className="w-full rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-[color:var(--background)] px-[var(--spacing-4)] py-[var(--spacing-3)] pr-[var(--spacing-12)] text-right tabular-nums text-[length:var(--font-size-base)] leading-[length:var(--font-leading-7)] text-gray-900 placeholder:text-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-[var(--Zigbang-Sub-Brand-Zikim)] focus-visible:ring-opacity-20"
                />
                <div className="pointer-events-none absolute inset-y-0 right-[var(--spacing-4)] flex items-center text-[length:var(--font-size-sm)] text-gray-500">
                  원
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[var(--border-radius-3xl)] border border-[color:var(--border)] bg-[color:var(--background)] p-[var(--spacing-4)] shadow-sm">
          <div className="text-[length:var(--font-size-sm)] font-semibold text-gray-900">
            기간
          </div>
          <div className="mt-[var(--spacing-4)] space-y-[var(--spacing-2)]">
            <label className="block text-sm font-medium text-gray-900">
              계약기간
            </label>
            <select
              value={form.contractMonths}
              onChange={onChange("contractMonths")}
              className="w-full rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-[color:var(--background)] px-[var(--spacing-4)] py-[var(--spacing-3)] text-[length:var(--font-size-base)] leading-[length:var(--font-leading-7)] text-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-[var(--Zigbang-Sub-Brand-Zikim)] focus-visible:ring-opacity-20"
            >
              <option value="12">12개월</option>
              <option value="24">24개월</option>
              <option value="36">36개월</option>
            </select>
          </div>
        </section>

        {/* 약관 동의 */}
        <section className="rounded-[var(--border-radius-3xl)] border border-[color:var(--border)] bg-[color:var(--background)] p-[var(--spacing-4)] shadow-sm">
          <label className="flex items-start gap-[var(--spacing-3)]">
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={onChange("agreed")}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[var(--Zigbang-Sub-Brand-Zikim)] focus:ring-[var(--Zigbang-Sub-Brand-Zikim)]"
            />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900">
                필수 약관에 동의합니다
              </div>
              <div className="mt-[var(--spacing-1)] text-xs text-gray-600">
                (임시) 서비스 이용약관/개인정보 처리방침 동의
              </div>
            </div>
          </label>
        </section>
      </div>

      {/* 하단 CTA: sticky bottom + safe-area padding */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[color:var(--border)] bg-white/95 backdrop-blur">
        <div className="mx-auto w-full max-w-md px-[var(--spacing-5)] pt-[var(--spacing-3)] pb-[calc(env(safe-area-inset-bottom)+16px)]">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleSubmit}
            className={[
              "w-full rounded-[var(--border-radius-3xl)] px-[var(--spacing-4)] py-[var(--spacing-4)] text-[length:var(--font-size-base)] leading-[length:var(--font-leading-7)] font-semibold shadow-sm transition",
              canSubmit
                ? "bg-[var(--Zigbang-Sub-Brand-Zikim)] text-white hover:opacity-95 active:opacity-90"
                : "cursor-not-allowed bg-gray-200 text-gray-500 opacity-70",
            ].join(" ")}
          >
            결제하기
          </button>
          {!canSubmit ? (
            <div className="mt-[var(--spacing-2)] text-center text-xs text-gray-600">
              필수 항목을 입력하고 약관에 동의해주세요.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}