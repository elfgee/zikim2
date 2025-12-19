export type ReportType = "safe" | "risky";

export type Context = {
  reportType: ReportType;
  /** 판정값: key(영문 점표기) -> boolean */
  flags: Record<string, boolean>;
  /** 표시값: key(영문 점표기) -> 값 */
  values: Record<string, string | number | null>;
};

export type Section = "summary" | "property" | "owner" | "price" | "clause";

/** 1) 값 표시용(주소/소유자/보증금 등) */
export type DisplayField = {
  kind: "display";
  /** 표준키(영문 점표기). 기본적으로 ctx.values의 key로도 사용 */
  key: string; // "owner.name"
  section: Section;
  title: string;
  description?: string;
  format?: "text" | "currency" | "multiline";
};

/** 2) 판정용(해당/미해당 체크 + 의견 문구) */
export type RuleCard = {
  kind: "rule";
  /** 표준키(영문 점표기). 카드 고유키 */
  key: string; // "registry.auction.started"
  section: Section;
  title: string;
  description: string; // 고정 설명(법률/정의)
  severity?: "info" | "warn" | "danger";
  when: (ctx: Context) => boolean;
  passText: string;  // 미해당(OK) 또는 안전 문구
  failText: string;  // 해당(위험) 문구
  order?: number;
};

/** 3) 요약/탭 상단 메시지 */
export type Message = {
  kind: "message";
  key: string;
  section: Section;
  severity: "info" | "warn" | "danger";
  title: string;
  body: string;
  when?: (ctx: Context) => boolean;
  order?: number;
};

export type ContentItem = DisplayField | RuleCard | Message;
