"use client"

import { Briefcase, User, ArrowRight } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import type { Role } from "../../types"

type Props = {
  role: Role
  selected: boolean
  onSelect: (role: Role) => void
}

export function RoleCard({ role, selected, onSelect }: Props) {
  const isMentor = role === "MENTOR"
  const Icon = isMentor ? Briefcase : User

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(role)}
      aria-pressed={selected}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className={cn(
        "group relative flex w-full items-center gap-4 overflow-hidden rounded-xl p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:border border focus-visible:border-primary/50",
        selected ? "border-primary/30" : "border-border hover:border-border/60",
      )}
      style={{
        background: selected
          ? "color-mix(in oklch, var(--color-primary) 8%, transparent)"
          : "transparent",
        boxShadow: selected
          ? "0 0 28px oklch(0.65 0.24 230 / 0.12)"
          : undefined,
      }}
    >
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 h-full w-0.75 rounded-r-full bg-primary"
        animate={{ scaleY: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ originY: "50%" }}
      />

      {/* Icon */}
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-200",
          selected
            ? "bg-primary/20 ring-primary/30"
            : "bg-muted/50 ring-border group-hover:bg-muted",
        )}
      >
        <Icon
          className={cn(
            "size-5 transition-colors duration-200",
            selected
              ? "text-primary"
              : "text-muted-foreground/50 group-hover:text-muted-foreground",
          )}
        />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm font-semibold transition-colors duration-200",
            selected
              ? "text-foreground"
              : "text-foreground/75 group-hover:text-foreground",
          )}
        >
          {isMentor ? "Mentor" : "Client"}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground transition-colors duration-200">
          {isMentor
            ? "Share expertise, earn from sessions"
            : "Book sessions with top mentors"}
        </p>
      </div>

      {/* Arrow */}
      <ArrowRight
        className={cn(
          "size-4 shrink-0 transition-all duration-200",
          selected
            ? "text-primary opacity-100 translate-x-0"
            : "text-foreground/20 opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-60",
        )}
      />
    </motion.button>
  )
}
