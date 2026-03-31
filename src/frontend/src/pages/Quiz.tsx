import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const QUESTIONS = [
  {
    q: "When is Prakriti Kalra's birthday? 🎂",
    options: ["March 15th", "April 2nd", "January 20th", "February 14th"],
    correct: 1,
    fact: "April 2nd is the big day — make sure to wish her! 🎉",
  },
  {
    q: "What is the name of the famous YouTube channel Prakriti stars in? 📺",
    options: [
      "Total Gaming",
      "CarryMinati",
      "Aayu and Pihu Show",
      "BB Ki Vines",
    ],
    correct: 2,
    fact: "The Aayu and Pihu Show is one of India's most loved family YouTube channels!",
  },
  {
    q: "What star sign (zodiac) is Prakriti? ♈",
    options: ["Pisces", "Taurus", "Gemini", "Aries"],
    correct: 3,
    fact: "Aries are known for being bold, confident, and full of energy — just like Pihu! 🔥",
  },
  {
    q: "Which sibling does Prakriti (Pihu) have on the Aayu and Pihu Show? 👦",
    options: ["Rohan", "Arjun", "Aayu", "Karan"],
    correct: 2,
    fact: "Aayu is her on-screen brother and the other star of the show!",
  },
  {
    q: "What is Pihu's real full name? 😊",
    options: ["Riya Kalra", "Priya Kalra", "Pihu Sharma", "Prakriti Kalra"],
    correct: 3,
    fact: "Prakriti Kalra is the real name behind the beloved Pihu character!",
  },
  {
    q: "Approximately how many subscribers does the Aayu and Pihu Show have? 🚀",
    options: ["1 million", "5 million", "Tens of millions", "Only thousands"],
    correct: 2,
    fact: "The channel has tens of millions of subscribers, making it a mega hit!",
  },
  {
    q: "What type of content does the Aayu and Pihu Show mainly produce? 🎬",
    options: [
      "Horror stories",
      "Gaming only",
      "Cooking shows",
      "Family fun & vlogs",
    ],
    correct: 3,
    fact: "Family fun, challenges, vlogs, and DIY activities — that's their signature content!",
  },
  {
    q: "Which Indian city is the Aayu and Pihu Show based out of? 🏙️",
    options: ["Mumbai", "Delhi", "Bangalore", "Kolkata"],
    correct: 1,
    fact: "The show is created and based in Delhi, India!",
  },
  {
    q: "What is Pihu's personality best described as on the show? 💃",
    options: [
      "Shy and quiet",
      "Energetic and fun-loving",
      "Serious and studious",
      "Grumpy and lazy",
    ],
    correct: 1,
    fact: "Pihu is famously energetic, fun-loving, and always up for mischief!",
  },
  {
    q: "Which month does Prakriti's birthday fall in? 🗓",
    options: ["March", "May", "February", "April"],
    correct: 3,
    fact: "April baby! April 2nd to be exact — spring birthday vibes! 🌸",
  },
  {
    q: "What do fans lovingly call Prakriti on her YouTube channel? 🌟",
    options: ["Princess", "Pihu", "Priya", "Kalru"],
    correct: 1,
    fact: "Everyone knows and loves her as Pihu — a name synonymous with fun and joy!",
  },
  {
    q: "What is a signature element of the Aayu and Pihu Show? 🎭",
    options: [
      "Horror challenges",
      "Solo travel vlogs",
      "Sibling banter and challenges",
      "News commentary",
    ],
    correct: 2,
    fact: "Their hilarious sibling banter and fun challenges are what fans tune in for!",
  },
  {
    q: "What has made Aayu and Pihu Show stand out from other Indian YouTube channels? 🏆",
    options: [
      "Adult comedy",
      "Kid-friendly family content",
      "Celebrity interviews",
      "Political debates",
    ],
    correct: 1,
    fact: "Clean, kid-friendly, family entertainment is their biggest strength and USP!",
  },
  {
    q: "If Prakriti were a season, which one would she be? 🌸",
    options: ["Winter", "Monsoon", "Spring", "Summer"],
    correct: 2,
    fact: "Born in April, Prakriti is a spring baby — fresh, vibrant and full of life! 🌼",
  },
  {
    q: "What does 'Pihu' mean in Hindi? 💛",
    options: ["Star", "Moon", "Sweet sparrow / melodious bird", "Sunshine"],
    correct: 2,
    fact: "Pihu means a sweet little sparrow or a melodious bird — perfectly suits her! 🐦",
  },
];

const QUESTION_TIME = 18; // seconds per question
const OPTION_LABELS = ["A", "B", "C", "D"];

