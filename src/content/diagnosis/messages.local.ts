import type { DisplayField, Message, RuleCard, Section } from "./schema";

function inferSectionFromKey(key: string): Section {
  if (key.startsWith("building.") || key.startsWith("property.")) return "property";
  if (key.startsWith("owner.")) return "owner";
  // 갑구/을구/표제부 등 권리관계는 property로 묶기
  if (key.startsWith("registry.")) return "property";
  if (
    key.startsWith("price.") ||
    key.startsWith("contract.") ||
    key.startsWith("tenant.") ||
    key.startsWith("debt.") ||
    key.startsWith("estimated.") ||
    key.startsWith("deposit.") ||
    key.startsWith("margin.")
  ) {
    return "price";
  }
  if (key.startsWith("history.")) {
    // 근거: `history.tenant.registration.order`는 “현재 임대인이 소유하고 있던 기간”의 이력 확인으로,
    // 매물 자체의 상태라기보다 임대인(소유자) 관점의 리스크 히스토리로 owner 섹션에 두는 것이 자연스러움.
    if (key === "history.tenant.registration.order") return "owner";
    return "property";
  }
  return "property";
}

export const MESSAGES: Message[] = [
  {
    kind: "message",
    key: "summary.risky",
    section: "summary",
    severity: "danger",
    title: "확인이 필요한 위험 요소가 있어요",
    body: "계약 전 반드시 확인해야 할 항목들이 발견되었습니다.",
    when: (ctx) => ctx.reportType === "risky",
    order: 10,
  },
  {
    kind: "message",
    key: "summary.safe",
    section: "summary",
    severity: "info",
    title: "모든 주요 점검 항목이 양호해요",
    body: "계약 진행에 큰 위험 요소는 보이지 않습니다.",
    when: (ctx) => ctx.reportType === "safe",
    order: 10,
  },

  // 예: 경매개시결정
  {
    kind: "message",
    key: "registry.auction.started",
    section: "property",
    severity: "danger",
    title: "경매 절차가 진행 중이에요",
    body: "등기부상 경매개시결정이 확인됩니다. 계약 전 반드시 확인하세요.",
    when: (ctx) => ctx.flags["registry.auction.started"] === true,
    order: 20,
  },

  // 특약은 safe/risky 상관없이 항상 노출 가능
  {
    kind: "message",
    key: "clause.recommend.basic",
    section: "clause",
    severity: "info",
    title: "권장 특약",
    body: "임대인은 계약일 현재 권리변동이 없음을 보증하며, 변동 발생 시 즉시 고지한다…",
    when: () => true,
    order: 10,
  },
];

