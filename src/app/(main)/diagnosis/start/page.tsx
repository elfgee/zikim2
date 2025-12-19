import { Suspense } from "react";
import DiagnosisStartClient from "./StartClient";

export default function DiagnosisStartPage() {
  return (
    <Suspense fallback={null}>
      <DiagnosisStartClient />
    </Suspense>
  );
}