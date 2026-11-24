import { AssessmentQuestion, SubjectId } from "@/types/hippome";

export const ASSESSMENT_BANK: Record<SubjectId, AssessmentQuestion[]> = {
  sejarah: [
    {
      id: "asm-sej-1",
      subjectId: "sejarah",
      topicId: "kedaulatan-negara",
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
      topicId: "kedaulatan-negara",
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
      topicId: "perlembagaan-persekutuan",
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
      topicId: "perlembagaan-persekutuan",
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
      topicId: "raja-berperlembagaan",
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
      topicId: "raja-berperlembagaan",
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

  "bahasa-melayu": [
    {
      id: "asm-bm-1",
      subjectId: "bahasa-melayu",
      topicId: "sistem-dan-aplikasi-bahasa",
      difficultyWeight: 1,
      prompt:
        "Pilih ayat yang menggunakan imbuhan apitan dengan betul mengikut tatabahasa Dewan.",
      options: [
        "Kerajaan memperlebarkan jalan raya di kampung itu.",
        "Kerajaan memperlebar jalan raya di kampung itu.",
        "Kerajaan memperlebari jalan raya di kampung itu.",
        "Kerajaan melebarkan-lebarkan jalan raya di kampung itu.",
      ],
      correctIndex: 1,
      explanation:
        "Kata adjektif 'lebar' menerima awalan 'memper-' menjadi 'memperlebar' (tidak perlu akhiran '-kan').",
    },
    {
      id: "asm-bm-2",
      subjectId: "bahasa-melayu",
      topicId: "sistem-dan-aplikasi-bahasa",
      difficultyWeight: 3,
      prompt:
        "Manakah antara berikut merupakan ayat pasif diri pertama yang betul?",
      options: [
        "Buku rujukan SPM itu dibaca oleh saya semalam.",
        "Buku rujukan SPM itu saya baca semalam.",
        "Saya terbaca buku rujukan SPM itu semalam.",
        "Buku rujukan SPM itu telah dibacakan oleh aku.",
      ],
      correctIndex: 1,
      explanation:
        "Bagi kata ganti nama diri pertama ('saya', 'aku'), binaan ayat pasif yang betul ialah objek + kata ganti nama diri + kata kerja pasif tanpa 'di-' dan 'oleh'.",
    },
    {
      id: "asm-bm-3",
      subjectId: "bahasa-melayu",
      topicId: "pemahaman-petikan",
      difficultyWeight: 1,
      prompt:
        "Peribahasa manakah yang paling sesuai untuk menggambarkan kepentingan berjimat cermat sebelum kesusahan berlaku?",
      options: [
        "Bagai aur dengan tebing",
        "Sediakan payung sebelum hujan",
        "Seperti katak di bawah tempurung",
        "Melentur buluh biarlah dari rebungnya",
      ],
      correctIndex: 1,
      explanation:
        "'Sediakan payung sebelum hujan' bermaksud membuat persediaan awal sebelum menghadapi kesusahan.",
    },
    {
      id: "asm-bm-4",
      subjectId: "bahasa-melayu",
      topicId: "pemahaman-petikan",
      difficultyWeight: 2,
      prompt:
        "Dalam soalan pemahaman Kertas 2 SPM, apakah maksud teknik menjawab secara 'ayat gramatis dan menggunakan kata sendiri'?",
      options: [
        "Menyalin seluruh perenggan daripada petikan asal",
        "Menulis isi jawapan menggunakan ayat lengkap tanpa menyalin bulat-bulat kata kunci yang boleh diubah",
        "Menulis dalam bentuk nota ringkas atau poin sahaja",
        "Menggunakan bahasa pasar supaya lebih mudah difahami",
      ],
      correctIndex: 1,
      explanation:
        "Jawapan pemahaman SPM perlu ditulis dalam ayat yang lengkap dan gramatis dengan pengolahan bahasa sendiri yang tepat.",
    },
    {
      id: "asm-bm-5",
      subjectId: "bahasa-melayu",
      topicId: "penulisan-dan-rumusan",
      difficultyWeight: 2,
      prompt:
        "Berapakah had maksimum patah perkataan bagi soalan Rumusan Bahasa Melayu SPM KSSM?",
      options: [
        "80 patah perkataan",
        "100 patah perkataan",
        "120 patah perkataan",
        "150 patah perkataan",
      ],
      correctIndex: 2,
      explanation:
        "Rumusan SPM hendaklah ditulis tidak melebihi 120 patah perkataan.",
    },
    {
      id: "asm-bm-6",
      subjectId: "bahasa-melayu",
      topicId: "penulisan-dan-rumusan",
      difficultyWeight: 3,
      prompt:
        "Dalam format baharu Rumusan SPM KSSM, di manakah calon perlu mengenal pasti fokus rumusan?",
      options: [
        "Daripada arahan soalan yang menyebut fokus secara terus",
        "Daripada bahan-bahan yang diberikan oleh calon sendiri melalui analisis isi",
        "Daripada tajuk karangan bahagian A sahaja",
        "Daripada perenggan penutup petikan pertama sahaja",
      ],
      correctIndex: 1,
      explanation:
        "Dalam format KSSM, arahan soalan tidak menyatakan fokus secara langsung; calon mesti mengenal pasti fokus daripada bahan-bahan yang disediakan.",
    },
  ],

  english: [
    {
      id: "asm-eng-1",
      subjectId: "english",
      topicId: "grammar-and-vocabulary",
      difficultyWeight: 1,
      prompt:
        "Choose the correct option: Neither Farah nor her classmates ____ ready for the surprise science quiz yet.",
      options: ["is", "are", "was", "has been"],
      correctIndex: 1,
      explanation:
        "With 'neither...nor', the verb agrees with the closer subject ('her classmates', plural), so 'are' is correct.",
    },
    {
      id: "asm-eng-2",
      subjectId: "english",
      topicId: "grammar-and-vocabulary",
      difficultyWeight: 2,
      prompt:
        "Choose the sentence using the third conditional correctly:",
      options: [
        "If I had revised Variation earlier, I would have scored full marks.",
        "If I revised Variation earlier, I would have scored full marks.",
        "If I had revised Variation earlier, I will score full marks.",
        "If I have revised Variation earlier, I would score full marks.",
      ],
      correctIndex: 0,
      explanation:
        "The third conditional uses 'If + past perfect, ... would have + past participle' to describe unreal past situations.",
    },
    {
      id: "asm-eng-3",
      subjectId: "english",
      topicId: "reading-comprehension",
      difficultyWeight: 1,
      prompt:
        "Read the notice: 'Students must return borrowed library tablets before 4:30 p.m. Late returns will suspend borrowing privileges for 3 days.' What does this mean?",
      options: [
        "Students must pay a cash fine after 4:30 p.m.",
        "Returning a tablet late stops you from borrowing for three days.",
        "Tablets can be kept overnight on weekends.",
        "Only Form 5 students may borrow library tablets.",
      ],
      correctIndex: 1,
      explanation:
        "'Suspend borrowing privileges for 3 days' means the student cannot borrow items for three days.",
    },
    {
      id: "asm-eng-4",
      subjectId: "english",
      topicId: "reading-comprehension",
      difficultyWeight: 3,
      prompt:
        "A review states: 'While the study app's graphics feel dated, its adaptive explanations turn tricky SPM concepts into bite-sized wins.' What is the writer's overall attitude?",
      options: [
        "Completely dismissive because of the design",
        "Appreciative of its teaching value despite minor visual flaws",
        "Confused about how the app actually works",
        "Angry that the app is too expensive for students",
      ],
      correctIndex: 1,
      explanation:
        "'While...' concedes a minor flaw (dated graphics) before praising the app's main strength (effective adaptive explanations).",
    },
    {
      id: "asm-eng-5",
      subjectId: "english",
      topicId: "writing-skills",
      difficultyWeight: 2,
      prompt:
        "Which opening line is most appropriate for a semi-formal article in SPM Paper 2 Part 2?",
      options: [
        "Yo guys!! Wanna know how to ace SPM??",
        "Have you ever wondered why some Form 5 students stay calm even during trial exams?",
        "Dear Sir/Madam, I am writing to lodge a formal complaint.",
        "In this essay I am going to list down three points only.",
      ],
      correctIndex: 1,
      explanation:
        "An engaging rhetorical question fits the lively, semi-formal register expected in an SPM article.",
    },
    {
      id: "asm-eng-6",
      subjectId: "english",
      topicId: "writing-skills",
      difficultyWeight: 3,
      prompt:
        "Which cohesive device best introduces a contrasting viewpoint in an argumentative essay?",
      options: [
        "Furthermore,",
        "Consequently,",
        "Nevertheless,",
        "For instance,",
      ],
      correctIndex: 2,
      explanation:
        "'Nevertheless' signals contrast or concession against the previous point, whereas the others add, show result, or illustrate.",
    },
  ],

  mathematics: [
    {
      id: "asm-mat-1",
      subjectId: "mathematics",
      topicId: "variation",
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
      topicId: "variation",
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
      topicId: "matrices",
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
      topicId: "matrices",
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
      topicId: "consumer-math",
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
      topicId: "consumer-math",
      difficultyWeight: 2,
      prompt:
        "Encik Farid's annual income is RM68,000 and total tax reliefs are RM16,500. What is his chargeable income?",
      options: ["RM51,500", "RM52,500", "RM84,500", "RM68,000"],
      correctIndex: 0,
      explanation:
        "Chargeable income = Total annual income - Tax reliefs = RM68,000 - RM16,500 = RM51,500.",
    },
  ],

  science: [
    {
      id: "asm-sci-1",
      subjectId: "science",
      topicId: "microorganisms",
      difficultyWeight: 1,
      prompt:
        "Which microorganism reproduces by budding and is widely used in bread making?",
      options: ["Yeast (fungi)", "Amoeba (protozoa)", "Virus", "Spirogyra (algae)"],
      correctIndex: 0,
      explanation:
        "Yeast is a unicellular fungus that reproduces by budding and releases CO2 during fermentation, causing dough to rise.",
    },
    {
      id: "asm-sci-2",
      subjectId: "science",
      topicId: "microorganisms",
      difficultyWeight: 2,
      prompt:
        "Why is an autoclave set to 121 °C under high pressure when sterilising laboratory apparatus?",
      options: [
        "To encourage bacterial growth faster",
        "To destroy all microorganisms including heat-resistant bacterial spores",
        "To cool down nutrient agar before pouring",
        "To preserve live virus samples",
      ],
      correctIndex: 1,
      explanation:
        "Steam under pressure at 121 °C kills bacteria, fungi, viruses, and resistant endospores.",
    },
    {
      id: "asm-sci-3",
      subjectId: "science",
      topicId: "nutrition-food-tech",
      difficultyWeight: 2,
      prompt:
        "In the nitrogen cycle, which bacteria convert atmospheric nitrogen gas into nitrates in leguminous root nodules?",
      options: [
        "Denitrifying bacteria",
        "Nitrogen-fixing bacteria",
        "Putrefying bacteria",
        "Lactic acid bacteria",
      ],
      correctIndex: 1,
      explanation:
        "Nitrogen-fixing bacteria (such as Rhizobium in root nodules) convert atmospheric N2 into nitrogen compounds usable by plants.",
    },
    {
      id: "asm-sci-4",
      subjectId: "science",
      topicId: "nutrition-food-tech",
      difficultyWeight: 3,
      prompt:
        "A 100 g snack contains 12 g protein (17 kJ/g), 50 g carbohydrate (17 kJ/g), and 10 g fat (38 kJ/g). What is its total calorific value?",
      options: ["1,054 kJ", "1,434 kJ", "1,224 kJ", "1,620 kJ"],
      correctIndex: 1,
      explanation:
        "(12 × 17) + (50 × 17) + (10 × 38) = 204 + 850 + 380 = 1,434 kJ.",
    },
    {
      id: "asm-sci-5",
      subjectId: "science",
      topicId: "carbon-compounds",
      difficultyWeight: 1,
      prompt:
        "Which gas is produced alongside ethanol during the fermentation of glucose by yeast?",
      options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"],
      correctIndex: 2,
      explanation:
        "Yeast ferments glucose into ethanol and carbon dioxide gas (which turns limewater cloudy).",
    },
    {
      id: "asm-sci-6",
      subjectId: "science",
      topicId: "carbon-compounds",
      difficultyWeight: 3,
      prompt:
        "Which pair of substances reacts in the presence of concentrated sulphuric acid to form an ester?",
      options: [
        "Alkane and water",
        "Alcohol and carboxylic acid",
        "Alkene and oxygen",
        "Palm oil and sodium chloride",
      ],
      correctIndex: 1,
      explanation:
        "Esterification is the reaction between an alcohol and a carboxylic acid using concentrated H2SO4 as a catalyst.",
    },
  ],
};