const DISPLAY_FIELDS_RAW: DisplayField[] = [
  {
    kind: "display",
    key: "property.address",
    section: "property",
    title: "소재지",
    description:
      "(쪼개기) - !기타 진단의견에도 쪼개기 관련 기재 있음!\n· 이 집은 등기부등본상 한 세대(호실)를 여러 세대(호실)로 나눈 집이에요. 예를 들면 등기부상 201호(1개 호실)을 쪼개서 실제로는 201호 및 202호(2개 호실)로 나눈 경우로, 문패상 202호를 임차하더라도 등기부 기준으로는 201호의 일부를 임차한 셈이 돼요.\n· 이 경우 문패가 아닌 등기부 기준으로 계약 및 전입신고를 해야 주택임대차보호법에 따른 보호를 받을 수 있어요.\n· 자세한 내용은 리포트 하단의 [기타 진단의견]을 참고하세요.",
    format: "multiline",
  },
  {
    kind: "display",
    key: "property.housing.type",
    section: "property",
    title: "주택유형",
    description:
      "· 이 집은 집합건물에 해당해요.\n· 집합건물은 건물 내 각 세대(호실)를 여러 사람이 각자 독립적으로 소유하는 건물을 말해요.",
    format: "text",
  },
  {
    kind: "display",
    key: "building.subtype",
    section: "property",
    title: "세부유형",
    description:
      "**(##)으로 기재되어 있다면, ** 입력 원칙\n(ex) 숙박시설(생활숙박시설) -> 숙박시설\n\n세부유형 확인 불가시 [세부유형 확인 불가] 기재",
    format: "text",
  },
  {
    kind: "display",
    key: "contract.term",
    section: "property",
    title: "계약기간",
    format: "text",
  },
  {
    kind: "display",
    key: "owner.name",
    section: "owner",
    title: "소유자",
    format: "text",
  },
  {
    kind: "display",
    key: "owner.ownership.type",
    section: "owner",
    title: "소유형태",
    format: "text",
  },
  {
    kind: "display",
    key: "debt.amount",
    section: "price",
    title: "채무금액",
    description:
      "근저당권 기존 채무금액 (압류/가압류 포함)\n\n공동담보의 경우, 공동담보 목록으로 나누어 약 **원으로 기재",
    format: "currency",
  },
  {
    kind: "display",
    key: "estimated.amount",
    section: "price",
    title: "시세 추정액",
    description: "십만원 단위 절사 후, * 0.9",
    format: "currency",
  },
  {
    kind: "display",
    key: "debt.existing.total",
    section: "price",
    title: "기존 채무금액",
    description: "근저당권 기존 채무금액 (압류/가압류 포함)",
    format: "currency",
  },
  {
    kind: "display",
    key: "deposit.expected",
    section: "price",
    title: "예상 보증금",
    format: "currency",
  },
  {
    kind: "display",
    key: "margin.amount",
    section: "price",
    title: "여유 금액",
    format: "currency",
  },
  {
    kind: "display",
    key: "tenant.super.priority",
    section: "price",
    title: "최우선변제권자",
    description:
      '경매개시결정, 임차권등기명령, 신탁 등기 되어 있는 경우 "해당하지 않아요"로 기재 / 금액에는 "-" 기재',
    format: "multiline",
  },
];

