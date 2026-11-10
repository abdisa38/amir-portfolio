import { motion, useReducedMotion } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function trackPointer(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
}

export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      className={`spotlight-card ${className}`}
      onPointerMove={trackPointer}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ duration: 0.3, ease }}
    >
      {children}
    </motion.article>
  );
}
