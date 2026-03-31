import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useCountdown } from "../hooks/useCountdown";

const BIRTHDAY = new Date(2026, 3, 2);

const CONFETTI_COLORS = [
  "oklch(0.64 0.10 70)",
  "oklch(0.56 0.08 10)",
  "oklch(0.75 0.10 75)",
  "oklch(0.90 0.10 100)",
  "oklch(0.70 0.12 350)",
  "oklch(0.80 0.08 50)",
];

function BurstConfetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((i) => {
        const angle = (i / pieces.length) * 360;
        const distance = 120 + Math.random() * 160;
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const size = 6 + Math.random() * 8;
        const delay = Math.random() * 0.3;
        return (
          <motion.div
            key={i}
            className="absolute rounded-sm"
            style={{
              width: size,
              height: size,
              background: color,
              top: "50%",
              left: "50%",
              transformOrigin: "center",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * distance,
              y: Math.sin((angle * Math.PI) / 180) * distance,
              opacity: [1, 1, 0],
              scale: [1, 1.2, 0],
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            }}
            transition={{
              duration: 1.2 + Math.random() * 0.8,
              delay,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}

export default function BirthdaySurpriseModal() {
  const [show, setShow] = useState(false);
  const { isPast } = useCountdown(BIRTHDAY);

  useEffect(() => {
    const today = new Date();
    const isBirthdayToday = today.getMonth() === 3 && today.getDate() === 2;
    if (
      (isBirthdayToday || isPast) &&
      !sessionStorage.getItem("bd_surprise_shown")
    ) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isPast]);

  const close = () => {
    sessionStorage.setItem("bd_surprise_shown", "1");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "oklch(0.10 0.01 42 / 0.85)" }}
          onClick={close}
          data-ocid="birthday.modal"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 180 }}
            className="relative rounded-3xl p-10 md:p-14 text-center max-w-md w-full overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.98 0.008 80), oklch(0.95 0.035 15))",
              boxShadow: "0 20px 80px oklch(0.64 0.10 70 / 0.5)",
              border: "3px solid oklch(0.64 0.10 70 / 0.4)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <BurstConfetti />

            <motion.div
              className="text-7xl mb-4 relative z-10"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 0.5,
              }}
            >
              🎂
            </motion.div>

            <h2
              className="font-playfair font-bold text-3xl md:text-4xl mb-3 relative z-10"
              style={{ color: "oklch(0.64 0.10 70)" }}
            >
              🎉 HAPPY BIRTHDAY
            </h2>
            <h3
              className="font-playfair font-bold text-2xl md:text-3xl mb-5 relative z-10"
              style={{ color: "oklch(0.20 0.018 42)" }}
            >
              PRAKRITI! 🎉
            </h3>

            <p
              className="font-inter text-base leading-relaxed mb-8 relative z-10"
              style={{ color: "oklch(0.30 0.02 42)" }}
            >
              Today is YOUR day, bestie! 🌟 The Aayu and Pihu Show fam and
              everyone who loves you is sending you all the joy, laughs, and
              love in the world! May this year be your most amazing one yet!
              💛✨
            </p>

            <button
              type="button"
              onClick={close}
              className="gold-btn text-white font-inter font-semibold text-sm tracking-wider uppercase px-10 py-3 rounded-full relative z-10"
              data-ocid="birthday.close_button"
            >
              Let's Celebrate! 🎊
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
