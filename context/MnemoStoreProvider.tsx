"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  MILESTONE_REWARD_CONFIG,
  QUIZZES_TO_LEVEL_UP,
  STORAGE_KEY,
} from "@/lib/config";
import {
  getMilestoneRewardTemplate,
  getQuizRewardTemplate,
} from "@/data/reward-map";
import { mintVoucherFromTemplate } from "@/data/rewards";
import { SUBJECTS } from "@/data/subjects";
import {
  DifficultyLevel,
  MnemoPersistedState,
  QuizAttempt,
  QuizMode,
  SubjectId,
  SubjectProgress,
  UserProfile,
  Voucher,
} from "@/types/mnemo";

function createEmptySubjectProgress(subjectId: SubjectId): SubjectProgress {
  return {
    subjectId,
    level: null,
    assessmentScore: null,
    assessmentTotal: null,
    assessmentCompletedAt: null,
    quizzesPassedAtCurrentLevel: 0,
    totalQuizzesPassed: 0,
    totalQuizzesTaken: 0,
  };
}

function createAllSubjectProgress(): Record<SubjectId, SubjectProgress> {
  return SUBJECTS.reduce(
    (acc, subject) => {
      acc[subject.id] = createEmptySubjectProgress(subject.id);
      return acc;
    },
    {} as Record<SubjectId, SubjectProgress>
  );
}

const DEMO_BASE_ISO = "2026-11-20T08:00:00.000Z";

function isoDaysBeforeDemo(days: number): string {
  const base = Date.parse(DEMO_BASE_ISO);
  return new Date(base - days * 24 * 60 * 60 * 1000).toISOString();
}

