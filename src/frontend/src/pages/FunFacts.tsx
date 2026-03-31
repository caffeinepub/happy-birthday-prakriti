import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const FUN_FACTS = [
  {
    num: "01",
    emoji: "📺",
    title: "She's a YouTube OG!",
    fact: "Prakriti has been part of the Aayu and Pihu Show since it was just a tiny family channel — and she watched it grow into one of the BIGGEST family YouTube channels in all of India. That's literally insane!! 🚀",
    color: "oklch(0.90 0.04 15)",
    accent: "oklch(0.64 0.10 70)",
  },
  {
    num: "02",
    emoji: "🎬",
    title: "Camera is Her BFF",
    fact: "Most people get super awkward in front of cameras. Not Prakriti! She's been in front of cameras her whole life and honestly looks like she was BORN for it. Natural content creator energy? She invented it! 💁‍♀️",
    color: "oklch(0.93 0.02 88)",
    accent: "oklch(0.56 0.08 10)",
  },
  {
    num: "03",
    emoji: "😂",
    title: "Prank Queen Supreme",
    fact: "The Aayu and Pihu Show is FAMOUS for their wild pranks and challenges — and Prakriti has either pulled some legendary pranks OR been the victim of absolutely hilarious ones. Either way, she always makes it iconic! 🏆",
    color: "oklch(0.94 0.020 86)",
    accent: "oklch(0.45 0.03 40)",
  },
  {
    num: "04",
    emoji: "🎂",
    title: "April 2nd = The Best Day Ever",
    fact: "Her birthday is April 2nd — which means she's an Aries! And honestly? Everything about being an Aries fits perfectly: bold, energetic, full of fire, and always up for an adventure. Aries queen behaviour! ♈",
    color: "oklch(0.90 0.04 15)",
    accent: "oklch(0.64 0.10 70)",
  },
  {
    num: "05",
    emoji: "👨‍👩‍👧‍👦",
    title: "Family is Everything",
    fact: "The whole Aayu and Pihu Show is built on genuine family love — and Prakriti is a huge part of that heart. The bond between Aayu, Pihu, and the whole family makes the channel feel like home for millions of viewers! 🏡",
    color: "oklch(0.93 0.02 88)",
    accent: "oklch(0.56 0.08 10)",
  },
  {
    num: "06",
    emoji: "🌟",
    title: "Millions of Fans Love Her!",
    fact: "The Aayu and Pihu Show has TENS OF MILLIONS of subscribers — and Prakriti is one of the reasons people keep coming back. That's a crazy amount of people whose day she's made better just by being herself! 🤯",
    color: "oklch(0.94 0.020 86)",
    accent: "oklch(0.45 0.03 40)",
  },
  {
    num: "07",
    emoji: "⚡",
    title: "Unlimited Energy Supply",
    fact: "Seriously, HOW does she have so much energy?! Whether it's a challenge video that runs for hours or a crazy outdoor vlog — Prakriti is ALWAYS giving 100%. Someone please share the secret, we're exhausted just watching! 😂",
    color: "oklch(0.90 0.04 15)",
    accent: "oklch(0.64 0.10 70)",
  },
  {
    num: "08",
    emoji: "🎯",
    title: "Always Up for a Challenge",
    fact: "Scary challenge? She'll try it. Impossible dare? She's in. Weird food combo? Watch her eat it! Prakriti never backs down from a challenge and that's exactly why she's everyone's favourite on the channel! 💪",
    color: "oklch(0.93 0.02 88)",
    accent: "oklch(0.56 0.08 10)",
  },
  {
    num: "09",
    emoji: "🎤",
    title: "Voice of Pure Joy",
    fact: "Her laugh is genuinely contagious — like, you CANNOT watch her crack up without joining in. It's scientifically proven (probably) that one Prakriti giggle = instant mood boost. Patent pending! 😄",
    color: "oklch(0.94 0.020 86)",
    accent: "oklch(0.45 0.03 40)",
  },
  {
    num: "10",
    emoji: "🌈",
    title: "Growing Up Iconic",
    fact: "She's grown up literally on-camera and handled it with SO much grace, fun, and realness. Most kids would be terrified — Prakriti just made it look like the coolest childhood ever. Absolute legend behaviour! 👑",
    color: "oklch(0.90 0.04 15)",
    accent: "oklch(0.64 0.10 70)",
  },
];

