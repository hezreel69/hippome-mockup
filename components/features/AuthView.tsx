"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useMnemoStore } from "@/context/MnemoStoreProvider";
import { playPop, unlockAudioContext } from "@/lib/sound";
import { BRAND_LIST, BrandLogo } from "@/components/mnemo/BrandLogo";
import { MnemoMark } from "@/components/mnemo/MnemoMark";
import { VoucherShowcase } from "@/components/mnemo/VoucherShowcase";
import { Marquee, SplitText } from "@/components/motion";
import { Badge, Button, ChevronRightIcon } from "@/components/ui";

type AuthMode = "register" | "login";

export function AuthView() {
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  const { isHydrated, activeUser, login, register, loginAsDemo } =
    useMnemoStore();

  const [mode, setMode] = useState<AuthMode>("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

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
          Preparing Mnemo...
        </p>
      </main>
    );
  }

  return (
    <main className="grid min-h-[100dvh] w-full bg-[var(--ground)] lg:grid-cols-12">
      {/* Left Poster Showcase (Midnight Ink) */}
      <section className="flex flex-col justify-between gap-8 border-b-2 border-[var(--ink-surface)] bg-[var(--ink-surface)] px-5 py-8 text-[var(--floral-white)] sm:px-8 lg:col-span-6 lg:border-r-2 lg:border-b-0 lg:px-10 lg:py-10">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <MnemoMark size={38} inverted />
            <span className="font-display text-2xl font-extrabold tracking-[-0.03em]">
              MNEMO
            </span>
          </div>

          <div className="space-y-4">
            <SplitText
              text="Study. Win. Repeat."
              by="word"
              stagger={0.08}
              className="text-display text-[var(--floral-white)]"
            />
            <p className="text-lg font-bold text-[#cfd6e8]">
              Pass quick quizzes and claim
            </p>
            <div className="relative inline-flex items-center gap-3">
              <motion.span
                aria-hidden="true"
                animate={
                  prefersReduced
                    ? undefined
                    : { scale: [1, 1.3, 1], rotate: [0, 15, 0] }
                }
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl text-[var(--pearl-aqua)]"
              >
                ✦
              </motion.span>
              <motion.div
                animate={
                  prefersReduced ? undefined : { rotate: [-2, 2, -2] }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                <SplitText
                  text="VOUCHERS!"
                  by="char"
                  stagger={0.045}
                  className="font-display text-[3.5rem] font-extrabold leading-none tracking-[-0.04em] text-[var(--pearl-aqua)] text-fat sm:text-[4.75rem]"
                />
              </motion.div>
              <motion.span
                aria-hidden="true"
                animate={
                  prefersReduced
                    ? undefined
                    : { scale: [1, 1.3, 1], rotate: [0, -15, 0] }
                }
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
                className="text-2xl text-[var(--periwinkle)]"
              >
                ✦
              </motion.span>
            </div>
          </div>
        </div>

        {/* Auto-Playing Static Voucher Carousel */}
        <div className="space-y-6">
          <VoucherShowcase />

          <div className="-mx-5 border-t border-[#2c3858] pt-4 sm:-mx-8 lg:-mx-10">
            <Marquee
              speed={22}
              items={BRAND_LIST.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--lavender)]"
                >
                  <BrandLogo brand={b} size={26} wobble={false} />
                  <span>{b}</span>
                </span>
              ))}
            />
          </div>
        </div>
      </section>

      {/* Right Auth Column */}
      <section className="flex flex-col justify-center px-5 py-8 sm:px-8 lg:col-span-6 lg:px-14 lg:py-10">
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
                {mode === "register" ? "Create your account" : "Welcome back"}
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {mode === "register"
                  ? "New here? Take a quick tour first."
                  : "Sign in to continue your quizzes and vouchers."}
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
                  placeholder="student@mnemo.my"
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

              {error && (
                <div
                  role="alert"
                  className="rounded-[14px] border-2 border-[var(--negative)] bg-[var(--pill-negative-bg)] px-3.5 py-2.5 text-xs font-bold text-[var(--pill-negative-ink)]"
                >
                  {error}
                </div>
              )}

              <Button type="submit" variant="aqua" fullWidth size="lg" magnetic>
                {mode === "register" ? "Create Account" : "Sign In"}
              </Button>
            </form>
          </motion.div>

          {/* Compact 1-Tap Demo Shortcuts */}
          <div className="sticker space-y-3 bg-[var(--raised)] p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="font-display text-base font-bold text-[var(--text)]">
                Quick demo profiles
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
                    Starts with the Mnemo intro and fresh check-ups
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
                    Sejarah 2/3 stamps, Maths Intermediate, 3 vouchers
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
