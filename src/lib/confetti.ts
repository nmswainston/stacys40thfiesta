import confetti from "canvas-confetti";

/**
 * Lightweight confetti burst utility
 * Subtle animation with < 800ms duration
 */
export function fireConfetti() {
  const duration = 600;
  const end = Date.now() + duration;
  const colors = ["#b48a3c", "#0b3a63", "#f3f1ea"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
      ticks: 100,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
      ticks: 100,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

