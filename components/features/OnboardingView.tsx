"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useHippomeStore } from "@/context/HippomeStoreProvider";
import { SPM_SUBJECTS } from "@/data/subjects";
import { playPop, unlockAudioContext } from "@/lib/sound";
import { BrandLogo } from "@/components/hippome/BrandLogo";
import { HippomeMark } from "@/components/hippome/HippomeMark";
import {
  HippomeAvatarSlot,
} from "@/components/hippome/HippomeAvatarSlot";
import { HippomeExpression } from "@/lib/avatar-config";
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
  title: (firstName: string) => string;
  highlightWord: string;
  expression: HippomeExpression;
  dialogue: (firstName: string) => string;
  preview: "subjects" | "diagnostic" | "vouchers" | "milestone";
}

const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: "welcome",
    stageBg: "bg-[var(--floral-white)] text-[var(--ink-surface)]",
    title: (name) => `Eh ${name}, welcome!`,
    highlightWord: "welcome!",
    expression: "happy",
    dialogue: (name) =>
      `Wei ${name}! Hippome ni untuk Form 5 SPM budak-budak je. Quiz 5 soalan, lepas tu dapat voucher betul. No cap, confirm worth it!`,
    preview: "subjects",
  },
  {
    id: "placement",
    stageBg: "bg-[var(--periwinkle)] text-[var(--ink-surface)]",
    title: () => "Sikit je test dulu",
    highlightWord: "test",
    expression: "thinking",
    dialogue: () =>
      "First time buka subject, I bagi 6 soalan quick. Chill, bukan exam pun. Nanti tahu level kau, Beginner, Intermediate ke Advanced, and topik mana kau lemah sikit.",
    preview: "diagnostic",
  },
  {
    id: "vouchers",
    stageBg: "bg-[var(--pearl-aqua)] text-[var(--ink-surface)]",
    title: () => "Lulus = dapat voucher",
    highlightWord: "voucher",
    expression: "celebrating",
    dialogue: () =>
      "Pilih topik, I generate 5 soalan fresh. Score 3 atas 5 je dah lulus! Boleh dapat TNG, ZUS, CHAGEE, Mixue, 7-Eleven. Tak lulus? Takpe, cuba lagi, soalan baru.",
    preview: "vouchers",
  },
  {
    id: "levelup",
    stageBg: "bg-[var(--ink-surface)] text-[var(--floral-white)]",
    isDark: true,
    title: () => "Level up, duit naik",
    highlightWord: "duit naik",
    expression: "encouraging",
    dialogue: () =>
      "3 kali lulus dalam satu subject, stamp penuh, kau naik level! Bonus gila: RM30, RM50, sampai RM100 untuk Grand Mastery. Gaskan bro!",
    preview: "milestone",
  },
];

