"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useHippomeStore } from "@/context/HippomeStoreProvider";
import { playPop, unlockAudioContext } from "@/lib/sound";
import { BRAND_LIST, BrandLogo } from "@/components/hippome/BrandLogo";
import { HippomeMark } from "@/components/hippome/HippomeMark";
import { HippomeAvatarSlot } from "@/components/hippome/HippomeAvatarSlot";
import { Marquee, SplitText, Sticker } from "@/components/motion";
import { Badge, Button, ChevronRightIcon } from "@/components/ui";

type AuthMode = "register" | "login";

const TICKET_PREVIEW = [
  { brand: "Mixue", value: "RM5", tier: "Beginner pass" },
  { brand: "ZUS Coffee", value: "RM10", tier: "Intermediate pass" },
  { brand: "CHAGEE", value: "RM20", tier: "Advanced pass" },
  { brand: "TNG eWallet", value: "RM50", tier: "Level-up bonus" },
] as const;

export function AuthView() {
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  const { isHydrated, activeUser, login, register, loginAsDemo } =
    useHippomeStore();

  const [mode, setMode] = useState<AuthMode>("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [activeTicket, setActiveTicket] = useState<number>(3);

  useEffect(() => {
    if (!isHydrated || !activeUser) return;
    router.replace(
      activeUser.hasCompletedOnboarding ? "/dashboard" : "/onboarding"
    );
  }, [isHydrated, activeUser, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    unlockAudioContext();
    playPop(true);
    setError(null);

    if (mode === "register") {
      const result = register(name, email, password);
      if (!result.ok) {
        setError(result.error ?? "Unable to create your account.");
        return;
      }
      router.push("/onboarding");
      return;
    }

    const result = login(email, password);
    if (!result.ok || !result.user) {
      setError(result.error ?? "Unable to sign in.");
      return;
    }

    router.push(
      result.user.hasCompletedOnboarding ? "/dashboard" : "/onboarding"
    );
  };

  const handleDemoLogin = (demoMode: "new" | "returning") => {
    unlockAudioContext();
    playPop(true);
    const user = loginAsDemo(demoMode);
    router.push(user.hasCompletedOnboarding ? "/dashboard" : "/onboarding");
  };

  if (!isHydrated) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--ground)] p-6">
        <p className="font-display text-lg font-bold text-[var(--muted)]">
          Preparing Hippome...
        </p>
      </main>
    );
  }

  return (
    <main className="grid min-h-[100dvh] w-full bg-[var(--ground)] lg:grid-cols-12">
      {/* Left Poster Showcase (Midnight Ink) */}
      <section className="flex flex-col justify-between gap-8 border-b-2 border-[var(--ink-surface)] bg-[var(--ink-surface)] px-5 py-8 text-[var(--floral-white)] sm:px-8 lg:col-span-5 lg:border-r-2 lg:border-b-0 lg:px-10 lg:py-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <HippomeMark size={36} inverted />
              <span className="font-display text-xl font-extrabold tracking-[-0.03em]">
                HIPPOME
              </span>
            </div>
            <Sticker tone="aqua" tilt={2}>
              <span className="text-micro">Form 5 SPM</span>
            </Sticker>
          </div>

          <div className="flex flex-col items-start gap-5">
            <HippomeAvatarSlot expression="happy" size="lg" floating onDark />
            <div className="space-y-3">
              <SplitText
                text="Study. Win. Repeat."
                by="word"
                stagger={0.08}
                className="text-display text-[var(--floral-white)]"
              />
              <p className="max-w-md text-sm font-medium leading-relaxed text-[#cfd6e8]">
                Pass 5-question quizzes matched to your level in Sejarah, BM,
                English, Maths, and Science to claim real Malaysian vouchers.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Reward Preview */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {TICKET_PREVIEW.map((ticket, idx) => {
              const isSelected = activeTicket === idx;
              return (
                <button
                  key={ticket.brand}
                  type="button"
                  onClick={() => setActiveTicket(idx)}
                  onMouseEnter={() => setActiveTicket(idx)}
                  className={`flex min-h-[82px] cursor-pointer flex-col justify-between rounded-[20px] border-2 p-3 text-left transition-transform duration-150 ${
                    isSelected
                      ? "-translate-y-1 border-[var(--pearl-aqua)] bg-[var(--ink-surface-raised)] shadow-[4px_4px_0_var(--pearl-aqua)]"
                      : "border-[#2e3b5c] bg-[#212b45] hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <BrandLogo brand={ticket.brand} size={26} wobble={false} />
                    <span className="font-display num rounded-full bg-[var(--pearl-aqua)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--ink-surface)]">
                      {ticket.value}
                    </span>
                  </div>
                  <div className="pt-1">
                    <p className="truncate text-xs font-bold text-[var(--floral-white)]">
                      {ticket.brand}
                    </p>
                    <p className="text-[11px] text-[#c3cce0]">{ticket.tier}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="-mx-5 border-t border-[#2c3858] pt-4 sm:-mx-8 lg:-mx-10">
            <Marquee
              speed={22}
              items={BRAND_LIST.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[var(--lavender)]"
                >
                  <BrandLogo brand={b} size={22} wobble={false} />
                  <span>{b}</span>
                </span>
              ))}
            />
          </div>
        </div>
      </section>

      {/* Right Auth Column */}
      <section className="flex flex-col justify-center px-5 py-8 sm:px-8 lg:col-span-7 lg:px-14 lg:py-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <motion.div
            initial={prefersReduced ? false : { rotate: -1, y: 12, opacity: 0 }}
            animate={{ rotate: -1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="sticker space-y-5 bg-[var(--surface)] p-6 sm:p-7"
          >
            {/* Sliding Segmented Control */}
            <div className="relative grid grid-cols-2 rounded-full border-2 border-[var(--ink-surface)] bg-[var(--raised)] p-1">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full border-2 border-[var(--ink-surface)] bg-[var(--pearl-aqua)] transition-[transform] duration-250 ease-out"
                style={{
                  transform:
                    mode === "register" ? "translateX(0%)" : "translateX(100%)",
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError(null);
                }}
                className="relative z-10 min-h-[40px] cursor-pointer rounded-full text-sm font-bold text-[var(--ink-surface)]"
              >
                New Student
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
                className="relative z-10 min-h-[40px] cursor-pointer rounded-full text-sm font-bold text-[var(--ink-surface)]"
              >
                Sign In
              </button>
            </div>

            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[var(--text)]">
                {mode === "register"
                  ? "Create your Form 5 account"
                  : "Sign in to your study pass"}
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {mode === "register"
                  ? "First-time students meet Hippome for a quick tour before starting."
                  : "Jump straight back to your subjects and voucher wallet."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div>
                  <label
                    htmlFor="auth-name"
                    className="text-micro mb-1.5 block text-[var(--text)]"
                  >
                    Full name
                  </label>
                  <input
                    id="auth-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Amirul Hakim"
                    className="min-h-[46px] w-full rounded-[14px] border-2 border-[var(--ink-surface)] bg-[var(--ground)] px-3.5 text-sm font-medium text-[var(--text)] placeholder:text-[var(--faint)]"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="auth-email"
                  className="text-micro mb-1.5 block text-[var(--text)]"
                >
                  Email address
                </label>
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@spm.my"
                  className="min-h-[46px] w-full rounded-[14px] border-2 border-[var(--ink-surface)] bg-[var(--ground)] px-3.5 text-sm font-medium text-[var(--text)] placeholder:text-[var(--faint)]"
                />
              </div>

              <div>
                <label
                  htmlFor="auth-password"
                  className="text-micro mb-1.5 block text-[var(--text)]"
                >
                  Password
                </label>
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Any password works in mockup"
                  className="min-h-[46px] w-full rounded-[14px] border-2 border-[var(--ink-surface)] bg-[var(--ground)] px-3.5 text-sm font-medium text-[var(--text)] placeholder:text-[var(--faint)]"
                />
              </div>

              {mode === "register" && (
                <div className="flex items-center justify-between rounded-[14px] border-2 border-[var(--ink-surface)] bg-[var(--periwinkle-soft)] px-3.5 py-2.5 text-xs text-[var(--ink-surface)]">
                  <span className="font-semibold">Exam track</span>
                  <strong className="font-extrabold">Form 5 (SPM KSSM)</strong>
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="rounded-[14px] border-2 border-[var(--negative)] bg-[var(--pill-negative-bg)] px-3.5 py-2.5 text-xs font-bold text-[var(--pill-negative-ink)]"
                >
                  {error}
                </div>
              )}

              <Button type="submit" variant="aqua" fullWidth size="lg" magnetic>
                {mode === "register"
                  ? "Create Account & Meet Hippome"
                  : "Sign In to Study Home"}
              </Button>
            </form>
          </motion.div>

          {/* Compact 1-Tap Demo Shortcuts */}
          <div className="sticker space-y-3 bg-[var(--raised)] p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="font-display text-base font-bold text-[var(--text)]">
                Instant demo profiles
              </p>
              <Badge tone="info">Local preview</Badge>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin("new")}
                className="pressable flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-3 rounded-[18px] border-2 border-[var(--ink-surface)] bg-[var(--surface)] px-4 py-3 text-left shadow-[3px_3px_0_var(--ink-surface)] hover:bg-[var(--accent-soft)]"
              >
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-[var(--text)]">
                    Daniel Lim (New student)
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    Starts at the Hippome intro and fresh diagnostics
                  </p>
                </div>
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-[var(--ink-surface)]" />
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin("returning")}
                className="pressable flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-3 rounded-[18px] border-2 border-[var(--ink-surface)] bg-[var(--surface)] px-4 py-3 text-left shadow-[3px_3px_0_var(--ink-surface)] hover:bg-[var(--periwinkle-soft)]"
              >
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-[var(--text)]">
                    Aisyah Rahman (Returning student)
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    Sejarah 2/3 passes, Maths Intermediate, 3 vouchers
                  </p>
                </div>
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-[var(--ink-surface)]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
