import { AssessmentQuestion, SubjectId } from "@/types/mnemo";

export const ASSESSMENT_BANK: Record<SubjectId, AssessmentQuestion[]> = {
  sejarah: [
    {
      id: "asm-sej-1",
      subjectId: "sejarah",
      difficultyWeight: 1,
      prompt: "Apakah maksud kedaulatan dalam konteks sebuah negara merdeka?",
      options: [
        "Kekuasaan tertinggi dan kewibawaan sesebuah negara untuk mentadbir sendiri",
        "Hak sesebuah negeri untuk mengenakan cukai import sesuka hati",
        "Kuasa mutlak ketua kampung di peringkat mukim",
        "Perjanjian perdagangan bebas antara dua buah negara jiran",
      ],
      correctIndex: 0,
      explanation:
        "Kedaulatan bermaksud kekuasaan tertinggi dan kewibawaan sesebuah negara yang bebas daripada campur tangan kuasa asing.",
    },
    {
      id: "asm-sej-2",
      subjectId: "sejarah",
      difficultyWeight: 2,
      prompt:
        "Jenis kedaulatan manakah yang merujuk kepada prinsip persamaan, keadilan, dan hak asasi rakyat dalam undang-undang?",
      options: [
        "Kedaulatan tradisional",
        "Kedaulatan moden",
        "Kedaulatan undang-undang",
        "Kedaulatan antarabangsa",
      ],
      correctIndex: 2,
      explanation:
        "Kedaulatan undang-undang menekankan bahawa kerajaan dan rakyat terikat serta patuh kepada undang-undang negara.",
    },
    {
      id: "asm-sej-3",
      subjectId: "sejarah",
      difficultyWeight: 1,
      prompt:
        "Suruhanjaya manakah yang bertanggungjawab menggubal Perlembagaan Persekutuan Tanah Melayu 1957?",
      options: [
        "Suruhanjaya Cobbold",
        "Suruhanjaya Reid",
        "Suruhanjaya Barnes",
        "Suruhanjaya Fenn-Wu",
      ],
      correctIndex: 1,
      explanation:
        "Suruhanjaya Reid yang dipengerusikan oleh Lord Reid merangka Perlembagaan Persekutuan Tanah Melayu sebelum merdeka.",
    },
    {
      id: "asm-sej-4",
      subjectId: "sejarah",
      difficultyWeight: 3,
      prompt:
        "Mengapakah pindaan Perlembagaan Persekutuan tahun 1963 dan 1965 sangat penting dalam sejarah Malaysia?",
      options: [
        "Untuk memansuhkan sistem Raja Berperlembagaan",
        "Untuk menyelaraskan pembentukan Malaysia serta pemisahan Singapura",
        "Untuk menukarkan bahasa kebangsaan kepada bahasa Inggeris",
        "Untuk menggabungkan Dewan Rakyat dan Dewan Negara menjadi satu dewan",
      ],
      correctIndex: 1,
      explanation:
        "Pindaan 1963 memasukkan peruntukan bagi Sabah, Sarawak, dan Singapura (pembentukan Malaysia), manakala pindaan 1965 melibatkan pemisahan Singapura.",
    },
    {
      id: "asm-sej-5",
      subjectId: "sejarah",
      difficultyWeight: 2,
      prompt:
        "Dalam sistem Demokrasi Berparlimen di Malaysia, siapakah yang mengetuai Badan Eksekutif?",
      options: [
        "Ketua Hakim Negara",
        "Yang di-Pertua Dewan Rakyat",
        "Perdana Menteri bersama Jemaah Menteri",
        "Peguam Negara",
      ],
      correctIndex: 2,
      explanation:
        "Badan Eksekutif diketuai oleh Perdana Menteri dan dibantu oleh Jemaah Menteri (Kabinet).",
    },
    {
      id: "asm-sej-6",
      subjectId: "sejarah",
      difficultyWeight: 3,
      prompt:
        "Antara berikut, perkara manakah berada di bawah kuasa budi bicara Yang di-Pertuan Agong?",
      options: [
        "Meluluskan belanjawan tahunan negara tanpa Parlimen",
        "Melantik Perdana Menteri dan memperkenankan pembubaran Parlimen",
        "Menggubal semua undang-undang negeri secara langsung",
        "Menjatuhkan hukuman di Mahkamah Persekutuan",
      ],
      correctIndex: 1,
      explanation:
        "Perlembagaan memperuntukkan kuasa budi bicara Yang di-Pertuan Agong termasuk melantik Perdana Menteri dan memutuskan permintaan pembubaran Parlimen.",
    },
  ],

  mathematics: [
    {
      id: "asm-mat-1",
      subjectId: "mathematics",
      difficultyWeight: 1,
      prompt:
        "Given y varies directly as x, and y = 18 when x = 3. Find the value of y when x = 7.",
      options: ["35", "42", "49", "54"],
      correctIndex: 1,
      explanation:
        "y = kx -> 18 = 3k -> k = 6. When x = 7, y = 6(7) = 42.",
    },
    {
      id: "asm-mat-2",
      subjectId: "mathematics",
      difficultyWeight: 3,
      prompt:
        "P varies directly as the square of Q and inversely as R. If P = 12 when Q = 2 and R = 3, express P in terms of Q and R.",
      options: [
        "P = 9Q^2 / R",
        "P = 4Q^2 / R",
        "P = 18Q^2 / R",
        "P = 3Q^2 / R",
      ],
      correctIndex: 0,
      explanation:
        "P = kQ^2 / R -> 12 = k(4)/3 -> k = 9. Therefore P = 9Q^2 / R.",
    },
    {
      id: "asm-mat-3",
      subjectId: "mathematics",
      difficultyWeight: 1,
      prompt:
        "Given matrix A = [[2, -1], [4, 3]] and B = [[1, 5], [-2, 0]], calculate A + B.",
      options: [
        "[[3, 4], [2, 3]]",
        "[[1, 6], [6, 3]]",
        "[[3, 6], [2, 3]]",
        "[[2, -5], [-8, 0]]",
      ],
      correctIndex: 0,
      explanation:
        "Add corresponding elements: [2+1, -1+5] = [3, 4] and [4+(-2), 3+0] = [2, 3].",
    },
    {
      id: "asm-mat-4",
      subjectId: "mathematics",
      difficultyWeight: 3,
      prompt:
        "Find the determinant of matrix M = [[5, 3], [2, 4]] and state whether M has an inverse.",
      options: [
        "Determinant = 14; M has an inverse",
        "Determinant = 26; M has an inverse",
        "Determinant = 0; M has no inverse",
        "Determinant = -14; M has no inverse",
      ],
      correctIndex: 0,
      explanation:
        "det(M) = ad - bc = (5)(4) - (3)(2) = 20 - 6 = 14. Since det(M) ≠ 0, M has an inverse.",
    },
    {
      id: "asm-mat-5",
      subjectId: "mathematics",
      difficultyWeight: 2,
      prompt:
        "Hana has medical insurance with a deductible of RM500 and 80/20 co-insurance. If her eligible medical bill is RM4,500, how much does Hana pay in total?",
      options: ["RM800", "RM1,300", "RM1,400", "RM3,200"],
      correctIndex: 1,
      explanation:
        "After RM500 deductible, remaining bill = RM4,000. Hana's 20% co-insurance = RM800. Total paid = RM500 + RM800 = RM1,300.",
    },
    {
      id: "asm-mat-6",
      subjectId: "mathematics",
      difficultyWeight: 2,
      prompt:
        "Encik Farid's annual income is RM68,000 and total tax reliefs are RM16,500. What is his chargeable income?",
      options: ["RM51,500", "RM52,500", "RM84,500", "RM68,000"],
      correctIndex: 0,
      explanation:
        "Chargeable income = Total annual income - Tax reliefs = RM68,000 - RM16,500 = RM51,500.",
    },
  ],
};
