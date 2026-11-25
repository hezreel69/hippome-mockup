"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMnemoStore } from "@/context/MnemoStoreProvider";
import { SUBJECTS } from "@/data/subjects";
import { playPop, unlockAudioContext } from "@/lib/sound";
import { BrandLogo } from "@/components/mnemo/BrandLogo";
import { MnemoMark } from "@/components/mnemo/MnemoMark";
import { HippomeAvatarSlot } from "@/components/avatar/HippomeAvatarSlot";
import { HIPPOME_AVATAR_CONFIG, HippomeExpression } from "@/lib/avatar-config";
import {
  Blob,
  Confetti,
  SplitText,
  Sticker,
} from "@/components/motion";
import { Badge, Button, ChevronRightIcon, StampTrack } from "@/components/ui";

interface OnboardingSlide {
  id: string;
  stageBg: string;
  isDark?: boolean;
  title: string;
  expression: HippomeExpression;
  dialogue: (firstName: string) => string;
  preview: "none" | "subjects" | "vouchers" | "milestone";
}

const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: "welcome",
    stageBg: "bg-[var(--floral-white)] text-[var(--ink-surface)]",
    title: "Welcome to Mnemo!",
    expression: "happy",
    dialogue: (name) =>
      `Hi ${name}! I'm Hippome, your study buddy. Mnemo helps you learn with short quizzes and earn vouchers.`,
    preview: "none",
  },
  {
    id: "subjects",
    stageBg: "bg-[var(--periwinkle)] text-[var(--ink-surface)]",
    title: "Pick a subject",
    expression: "thinking",
    dialogue: () =>
      "Mnemo has two subjects. Start with a quick check-up, then try the random or demo quiz.",
    preview: "subjects",
  },
  {
    id: "vouchers",
    stageBg: "bg-[var(--pearl-aqua)] text-[var(--ink-surface)]",
    title: "Earn vouchers",
    expression: "celebrating",
    dialogue: () =>
      "Get 3 out of 5 right to win a voucher. Missed it? Try again.",
    preview: "vouchers",
  },
  {
    id: "levelup",
    stageBg: "bg-[var(--ink-surface)] text-[var(--floral-white)]",
    isDark: true,
    title: "Level up for bonuses",
    expression: "encouraging",
    dialogue: () =>
      "Pass 3 quizzes in a subject to level up and win a bonus voucher.",
    preview: "milestone",
  },
];