function createDemoReturningUser(): UserProfile {
  const progress = createAllSubjectProgress();
  progress.sejarah = {
    subjectId: "sejarah",
    level: "beginner",
    assessmentScore: 2,
    assessmentTotal: 6,
    assessmentCompletedAt: isoDaysBeforeDemo(4),
    quizzesPassedAtCurrentLevel: 2,
    totalQuizzesPassed: 2,
    totalQuizzesTaken: 3,
  };
  progress.mathematics = {
    subjectId: "mathematics",
    level: "intermediate",
    assessmentScore: 4,
    assessmentTotal: 6,
    assessmentCompletedAt: isoDaysBeforeDemo(2),
    quizzesPassedAtCurrentLevel: 1,
    totalQuizzesPassed: 1,
    totalQuizzesTaken: 1,
  };

  const vouchers: Voucher[] = [
    {
      id: "demo_vch_1",
      templateId: "beg-mixue-5",
      tier: "beginner",
      brand: "Mixue",
      title: "Mixue RM5 Ice Cream & Tea Voucher",
      valueRm: 5,
      description: "RM5 off any Mixue drink or sundae.",
      code: "MIX5-DEMO-8421",
      isMilestone: false,
      earnedAt: isoDaysBeforeDemo(3),
      earnedFromSubjectId: "sejarah",
      earnedFromQuizMode: "random",
      redeemedAt: isoDaysBeforeDemo(2),
    },
    {
      id: "demo_vch_2",
      templateId: "beg-mixue-5",
      tier: "beginner",
      brand: "Mixue",
      title: "Mixue RM5 Ice Cream & Tea Voucher",
      valueRm: 5,
      description: "RM5 off any Mixue drink or sundae.",
      code: "MIX5-DEMO-3194",
      isMilestone: false,
      earnedAt: isoDaysBeforeDemo(2),
      earnedFromSubjectId: "sejarah",
      earnedFromQuizMode: "random",
      redeemedAt: null,
    },
    {
      id: "demo_vch_3",
      templateId: "int-zus-10",
      tier: "intermediate",
      brand: "ZUS Coffee",
      title: "ZUS Coffee RM10 Drink Voucher",
      valueRm: 10,
      description: "RM10 off any handcrafted ZUS Coffee drink.",
      code: "ZUS10-DEMO-5572",
      isMilestone: false,
      earnedAt: isoDaysBeforeDemo(1),
      earnedFromSubjectId: "mathematics",
      earnedFromQuizMode: "random",
      redeemedAt: null,
    },
  ];

  const quizHistory: QuizAttempt[] = [
    {
      id: "demo_attempt_1",
      subjectId: "sejarah",
      quizMode: "random",
      level: "beginner",
      score: 4,
      totalQuestions: 5,
      passed: true,
      questionIds: ["sej-1", "sej-2", "sej-3", "sej-4", "sej-5"],
      rewardVoucherIds: ["demo_vch_1"],
      leveledUpTo: null,
      completedAt: isoDaysBeforeDemo(3),
    },
    {
      id: "demo_attempt_2",
      subjectId: "sejarah",
      quizMode: "random",
      level: "beginner",
      score: 2,
      totalQuestions: 5,
      passed: false,
      questionIds: ["sej-6", "sej-7", "sej-8", "sej-9", "sej-10"],
      rewardVoucherIds: [],
      leveledUpTo: null,
      completedAt: isoDaysBeforeDemo(2.5),
    },
    {
      id: "demo_attempt_3",
      subjectId: "sejarah",
      quizMode: "random",
      level: "beginner",
      score: 4,
      totalQuestions: 5,
      passed: true,
      questionIds: ["sej-11", "sej-12", "sej-13", "sej-14", "sej-15"],
      rewardVoucherIds: ["demo_vch_2"],
      leveledUpTo: null,
      completedAt: isoDaysBeforeDemo(2),
    },
    {
      id: "demo_attempt_4",
      subjectId: "mathematics",
      quizMode: "random",
      level: "intermediate",
      score: 5,
      totalQuestions: 5,
      passed: true,
      questionIds: ["mat-1", "mat-2", "mat-3", "mat-4", "mat-5"],
      rewardVoucherIds: ["demo_vch_3"],
      leveledUpTo: null,
      completedAt: isoDaysBeforeDemo(1),
    },
  ];

  return {
    id: "demo_returning_student",
    name: "Aisyah Rahman",
    email: "aisyah@mnemo.my",
    password: "password123",
    isDemo: true,
    hasCompletedOnboarding: true,
    createdAt: isoDaysBeforeDemo(5),
    subjectProgress: progress,
    quizHistory,
    vouchers,
    seenQuestionIdsByKey: {},
    lastAttemptQuestionIdsByKey: {},
  };
}

function createDemoNewUser(): UserProfile {
  return {
    id: "demo_new_student",
    name: "Daniel Lim",
    email: "daniel@mnemo.my",
    password: "password123",
    isDemo: true,
    hasCompletedOnboarding: false,
    createdAt: DEMO_BASE_ISO,
    subjectProgress: createAllSubjectProgress(),
    quizHistory: [],
    vouchers: [],
    seenQuestionIdsByKey: {},
    lastAttemptQuestionIdsByKey: {},
  };
}

function buildInitialState(): MnemoPersistedState {
  const returningUser = createDemoReturningUser();
  const newUser = createDemoNewUser();

  return {
    activeUserId: null,
    users: {
      [returningUser.id]: returningUser,
      [newUser.id]: newUser,
    },
  };
}

const SERVER_SNAPSHOT: MnemoPersistedState = buildInitialState();

let clientStateCache: MnemoPersistedState | null = null;
const storeListeners = new Set<() => void>();

function emitStoreChange(): void {
  storeListeners.forEach((listener) => listener());
}

function readClientSnapshot(): MnemoPersistedState {
  if (typeof window === "undefined") {
    return SERVER_SNAPSHOT;
  }

  if (clientStateCache) {
    return clientStateCache;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as MnemoPersistedState;
      if (parsed && typeof parsed === "object" && parsed.users) {
        clientStateCache = parsed;
        return clientStateCache;
      }
    }
  } catch {
    // Fallback to initial state if storage is inaccessible or corrupted.
  }

  clientStateCache = buildInitialState();
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clientStateCache));
  } catch {
    // Ignore storage write errors.
  }
  return clientStateCache;
}

