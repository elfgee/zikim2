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
  if (!v || v === "0") return "-";
  return Number(v).toLocaleString("ko-KR") + "원";
}

export default function PaymentPage() {
  const router = useRouter();
  const [data, setData] = useState<DiagnosisFormData | null>(null);

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
      <div className="min-h-dvh bg-white px-5 pt-6">
        <p className="text-sm text-gray-500">결제 정보를 불러오는 중…</p>
      </div>
    );
  }

  const PRICE = 29900;

  const handlePayment = () => {
    // TODO: 실제 토스 브랜드페이 연동 위치
    // 지금은 더미 처리
    router.push("/waiting");
  };

  return (
    <div className="min-h-dvh bg-white px-5 pt-6">
      {/* 헤더 */}
      <div className="flex items-start justify-between">
        <h1 className="text-xl font-bold text-gray-900">결제</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-gray-600 underline"
        >
          뒤로
        </button>
      </div>

      {/* 매물 요약 */}
      <div className="mt-6 rounded-2xl border p-4">
        <div className="text-sm font-semibold text-gray-900">진단 매물 정보</div>

        <div className="mt-3 space-y-2 text-sm text-gray-700">
          <div>
            <span className="text-gray-500">주소</span>
            <div className="font-medium text-gray-900">{data.address}</div>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">전용면적</span>
            <span>{data.area}㎡</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">보증금</span>
            <span>{formatKRW(data.deposit)}</span>
          </div>

          {data.monthlyRent && (
            <div className="flex justify-between">
              <span className="text-gray-500">월세</span>
              <span>{formatKRW(data.monthlyRent)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-500">계약기간</span>
            <span>{data.contractMonths}개월</span>
          </div>
        </div>
      </div>

      {/* 결제 금액 */}
      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            지킴진단 이용료
          </span>
          <span className="text-lg font-bold text-gray-900">
            {PRICE.toLocaleString("ko-KR")}원
          </span>
        </div>
      </div>

      {/* 약관 안내 */}
      <div className="mt-4 text-xs text-gray-500">
        결제 진행 시 서비스 이용약관 및 개인정보 처리방침에 동의한 것으로
        간주됩니다.
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={handlePayment}
        className="mt-6 w-full rounded-2xl bg-gray-900 p-4 text-base font-semibold text-white shadow-sm"
      >
        {PRICE.toLocaleString("ko-KR")}원 결제하기
      </button>

      {/* 하단 설명 */}
      <div className="mt-3 text-center text-xs text-gray-400">
        (임시) 토스 브랜드페이 연동 예정
      </div>
    </div>
  );
}