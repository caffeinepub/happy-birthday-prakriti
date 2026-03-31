import {
  Cake,
  Gift,
  Heart,
  Music,
  Sparkles,
  Star,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";

const MILESTONES = [
  {
    year: "The Beginning",
    title: "The Day the World Got Brighter 🌅",
    description:
      "On a beautiful April 2nd, Prakriti Kalra arrived and the whole family instantly knew — this girl is going to be something special! And boy, were they right. The world got a LOT more fun that day!",
    icon: Cake,
    color: "oklch(0.64 0.10 70)",
    bg: "oklch(0.90 0.04 15)",
    emoji: "🌅",
  },
  {
    year: "Early Days",
    title: "Born for the Camera ✨",
    description:
      "Even before the Aayu and Pihu Show blew up, Prakriti was already a natural in front of cameras. That infectious smile, the energy, the giggles — totally unscripted and completely iconic from day one!",
    icon: Sparkles,
    color: "oklch(0.56 0.08 10)",
    bg: "oklch(0.93 0.02 88)",
    emoji: "✨",
  },
  {
    year: "YouTube Life",
    title: "Aayu & Pihu Show Goes VIRAL 🚀",
    description:
      "The Aayu and Pihu Show became one of India's biggest family YouTube channels — and Prakriti was right there, bringing the fun. Millions of subscribers, crazy challenges, epic vlogs, and SO much laughter. All because of this family!",
    icon: Youtube,
    color: "oklch(0.64 0.10 70)",
    bg: "oklch(0.94 0.020 86)",
    emoji: "🎬",
  },
  {
    year: "Growing Up",
    title: "From Kid to Total Queen 👑",
    description:
      "Watching Prakriti grow up has been the most wholesome thing ever. She went from adorable kid content creator to an absolutely amazing young woman — still with that same spark, still making millions smile every single day!",
    icon: Star,
    color: "oklch(0.56 0.08 10)",
    bg: "oklch(0.90 0.04 15)",
    emoji: "👑",
  },
  {
    year: "Best Year Yet",
    title: "Milestones & Memorable Moments 🏆",
    description:
      "From school life to YouTube adventures, from family challenges to making friends across the country — Prakriti has done it ALL. Every chapter has been better than the last, and she handles every moment like a total champ!",
    icon: Heart,
    color: "oklch(0.64 0.10 70)",
    bg: "oklch(0.93 0.02 88)",
    emoji: "🏆",
  },
  {
    year: "April 2026",
    title: "A New Chapter Begins! 🎉",
    description:
      "Another birthday, another year of being absolutely amazing on AND off camera. Your squad is here, your fans are cheering, and the whole Aayu and Pihu Show universe is celebrating. Here's to your most iconic year yet, Prakriti! 🥳",
    icon: Gift,
    color: "oklch(0.56 0.08 10)",
    bg: "oklch(0.90 0.04 15)",
    emoji: "🎁",
  },
];

export default function Timeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <section
        className="py-16 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.90 0.04 15) 0%, oklch(0.951 0.022 88) 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, oklch(0.64 0.10 70 / 0.08) 0%, transparent 50%)",
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-inter text-xs font-semibold tracking-widest uppercase mb-3 relative z-10"
          style={{ color: "oklch(0.54 0.07 12)" }}
        >
          🎈 Prakriti's Journey
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-playfair font-bold text-4xl md:text-5xl mb-4 relative z-10"
          style={{ color: "oklch(0.20 0.018 42)" }}
        >
          The Iconic Timeline 🌟
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-inter text-base relative z-10"
          style={{ color: "oklch(0.45 0.03 40)" }}
        >
          From day one to YouTube stardom — Prakriti's incredible story 🎬
        </motion.p>
      </section>

      {/* Timeline */}
      <section
        className="py-16 px-4"
        style={{ background: "oklch(0.951 0.022 88)" }}
        data-ocid="timeline.section"
      >
        <div className="max-w-4xl mx-auto">
          {/* Desktop: Horizontal timeline */}
          <div className="hidden md:block">
            {/* Connector line */}
            <div className="relative mb-8">
              <div
                className="absolute top-8 left-0 right-0 h-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.64 0.10 70), oklch(0.56 0.08 10), oklch(0.64 0.10 70))",
                }}
              />
              <div className="flex justify-between">
                {MILESTONES.map((m, i) => (
                  <motion.div
                    key={m.year}
                    className="flex flex-col items-center"
                    style={{ width: `${100 / MILESTONES.length}%` }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center relative z-10 text-2xl"
                      style={{
                        background: m.bg,
                        border: `3px solid ${m.color}`,
                        boxShadow: `0 4px 16px ${m.color}40`,
                      }}
                    >
                      {m.emoji}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cards */}
            <div className="flex gap-4">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={`${m.year}-card`}
                  className="flex-1 rounded-2xl p-5"
                  style={{
                    background: m.bg,
                    border: "1px solid oklch(0.88 0.02 80)",
                    boxShadow: "0 4px 16px oklch(0.20 0.018 42 / 0.08)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.2 }}
                  data-ocid={`timeline.item.${i + 1}`}
                >
                  <p
                    className="font-inter text-xs font-semibold tracking-widest uppercase mb-2"
                    style={{ color: m.color }}
                  >
                    {m.year}
                  </p>
                  <h3
                    className="font-playfair font-bold text-sm md:text-base mb-3 leading-snug"
                    style={{ color: "oklch(0.20 0.018 42)" }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="font-inter text-xs leading-relaxed"
                    style={{ color: "oklch(0.45 0.03 40)" }}
                  >
                    {m.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical timeline */}
          <div className="md:hidden flex flex-col gap-6">
            {MILESTONES.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={`${m.year}-mobile`}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  data-ocid={`timeline.mobile.item.${i + 1}`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: m.bg,
                        border: `2px solid ${m.color}`,
                      }}
                    >
                      <Icon size={18} style={{ color: m.color }} />
                    </div>
                    {i < MILESTONES.length - 1 && (
                      <div
                        className="w-0.5 flex-1 mt-2"
                        style={{ background: "oklch(0.88 0.02 80)" }}
                      />
                    )}
                  </div>

                  <div
                    className="flex-1 rounded-2xl p-4 mb-2"
                    style={{
                      background: m.bg,
                      border: "1px solid oklch(0.88 0.02 80)",
                    }}
                  >
                    <p
                      className="font-inter text-xs font-semibold tracking-widest uppercase mb-1"
                      style={{ color: m.color }}
                    >
                      {m.year}
                    </p>
                    <h3
                      className="font-playfair font-bold text-base mb-2"
                      style={{ color: "oklch(0.20 0.018 42)" }}
                    >
                      {m.title}
                    </h3>
                    <p
                      className="font-inter text-sm leading-relaxed"
                      style={{ color: "oklch(0.45 0.03 40)" }}
                    >
                      {m.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* YouTube Banner */}
      <section
        className="py-12 px-4 text-center"
        style={{ background: "oklch(0.90 0.04 15)" }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Music size={24} style={{ color: "oklch(0.64 0.10 70)" }} />
            <h2
              className="font-playfair font-bold text-2xl md:text-3xl"
              style={{ color: "oklch(0.20 0.018 42)" }}
            >
              Every Year, a New Adventure!
            </h2>
            <Music size={24} style={{ color: "oklch(0.64 0.10 70)" }} />
          </motion.div>
          <p
            className="font-inter text-base"
            style={{ color: "oklch(0.45 0.03 40)" }}
          >
            From family vlogs to birthday bashes — every chapter with Prakriti
            is better than the last. Can't wait to see what this new year brings
            for our favourite Aayu and Pihu Show star! 🎬🎉
          </p>
          <div className="mt-6 text-4xl animate-float">🎂</div>
        </div>
      </section>
    </motion.div>
  );
}
