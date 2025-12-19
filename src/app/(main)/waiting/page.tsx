"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WaitingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  const steps = [
    "매물 정보 수집 중",
    "등기·권리 관계 분석 중",
    "시세 및 위험 요소 판단 중",
    "리포트 생성 중",
  ];

  useEffect(() => {
    // 진단 데이터 없으면 잘못된 진입 → 홈으로
    const raw = sessionStorage.getItem("diagnosisFormData");
    if (!raw) {
      router.replace("/gateway");
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        // 더미 진행: 3~9씩 증가 (100%에서 정지)
        return prev + Math.floor(Math.random() * 7) + 3;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    if (progress >= 25) setStep(1);
    if (progress >= 50) setStep(2);
    if (progress >= 75) setStep(3);

    if (progress >= 100) {
      // 완료 시 리포트로 이동 (더미 reportId)
      setTimeout(() => {
        const reportId = "sample-report-001";
        router.replace(`/reports/${reportId}`);
      }, 800);
    }
  }, [progress, router]);

  const pct = Math.min(progress, 100);
  const etaSec = Math.max(0, Math.ceil(((100 - pct) / 100) * 30)); // 평균 30초 가정(더미)

  return (
    <div className="min-h-dvh bg-slate-50 px-[var(--spacing-5)] pt-[var(--spacing-6)]">
      <div className="rounded-[var(--border-radius-3xl)] border border-[color:var(--border)] bg-white p-[var(--spacing-6)] shadow-sm">
        <div className="text-center">
          <h1 className="text-[length:var(--font-size-xl)] leading-[length:var(--font-leading-8)] font-bold tracking-tight text-gray-900">
            지킴진단 리포트 생성 중
          </h1>
          <p className="mt-[var(--spacing-2)] text-[length:var(--font-size-sm)] leading-[length:var(--font-leading-6)] text-gray-600">
            잠시만 기다려 주세요. 평균 30초 이내로 완료돼요.
          </p>
        </div>

        {/* 진행률 */}
        <div className="mt-[var(--spacing-6)]">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-900">진행률</div>
            <div className="tabular-nums text-sm font-semibold text-gray-900">
              {pct}%
            </div>
          </div>
          <div className="mt-[var(--spacing-2)] h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-[var(--Zigbang-Sub-Brand-Zikim)] transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-[var(--spacing-2)] flex items-center justify-between text-xs text-gray-600">
            <span>예상 남은 시간</span>
            <span className="tabular-nums">약 {etaSec}초</span>
          </div>
        </div>

        {/* 단계(stepper) */}
        <div className="mt-[var(--spacing-6)]">
          <div className="text-sm font-semibold text-gray-900">진행 단계</div>
          <div className="mt-[var(--spacing-3)] space-y-[var(--spacing-2)]">
            {steps.map((label, idx) => {
              const isDone = idx < step;
              const isActive = idx === step;

              return (
                <div
                  key={label}
                  className="flex items-center gap-[var(--spacing-3)] rounded-[var(--border-radius-2xl)] border border-[color:var(--border)] bg-white px-[var(--spacing-4)] py-[var(--spacing-3)]"
                >
                  <div
                    className={[
                      "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                      isDone
                        ? "bg-[var(--Zigbang-Sub-Brand-Zikim)] text-white"
                        : isActive
                        ? "border-2 border-[var(--Zigbang-Sub-Brand-Zikim)] text-[var(--Zigbang-Sub-Brand-Zikim)]"
                        : "border border-gray-300 text-gray-400",
                    ].join(" ")}
                  >
                    {idx + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div
                      className={[
                        "text-sm",
                        isDone
                          ? "text-gray-900"
                          : isActive
                          ? "text-gray-900 font-medium"
                          : "text-gray-500",
                      ].join(" ")}
                    >
                      {label}
                    </div>
                    {isActive ? (
                      <div className="mt-0.5 text-xs text-gray-500">
                        처리 중이에요…
                      </div>
                    ) : null}
                  </div>

                  {isDone ? (
                    <div className="text-xs font-semibold text-[var(--Zigbang-Sub-Brand-Zikim)]">
                      완료
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-[var(--spacing-6)] text-center text-xs text-gray-500">
          분석이 완료되면 자동으로 리포트 화면으로 이동합니다.
        </div>
      </div>
    </div>
  );
}