function InsideBoxItems({
  preview,
}: {
  preview: OnboardingSlide["preview"];
}) {
  const prefersReduced = useReducedMotion();

  if (preview === "none") return null;

  if (preview === "subjects") {
    return (
      <div className="mt-6 flex flex-wrap gap-3">
        {SUBJECTS.map((s, i) => (
          <motion.div
            key={s.id}
            initial={prefersReduced ? false : { opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
              delay: 0.4 + i * 0.1,
            }}
          >
            <Sticker
              tone={i % 2 === 0 ? "aqua" : "periwinkle"}
              tilt={i % 2 === 0 ? -2 : 2}
            >
              <span className="font-display text-base font-extrabold">
                {s.name}
              </span>
            </Sticker>
          </motion.div>
        ))}
      </div>
    );
  }

  if (preview === "vouchers") {
    const brands = ["TNG eWallet", "ZUS Coffee", "CHAGEE", "Mixue", "7-Eleven"];
    return (
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {brands.map((brand, i) => (
          <motion.div
            key={brand}
            initial={prefersReduced ? false : { opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
              delay: 0.4 + i * 0.08,
            }}
          >
            <Sticker tone="floral" tilt={i % 2 === 0 ? -2.5 : 2.5}>
              <BrandLogo brand={brand} size={28} wobble={false} />
              <span className="font-display text-sm font-extrabold">
                {brand}
              </span>
            </Sticker>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-6 inline-flex flex-wrap items-center gap-4 rounded-[20px] border-2 border-[var(--ink-surface)] bg-[var(--floral-white)] p-4 text-[var(--ink-surface)]"
    >
      <StampTrack
        passedCount={2}
        targetCount={3}
        rewardLabel="1 more pass to level up"
        animateLatest
      />
      <Badge tone="ink">Bonus voucher</Badge>
    </motion.div>
  );
}

function KineticSpeech({
  text,
  isDark = false,
  expression,
  preview,
  isTalking,
  hideChip = false,
  onSpeakingChange,
}: {
  text: string;
  isDark?: boolean;
  expression: HippomeExpression;
  preview: OnboardingSlide["preview"];
  isTalking: boolean;
  hideChip?: boolean;
  onSpeakingChange: (speaking: boolean) => void;
}) {
  const prefersReduced = useReducedMotion();
  const [skipped, setSkipped] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    if (prefersReduced) {
      onSpeakingChange(false);
      return;
    }
    onSpeakingChange(true);
    const durationMs = Math.min(2600, words.length * 60 + 250);
    const timer = window.setTimeout(() => {
      onSpeakingChange(false);
    }, durationMs);
    return () => window.clearTimeout(timer);
  }, [text, words.length, prefersReduced, onSpeakingChange]);

  const handleSkip = () => {
    setSkipped(true);
    onSpeakingChange(false);
  };

  return (
    <div
      onClick={handleSkip}
      aria-label="Hippome message, click to show all text"
      className={`sticker relative w-full max-w-4xl cursor-pointer p-5 sm:p-10 ${
        hideChip ? "" : "pt-8 sm:pt-12"
      } ${
        isDark
          ? "border-[var(--pearl-aqua)] bg-[var(--ink-surface-raised)] text-[var(--floral-white)] shadow-[6px_6px_0_var(--pearl-aqua)]"
          : "bg-[var(--surface)] text-[var(--ink-surface)]"
      }`}
    >
      {/* Small Hippome Chip on Top-Left Edge (hidden on Slide 1 where hero hippo is shown) */}
      {!hideChip && (
        <div className="absolute -top-7 left-5 sm:-top-8 sm:left-6">
          <HippomeAvatarSlot
            expression={expression}
            size="md"
            talking={isTalking}
            onDark={isDark}
          />
        </div>
      )}

      <p className="font-display text-lg font-bold leading-snug sm:text-2xl md:text-3xl">
        {words.map((word, idx) => {
          const isEmphasised = /^(Mnemo|Hippome|vouchers?|bonus|level)$/i.test(
            word.replace(/[.,!?]/g, "")
          );
          if (prefersReduced || skipped) {
            return (
              <span
                key={`${idx}-${word}`}
                className={`mr-2 inline-block ${
                  isEmphasised
                    ? "rounded-lg bg-[var(--pearl-aqua)] px-2 text-[var(--ink-surface)]"
                    : ""
                }`}
              >
                {word}
              </span>
            );
          }

          return (
            <motion.span
              key={`${idx}-${word}`}
              initial={{ opacity: 0, scale: 0.6, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 18,
                delay: idx * 0.055,
              }}
              className={`mr-2 inline-block ${
                isEmphasised
                  ? "rounded-lg bg-[var(--pearl-aqua)] px-2 text-[var(--ink-surface)]"
                  : ""
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </p>

      <InsideBoxItems preview={preview} />
    </div>
  );
}

export function OnboardingView() {
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  const { isHydrated, activeUser, completeOnboarding } = useMnemoStore();
  const [stepIndex, setStepIndex] = useState(0);
  const [isTalking, setIsTalking] = useState(false);
  const [bursting, setBursting] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;
    if (!activeUser) {
      router.replace("/auth");
    }
  }, [isHydrated, activeUser, router]);

  if (!isHydrated || !activeUser) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--ground)] p-6">
        <p className="font-display text-lg font-bold text-[var(--muted)]">
          Loading Mnemo intro...
        </p>
      </main>
    );
  }

  const firstName = activeUser.name.trim().split(/\s+/)[0] || activeUser.name;
  const slide = ONBOARDING_SLIDES[stepIndex];
  const isLastStep = stepIndex === ONBOARDING_SLIDES.length - 1;

  const handleFinish = () => {
    unlockAudioContext();
    playPop(true);
    setBursting(true);
    window.setTimeout(() => {
      completeOnboarding();
      router.push("/dashboard");
    }, 350);
  };

  const handleNext = () => {
    unlockAudioContext();
    playPop(true);
    setStepIndex((i) => Math.min(ONBOARDING_SLIDES.length - 1, i + 1));
  };

  const handleBack = () => {
    unlockAudioContext();
    playPop(true);
    setStepIndex((i) => Math.max(0, i - 1));
  };

  return (
    <main
      className={`relative flex min-h-[100dvh] flex-col overflow-hidden transition-colors duration-500 ${slide.stageBg}`}
    >
      <Confetti active={bursting} count={48} spread="fullscreen" />

      <Blob
        color={slide.isDark ? "aqua" : "wisteria"}
        size={420}
        parallax={0}
        opacity={slide.isDark ? 0.2 : 0.35}
        className="absolute -top-28 -right-28"
      />
      <Blob
        color={slide.isDark ? "periwinkle" : "aqua"}
        size={340}
        parallax={0}
        opacity={slide.isDark ? 0.16 : 0.3}
        className="absolute -bottom-24 -left-24"
      />

      {/* Slim Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 pt-4 pb-2 sm:gap-4 sm:px-8 sm:pt-5 sm:pb-3">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <MnemoMark size={32} inverted={slide.isDark} />
          <span className="font-display text-sm font-extrabold tracking-[-0.03em] sm:text-lg">
            MNEMO TOUR
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <span className="font-display num text-base font-extrabold tracking-[-0.03em] sm:text-xl">
            {stepIndex + 1} / {ONBOARDING_SLIDES.length}
          </span>
          <Button
            variant={slide.isDark ? "aqua" : "outline"}
            size="sm"
            onClick={handleFinish}
          >
            Skip tour
          </Button>
        </div>
      </header>

      {/* Main Centered Stage */}
      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-4 py-4 sm:px-8 sm:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -14 }}
            transition={{ duration: 0.28 }}
            className="flex w-full flex-col items-center gap-6 text-center sm:gap-10"
          >
            <div className="relative flex flex-col items-center">
              <SplitText
                key={`title-${slide.id}`}
                text={slide.title}
                by="word"
                stagger={0.055}
                className="text-onboarding-title text-center"
                wordClassName={
                  slide.id === "welcome"
                    ? (word) =>
                        word.replace(/[^a-zA-Z]/g, "").toLowerCase() === "mnemo"
                          ? "mnemo-wordmark"
                          : ""
                    : undefined
                }
              />
              <svg
                viewBox="0 0 260 18"
                fill="none"
                className="mt-2.5 h-3.5 w-44 sm:mt-3 sm:h-4 sm:w-72"
                aria-hidden="true"
              >
                <motion.path
                  d="M4 12C68 3 164 4 256 12"
                  stroke={slide.isDark ? "#75c9c8" : "#1b2338"}
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                />
              </svg>

              {slide.id === "welcome" && (
                <motion.div
                  initial={
                    prefersReduced ? false : { opacity: 0, scale: 0.85, y: 12 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 20,
                    delay: 0.2,
                  }}
                  className="mt-4 sm:mt-6"
                >
                  <HippomeAvatarSlot
                    expression="happy"
                    size="mega"
                    srcOverride={HIPPOME_AVATAR_CONFIG.welcomeSrc}
                    frameless
                    floating
                  />
                </motion.div>
              )}
            </div>

            <div className="flex w-full justify-center text-left">
              <KineticSpeech
                key={slide.id}
                text={slide.dialogue(firstName)}
                isDark={slide.isDark}
                expression={slide.expression}
                preview={slide.preview}
                isTalking={isTalking}
                hideChip={slide.id === "welcome"}
                onSpeakingChange={setIsTalking}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Footer Controls */}
      <footer className="pb-safe-dock relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 pt-3 pb-6 sm:gap-4 sm:px-8 sm:pb-7">
        <Button
          variant="outline"
          size="md"
          disabled={stepIndex === 0}
          onClick={handleBack}
          className="sm:min-h-[50px] sm:px-6 sm:text-[15px]"
        >
          Back
        </Button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {ONBOARDING_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => {
                unlockAudioContext();
                setStepIndex(idx);
              }}
              className={`h-2.5 cursor-pointer rounded-full border-2 border-[var(--ink-surface)] transition-all duration-300 sm:h-3 ${
                idx === stepIndex
                  ? "w-7 bg-[var(--pearl-aqua)] sm:w-10"
                  : "w-2.5 bg-[var(--floral-white)] sm:w-3"
              }`}
            />
          ))}
        </div>

        {!isLastStep ? (
          <Button
            variant={slide.isDark ? "aqua" : "primary"}
            size="md"
            magnetic
            onClick={handleNext}
            className="font-display sm:min-h-[58px] sm:px-8 sm:text-xl"
          >
            <span>Next</span>
            <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        ) : (
          <Button
            variant="aqua"
            size="md"
            magnetic
            onClick={handleFinish}
            className="font-display sm:min-h-[58px] sm:px-8 sm:text-xl"
          >
            <span>Let&apos;s Go!</span>
            <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        )}
      </footer>
    </main>
  );
}
