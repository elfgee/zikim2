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
        return prev + Math.floor(Math.random() * 7) + 3; // 3~9씩 증가
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

  return (
    <div className="min-h-dvh bg-white px-5 pt-12">
      <h1 className="text-xl font-bold text-gray-900 text-center">
        지킴진단 리포트 생성 중
      </h1>
      <p className="mt-2 text-sm text-gray-600 text-center">
        잠시만 기다려 주세요. 평균 30초 이내로 완료돼요.
      </p>

      {/* 진행바 */}
      <div className="mt-10">
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-gray-900 transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="mt-2 text-right text-xs text-gray-500">
          {Math.min(progress, 100)}%
        </div>
      </div>

      {/* 단계 표시 */}
      <div className="mt-8 space-y-3">
        {steps.map((label, idx) => {
          const isDone = idx < step;
          const isActive = idx === step;

          return (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
            >
              <div
                className={[
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                  isDone
                    ? "bg-gray-900 text-white"
                    : isActive
                    ? "border-2 border-gray-900 text-gray-900"
                    : "border text-gray-400",
                ].join(" ")}
              >
                {idx + 1}
              </div>

              <div
                className={[
                  "text-sm",
                  isDone
                    ? "text-gray-900"
                    : isActive
                    ? "text-gray-900 font-medium"
                    : "text-gray-400",
                ].join(" ")}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>

      {/* 하단 안내 */}
      <div className="mt-10 text-center text-xs text-gray-400">
        분석이 완료되면 자동으로 리포트 화면으로 이동합니다.
      </div>
    </div>
  );
}