const RULE_CARDS_RAW: RuleCard[] = [
  {
    kind: "rule",
    key: "building.violation",
    section: "property",
    severity: "danger",
    title: "위반건축물",
    description:
      "위반건축물인 경우 전세자금대출 또는 보증보험 가입이 불가능하거나 곤란할 수 있으니 미리 확인이 필요해요.",
    when: (ctx) => ctx.flags["building.violation"] === true,
    passText: "해당하지 않아요",
    failText: "해당해요",
    order: 20,
  },
  {
    kind: "rule",
    key: "registry.auction.started",
    section: "property",
    severity: "danger",
    title: "경매개시결정",
    description:
      "등기부상 경매개시결정이 확인됩니다. 계약 전 반드시 확인하세요.",
    when: (ctx) => ctx.flags["registry.auction.started"] === true,
    passText: "없어요",
    failText: "있어요",
    order: 10,
  },
  {
    kind: "rule",
    key: "registry.mortgage.exists",
    section: "property",
    severity: "danger",
    title: "근저당권",
    description:
      "근저당권이 말소되지 않는 한, 임차인보다 경매절차에서 먼저 돈을 받아갈 수 있는 사람이 있다는 점을 기억해야 해요.",
    when: (ctx) => ctx.flags["registry.mortgage.exists"] === true,
    passText: "없어요",
    failText: "있어요",
    order: 30,
  },
  {
    kind: "rule",
    key: "registry.seizure.or.provisional.seizure.exists",
    section: "property",
    severity: "danger",
    title: "압류/가압류",
    description:
      "압류/가압류가 말소되지 않는 한, 보증금이 높은 전세계약은 주의가 필요해요.",
    when: (ctx) =>
      ctx.flags["registry.seizure.or.provisional.seizure.exists"] === true,
    passText: "없어요",
    failText: "있어요",
    order: 40,
  },
  {
    kind: "rule",
    key: "registry.disposition.ban.injunction.exists",
    section: "property",
    severity: "danger",
    title: "처분금지가처분",
    description:
      "처분금지가처분이 있는 경우 가처분 채권자에게 임대차 관련 권리를 주장(대항)할 수 없을 수 있어요.",
    when: (ctx) => ctx.flags["registry.disposition.ban.injunction.exists"] === true,
    passText: "없어요",
    failText: "있어요",
    order: 50,
  },
  {
    kind: "rule",
    key: "registry.provisional.registration.exists",
    section: "property",
    severity: "warn",
    title: "가등기",
    description:
      "가등기에 기한 본등기가 이뤄지면 임차인이 새로운 소유자에게 권리를 주장하기 어려울 수 있어요.",
    when: (ctx) => ctx.flags["registry.provisional.registration.exists"] === true,
    passText: "없어요",
    failText: "있어요",
    order: 60,
  },
  {
    kind: "rule",
    key: "registry.trust.exists",
    section: "owner",
    severity: "danger",
    title: "신탁",
    description: "거래상대방(임대인)이 위탁자/수탁자 중 누구인지 확인이 필요해요.",
    when: (ctx) => ctx.flags["registry.trust.exists"] === true,
    passText: "미해당",
    failText: "해당",
    order: 10,
  },
  {
    kind: "rule",
    key: "registry.joint.collateral.exists",
    section: "property",
    severity: "warn",
    title: "공동담보",
    description:
      "공동담보가 있는 경우 경매 진행 방식에 따라 보증금 반환 순위/금액에 영향을 줄 수 있어요.",
    when: (ctx) => ctx.flags["registry.joint.collateral.exists"] === true,
    passText: "없어요",
    failText: "있어요",
    order: 70,
  },
  {
    kind: "rule",
    key: "registry.jeonse.right.exists",
    section: "property",
    severity: "warn",
    title: "전세권",
    description:
      "전세권이 말소되지 않는 한, 임차인보다 먼저 돈을 받아갈 수 있는 권리자가 있을 수 있어요.",
    when: (ctx) => ctx.flags["registry.jeonse.right.exists"] === true,
    passText: "없어요",
    failText: "있어요",
    order: 80,
  },
  {
    kind: "rule",
    key: "registry.tenant.registration.order.exists",
    section: "property",
    severity: "warn",
    title: "임차권등기명령",
    description:
      "임차권등기명령이 있는 경우 법에서 정한 최우선변제권자가 될 수 없음을 주의하세요.",
    when: (ctx) =>
      ctx.flags["registry.tenant.registration.order.exists"] === true,
    passText: "없어요",
    failText: "있어요",
    order: 90,
  },
  {
    kind: "rule",
    key: "registry.land.separate.registration.exists",
    section: "property",
    severity: "warn",
    title: "토지별도등기",
    description:
      "토지별도등기(근저당권/구분지상권 등)가 있는 경우 말소 여부를 확인해야 해요.",
    when: (ctx) => ctx.flags["registry.land.separate.registration.exists"] === true,
    passText: "없어요",
    failText: "있어요",
    order: 100,
  },
  {
    kind: "rule",
    key: "owner.is.rental.business",
    section: "owner",
    severity: "info",
    title: "임대사업자 여부",
    description:
      "임대인이 주택임대사업자에 해당하는 경우, 임대료 증액 제한 등 관련 의무사항이 있어요.",
    when: (ctx) => ctx.flags["owner.is.rental.business"] === true,
    passText: "미해당",
    failText: "해당",
    order: 20,
  },
  {
    kind: "rule",
    key: "owner.landlord.mismatch",
    section: "owner",
    severity: "danger",
    title: "소유자-임대인 불일치",
    description: "계약 상대방(임대인)이 실제 소유자인지 확인해야 해요.",
    when: (ctx) => ctx.flags["owner.landlord.mismatch"] === true,
    passText: "일치",
    failText: "불일치",
    order: 30,
  },
  {
    kind: "rule",
    key: "history.tenant.registration.order",
    section: "owner",
    severity: "warn",
    title: "임차권등기명령 과거 이력",
    description: "현재 임대인이 소유하고 있던 기간에 임차권등기명령 이력이 있는지 확인",
    when: (ctx) => ctx.flags["history.tenant.registration.order"] === true,
    passText: "없어요",
    failText: "있어요",
    order: 40,
  },
];

export const DISPLAY_FIELDS: DisplayField[] = DISPLAY_FIELDS_RAW.map((f) => ({
  ...f,
  section: inferSectionFromKey(f.key),
}));

export const RULE_CARDS: RuleCard[] = RULE_CARDS_RAW.map((r) => ({
  ...r,
  section: inferSectionFromKey(r.key),
}));