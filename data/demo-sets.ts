import { Question, SubjectId } from "@/types/mnemo";

export const DEMO_SETS: Record<SubjectId, Question[]> = {
  sejarah: [
    {
      id: "demo-sejarah-1",
      subjectId: "sejarah",
      topicId: "demo",
      level: "beginner",
      prompt: "Bilakah Persekutuan Tanah Melayu mencapai kemerdekaan?",
      options: [
        "16 September 1963",
        "31 Ogos 1957",
        "1 Februari 1948",
        "13 Mei 1969",
      ],
      correctIndex: 1,
      explanation:
        "Persekutuan Tanah Melayu mencapai kemerdekaan secara rasmi pada 31 Ogos 1957.",
    },
    {
      id: "demo-sejarah-2",
      subjectId: "sejarah",
      topicId: "demo",
      level: "beginner",
      prompt:
        "Suruhanjaya manakah yang menggubal Perlembagaan Persekutuan Tanah Melayu 1957?",
      options: [
        "Suruhanjaya Reid",
        "Suruhanjaya Cobbold",
        "Suruhanjaya Barnes",
        "Suruhanjaya Fenn-Wu",
      ],
      correctIndex: 0,
      explanation:
        "Suruhanjaya Reid merangka Perlembagaan Persekutuan Tanah Melayu 1957.",
    },
    {
      id: "demo-sejarah-3",
      subjectId: "sejarah",
      topicId: "demo",
      level: "beginner",
      prompt: "Apakah badan yang mengetuai kuasa Eksekutif di Malaysia?",
      options: [
        "Mahkamah Persekutuan",
        "Dewan Negara",
        "Majlis Raja-Raja",
        "Perdana Menteri dan Jemaah Menteri",
      ],
      correctIndex: 3,
      explanation:
        "Kuasa Eksekutif diketuai oleh Perdana Menteri bersama Jemaah Menteri (Kabinet).",
    },
    {
      id: "demo-sejarah-4",
      subjectId: "sejarah",
      topicId: "demo",
      level: "beginner",
      prompt: "Bilakah Persekutuan Malaysia dibentuk secara rasmi?",
      options: [
        "31 Ogos 1957",
        "9 Ogos 1965",
        "16 September 1963",
        "1 Julai 1946",
      ],
      correctIndex: 2,
      explanation:
        "Malaysia dibentuk pada 16 September 1963 dengan penyertaan Tanah Melayu, Sabah, Sarawak, dan Singapura.",
    },
    {
      id: "demo-sejarah-5",
      subjectId: "sejarah",
      topicId: "demo",
      level: "beginner",
      prompt: "Apakah ideologi kebangsaan yang mempunyai lima prinsip utama?",
      options: [
        "Rukun Negara",
        "Wawasan 2020",
        "Dasar Ekonomi Baru",
        "Piagam Madinah",
      ],
      correctIndex: 0,
      explanation:
        "Rukun Negara mempunyai lima prinsip untuk memupuk perpaduan rakyat Malaysia.",
    },
  ],

  mathematics: [
    {
      id: "demo-mathematics-1",
      subjectId: "mathematics",
      topicId: "demo",
      level: "beginner",
      prompt: "If y = 4x and x = 5, what is the value of y?",
      options: ["9", "20", "16", "25"],
      correctIndex: 1,
      explanation: "Substitute x = 5 into y = 4x: y = 4 × 5 = 20.",
    },
    {
      id: "demo-mathematics-2",
      subjectId: "mathematics",
      topicId: "demo",
      level: "beginner",
      prompt: "Which equation shows that y varies directly as x?",
      options: ["y = kx", "y = k / x", "xy = k", "y = k + x"],
      correctIndex: 0,
      explanation: "Direct variation is written as y = kx.",
    },
    {
      id: "demo-mathematics-3",
      subjectId: "mathematics",
      topicId: "demo",
      level: "beginner",
      prompt: "What is [[1, 2], [3, 4]] + [[2, 1], [0, 5]]?",
      options: [
        "[[3, 3], [3, 1]]",
        "[[2, 2], [0, 20]]",
        "[[3, 2], [3, 9]]",
        "[[3, 3], [3, 9]]",
      ],
      correctIndex: 3,
      explanation: "Add each matching position: [1+2, 2+1] = [3, 3] and [3+0, 4+5] = [3, 9].",
    },
    {
      id: "demo-mathematics-4",
      subjectId: "mathematics",
      topicId: "demo",
      level: "beginner",
      prompt:
        "If annual income is RM50,000 and tax reliefs are RM12,000, what is the chargeable income?",
      options: ["RM62,000", "RM48,000", "RM38,000", "RM12,000"],
      correctIndex: 2,
      explanation: "RM50,000 - RM12,000 = RM38,000.",
    },
    {
      id: "demo-mathematics-5",
      subjectId: "mathematics",
      topicId: "demo",
      level: "beginner",
      prompt: "Find the determinant of [[3, 2], [1, 4]].",
      options: ["10", "14", "12", "6"],
      correctIndex: 0,
      explanation: "det = (3 × 4) - (2 × 1) = 12 - 2 = 10.",
    },
  ],
};
