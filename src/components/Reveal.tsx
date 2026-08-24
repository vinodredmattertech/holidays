"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  className?: string;
  delay?: 1 | 2 | 3;
  children: ReactNode;
};

export function Reveal({ as: Tag = "div", className = "", delay, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? ` reveal-delay-${delay}` : "";

  return (
    <Tag ref={ref} className={`reveal${delayClass} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