function writeClientSnapshot(
  updater: (prev: MnemoPersistedState) => MnemoPersistedState
): MnemoPersistedState {
  const prev = readClientSnapshot();
  const next = updater(prev);
  clientStateCache = next;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota errors.
    }
  }

  emitStoreChange();
  return next;
}

function subscribeStore(listener: () => void): () => void {
  storeListeners.add(listener);

  if (typeof window === "undefined") {
    return () => {
      storeListeners.delete(listener);
    };
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      clientStateCache = null;
      emitStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  return () => {
    storeListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

const emptySubscribe = () => () => {};

export interface AuthActionResult {
  ok: boolean;
  error?: string;
  user?: UserProfile;
}

export interface RecordQuizOutcome {
  attempt: QuizAttempt;
  grantedVouchers: Voucher[];
  leveledUpTo: DifficultyLevel | null;
  milestoneGranted: boolean;
}

interface MnemoStoreContextValue {
  isHydrated: boolean;
  activeUser: UserProfile | null;
  register: (name: string, email: string, password: string) => AuthActionResult;
  login: (email: string, password: string) => AuthActionResult;
  loginAsDemo: (mode: "new" | "returning") => UserProfile;
  logout: () => void;
  completeOnboarding: () => void;
  saveAssessmentResult: (params: {
    subjectId: SubjectId;
    level: DifficultyLevel;
    score: number;
    total: number;
  }) => void;
  recordQuizAttempt: (params: {
    subjectId: SubjectId;
    quizMode: QuizMode;
    level: DifficultyLevel;
    score: number;
    totalQuestions: number;
    passed: boolean;
    questionIds: string[];
  }) => RecordQuizOutcome | null;
  redeemVoucher: (voucherId: string) => void;
  resetAllData: () => void;
}

const MnemoStoreContext = createContext<MnemoStoreContextValue | null>(null);

export function makeQuestionPoolKey(
  subjectId: SubjectId,
  level: DifficultyLevel
): string {
  return `${subjectId}:random:${level}`;
}

export function MnemoStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const state = useSyncExternalStore(
    subscribeStore,
    readClientSnapshot,
    () => SERVER_SNAPSHOT
  );

  const activeUser = useMemo(() => {
    if (!isHydrated || !state.activeUserId) return null;
    return state.users[state.activeUserId] ?? null;
  }, [isHydrated, state.activeUserId, state.users]);

  const register = useCallback(
    (name: string, email: string, password: string): AuthActionResult => {
      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanName || !cleanEmail || !password) {
        return { ok: false, error: "Please fill in name, email, and password." };
      }

      const current = readClientSnapshot();
      const existing = Object.values(current.users).find(
        (u) => u.email.toLowerCase() === cleanEmail
      );
      if (existing) {
        return {
          ok: false,
          error: "An account with this email already exists. Please log in.",
        };
      }

      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        password,
        hasCompletedOnboarding: false,
        createdAt: new Date().toISOString(),
        subjectProgress: createAllSubjectProgress(),
        quizHistory: [],
        vouchers: [],
        seenQuestionIdsByKey: {},
        lastAttemptQuestionIdsByKey: {},
      };

      writeClientSnapshot((prev) => ({
        activeUserId: newUser.id,
        users: {
          ...prev.users,
          [newUser.id]: newUser,
        },
      }));

      return { ok: true, user: newUser };
    },
    []
  );

  const login = useCallback(
    (email: string, password: string): AuthActionResult => {
      const cleanEmail = email.trim().toLowerCase();
      const current = readClientSnapshot();
      const matched = Object.values(current.users).find(
        (u) => u.email.toLowerCase() === cleanEmail
      );

      if (!matched || matched.password !== password) {
        return { ok: false, error: "Invalid email or password." };
      }

      writeClientSnapshot((prev) => ({
        ...prev,
        activeUserId: matched.id,
      }));

      return { ok: true, user: matched };
    },
    []
  );

  const loginAsDemo = useCallback((mode: "new" | "returning"): UserProfile => {
    const freshDemo =
      mode === "new" ? createDemoNewUser() : createDemoReturningUser();

    writeClientSnapshot((prev) => ({
      activeUserId: freshDemo.id,
      users: {
        ...prev.users,
        [freshDemo.id]: freshDemo,
      },
    }));

    return freshDemo;
  }, []);

  const logout = useCallback(() => {
    writeClientSnapshot((prev) => ({
      ...prev,
      activeUserId: null,
    }));
  }, []);

  const completeOnboarding = useCallback(() => {
    writeClientSnapshot((prev) => {
      if (!prev.activeUserId) return prev;
      const user = prev.users[prev.activeUserId];
      if (!user) return prev;

      return {
        ...prev,
        users: {
          ...prev.users,
          [user.id]: {
            ...user,
            hasCompletedOnboarding: true,
          },
        },
      };
    });
  }, []);

  const saveAssessmentResult = useCallback(
    (params: {
      subjectId: SubjectId;
      level: DifficultyLevel;
      score: number;
      total: number;
    }) => {
      writeClientSnapshot((prev) => {
        if (!prev.activeUserId) return prev;
        const user = prev.users[prev.activeUserId];
        if (!user) return prev;

        const currentSubject =
          user.subjectProgress[params.subjectId] ??
          createEmptySubjectProgress(params.subjectId);

        const updatedSubject: SubjectProgress = {
          ...currentSubject,
          level: params.level,
          assessmentScore: params.score,
          assessmentTotal: params.total,
          assessmentCompletedAt: new Date().toISOString(),
          quizzesPassedAtCurrentLevel: 0,
        };

        return {
          ...prev,
          users: {
            ...prev.users,
            [user.id]: {
              ...user,
              subjectProgress: {
                ...user.subjectProgress,
                [params.subjectId]: updatedSubject,
              },
            },
          },
        };
      });
    },
    []
  );

  const recordQuizAttempt = useCallback(
    (params: {
      subjectId: SubjectId;
      quizMode: QuizMode;
      level: DifficultyLevel;
      score: number;
      totalQuestions: number;
      passed: boolean;
      questionIds: string[];
    }): RecordQuizOutcome | null => {
      const current = readClientSnapshot();
      if (!current.activeUserId) return null;
      const currentUser = current.users[current.activeUserId];
      if (!currentUser) return null;

      const grantedVouchers: Voucher[] = [];
      let leveledUpTo: DifficultyLevel | null = null;
      let milestoneGranted = false;

      const subjectProg =
        currentUser.subjectProgress[params.subjectId] ??
        createEmptySubjectProgress(params.subjectId);

      let nextQuizzesAtLevel = subjectProg.quizzesPassedAtCurrentLevel;
      let nextLevel: DifficultyLevel = subjectProg.level ?? params.level;

      if (params.passed) {
        const quizTemplate = getQuizRewardTemplate(
          params.subjectId,
          params.level
        );
        grantedVouchers.push(
          mintVoucherFromTemplate(quizTemplate, {
            subjectId: params.subjectId,
            quizMode: params.quizMode,
          })
        );

        nextQuizzesAtLevel += 1;

        if (nextQuizzesAtLevel >= QUIZZES_TO_LEVEL_UP) {
          const milestoneCfg = MILESTONE_REWARD_CONFIG[params.level];
          const milestoneTemplate = getMilestoneRewardTemplate(
            params.subjectId,
            params.level
          );
          grantedVouchers.push(
            mintVoucherFromTemplate(milestoneTemplate, {
              subjectId: params.subjectId,
              quizMode: params.quizMode,
            })
          );
          milestoneGranted = true;
          nextQuizzesAtLevel = 0;

          if (milestoneCfg.nextLevel !== params.level) {
            nextLevel = milestoneCfg.nextLevel;
            leveledUpTo = milestoneCfg.nextLevel;
          } else {
            leveledUpTo = "advanced";
          }
        }
      }

      const attempt: QuizAttempt = {
        id: `att_${Date.now()}`,
        subjectId: params.subjectId,
        quizMode: params.quizMode,
        level: params.level,
        score: params.score,
        totalQuestions: params.totalQuestions,
        passed: params.passed,
        questionIds: params.questionIds,
        rewardVoucherIds: grantedVouchers.map((v) => v.id),
        leveledUpTo,
        completedAt: new Date().toISOString(),
      };

      const poolKey = makeQuestionPoolKey(params.subjectId, params.level);

      writeClientSnapshot((prev) => {
        if (!prev.activeUserId) return prev;
        const user = prev.users[prev.activeUserId];
        if (!user) return prev;

        const existingProg =
          user.subjectProgress[params.subjectId] ??
          createEmptySubjectProgress(params.subjectId);

        const updatedSubject: SubjectProgress = {
          ...existingProg,
          level: nextLevel,
          quizzesPassedAtCurrentLevel: nextQuizzesAtLevel,
          totalQuizzesTaken: existingProg.totalQuizzesTaken + 1,
          totalQuizzesPassed:
            existingProg.totalQuizzesPassed + (params.passed ? 1 : 0),
        };

        let nextSeenMap = user.seenQuestionIdsByKey;
        let nextLastMap = user.lastAttemptQuestionIdsByKey;

        if (params.quizMode === "random") {
          const prevSeen = user.seenQuestionIdsByKey[poolKey] ?? [];
          const mergedSeen = Array.from(
            new Set([...prevSeen, ...params.questionIds])
          );
          nextSeenMap = {
            ...user.seenQuestionIdsByKey,
            [poolKey]: mergedSeen,
          };
          nextLastMap = {
            ...user.lastAttemptQuestionIdsByKey,
            [poolKey]: params.questionIds,
          };
        }

        return {
          ...prev,
          users: {
            ...prev.users,
            [user.id]: {
              ...user,
              subjectProgress: {
                ...user.subjectProgress,
                [params.subjectId]: updatedSubject,
              },
              quizHistory: [attempt, ...user.quizHistory],
              vouchers: [...grantedVouchers, ...user.vouchers],
              seenQuestionIdsByKey: nextSeenMap,
              lastAttemptQuestionIdsByKey: nextLastMap,
            },
          },
        };
      });

      return {
        attempt,
        grantedVouchers,
        leveledUpTo,
        milestoneGranted,
      };
    },
    []
  );

  const redeemVoucher = useCallback((voucherId: string) => {
    writeClientSnapshot((prev) => {
      if (!prev.activeUserId) return prev;
      const user = prev.users[prev.activeUserId];
      if (!user) return prev;

      const updatedVouchers = user.vouchers.map((v) =>
        v.id === voucherId && !v.redeemedAt
          ? { ...v, redeemedAt: new Date().toISOString() }
          : v
      );

      return {
        ...prev,
        users: {
          ...prev.users,
          [user.id]: {
            ...user,
            vouchers: updatedVouchers,
          },
        },
      };
    });
  }, []);

  const resetAllData = useCallback(() => {
    writeClientSnapshot(() => buildInitialState());
  }, []);

  const value = useMemo<MnemoStoreContextValue>(
    () => ({
      isHydrated,
      activeUser,
      register,
      login,
      loginAsDemo,
      logout,
      completeOnboarding,
      saveAssessmentResult,
      recordQuizAttempt,
      redeemVoucher,
      resetAllData,
    }),
    [
      isHydrated,
      activeUser,
      register,
      login,
      loginAsDemo,
      logout,
      completeOnboarding,
      saveAssessmentResult,
      recordQuizAttempt,
      redeemVoucher,
      resetAllData,
    ]
  );

  return (
    <MnemoStoreContext.Provider value={value}>
      {children}
    </MnemoStoreContext.Provider>
  );
}

export function useMnemoStore(): MnemoStoreContextValue {
  const ctx = useContext(MnemoStoreContext);
  if (!ctx) {
    throw new Error(
      "useMnemoStore must be used inside a <MnemoStoreProvider>"
    );
  }
  return ctx;
}
