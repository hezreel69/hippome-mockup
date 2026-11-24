let sharedAudioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioCtx) return null;

  if (!sharedAudioContext) {
    sharedAudioContext = new AudioCtx();
  }

  if (sharedAudioContext.state === "suspended") {
    void sharedAudioContext.resume().catch(() => undefined);
  }

  return sharedAudioContext;
}

/**
 * Plays a short, soft pop sound for stamps, rewards, and kinetic transitions.
 * Safe no-op when muted, in SSR, or if browser blocks audio before user gesture.
 */
export function playPop(enabled = true): void {
  if (!enabled) return;

  const ctx = getAudioContext();
  if (!ctx || ctx.state !== "running") return;

  try {
    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(340, now);
    oscillator.frequency.exponentialRampToValueAtTime(680, now + 0.065);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.085);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.09);
  } catch {
    // Ignore audio synthesis errors in restricted browser contexts.
  }
}

export function unlockAudioContext(): void {
  getAudioContext();
}
