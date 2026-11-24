import {
  DifficultyLevel,
  SubjectId,
  Voucher,
  VoucherTemplate,
  VoucherTier,
} from "@/types/hippome";

export const VOUCHER_TEMPLATES: VoucherTemplate[] = [
  // Beginner Quiz Rewards (RM5)
  {
    templateId: "beg-tng-5",
    tier: "beginner",
    brand: "TNG eWallet",
    title: "TNG eWallet RM5 Reload PIN",
    valueRm: 5,
    description: "Instant RM5 credit top-up for Touch 'n Go eWallet.",
    codePrefix: "TNG5",
  },
  {
    templateId: "beg-mixue-5",
    tier: "beginner",
    brand: "Mixue",
    title: "Mixue RM5 Ice Cream & Tea Voucher",
    valueRm: 5,
    description: "Redeem RM5 off any Mixue drink or sundae.",
    codePrefix: "MIX5",
  },
  {
    templateId: "beg-7eleven-5",
    tier: "beginner",
    brand: "7-Eleven",
    title: "7-Eleven RM5 Snack E-Voucher",
    valueRm: 5,
    description: "Use at any 7-Eleven Malaysia outlet for snacks or drinks.",
    codePrefix: "7E05",
  },
  {
    templateId: "beg-familymart-5",
    tier: "beginner",
    brand: "FamilyMart",
    title: "FamilyMart RM5 Oden & Sofuto Pass",
    valueRm: 5,
    description: "RM5 off your favourite FamilyMart treats.",
    codePrefix: "FM05",
  },

  // Intermediate Quiz Rewards (RM10)
  {
    templateId: "int-zus-10",
    tier: "intermediate",
    brand: "ZUS Coffee",
    title: "ZUS Coffee RM10 Drink Voucher",
    valueRm: 10,
    description: "RM10 off any handcrafted ZUS Coffee beverage via app.",
    codePrefix: "ZUS10",
  },
  {
    templateId: "int-chagee-10",
    tier: "intermediate",
    brand: "CHAGEE",
    title: "CHAGEE RM10 Fresh Milk Tea Voucher",
    valueRm: 10,
    description: "Enjoy RM10 off CHAGEE signature tea drinks.",
    codePrefix: "CHG10",
  },
  {
    templateId: "int-7eleven-10",
    tier: "intermediate",
    brand: "7-Eleven",
    title: "7-Eleven RM10 E-Voucher",
    valueRm: 10,
    description: "RM10 in-store credit across 7-Eleven Malaysia.",
    codePrefix: "7E10",
  },
  {
    templateId: "int-tealive-10",
    tier: "intermediate",
    brand: "Tealive",
    title: "Tealive RM10 Boba Voucher",
    valueRm: 10,
    description: "RM10 off any Tealive drink order.",
    codePrefix: "TEA10",
  },

  // Advanced Quiz Rewards (RM20)
  {
    templateId: "adv-tng-20",
    tier: "advanced",
    brand: "TNG eWallet",
    title: "TNG eWallet RM20 Reload PIN",
    valueRm: 20,
    description: "RM20 Touch 'n Go eWallet credit for top SPM performers.",
    codePrefix: "TNG20",
  },
  {
    templateId: "adv-zus-20",
    tier: "advanced",
    brand: "ZUS Coffee",
    title: "ZUS Coffee RM20 Study Fuel Voucher",
    valueRm: 20,
    description: "Two study-session coffees or pastries on Hippome.",
    codePrefix: "ZUS20",
  },
  {
    templateId: "adv-chagee-20",
    tier: "advanced",
    brand: "CHAGEE",
    title: "CHAGEE RM20 Premium Voucher",
    valueRm: 20,
    description: "RM20 off CHAGEE drinks & merchandise.",
    codePrefix: "CHG20",
  },
  {
    templateId: "adv-grabfood-20",
    tier: "advanced",
    brand: "GrabFood",
    title: "GrabFood RM20 Meal Voucher",
    valueRm: 20,
    description: "RM20 off any GrabFood delivery order.",
    codePrefix: "GRB20",
  },

  // Milestone: Beginner -> Intermediate (RM30)
  {
    templateId: "ms-int-tng-30",
    tier: "milestone-intermediate",
    brand: "TNG eWallet",
    title: "Level-Up Bonus: TNG eWallet RM30 PIN",
    valueRm: 30,
    description: "Huge reward for leveling up to Intermediate!",
    codePrefix: "LVL30",
  },
  {
    templateId: "ms-int-popular-30",
    tier: "milestone-intermediate",
    brand: "Popular",
    title: "Level-Up Bonus: Popular RM30 Book Voucher",
    valueRm: 30,
    description: "RM30 at Popular Bookstore for SPM prep or stationery.",
    codePrefix: "POP30",
  },

  // Milestone: Intermediate -> Advanced (RM50)
  {
    templateId: "ms-adv-tng-50",
    tier: "milestone-advanced",
    brand: "TNG eWallet",
    title: "Level-Up Mega Bonus: TNG eWallet RM50 PIN",
    valueRm: 50,
    description: "Huge RM50 reward for reaching Advanced level!",
    codePrefix: "ADV50",
  },
  {
    templateId: "ms-adv-chagee-50",
    tier: "milestone-advanced",
    brand: "CHAGEE",
    title: "Level-Up Mega Bonus: CHAGEE RM50 Voucher",
    valueRm: 50,
    description: "Celebrate reaching Advanced with RM50 at CHAGEE!",
    codePrefix: "CHG50",
  },

  // Milestone: Advanced Mastery (RM100)
  {
    templateId: "ms-mas-tng-100",
    tier: "milestone-mastery",
    brand: "TNG eWallet",
    title: "SPM Grand Mastery: TNG eWallet RM100 PIN",
    valueRm: 100,
    description: "Maximum RM100 reward for conquering Advanced SPM quizzes!",
    codePrefix: "SPM100",
  },
  {
    templateId: "ms-mas-shopee-100",
    tier: "milestone-mastery",
    brand: "Shopee",
    title: "SPM Grand Mastery: Shopee RM100 Voucher",
    valueRm: 100,
    description: "RM100 Shopee Malaysia voucher for Advanced SPM masters.",
    codePrefix: "SHP100",
  },
];

function randomCodeSegment(length: number): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function getTemplatesForTier(tier: VoucherTier): VoucherTemplate[] {
  return VOUCHER_TEMPLATES.filter((v) => v.tier === tier);
}

export function mintVoucherForTier(params: {
  tier: VoucherTier;
  subjectId: SubjectId;
  topicId?: string;
  seedOffset?: number;
}): Voucher {
  const pool = getTemplatesForTier(params.tier);
  const index =
    typeof params.seedOffset === "number"
      ? Math.abs(params.seedOffset) % pool.length
      : Math.floor(Math.random() * pool.length);
  const template = pool[index];

  const isMilestone = params.tier.startsWith("milestone-");

  return {
    id: `vch_${Date.now()}_${randomCodeSegment(4)}`,
    templateId: template.templateId,
    tier: template.tier,
    brand: template.brand,
    title: template.title,
    valueRm: template.valueRm,
    description: template.description,
    code: `${template.codePrefix}-${randomCodeSegment(4)}-${randomCodeSegment(4)}`,
    isMilestone,
    earnedAt: new Date().toISOString(),
    earnedFromSubjectId: params.subjectId,
    earnedFromTopicId: params.topicId,
    redeemedAt: null,
  };
}

export function getRewardTierForLevel(level: DifficultyLevel): VoucherTier {
  return level;
}
