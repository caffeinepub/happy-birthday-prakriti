import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function Sparkles({ count = 15 }: { count?: number }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const items: Sparkle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 14 + 8,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    }));
    setSparkles(items);
  }, [count]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute animate-sparkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}
