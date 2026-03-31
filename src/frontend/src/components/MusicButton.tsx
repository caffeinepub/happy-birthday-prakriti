import { motion } from "motion/react";
import { useRef, useState } from "react";

// Full Happy Birthday song - both verses with proper timing
const NOTES = [
  // Verse 1: Happy Birthday to you
  264, 264, 297, 264, 352, 330,
  // Happy Birthday to you
  264, 264, 297, 264, 396, 352,
  // Happy Birthday dear Prakriti
  264, 264, 528, 440, 352, 330, 297,
  // Happy Birthday to you
  470, 470, 440, 352, 396, 352,
  // --- pause between verses ---
  // Verse 2: Happy Birthday to you
  264, 264, 297, 264, 352, 330,
  // Happy Birthday to you
  264, 264, 297, 264, 396, 352,
  // Happy Birthday dear Pihu
  264, 264, 528, 440, 352, 330, 297,
  // Happy Birthday to you
  470, 470, 440, 352, 396, 352,
];

const DURATIONS = [
  // Verse 1
  0.25, 0.25, 0.5, 0.5, 0.5, 1.0, 0.25, 0.25, 0.5, 0.5, 0.5, 1.0, 0.25, 0.25,
  0.5, 0.5, 0.5, 0.5, 1.0, 0.25, 0.25, 0.5, 0.5, 0.5, 1.2,
  // Verse 2
  0.25, 0.25, 0.5, 0.5, 0.5, 1.0, 0.25, 0.25, 0.5, 0.5, 0.5, 1.0, 0.25, 0.25,
  0.5, 0.5, 0.5, 0.5, 1.0, 0.25, 0.25, 0.5, 0.5, 0.5, 1.5,
];

export default function MusicButton() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopAll = () => {
    for (const osc of nodesRef.current) {
      try {
        osc.stop();
      } catch {}
    }
    nodesRef.current = [];
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPlaying(false);
  };

  const playMelody = async () => {
    if (playing) {
      stopAll();
      return;
    }

    if (!ctxRef.current || ctxRef.current.state === "closed") {
      ctxRef.current = new AudioContext();
    }
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") await ctx.resume();

    setPlaying(true);
    let time = ctx.currentTime + 0.05;

    // Small gap between verse 1 and verse 2
    const verse1End = 24; // notes index where verse 2 starts

    for (let i = 0; i < NOTES.length; i++) {
      // Insert a 0.8s pause between the two verses
      if (i === verse1End) time += 0.8;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(NOTES[i], time);
      gain.gain.setValueAtTime(0.22, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + DURATIONS[i] - 0.03);
      osc.start(time);
      osc.stop(time + DURATIONS[i]);
      nodesRef.current.push(osc);
      time += DURATIONS[i] + 0.04;
    }

    const totalDuration =
      DURATIONS.reduce((a, b) => a + b, 0) + NOTES.length * 0.04 + 1.5;
    timeoutRef.current = setTimeout(
      () => setPlaying(false),
      totalDuration * 1000,
    );
  };

  return (
    <motion.button
      type="button"
      onClick={playMelody}
      className="fixed bottom-24 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-gold transition-all duration-200"
      style={{
        background: playing
          ? "oklch(0.56 0.08 10)"
          : "linear-gradient(135deg, oklch(0.64 0.10 70), oklch(0.75 0.10 75))",
        boxShadow:
          "0 4px 20px oklch(0.64 0.10 70 / 0.5), inset 0 1px 0 oklch(0.85 0.08 80 / 0.4)",
        border: "3px solid oklch(0.98 0.008 80 / 0.6)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
      animate={playing ? { rotate: [0, 5, -5, 0] } : { rotate: 0 }}
      transition={
        playing ? { duration: 0.5, repeat: Number.POSITIVE_INFINITY } : {}
      }
      title={playing ? "Stop music" : "Play Happy Birthday for Prakriti! 🎵"}
      data-ocid="music.toggle"
    >
      {playing ? "🔇" : "🎵"}
    </motion.button>
  );
}
