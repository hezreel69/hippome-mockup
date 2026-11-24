import { DifficultyLevel, Question } from "@/types/mnemo";
import { buildNumericQuestion, expandQuestions } from "./helpers";

function generateVariationQuestions(
  level: DifficultyLevel,
  variantSeed: number
): Question[] {
  const results: Question[] = [];

  if (level === "beginner") {
    const curated = expandQuestions("mathematics", "variation", "beginner", [
      [
        "c1",
        "Which equation represents 'y varies directly as x'?",
        ["y = kx", "y = k / x", "y = k + x", "xy = k"],
        0,
        "Direct variation means y = kx where k is a non-zero constant.",
      ],
      [
        "c2",
        "Which statement describes inverse variation between P and Q?",
        [
          "When Q increases, P decreases proportionally so PQ = k",
          "When Q increases, P increases at the same rate",
          "P minus Q is always constant",
          "P equals Q squared",
        ],
        0,
        "In inverse variation, P = k / Q, so PQ = k (constant).",
      ],
      [
        "c3",
        "If y varies directly as x and y = 20 when x = 4, what is the constant of variation k?",
        ["5", "16", "24", "80"],
        0,
        "k = y / x = 20 / 4 = 5.",
      ],
      [
        "c4",
        "Given y varies inversely as x. If x = 2 and y = 9, find the constant k.",
        ["18", "4.5", "11", "7"],
        0,
        "For inverse variation y = k / x, k = xy = 2 × 9 = 18.",
      ],
    ]);
    results.push(...curated);

    for (let i = 0; i < 8; i++) {
      const n = variantSeed * 8 + i;
      const k = 2 + (n % 6);
      const x1 = 2 + ((n + 1) % 4);
      const y1 = k * x1;
      const x2 = x1 + 3 + (n % 3);
      const y2 = k * x2;

      results.push(
        buildNumericQuestion({
          id: `mathematics-variation-beginner-dyn-${n}`,
          subjectId: "mathematics",
          topicId: "variation",
          level: "beginner",
          prompt: `y varies directly as x. Given y = ${y1} when x = ${x1}, calculate y when x = ${x2}.`,
          correctLabel: `${y2}`,
          distractorLabels: [
            `${y2 + k}`,
            `${y2 - k}`,
            `${k + x2}`,
            `${x1 * x2}`,
          ],
          explanation: `y = kx → k = ${y1} / ${x1} = ${k}. When x = ${x2}, y = ${k} × ${x2} = ${y2}.`,
          hint: "Find k = y / x first.",
        })
      );
    }
    return results;
  }

  if (level === "intermediate") {
    const curated = expandQuestions("mathematics", "variation", "intermediate", [
      [
        "c1",
        "Given M varies directly as the square root of N. Which relation is correct?",
        ["M ∝ √N", "M ∝ 1 / √N", "M ∝ N^2", "M = √N + k"],
        0,
        "Direct variation with square root of N is written M ∝ √N.",
      ],
      [
        "c2",
        "If y varies inversely as x^2 and y = 4 when x = 3, express y in terms of x.",
        ["y = 36 / x^2", "y = 12 / x^2", "y = 4x^2 / 9", "y = 36x^2"],
        0,
        "k = yx^2 = 4 × 9 = 36, so y = 36 / x^2.",
      ],
    ]);
    results.push(...curated);

    for (let i = 0; i < 8; i++) {
      const n = variantSeed * 8 + i;
      const k = 2 + (n % 5);
      const x1 = 2 + (n % 3);
      const y1 = k * x1 * x1;
      const x2 = x1 + 2;
      const y2 = k * x2 * x2;

      results.push(
        buildNumericQuestion({
          id: `mathematics-variation-intermediate-dyn-${n}`,
          subjectId: "mathematics",
          topicId: "variation",
          level: "intermediate",
          prompt: `y varies directly as x^2. If y = ${y1} when x = ${x1}, find y when x = ${x2}.`,
          correctLabel: `${y2}`,
          distractorLabels: [
            `${k * x2}`,
            `${y2 + 2 * k}`,
            `${y1 * x2}`,
            `${y2 - k}`,
          ],
          explanation: `y = kx^2 → k = ${y1} / ${x1 * x1} = ${k}. Thus y = ${k}(${x2}^2) = ${y2}.`,
          hint: "Remember to square x before solving for k.",
        })
      );
    }
    return results;
  }

  // Advanced combined variation
  for (let i = 0; i < 10; i++) {
    const n = variantSeed * 10 + i;
    const k = 2 + (n % 4);
    const q = 2 + (n % 3);
    const r = 2 + ((n + 1) % 3);
    const p = (k * q * q) / r;

    const q2 = q + 1;
    const r2 = r;
    const p2 = (k * q2 * q2) / r2;

    if (Number.isInteger(p) && Number.isInteger(p2)) {
      results.push(
        buildNumericQuestion({
          id: `mathematics-variation-advanced-dyn-${n}`,
          subjectId: "mathematics",
          topicId: "variation",
          level: "advanced",
          prompt: `P varies directly as Q^2 and inversely as R. When Q = ${q} and R = ${r}, P = ${p}. Calculate P when Q = ${q2} and R = ${r2}.`,
          correctLabel: `${p2}`,
          distractorLabels: [
            `${Math.round((k * q2) / r2)}`,
            `${p2 + k * 2}`,
            `${p2 - k}`,
            `${p * 2}`,
          ],
          explanation: `P = kQ^2 / R → k = (${p} × ${r}) / ${q * q} = ${k}. When Q = ${q2}, R = ${r2}, P = ${k}(${q2}^2)/${r2} = ${p2}.`,
          hint: "Set up P = kQ^2 / R and solve for k first.",
        })
      );
    } else {
      const m = 4 + (n % 5);
      const workers = 3 + (n % 4);
      const hours = 6 + (n % 3);
      const totalWork = workers * hours;
      const newWorkers = workers * 2;
      const newHours = totalWork / newWorkers;
      results.push(
        buildNumericQuestion({
          id: `mathematics-variation-advanced-work-${n}`,
          subjectId: "mathematics",
          topicId: "variation",
          level: "advanced",
          prompt: `The time T (hours) to paint a school hall varies inversely as the number of workers W. ${workers} workers take ${hours} hours. If the number of workers is doubled to ${newWorkers} (and hall area increases by ${m - m + 1}x), how many hours are needed?`,
          correctLabel: `${newHours}`,
          distractorLabels: [
            `${hours * 2}`,
            `${newHours + 1.5}`,
            `${hours - 1}`,
            `${newHours + 3}`,
          ],
          explanation: `T = k / W → k = ${workers} × ${hours} = ${totalWork}. For ${newWorkers} workers, T = ${totalWork} / ${newWorkers} = ${newHours} hours.`,
        })
      );
    }
  }
  return results;
}