function KineticSpeech({
  text,
  isDark = false,
  onSpeakingChange,
}: {
  text: string;
  isDark?: boolean;
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
    const durationMs = Math.min(2800, words.length * 60 + 250);
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
      className={`sticker relative cursor-pointer p-5 sm:p-6 ${
        isDark
          ? "bg-[var(--ink-surface-raised)] text-[var(--floral-white)] border-[var(--pearl-aqua)] shadow-[6px_6px_0_var(--pearl-aqua)]"
          : "bg-[var(--surface)] text-[var(--ink-surface)]"
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span
          className={`text-micro ${
            isDark ? "text-[var(--pearl-aqua)]" : "text-[var(--muted)]"
          }`}
        >
          Hippome cakap
        </span>
        {!skipped && !prefersReduced && (
          <span className="text-[11px] font-semibold opacity-60">
            Tap to skip
          </span>
        )}
      </div>

      <p className="font-display text-lg font-bold leading-snug sm:text-xl">
        {words.map((word, idx) => {
          const isEmphasised =
            /^(SPM|RM30|RM50|RM100|TNG|ZUS|CHAGEE|Mixue|7-Eleven|No|confirm|Gaskan)$/i.test(
              word.replace(/[.,!?]/g, "")
            );
          if (prefersReduced || skipped) {
            return (
              <span
                key={`${idx}-${word}`}
                className={`inline-block mr-1.5 ${
                  isEmphasised
                    ? "rounded-md bg-[var(--pearl-aqua)] px-1.5 text-[var(--ink-surface)]"
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
              className={`inline-block mr-1.5 ${
                isEmphasised
                  ? "rounded-md bg-[var(--pearl-aqua)] px-1.5 text-[var(--ink-surface)]"
                  : ""
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
}

function SlideOrbitStickers({
  preview,
}: {
  preview: OnboardingSlide["preview"];
}) {
  if (preview === "subjects") {
    return (
      <div className="flex flex-wrap gap-2.5">
        {SPM_SUBJECTS.map((s, i) => (
          <Sticker
            key={s.id}
            tone={i % 2 === 0 ? "aqua" : "periwinkle"}
            tilt={i % 2 === 0 ? -2.5 : 2.5}
          >
            <span className="text-xs font-extrabold">{s.name}</span>
            <span className="num text-[11px] opacity-75">{s.spmCode}</span>
          </Sticker>
        ))}
      </div>
    );
  }

  if (preview === "diagnostic") {
    return (
      <div className="flex flex-wrap gap-3">
        <Sticker tone="aqua" tilt={-3}>
          <span className="font-display text-sm font-extrabold">
            Beginner · RM5
          </span>
        </Sticker>
        <Sticker tone="floral" tilt={2}>
          <span className="font-display text-sm font-extrabold">
            Intermediate · RM10
          </span>
        </Sticker>
        <Sticker tone="ink" tilt={-2}>
          <span className="font-display text-sm font-extrabold text-[var(--pearl-aqua)]">
            Advanced · RM20
          </span>
        </Sticker>
      </div>
    );
  }

  if (preview === "vouchers") {
    const brands = ["TNG eWallet", "ZUS Coffee", "CHAGEE", "Mixue", "7-Eleven"];
    return (
      <div className="flex flex-wrap items-center gap-3">
        {brands.map((brand, i) => (
          <Sticker key={brand} tone="floral" tilt={i % 2 === 0 ? -3 : 3}>
            <BrandLogo brand={brand} size={26} wobble={false} />
            <span className="font-display text-xs font-extrabold">{brand}</span>
          </Sticker>
        ))}
      </div>
    );
  }

  return (
    <div className="sticker inline-flex flex-wrap items-center gap-4 bg-[var(--floral-white)] p-4 text-[var(--ink-surface)]">
      <StampTrack
        passedCount={2}
        targetCount={3}
        rewardLabel="1 lagi untuk RM30"
        animateLatest
      />
      <Badge tone="ink">RM30 · RM50 · RM100</Badge>
    </div>
  );
}

export function OnboardingView() {
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  const { isHydrated, activeUser, completeOnboarding } = useHippomeStore();
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
          Loading Hippome intro...
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
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 pt-5 pb-3 sm:px-8">
        <div className="flex items-center gap-2.5">
          <HippomeMark size={34} inverted={slide.isDark} />
          <span className="font-display text-lg font-extrabold tracking-[-0.03em]">
            HIPPOME TOUR
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-display num text-xl font-extrabold tracking-[-0.03em]">
            0{stepIndex + 1} / 0{ONBOARDING_SLIDES.length}
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

      {/* Main Kinetic Stage */}
      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-5 py-6 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -14 }}
            transition={{ duration: 0.28 }}
            className="grid w-full items-center gap-8 md:grid-cols-12"
          >
            {/* Avatar Left */}
            <div className="flex flex-col items-center md:col-span-5">
              <HippomeAvatarSlot
                expression={slide.expression}
                size="mega"
                floating
                talking={isTalking}
                onDark={slide.isDark}
              />
            </div>

            {/* Huge Typography + Talking Bubble + Orbit Stickers Right */}
            <div className="space-y-6 md:col-span-7">
              <div className="relative">
                <SplitText
                  key={`title-${slide.id}`}
                  text={slide.title(firstName)}
                  by="word"
                  stagger={0.055}
                  className="text-mega"
                />
                {/* Animated Scribble Underline */}
                <svg
                  viewBox="0 0 260 18"
                  fill="none"
                  className="mt-2 h-4 w-52 sm:w-72"
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
              </div>

              <KineticSpeech
                key={slide.id}
                text={slide.dialogue(firstName)}
                isDark={slide.isDark}
                onSpeakingChange={setIsTalking}
              />

              <SlideOrbitStickers preview={slide.preview} />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Footer Controls */}
      <footer className="pb-safe-dock relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 pt-3 pb-7 sm:px-8">
        <Button
          variant="outline"
          size="lg"
          disabled={stepIndex === 0}
          onClick={handleBack}
        >
          Back
        </Button>

        <div className="flex items-center gap-2">
          {ONBOARDING_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => {
                unlockAudioContext();
                setStepIndex(idx);
              }}
              className={`h-3 cursor-pointer rounded-full border-2 border-[var(--ink-surface)] transition-all duration-300 ${
                idx === stepIndex
                  ? "w-10 bg-[var(--pearl-aqua)]"
                  : "w-3 bg-[var(--floral-white)]"
              }`}
            />
          ))}
        </div>

        {!isLastStep ? (
          <Button
            variant={slide.isDark ? "aqua" : "primary"}
            size="xl"
            magnetic
            onClick={handleNext}
          >
            <span>Next</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            variant="aqua"
            size="xl"
            magnetic
            onClick={handleFinish}
          >
            <span>Jom Study!</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        )}
      </footer>
    </main>
  );
}
