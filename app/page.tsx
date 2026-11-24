"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHippomeStore } from "@/context/HippomeStoreProvider";
import { HippomeMark } from "@/components/hippome/HippomeMark";
import { Blob, Marquee, SplitText } from "@/components/motion";

export default function HomePage() {
  const router = useRouter();
  const { isHydrated, activeUser } = useHippomeStore();

  useEffect(() => {
    if (!isHydrated) return;

    const timer = window.setTimeout(() => {
      if (!activeUser) {
        router.replace("/auth");
        return;
      }

      if (!activeUser.hasCompletedOnboarding) {
        router.replace("/onboarding");
        return;
      }

      router.replace("/dashboard");
    }, 350);

    return () => window.clearTimeout(timer);
  }, [isHydrated, activeUser, router]);

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[var(--ground)] p-6">
      <Blob
        color="aqua"
        size={420}
        className="absolute -top-24 -left-24"
        parallax={0}
      />
      <Blob
        color="periwinkle"
        size={380}
        className="absolute -right-24 -bottom-24"
        parallax={0}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <HippomeMark size={68} />
        <SplitText
          text="HIPPOME"
          by="char"
          stagger={0.04}
          className="text-mega text-[var(--ink-surface)]"
        />
        <div className="w-72 border-y-2 border-[var(--ink-surface)] bg-[var(--pearl-aqua)] py-1.5 sm:w-96">
          <Marquee
            speed={14}
            items={[
              <span key="1" className="text-micro">
                SPM 2026 ✦
              </span>,
              <span key="2" className="text-micro">
                REAL VOUCHERS ✦
              </span>,
              <span key="3" className="text-micro">
                NO CAP ✦
              </span>,
            ]}
          />
        </div>
      </div>
    </main>
  );
}