function generateMatrixQuestions(
  level: DifficultyLevel,
  variantSeed: number
): Question[] {
  const results: Question[] = [];

  if (level === "beginner") {
    results.push(
      ...expandQuestions("mathematics", "matrices", "beginner", [
        [
          "c1",
          "What is the order of matrix A = [[3, 1, 5], [0, -2, 4]]?",
          ["2 × 3", "3 × 2", "2 × 2", "1 × 6"],
          0,
          "Matrix A has 2 rows and 3 columns, so its order is 2 × 3.",
        ],
        [
          "c2",
          "Which matrix is the 2 × 2 identity matrix?",
          [
            "[[1, 0], [0, 1]]",
            "[[0, 1], [1, 0]]",
            "[[1, 1], [1, 1]]",
            "[[0, 0], [0, 0]]",
          ],
          0,
          "The identity matrix has 1s on the main diagonal and 0s elsewhere.",
        ],
      ])
    );

    for (let i = 0; i < 8; i++) {
      const n = variantSeed * 8 + i;
      const a = 1 + (n % 5);
      const b = 2 + ((n + 1) % 4);
      const c = 3 + (n % 3);
      const d = 1 + ((n + 2) % 6);
      const k = 2 + (n % 3);

      results.push(
        buildNumericQuestion({
          id: `mathematics-matrices-beginner-dyn-${n}`,
          subjectId: "mathematics",
          topicId: "matrices",
          level: "beginner",
          prompt: `Calculate ${k} × [[${a}, ${b}], [${c}, ${d}]].`,
          correctLabel: `[[${k * a}, ${k * b}], [${k * c}, ${k * d}]]`,
          distractorLabels: [
            `[[${k + a}, ${k + b}], [${k + c}, ${k + d}]]`,
            `[[${k * a}, ${b}], [${c}, ${k * d}]]`,
            `[[${k * d}, ${k * b}], [${k * c}, ${k * a}]]`,
          ],
          explanation: `Multiply every element inside the matrix by ${k}.`,
        })
      );
    }
    return results;
  }

  if (level === "intermediate") {
    for (let i = 0; i < 10; i++) {
      const n = variantSeed * 10 + i;
      const a = 2 + (n % 4);
      const b = 1 + (n % 3);
      const c = 3 + (n % 5);
      const d = 2 + ((n + 2) % 4);
      const det = a * d - b * c;

      results.push(
        buildNumericQuestion({
          id: `mathematics-matrices-intermediate-dyn-${n}`,
          subjectId: "mathematics",
          topicId: "matrices",
          level: "intermediate",
          prompt: `Find the determinant of matrix M = [[${a}, ${b}], [${c}, ${d}]].`,
          correctLabel: `${det}`,
          distractorLabels: [
            `${a * d + b * c}`,
            `${b * c - a * d}`,
            `${a * c - b * d}`,
          ],
          explanation: `det(M) = ad - bc = (${a})(${d}) - (${b})(${c}) = ${a * d} - ${b * c} = ${det}.`,
          hint: "For [[a, b], [c, d]], determinant = ad - bc.",
        })
      );
    }
    return results;
  }

  // Advanced: 2x2 matrix multiplication & inverse condition
  results.push(
    ...expandQuestions("mathematics", "matrices", "advanced", [
      [
        "c1",
        "Matrix P = [[k, 4], [3, 6]] has NO inverse. Find the value of k.",
        ["2", "8", "-2", "4.5"],
        0,
        "A matrix has no inverse when ad - bc = 0: 6k - 12 = 0 → k = 2.",
      ],
      [
        "c2",
        "Matrix Q = [[4, m], [2, 5]] is singular (non-invertible). Find m.",
        ["10", "2.5", "8", "20"],
        0,
        "Singular means determinant = 0: (4)(5) - 2m = 0 → 2m = 20 → m = 10.",
      ],
    ])
  );

  for (let i = 0; i < 8; i++) {
    const n = variantSeed * 8 + i;
    const a = 1 + (n % 3);
    const b = 2 + (n % 3);
    const c = 1 + ((n + 1) % 3);
    const d = 3 + (n % 2);
    const x = 2 + (n % 4);
    const y = 1 + ((n + 2) % 4);
    const r1 = a * x + b * y;
    const r2 = c * x + d * y;

    results.push(
      buildNumericQuestion({
        id: `mathematics-matrices-advanced-dyn-${n}`,
        subjectId: "mathematics",
        topicId: "matrices",
        level: "advanced",
        prompt: `Compute the product [[${a}, ${b}], [${c}, ${d}]] × [[${x}], [${y}]].`,
        correctLabel: `[[${r1}], [${r2}]]`,
        distractorLabels: [
          `[[${a * x + c * y}], [${b * x + d * y}]]`,
          `[[${a * x}, ${b * y}], [${c * x}, ${d * y}]]`,
          `[[${r1 + 2}], [${r2 - 1}]]`,
        ],
        explanation: `Row 1: (${a}×${x}) + (${b}×${y}) = ${r1}. Row 2: (${c}×${x}) + (${d}×${y}) = ${r2}.`,
      })
    );
  }
  return results;
}