const SCORE_MESSAGES = [
  {
    min: 14,
    msg: "PERFECT! You are basically Prakriti's biggest fan ever! 👑🏆",
    emoji: "🏆",
  },
  {
    min: 11,
    msg: "Outstanding! You really know your Aayu and Pihu Show trivia! 🌟",
    emoji: "⭐",
  },
  {
    min: 8,
    msg: "Great job! A true Pihu fan with solid knowledge! 🎉",
    emoji: "🎉",
  },
  {
    min: 5,
    msg: "Not bad! Time to binge some more Aayu and Pihu episodes! 📺",
    emoji: "😄",
  },
  {
    min: 2,
    msg: "Start from episode 1 — you'll be a pro in no time! 😅",
    emoji: "😅",
  },
  {
    min: 0,
    msg: "Oops! Subscribe to the Aayu and Pihu Show ASAP! 😂",
    emoji: "🎮",
  },
];

function getScoreMessage(score: number) {
  return (
    SCORE_MESSAGES.find((m) => score >= m.min) ??
    SCORE_MESSAGES[SCORE_MESSAGES.length - 1]
  );
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null),
  );
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const selectedRef = useRef<number | null>(null);

  const question = QUESTIONS[current];

  const goNext = (idx: number | null) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
    if (idx === question.correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (current + 1 < QUESTIONS.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
        setTimeLeft(QUESTION_TIME);
      } else {
        setDone(true);
      }
    }, 1200);
  };

  const handleOption = (idx: number) => {
    if (selected !== null) return;
    selectedRef.current = idx;
    setSelected(idx);
    goNext(idx);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset on question change
  useEffect(() => {
    if (done) return;
    setTimeLeft(QUESTION_TIME);
    let expired = false;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          if (!expired) {
            expired = true;
            setSelected(-1);
            setCurrent((c) => {
              if (c + 1 < QUESTIONS.length) return c + 1;
              setDone(true);
              return c;
            });
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, done]);

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setTimeLeft(QUESTION_TIME);
  };

  const scoreMsg = getScoreMessage(done ? score : 0);
  const timerPct = (timeLeft / QUESTION_TIME) * 100;
  const timerColor =
    timeLeft > 10
      ? "oklch(0.55 0.18 155)"
      : timeLeft > 5
        ? "oklch(0.64 0.10 70)"
        : "oklch(0.60 0.18 27)";

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
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-inter text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: "oklch(0.54 0.07 12)" }}
        >
          🎯 Test Your Knowledge
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-playfair font-bold text-4xl md:text-5xl mb-4"
          style={{ color: "oklch(0.20 0.018 42)" }}
        >
          Prakriti Birthday Quiz 🎂
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-inter text-base"
          style={{ color: "oklch(0.45 0.03 40)" }}
        >
          {QUESTIONS.length} fun questions — {QUESTION_TIME}s each — how well do
          you know our birthday star? 🌟
        </motion.p>
      </section>

      {/* Quiz body */}
      <section
        className="py-12 px-4 min-h-[60vh]"
        style={{ background: "oklch(0.951 0.022 88)" }}
      >
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                {/* Progress */}
                <div className="mb-4">
                  <div
                    className="flex justify-between font-inter text-xs font-semibold mb-2"
                    style={{ color: "oklch(0.45 0.03 40)" }}
                  >
                    <span>
                      Question {current + 1} of {QUESTIONS.length}
                    </span>
                    <span>Score: {score}</span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: "oklch(0.88 0.02 80)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, oklch(0.64 0.10 70), oklch(0.56 0.08 10))",
                      }}
                      initial={{
                        width: `${(current / QUESTIONS.length) * 100}%`,
                      }}
                      animate={{
                        width: `${((current + 1) / QUESTIONS.length) * 100}%`,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Timer bar */}
                <div className="mb-5">
                  <div
                    className="flex justify-between font-inter text-xs mb-1"
                    style={{ color: "oklch(0.45 0.03 40)" }}
                  >
                    <span>⏱ Time left</span>
                    <span className="font-bold" style={{ color: timerColor }}>
                      {timeLeft}s
                    </span>
                  </div>
                  <div
                    className="h-2.5 rounded-full overflow-hidden"
                    style={{ background: "oklch(0.88 0.02 80)" }}
                  >
                    <motion.div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${timerPct}%`,
                        background: timerColor,
                      }}
                    />
                  </div>
                </div>

                {/* Question card */}
                <div
                  className="rounded-3xl p-8 mb-4"
                  style={{
                    background: "oklch(0.98 0.008 80)",
                    boxShadow: "0 8px 40px oklch(0.20 0.018 42 / 0.10)",
                    border: "1px solid oklch(0.88 0.02 80)",
                  }}
                >
                  <h2
                    className="font-playfair font-bold text-xl md:text-2xl mb-6 leading-snug"
                    style={{ color: "oklch(0.20 0.018 42)" }}
                  >
                    {question.q}
                  </h2>

                  <div className="grid grid-cols-1 gap-3">
                    {question.options.map((opt, i) => {
                      let bg = "oklch(0.95 0.015 88)";
                      let border = "oklch(0.88 0.02 80)";
                      let textColor = "oklch(0.20 0.018 42)";

                      if (selected !== null) {
                        if (i === question.correct) {
                          bg = "oklch(0.88 0.12 155)";
                          border = "oklch(0.55 0.18 155)";
                          textColor = "oklch(0.25 0.12 155)";
                        } else if (i === selected && i !== question.correct) {
                          bg = "oklch(0.90 0.12 27)";
                          border = "oklch(0.60 0.18 27)";
                          textColor = "oklch(0.25 0.12 27)";
                        }
                      }

                      return (
                        <motion.button
                          key={opt}
                          type="button"
                          onClick={() => handleOption(i)}
                          disabled={selected !== null}
                          whileHover={selected === null ? { scale: 1.01 } : {}}
                          whileTap={selected === null ? { scale: 0.99 } : {}}
                          className="w-full text-left px-5 py-4 rounded-xl font-inter text-sm font-medium transition-all duration-200 flex items-center gap-3"
                          style={{
                            background: bg,
                            border: `2px solid ${border}`,
                            color: textColor,
                            cursor: selected !== null ? "default" : "pointer",
                          }}
                          data-ocid={`quiz.option.${i + 1}`}
                        >
                          <span
                            className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                            style={{ background: border, color: "white" }}
                          >
                            {OPTION_LABELS[i]}
                          </span>
                          {opt}
                          {selected !== null && i === question.correct && (
                            <span className="ml-auto text-lg">✅</span>
                          )}
                          {selected === i && i !== question.correct && (
                            <span className="ml-auto text-lg">❌</span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Fun fact shown after answering */}
                  <AnimatePresence>
                    {selected !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-5 rounded-xl px-4 py-3 font-inter text-sm leading-relaxed"
                        style={{
                          background: "oklch(0.93 0.03 88)",
                          border: "1px solid oklch(0.88 0.02 80)",
                          color: "oklch(0.35 0.04 60)",
                        }}
                      >
                        💡 <strong>Fun Fact:</strong> {question.fact}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
                data-ocid="quiz.success_state"
              >
                <div className="text-7xl mb-4">{scoreMsg.emoji}</div>
                <h2
                  className="font-playfair font-bold text-3xl md:text-4xl mb-3"
                  style={{ color: "oklch(0.20 0.018 42)" }}
                >
                  You scored {score}/{QUESTIONS.length}! 🎯
                </h2>
                <p
                  className="font-inter text-base mb-8 max-w-md mx-auto leading-relaxed"
                  style={{ color: "oklch(0.45 0.03 40)" }}
                >
                  {scoreMsg.msg}
                </p>

                {/* Score bar */}
                <div
                  className="max-w-xs mx-auto h-4 rounded-full mb-8 overflow-hidden"
                  style={{ background: "oklch(0.88 0.02 80)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.64 0.10 70), oklch(0.75 0.10 75))",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>

                {/* Answer review */}
                <div className="text-left max-w-xl mx-auto mb-8 space-y-3">
                  <h3
                    className="font-playfair font-bold text-lg mb-4 text-center"
                    style={{ color: "oklch(0.20 0.018 42)" }}
                  >
                    Review Your Answers 📋
                  </h3>
                  {QUESTIONS.map((q, idx) => {
                    const userAns = answers[idx];
                    const correct = userAns === q.correct;
                    return (
                      <div
                        key={q.q}
                        className="rounded-xl px-4 py-3 font-inter text-sm"
                        style={{
                          background: correct
                            ? "oklch(0.93 0.05 155)"
                            : "oklch(0.93 0.05 27)",
                          border: `1px solid ${correct ? "oklch(0.75 0.12 155)" : "oklch(0.75 0.12 27)"}`,
                          color: correct
                            ? "oklch(0.25 0.12 155)"
                            : "oklch(0.25 0.12 27)",
                        }}
                      >
                        <span className="mr-2">{correct ? "✅" : "❌"}</span>
                        <strong>Q{idx + 1}:</strong>{" "}
                        {q.q.replace(/\p{Emoji}/gu, "").trim()}
                        {!correct && userAns !== null && (
                          <div className="mt-1 text-xs opacity-80">
                            Correct: {q.options[q.correct]}
                          </div>
                        )}
                        {userAns === null && (
                          <div className="mt-1 text-xs opacity-80">
                            ⏱ Time ran out
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={reset}
                  className="gold-btn text-white font-inter font-semibold text-sm tracking-wider uppercase px-8 py-3 rounded-full"
                  data-ocid="quiz.primary_button"
                >
                  Try Again 🔄
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}
