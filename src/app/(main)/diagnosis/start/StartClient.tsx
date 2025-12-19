"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type DiagnosisFormData = {
  address: string;
  area: string; // 전용면적(㎡) 문자열로 관리 (입력폼 편의)
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
  // 앞자리 0 제거(단, "0"은 허용)
  const normalized = digits.replace(/^0+(?=\d)/, "");
  return normalized.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function DiagnosisStartClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fromParam = searchParams.get("from");
  const idParam = searchParams.get("id");

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

  // from/property 진입 시: (초기엔 더미로) 주소/면적 자동 세팅
  useEffect(() => {
    if (from === "property" && idParam) {
      setForm((prev) => ({
        ...prev,
        from: "property",
        propertyId: idParam,
        // TODO: 추후 API 연동 시 propertyId로 실제 주소/면적 fetch해서 세팅
        address: prev.address || `샘플 주소 (매물ID: ${idParam})`,
        area: prev.area || "84",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        from: "gateway",
        propertyId: undefined,
      }));
    }
  }, [from, idParam]);

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
    // 면적은 소수점 입력 가능하게 (필요없으면 digits만)
    const v = e.target.value.replace(/[^\d.]/g, "");
    setForm((prev) => ({ ...prev, area: v }));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    // 임시 저장 (추후 API 연동하면 서버로 대체)
    const payload: DiagnosisFormData = {
      ...form,
      deposit: onlyDigits(form.deposit), // 저장은 숫자만
      monthlyRent: onlyDigits(form.monthlyRent),
    };

    sessionStorage.setItem("diagnosisFormData", JSON.stringify(payload));

    router.push("/payment");
  };

  return (
    <div className="min-h-dvh bg-white px-5 pt-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">지킴진단 시작</h1>
          <p className="mt-1 text-sm text-gray-600">
            {from === "property" && form.propertyId
              ? `매물에서 가져온 정보로 시작해요 (ID: ${form.propertyId})`
              : "주소와 계약 정보를 입력해주세요."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-gray-600 underline"
        >
          뒤로
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {/* 주소 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">주소</label>
          <input
            value={form.address}
            onChange={onChange("address")}
            placeholder="예) 서울시 송파구 ..."
            className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* 면적 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            전용면적(㎡)
          </label>
          <input
            value={form.area}
            onChange={onAreaChange}
            inputMode="decimal"
            placeholder="예) 84"
            className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* 보증금 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            보증금(원)
          </label>
          <input
            value={form.deposit}
            onChange={onDepositChange}
            inputMode="numeric"
            placeholder="예) 500,000,000"
            className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* 월세(선택) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            월세(원) <span className="text-gray-500">(선택)</span>
          </label>
          <input
            value={form.monthlyRent}
            onChange={onMonthlyRentChange}
            inputMode="numeric"
            placeholder="예) 1,500,000"
            className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* 계약기간 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            계약기간
          </label>
          <select
            value={form.contractMonths}
            onChange={onChange("contractMonths")}
            className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-black/10"
          >
            <option value="12">12개월</option>
            <option value="24">24개월</option>
            <option value="36">36개월</option>
          </select>
        </div>

        {/* 약관 동의 */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={onChange("agreed")}
              className="mt-1 h-4 w-4"
            />
            <div>
              <div className="text-sm font-semibold text-gray-900">
                필수 약관에 동의합니다
              </div>
              <div className="mt-1 text-xs text-gray-600">
                (임시) 서비스 이용약관/개인정보 처리방침 동의
              </div>
            </div>
          </label>
        </div>

        {/* CTA */}
        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleSubmit}
          className={[
            "mt-2 w-full rounded-2xl p-4 text-base font-semibold shadow-sm",
            canSubmit
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed",
          ].join(" ")}
        >
          결제하기
        </button>

        {/* 디버그(원하면 나중에 삭제) */}
        <div className="pt-2 text-xs text-gray-400">
          저장 키:{" "}
          <span className="font-mono">sessionStorage.diagnosisFormData</span>
        </div>
      </div>
    </div>
  );
}


