import { VOUCHER_TEMPLATES } from "@/data/rewards";
import { DifficultyLevel, SubjectId, VoucherTemplate } from "@/types/mnemo";

const QUIZ_REWARD_MAP: Record<
  SubjectId,
  Record<DifficultyLevel, string>
> = {
  sejarah: {
    beginner: "beg-mixue-5",
    intermediate: "int-tealive-10",
    advanced: "adv-grabfood-20",
  },
  mathematics: {
    beginner: "beg-tng-5",
    intermediate: "int-zus-10",
    advanced: "adv-tng-20",
  },
};

const MILESTONE_REWARD_MAP: Record<
  SubjectId,
  Record<DifficultyLevel, string>
> = {
  sejarah: {
    beginner: "ms-int-popular-30",
    intermediate: "ms-adv-chagee-50",
    advanced: "ms-mas-shopee-100",
  },
  mathematics: {
    beginner: "ms-int-tng-30",
    intermediate: "ms-adv-tng-50",
    advanced: "ms-mas-tng-100",
  },
};

function findTemplate(templateId: string): VoucherTemplate {
  const found = VOUCHER_TEMPLATES.find((v) => v.templateId === templateId);
  return found ?? VOUCHER_TEMPLATES[0];
}

export function getQuizRewardTemplate(
  subjectId: SubjectId,
  level: DifficultyLevel
): VoucherTemplate {
  return findTemplate(QUIZ_REWARD_MAP[subjectId][level]);
}

export function getMilestoneRewardTemplate(
  subjectId: SubjectId,
  level: DifficultyLevel
): VoucherTemplate {
  return findTemplate(MILESTONE_REWARD_MAP[subjectId][level]);
}

export function rewardLabel(template: VoucherTemplate): string {
  return `RM${template.valueRm} ${template.brand} voucher`;
}
