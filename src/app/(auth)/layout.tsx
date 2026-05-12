"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"

import { ThemeToggle } from "@/components/ThemeToggle"
import { SessionlyLogo } from "@/components/icons/SessionlyLogo"

type AuthLayoutProps = {
  children: ReactNode
}

const EASE_EXPO = [0.22, 1, 0.36, 1] as const

const STATS = [
  { value: "500+", label: "Mentors" },
  { value: "10K+", label: "Sessions" },
  { value: "98%", label: "Satisfaction" },
]

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="lg:grid lg:grid-cols-2">
      {/* ── Left panel — sticky, full viewport height ── */}
      <div
        className="relative hidden overflow-hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:flex-col"
        style={{ background: "oklch(0.07 0.018 230)" }}
      >
        {/* Bottom-right glow orb */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-175 w-175 translate-x-1/3 translate-y-1/3 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.52 0.28 230 / 0.45) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        {/* Top-left accent orb */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-112.5 w-112.5 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.42 0.18 210 / 0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Noise grain overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />
        {/* Subtle right border fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, oklch(0.65 0.24 230 / 0.25) 30%, oklch(0.65 0.24 230 / 0.25) 70%, transparent 100%)",
          }}
        />
        {/* Ghost brand watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-12 right-8 select-none text-[11rem] font-black leading-none tracking-tighter"
          style={{
            color: "oklch(1 0 0 / 0.018)",
            fontFamily: "var(--font-display)",
          }}
        >
          S
        </div>

        {/* ── Logo ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_EXPO }}
          className="relative z-10 shrink-0 pl-16 pr-12 pt-12"
        >
          <div className="flex items-center gap-3">
            <SessionlyLogo />
            <span className="text-sm font-medium tracking-wide text-white/90">
              Sessionly
            </span>
          </div>
        </motion.div>

        {/* ── Main content — vertically centered ── */}
        <div className="relative z-10 flex flex-1 items-center pl-16 pr-12">
          <div className="w-full space-y-8">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE_EXPO }}
              className="flex items-center gap-3"
            >
              <div
                className="h-px w-10"
                style={{ background: "oklch(0.65 0.24 230)" }}
              />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "oklch(0.65 0.24 230)" }}
              >
                Mentorship Platform
              </span>
            </motion.div>

            {/* Display headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: EASE_EXPO }}
              className="leading-[1.04] text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.75rem, 3.6vw, 4.25rem)",
                fontWeight: 300,
              }}
            >
              Learn from
              <br />
              <span
                style={{
                  color: "oklch(0.8 0.22 230)",
                  fontStyle: "italic",
                }}
              >
                the best
              </span>
              <br />
              in your field.
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: EASE_EXPO }}
              className="max-w-88 text-base leading-relaxed"
              style={{ color: "oklch(0.82 0.008 230)" }}
            >
              Book 1-on-1 sessions, chat directly with experts, and accelerate
              your growth with personalized guidance.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.54, ease: EASE_EXPO }}
              className="flex gap-8 border-t pt-8"
              style={{ borderColor: "oklch(1 0 0 / 0.08)" }}
            >
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p
                    className="mt-0.5 text-xs"
                    style={{ color: "oklch(0.58 0.01 230)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Footer ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.65, ease: EASE_EXPO }}
          className="relative z-10 shrink-0 pl-16 pr-12 pb-12 text-xs"
          style={{ color: "oklch(0.44 0.008 230)" }}
        >
          © {new Date().getFullYear()} Sessionly. All rights reserved.
        </motion.p>
      </div>

      {/* ── Right panel — scrollable ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE_EXPO }}
        className="relative flex min-h-screen items-center justify-center p-6 lg:p-10"
      >
        <div className="absolute right-6 top-6 lg:right-10 lg:top-8">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md">{children}</div>
      </motion.div>
    </div>
  )
}
