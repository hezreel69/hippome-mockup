import {
  QuizMode,
  SubjectId,
  Voucher,
  VoucherTemplate,
  VoucherTier,
} from "@/types/mnemo";

export const VOUCHER_TEMPLATES: VoucherTemplate[] = [
  // Beginner Quiz Rewards (RM5)
  {
    templateId: "beg-tng-5",
    tier: "beginner",
    brand: "TNG eWallet",
    title: "TNG eWallet RM5 Reload PIN",
    valueRm: 5,
    description: "RM5 credit top-up for Touch 'n Go eWallet.",
    codePrefix: "TNG5",
  },
  {
    templateId: "beg-mixue-5",
    tier: "beginner",
    brand: "Mixue",
    title: "Mixue RM5 Ice Cream & Tea Voucher",
    valueRm: 5,
    description: "RM5 off any Mixue drink or sundae.",
    codePrefix: "MIX5",
  },
  {
    templateId: "beg-7eleven-5",
    tier: "beginner",
    brand: "7-Eleven",
    title: "7-Eleven RM5 Snack E-Voucher",
    valueRm: 5,
    description: "RM5 off snacks or drinks at 7-Eleven.",
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
    description: "RM10 off any handcrafted ZUS Coffee drink.",
    codePrefix: "ZUS10",
  },
  {
    templateId: "int-chagee-10",
    tier: "intermediate",
    brand: "CHAGEE",
    title: "CHAGEE RM10 Fresh Milk Tea Voucher",
    valueRm: 10,
    description: "RM10 off CHAGEE signature tea drinks.",
    codePrefix: "CHG10",
  },
  {
    templateId: "int-7eleven-10",
    tier: "intermediate",
    brand: "7-Eleven",
    title: "7-Eleven RM10 E-Voucher",
    valueRm: 10,
    description: "RM10 in-store credit across 7-Eleven.",
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
    description: "RM20 Touch 'n Go eWallet credit.",
    codePrefix: "TNG20",
  },
  {
    templateId: "adv-zus-20",
    tier: "advanced",
    brand: "ZUS Coffee",
    title: "ZUS Coffee RM20 Study Fuel Voucher",
    valueRm: 20,
    description: "RM20 off ZUS Coffee drinks and pastries.",
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
    description: "RM30 bonus voucher for reaching Intermediate!",
    codePrefix: "LVL30",
  },
  {
    templateId: "ms-int-popular-30",
    tier: "milestone-intermediate",
    brand: "Popular",
    title: "Level-Up Bonus: Popular RM30 Book Voucher",
    valueRm: 30,
    description: "RM30 Popular Bookstore voucher for reaching Intermediate!",
    codePrefix: "POP30",
  },

  // Milestone: Intermediate -> Advanced (RM50)
  {
    templateId: "ms-adv-tng-50",
    tier: "milestone-advanced",
    brand: "TNG eWallet",
    title: "Level-Up Bonus: TNG eWallet RM50 PIN",
    valueRm: 50,
    description: "RM50 bonus voucher for reaching Advanced!",
    codePrefix: "ADV50",
  },
  {
    templateId: "ms-adv-chagee-50",
    tier: "milestone-advanced",
    brand: "CHAGEE",
    title: "Level-Up Bonus: CHAGEE RM50 Voucher",
    valueRm: 50,
    description: "RM50 CHAGEE voucher for reaching Advanced!",
    codePrefix: "CHG50",
  },

  // Milestone: Advanced Mastery (RM100)
  {
    templateId: "ms-mas-tng-100",
    tier: "milestone-mastery",
    brand: "TNG eWallet",
    title: "Grand Mastery: TNG eWallet RM100 PIN",
    valueRm: 100,
    description: "RM100 TNG eWallet voucher for completing Advanced mastery!",
    codePrefix: "MNM100",
  },
  {
    templateId: "ms-mas-shopee-100",
    tier: "milestone-mastery",
    brand: "Shopee",
    title: "Grand Mastery: Shopee RM100 Voucher",
    valueRm: 100,
    description: "RM100 Shopee voucher for completing Advanced mastery!",
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

export function mintVoucherFromTemplate(
  template: VoucherTemplate,
  params: {
    subjectId: SubjectId;
    quizMode?: QuizMode;
  }
): Voucher {
  const isMilestone = template.tier.startsWith("milestone-");

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
    earnedFromQuizMode: params.quizMode,
    redeemedAt: null,
  };
}
