import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Cake, ChevronDown, Heart, Star, Tv, Youtube, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import Confetti from "../components/Confetti";
import Sparkles from "../components/Sparkles";
import { useActor } from "../hooks/useActor";
import { useCountdown } from "../hooks/useCountdown";

const HERO_IMAGE =
  "/assets/uploads/images_2-019d3509-d18e-77c5-92f8-583e85af1da7-3.jpeg";

const BIRTHDAY = new Date(2026, 3, 2);

const AMAZING_REASONS = [
  {
    emoji: "📺",
    icon: Tv,
    title: "YouTube Star!",
    desc: "She's literally on one of India's most loved family YouTube channels — Aayu and Pihu Show! Millions of fans and counting! 🚀",
    color: "oklch(0.90 0.04 15)",
    accent: "oklch(0.54 0.07 12)",
  },
  {
    emoji: "😂",
    icon: Zap,
    title: "Queen of Vibes",
    desc: "Whether it's a challenge video, a prank, or a vlog — Prakriti brings ALL the energy. Every scene she's in just HITS differently!",
    color: "oklch(0.93 0.02 88)",
    accent: "oklch(0.64 0.10 70)",
  },
  {
    emoji: "💪",
    icon: Star,
    title: "Super Brave",
    desc: "Cameras, crowds, crazy challenges — she handles everything like a total pro. Growing up on-screen takes guts, and she's got plenty!",
    color: "oklch(0.94 0.020 86)",
    accent: "oklch(0.45 0.03 40)",
  },
  {
    emoji: "🫂",
    icon: Heart,
    title: "Best Friend Energy",
    desc: "She's the type of friend who hypes you up, makes you laugh till your stomach hurts, and is ALWAYS there for you. Absolute bestie goals!",
    color: "oklch(0.90 0.04 15)",
    accent: "oklch(0.56 0.08 10)",
  },
  {
    emoji: "🎬",
    icon: Youtube,
    title: "Content Queen",
    desc: "From family adventures to fun challenges — she makes every video a banger. The Aayu and Pihu Show wouldn't be the same without her! 🎥",
    color: "oklch(0.93 0.02 88)",
    accent: "oklch(0.64 0.10 70)",
  },
  {
    emoji: "✨",
    icon: Zap,
    title: "Totally Iconic",
    desc: "She's got a smile that lights up the screen, a personality that's 100% authentic, and she makes millions of fans smile every single day!",
    color: "oklch(0.94 0.020 86)",
    accent: "oklch(0.45 0.03 40)",
  },
];

