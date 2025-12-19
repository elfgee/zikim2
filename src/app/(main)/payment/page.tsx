"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type DiagnosisFormData = {
  address: string;
  area: string;
  deposit: string; // 숫자 문자열
  monthlyRent: string; // 숫자 문자열
  contractMonths: string;
  agreed: boolean;
  from: "gateway" | "property";
  propertyId?: string;
};

function formatKRW(v?: string) {
  if (!v) return "-";
  const n = Number(v);
  if (!Number.isFinite(n) || n <= 0) return "-";
  return n.toLocaleString("ko-KR") + "원";
}

export default function PaymentPage() {
  const router = useRouter();
  const [data, setData] = useState<DiagnosisFormData | null>(null);
  const [agreePaymentTerms, setAgreePaymentTerms] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("diagnosisFormData");
    if (!raw) {
      // 진단 시작 화면을 거치지 않고 들어온 경우
      router.replace("/gateway");
      return;
    }
    setData(JSON.parse(raw));
  }, [router]);

  if (!data) {
    return (
      <div className="min-h-dvh bg-slate-50 px-5 pt-6">
        <p className="text-sm text-gray-600">결제 정보를 불러오는 중…</p>
      </div>
    );
  }

  const PRICE = 29900;
  const isValid =
    data.address.trim().length > 0 &&
    data.area.trim().length > 0 &&
    data.contractMonths.trim().length > 0 &&
    data.deposit.trim().length > 0;
  const canPay = isValid && agreePaymentTerms;

  const handlePayment = () => {
    if (!canPay) return;
    // TODO: 실제 토스 브랜드페이 연동 위치
    // 지금은 더미 처리
    router.push("/waiting");
  };

  return (
    <div className="min-h-dvh bg-slate-50 px-[var(--spacing-5)] pt-[var(--spacing-6)] pb-[calc(env(safe-area-inset-bottom)+120px)]">
      {/* 상단: 타이틀 + 서브카피 + 뒤로 */}
      <div className="flex items-start justify-between gap-[var(--spacing-4)]">
        <div className="min-w-0">
          <h1 className="text-[length:var(--font-size-xl)] leading-[length:var(--font-leading-8)] font-bold tracking-tight text-gray-900">
            결제
          </h1>
          <p className="mt-[var(--spacing-1)] text-[length:var(--font-size-sm)] leading-[length:var(--font-leading-6)] text-gray-600">
            결제 정보를 확인하고 결제를 진행해주세요.
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
        {/* 매물 요약 카드 */}
        <section className="rounded-[var(--border-radius-3xl)] border border-[color:var(--border)] bg-[color:var(--background)] p-[var(--spacing-4)] shadow-sm">
          <div className="text-[length:var(--font-size-sm)] font-semibold text-gray-900">
            진단 매물 정보
          </div>

          <div className="mt-[var(--spacing-4)] space-y-[var(--spacing-3)]">
            <div className="space-y-[var(--spacing-1)]">
              <div className="text-xs text-gray-500">주소</div>
              <div className="text-[length:var(--font-size-base)] leading-[length:var(--font-leading-7)] font-medium text-gray-900">
                {data.address || "-"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[var(--spacing-3)]">
              <div className="rounded-[var(--border-radius-2xl)] bg-slate-50 px-[var(--spacing-4)] py-[var(--spacing-3)]">
                <div className="text-xs text-gray-500">전용면적</div>
                <div className="mt-[var(--spacing-1)] flex items-baseline justify-between">
                  <div className="text-right tabular-nums text-[length:var(--font-size-base)] font-semibold text-gray-900">
                    {data.area || "-"}
                  </div>
                  <div className="text-xs text-gray-500">㎡</div>
                </div>
              </div>

              <div className="rounded-[var(--border-radius-2xl)] bg-slate-50 px-[var(--spacing-4)] py-[var(--spacing-3)]">
                <div className="text-xs text-gray-500">계약기간</div>
                <div className="mt-[var(--spacing-1)] flex items-baseline justify-between">
                  <div className="text-right tabular-nums text-[length:var(--font-size-base)] font-semibold text-gray-900">
                    {data.contractMonths || "-"}
                  </div>
                  <div className="text-xs text-gray-500">개월</div>
                </div>
              </div>
            </div>

            <div className="rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-white px-[var(--spacing-4)] py-[var(--spacing-3)]">
              <div className="flex items-start justify-between gap-[var(--spacing-4)]">
                <div className="text-sm font-medium text-gray-900">보증금</div>
                <div className="text-right">
                  <div className="tabular-nums text-[length:var(--font-size-base)] font-semibold text-gray-900">
                    {formatKRW(data.deposit)}
                  </div>
                  <div className="text-xs text-gray-500">원</div>
                </div>
              </div>

              <div className="mt-[var(--spacing-2)] flex items-start justify-between gap-[var(--spacing-4)]">
                <div className="text-sm font-medium text-gray-900">
                  월세 <span className="text-gray-500">(선택)</span>
                </div>
                <div className="text-right">
                  <div className="tabular-nums text-[length:var(--font-size-base)] font-semibold text-gray-900">
                    {formatKRW(data.monthlyRent)}
                  </div>
                  <div className="text-xs text-gray-500">원</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 가격 */}
        <section className="rounded-[var(--border-radius-3xl)] border border-[color:var(--border)] bg-[color:var(--background)] p-[var(--spacing-4)] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[length:var(--font-size-sm)] font-semibold text-gray-900">
                지킴진단 이용료
              </div>
              <div className="mt-[var(--spacing-1)] text-xs text-gray-500">
                (임시) 토스 브랜드페이 연동 예정
              </div>
            </div>
            <div className="tabular-nums text-[length:var(--font-size-xl)] font-bold text-gray-900">
              {PRICE.toLocaleString("ko-KR")}원
            </div>
          </div>
        </section>

        {/* 약관 체크 */}
        <section className="rounded-[var(--border-radius-3xl)] border border-[color:var(--border)] bg-[color:var(--background)] p-[var(--spacing-4)] shadow-sm">
          <label className="flex items-start gap-[var(--spacing-3)]">
            <input
              type="checkbox"
              checked={agreePaymentTerms}
              onChange={(e) => setAgreePaymentTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[var(--Zigbang-Sub-Brand-Zikim)] focus:ring-[var(--Zigbang-Sub-Brand-Zikim)]"
            />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900">
                결제 진행을 위한 약관에 동의합니다
              </div>
              <div className="mt-[var(--spacing-1)] text-xs text-gray-600">
                서비스 이용약관 및 개인정보 처리방침(필수)
              </div>
            </div>
          </label>
        </section>
      </div>

      {/* 결제하기 CTA(sticky) */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[color:var(--border)] bg-white/95 backdrop-blur">
        <div className="mx-auto w-full max-w-md px-[var(--spacing-5)] pt-[var(--spacing-3)] pb-[calc(env(safe-area-inset-bottom)+16px)]">
          <button
            type="button"
            disabled={!canPay}
            onClick={handlePayment}
            className={[
              "w-full rounded-[var(--border-radius-3xl)] px-[var(--spacing-4)] py-[var(--spacing-4)] text-[length:var(--font-size-base)] leading-[length:var(--font-leading-7)] font-semibold shadow-sm transition",
              canPay
                ? "bg-[var(--Zigbang-Sub-Brand-Zikim)] text-white hover:opacity-95 active:opacity-90"
                : "cursor-not-allowed bg-gray-200 text-gray-500 opacity-70",
            ].join(" ")}
          >
            {PRICE.toLocaleString("ko-KR")}원 결제하기
          </button>
          {!agreePaymentTerms ? (
            <div className="mt-[var(--spacing-2)] text-center text-xs text-gray-600">
              결제 진행을 위해 약관에 동의해주세요.
            </div>
          ) : !isValid ? (
            <div className="mt-[var(--spacing-2)] text-center text-xs text-gray-600">
              진단 정보가 부족해 결제를 진행할 수 없어요. 이전 화면에서 다시 입력해주세요.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}