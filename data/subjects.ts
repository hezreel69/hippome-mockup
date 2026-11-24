import { Subject, SubjectId, Topic } from "@/types/hippome";

export const SPM_SUBJECTS: Subject[] = [
  {
    id: "sejarah",
    name: "Sejarah",
    spmCode: "1249",
    medium: "Bahasa Melayu",
    tagline: "KSSM Tingkatan 5: Pembinaan Negara & Perlembagaan",
    topics: [
      {
        id: "kedaulatan-negara",
        subjectId: "sejarah",
        name: "Kedaulatan Negara",
        syllabusTag: "Bab 1",
        description:
          "Konsep kedaulatan, ciri negara berdaulat, dan kepentingan mengekalkan kedaulatan.",
      },
      {
        id: "perlembagaan-persekutuan",
        subjectId: "sejarah",
        name: "Perlembagaan Persekutuan",
        syllabusTag: "Bab 2",
        description:
          "Sejarah penggubalan, ciri utama Perlembagaan Malaysia, dan pindaan perlembagaan.",
      },
      {
        id: "raja-berperlembagaan",
        subjectId: "sejarah",
        name: "Raja Berperlembagaan & Demokrasi Berparlimen",
        syllabusTag: "Bab 3",
        description:
          "Peranan Yang di-Pertuan Agong, badan perundangan, eksekutif, dan kehakiman.",
      },
    ],
  },
  {
    id: "bahasa-melayu",
    name: "Bahasa Melayu",
    spmCode: "1103",
    medium: "Bahasa Melayu",
    tagline: "KSSM Tingkatan 5: Tatabahasa, Pemahaman & Penulisan",
    topics: [
      {
        id: "sistem-dan-aplikasi-bahasa",
        subjectId: "bahasa-melayu",
        name: "Sistem & Aplikasi Bahasa",
        syllabusTag: "Kertas 2 · Bhg A",
        description:
          "Morfologi, sintaksis, penyuntingan kesalahan bahasa, dan peribahasa SPM.",
      },
      {
        id: "pemahaman-petikan",
        subjectId: "bahasa-melayu",
        name: "Pemahaman & Komsas",
        syllabusTag: "Kertas 2 · Bhg B",
        description:
          "Pemahaman petikan umum, sastera, nilai murni, dan kemahiran berfikir kritis.",
      },
      {
        id: "penulisan-dan-rumusan",
        subjectId: "bahasa-melayu",
        name: "Rumusan & Penulisan Karangan",
        syllabusTag: "Kertas 1 & 2",
        description:
          "Teknik mengenal pasti isi tersurat/tersirat rumusan serta wacana karangan SPM.",
      },
    ],
  },
  {
    id: "english",
    name: "English",
    spmCode: "1119",
    medium: "English",
    tagline: "SPM CEFR Form 5: Grammar, Reading & Writing",
    topics: [
      {
        id: "grammar-and-vocabulary",
        subjectId: "english",
        name: "Grammar & Vocabulary in Context",
        syllabusTag: "Paper 1 · Part 1-2",
        description:
          "Tenses, modals, passive voice, phrasal verbs, and contextual collocations.",
      },
      {
        id: "reading-comprehension",
        subjectId: "english",
        name: "Reading & Information Transfer",
        syllabusTag: "Paper 1 · Part 3-5",
        description:
          "Main ideas, writer attitude, inference, and matching text extracts.",
      },
      {
        id: "writing-skills",
        subjectId: "english",
        name: "Directed & Essay Writing Mechanics",
        syllabusTag: "Paper 2",
        description:
          "Register, cohesive devices, email/article tone, and structured arguments.",
      },
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    spmCode: "1449",
    medium: "English",
    tagline: "KSSM Form 5: Variation, Matrices & Consumer Math",
    topics: [
      {
        id: "variation",
        subjectId: "mathematics",
        name: "Variation",
        syllabusTag: "Chapter 1",
        description:
          "Direct, inverse, and combined variation equations and word problems.",
      },
      {
        id: "matrices",
        subjectId: "mathematics",
        name: "Matrices",
        syllabusTag: "Chapter 2",
        description:
          "Matrix addition, scalar multiplication, 2x2 multiplication, and inverse matrices.",
      },
      {
        id: "consumer-math",
        subjectId: "mathematics",
        name: "Consumer Mathematics: Insurance & Taxation",
        syllabusTag: "Chapter 3-4",
        description:
          "Deductibles, co-insurance, income tax reliefs, and PCB / road tax calculations.",
      },
    ],
  },
  {
    id: "science",
    name: "Science",
    spmCode: "1511",
    medium: "English",
    tagline: "KSSM Form 5: Microorganisms, Nutrition & Carbon Compounds",
    topics: [
      {
        id: "microorganisms",
        subjectId: "science",
        name: "Microorganisms",
        syllabusTag: "Chapter 1",
        description:
          "Classification of microbes, growth factors, useful microbes, and aseptic methods.",
      },
      {
        id: "nutrition-food-tech",
        subjectId: "science",
        name: "Nutrition & Food Technology",
        syllabusTag: "Chapter 2",
        description:
          "Calorific value of food, balanced diets, nitrogen cycle, and food processing.",
      },
      {
        id: "carbon-compounds",
        subjectId: "science",
        name: "Carbon Compounds",
        syllabusTag: "Chapter 5",
        description:
          "Hydrocarbons, alcohols, fermentation, esterification, and palm oil processing.",
      },
    ],
  },
];

export const SUBJECT_MAP: Record<SubjectId, Subject> = SPM_SUBJECTS.reduce(
  (acc, subject) => {
    acc[subject.id] = subject;
    return acc;
  },
  {} as Record<SubjectId, Subject>
);

export function getSubjectById(subjectId: string): Subject | undefined {
  return SPM_SUBJECTS.find((s) => s.id === subjectId);
}

export function getTopicById(
  subjectId: string,
  topicId: string
): Topic | undefined {
  const subject = getSubjectById(subjectId);
  return subject?.topics.find((t) => t.id === topicId);
}
