import { useEffect, useState } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeCountdown(targetDate: Date): Countdown {
  const now = new Date();
  let target = new Date(targetDate);
  if (now > target) {
    target = new Date(
      target.getFullYear() + 1,
      target.getMonth(),
      target.getDate(),
    );
  }
  const diff = target.getTime() - now.getTime();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isPast: false,
  };
}

export function useCountdown(targetDate: Date): Countdown {
  const [countdown, setCountdown] = useState<Countdown>(() =>
    computeCountdown(targetDate),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(computeCountdown(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}