const INITIAL_EMOJI_COUNTS = [
  { emoji: "🎂", label: "Cake", count: Math.floor(Math.random() * 88) + 12 },
  { emoji: "🎉", label: "Party", count: Math.floor(Math.random() * 88) + 12 },
  { emoji: "🌟", label: "Star", count: Math.floor(Math.random() * 88) + 12 },
  { emoji: "💛", label: "Heart", count: Math.floor(Math.random() * 88) + 12 },
  { emoji: "✨", label: "Sparkle", count: Math.floor(Math.random() * 88) + 12 },
];

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center"
    >
      <div
        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center shadow-warm"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.64 0.10 70), oklch(0.75 0.10 75))",
          boxShadow:
            "0 4px 20px oklch(0.64 0.10 70 / 0.35), inset 0 1px 0 oklch(0.85 0.08 80 / 0.4)",
        }}
      >
        <span className="font-playfair font-bold text-2xl md:text-3xl lg:text-4xl text-white">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        className="font-inter text-xs font-semibold tracking-widest uppercase mt-2"
        style={{ color: "oklch(0.45 0.03 40)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function LiveWishCounter() {
  const { actor, isFetching } = useActor();
  const { data: wishes } = useQuery({
    queryKey: ["wishCountHome"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWishes();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });

  const count = wishes !== undefined ? wishes.length : null;

  return (
    <section
      className="py-10 px-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.95 0.035 15) 0%, oklch(0.93 0.025 45) 100%)",
      }}
      data-ocid="wish_counter.section"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-5 justify-center text-center sm:text-left"
          style={{
            background: "oklch(0.98 0.008 80)",
            boxShadow:
              "0 4px 32px oklch(0.64 0.10 70 / 0.15), 0 1px 4px oklch(0.20 0.018 42 / 0.06)",
            border: "1.5px solid oklch(0.88 0.025 70)",
          }}
        >
          {/* Pulsing LIVE badge */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "oklch(0.55 0.22 25)" }}
              />
              <span
                className="relative inline-flex rounded-full h-3 w-3"
                style={{ background: "oklch(0.55 0.22 25)" }}
              />
            </span>
            <span
              className="font-inter font-extrabold text-xs tracking-widest uppercase"
              style={{ color: "oklch(0.55 0.22 25)" }}
            >
              LIVE
            </span>
          </div>

          {/* Counter text */}
          <div>
            <p
              className="font-inter text-sm md:text-base leading-snug"
              style={{ color: "oklch(0.30 0.02 42)" }}
            >
              🔒{" "}
              <span
                className="font-playfair font-bold text-2xl md:text-3xl"
                style={{ color: "oklch(0.54 0.07 12)" }}
              >
                {count !== null ? count.toLocaleString() : "…"}
              </span>{" "}
              wishes locked for{" "}
              <span
                className="font-semibold"
                style={{ color: "oklch(0.64 0.10 70)" }}
              >
                Prakriti Kalra's HBD
              </span>{" "}
              💛
            </p>
            <p
              className="font-inter text-xs mt-1"
              style={{ color: "oklch(0.56 0.05 40)" }}
            >
              Unlocks as a gift on April 2nd ✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EmojiReactionBar() {
  const [counts, setCounts] = useState(INITIAL_EMOJI_COUNTS);
  const [bursts, setBursts] = useState<
    { id: number; emoji: string; idx: number }[]
  >([]);
  let nextId = 0;

  const handleClick = (idx: number) => {
    setCounts((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, count: e.count + 1 } : e)),
    );
    const id = nextId++;
    setBursts((prev) => [...prev, { id, emoji: counts[idx].emoji, idx }]);
    setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 900);
  };

  return (
    <section
      className="py-12 px-4"
      style={{ background: "oklch(0.93 0.02 88)" }}
      data-ocid="reactions.section"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 text-center"
          style={{
            background: "oklch(0.98 0.008 80)",
            boxShadow: "0 4px 30px oklch(0.20 0.018 42 / 0.08)",
            border: "1px solid oklch(0.88 0.02 80)",
          }}
        >
          <h3
            className="font-playfair font-bold text-2xl mb-2"
            style={{ color: "oklch(0.20 0.018 42)" }}
          >
            Send Prakriti a Birthday Cheer! 🎊
          </h3>
          <p
            className="font-inter text-sm mb-6"
            style={{ color: "oklch(0.45 0.03 40)" }}
          >
            Tap an emoji to show your love!
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {counts.map((item, idx) => (
              <div key={item.emoji} className="relative">
                {bursts
                  .filter((b) => b.idx === idx)
                  .map((b) => (
                    <motion.div
                      key={b.id}
                      className="absolute left-1/2 top-0 text-2xl pointer-events-none"
                      initial={{ y: 0, x: "-50%", opacity: 1 }}
                      animate={{ y: -60, opacity: 0 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    >
                      {b.emoji}
                    </motion.div>
                  ))}

                <motion.button
                  type="button"
                  onClick={() => handleClick(idx)}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-200"
                  style={{
                    background: "oklch(0.95 0.015 88)",
                    border: "2px solid oklch(0.88 0.02 80)",
                    minWidth: "64px",
                  }}
                  data-ocid={`reactions.button.${idx + 1}`}
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <span
                    className="font-inter font-bold text-xs"
                    style={{ color: "oklch(0.64 0.10 70)" }}
                  >
                    {item.count}
                  </span>
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(BIRTHDAY);

  const handleShare = async () => {
    const url = window.location.origin;
    const text =
      "🎉 Join me in wishing Prakriti (Aayu and Pihu Show) a Happy Birthday! 🎂";
    if (navigator.share) {
      try {
        await navigator.share({ title: "Happy Birthday Prakriti!", text, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Copied! 🎉 Share the link with everyone!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-16 px-4"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.95 0.035 15) 0%, oklch(0.95 0.025 45) 40%, oklch(0.951 0.022 88) 100%)",
        }}
      >
        <Confetti />
        <Sparkles count={18} />

        <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-5">
              <div
                className="inline-flex items-center gap-1.5 font-inter text-xs font-semibold tracking-wide px-4 py-1.5 rounded-full"
                style={{
                  background: "oklch(0.90 0.04 15)",
                  color: "oklch(0.54 0.07 12)",
                }}
              >
                🎂 April 2nd Celebration
              </div>
              <div
                className="inline-flex items-center gap-1.5 font-inter text-xs font-bold tracking-wide px-4 py-1.5 rounded-full"
                style={{
                  background: "oklch(0.64 0.10 70)",
                  color: "white",
                }}
              >
                ⭐ Aayu and Pihu Show
              </div>
            </div>

            <h1
              className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4"
              style={{ color: "oklch(0.20 0.018 42)" }}
            >
              Happy Birthday,
              <br />
              <span style={{ color: "oklch(0.64 0.10 70)" }}>Prakriti</span>! 🎉
            </h1>

            <p
              className="font-inter text-base md:text-lg font-medium mb-2"
              style={{ color: "oklch(0.30 0.02 42)" }}
            >
              🌟 From the Aayu and Pihu Show • April 2nd
            </p>
            <p
              className="font-inter text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
              style={{ color: "oklch(0.45 0.03 40)" }}
            >
              OMG it's finally here — your BIRTHDAY! 🥳 Your besties are here to
              celebrate you, hype you up, and remind you how absolutely iconic
              you are. Here's to the most amazing year yet, bestie!
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 justify-center lg:justify-start flex-wrap">
              <Link to="/wishes" data-ocid="home.primary_button">
                <button
                  type="button"
                  className="gold-btn text-white font-inter font-semibold text-sm tracking-wider uppercase px-8 py-3 rounded-full transition-all duration-200"
                >
                  See Wishes 💌
                </button>
              </Link>
              <Link to="/fun-facts" data-ocid="home.secondary_button">
                <button
                  type="button"
                  className="font-inter font-semibold text-sm tracking-wider uppercase px-8 py-3 rounded-full border-2 transition-all duration-200"
                  style={{
                    borderColor: "oklch(0.64 0.10 70)",
                    color: "oklch(0.64 0.10 70)",
                    background: "oklch(0.98 0.008 80 / 0.7)",
                  }}
                >
                  Fun Facts ⚡
                </button>
              </Link>
              <button
                type="button"
                onClick={handleShare}
                className="font-inter font-semibold text-sm tracking-wider uppercase px-8 py-3 rounded-full border-2 transition-all duration-200"
                style={{
                  borderColor: "oklch(0.56 0.08 10)",
                  color: "oklch(0.56 0.08 10)",
                  background: "transparent",
                }}
                data-ocid="home.share.button"
              >
                Share Surprise 🔗
              </button>
            </div>
          </motion.div>

          {/* Hero Photo */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div
              className="relative w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[420px] rounded-3xl overflow-hidden"
              style={{
                boxShadow:
                  "0 20px 60px oklch(0.20 0.018 42 / 0.25), 0 4px 12px oklch(0.64 0.10 70 / 0.2)",
                border: "4px solid oklch(0.98 0.008 80)",
              }}
            >
              <img
                src={HERO_IMAGE}
                alt="Prakriti Kalra - Aayu and Pihu Show"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute bottom-0 left-0 right-0 py-4 px-4 text-center"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.20 0.018 42 / 0.6), transparent)",
                }}
              >
                <span className="font-playfair text-white text-lg font-bold">
                  Prakriti ✨
                </span>
              </div>
            </div>

            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{
                background: "oklch(0.90 0.04 15)",
                boxShadow: "0 4px 12px oklch(0.20 0.018 42 / 0.15)",
              }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              🎂
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown size={24} style={{ color: "oklch(0.64 0.10 70)" }} />
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section
        className="py-16 px-4"
        style={{ background: "oklch(0.951 0.022 88)" }}
        data-ocid="countdown.section"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-inter text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "oklch(0.54 0.07 12)" }}
            >
              🗓 The Big Day
            </p>
            <h2
              className="font-playfair font-bold text-3xl md:text-4xl mb-2"
              style={{ color: "oklch(0.20 0.018 42)" }}
            >
              Counting Down to the Big Day!
            </h2>
            <p
              className="font-inter text-base mb-10"
              style={{ color: "oklch(0.56 0.08 10)" }}
            >
              <Cake size={16} className="inline mr-1" /> April 2nd
            </p>
          </motion.div>

          {isPast ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-4xl font-playfair font-bold"
              style={{ color: "oklch(0.64 0.10 70)" }}
            >
              🎉 Happy Birthday Prakriti! 🎉
            </motion.div>
          ) : (
            <div className="flex items-center justify-center gap-4 md:gap-8">
              <CountdownBox value={days} label="Days" />
              <span
                className="font-playfair font-bold text-3xl md:text-4xl pb-8"
                style={{ color: "oklch(0.64 0.10 70)" }}
              >
                :
              </span>
              <CountdownBox value={hours} label="Hours" />
              <span
                className="font-playfair font-bold text-3xl md:text-4xl pb-8"
                style={{ color: "oklch(0.64 0.10 70)" }}
              >
                :
              </span>
              <CountdownBox value={minutes} label="Minutes" />
              <span
                className="font-playfair font-bold text-3xl md:text-4xl pb-8"
                style={{ color: "oklch(0.64 0.10 70)" }}
              >
                :
              </span>
              <CountdownBox value={seconds} label="Seconds" />
            </div>
          )}
        </div>
      </section>

      {/* Live Wish Counter */}
      <LiveWishCounter />

      {/* Emoji Reaction Bar */}
      <EmojiReactionBar />

      {/* Why Prakriti is Amazing */}
      <section
        className="py-16 px-4"
        style={{ background: "oklch(0.94 0.020 86)" }}
        data-ocid="amazing.section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="font-inter text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "oklch(0.54 0.07 12)" }}
            >
              💖 Your Squad Says So
            </p>
            <h2
              className="font-playfair font-bold text-3xl md:text-4xl"
              style={{ color: "oklch(0.20 0.018 42)" }}
            >
              Why Prakriti is Absolutely Amazing 🌟
            </h2>
            <p
              className="font-inter text-sm md:text-base mt-3 max-w-xl mx-auto"
              style={{ color: "oklch(0.45 0.03 40)" }}
            >
              Let us count the ways... (spoiler: we could go on forever! 😄)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AMAZING_REASONS.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  boxShadow: "0 12px 40px oklch(0.64 0.10 70 / 0.25)",
                }}
                className="rounded-2xl p-6 flex flex-col gap-3 relative overflow-hidden cursor-default"
                style={{
                  background: reason.color,
                  border: "1px solid oklch(0.88 0.02 80)",
                  boxShadow: "0 4px 20px oklch(0.20 0.018 42 / 0.08)",
                  transition: "box-shadow 0.2s ease",
                }}
                data-ocid={`amazing.item.${i + 1}`}
              >
                <div className="text-4xl">{reason.emoji}</div>
                <h3
                  className="font-playfair font-bold text-lg"
                  style={{ color: "oklch(0.20 0.018 42)" }}
                >
                  {reason.title}
                </h3>
                <p
                  className="font-inter text-sm leading-relaxed"
                  style={{ color: "oklch(0.30 0.02 42)" }}
                >
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section
        className="py-16 px-4"
        style={{ background: "oklch(0.951 0.022 88)" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="font-inter text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "oklch(0.54 0.07 12)" }}
            >
              📸 Memories
            </p>
            <h2
              className="font-playfair font-bold text-3xl md:text-4xl"
              style={{ color: "oklch(0.20 0.018 42)" }}
            >
              Iconic Moments ✨
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "/assets/uploads/images_5-019d3509-9ec4-7437-a513-2551ddeaf850-1.jpeg",
              "/assets/uploads/images_3-019d3509-bd33-7605-a383-aebf9f58ad43-2.jpeg",
              "/assets/uploads/images_1-019d3509-d1ab-767a-aba0-a30243ba027f-4.jpeg",
            ].map((src, i) => (
              <motion.div
                key={src}
                className="photo-card rounded-2xl overflow-hidden aspect-square"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 40px oklch(0.64 0.10 70 / 0.3)",
                }}
                style={{
                  boxShadow: "0 4px 20px oklch(0.20 0.018 42 / 0.12)",
                  border: "2px solid oklch(0.88 0.02 80)",
                  cursor: "pointer",
                }}
                data-ocid={`home.gallery.item.${i + 1}`}
              >
                <img
                  src={src}
                  alt={`Prakriti moment ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/gallery" data-ocid="home.gallery.button">
              <button
                type="button"
                className="gold-btn text-white font-inter font-semibold text-sm tracking-wider uppercase px-8 py-3 rounded-full"
              >
                View All Photos 🖼
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section
        className="py-12 px-4"
        style={{ background: "oklch(0.90 0.04 15)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-4">🎯</div>
            <h2
              className="font-playfair font-bold text-2xl md:text-3xl mb-3"
              style={{ color: "oklch(0.20 0.018 42)" }}
            >
              Think You Know Prakriti?
            </h2>
            <p
              className="font-inter text-sm mb-6"
              style={{ color: "oklch(0.45 0.03 40)" }}
            >
              Test your knowledge with 8 fun birthday quiz questions! Prove
              you're the ultimate Aayu and Pihu Show fan! 🏆
            </p>
            <Link to="/quiz" data-ocid="home.quiz.button">
              <button
                type="button"
                className="gold-btn text-white font-inter font-semibold text-sm tracking-wider uppercase px-8 py-3 rounded-full"
              >
                Take the Quiz 🎯
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
