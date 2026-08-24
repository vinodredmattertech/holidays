"use client";

import { useEffect, useRef } from "react";
import { stats } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { StatIcon } from "@/components/icons";

function parseTarget(text: string) {
  const match = text.match(/([\d,]+)/);
  return match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = parseTarget(value);
    if (target === null || reduceMotion || !("IntersectionObserver" in window)) return;

    const suffix = value.replace(/^[\d,]+/, "");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const start = performance.now();
          const duration = 1400;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - (1 - p) ** 3;
            const current = Math.round(target * eased);
            el.textContent = current.toLocaleString("en-US") + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  const parts = value.split(/(\+)/);

  return (
    <p className="stat__num" ref={ref}>
      {parts.map((part, index) =>
        part === "+" ? (
          <span className="orange" key={index}>
            +
          </span>
        ) : (
          part
        ),
      )}
    </p>
  );
}

export function Stats() {
  return (
    <section className="stats" aria-label="Our experience">
      <div className="wrap stats__grid">
        {stats.map((stat, index) => (
          <Reveal
            className="stat"
            delay={index === 0 ? undefined : ((Math.min(index, 3) as 1 | 2 | 3))}
            key={stat.label}
          >
            <StatIcon name={stat.icon} />
            <CountUp value={stat.value} />
            <p className="stat__label">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