export default function FunFacts() {
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
              "radial-gradient(circle at 30% 70%, oklch(0.64 0.10 70 / 0.10) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.56 0.08 10 / 0.08) 0%, transparent 50%)",
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-inter text-xs font-semibold tracking-widest uppercase mb-3 relative z-10"
          style={{ color: "oklch(0.54 0.07 12)" }}
        >
          ⚡ Did You Know?
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-playfair font-bold text-4xl md:text-5xl mb-4 relative z-10"
          style={{ color: "oklch(0.20 0.018 42)" }}
        >
          Fun Facts About Prakriti 🌟
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-inter text-base relative z-10 max-w-xl mx-auto"
          style={{ color: "oklch(0.45 0.03 40)" }}
        >
          10 things that make our favourite Aayu and Pihu Show star absolutely
          one-of-a-kind! 🎬✨
        </motion.p>

        {/* YouTube Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-full font-inter text-sm font-bold relative z-10"
          style={{
            background: "oklch(0.64 0.10 70)",
            color: "white",
            boxShadow: "0 4px 16px oklch(0.64 0.10 70 / 0.4)",
          }}
        >
          ⭐ As Seen on Aayu and Pihu Show
        </motion.div>
      </section>

      {/* Facts Grid */}
      <section
        className="py-16 px-4"
        style={{ background: "oklch(0.951 0.022 88)" }}
        data-ocid="funfacts.section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FUN_FACTS.map((fact, i) => (
              <motion.div
                key={fact.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-2xl p-6 flex gap-5 relative overflow-hidden"
                style={{
                  background: fact.color,
                  border: "1px solid oklch(0.88 0.02 80)",
                  boxShadow: "0 4px 20px oklch(0.20 0.018 42 / 0.08)",
                }}
                data-ocid={`funfacts.item.${i + 1}`}
              >
                {/* Number */}
                <div
                  className="font-playfair font-bold text-5xl leading-none flex-shrink-0 select-none"
                  style={{ color: `${fact.accent}30` }}
                >
                  {fact.num}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{fact.emoji}</span>
                    <h3
                      className="font-playfair font-bold text-lg leading-snug"
                      style={{ color: "oklch(0.20 0.018 42)" }}
                    >
                      {fact.title}
                    </h3>
                  </div>
                  <p
                    className="font-inter text-sm leading-relaxed"
                    style={{ color: "oklch(0.30 0.02 42)" }}
                  >
                    {fact.fact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <div
              className="inline-block rounded-3xl px-8 py-8 max-w-xl w-full"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.64 0.10 70) 0%, oklch(0.56 0.08 10) 100%)",
                boxShadow: "0 8px 40px oklch(0.64 0.10 70 / 0.35)",
              }}
            >
              <div className="text-4xl mb-3">🎂</div>
              <h3 className="font-playfair font-bold text-2xl text-white mb-3">
                Happy Birthday Prakriti! 🥳
              </h3>
              <p className="font-inter text-sm text-white/90 leading-relaxed mb-5">
                You're literally one of a kind — funny, brave, talented, and the
                best part of the Aayu and Pihu Show. Your whole squad is rooting
                for you! Here's to the most amazing year yet!! 🌟
              </p>
              <Link to="/wishes" data-ocid="funfacts.primary_button">
                <button
                  type="button"
                  className="font-inter font-bold text-sm tracking-wider uppercase px-8 py-3 rounded-full transition-all duration-200"
                  style={{
                    background: "white",
                    color: "oklch(0.64 0.10 70)",
                  }}
                >
                  Read Birthday Wishes 💌
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
