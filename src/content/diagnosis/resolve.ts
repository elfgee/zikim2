import type { Context, DisplayField, Message, RuleCard, Section } from "./schema";
import { DISPLAY_FIELDS, MESSAGES, RULE_CARDS } from "./messages.local";

type ResolvedDisplayField = DisplayField & {
  value: string | number | null | undefined;
  displayValue: string;
};

type ResolvedRuleCard = RuleCard & {
  failed: boolean;
  statusText: string;
};

const SECTIONS: Section[] = ["summary", "property", "owner", "price", "clause"];

function formatValue(field: DisplayField, value: ResolvedDisplayField["value"]): string {
  if (value === null || value === undefined || value === "") return "-";
  if (field.format === "currency" && typeof value === "number") {
    return `${value.toLocaleString("ko-KR")}원`;
  }
  return String(value);
}

function sortByOrder<T extends { order?: number }>(items: T[]): T[] {
  return items.slice().sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

/**
 * DisplayField: 섹션별로 필터 + ctx.values 기반 값 주입/포맷
 */
export function resolveDisplay(section: Section, ctx: Context): ResolvedDisplayField[] {
  const fields = DISPLAY_FIELDS.filter((f) => f.section === section);
  return fields.map((f) => {
    const value = ctx.values?.[f.key];
    return { ...f, value, displayValue: formatValue(f, value) };
  });
}

/**
 * RuleCard: 섹션별로 필터 + pass/fail 결과 텍스트 계산
 */
export function resolveRules(section: Section, ctx: Context): ResolvedRuleCard[] {
  const rules = RULE_CARDS.filter((r) => r.section === section);
  return sortByOrder(
    rules.map((r) => {
      const failed = r.when(ctx);
      return { ...r, failed, statusText: failed ? r.failText : r.passText };
    })
  );
}

/**
 * Message: 섹션별로 필터 + when 조건 평가 + order 정렬
 */
export function resolveMessages(section: Section, ctx: Context): Message[] {
  return sortByOrder(
    MESSAGES.filter((m) => m.section === section).filter((m) => (m.when ? m.when(ctx) : true))
  );
}

/**
 * (옵션) 섹션 전체 목록
 */
export const ALL_SECTIONS = SECTIONS;
