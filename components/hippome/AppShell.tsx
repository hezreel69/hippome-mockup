"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useHippomeStore } from "@/context/HippomeStoreProvider";
import { SPM_SUBJECTS } from "@/data/subjects";
import { DifficultyLevel } from "@/types/hippome";
import { HippomeMark } from "@/components/hippome/HippomeMark";
import { Marquee } from "@/components/motion";
import {
  Badge,
  BookIcon,
  Button,
  CloseIcon,
  HomeIcon,
  LogOutIcon,
  RefreshIcon,
  WalletIcon,
} from "@/components/ui";

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
  focusMode?: boolean;
}

const LEVEL_LABEL: Record<DifficultyLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const SUBJECT_TILE_PALETTES = [
  { bg: "bg-[var(--pearl-aqua)]", tilt: -2.5 },
  { bg: "bg-[var(--periwinkle)]", tilt: 2 },
  { bg: "bg-[var(--wisteria)]", tilt: -1.5 },
  { bg: "bg-[var(--floral-white)]", tilt: 2.5 },
  { bg: "bg-[var(--lavender)]", tilt: -2 },
] as const;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function ScribbleUnderline() {
  return (
    <motion.svg
      layoutId="nav-scribble"
      viewBox="0 0 120 12"
      fill="none"
      className="absolute -bottom-1.5 left-0 h-2.5 w-full"
      preserveAspectRatio="none"
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      <path
        d="M2 8.5C28 3.5 64 2.5 118 7.5"
        stroke="#75c9c8"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export function AppShell({
  children,
  pageTitle,
  focusMode = false,
}: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const { isHydrated, activeUser, logout, resetAllData } = useHippomeStore();

  const [subjectsOverlayOpen, setSubjectsOverlayOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;

    if (!activeUser) {
      router.replace("/auth");
      return;
    }

    if (!activeUser.hasCompletedOnboarding) {
      router.replace("/onboarding");
    }
  }, [isHydrated, activeUser, router]);

  useEffect(() => {
    if (!subjectsOverlayOpen && !profileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSubjectsOverlayOpen(false);
        setProfileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [subjectsOverlayOpen, profileMenuOpen]);

  if (!isHydrated || !activeUser || !activeUser.hasCompletedOnboarding) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-8 overflow-hidden bg-[var(--ground)] p-6">
        <motion.div
          animate={
            prefersReduced
              ? undefined
              : { scale: [1, 1.08, 1], rotate: [0, -4, 4, 0] }
          }
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <HippomeMark size={64} />
        </motion.div>
        <div className="w-full max-w-md border-y-2 border-[var(--ink-surface)] bg-[var(--pearl-aqua)] py-2">
          <Marquee
            speed={16}
            items={[
              <span key="1" className="text-micro text-[var(--ink-surface)]">
                LOADING WORKSPACE ✦
              </span>,
              <span key="2" className="text-micro text-[var(--ink-surface)]">
                FORM 5 SPM ✦
              </span>,
              <span key="3" className="text-micro text-[var(--ink-surface)]">
                HIPPOME READY ✦
              </span>,
            ]}
          />
        </div>
      </main>
    );
  }

  const availableVouchers = activeUser.vouchers.filter(
    (v) => !v.redeemedAt
  ).length;

  const isDashboard = pathname === "/dashboard";
  const isRewards = pathname.startsWith("/rewards");
  const isSubjectRoute = pathname.startsWith("/subjects");

  const resolvedMobileTitle =
    pageTitle ??
    (isRewards
      ? "Voucher Wallet"
      : isSubjectRoute
        ? "SPM Subject"
        : "Study Home");

  const handleLogout = () => {
    setProfileMenuOpen(false);
    logout();
    router.push("/auth");
  };

  const handleReset = () => {
    setProfileMenuOpen(false);
    resetAllData();
    router.push("/auth");
  };

  if (focusMode) {
    return (
      <div className="min-h-[100dvh] w-full bg-[var(--ground)]">
        <main className="min-h-[100dvh] w-full">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full bg-[var(--ground)]">
      {/* Desktop Flat Editorial Masthead */}
      <header className="sticky top-0 z-40 hidden border-b-2 border-[var(--ink-surface)] bg-[var(--floral-white)] lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 group"
          >
            <HippomeMark size={38} />
            <div>
              <span className="font-display block text-2xl font-extrabold leading-none tracking-[-0.04em] text-[var(--text)]">
                HIPPOME
              </span>
              <span className="text-micro block text-[var(--muted)]">
                Form 5 SPM
              </span>
            </div>
          </Link>

          <nav aria-label="Main navigation" className="flex items-center gap-8">
            <Link
              href="/dashboard"
              className={`relative py-1 text-micro transition-colors ${
                isDashboard
                  ? "text-[var(--text)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              <span>Home</span>
              {isDashboard && <ScribbleUnderline />}
            </Link>

            <Link
              href="/rewards"
              className={`relative py-1 text-micro transition-colors ${
                isRewards
                  ? "text-[var(--text)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              <span>Wallet</span>
              {isRewards && <ScribbleUnderline />}
            </Link>

            <button
              type="button"
              onClick={() => setSubjectsOverlayOpen(true)}
              className={`relative cursor-pointer py-1 text-micro transition-colors ${
                isSubjectRoute
                  ? "text-[var(--text)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              <span>Subjects</span>
              {isSubjectRoute && <ScribbleUnderline />}
            </button>
          </nav>

          <div className="relative flex items-center gap-3">
            <Link href="/rewards">
              <motion.span
                key={availableVouchers}
                initial={prefersReduced ? false : { scale: 1.25, rotate: -6 }}
                animate={{ scale: 1, rotate: -2 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
                className="sticker-sm inline-flex items-center gap-1.5 bg-[var(--pearl-aqua)] px-3.5 py-1.5 text-xs font-bold text-[var(--ink-surface)]"
              >
                <WalletIcon className="h-3.5 w-3.5" />
                <span className="num">{availableVouchers} Ready</span>
              </motion.span>
            </Link>

            <button
              type="button"
              onClick={() => setProfileMenuOpen((v) => !v)}
              aria-expanded={profileMenuOpen}
              aria-label="Open student menu"
              className="sticker-sm flex h-10 w-10 cursor-pointer items-center justify-center bg-[var(--periwinkle)] text-xs font-extrabold text-[var(--ink-surface)] hover:bg-[var(--wisteria)]"
            >
              {getInitials(activeUser.name)}
            </button>

            <AnimatePresence>
              {profileMenuOpen && (
                <motion.div
                  initial={
                    prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="sticker absolute top-13 right-0 z-50 w-64 bg-[var(--surface)] p-4"
                >
                  <div className="mb-3 border-b-2 border-[var(--rule)] pb-3">
                    <p className="font-display text-base font-bold text-[var(--text)]">
                      {activeUser.name}
                    </p>
                    <p className="truncate text-xs text-[var(--muted)]">
                      {activeUser.email}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={handleLogout}
                      className="justify-start"
                    >
                      <LogOutIcon className="h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      fullWidth
                      onClick={handleReset}
                      className="justify-start text-[var(--negative)]"
                    >
                      <RefreshIcon className="h-4 w-4" />
                      <span>Reset demo data</span>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b-2 border-[var(--ink-surface)] bg-[var(--floral-white)] px-4 py-3 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <HippomeMark size={30} />
          <span className="font-display text-lg font-extrabold tracking-[-0.03em] text-[var(--text)]">
            {resolvedMobileTitle}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/rewards">
            <span className="sticker-sm inline-flex items-center gap-1 bg-[var(--pearl-aqua)] px-2.5 py-1 text-xs font-bold text-[var(--ink-surface)]">
              <WalletIcon className="h-3.5 w-3.5" />
              <span className="num">{availableVouchers}</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setProfileMenuOpen((v) => !v)}
            aria-label="Open student menu"
            className="sticker-sm flex h-9 w-9 cursor-pointer items-center justify-center bg-[var(--periwinkle)] text-xs font-extrabold text-[var(--ink-surface)]"
          >
            {getInitials(activeUser.name)}
          </button>
        </div>
      </header>

      {/* Mobile Profile Dropdown */}
      <AnimatePresence>
        {profileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-16 right-4 z-50 w-60 lg:hidden"
          >
            <div className="sticker bg-[var(--surface)] p-4">
              <p className="font-display text-sm font-bold text-[var(--text)]">
                {activeUser.name}
              </p>
              <p className="mb-3 truncate text-xs text-[var(--muted)]">
                {activeUser.email}
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={handleLogout}
                  className="justify-start"
                >
                  <LogOutIcon className="h-4 w-4" />
                  <span>Log out</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={handleReset}
                  className="justify-start text-[var(--negative)]"
                >
                  <RefreshIcon className="h-4 w-4" />
                  <span>Reset demo data</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pb-safe-nav lg:pb-0">{children}</main>

      {/* Mobile Flat Bottom Tab Bar */}
      <nav
        aria-label="Mobile navigation"
        className="pb-safe-dock fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t-2 border-[var(--ink-surface)] bg-[var(--floral-white)] px-3 pt-2 lg:hidden"
      >
        <Link
          href="/dashboard"
          className="relative flex flex-col items-center justify-center gap-0.5 py-1.5 text-center"
        >
          {isDashboard && (
            <motion.span
              layoutId="mobile-tab-indicator"
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="absolute inset-x-2 inset-y-0.5 rounded-full border-2 border-[var(--ink-surface)] bg-[var(--pearl-aqua)]"
            />
          )}
          <HomeIcon className="relative z-10 h-5 w-5 text-[var(--ink-surface)]" />
          <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-surface)]">
            Home
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setSubjectsOverlayOpen(true)}
          className="relative flex cursor-pointer flex-col items-center justify-center gap-0.5 py-1.5 text-center"
        >
          {isSubjectRoute && (
            <motion.span
              layoutId="mobile-tab-indicator"
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="absolute inset-x-2 inset-y-0.5 rounded-full border-2 border-[var(--ink-surface)] bg-[var(--periwinkle)]"
            />
          )}
          <BookIcon className="relative z-10 h-5 w-5 text-[var(--ink-surface)]" />
          <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-surface)]">
            Subjects
          </span>
        </button>

        <Link
          href="/rewards"
          className="relative flex flex-col items-center justify-center gap-0.5 py-1.5 text-center"
        >
          {isRewards && (
            <motion.span
              layoutId="mobile-tab-indicator"
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="absolute inset-x-2 inset-y-0.5 rounded-full border-2 border-[var(--ink-surface)] bg-[var(--wisteria)]"
            />
          )}
          <WalletIcon className="relative z-10 h-5 w-5 text-[var(--ink-surface)]" />
          <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-surface)]">
            Wallet
          </span>
        </Link>
      </nav>

      {/* Full-Screen Subject Picker Overlay */}
      <AnimatePresence>
        {subjectsOverlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[var(--ink-surface)] p-5 text-[var(--floral-white)] sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Pick a Form 5 SPM Subject"
          >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 pb-6">
              <div>
                <p className="text-micro text-[var(--pearl-aqua)]">
                  Form 5 SPM
                </p>
                <h2 className="text-display text-[var(--floral-white)]">
                  Pick your battle
                </h2>
              </div>

              <Button
                variant="aqua"
                size="md"
                onClick={() => setSubjectsOverlayOpen(false)}
                aria-label="Close subjects"
              >
                <CloseIcon className="h-5 w-5" />
                <span>Close</span>
              </Button>
            </div>

            <div className="mx-auto grid w-full max-w-6xl flex-1 content-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SPM_SUBJECTS.map((subject, idx) => {
                const prog = activeUser.subjectProgress[subject.id];
                const href = prog?.level
                  ? `/subjects/${subject.id}`
                  : `/subjects/${subject.id}/assessment`;
                const palette =
                  SUBJECT_TILE_PALETTES[idx % SUBJECT_TILE_PALETTES.length];

                return (
                  <motion.div
                    key={subject.id}
                    initial={
                      prefersReduced
                        ? false
                        : { opacity: 0, y: 28, rotate: palette.tilt * 2 }
                    }
                    animate={{ opacity: 1, y: 0, rotate: palette.tilt }}
                    whileHover={
                      prefersReduced ? undefined : { rotate: 0, scale: 1.03 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: prefersReduced ? 0 : idx * 0.05,
                    }}
                  >
                    <Link
                      href={href}
                      onClick={() => setSubjectsOverlayOpen(false)}
                      className={`sticker flex h-full flex-col justify-between gap-4 p-6 text-[var(--ink-surface)] ${palette.bg}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-micro">{subject.spmCode}</span>
                        <Badge tone={prog?.level ? "ink" : "neutral"}>
                          {prog?.level ? LEVEL_LABEL[prog.level] : "New"}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em]">
                          {subject.name}
                        </h3>
                        <p className="mt-1 text-xs font-semibold opacity-80">
                          {prog?.level
                            ? `${prog.quizzesPassedAtCurrentLevel}/3 stamps`
                            : "6-question quick check-up"}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
