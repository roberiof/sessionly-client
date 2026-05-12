"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Role } from "./types"
import { RoleCard } from "./components/RoleCard"
import { MentorForm } from "./components/MentorForm"
import { ClientForm } from "./components/ClientForm"

const EASE_EXPO = [0.22, 1, 0.36, 1] as const

export function RegisterFlow() {
  const [step, setStep] = useState<1 | 2>(1)
  const [role, setRole] = useState<Role | null>(null)
  const [direction, setDirection] = useState<1 | -1>(1)

  async function handleRegisterSuccess(email: string, password: string) {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      toast.error("Account created but sign-in failed. Please log in manually.")
      return
    }

    toast.success("Account created! Welcome to Sessionly.")
    // TODO: redirect to /dashboard
  }

  function handleRoleSelect(selected: Role) {
    setRole(selected)
  }

  function handleContinue() {
    if (role) {
      setDirection(1)
      setStep(2)
    }
  }

  function handleBack() {
    setDirection(-1)
    setStep(1)
    setRole(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_EXPO }}
      className="space-y-8"
    >
      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.06, ease: EASE_EXPO }}
        className="flex items-center gap-3"
      >
        <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: step === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.4, ease: EASE_EXPO }}
          />
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {step} / 2
        </span>
      </motion.div>

      {/* Header */}
      <div className="space-y-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.h2
            key={`title-${step}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.32, ease: EASE_EXPO }}
            className="text-foreground"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            {step === 1
              ? "Who are you?"
              : `Join as a ${role === "MENTOR" ? "Mentor" : "Client"}.`}
          </motion.h2>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`desc-${step}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_EXPO }}
            className="text-sm text-muted-foreground"
          >
            {step === 1
              ? "Select the role that best describes you"
              : "Fill in your details to get started"}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Step content */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ x: direction * 32, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -32, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_EXPO }}
          >
            {step === 1 && (
              <div className="flex flex-col gap-3">
                <RoleCard
                  role="MENTOR"
                  selected={role === "MENTOR"}
                  onSelect={handleRoleSelect}
                />
                <RoleCard
                  role="CLIENT"
                  selected={role === "CLIENT"}
                  onSelect={handleRoleSelect}
                />
              </div>
            )}

            {step === 2 && role === "MENTOR" && (
              <MentorForm onSuccess={handleRegisterSuccess} />
            )}
            {step === 2 && role === "CLIENT" && (
              <ClientForm onSuccess={handleRegisterSuccess} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer actions */}
      <AnimatePresence mode="wait" initial={false}>
        {step === 1 ? (
          <motion.div
            key="continue"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE_EXPO }}
            className="space-y-4"
          >
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="group w-full gap-2 transition-shadow hover:shadow-glow"
                disabled={!role}
                onClick={handleContinue}
              >
                Continue
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </motion.div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="submit"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE_EXPO }}
            className="space-y-2"
          >
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                form="register-form"
                size="lg"
                className="group w-full gap-2 transition-shadow hover:shadow-glow"
              >
                Create account
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </motion.div>

            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="w-full gap-2 text-foreground/40 hover:text-foreground/70"
              onClick={handleBack}
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