function generateConsumerMathQuestions(
  level: DifficultyLevel,
  variantSeed: number
): Question[] {
  const results: Question[] = [];

  if (level === "beginner") {
    results.push(
      ...expandQuestions("mathematics", "consumer-math", "beginner", [
        [
          "c1",
          "What is a 'deductible' in an insurance policy?",
          [
            "A fixed amount the policyholder must pay first before the insurer pays the rest",
            "The annual bonus paid by the insurance company to the policyholder",
            "Government tax added to road tax",
            "Total value of the insured vehicle",
          ],
          0,
          "A deductible is the initial fixed amount borne by the policyholder per claim.",
        ],
        [
          "c2",
          "Which formula correctly calculates Chargeable Income in Malaysia?",
          [
            "Total Annual Income - Tax Exemptions - Tax Reliefs",
            "Total Annual Income + Tax Reliefs",
            "Gross Monthly Salary × 10",
            "Tax Rebates - PCB Paid",
          ],
          0,
          "Chargeable income = Total income minus tax exemptions and eligible tax reliefs.",
        ],
      ])
    );

    for (let i = 0; i < 8; i++) {
      const n = variantSeed * 8 + i;
      const annual = 45000 + n * 3000;
      const relief = 12000 + (n % 4) * 1500;
      const chargeable = annual - relief;

      results.push(
        buildNumericQuestion({
          id: `mathematics-consumer-math-beginner-dyn-${n}`,
          subjectId: "mathematics",
          topicId: "consumer-math",
          level: "beginner",
          prompt: `Encik Adam earns RM${annual.toLocaleString()} annually and claims RM${relief.toLocaleString()} in tax reliefs. Calculate his chargeable income.`,
          correctLabel: `RM${chargeable.toLocaleString()}`,
          distractorLabels: [
            `RM${(annual + relief).toLocaleString()}`,
            `RM${(chargeable - 2000).toLocaleString()}`,
            `RM${(annual - 9000).toLocaleString()}`,
          ],
          explanation: `Chargeable income = RM${annual.toLocaleString()} - RM${relief.toLocaleString()} = RM${chargeable.toLocaleString()}.`,
        })
      );
    }
    return results;
  }

  if (level === "intermediate") {
    for (let i = 0; i < 10; i++) {
      const n = variantSeed * 10 + i;
      const deductible = 400 + (n % 4) * 100;
      const bill = 2400 + (n % 5) * 1000;
      const remaining = bill - deductible;
      const insurerShare = Math.round(remaining * 0.8);
      const userShare = deductible + (remaining - insurerShare);

      results.push(
        buildNumericQuestion({
          id: `mathematics-consumer-math-intermediate-dyn-${n}`,
          subjectId: "mathematics",
          topicId: "consumer-math",
          level: "intermediate",
          prompt: `A medical policy has an 80/20 co-insurance clause and a RM${deductible} deductible. For an eligible bill of RM${bill.toLocaleString()}, how much does the policyholder pay?`,
          correctLabel: `RM${userShare.toLocaleString()}`,
          distractorLabels: [
            `RM${insurerShare.toLocaleString()}`,
            `RM${(remaining - insurerShare).toLocaleString()}`,
            `RM${Math.round(bill * 0.2).toLocaleString()}`,
          ],
          explanation: `After RM${deductible} deductible, balance = RM${remaining}. Policyholder pays 20% of RM${remaining} = RM${remaining - insurerShare}, plus RM${deductible} = RM${userShare}.`,
          hint: "Deduct the deductible first, then apply 20% to the remaining amount.",
        })
      );
    }
    return results;
  }

  // Advanced: Co-insurance property under-insurance + tax rebate
  results.push(
    ...expandQuestions("mathematics", "consumer-math", "advanced", [
      [
        "c1",
        "When is a Malaysian resident taxpayer eligible for the RM400 individual tax rebate?",
        [
          "When their chargeable income does not exceed RM35,000",
          "When their annual income exceeds RM100,000",
          "Only when they own two residential properties",
          "When they pay zero zakat",
        ],
        0,
        "Under Malaysian income tax rules, an RM400 rebate applies if chargeable income is RM35,000 or less.",
      ],
      [
        "c2",
        "If Puan Maya's calculated income tax is RM1,150 and she paid RM900 in Zakat and RM600 in PCB, what is her tax position?",
        [
          "Tax refund of RM350 from LHDN",
          "Additional tax payable of RM350",
          "Additional tax payable of RM250",
          "Zero balance, zero refund",
        ],
        0,
        "Income tax after Zakat rebate = 1150 - 900 = RM250. Since PCB paid is RM600, she gets a refund of 600 - 250 = RM350.",
      ],
    ])
  );

  for (let i = 0; i < 8; i++) {
    const n = variantSeed * 8 + i;
    const houseVal = 200000 + (n % 3) * 100000;
    const reqRatio = 0.8;
    const requiredInsured = houseVal * reqRatio;
    const actualInsured = requiredInsured * 0.75; // 3/4 of required
    const loss = 40000 + (n % 4) * 10000;
    const deductible = 2000;
    const payout = Math.round((actualInsured / requiredInsured) * loss - deductible);

    results.push(
      buildNumericQuestion({
        id: `mathematics-consumer-math-advanced-dyn-${n}`,
        subjectId: "mathematics",
        topicId: "consumer-math",
        level: "advanced",
        prompt: `A house worth RM${houseVal.toLocaleString()} has an 80% co-insurance clause (required insured value RM${requiredInsured.toLocaleString()}) and a RM${deductible.toLocaleString()} deductible. The owner insured it for RM${actualInsured.toLocaleString()}. If fire damage is RM${loss.toLocaleString()}, calculate the compensation paid by the insurer.`,
        correctLabel: `RM${payout.toLocaleString()}`,
        distractorLabels: [
          `RM${(loss - deductible).toLocaleString()}`,
          `RM${(payout + deductible).toLocaleString()}`,
          `RM${Math.round(loss * 0.8 - deductible).toLocaleString()}`,
        ],
        explanation: `Compensation = (Insured / Required) × Loss - Deductible = (${actualInsured} / ${requiredInsured}) × ${loss} - ${deductible} = RM${payout.toLocaleString()}.`,
      })
    );
  }
  return results;
}

export function getMathematicsQuestions(
  topicId: string,
  level: DifficultyLevel,
  variantSeed: number
): Question[] {
  if (topicId === "variation") {
    return generateVariationQuestions(level, variantSeed);
  }
  if (topicId === "matrices") {
    return generateMatrixQuestions(level, variantSeed);
  }
  return generateConsumerMathQuestions(level, variantSeed);
}
