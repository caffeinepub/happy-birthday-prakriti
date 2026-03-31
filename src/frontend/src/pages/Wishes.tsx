import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Gift, Lock, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { useActor } from "../hooks/useActor";
import { useCountdown } from "../hooks/useCountdown";

const BIRTHDAY = new Date("2026-04-02T00:00:00+05:30");

function WishSkeletons() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      data-ocid="wishes.loading_state"
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-2xl p-6 flex flex-col gap-4"
          style={{
            background: "oklch(0.95 0.015 88)",
            border: "1px solid oklch(0.88 0.02 80)",
          }}
        >
          <div className="flex items-center gap-3">
            <Skeleton className="w-11 h-11 rounded-full" />
            <Skeleton className="h-4 w-28 rounded" />
          </div>
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-4/5 rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function Wishes() {
  const countdown = useCountdown(BIRTHDAY);
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isBirthday = countdown.isPast;

  // Poll wish count every 5 seconds for real-time updates
  const { data: wishes = [], isLoading: loadingWishes } = useQuery({
    queryKey: ["wishes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWishes();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });

  const wishCount = wishes.length;

  const submitMutation = useMutation({
    mutationFn: async ({
      name: n,
      message: m,
    }: { name: string; message: string }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitWish(n, m);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
      setSubmitted(true);
      setName("");
      setMessage("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    submitMutation.mutate({ name: name.trim(), message: message.trim() });
  };

  const wishColors = useMemo(
    () => [
      "oklch(0.90 0.04 15)",
      "oklch(0.93 0.02 88)",
      "oklch(0.94 0.020 86)",
      "oklch(0.91 0.03 25)",
      "oklch(0.92 0.025 60)",
      "oklch(0.90 0.03 40)",
    ],
    [],
  );

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
              "radial-gradient(circle at 30% 70%, oklch(0.64 0.10 70 / 0.08) 0%, transparent 50%)",
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-inter text-xs font-semibold tracking-widest uppercase mb-3 relative z-10"
          style={{ color: "oklch(0.54 0.07 12)" }}
        >
          🎁 Birthday Surprise
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-playfair font-bold text-4xl md:text-5xl mb-4 relative z-10"
          style={{ color: "oklch(0.20 0.018 42)" }}
        >
          Leave a Birthday Wish for Prakriti 🎉
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-inter text-base relative z-10"
          style={{ color: "oklch(0.45 0.03 40)" }}
        >
          Your wish will be locked until April 2nd — then revealed as a birthday
          gift ✨
        </motion.p>
      </section>

      {/* LIVE WISH COUNTER BANNER */}
      <section
        className="py-5 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.64 0.10 70) 0%, oklch(0.56 0.08 10) 100%)",
        }}
      >
        <div className="max-w-xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 flex-wrap"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
                className="w-3 h-3 rounded-full bg-white"
                style={{ boxShadow: "0 0 8px white" }}
              />
              <span className="font-inter text-xs font-bold text-white/80 tracking-widest uppercase">
                Live
              </span>
            </div>
            <div className="font-inter text-white font-medium text-sm md:text-base text-center">
              🔒{" "}
              <motion.span
                key={wishCount}
                initial={{ scale: 1.4, color: "#ffffff" }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="font-playfair font-bold text-xl md:text-2xl mx-1"
                style={{ display: "inline-block" }}
              >
                {loadingWishes ? "..." : wishCount}
              </motion.span>{" "}
              {wishCount === 1 ? "wish has" : "wishes have"} been locked for{" "}
              <span className="font-bold">Prakriti Kalra&apos;s HBD</span> so
              far 🎂
            </div>
          </motion.div>
        </div>
      </section>

      {/* Submit Wish Form */}
      <section
        className="py-12 px-4"
        style={{ background: "oklch(0.951 0.022 88)" }}
      >
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: "oklch(0.98 0.008 80)",
              boxShadow: "0 8px 40px oklch(0.20 0.018 42 / 0.10)",
              border: "1px solid oklch(0.88 0.02 80)",
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6"
                  data-ocid="wishes.success_state"
                >
                  <div className="text-5xl mb-4">🎁</div>
                  <h3
                    className="font-playfair font-bold text-2xl mb-2"
                    style={{ color: "oklch(0.20 0.018 42)" }}
                  >
                    Wish Locked! 🔒
                  </h3>
                  <p
                    className="font-inter text-sm leading-relaxed"
                    style={{ color: "oklch(0.45 0.03 40)" }}
                  >
                    Your birthday wish has been safely locked away. Prakriti
                    will receive it as a surprise on April 2nd! 🎂
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-5 font-inter text-sm underline"
                    style={{ color: "oklch(0.64 0.10 70)" }}
                  >
                    Send another wish?
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <label
                      htmlFor="wish-name"
                      className="block font-inter text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: "oklch(0.20 0.018 42)" }}
                    >
                      Your Name
                    </label>
                    <Input
                      id="wish-name"
                      placeholder="e.g. Riya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      data-ocid="wishes.input"
                      style={{
                        background: "oklch(0.95 0.015 88)",
                        border: "1px solid oklch(0.88 0.02 80)",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="wish-message"
                      className="block font-inter text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: "oklch(0.20 0.018 42)" }}
                    >
                      Your Birthday Message
                    </label>
                    <Textarea
                      id="wish-message"
                      placeholder="Write something heartfelt for Prakriti... 🎉"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                      data-ocid="wishes.textarea"
                      style={{
                        background: "oklch(0.95 0.015 88)",
                        border: "1px solid oklch(0.88 0.02 80)",
                        resize: "none",
                      }}
                    />
                  </div>
                  {submitMutation.isError && (
                    <p
                      className="font-inter text-sm"
                      style={{ color: "oklch(0.56 0.08 10)" }}
                      data-ocid="wishes.error_state"
                    >
                      Oops! Something went wrong. Please try again.
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={
                      submitMutation.isPending ||
                      !name.trim() ||
                      !message.trim()
                    }
                    className="gold-btn text-white font-inter font-semibold w-full py-3 rounded-xl text-sm"
                    data-ocid="wishes.submit_button"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.64 0.10 70), oklch(0.56 0.08 10))",
                      border: "none",
                    }}
                  >
                    {submitMutation.isPending ? (
                      <span className="flex items-center gap-2 justify-center">
                        <Sparkles size={14} className="animate-spin" />
                        Locking your wish...
                      </span>
                    ) : (
                      "Lock My Wish 🔒"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Countdown / Reveal section */}
      <section
        className="pb-16 px-4"
        style={{ background: "oklch(0.951 0.022 88)" }}
        data-ocid="wishes.section"
      >
        <div className="max-w-3xl mx-auto">
          {!isBirthday ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-8 md:p-10 text-center relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.64 0.10 70) 0%, oklch(0.56 0.08 10) 100%)",
                boxShadow: "0 8px 40px oklch(0.64 0.10 70 / 0.4)",
              }}
            >
              <div className="absolute top-4 right-6 text-4xl opacity-20">
                🎁
              </div>
              <div className="absolute bottom-4 left-6 text-3xl opacity-15">
                🔒
              </div>

              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.98 0.008 80 / 0.2)" }}
              >
                <Lock size={28} className="text-white" />
              </div>

              <h2 className="font-playfair font-bold text-2xl md:text-3xl text-white mb-2">
                Wishes Locked Until April 2nd 🎂
              </h2>

              <p className="font-inter text-white/80 text-base mb-6">
                <motion.span
                  key={wishCount}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="font-bold text-white text-lg"
                  style={{ display: "inline-block" }}
                >
                  {wishCount}
                </motion.span>{" "}
                {wishCount === 1 ? "wish has" : "wishes have"} been locked as a
                birthday surprise — they&apos;ll be revealed when the countdown
                hits zero 🎁
              </p>

              <div className="flex items-center justify-center gap-3 md:gap-5 flex-wrap">
                {[
                  { val: countdown.days, label: "Days" },
                  { val: countdown.hours, label: "Hours" },
                  { val: countdown.minutes, label: "Mins" },
                  { val: countdown.seconds, label: "Secs" },
                ].map(({ val, label }) => (
                  <div
                    key={label}
                    className="rounded-2xl px-4 py-3 min-w-[70px] text-center"
                    style={{ background: "oklch(0.98 0.008 80 / 0.15)" }}
                  >
                    <div className="font-playfair font-bold text-3xl text-white">
                      {String(val).padStart(2, "0")}
                    </div>
                    <div className="font-inter text-xs text-white/70 mt-1">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div>
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center font-playfair font-bold text-2xl md:text-3xl mb-3"
                style={{ color: "oklch(0.20 0.018 42)" }}
              >
                🎉 The Birthday Surprise is Unlocked!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center font-inter text-sm mb-10"
                style={{ color: "oklch(0.45 0.03 40)" }}
              >
                All the heartfelt wishes, revealed just for you Prakriti 💛
              </motion.p>

              {loadingWishes ? (
                <WishSkeletons />
              ) : wishes.length === 0 ? (
                <div
                  className="text-center py-12 font-inter text-sm"
                  style={{ color: "oklch(0.45 0.03 40)" }}
                  data-ocid="wishes.empty_state"
                >
                  No wishes yet — be the first! 🌸
                </div>
              ) : (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  data-ocid="wishes.list"
                >
                  {wishes.map((wish, i) => (
                    <motion.div
                      key={`${wish.name}-${i}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      whileHover={{
                        y: -4,
                        boxShadow: "0 12px 40px oklch(0.64 0.10 70 / 0.2)",
                      }}
                      className="rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
                      style={{
                        background: wishColors[i % wishColors.length],
                        boxShadow: "0 4px 20px oklch(0.20 0.018 42 / 0.08)",
                        border: "1px solid oklch(0.88 0.02 80)",
                      }}
                      data-ocid={`wishes.item.${i + 1}`}
                    >
                      <div className="absolute top-3 right-4 text-2xl opacity-40">
                        ✨
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center font-playfair font-bold text-sm text-white flex-shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.64 0.10 70), oklch(0.56 0.08 10))",
                          }}
                        >
                          {wish.name
                            .split(" ")
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <p
                          className="font-inter font-semibold text-sm"
                          style={{ color: "oklch(0.20 0.018 42)" }}
                        >
                          {wish.name}
                        </p>
                      </div>
                      <p
                        className="font-inter text-sm leading-relaxed"
                        style={{ color: "oklch(0.30 0.02 42)" }}
                      >
                        {wish.message}
                      </p>
                      <div className="flex gap-1 mt-auto">
                        {[1, 2, 3, 4, 5].map((sKey) => (
                          <Gift
                            key={sKey}
                            size={12}
                            style={{ color: "oklch(0.64 0.10 70)" }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
